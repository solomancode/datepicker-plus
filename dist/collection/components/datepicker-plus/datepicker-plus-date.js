// import { FunctionalComponent, h } from '@stencil/core';
// import { DateElement } from './createDateElement';
// import { DEFAULT_CLASSES } from './config';
// export interface IDatepickerPlusDate {
//   date: DateElement;
// }
// export const DatepickerPlusDate: FunctionalComponent<IDatepickerPlusDate> = ({ date }) => {
//   const onChange = (e) => {
//     const dateString = date.dateString()
//     const { select, deselect } = date.datepickerPlus
//     if (e.target.checked) {
//       date.datepickerPlus.activateSelectScope(date)
//       select(dateString)
//     } else {
//       date.datepickerPlus.deactivateSelectScope()
//       deselect(dateString)
//     }
//     date.datepickerPlus.highlighted = 'rangeSelect'
//   }
//   const onEnter = () => date.datepickerPlus.highlighted = date.dateString();
//   const onLeave = () => date.datepickerPlus.highlighted = null;
//   return (
//     <time part="day" class={date.classListString} dateTime={date.dateString()}>
//       <label onMouseEnter={onEnter.bind(this)} onMouseLeave={onLeave.bind(this)}>
//         {date.day}
//         <input
//           ref={el=>date.el=el}
//           onChange={(e)=>onChange(e)}
//           checked={date.checked} disabled={date.disabled}
//           class={DEFAULT_CLASSES.checkbox}
//           type="checkbox" value={date.dateString()}/>
//       </label>
//     </time>
//   )
// }
