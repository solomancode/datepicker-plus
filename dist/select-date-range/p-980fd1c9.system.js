var __extends=this&&this.__extends||function(){var e=function(t,r){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)if(t.hasOwnProperty(r))e[r]=t[r]};return e(t,r)};return function(t,r){e(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();var __awaiter=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(a,i){function s(e){try{l(n.next(e))}catch(e){i(e)}}function o(e){try{l(n["throw"](e))}catch(e){i(e)}}function l(e){e.done?a(e.value):new r(function(t){t(e.value)}).then(s,o)}l((n=n.apply(e,t||[])).next())})};var __generator=this&&this.__generator||function(e,t){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,a,i,s;return s={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(e){return function(t){return l([e,t])}}function l(s){if(n)throw new TypeError("Generator is already executing.");while(r)try{if(n=1,a&&(i=s[0]&2?a["return"]:s[0]?a["throw"]||((i=a["return"])&&i.call(a),0):a.next)&&!(i=i.call(a,s[1])).done)return i;if(a=0,i)s=[s[0]&2,i.value];switch(s[0]){case 0:case 1:i=s;break;case 4:r.label++;return{value:s[1],done:false};case 5:r.label++;a=s[1];s=[0];continue;case 7:s=r.ops.pop();r.trys.pop();continue;default:if(!(i=r.trys,i=i.length>0&&i[i.length-1])&&(s[0]===6||s[0]===2)){r=0;continue}if(s[0]===3&&(!i||s[1]>i[0]&&s[1]<i[3])){r.label=s[1];break}if(s[0]===6&&r.label<i[1]){r.label=i[1];i=s;break}if(i&&r.label<i[2]){r.label=i[2];r.ops.push(s);break}if(i[2])r.ops.pop();r.trys.pop();continue}s=t.call(e,r)}catch(e){s=[6,e];a=0}finally{n=i=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};System.register([],function(e,t){"use strict";return{execute:function(){var r=this;var n="select-date-range";var a=window;var i=document;var s={$flags$:0,$resourcesUrl$:"",raf:function(e){return requestAnimationFrame(e)},ael:function(e,t,r,n){return e.addEventListener(t,r,n)},rel:function(e,t,r,n){return e.removeEventListener(t,r,n)}};var o=!!i.documentElement.attachShadow;var l=function(){try{new CSSStyleSheet;return true}catch(e){}return false}();var f=new WeakMap;var c=function(e){return f.get(e)};var u=e("r",function(e,t){return f.set(t.$lazyInstance$=e,t)});var $=function(e){{var t={$flags$:0,$hostElement$:e,$instanceValues$:new Map};t.$onReadyPromise$=new Promise(function(e){return t.$onReadyResolve$=e});return f.set(e,t)}};var v=function(e,t){return t in e};var h=function(e){return console.error(e)};var d=function(e,r,n){var a=e.$lazyBundleIds$;return t.import("./"+a+".entry.js"+"").then(function(t){return t[e.$tagName$.replace(/-/g,"_")]},h)};var m=new Map;var p=a.__stencil_cssshim;var y=0;var g=false;var w=[];var b=[];var _=[];var S=function(e){return function(t){e.push(t);if(!g){g=true;s.raf(k)}}};var x=function(e){for(var t=0;t<e.length;t++){try{e[t](performance.now())}catch(e){h(e)}}e.length=0};var E=function(e,t){var r=0;var n=0;while(r<e.length&&(n=performance.now())<t){try{e[r++](n)}catch(e){h(e)}}if(r===e.length){e.length=0}else if(r!==0){e.splice(0,r)}};var k=function(){y++;x(w);var e=(s.$flags$&6)===2?performance.now()+7*Math.ceil(y*(1/22)):Infinity;E(b,e);E(_,e);if(b.length>0){_.push.apply(_,b);b.length=0}if(g=w.length+b.length+_.length>0){s.raf(k)}else{y=0}};var R=S(b);var C={};var j=function(e){return e!=null};var L=function(e){return e.toLowerCase()};var N=function(e){return["object","function"].includes(typeof e)};function P(e){return"__sc_import_"+e.replace(/\s|-/g,"_")}var z=e("a",function(){if(!(a.CSS&&a.CSS.supports&&a.CSS.supports("color","var(--c)"))){return t.import("./p-39f11146.system.js")}return Promise.resolve()});var I=e("p",function(){return __awaiter(r,void 0,void 0,function(){var e,r,s;return __generator(this,function(o){switch(o.label){case 0:e=t.meta.url;if(!(e!==""))return[3,1];return[2,Promise.resolve(new URL(".",e).href)];case 1:r=Array.from(i.querySelectorAll("script")).find(function(e){return e.src.includes("/"+n+".esm.js")||e.getAttribute("data-namespace")===n});s=new URL(".",new URL(r.getAttribute("data-resources-url")||r.src,a.location.href));O(s.href);if(!!window.customElements)return[3,3];return[4,t.import("./p-a8fc097f.system.js")];case 2:o.sent();o.label=3;case 3:return[2,s.href]}})})});var O=function(e){var t=P(n);try{a[t]=new Function("w","return import(w);")}catch(n){var r=new Map;a[t]=function(n){var s=new URL(n,e).href;var o=r.get(s);if(!o){var l=i.createElement("script");l.type="module";l.src=URL.createObjectURL(new Blob(["import * as m from '"+s+"'; window."+t+".m = m;"],{type:"application/javascript"}));o=new Promise(function(e){l.onload=function(){e(a[t].m);l.remove()}});r.set(s,o);i.head.appendChild(l)}return o}}};var A="hydrated";var U=new WeakMap;var M=function(e,t,r){var n=m.get(e);if(l&&r){n=n||new CSSStyleSheet;n.replace(t)}else{n=t}m.set(e,n)};var B=function(e,t,r,n){var a=H(t);var s=m.get(a);e=e.nodeType===11?e:i;if(s){if(typeof s==="string"){e=e.head||e;var o=U.get(e);var l=void 0;if(!o){U.set(e,o=new Set)}if(!o.has(a)){{if(p){l=p.createHostStyle(n,a,s);var f=l["s-sc"];if(f){a=f;o=null}}else{l=i.createElement("style");l.innerHTML=s}e.insertBefore(l,e.querySelector("link"))}if(o){o.add(a)}}}else if(!e.adoptedStyleSheets.includes(s)){e.adoptedStyleSheets=e.adoptedStyleSheets.concat([s])}}return a};var T=function(e,t,r){var n=B(o&&e.shadowRoot?e.shadowRoot:e.getRootNode(),t.$tagName$,r,e);if(t.$flags$&10){e["s-sc"]=n;e.classList.add(n+"-h")}};var H=function(e,t){return"sc-"+e};var q=e("h",function(e,t){var r=[];for(var n=2;n<arguments.length;n++){r[n-2]=arguments[n]}var a=null;var i=false;var s=false;var o;var l=[];var f=function(t){for(var r=0;r<t.length;r++){a=t[r];if(Array.isArray(a)){f(a)}else if(a!=null&&typeof a!=="boolean"){if(i=typeof e!=="function"&&!N(a)){a=String(a)}if(i&&s){l[l.length-1].$text$+=a}else{l.push(i?{$flags$:0,$text$:a}:a)}s=i}}};f(r);if(t){{o=t.key||undefined}{var c=t.className||t.class;if(c){t.class=typeof c!=="object"?c:Object.keys(c).filter(function(e){return c[e]}).join(" ")}}}if(typeof e==="function"){return e(t,l,W)}var u={$flags$:0,$tag$:e,$children$:l.length>0?l:null,$elm$:undefined,$attrs$:t};{u.$key$=o}return u});var V={};var W={forEach:function(e,t){return e.map(F).forEach(t)},map:function(e,t){return e.map(F).map(t).map(G)}};var F=function(e){return{vattrs:e.$attrs$,vchildren:e.$children$,vkey:e.$key$,vname:e.$name$,vtag:e.$tag$,vtext:e.$text$}};var G=function(e){return{$flags$:0,$attrs$:e.vattrs,$children$:e.vchildren,$key$:e.vkey,$name$:e.vname,$tag$:e.vtag,$text$:e.vtext}};var Q=function(e,t,r,n,a,i){if(r===n){return}if(t==="class"&&!a){{var o=D(r);var l=D(e.className).filter(function(e){return!o.includes(e)});e.className=l.concat(D(n).filter(function(e){return!l.includes(e)})).join(" ")}}else if(t==="style"){{for(var f in r){if(!n||n[f]==null){if(f.includes("-")){e.style.removeProperty(f)}else{e.style[f]=""}}}}for(var f in n){if(!r||n[f]!==r[f]){if(f.includes("-")){e.style.setProperty(f,n[f])}else{e.style[f]=n[f]}}}}else if(t==="key");else if(t==="ref"){if(n){n(e)}}else if(t.startsWith("on")&&!v(e,t)){if(v(e,L(t))){t=L(t.substring(2))}else{t=L(t[2])+t.substring(3)}if(r){s.rel(e,t,r,false)}if(n){s.ael(e,t,n,false)}}else{var c=v(e,t);var u=N(n);if((c||u&&n!==null)&&!a){try{e[t]=n==null&&e.tagName.indexOf("-")===-1?"":n}catch(e){}}if(n==null||n===false){{e.removeAttribute(t)}}else if((!c||i&4||a)&&!u){n=n===true?"":n.toString();{e.setAttribute(t,n)}}}};var D=function(e){return!e?[]:e.split(" ")};var J=function(e,t,r,n){var a=t.$elm$.nodeType===11&&t.$elm$.host?t.$elm$.host:t.$elm$;var i=e&&e.$attrs$||C;var s=t.$attrs$||C;{for(n in i){if(s[n]==null&&i[n]!=null){Q(a,n,i[n],undefined,r,t.$flags$)}}}for(n in s){Q(a,n,i[n],s[n],r,t.$flags$)}};var K;var X;var Y=false;var Z=function(e,t,r,n){var a=t.$children$[r];var s=0;var o;var l;if(j(a.$text$)){a.$elm$=i.createTextNode(a.$text$)}else{o=a.$elm$=i.createElement(a.$tag$);{J(null,a,Y)}if(j(K)&&o["s-si"]!==K){o.classList.add(o["s-si"]=K)}if(a.$children$){for(s=0;s<a.$children$.length;++s){l=Z(e,a,s);if(l){o.appendChild(l)}}}}return a.$elm$};var ee=function(e,t,r,n,a,i){var s=e;var o;if(s.shadowRoot&&L(s.tagName)===X){s=s.shadowRoot}for(;a<=i;++a){if(n[a]){o=Z(null,r,a);if(o){n[a].$elm$=o;s.insertBefore(o,t)}}}};var te=function(e,t,r,n){for(;t<=r;++t){if(j(e[t])){n=e[t].$elm$;ie(e[t],true);n.remove()}}};var re=function(e,t,r,n){var a=0;var i=0;var s=0;var o=0;var l=t.length-1;var f=t[0];var c=t[l];var u=n.length-1;var $=n[0];var v=n[u];var h;var d;while(a<=l&&i<=u){if(f==null){f=t[++a]}else if(c==null){c=t[--l]}else if($==null){$=n[++i]}else if(v==null){v=n[--u]}else if(ne(f,$)){ae(f,$);f=t[++a];$=n[++i]}else if(ne(c,v)){ae(c,v);c=t[--l];v=n[--u]}else if(ne(f,v)){ae(f,v);e.insertBefore(f.$elm$,c.$elm$.nextSibling);f=t[++a];v=n[--u]}else if(ne(c,$)){ae(c,$);e.insertBefore(c.$elm$,f.$elm$);c=t[--l];$=n[++i]}else{s=-1;{for(o=a;o<=l;++o){if(t[o]&&j(t[o].$key$)&&t[o].$key$===$.$key$){s=o;break}}}if(s>=0){d=t[s];if(d.$tag$!==$.$tag$){h=Z(t&&t[i],r,s)}else{ae(d,$);t[s]=undefined;h=d.$elm$}$=n[++i]}else{h=Z(t&&t[i],r,i);$=n[++i]}if(h){{f.$elm$.parentNode.insertBefore(h,f.$elm$)}}}}if(a>l){ee(e,n[u+1]==null?null:n[u+1].$elm$,r,n,i,u)}else if(i>u){te(t,a,l)}};var ne=function(e,t){if(e.$tag$===t.$tag$){{return e.$key$===t.$key$}return true}return false};var ae=function(e,t){var r=t.$elm$=e.$elm$;var n=e.$children$;var a=t.$children$;if(!j(t.$text$)){{{J(e,t,Y)}}if(j(n)&&j(a)){re(r,n,t,a)}else if(j(a)){if(j(e.$text$)){r.textContent=""}ee(r,null,t,a,0,a.length-1)}else if(j(n)){te(n,0,n.length-1)}}else if(e.$text$!==t.$text$){r.textContent=t.$text$}};var ie=function(e,t){if(e){e.$attrs$&&e.$attrs$.ref&&e.$attrs$.ref(t?null:e.$elm$);e.$children$&&e.$children$.forEach(function(e){ie(e,t)})}};var se=function(e){return e&&e.$tag$===V};var oe=function(e,t,r,n){var a=t.$vnode$||{$flags$:0};X=L(e.tagName);if(se(n)){n.$tag$=null}else{n=q(null,null,n)}n.$flags$|=4;t.$vnode$=n;n.$elm$=a.$elm$=e.shadowRoot||e;{K=e["s-sc"]}ae(a,n)};var le=function(e,t){return __awaiter(r,void 0,void 0,function(){var r;return __generator(this,function(n){switch(n.label){case 0:if(!(e&&e[t]))return[3,4];n.label=1;case 1:n.trys.push([1,3,,4]);return[4,e[t]()];case 2:n.sent();return[3,4];case 3:r=n.sent();h(r);return[3,4];case 4:return[2]}})})};var fe=function(e,t,n,a){return __awaiter(r,void 0,void 0,function(){var r;return __generator(this,function(i){switch(i.label){case 0:{t.$flags$|=16}r=t.$lazyInstance$;if(!a)return[3,2];return[4,le(r,"componentWillLoad")];case 1:i.sent();i.label=2;case 2:{R(function(){return ce(e,t,n,r,a)})}return[2]}})})};var ce=function(e,t,r,n,a){{t.$flags$&=~16}{e["s-lr"]=false}if(a){T(e,r,t.$modeName$)}{{t.$flags$|=4;try{oe(e,t,r,n.render())}catch(e){h(e)}t.$flags$&=~4}}if(p){p.updateHost(e)}{e["s-lr"]=true}{t.$flags$|=2}if(e["s-rc"].length>0){e["s-rc"].forEach(function(e){return e()});e["s-rc"].length=0}ue(e,t)};var ue=function(e,t,r){if(!e["s-al"]){var n=t.$lazyInstance$;var a=t.$ancestorComponent$;if(!(t.$flags$&512)){t.$flags$|=512;{e.classList.add(A)}{t.$onReadyResolve$(e)}if(!a){i.documentElement.classList.add(A);{setTimeout(function(){return s.$flags$|=2},999)}}}if(a){if(r=a["s-al"]){r.delete(e);if(r.size===0){a["s-al"]=undefined;a["s-init"]()}}t.$ancestorComponent$=undefined}}};var $e=function(e){if((s.$flags$&1)===0){var t=c(e);if(p){p.removeHost(e)}var r=t.$lazyInstance$}};var ve=function(e,t){if(e!=null&&!N(e)){if(t&1){return String(e)}return e}return e};var he=function(e,t){return c(e).$instanceValues$.get(t)};var de=function(e,t,r,n){var a=c(e);var i=a.$hostElement$;var s=a.$instanceValues$.get(t);var o=a.$flags$;r=ve(r,n.$members$[t][0]);if(r!==s&&(!(o&8)||s===undefined)){a.$instanceValues$.set(t,r);if(a.$lazyInstance$){if(n.$watchers$&&(o&(1|8))===1){var l=n.$watchers$[t];if(l){l.forEach(function(e){try{a.$lazyInstance$[e].call(a.$lazyInstance$,r,s,t)}catch(e){h(e)}})}}if((o&(4|2|16))===2){fe(i,a,n,false)}}}};var me=function(e,t,r){if(t.$members$){if(e.watchers){t.$watchers$=e.watchers}var n=Object.entries(t.$members$);var a=e.prototype;n.forEach(function(e){var n=e[0],i=e[1][0];if(i&31||r&2&&i&32){Object.defineProperty(a,n,{get:function(){return he(this,n)},set:function(e){de(this,n,e,t)},configurable:true,enumerable:true})}});if(r&1){var i=new Map;a.attributeChangedCallback=function(e,t,r){var n=i.get(e);this[n]=r===null&&typeof this[n]==="boolean"?false:r};e.observedAttributes=n.filter(function(e){var t=e[0],r=e[1];return r[0]&15}).map(function(e){var t=e[0],r=e[1];var n=r[1]||t;i.set(n,t);return n})}}return e};var pe=function(e,n,a,i,s){return __awaiter(r,void 0,void 0,function(){var r,i,o;return __generator(this,function(l){switch(l.label){case 0:if(!((n.$flags$&256)===0))return[3,4];n.$flags$|=256;return[4,d(a)];case 1:s=l.sent();if(!s.isProxied){{a.$watchers$=s.watchers}me(s,a,2);s.isProxied=true}{n.$flags$|=8}try{new s(n)}catch(e){h(e)}{n.$flags$&=~8}ye(n.$lazyInstance$);if(!(!s.isStyleRegistered&&s.style))return[3,4];r=s.style;i=H(a.$tagName$,n.$modeName$);if(!(a.$flags$&8))return[3,3];return[4,t.import("./p-1563a874.system.js").then(function(e){return e.scopeCss(r,i,false)})];case 2:r=l.sent();l.label=3;case 3:M(i,r,!!(a.$flags$&1));s.isStyleRegistered=true;l.label=4;case 4:o=n.$ancestorComponent$;if(o&&!o["s-lr"]&&o["s-rc"]){o["s-rc"].push(function(){return pe(e,n,a)})}else{fe(e,n,a,true)}return[2]}})})};var ye=function(e){};var ge=function(e,t){if((s.$flags$&1)===0){var r=c(e);if(!(r.$flags$&1)){r.$flags$|=1;{var n=e;while(n=n.parentNode||n.host){if(n["s-init"]&&!n["s-lr"]){r.$ancestorComponent$=n;(n["s-al"]=n["s-al"]||new Set).add(e);break}}}if(t.$members$){Object.entries(t.$members$).forEach(function(t){var r=t[0],n=t[1][0];if(n&31&&e.hasOwnProperty(r)){var a=e[r];delete e[r];e[r]=a}})}{pe(e,r,t)}}ye(r.$lazyInstance$)}};var we=e("b",function(e,t){if(t===void 0){t={}}var r=[];var n=t.exclude||[];var l=i.head;var f=a.customElements;var u=l.querySelector("meta[charset]");var v=i.createElement("style");Object.assign(s,t);s.$resourcesUrl$=new URL(t.resourcesUrl||"/",a.location.href).href;if(t.syncQueue){s.$flags$|=4}e.forEach(function(e){return e[1].forEach(function(t){var a={$flags$:t[0],$tagName$:t[1],$members$:t[2],$listeners$:t[3]};{a.$watchers$={}}if(!o&&a.$flags$&1){a.$flags$|=8}var i=a.$tagName$;var s=function(e){__extends(t,e);function t(t){var r=e.call(this,t)||this;t=r;{r["s-lr"]=false;r["s-rc"]=[]}$(t);if(a.$flags$&1){if(o){t.attachShadow({mode:"open"})}else if(!("shadowRoot"in t)){t.shadowRoot=t}}return r}t.prototype.connectedCallback=function(){ge(this,a)};t.prototype.disconnectedCallback=function(){$e(this)};t.prototype["s-init"]=function(){var e=c(this);if(e.$lazyInstance$){ue(this,e)}};t.prototype["s-hmr"]=function(e){};t.prototype.forceUpdate=function(){{var e=c(this);fe(this,e,a,false)}};t.prototype.componentOnReady=function(){return c(this).$onReadyPromise$};return t}(HTMLElement);a.$lazyBundleIds$=e[0];if(!n.includes(i)&&!f.get(i)){r.push(i);f.define(i,me(s,a,1))}})});v.innerHTML=r+"{visibility:hidden}.hydrated{visibility:inherit}";v.setAttribute("data-styles","");l.insertBefore(v,u?u.nextSibling:l.firstChild)});var be=e("c",function(e,t,r){var n=_e(e);return{emit:function(e){return n.dispatchEvent(new CustomEvent(t,{bubbles:!!(r&4),composed:!!(r&2),cancelable:!!(r&1),detail:e}))}}});var _e=function(e){return c(e).$hostElement$}}}});