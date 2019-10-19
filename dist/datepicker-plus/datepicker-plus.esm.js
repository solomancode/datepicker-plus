import { p as patchBrowser, g as globals, b as bootstrapLazy } from './chunk-3bfffd8a.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["datepicker-plus",[[1,"datepicker-plus",{"plusConfig":[16],"viewElements":[32]}]]]], { resourcesUrl });
});
