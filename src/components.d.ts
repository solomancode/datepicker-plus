/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  DateString,
  IPlusConfig,
} from './datepicker-plus';

export namespace Components {
  interface DatepickerPlus {
    /**
    * date picker plus config passed as a prop.
    */
    'plusConfig': IPlusConfig;
  }
}

declare global {


  interface HTMLDatepickerPlusElement extends Components.DatepickerPlus, HTMLStencilElement {}
  var HTMLDatepickerPlusElement: {
    prototype: HTMLDatepickerPlusElement;
    new (): HTMLDatepickerPlusElement;
  };
  interface HTMLElementTagNameMap {
    'datepicker-plus': HTMLDatepickerPlusElement;
  }
}

declare namespace LocalJSX {
  interface DatepickerPlus extends JSXBase.HTMLAttributes<HTMLDatepickerPlusElement> {
    /**
    * emits when a date is selected. use it to react to date selected
    */
    'onOnDateSelect'?: (event: CustomEvent<DateString[]>) => void;
    /**
    * emits when a date is deselected use it to react to date deselected
    */
    'onOnDeselect'?: (event: CustomEvent<DateString[]>) => void;
    /**
    * emits when a date or more is highlighted as potential select candidate
    */
    'onOnHighlight'?: (event: CustomEvent<DateString[]>) => void;
    /**
    * emits when date highlight is cleared after dates deselect
    */
    'onOnHighlightClear'?: (event: CustomEvent<void>) => void;
    /**
    * emits when a complete date range is selected use it to react to a complete date range selected
    */
    'onOnRangeSelect'?: (event: CustomEvent<DateString[]>) => void;
    /**
    * date picker plus config passed as a prop.
    */
    'plusConfig'?: IPlusConfig;
  }

  interface IntrinsicElements {
    'datepicker-plus': DatepickerPlus;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


