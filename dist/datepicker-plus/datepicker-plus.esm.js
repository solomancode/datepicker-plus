import { p as patchBrowser, g as globals, b as bootstrapLazy } from './chunk-74afa921.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["datepicker-plus",[[1,"datepicker-plus",{"plusConfig":[16],"viewElements":[32],"selected":[32],"viewList":[32]}]]]], { resourcesUrl });
});
