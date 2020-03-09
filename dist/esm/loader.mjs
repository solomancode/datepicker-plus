import { a as patchEsm, b as bootstrapLazy } from './chunk-fcdf5eaf.js';

const defineCustomElements = (win, options) => {
  return patchEsm().then(() => {
    bootstrapLazy([["datepicker-plus",[[1,"datepicker-plus",{"plusConfig":[16],"viewElements":[32]}]]]], options);
  });
};

export { defineCustomElements };
