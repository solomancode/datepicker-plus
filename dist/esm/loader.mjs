import { a as patchEsm, b as bootstrapLazy } from './chunk-c703814f.js';

const defineCustomElements = (win, options) => {
  return patchEsm().then(() => {
    bootstrapLazy([["select-date-range",[[1,"select-date-range",{"selectMode":[1,"select-mode"],"viewRangeStart":[1,"view-range-start"],"viewRangeEnd":[1,"view-range-end"],"checkedDates":[1,"checked-dates"],"disabledDates":[1,"disabled-dates"],"stylesheetUrl":[1,"stylesheet-url"],"config":[32],"dayClassList":[32]}]]]], options);
  });
};

export { defineCustomElements };
