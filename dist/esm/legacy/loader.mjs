import { a as patchEsm, b as bootstrapLazy } from './chunk-bd497683.js';
var defineCustomElements = function (win, options) {
    return patchEsm().then(function () {
        bootstrapLazy([["select-date-range", [[1, "select-date-range", { "selectMode": [1, "select-mode"], "viewRangeStart": [1, "view-range-start"], "viewRangeEnd": [1, "view-range-end"], "checkedDates": [1, "checked-dates"], "onDateSelect": [16], "config": [32], "checked": [32] }]]]], options);
    });
};
export { defineCustomElements };
