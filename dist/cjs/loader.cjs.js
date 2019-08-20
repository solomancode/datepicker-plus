'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-a0b8771d.js');

const defineCustomElements = (win, options) => {
  return __chunk_1.patchEsm().then(() => {
    __chunk_1.bootstrapLazy([["datepicker-plus.cjs",[[1,"datepicker-plus",{"plusConfig":[16],"viewElements":[32],"viewList":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
