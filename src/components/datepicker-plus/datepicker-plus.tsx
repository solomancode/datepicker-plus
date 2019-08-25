import { Component, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import { DEFAULT_CONFIG, IMonth, IWeekDay, SelectMode } from './config';
import { IDateElement, registerDate } from './registerDate';
import { TagPredicate, tags } from './tags';
import { renderContainer } from './templates';
import { dateStringInRange, getScopeRange, groupByMonth, patchArray, unfoldRange } from './utils';

export type DateString = string
export type WeekHeader = 'single' | 'per-month'

export interface IScopeController {
  activate: (dateString: DateString, scopeSize: number) => IDateElement[][]
  deactivate: () => IDateElement[][]
}

export interface IPlusConfig {
  selectMode?: SelectMode
  viewRange ?: [DateString, DateString]
  selected  ?: DateString[]
  disabled  ?: DateString[]
  weekHeader?: WeekHeader
  selectScopeSize?: number // in days
  stylesheetUrl ?: string
  i18n?: {
    weekDays?: IWeekDay[]
    months?: IMonth[]
  }
  layout?: 'vertical' | 'horizontal'
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

  private selected: DateString[] = [
    /** SELECTED */
  ];

  public disabled: DateString[] = [
    /** DISABLED */
  ];
  
  @State() viewList: DateString[][
    /** ...MONTHS */
  ] = []

  public activeScope: IScopeController = null
  
  @Event() onDateSelect: EventEmitter<DateString[]>
  @Event() onDateDeselect: EventEmitter<DateString[]>
  @Event() onRangeSelect: EventEmitter<DateString[]>

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
    this.updateTags(tags, this.viewElements)
    this.plusConfig.disabled = this.unfoldDisabledList(this.plusConfig.disabled)
    this.disableMultipleDates(this.plusConfig.disabled, this.viewElements)
    this.plusConfig.selected.forEach(this.select)
    if (this.plusConfig.layout==='horizontal') {
      this.plusConfig.weekHeader = 'per-month'
    }
  }

  private unfoldDisabledList = (disabled: DateString[]) => {
    if (!disabled.length) return [];
    return disabled.map(tag => this.unfoldTag(tag, tags)).reduce((p,n)=>[...p,...n])
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

  select = (dateString: DateString) => {
    const { selectMode } = this.plusConfig
    let selectList = []
    if (selectMode === 'single') {
      selectList = [dateString]
    } else if (selectMode === 'multiple') {
      selectList = [...this.selected, dateString]
    } else if (selectMode === 'range') {
      if (this.selected.includes(dateString)) {
        selectList = []
      } else if (this.selected.length === 1) {
        selectList = unfoldRange(this.selected[0], dateString)
      } else {
        selectList = [dateString]
      }
    }
    const hasDisabled = this.checkIfHasDisabled(selectList, this.disabled);
    if (hasDisabled) return this.viewElements;
    const scopeSize = this.plusConfig.selectScopeSize
    if (selectMode==='range' && scopeSize > 0) {
      if (!this.activeScope) {
        this.activeScope = this.generateScope(this.viewElements, this.disabled)
        this.activeScope.activate(dateString, scopeSize)
      } else {
        this.activeScope.deactivate()
      }
    }

    const selectedViewElements = this.selectMultipleDates(
      selectList, this.viewElements
    )
    
    this.viewElements = this.updateTags(tags, selectedViewElements)
    this.selected = selectList
    this.onDateSelect.emit(this.selected)
    if (selectMode==='range' && this.selected.length > 1) this.onRangeSelect.emit(this.selected)
  }

  deselect = (dateString: DateString) => {
    const { selectMode } = this.plusConfig
    let selectList = []
    if (selectMode === 'multiple') {
      selectList = this.selected.filter(s=>s!==dateString)
    }
    if (selectMode === 'range') {
      if (this.activeScope) this.activeScope.deactivate()
    }
    const selected = this.selectMultipleDates(
      selectList, this.viewElements
    )
    this.viewElements = this.updateTags(tags, selected)
    this.selected = selectList
  }

  generateScope(viewElements: IDateElement[][], disabledCache: DateString[]): IScopeController {
    let disabled = []
    return {
      activate: (dateString: DateString, scopeSize: number) => {
        const scopeRange = getScopeRange(dateString, scopeSize)
        return viewElements.map(month => month.map((dateElement) => {
          const inScope = dateStringInRange(dateElement.dateString, scopeRange)
          if (inScope) {
            dateElement.disabled = false
          } else {
            dateElement.disabled = true
            this.disabled.push(dateElement.dateString)
          }
          this.disabled = disabled;
          return dateElement
        }))
      },
      deactivate: () => {
        const disabled = this.disableMultipleDates(disabledCache, this.viewElements)
        this.activeScope = null;
        return disabled
      }
    }
  }
  
  checkIfHasDisabled(selected: DateString[], disabled: DateString[]) {
    const map = {}
    disabled.forEach(d=>map[d]=true)
    return selected.some(s=>(s in map))
  }
  
  selectMultipleDates(dateStringList: DateString[], viewElements: IDateElement[][]) {
    return viewElements.map(month => month.map((dateElement) => {
      dateElement.checked = dateStringList.includes(dateElement.dateString);
      if (dateStringList.length > 1) {
        dateElement.rangeIndex = dateElement.checked ? dateStringList.indexOf(dateElement.dateString) : null;
        dateElement.rangeEndIndex = dateElement.checked ? dateStringList.length - 1 : null;
      }
      return dateElement
    }) )
  }

  disableMultipleDates(dateStringList: DateString[], viewElements: IDateElement[][]) {
    let disabled = []
    const withDisabled = viewElements.map(month => month.map(dateElement => {
      const isDisabled = dateStringList.includes(dateElement.dateString)
      dateElement.disabled = isDisabled
      if (isDisabled) disabled.push(dateElement.dateString);
      return dateElement
    }) )
    this.disabled = disabled
    return withDisabled
  }

  unfoldTag = (tag: string, tags: {[key: string]: TagPredicate}) => {
    if (!(tag in tags)) return [tag];
    return this.viewElements.map(
      (month: IDateElement[]) => month.filter(dateElement => dateElement.tags[tag]===true)
    ).reduce((p,n)=>[...p,...n]).map(dateElement=>dateElement.dateString)
  }

  updateTags(tags: {[key: string]: TagPredicate}, viewElements: IDateElement[][]) {
    if (viewElements) {
      return viewElements.map(month => month.map((dateElement) => {
        for (const tag in tags) {
          dateElement.tags[tag] = tags[tag](dateElement)
        }
        return dateElement
      }) )
    }
  }

  render() {
    return renderContainer.call(this, this.viewElements, this.plusConfig)
  }
  
}
