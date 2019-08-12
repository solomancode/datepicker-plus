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

  // @Watch('selected')
  // parseSelected(selected: DateString[]) {
    
  // }

  @Watch('disabled')
  disableAll(disabled: DateString[]) {
    disabled.forEach(dateStr => {
      const dateElement = this.getDateElement(dateStr)
      dateElement && dateElement.disable()
    })
  }

  private addRangeMark = (rangeMark: DateString) => {
    if (this.rangeStart===null) {
      this.rangeStart = rangeMark
    } else {
      const start = this.rangeStart
      const end = rangeMark
      const inBetween = getDatesBetween(start, end);
      // TODO: inBetween +class 'connector'
      const fullRange = [start,...inBetween,end]
      this.clearSelected()
      this.selected = fullRange;
      this.rangeStart = null;
    }
  }
  
  @Watch('plusConfig')
  updateConfig(config: IPlusConfig) {
    if (config.selectMode==='range') {
      this.addRangeMark(config.selected[0])
      this.addRangeMark(config.selected[1])
    } else {
      this.selected = config.selected
    }
    this.disabled = config.disabled
    this.parseViewRange(config.viewRange)
  }
    
  @Event() onDateSelect: EventEmitter<IDateElement>
  @Event() onDateDeselect: EventEmitter<IDateElement>

  /**
   * Internal event onClick...
   */
  @Event() onDateClick: EventEmitter<IDateElement>

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
  
  selectDate = (dateString: string) => {
    const dateElement = this.getDateElement(dateString)
    dateElement.checked = true
    const { selectMode } = this.plusConfig
    if (selectMode==='single') {
      this.selected = [dateString]
    } else if (selectMode==='range') {
      this.addRangeMark(dateString)
    }
    this.onDateSelect.emit(dateElement)
  }

  deselectDate = (dateString: string) => {
    const dateElement = this.getDateElement(dateString)
    dateElement.checked = false
    this.onDateDeselect.emit(dateElement)
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
  
  clearSelected() {
    this.selected.forEach(dateString => {
      const dateElement: IDateElement = this.getDateElement(dateString)
      dateElement && this.deselectDate(dateString)
    })
    this.plusConfig.selected = []
    this.selected = []
  }

  resetDisabled() {
    this.disabled.forEach(dateString => {
      const dateElement: IDateElement = this.getDateElement(dateString)
      dateElement && dateElement.enable()
    })
    this.plusConfig.disabled = []
    this.disabled = []
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

  // private reselectRangeOnClick = (e: UIEvent) => {
  //   const RS = this.rangeStart !== null;
  //   const RE = this.rangeEnd !== null;
  //   if ((RS&&RE)||(!RS&&!RE)) {
  //     // RS + RE clear and re-select RS
  //     // !RS + !RE clear and re-select RS
  //     console.log(e)
  //   } else if (RS&&!RE) {
  //     // RS + !RE clear and re-select RE
  //   }
  // }

  private c = 1;
  render() {
    // this.loadStylesheet(),
    console.log('%cRENDER x ' + this.c,'color: crimson')
    return renderContainer(this.viewList, this.plusConfig.stylesheetUrl)
  }
  
}
