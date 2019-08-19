import { Component, Prop, State, Watch } from '@stencil/core';
import { DEFAULT_CONFIG, IMonth, IWeekDay, SelectMode } from './config';
import { IDateElement, registerDate } from './registerDate';
import { renderContainer } from './templates';
import { groupByMonth, patchArray, unfoldRange } from './utils';

export type DateString = string
export type WeekHeader = 'single' | 'per-month'

export interface IPlusConfig {
  selectMode?: SelectMode
  viewRange ?: [DateString, DateString]
  selected  ?: DateString[]
  disabled  ?: DateString[]
  weekHeader?: WeekHeader
  selectScope?: number // in days
  stylesheetUrl ?: string
  i18n?: {
    weekDays?: IWeekDay[]
    months?: IMonth[]
  }
}

@Component({
  tag: 'datepicker-plus',
  styleUrl: 'datepicker-plus.css',
  shadow: true
})
export class DatepickerPlus {

  @Prop() plusConfig: IPlusConfig = DEFAULT_CONFIG;

  private registered: {[key: string]: IDateElement} = {
    /** LOOKUP ELEMENTS */
  }

  @State() viewElements: IDateElement[][
    /** ...MONTHS */
  ] = []

  @State() selected: DateString[] = [
    /** SELECTED DATES */
  ]

  @Watch('selected')
  updateViewSelectedElements(next: DateString[]) {
    switch (this.plusConfig.selectMode) {
      case 'single':
        this.viewElements = this.selectDate(
          next[next.length - 1], this.viewElements
        )
        break;
    
      default:
        break;
    }
  }
  
  @State() viewList: DateString[][
    /** ...MONTHS */
  ] = []

  @Watch('viewList')
  updateViewElements(next: DateString[][]) {
    this.registerViewDates(next)
    this.viewElements = next.map(
      month => month.map(dateString => {
        return this.registered[dateString]
      })
    )
  }

  componentWillLoad() {
    this.plusConfig = { ...DEFAULT_CONFIG, ...this.plusConfig }
    this.patchConfigLists()
    this.viewList = this.createViewList(this.plusConfig.viewRange)
    this.selected = this.plusConfig.selected
  }

  private patchConfigLists = () => {
    const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n
    const { months, weekDays } = this.plusConfig.i18n
    this.plusConfig.i18n.months = patchArray(months, default_months)
    this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays)
  }

  createViewList([ start, end ]: [DateString, DateString]) {
    const dates = unfoldRange(start, end)
    return groupByMonth(dates).flatten()
  }

  registerViewDates(viewList: DateString[][/** [...months] */]) {
    return viewList.forEach(month => month.forEach( dateString => {
      const registered = registerDate(this.registered, dateString)
      this.registered = registered
    }))
  }

  selectDate(dateString: DateString, viewElements: IDateElement[][]) {
    return viewElements.map(month => month.map(dateElement => {
      dateElement.checked = dateElement.dateString === dateString;
      return dateElement
    }) )
  }

  render() {
    console.count('RENDER:')
    return renderContainer.call(this, this.viewElements, this.plusConfig)
  }
  
}
