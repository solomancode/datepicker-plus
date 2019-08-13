import { FunctionalComponent, h } from '@stencil/core';
import { IDateElement } from './createDateElement';
import { DEFAULT_CLASSES } from './config';

export interface IDatepickerPlusDate {
  date: IDateElement;
}

export const DatepickerPlusDate: FunctionalComponent<IDatepickerPlusDate> = ({ date }) => {
  const onChange = (e) => {
    const dateString = date.dateString()
    const { select, deselect } = date.datepickerPlus
    e.target.checked ? select(dateString) : deselect(dateString)
  }
  return (
    <time part="day" class={date.classListString} dateTime={date.dateString()}>
      <label>
        {date.day}
        <input
          ref={el=>date.el=el}
          onChange={(e)=>onChange(e)}
          checked={date.checked} disabled={date.disabled}
          class={DEFAULT_CLASSES.checkbox}
          type="checkbox" value={date.dateString()}/>
      </label>
    </time>
  )
}