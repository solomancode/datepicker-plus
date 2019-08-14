import { Component, Prop, Watch, Event, EventEmitter, State } from '@stencil/core';
import { renderContainer } from './templates';
import { IDateElement, createDateElement, createdDateElements, IDateOptions } from './createDateElement';
import { dateToString, isSameDate, getNextDay, getDatesBetween, stringToDate, openGithubIssue, dateOffset } from './utils';
import { SelectMode, DEFAULT_CONFIG } from './config';
import * as tags from "./tags";

export type DateString = string

export interface IPlusConfig {
  selectMode: SelectMode
  viewRange : [DateString, DateString]
  selected  : DateString[]
  disabled  : DateString[]
  selectScope: number // in days
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

  /**
   * Backup disabled before scoping...
   */
  private _disabled: DateString[] = []

  @Watch('selected')
  parseSelected(next: DateString[], current: DateString[]) {
    const rangeMode = this.plusConfig.selectMode === 'range'
    const currentLastIndex = current.length - 1;
    const nextLastIndex = next.length - 1;
    // DESELECT CURRENT
    current.forEach((dateString, index) => {
      const rangeEnd = index === currentLastIndex ? { rangeEnd: null }: {};
      this.updateDateOptions(dateString, {
        checked: false,
        ...(rangeMode ? { rangeIndex: null, ...rangeEnd } : {})
      })
    })
    const isReversed = dateOffset(new Date(next[0]), new Date(next[next.length-1])) > 0
    // SELECT NEXT
    next.forEach((dateString, index) => {
      const chronoIndex = isReversed ? (next.length - index) - 1 : index;
      const rangeEnd = chronoIndex === nextLastIndex ? { rangeEnd: true }: {};
      this.updateDateOptions(dateString, {
        checked: true,
        ...(rangeMode ? { rangeIndex: chronoIndex, ...rangeEnd } : {})
      })
    })
  }

  @Watch('disabled')
  parseDisabled(next: DateString[], current: DateString[]) {
    // ENABLE CURRENT
    current.forEach(dateString => this.updateDateOptions(dateString, { disabled: false }))
    // DISABLE NEXT
    next = next.map(tag => this.unfoldTag(tag)).reduce((p,n)=>[...p,...n])
    next.forEach(dateString => this.updateDateOptions(dateString, { disabled: true }))
  }

  unfoldTag = (tag: string) => {
    if (!(tag in tags)) return [tag];
    return this.viewList.map(
      (month: IDateElement[]) => month.filter(dateElement => (tag in dateElement.tags))
    ).reduce((p,n)=>[...p,...n]).map(el=>el.dateString())
  }

  public addRangeMark = (dateString: DateString) => {
    if (this.rangeStart===null) {
      this.rangeStart = dateString
      this.selected = [dateString]
      this.onDateSelect.emit(this.getDateElement(dateString));
    } else if (this.rangeStart!==dateString) {
      const start = this.rangeStart
      const end = dateString
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
        this.onDateSelect.emit(this.getDateElement(end));
      } else {
        this.rangeStart = null
        this.selected = fullRange
        this.onRangeSelect.emit(fullRange)
      }
    }
  }

  public activateSelectScope = (dateElement: IDateElement) => {
    const selectedDate = dateElement.dateObject()
    const scope = this.plusConfig.selectScope
    if (scope > 0 && !this.rangeStart) {
      this._disabled = this.plusConfig.disabled
      const locked = this.viewList.reduce((p,n)=>[...p,...n]).map(
        dateElement => {
          const offset = dateOffset(selectedDate, dateElement.dateObject())
          return Math.abs(offset) > scope ? dateElement.dateString() : false
        }
      ).filter(d=>d)
      this.disabled = locked as string[]
    }
  }

  public deactivateSelectScope = () => {
    this.disabled = this._disabled
  }

  public resetRangeMarks = () => {
    this.rangeStart = null
    this.selected = []
  }

  updateDateOptions(dateString: DateString, options: IDateOptions) {
    const dateElement = this.getDateElement(dateString)
    if (dateElement) {
      Object.assign(dateElement, options)
      dateElement.updateClassListString()
    }
  }
  
  select = (dateString: DateString) => {
    const dateElement = this.getDateElement(dateString)
    if (dateElement) {
      switch (this.plusConfig.selectMode) {
        case 'single':
          this.selected = [dateString]
          this.onDateSelect.emit(dateElement)
          break;
        case 'multiple':
          this.selected = [...this.selected, dateString]
          this.onDateSelect.emit(dateElement)
          break;
        case 'range':
          this.addRangeMark(dateString)
          break;
      }
    }
  }

  public deselect = (dateString: DateString) => {
    const dateElement = this.getDateElement(dateString)
    if (dateElement) {
      if (this.plusConfig.selectMode==='range') {
        this.resetRangeMarks()
      } else {
        this.selected = this.selected.filter(dt => dt !== dateString)
      }
      this.onDateDeselect.emit(dateElement)
    }
  }
  
  @Watch('plusConfig')
  updateConfig(config: IPlusConfig) {
    this.parseViewRange(config.viewRange)
    this.unfoldSelected(config.selected, config.selectMode).forEach(this.select)
    this.disabled = this.plusConfig.disabled
    this._disabled = this.plusConfig.disabled
  }
    
  @Event() onDateSelect: EventEmitter<IDateElement>
  @Event() onDateDeselect: EventEmitter<IDateElement>
  @Event() onRangeSelect: EventEmitter<DateString[]>

  componentWillLoad() {
    this.plusConfig = { ...DEFAULT_CONFIG, ...this.plusConfig }
  }

  private unfoldSelected = (selected: DateString[], selectMode: SelectMode) => {
    let unfolded = selected.map(this.unfoldTag).reduce((p,n)=>[...p,...n])
    return selectMode === 'range' ? [unfolded[0],unfolded[unfolded.length-1]] : unfolded;
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
    const dateElement = createDateElement({
      dateString,
      datepickerPlus: this
    })
    return dateElement
  }

  render() {
    console.count('RENDER:')
    return renderContainer(this.viewList, this.plusConfig.stylesheetUrl)
  }
  
}
