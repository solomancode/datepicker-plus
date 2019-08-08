import{h as e,r as t,c as s}from"./p-999738f0.js";const a=e=>`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`,n=e=>e.split("-").map(e=>parseInt(e)),i=e=>{const[t,s,a]=n(e),i=new Date;return i.setFullYear(t),i.setMonth(s-1),i.setDate(a),i},r=e=>{const t="string"==typeof e,s=t?i(e):new Date(e);return s.setDate(s.getDate()+1),t?a(s):s},c=(e,t)=>{let s=i(e),a=i(t);return[s,a=r(a)]},h=(e,t)=>e.getDate()===t.getDate()&&e.getUTCMonth()===t.getUTCMonth()&&e.getFullYear()===t.getFullYear(),l=e=>{let t=[],s=[];return e.forEach(e=>{6===e.dayOfWeek?(t.push(e),s.push(t),t=[]):t.push(e)}),t.length&&s.push(t),s},d=(e,t)=>{let s=[],a=r(e);for(;a!==t;)s.push(a),a=r(a);return s},o=e=>JSON.parse(e.replace(/'/g,'"')),u=[{name:"Sunday",abbr:"Sun",isWeekend:!0},{name:"Monday",abbr:"Mon "},{name:"Tuesday",abbr:"Tue"},{name:"Wednesday",abbr:"Wed"},{name:"Thursday",abbr:"Thu"},{name:"Friday",abbr:"Fri"},{name:"Saturday",abbr:"Sat",isWeekend:!0}],b=[{name:"January",abbr:"Jan"},{name:"February",abbr:"Feb"},{name:"March",abbr:"Mar"},{name:"April",abbr:"Apr"},{name:"May",abbr:"May"},{name:"June",abbr:"Jun"},{name:"July",abbr:"Jul"},{name:"August",abbr:"Aug"},{name:"September",abbr:"Sep"},{name:"October",abbr:"Oct"},{name:"November",abbr:"Nov"},{name:"December",abbr:"Dec"}],D={day:"day",disabled:"disabled",selected:"selected",month:"month",monthHeader:"month-header",monthContent:"month-content",week:"week",empty:"empty",weekHeader:"week-header",weekContent:"week-content",weekend:"weekend",today:"today",checkbox:"checkbox"},[g,m]=(()=>{const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),s=new Date(e.getFullYear(),e.getMonth()+1,0);return[a(t),a(s)]})(),p={selectMode:"single",checkedDates:"",viewRangeStart:g,viewRangeEnd:m};function f(t){return e("time",{part:"day",class:t.classList(),dateTime:t.dateString()},e("label",null,t.day,e("input",{ref:e=>t.el=e,onChange:(()=>{t.checked?t.deselect():t.select()}).bind(this),onMouseDown:()=>t.selectRangeStart(),onMouseEnter:()=>t.selectRangeEnd(),checked:t.checked,disabled:t.disabled,class:D.checkbox,type:"checkbox",value:t.dateString()})))}function k(t){return e("section",{class:"sdr-container",part:"sdr-container"},t.map(t=>(function(t){return e("section",{part:"month",class:D.month},e("header",{class:D.monthHeader,part:"month-header"},b[t[0].month-1].name),e("section",{class:D.monthContent},l(t).map((t,s)=>(function(t,s=!1){return e("section",{part:"week",class:D.week},s&&function(t=u){return e("header",{class:D.weekHeader,part:"week-header"},t.map(({name:t,abbr:s,isWeekend:a})=>e("abbr",{class:a&&D.weekend,title:t},s)))}(),e("section",{class:D.weekContent},function(t){if(0===t)return null;const s=[];let a=8-t;for(;a;)s.push(e("span",{class:D.empty})),a--;return s}(t[0].dayOfWeek),t.map(f)))})(t,0===s))))})(t)))}const y=e=>({dateObject:()=>i(e),dateString:()=>e,select(){this.checked=!0,this.el&&(this.el.checked=!0),this.events.onDateSelect.emit(this)},deselect(){this.checked=!1,this.el&&(this.el.checked=!1),this.events.onDateDeselect.emit(this)},enable(){this.disabled=!1,this.el&&(this.el.disabled=!1)},disable(){this.disabled=!0,this.el&&(this.el.disabled=!0)},selectRangeStart(){},selectRangeEnd(){},offset(){const e=this.dateObject().getTime(),t=(new Date).getTime();return Math.ceil((e-t)/864e5)},classList(){const e=this.disabled?" "+D.disabled:"",t=this.checked?" "+D.selected:"",s=this.isToday()?" "+D.today:"";return D.day+e+t+s},bindEvent(e,t){this.events[e]=t}}),w=()=>({isToday(){return 0===this.offset()},isTomorrow(){return 1===this.offset()},isYesterday(){return-1===this.offset()},isPastDate(){return this.offset()<0},isFutureDate(){return this.offset()>0}}),S={},v=({dateString:e,options:t,events:s={}})=>{const[a,i,r]=n(e),c=Object.create(Object.assign({events:s,createdDateElements:S},(e=>Object.assign({checked:!1,disabled:!1},e))(t),y(e),w()));if((e=>e in S)(e)){const t=S[e];return Object.assign(t,c),t}const h=new Date(e).getDay(),l=Object.assign(c,{year:a,month:i,day:r,dayOfWeek:h});return Object.defineProperty(S,e,{value:l}),l};class E{constructor(e){t(this,e),this.viewList=[],this.checkedDatesInput=[],this.disabledDatesInput=[],this.config=p,this.dayClassList=D.day,this.getDateElement=e=>e in S?S[e]:null,this.selectDate=e=>{const t=this.getDateElement(e);t&&t.select()},this.selectDates=e=>{if("range"===this.config.selectMode){const t=d(e[0],e[1]);[e[0],...t,e[1]].forEach(this.selectDate)}else e.forEach(this.selectDate)},this.disableDates=e=>{e.forEach(e=>{const t=this.getDateElement(e);t&&t.disable()})},this.isSelectedDate=e=>{this.getDateElement(e)},this.createDate=e=>{const t=a(e);return v({dateString:t,events:this.events})},this.onDateSelect=s(this,"onDateSelect",7),this.onDateDeselect=s(this,"onDateDeselect",7)}get events(){return{onDateSelect:this.onDateSelect,onDateDeselect:this.onDateDeselect}}parseCheckedDates(e){"string"==typeof e&&(e=o(e)),this.selectDates(e),this.checkedDatesInput=e||[]}parseDisabledDates(e){"string"==typeof e&&(e=o(e)),this.disableDates(e),this.disabledDatesInput=e||[]}componentWillLoad(){this.parseCheckedDates(this.checkedDates),this.parseDisabledDates(this.disabledDates),this.updateConfig()}clearSelected(){if(this.checkedDatesInput.forEach(e=>{const t=this.getDateElement(e);t&&t.deselect()}),"range"===this.config.selectMode){const[e,t]=this.checkedDatesInput;d(e,t).forEach(e=>{const t=this.getDateElement(e);t&&t.deselect()})}this.checkedDatesInput=[]}updateViewList(e=this.config){let t=null,s=[];this.viewList=[];let[a,n]=c(e.viewRangeStart,e.viewRangeEnd);for(;!h(a,n);){const e=this.createDate(a);null!==t&&t!==e.month?(this.viewList.push(s),s=[]):(s.push(e),a=r(a)),t=e.month}return this.selectDates(this.checkedDatesInput),this.disableDates(this.disabledDatesInput),this.viewList.push(s),Object.create({render:()=>k(this.viewList)})}updateConfig(e){if(e)Object.assign(this.config,e);else{const{viewRangeStart:e,viewRangeEnd:t,checkedDates:s,selectMode:a}=this;e&&(this.config.viewRangeStart=e),t&&(this.config.viewRangeEnd=t),s&&(this.config.checkedDates=s),this.selectMode&&(this.config.selectMode=a)}}loadStylesheet(){return this.stylesheetUrl?e("link",{rel:"stylesheet",type:"text/css",href:this.stylesheetUrl}):null}render(){return[this.loadStylesheet(),this.updateViewList().render()]}static get watchers(){return{checkedDates:["parseCheckedDates"],disabledDates:["parseDisabledDates"]}}static get style(){return".sdr-container{font-family:monospace}.month{border:1px solid #ccc;padding:20px}.month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.week-header{display:-ms-flexbox;display:flex}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day.disabled{background-color:#ccc}.day.selected{background-color:gold}.day.today{background-color:#e45}"}}export{E as select_date_range};