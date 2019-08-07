import { Component, Prop, Watch, State, Event, EventEmitter } from '@stencil/core';
import { renderMonth } from './templates';
import { IDateElement, createDateElement, createdDateElements } from './createDateElement';
import { getDateRange, dateToString, isSameDate, getNextDay, getDatesBetween, parsePropJSON } from './utils';
import { SelectMode, DEFAULT_CONFIG } from './config';

export type DateString = string

export interface IConfig {
  viewRangeStart?: DateString
  viewRangeEnd?: DateString
  checkedDates?: DateString
  selectMode?: SelectMode
}

@Component({
  tag: 'select-date-range',
  styleUrl: 'select-date-range.css',
  shadow: true
})
export class SelectDateRange {
  
  private viewList: Array<IDateElement[]> = [];
  
  @Prop() selectMode: string
  @Prop() viewRangeStart: string
  @Prop() viewRangeEnd: string
  @Prop() checkedDates: string
  @Prop() disabledDates: string

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
  
  @State() config = DEFAULT_CONFIG

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
    // this.parseDisabledRange(this.disabledRange)
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
    if (this.config.selectMode==='range') {
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
    if (this.config.selectMode==='range') {
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
  
  private updateViewList(config: IConfig = this.config) {
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
      render: () => this.viewList.map(renderMonth)
    })
  }

  updateConfig(config?: IConfig) {
    if (config) {
      Object.assign(this.config, config)
    } else {
      const { viewRangeStart, viewRangeEnd, checkedDates, selectMode } = this
      if (viewRangeStart) this.config.viewRangeStart = viewRangeStart
      if (viewRangeEnd) this.config.viewRangeEnd = viewRangeEnd
      if (checkedDates) this.config.checkedDates = checkedDates
      if (this.selectMode) this.config.selectMode = selectMode as SelectMode;
    }
  }
  
  render() {
    return this.updateViewList().render()
  }
  
}
