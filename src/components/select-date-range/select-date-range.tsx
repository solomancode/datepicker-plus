import { Component, Prop, Watch, State } from '@stencil/core';
import { renderMonth } from './templates';
import { IDateElement, createDateElement } from './createDateElement';
import { getDateRange, dateToString, isSameDate, getNextDay, dateStringInRange } from './utils';
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
   * On Select date
   * if false is returned date select will cancel
   */
  @Prop() onDateSelect: (dateString: string, date: Date) => void | boolean;
  
  @State() config = DEFAULT_CONFIG
  
  @State() checked = {}

  @Watch('checkedDates')
  parseCheckedDates(dates: string | string[]) {
    if (typeof dates === 'string') {
      dates = dates.replace(/'/g,'"')
      dates = JSON.parse(dates)
    }
    (dates as string[]).forEach(date => this.checked[date] = true)
  }

  componentWillLoad() {
    this.parseCheckedDates(this.checkedDates)
    this.updateConfig()
  }
  
  private isCheckedDate(dateString: string) {
    if (this.config.selectMode==='range') {
      let range = Object.keys(this.checked) as [string, string]
      return dateStringInRange(dateString, range)
    } else {
      return (dateString in this.checked)
    }
  }

  dispatchOnSelect(target: IDateElement,dateString: string, date: Date) {
    if ('onSelect' in target.events) {
      return target.events.onSelect(dateString, date)
    }
  }
  
  bindOnSelect(date: IDateElement) {
    if (this.onDateSelect) {
      date.bindEvent('onSelect', this.onDateSelect)
    }
  }

  private createDate(date: Date) {
    const dateString = dateToString(date)
    const dateElement = createDateElement(dateString)
    this.bindOnSelect(dateElement)
    let isChecked = this.isCheckedDate(dateString)
    if (isChecked) {
      const canSelect = this.dispatchOnSelect(dateElement, dateString, date)
      if (canSelect!==false) dateElement.select()
    }
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
        currentDate = getNextDay(currentDate)
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
