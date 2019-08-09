import { Component, Prop, Watch, State, Event, EventEmitter, h } from '@stencil/core';
import { renderContainer } from './templates';
import { IDateElement, createDateElement, createdDateElements } from './createDateElement';
import { getDateRange, dateToString, isSameDate, getNextDay, getDatesBetween, parsePropJSON } from './utils';
import { SelectMode, DEFAULT_CONFIG, DEFAULT_CLASSES } from './config';

export type DateString = string

export interface IConfig {
  viewRangeStart?: DateString
  viewRangeEnd?: DateString
  checkedDates?: DateString
  selectMode?: SelectMode
}

@Component({
  tag: 'datepicker-plus',
  styleUrl: 'datepicker-plus.css',
  shadow: true
})
export class SelectDateRange {
  
  private viewList: Array<IDateElement[]> = [];
  
  @Prop() selectMode: string
  @Prop() viewRangeStart: string
  @Prop() viewRangeEnd: string
  @Prop() checkedDates: string
  @Prop() disabledDates: string
  @Prop() stylesheetUrl: string

  @Prop() plusConfig: string;

  @Watch('plusConfig')
  parseConfig(config: string) {
    const parsed = parsePropJSON(config)
    console.log(parsed)
  }

  /**
   * Parsed date list...
   */
  private checkedDatesInput: string[] = []
  private disabledDatesInput: string[] = []
  
  @Event() onDateSelect: EventEmitter<IDateElement>
  @Event() onDateDeselect: EventEmitter<IDateElement>
  
  get events() {
    return {
      onDateSelect: this.onDateSelect,
      onDateDeselect: this.onDateDeselect
    }
  }
  
  @State() _config = DEFAULT_CONFIG
  @State() dayClassList = DEFAULT_CLASSES.day;

  @Watch('checkedDates')
  parseCheckedDates(dates: string | string[]) {
    if (typeof dates === 'string') {
      dates = parsePropJSON(dates)
    }
    this.selectDates(dates as string[])
    this.checkedDatesInput = dates as string[] || [];
  }

  @Watch('disabledDates')
  parseDisabledDates(dates: string | string[]) {
    if (typeof dates === 'string') {
      dates = parsePropJSON(dates)
    }
    this.disableDates(dates as string[])
    this.disabledDatesInput = dates as string[] || [];
  }

  componentWillLoad() {
    this.parseCheckedDates(this.checkedDates)
    this.parseDisabledDates(this.disabledDates)
    this.parseConfig(this.plusConfig)
    this.updateConfig()
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
    dateElement && dateElement.select()
  }
  
  selectDates = (dateString: string[]) => {
    if (this._config.selectMode==='range') {
      const datesRange = getDatesBetween(dateString[0], dateString[1]);
      [dateString[0],...datesRange,dateString[1]].forEach(this.selectDate)
    } else {
      dateString.forEach(this.selectDate)
    }
  }

  disableDates = (dateString: string[]) => {
    dateString.forEach(dateStr => {
      const dateElement = this.getDateElement(dateStr)
      dateElement && dateElement.disable()
    })
  }

  isSelectedDate = (dateString: string) => {
    this.getDateElement(dateString).checked
  }

  clearSelected() {
    this.checkedDatesInput.forEach(dateString => {
      const dateElement: IDateElement = this.getDateElement(dateString)
      dateElement && dateElement.deselect()
    })
    if (this._config.selectMode==='range') {
      const [start, end] = this.checkedDatesInput
      let dates = getDatesBetween(start, end)
      dates.forEach(dateString => {
        const dateElement: IDateElement = this.getDateElement(dateString)
        dateElement && dateElement.deselect()
      });
    }
    this.checkedDatesInput = []
  }

  private createDate = (date: Date) => {
    const dateString = dateToString(date)
    return createDateElement({
      dateString,
      events: this.events
    })
  }
  
  private updateViewList(config: IConfig = this._config) {
    let lastIndex = null
    let monthDates = []
    this.viewList = []
    let [ currentDate, endDate ] = getDateRange(config.viewRangeStart, config.viewRangeEnd)
    while (!isSameDate(currentDate, endDate)) {
      const date = this.createDate(currentDate)
      if (lastIndex !== null && lastIndex !== date.month) {
        this.viewList.push(monthDates)
        monthDates = []
      } else {
        monthDates.push(date)
        currentDate = getNextDay(currentDate) as Date
      }
      lastIndex = date.month;
    }
    this.selectDates(this.checkedDatesInput)
    this.disableDates(this.disabledDatesInput)
    this.viewList.push(monthDates)
    
    return Object.create({
      render: () => renderContainer(this.viewList)
    })
  }

  updateConfig(config?: IConfig) {
    if (config) {
      Object.assign(this._config, config)
    } else {
      const { viewRangeStart, viewRangeEnd, checkedDates, selectMode } = this
      if (viewRangeStart) this._config.viewRangeStart = viewRangeStart
      if (viewRangeEnd) this._config.viewRangeEnd = viewRangeEnd
      if (checkedDates) this._config.checkedDates = checkedDates
      if (this.selectMode) this._config.selectMode = selectMode as SelectMode;
    }
  }

  loadStylesheet() {
    return this.stylesheetUrl ? <link rel="stylesheet" type="text/css" href={this.stylesheetUrl}/> : null 
  }
  
  render() {
    return [
      this.loadStylesheet(),
      this.updateViewList().render()
    ]
  }
  
}
