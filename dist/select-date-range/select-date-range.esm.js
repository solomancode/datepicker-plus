import { p as patchBrowser, g as globals, b as bootstrapLazy } from './chunk-20af2f18.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["select-date-range",[[1,"select-date-range",{"selectMode":[1,"select-mode"],"viewRangeStart":[1,"view-range-start"],"viewRangeEnd":[1,"view-range-end"],"checkedDates":[1,"checked-dates"],"disabledDates":[1,"disabled-dates"],"stylesheetUrl":[1,"stylesheet-url"],"config":[1],"_config":[32],"dayClassList":[32]}]]]], { resourcesUrl });
});
