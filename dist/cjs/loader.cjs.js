'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-a5da1c9b.js');

const defineCustomElements = (win, options) => {
  return __chunk_1.patchEsm().then(() => {
    __chunk_1.bootstrapLazy([["select-date-range.cjs",[[1,"select-date-range",{"selectMode":[1,"select-mode"],"viewRangeStart":[1,"view-range-start"],"viewRangeEnd":[1,"view-range-end"],"checkedDates":[1,"checked-dates"],"onDateSelect":[16],"config":[32],"checked":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
