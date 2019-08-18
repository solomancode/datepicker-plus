System.register(["./p-eb023e44.system.js"],function(e){"use strict";var t,n,a;return{setters:[function(e){t=e.h;n=e.r;a=e.c}],execute:function(){var r=function(e){var t=e.getFullYear();var n=e.getMonth();var a=n+1;var r=e.getDate();return t+"-"+a+"-"+r};var i=function(e){return e.split("-").map(function(e){return parseInt(e)})};var s=function(e){var t=i(e),n=t[0],a=t[1],r=t[2];var s=new Date;s.setFullYear(n);s.setMonth(a-1);s.setDate(r);return s};var o=function(e){var t=typeof e==="string";var n=t?s(e):new Date(e);n.setDate(n.getDate()+1);return t?r(n):n};var u=function(e,t){if(e.getDate()!==t.getDate())return false;if(e.getUTCMonth()!==t.getUTCMonth())return false;if(e.getFullYear()!==t.getFullYear())return false;return true};var c=function(e){var t=[];var n=[];e.forEach(function(e){if(e.dayOfWeek===6){t.push(e);n.push(t);t=[]}else{t.push(e)}});if(t.length){n.push(t)}return n};var l=function(){var e=new Date;var t=new Date(e.getFullYear(),e.getMonth(),1);var n=new Date(e.getFullYear(),e.getMonth()+1,0);return[r(t),r(n)]};var d=function(e,t){if(e===t)return[];var n=f([e,t]),a=n[0],r=n[1];var i=[];var s=o(a);while(s!==r){if(i.length>3e3)p({title:"Memory leak @ getDatesBetween",label:"bug",body:JSON.stringify({dateString0:e,dateString1:t},null,2)});i.push(s);s=o(s)}return i};var f=function(e){var t=e[0],n=e[1];var a=s(t);var r=s(n);return a.valueOf()-r.valueOf()>0?[n,t]:[t,n]};var h=function(e,t){return Math.ceil((e.getTime()-t.getTime())/864e5)};var g=function(e,t){if(e===void 0){e=[]}return t.map(function(t,n){return e[n]||t})};var p=function(e){var t=e.title,n=e.body,a=e.label;var r="title="+encodeURIComponent(t);var i="labels="+encodeURIComponent(a);var s="body="+encodeURIComponent(n);throw"Stopped to prevent memory leak.\n\n🐞 Create a new issue:\n"+("https://github.com/solomancode/datepicker-plus/issues/new?"+i+"&"+r+"&"+s)};var v=[{name:"Sunday",abbr:"Sun",isWeekend:true},{name:"Monday",abbr:"Mon "},{name:"Tuesday",abbr:"Tue"},{name:"Wednesday",abbr:"Wed"},{name:"Thursday",abbr:"Thu"},{name:"Friday",abbr:"Fri"},{name:"Saturday",abbr:"Sat",isWeekend:true}];var b=[{name:"January",abbr:"Jan"},{name:"February",abbr:"Feb"},{name:"March",abbr:"Mar"},{name:"April",abbr:"Apr"},{name:"May",abbr:"May"},{name:"June",abbr:"Jun"},{name:"July",abbr:"Jul"},{name:"August",abbr:"Aug"},{name:"September",abbr:"Sep"},{name:"October",abbr:"Oct"},{name:"November",abbr:"Nov"},{name:"December",abbr:"Dec"}];var m={day:"day",year:"year",disabled:"disabled",selected:"selected",month:"month",monthName:"month-name",monthHeader:"month-header",monthContent:"month-content",week:"week",empty:"empty",weekHeader:"week-header",weekContent:"week-content",weekend:"weekend",checkbox:"checkbox",singleHeader:"single-header",highlight:"highlight"};var y={selectMode:"range",selected:[],disabled:[],selectScope:0,weekHeader:"per-month",viewRange:l(),i18n:{months:b,weekDays:v}};var S=function(e){var n=e.date;var a=function(e){var t=n.dateString();var a=n.datepickerPlus,r=a.select,i=a.deselect;if(e.target.checked){n.datepickerPlus.activateSelectScope(n);r(t)}else{n.datepickerPlus.deactivateSelectScope();i(t)}n.datepickerPlus.highlighted="rangeSelect"};var r=function(){return n.datepickerPlus.highlighted=n.dateString()};var i=function(){return n.datepickerPlus.highlighted=null};return t("time",{part:"day",class:n.classListString,dateTime:n.dateString()},t("label",{onMouseEnter:r.bind(undefined),onMouseLeave:i.bind(undefined)},n.day,t("input",{ref:function(e){return n.el=e},onChange:function(e){return a(e)},checked:n.checked,disabled:n.disabled,class:m.checkbox,type:"checkbox",value:n.dateString()})))};function k(e){return t(S,{date:e})}function D(e){return t("header",{class:m.weekHeader,part:"week-header"},e.map(function(e){var n=e.name,a=e.abbr,r=e.isWeekend;return t("abbr",{class:r&&m.weekend,title:n},a)}))}function w(e){var n=[];while(e){n.push(t("span",{class:m.empty}));e--}return n}function C(e,n,a){return t("section",{part:"week",class:m.week},n&&D(a),t("section",{class:m.weekContent},w(e[0].dayOfWeek),e.map(k),w(6-e[e.length-1].dayOfWeek)))}function O(e,n){return t("header",{class:m.monthHeader,part:"month-header"},t("span",{class:m.monthName},n[e.month-1].name),e.month-1===0&&t("span",{class:m.year},e.year))}function E(e,n){var a=function(e){return n.weekHeader==="per-month"&&e===0};return t("section",{part:"month",class:m.month},O(e[0],n.i18n.months),t("section",{class:m.monthContent},c(e).map(function(e,t){return C(e,a(t),n.i18n.weekDays)})))}function M(e,n){var a=function(){return n.weekHeader==="single"&&t("header",{class:m.singleHeader},D(n.i18n.weekDays))};return[n.stylesheetUrl?t("link",{rel:"stylesheet",type:"text/css",href:n.stylesheetUrl}):null,t("section",{class:"dpp-container",part:"dpp-container"},[a()||null,e.map(function(e){return E(e,n)})])]}var j={today:"today",rangeStart:"range-start",rangeEnd:"range-end",connector:"connector"};var L=function(e,t){var n=e.offset()===0;if(n)t(j.today);return n};var P=function(e){return e.offset()===1};var R=function(e){return e.offset()===-1};var T=function(e){return e.offset()<0};var H=function(e){return e.offset()>0};var x=function(e,t){var n=e.rangeIndex===0;if(n)t(j.rangeStart);return n};var F=function(e,t){if(e.rangeEnd)t(j.rangeEnd);return e.rangeEnd};var W=function(e,t){var n=e.rangeIndex>0&&!e.rangeEnd;if(n)t(j.connector);return n};var I=Object.freeze({today:L,tomorrow:P,yesterday:R,past:T,future:H,rangeStart:x,rangeEnd:F,connector:W});var J=function(e){return Object.assign({checked:false,disabled:false},e)};var N=function(e){return{dateObject:function(){return s(e)},dateString:function(){return e},offset:function(){var e=this.dateObject();var t=new Date;return h(e,t)}}};var U=function(){return{classListString:m.day,updateClassListString:function(){var e=this;var t=[m.day,e.highlight&&m.highlight,e.disabled&&m.disabled,e.checked&&m.selected];for(var n in I){var a=I[n];a(e,function(e){return t.push(e)})&&Object.defineProperty(e.tags,n,{value:true})}var r=t.filter(function(e){return e}).join(" ");e.el&&e.el.parentElement.parentElement.setAttribute("class",r);return this.classListString=r}}};var Y={};function _(e){var t=e.dateString,n=e.options,a=e.datepickerPlus;var r=i(t),s=r[0],o=r[1],u=r[2];var c=Object.create(Object.assign({tags:{},datepickerPlus:a,createdDateElements:Y},J(n),N(t),U()));if(t in Y){var l=Y[t];Object.assign(l,c);return l}var d=new Date(t).getDay();var f={year:s,month:o,day:u,dayOfWeek:d};var h=Object.assign(c,f);h.updateClassListString();Object.defineProperty(Y,t,{value:h});return h}var A=function(){function e(e){var t=this;n(this,e);this.plusConfig=y;this.selected=[];this.disabled=[];this.rangeStart=null;this._disabled=[];this.setHighlight=function(e,n){var a=t.getDateElement(e);if(a&&!a.disabled)a.highlight=n;a.updateClassListString()};this.unfoldTag=function(e){if(!(e in I))return[e];return t.viewList.map(function(t){return t.filter(function(t){return e in t.tags})}).reduce(function(e,t){return e.concat(t)}).map(function(e){return e.dateString()})};this.addRangeMark=function(e){if(t.rangeStart===null){t.rangeStart=e;t.selected=[e];t.onDateSelect.emit(t.getDateElement(e))}else if(t.rangeStart!==e){var n=t.rangeStart;var a=e;var r=d(n,a);var i=[n].concat(r,[a]);var s=i.some(function(e){var n=t.getDateElement(e);if(n&&n.disabled)return true});if(s){t.rangeStart=a;t.selected=[a];t.onDateSelect.emit(t.getDateElement(a))}else{t.rangeStart=null;t.selected=i;t.onRangeSelect.emit(i)}}};this.activateSelectScope=function(e){var n=e.dateObject();var a=t.plusConfig.selectScope;if(a>0&&!t.rangeStart){t._disabled=t.plusConfig.disabled;var r=t.viewList.reduce(function(e,t){return e.concat(t)}).map(function(e){var t=h(n,e.dateObject());return Math.abs(t)>a?e.dateString():false}).filter(function(e){return e});t.disabled=r}};this.deactivateSelectScope=function(){t.disabled=t._disabled};this.resetRangeMarks=function(){t.rangeStart=null;t.selected=[]};this.select=function(e){var n=t.getDateElement(e);if(n){switch(t.plusConfig.selectMode){case"single":t.selected=[e];t.onDateSelect.emit(n);break;case"multiple":t.selected=t.selected.concat([e]);t.onDateSelect.emit(n);break;case"range":t.addRangeMark(e);break}}};this.deselect=function(e){var n=t.getDateElement(e);if(n){if(t.plusConfig.selectMode==="range"){t.resetRangeMarks()}else{t.selected=t.selected.filter(function(t){return t!==e})}t.onDateDeselect.emit(n)}};this.patchConfigLists=function(){var e=y.i18n,n=e.months,a=e.weekDays;var r=t.plusConfig.i18n,i=r.months,s=r.weekDays;t.plusConfig.i18n.months=g(i,n);t.plusConfig.i18n.weekDays=g(s,a)};this.unfoldSelected=function(e,n){if(!e.length)return[];var a=e.map(t.unfoldTag).reduce(function(e,t){return e.concat(t)});return n==="range"?[a[0],a[a.length-1]]:a};this.getDateElement=function(e){if(e in Y){return Y[e]}else{return null}};this.MemProtect=0;this.createDate=function(e){var n=r(e);var a=_({dateString:n,datepickerPlus:t});return a};this.onDateSelect=a(this,"onDateSelect",7);this.onDateDeselect=a(this,"onDateDeselect",7);this.onRangeSelect=a(this,"onRangeSelect",7)}e.prototype.highlight=function(e,t){var n=this;if(t==="rangeSelect")return;var a=e===null?t:e;var r=this.rangeStart;if(e==="rangeSelect"){this.selected.length&&this.selected.forEach(function(e){return n.setHighlight(e,false)})}else if(r){[r].concat(d(r,a),[a]).forEach(function(t){return n.setHighlight(t,e!==null)})}};e.prototype.parseSelected=function(e,t){var n=this;var a=this.plusConfig.selectMode==="range";var r=t.length-1;var i=e.length-1;t.forEach(function(e,t){var i=t===r?{rangeEnd:null}:{};n.updateDateOptions(e,Object.assign({checked:false},a?Object.assign({rangeIndex:null},i):{}))});var s=h(new Date(e[0]),new Date(e[e.length-1]))>0;e.forEach(function(t,r){var o=s?e.length-r-1:r;var u=o===i&&i!==0?{rangeEnd:true}:{};n.updateDateOptions(t,Object.assign({checked:true},a?Object.assign({rangeIndex:o},u):{}))})};e.prototype.parseDisabled=function(e,t){var n=this;t.forEach(function(e){return n.updateDateOptions(e,{disabled:false})});e=e.length?e.map(function(e){return n.unfoldTag(e)}).reduce(function(e,t){return e.concat(t)}):[];e.forEach(function(e){return n.updateDateOptions(e,{disabled:true})})};e.prototype.updateDateOptions=function(e,t){var n=this.getDateElement(e);if(n){Object.assign(n,t);n.updateClassListString()}};e.prototype.updateConfig=function(e){this.parseViewRange(e.viewRange);this.unfoldSelected(e.selected,e.selectMode).forEach(this.select);this.disabled=this.plusConfig.disabled;this._disabled=this.plusConfig.disabled};e.prototype.componentWillLoad=function(){this.plusConfig=Object.assign({},y,this.plusConfig);this.patchConfigLists()};e.prototype.protectMemLeak=function(){this.MemProtect++;if(this.MemProtect>3e3){var e="#### "+(new Date).toDateString();var t="```";var n=JSON.stringify(this.plusConfig,null,2);var a=e+"\n"+t+n+t;p({title:"Memory leak @ render while loop",body:a,label:"bug"})}};e.prototype.parseViewRange=function(e){var t=null;var n=[];var a=[];var r=e.map(s),i=r[0],c=r[1];var l=o(c);while(!u(i,l)){this.protectMemLeak();var d=this.createDate(i);if(t!==null&&t!==d.month){a.push(n);n=[]}else{n.push(d);i=o(i)}t=d.month}a.push(n);this.viewList=a;this.MemProtect=0};e.prototype.render=function(){console.count("RENDER:");return M(this.viewList,this.plusConfig)};Object.defineProperty(e,"watchers",{get:function(){return{highlighted:["highlight"],selected:["parseSelected"],disabled:["parseDisabled"],plusConfig:["updateConfig"]}},enumerable:true,configurable:true});Object.defineProperty(e,"style",{get:function(){return".dpp-container{font-family:monospace}.month{border:1px solid #ccc;padding:20px}.month-header{text-transform:uppercase;font-weight:700;margin-bottom:5px}.week-header{display:-ms-flexbox;display:flex}.single-header{padding:5px 20px}.week-header abbr{-ms-flex-positive:1;flex-grow:1;text-align:center}.week-content{display:-ms-flexbox;display:flex}.week-content>.day,.week-content>.empty{-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:center}.day{line-height:30px}.day>label{display:block;width:100%;height:100%;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box}.day.disabled{background-color:#ccc}.day.selected{background-color:gold}.day.highlight{background-color:#7e5}.day.today{background-color:#e45}.checkbox{display:none}.month-header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}"},enumerable:true,configurable:true});return e}();e("datepicker_plus",A)}}});