/**
 * The standard date format for datepicker component
 * is the DateString. DateString is a formatted string
 * that can be converted to a Javascript Date Object.
 * 
 * example dateString:
 * 2019-10-19 (YYYY-MM-dd)
 */
export type DateString = string

/**
 * datepicker plus supports three selection mode
 * - select a single date
 * - select multiple distinct dates
 * - select a range between two dates
 */
export type SelectMode = 'single' | 'multiple' | 'range'

/**
 * available week header modes
 * - single header per calendar
 * - one header per month
 */
export type WeekHeader = 'single' | 'per-month'

/**
 * I18n week day required content
 */
export interface IWeekDay {
  name: string,
  abbr: string,
  isWeekend?: boolean
}

/**
 * I18n month required content
 */
export interface IMonth {
  name: string,
  abbr: string
}

/**
 * Select scope controller enables/disables
 * select scope for the active selection
 */
export interface IScopeController {
  activate: (dateString: DateString, scopeSize: number) => void
  deactivate: () => void
}

/**
 * datepicker web component configuration
 */
export interface IPlusConfig {
    /**
     * Optionally set select mode to one of the available
     * select modes listed below:
     * 
     * 'single'   - select a single date 
     * 'multiple' - select multiple distinct dates
     * 'range'    - select a range between two dates (default)
     */
    selectMode?: SelectMode
    
    /**
     * Optionally set the view range given the pair
     * (start date string, end date string).
     * 
     * if not provided, the current month will be
     * the default view range.
     */
    viewRange ?: [DateString, DateString]
  
    /**
     * Optionally provide one 'dateString', date attribute
     * or more to be selected on init.
     */
    selected  ?: DateString[]
  
    /**
     * Optionally provide one 'dateString', date attribute
     * to be disabled on init.
     */
    disabled  ?: DateString[]
  
    /**
     * Optionally select week header mode.
     * 
     * there are two modes available:
     * 'single'     - a single header for all months
     * 'per-month'  - each month has his own header (default)
     */
    weekHeader?: WeekHeader
  
    /**
     * Optionally set a scope size. if present
     * a scope size larger than 0. on date select
     * the user will be limited to choose from within
     * the scope.
     * 
     * for example, give the configuration below.
     * { selectScopeSize: 7 }
     * 
     * The user can select up to 7 dates
     * [-6][-5][-4][-3][-2][-1][ <-*-> ][1][2][3][4][5][6]
     */
    selectScopeSize?: number
  
    /**
     * Optionally provide a custom style sheet url to be
     * loaded and injected inside the datepicker component.
     */
    stylesheetUrl ?: string
  
    /**
     * optionally provide a localized content
     * for datepicker.
     */
    i18n?: {
      /**
       * (default)
       *  1 Sunday     (Sun)
       *  2 Monday     (Mon)
       *  3 Tuesday    (Tue)
       *  4 Wednesday  (Wed)
       *  5 Thursday   (Thu)
       *  6 Friday     (Fri)
       *  7 Saturday   (Sat)
       */
      weekDays?: IWeekDay[]
      /**
       * (default)
       *  01 January        (Jan)
       *  02 February       (Feb)
       *  03 March          (Mar)
       *  04 April          (Apr)
       *  05 May            (May)
       *  06 June           (Jun)
       *  07 July           (Jul)
       *  08 August         (Aug)
       *  09 September      (Sep)
       *  10 October        (Oct)
       *  11 November       (Nov)
       *  12 December       (Dec)
       */
      months?: IMonth[]
    }
    
    /**
     * Optionally select datepicker layout
     * 'vertical' (default)
     */
    layout?: 'vertical' | 'horizontal'
  }