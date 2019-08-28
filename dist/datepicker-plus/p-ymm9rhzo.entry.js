import{h as e,r as t,c as s}from"./p-7eddb680.js";const n=e=>`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`,a=e=>{const t=new Date(e);return t.setDate(t.getDate()+1),n(t)},i=(e,t)=>{if(e===t)return[];const[s,n]=r([e,t]);let i=[],h=a(s);for(;h!==n;)i.length>3e3&&u({title:"Memory leak @ utils.unfoldRange()",label:"bug",body:JSON.stringify({dateString0:e,dateString1:t},null,2)}),i.push(h),h=a(h);return[s,...i,n]},r=([e,t])=>{const s=new Date(e),n=new Date(t);return s.valueOf()-n.valueOf()>0?[t,e]:[e,t]},h=(e=[],t)=>t.map((t,s)=>e[s]||t),o=e=>{const t=Object.create({sorted:{years:[],months:{}},toArray(){let e=[];return this.sorted.years.forEach(t=>{const s=Object.values(this[t]);s.length&&(e=[...e,...s])}),e}});e.forEach(e=>{const s=new Date(e),n=s.getFullYear(),a=s.getMonth()+1;!1===t.hasOwnProperty(n)&&(t[n]={},t.sorted.years.push(n)),!1===t[n].hasOwnProperty(a)&&(t[n][a]=[],t.sorted.months.hasOwnProperty(n)?t.sorted.months[n].push(a):t.sorted.months[n]=[a]),t[n][a].push(e)}),t.sorted.years=t.sorted.years.sort((e,t)=>e-t);for(const e in t.sorted.months)t.sorted.months[e]=t.sorted.months[e].sort((e,t)=>e-t);return t},l=e=>{let t=new Date(e);return!isNaN(t.getDate())},c=e=>{let t=[],s=[];return e.forEach(e=>{6===e.dayOfWeek?(t.push(e),s.push(t),t=[]):t.push(e)}),t.length&&s.push(t),s},d=(e,t)=>{const s=new Date(e),a=s.getDate();s.setDate(a-t);const i=new Date(e),r=i.getDate();return i.setDate(r+t),[s,i].map(e=>n(e))},u=({title:e,body:t,label:s})=>{const n="title="+encodeURIComponent(e);throw"Stopped to prevent memory leak.\n\n🐞 Create a new issue:\n"+`https://github.com/solomancode/datepicker-plus/issues/new?${"labels="+encodeURIComponent(s)}&${n}&${"body="+encodeURIComponent(t)}`},g={day:"day",year:"year",disabled:"disabled",selected:"selected",month:"month",months:"months",monthName:"month-name",monthHeader:"month-header",monthContent:"month-content",week:"week",empty:"empty",weekHeader:"week-header",weekContent:"week-content",weekend:"weekend",checkbox:"checkbox",singleHeader:"single-header",highlight:"highlight"},p={selectMode:"range",selected:[],disabled:[],selectScopeSize:0,weekHeader:"per-month",viewRange:(()=>{const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),s=new Date(e.getFullYear(),e.getMonth()+1,0);return[n(t),n(s)]})(),i18n:{months:[{name:"January",abbr:"Jan"},{name:"February",abbr:"Feb"},{name:"March",abbr:"Mar"},{name:"April",abbr:"Apr"},{name:"May",abbr:"May"},{name:"June",abbr:"Jun"},{name:"July",abbr:"Jul"},{name:"August",abbr:"Aug"},{name:"September",abbr:"Sep"},{name:"October",abbr:"Oct"},{name:"November",abbr:"Nov"},{name:"December",abbr:"Dec"}],weekDays:[{name:"Sunday",abbr:"Sun",isWeekend:!0},{name:"Monday",abbr:"Mon "},{name:"Tuesday",abbr:"Tue"},{name:"Wednesday",abbr:"Wed"},{name:"Thursday",abbr:"Thu"},{name:"Friday",abbr:"Fri"},{name:"Saturday",abbr:"Sat",isWeekend:!0}]},layout:"vertical"},m=e=>((e,t)=>Math.ceil((e.getTime()-t.getTime())/864e5))(new Date(e),new Date),b={today:e=>0===m(e.dateString),rangeStart:e=>0===e.getAttr("rangeIndex"),rangeEnd:e=>{const t=e.getAttr("rangeIndex"),s=e.getAttr("rangeEndIndex");return s>0&&t===s},connector:e=>e.getAttr("rangeIndex")>0&&e.getAttr("rangeEndIndex")!==e.getAttr("rangeIndex"),tomorrow:e=>1===m(e.dateString),yesterday:e=>-1===m(e.dateString),past:e=>m(e.dateString)<0,future:e=>m(e.dateString)>0};class D{constructor(e){this.dateString=e,this.pendingQueue=[],this.attributes=({}={}),this.date=new Date(e),this.day=this.date.getDate(),this.month=this.date.getMonth()+1,this.year=this.date.getFullYear(),this.dayOfWeek=this.date.getDay(),this.updateAttributes(b)}hookDOMElement(e){e instanceof HTMLTimeElement?this.DateDOMElement=e:e instanceof HTMLInputElement&&(this.checkboxDOMElement=e),this.pendingQueue=this.pendingQueue.filter(e=>!1===e.call(this))}updateDateClasses(){return this.DateDOMElement?(this.DateDOMElement.setAttribute("class",g.day+" "+Object.keys(this.attributes).filter(e=>!0===this.attributes[e]).join(" ")),!0):(this.pendingQueue.push(this.updateDateClasses),!0)}updateCheckboxAttribute(e,t){this.checkboxDOMElement?this.checkboxDOMElement[e]=t:this.pendingQueue.push(()=>!!this.checkboxDOMElement&&(this.checkboxDOMElement[e]=t,this.updateDateClasses(),!0)),this.updateDateClasses()}updateDOMAttribute(e,t){"checked"!==e&&"disabled"!==e||this.updateCheckboxAttribute(e,t),this.updateDateClasses()}setAttr(e,t){this.attributes[e]=t,this.updateDOMAttribute(e,t)}getAttr(e){return this.attributes[e]}hasAttr(e){return e in this.attributes}removeAttr(e){delete this.attributes[e]}resetRangeAttributes(){this.removeAttr("rangeIndex"),this.removeAttr("rangeEndIndex"),this.removeAttr("rangeStart"),this.removeAttr("rangeEnd"),this.removeAttr("connector")}updateAttributes(e){for(const t in e)e.hasOwnProperty(t)&&!0===(0,e[t])(this)&&this.setAttr(t,!0)}}function y(t){return e("header",{class:g.weekHeader,part:"week-header"},t.map(({name:t,abbr:s,isWeekend:n})=>e("abbr",{class:n&&g.weekend,title:t},s)))}function f(t){const s=[];for(;t;)s.push(e("span",{class:g.empty})),t--;return s}function w(t,s){const n="horizontal"===s.layout?{width:window.innerWidth-60+"px"}:{};return e("section",{style:n,part:"month",class:g.month},e("header",{class:g.monthHeader,part:"month-header"},e("span",{class:g.monthName},s.i18n.months[(a=t[0]).month-1].name),a.month-1==0&&e("span",{class:g.year},a.year)),e("section",{class:g.monthContent},c(t).map((t,n)=>(function(t,s,n){return e("section",{part:"week",class:g.week},s&&y(n),e("section",{class:g.weekContent},f(t[0].dayOfWeek),t.map(function(t){return e("time",{part:"day",dateTime:t.dateString,ref:e=>t.hookDOMElement(e)},e("label",null,t.day,e("input",{ref:e=>t.hookDOMElement(e),onChange:(e=>e.target.checked?this.select(t.dateString):this.deselect([t.dateString])).bind(this),class:g.checkbox,type:"checkbox",value:t.dateString})))}.bind(this)),f(6-t[t.length-1].dayOfWeek)))}).call(this,t,(e=>"per-month"===s.weekHeader&&0===e)(n),s.i18n.weekDays))));var a}class k{constructor(e){t(this,e),this.plusConfig=p,this.dateRegistry={},this.viewElements=[],this.selected=[],this.disabled=[],this.activeScope=null,this.unfoldDateStringList=e=>e.length?e.map(e=>l(e)?[e]:this.unfoldAttribute(e)).reduce((e,t)=>[...e,...t]):[],this.patchConfigLists=()=>{const{months:e,weekDays:t}=p.i18n,{months:s,weekDays:n}=this.plusConfig.i18n;this.plusConfig.i18n.months=h(s,e),this.plusConfig.i18n.weekDays=h(n,t)},this.select=e=>{const{selectMode:t}=this.plusConfig;let s=[];if("single"===t?s=[e]:"multiple"===t?s=[...this.selected,e]:"range"===t&&(s=this.selected.includes(e)?[]:1===this.selected.length?i(this.selected[0],e):[e]),this.checkIfHasDisabled(s,this.disabled))return this.viewElements;const n=this.plusConfig.selectScopeSize;"range"===t&&n>0&&(this.activeScope?this.activeScope.deactivate():(this.activeScope=this.generateScope(this.disabled),this.activeScope.activate(e,n))),this.deselect(this.selected),this.selectMultipleDates(s),this.onDateSelect.emit(this.selected),"range"===t&&this.selected.length>1&&this.onRangeSelect.emit(this.selected)},this.deselect=e=>{const{selectMode:t}=this.plusConfig;"range"===t&&(e=this.selected,this.activeScope&&this.activeScope.deactivate()),e.forEach(e=>{const s=this.getDateElement(e);s.setAttr("checked",!1),"range"===t&&s.resetRangeAttributes(),s.updateDateClasses()}),this.selected=this.selected.filter(t=>!e.includes(t))},this.getDateElement=e=>this.dateRegistry[e],this.unfoldAttribute=e=>{const t=[];return this.viewElements.reduce((e,t)=>[...e,...t]).forEach(s=>{s.getAttr(e)&&t.push(s.dateString)}),t},this.registerDate=e=>{if(e in this.dateRegistry)return this.dateRegistry[e];const t=new D(e);return this.dateRegistry[e]=t,t},this.onDateSelect=s(this,"onDateSelect",7),this.onDateDeselect=s(this,"onDateDeselect",7),this.onRangeSelect=s(this,"onRangeSelect",7)}componentWillLoad(){this.plusConfig=Object.assign({},p,this.plusConfig),this.patchConfigLists(),"horizontal"===this.plusConfig.layout&&(this.plusConfig.weekHeader="per-month")}componentDidLoad(){const e=this.unfoldViewRange(this.plusConfig.viewRange).map(e=>e.map(this.registerDate));this.viewElements=e;const t=this.unfoldDateStringList(this.plusConfig.disabled);this.disableMultipleDates(t),this.plusConfig.selected.forEach(this.select)}unfoldViewRange([e,t]){const s=i(e,t);return o(s).toArray()}generateScope(e){return{activate:(e,t)=>{const[s,n]=d(e,t),[a,r]=this.plusConfig.viewRange,h=[...i(a,s),...i(n,r)];this.disableMultipleDates(h)},deactivate:()=>{this.enableMultipleDates(this.disabled),this.disableMultipleDates(e),this.activeScope=null}}}checkIfHasDisabled(e,t){const s={};return t.forEach(e=>s[e]=!0),e.some(e=>e in s)}selectMultipleDates(e){e.forEach(t=>{const s=this.getDateElement(t);if(s){if(s.setAttr("checked",!0),e.length>1){const t=s.getAttr("checked");s.setAttr("rangeIndex",t?e.indexOf(s.dateString):null),s.setAttr("rangeEndIndex",t?e.length-1:null)}if("range"===this.plusConfig.selectMode){const{rangeStart:e,rangeEnd:t,connector:n}=b;s.updateAttributes({rangeStart:e,rangeEnd:t,connector:n})}}}),this.selected=e}disableMultipleDates(e){this.disabled=e.filter(e=>{const t=this.getDateElement(e);return!!t&&(t.setAttr("disabled",!0),!0)})}enableMultipleDates(e){e.forEach(e=>{const t=this.getDateElement(e);t&&t.setAttr("disabled",!1)}),this.disabled=this.disabled.filter(t=>!e.includes(t))}render(){return console.count("RENDER..."),function(t,s){const n="horizontal"===s.layout?{width:window.innerWidth*t.length+"px"}:{};return[s.stylesheetUrl?e("link",{rel:"stylesheet",type:"text/css",href:s.stylesheetUrl}):null,e("section",{class:(s.stylesheetUrl?"":"dpp ")+s.layout,part:"dpp-container"},e("section",{style:n,class:"viewport"},[(()=>"single"===s.weekHeader&&e("header",{class:g.singleHeader},y(s.i18n.weekDays)))()||null,t.map(e=>w.call(this,e,s))]))]}.call(this,this.viewElements,this.plusConfig)}static get style(){return".dpp{font-family:monospace}.horizontal{overflow-x:scroll}.horizontal .month{display:inline-block}.month{border:1px solid #ccc;padding:20px}.dpp .month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.dpp .day.checked.rangeStart{background-color:#cddc39}.dpp .day.checked.rangeEnd{background-color:#ff9800}.week-header{display:-ms-flexbox;display:flex}.single-header{padding:5px 20px}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day{position:relative;line-height:30px}.day>label{display:block;width:100%;height:100%;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box}.day.disabled{color:#ccc;background-color:#f8f8f8}.dpp .day.checked{background-color:gold}.dpp .day.highlight{background-color:#7e5}.dpp .day.today{outline:1px solid #ccc}.checkbox{display:none}.month-header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}"}}export{k as datepicker_plus};