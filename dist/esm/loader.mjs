import { a as patchEsm, b as bootstrapLazy } from './chunk-4f500da2.js';

const defineCustomElements = (win, options) => {
  return patchEsm().then(() => {
    bootstrapLazy([["datepicker-plus",[[1,"datepicker-plus",{"plusConfig":[16],"viewElements":[32],"viewList":[32]}]]]], options);
  });
};

export { defineCustomElements };
