import { p as patchBrowser, g as globals, b as bootstrapLazy } from './chunk-b75c5fc9.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["datepicker-plus",[[1,"datepicker-plus",{"plusConfig":[16],"viewList":[32],"selected":[32],"disabled":[32]}]]]], { resourcesUrl });
});
