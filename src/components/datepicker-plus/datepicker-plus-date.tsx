import { FunctionalComponent, h } from '@stencil/core';
import { IDateElement } from './createDateElement';
import { DEFAULT_CLASSES } from './config';

export interface IDatepickerPlusDate {
  date: IDateElement;
}

export const DatepickerPlusDate: FunctionalComponent<IDatepickerPlusDate> = ({ date }) => (
  <time part="day" class={date.classList()} dateTime={date.dateString()}>
    <label>
      {date.day}
      <input
        ref={el=>date.el=el}
        onChange={()=>date.el.checked?date.select():date.deselect()}
        onClick={()=>date.datepickerPlus.onDateClick.emit(date)}
        checked={date.checked} disabled={date.disabled}
        class={DEFAULT_CLASSES.checkbox}
        type="checkbox" value={date.dateString()}/>
    </label>
  </time>
)