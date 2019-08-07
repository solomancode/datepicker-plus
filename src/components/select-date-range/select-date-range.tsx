import { Component, Prop, Watch, State, Event, EventEmitter } from '@stencil/core';
import { renderMonth } from './templates';
import { IDateElement, createDateElement, createdDateElements } from './createDateElement';
import { getDateRange, dateToString, isSameDate, getNextDay, dateStringInRange, getDatesBetween } from './utils';
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

  /**
   * Parsed date list...
   */
  private checkedDatesInput: string[] = []
  
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
      dates = dates.replace(/'/g,'"')
      dates = JSON.parse(dates)
    }
    (dates as string[]).forEach(this.selectDate)
    this.checkedDatesInput = dates as string[] || [];
  }

  componentWillLoad() {
    this.parseCheckedDates(this.checkedDates)
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

  isSelectedDate = (dateString: string) => {
    this.getDateElement(dateString).checked
  }
  
  private isCheckedDate(dateString: string) {
    if (this.config.selectMode==='range') {
      let range = this.checkedDatesInput as [string, string]
      return dateStringInRange(dateString, range)
    } else {
      return this.getDateElement(dateString).checked
    }
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
    const dateElement = createDateElement({
      dateString,
      events: this.events
    })
    let isChecked = this.isCheckedDate(dateString)
    isChecked && dateElement.select()
    return dateElement
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
