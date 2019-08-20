import { a as patchEsm, b as bootstrapLazy } from './chunk-4f500da2.js';
var defineCustomElements = function (win, options) {
    return patchEsm().then(function () {
        bootstrapLazy([["datepicker-plus", [[1, "datepicker-plus", { "plusConfig": [16], "viewElements": [32], "viewList": [32] }]]]], options);
    });
};
export { defineCustomElements };
