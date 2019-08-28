import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';
import { DEFAULT_CONFIG, IMonth, IWeekDay, SelectMode } from './config';
import { DateElement } from './DateElement';
import { renderContainer } from './templates';
import { checkIfValidDateString, getScopeRange, groupDates, patchArray, unfoldRange } from './utils';
import { attributeChecks } from './attributes';

export type DateString = string
export type WeekHeader = 'single' | 'per-month'

export interface IScopeController {
  activate: (dateString: DateString, scopeSize: number) => void
  deactivate: () => void
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

  private dateRegistry: {[key: string]: DateElement} = {
    /** LOOKUP ELEMENTS */
  }

  @State() viewElements: DateElement[][
    /** ...MONTHS */
  ] = []

  private selected: DateString[] = [
    /** SELECTED */
  ];

  public disabled: DateString[] = [
    /** DISABLED */
  ];
  
  public highlighted: DateString[] = [
    /** HIGHLIGHTED */
  ];
  
  public activeScope: IScopeController = null
  
  @Event() onDateSelect: EventEmitter<DateString[]>
  @Event() onDateDeselect: EventEmitter<DateString[]>
  @Event() onRangeSelect: EventEmitter<DateString[]>

  componentWillLoad() {
    this.plusConfig = { ...DEFAULT_CONFIG, ...this.plusConfig }
    this.patchConfigLists()
    if (this.plusConfig.layout==='horizontal') {
      this.plusConfig.weekHeader = 'per-month'
    }
  }

  componentDidLoad() {

    /**
     * UNFOLD DATE STRING RANGE
     * CREATE & REGISTER
     * UPDATE VIEW ELEMENTS
     */
    const viewRange = this.unfoldViewRange(this.plusConfig.viewRange)
    const createdElements = viewRange.map(month => month.map(this.registerDate))
    this.viewElements = createdElements
    
    // disable
    const disabled = this.unfoldDateStringList(this.plusConfig.disabled)
    this.disableMultipleDates(disabled)
    
    // select
    this.plusConfig.selected.forEach(this.select)
  }
  
  private unfoldDateStringList = (disabled: DateString[]) => {
    if (!disabled.length) return [];
    return disabled.map(dateString => {
      return checkIfValidDateString(dateString) ? [dateString]: this.unfoldAttribute(dateString)
    }).reduce((p,n)=>[...p,...n])
  }

  private patchConfigLists = () => {
    const { months: default_months, weekDays: default_weekDays } = DEFAULT_CONFIG.i18n
    const { months, weekDays } = this.plusConfig.i18n
    this.plusConfig.i18n.months = patchArray(months, default_months)
    this.plusConfig.i18n.weekDays = patchArray(weekDays, default_weekDays)
  }

  unfoldViewRange([ start, end ]: [DateString, DateString]) {
    const dates = unfoldRange(start, end)
    return groupDates(dates).toArray()
  }

  select = (dateString: DateString) => {

    const { selectMode } = this.plusConfig

    // generate selected list
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

    // check if has disabled or return prev. state
    const hasDisabled = this.checkIfHasDisabled(selectList, this.disabled);
    if (hasDisabled) return this.viewElements;
    
    // generate select scope if range mode active
    const scopeSize = this.plusConfig.selectScopeSize

    if (selectMode==='range' && scopeSize > 0) {
      if (!this.activeScope) {
        this.activeScope = this.generateScope(this.disabled)
        this.activeScope.activate(dateString, scopeSize)
      } else {
        this.activeScope.deactivate()
      }
    }

    // reset selected
    this.deselect(this.selected)
    
    // apply selected
    this.selectMultipleDates(selectList)

    // emit
    this.onDateSelect.emit(this.selected)
    if (selectMode==='range' && this.selected.length > 1) this.onRangeSelect.emit(this.selected)
  }

  deselect = (dateStringList: DateString[]) => {
    const { selectMode } = this.plusConfig
    if (selectMode==='range') {
      dateStringList = this.selected
      if (this.activeScope && dateStringList.length===1) this.activeScope.deactivate()
    }
    dateStringList.forEach(dateString => {
      const dateElement = this.getDateElement(dateString)
      dateElement.setAttr('checked', false)
      // clean range attributes
      if (selectMode==='range') {
        dateElement.resetRangeAttributes()
      }
      dateElement.updateDateClasses()
    })
    this.selected = this.selected.filter(s => !(dateStringList.includes(s)))
    this.clearHighlighted()
  }

  generateScope(disabledSnapshot: DateString[]): IScopeController {
    return {
      activate: (dateString: DateString, scopeSize: number) => {
        const [scopeStart, scopeEnd] = getScopeRange(dateString, scopeSize)
        const [viewStart, viewEnd] = this.plusConfig.viewRange
        const disableTargets = [
          ...unfoldRange(viewStart, scopeStart),
          ...unfoldRange(scopeEnd, viewEnd)
        ];
        this.disableMultipleDates(disableTargets);
      },
      deactivate: () => {
        this.enableMultipleDates(this.disabled)
        this.disableMultipleDates(disabledSnapshot)
        this.activeScope = null;
      }
    }
  }

  highlightON(dateString: DateString) {
    if (this.plusConfig.selectMode==='range' && this.selected.length===1) {
      this.clearHighlighted()
      this.highlighted = unfoldRange(this.selected[0], dateString);
      this.highlighted.forEach(dateString => {
        const dateElement = this.getDateElement(dateString)
        dateElement.setAttr('highlighted', true)
      })
    }
  }

  clearHighlighted() {
    this.highlighted.forEach(dateString => {
      const dateElement = this.getDateElement(dateString);
      if (dateElement) dateElement.removeAttr('highlighted')
    })
    this.highlighted = [];
  }
  
  checkIfHasDisabled(selected: DateString[], disabled: DateString[]) {
    const map = {}
    disabled.forEach(d=>map[d]=true)
    return selected.some(s=>(s in map))
  }
  
  getDateElement = (dateString: DateString): DateElement => {
    return this.dateRegistry[dateString]
  }
  
  selectMultipleDates(dateStringList: DateString[]) {
    dateStringList.forEach(dateString => {
      const dateElement = this.getDateElement(dateString);
      if (!dateElement) return;
      dateElement.setAttr('checked', true);
      if (dateStringList.length > 1) {
        const checked = dateElement.getAttr('checked')
        dateElement.setAttr('rangeIndex', checked ? dateStringList.indexOf(dateElement.dateString) : null )
        dateElement.setAttr('rangeEndIndex', checked ? dateStringList.length - 1 : null )
      }
      if (this.plusConfig.selectMode==='range') {
        const { rangeStart, rangeEnd, connector } = attributeChecks
        dateElement.updateAttributes({ rangeStart, rangeEnd, connector })
      }
    })
    this.selected = dateStringList;
  }

  disableMultipleDates(dateStringList: DateString[]) {
    this.disabled = dateStringList.filter(dateString => {
      const dateElement = this.getDateElement(dateString);
      if (!dateElement) return false;
      dateElement.setAttr('disabled', true);
      return true;
    })
  }

  enableMultipleDates(dateStringList: DateString[]) {
    dateStringList.forEach(dateString => {
      const dateElement = this.getDateElement(dateString);
      if (!dateElement) return;
      dateElement.setAttr('disabled', false);
    })
    this.disabled = this.disabled.filter(dateString => !dateStringList.includes(dateString))
  }

  unfoldAttribute = (attr: string): DateString[] => {
    const unfolded = []
    this.viewElements
        .reduce((p,n)=>[...p,...n])
        .forEach(dateElement => {
          if (dateElement.getAttr(attr)) {
            unfolded.push(dateElement.dateString)
          }
        });
    return unfolded;
  }

  registerDate = (dateString: DateString) => {
    if (dateString in this.dateRegistry) return this.dateRegistry[dateString];
    const dateElement = new DateElement(dateString)
    this.dateRegistry[dateString] = dateElement
    return dateElement
  }

  render() {
    console.count('RENDER...')
    return renderContainer.call(this, this.viewElements, this.plusConfig)
  }
  
}
