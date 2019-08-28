import { p as patchBrowser, b as bootstrapLazy } from './chunk-fcdf5eaf.js';

patchBrowser().then(resourcesUrl => {
  return bootstrapLazy([["datepicker-plus",[[1,"datepicker-plus",{"plusConfig":[16],"viewElements":[32]}]]]], { resourcesUrl });
});
