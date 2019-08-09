import { Component, Prop, Watch, Event, EventEmitter, h } from '@stencil/core';
import { renderContainer } from './templates';
import { IDateElement, createDateElement, createdDateElements } from './createDateElement';
import { dateToString, isSameDate, getNextDay, getDatesBetween, stringToDate } from './utils';
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

  @Watch('plusConfig')
  parseConfig() {
    // TODO: handle config update
  }
  
  @Event() onDateSelect: EventEmitter<IDateElement>
  @Event() onDateDeselect: EventEmitter<IDateElement>
  
  get events() {
    return {
      onDateSelect: this.onDateSelect,
      onDateDeselect: this.onDateDeselect
    }
  }
  
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
    dateElement && dateElement.select()
  }
  
  selectDates = (dateString: string[]) => {
    if (this.plusConfig.selectMode==='range') {
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
    this.plusConfig.selected.forEach(dateString => {
      const dateElement: IDateElement = this.getDateElement(dateString)
      dateElement && dateElement.deselect()
    })
    if (this.plusConfig.selectMode==='range') {
      const [start, end] = this.plusConfig.selected
      let dates = getDatesBetween(start, end)
      dates.forEach(dateString => {
        const dateElement: IDateElement = this.getDateElement(dateString)
        dateElement && dateElement.deselect()
      });
    }
    this.plusConfig.selected = []
  }

  private createDate = (date: Date) => {
    const dateString = dateToString(date)
    debugger
    const dateElement = createDateElement({
      dateString,
      events: this.events
    })
    return dateElement
  }

  private updateViewOptions() {
    this.selectDates(this.plusConfig.selected)
    this.disableDates(this.plusConfig.disabled)
  }
  
  private updateViewList(config: IPlusConfig = this.plusConfig) {
    let lastIndex = null
    let monthDates = []
    const viewList = []
    let [ currentDate, endDate ] = config.viewRange.map(stringToDate)
    let stopDate = getNextDay(endDate) as Date;
    while (!isSameDate(currentDate, stopDate)) {
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
    this.updateViewOptions()
    return Object.create({
      render: () => renderContainer(viewList)
    })
  }

  updateConfig(config?: IPlusConfig) {
    if (config) Object.assign(this.plusConfig, config)
  }

  loadStylesheet() {
    const { stylesheetUrl } = this.plusConfig
    return stylesheetUrl ? <link rel="stylesheet" type="text/css" href={stylesheetUrl}/> : null 
  }
  
  render() {
    return [
      this.loadStylesheet(),
      this.updateViewList().render()
    ]
  }
  
}
