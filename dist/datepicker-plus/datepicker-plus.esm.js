import { p as patchBrowser, g as globals, b as bootstrapLazy } from './chunk-e23590cd.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["datepicker-plus",[[1,"datepicker-plus",{"selectMode":[1,"select-mode"],"viewRangeStart":[1,"view-range-start"],"viewRangeEnd":[1,"view-range-end"],"checkedDates":[1,"checked-dates"],"disabledDates":[1,"disabled-dates"],"stylesheetUrl":[1,"stylesheet-url"],"plusConfig":[1,"plus-config"],"_config":[32],"dayClassList":[32]}]]]], { resourcesUrl });
});
