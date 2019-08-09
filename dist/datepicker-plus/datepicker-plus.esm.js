import { p as patchBrowser, g as globals, b as bootstrapLazy } from './chunk-c8f9ca54.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["datepicker-plus",[[1,"datepicker-plus",{"plusConfig":[16]}]]]], { resourcesUrl });
});
