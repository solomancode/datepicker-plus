import { Component, Prop, Watch, Event, EventEmitter, State } from '@stencil/core';
import { renderContainer } from './templates';
import { IDateElement, createDateElement, createdDateElements } from './createDateElement';
import { dateToString, isSameDate, getNextDay, getDatesBetween, stringToDate, openGithubIssue } from './utils';
import { SelectMode, DEFAULT_CONFIG } from './config';

export type DateString = string

export interface IPlusConfig {
  selectMode: SelectMode
  viewRange : [DateString, DateString]
  selected  : DateString[]
  disabled  : DateString[]
  stylesheetUrl ?: string
}

@Component({
  tag: 'datepicker-plus',
  styleUrl: 'datepicker-plus.css',
  shadow: true
})
export class DatepickerPlus {

  @Prop() plusConfig: IPlusConfig = DEFAULT_CONFIG;

  @State() viewList: IDateElement[][]
  @State() selected: DateString[] = []
  @State() disabled: DateString[] = []

  private rangeStart: DateString = null

  @Watch('selected')
  parseSelected(next: DateString[], current: DateString[]) {
    // DESELECT CURRENT
    current.forEach(dateString => {
      const dateElement = this.getDateElement(dateString)
      if (dateElement) dateElement.deselect()
    })
    // SELECT NEXT
    next.forEach(dateString => {
      const dateElement = this.getDateElement(dateString)
      if (dateElement) dateElement.select()
    })
  }

  @Watch('disabled')
  disableAll(disabled: DateString[]) {
    disabled.forEach(dateStr => {
      const dateElement = this.getDateElement(dateStr)
      dateElement && dateElement.disable()
    })
  }

  public addRangeMark = (rangeMark: DateString) => {
    if (this.rangeStart===null) {
      this.rangeStart = rangeMark
      this.selected = [rangeMark]
    } else if (this.rangeStart!==rangeMark) {
      const start = this.rangeStart
      const end = rangeMark
      const inBetween = getDatesBetween(start, end);
      // TODO: inBetween +class 'connector'
      const fullRange = [start,...inBetween,end]
      let hasDisabled = fullRange.some((dt) => {
        const dateElement = this.getDateElement(dt);
        if (dateElement&&dateElement.disabled) return true; 
      })
      if (hasDisabled) {
        this.rangeStart = end;
        this.selected = [end];
      } else {
        this.rangeStart = null
        this.selected = fullRange
      }
    }
  }
  
  public checkRangeDeselect = (dateString: DateString) => {
    const rangeMode = this.plusConfig.selectMode==='range';
    const deselectInRange = this.selected.includes(dateString)
    if (rangeMode&&deselectInRange) this.selected = [];
  }
  
  @Watch('plusConfig')
  updateConfig(config: IPlusConfig) {
    if (config.selectMode==='range') {
      this.addRangeMark(config.selected[0])
      this.addRangeMark(config.selected[1])
    } else if (config.selectMode==='single') {
      config.selected = config.selected.slice(-1)
      this.selected = config.selected
    } else if (config.selectMode==='multiple') {
      this.selected = config.selected
    }
    this.disabled = config.disabled
    this.parseViewRange(config.viewRange)
  }
    
  @Event() onDateSelect: EventEmitter<IDateElement>
  @Event() onDateDeselect: EventEmitter<IDateElement>

  componentWillLoad() {
    this.plusConfig = { ...DEFAULT_CONFIG, ...this.plusConfig }
  }

  getDateElement = (dateString: string) => {
    if (dateString in createdDateElements) {
      return createdDateElements[dateString]
    } else {
      return null
    }
  }

  private MemProtect = 0;
  protectMemLeak() {
    this.MemProtect++;
    if (this.MemProtect>3000) {
      const now = '#### ' + new Date().toDateString()
      const CB = '\`\`\`'
      const config = JSON.stringify(this.plusConfig,null,2)
      const body = now + '\n' + CB + config + CB;
      openGithubIssue({
        title: 'Memory leak @ render while loop',
        body,
        label: 'bug'
      })
    }
  }
  
  parseViewRange(viewRange: [DateString, DateString]) {
    let lastIndex = null
    let monthDates = []
    const viewList = []
    let [ currentDate, endDate ] = viewRange.map(stringToDate)
    let stopDate = getNextDay(endDate) as Date;
    while (!isSameDate(currentDate, stopDate)) {
      this.protectMemLeak()
      const date = this.createDate(currentDate)
      if (lastIndex !== null && lastIndex !== date.month) {
        viewList.push(monthDates)
        monthDates = []
      } else {
        monthDates.push(date)
        currentDate = getNextDay(currentDate) as Date
      }
      lastIndex = date.month;
    }
    viewList.push(monthDates)
    this.viewList = viewList
    this.MemProtect = 0;
  }

  private createDate = (date: Date) => {
    const dateString = dateToString(date)
    const checked = this.selected.includes(dateString)
    const disabled = this.disabled.includes(dateString)
    const dateElement = createDateElement({
      dateString,
      datepickerPlus: this,
      options: { checked, disabled }
    })
    return dateElement
  }

  render() {
    console.count('RENDER:')
    return renderContainer(this.viewList, this.plusConfig.stylesheetUrl)
  }
  
}
