/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface SelectDateRange {
    'checkedDates': string;
    /**
    * On Select date if false is returned date select will cancel
    */
    'onSelect': (dateString: string, date: Date) => void | boolean;
    'selectMode': string;
    'viewRangeEnd': string;
    'viewRangeStart': string;
  }
}

declare global {


  interface HTMLSelectDateRangeElement extends Components.SelectDateRange, HTMLStencilElement {}
  var HTMLSelectDateRangeElement: {
    prototype: HTMLSelectDateRangeElement;
    new (): HTMLSelectDateRangeElement;
  };
  interface HTMLElementTagNameMap {
    'select-date-range': HTMLSelectDateRangeElement;
  }
}

declare namespace LocalJSX {
  interface SelectDateRange extends JSXBase.HTMLAttributes<HTMLSelectDateRangeElement> {
    'checkedDates'?: string;
    /**
    * On Select date if false is returned date select will cancel
    */
    'onSelect'?: (dateString: string, date: Date) => void | boolean;
    'selectMode'?: string;
    'viewRangeEnd'?: string;
    'viewRangeStart'?: string;
  }

  interface IntrinsicElements {
    'select-date-range': SelectDateRange;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


