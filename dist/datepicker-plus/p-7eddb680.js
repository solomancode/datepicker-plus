const e=window,t=document,n={t:0,s:"",raf:e=>requestAnimationFrame(e),ael:(e,t,n,s)=>e.addEventListener(t,n,s),rel:(e,t,n,s)=>e.removeEventListener(t,n,s)},s=!!t.documentElement.attachShadow,l=(()=>{try{return new CSSStyleSheet,!0}catch(e){}return!1})(),i=new WeakMap,o=e=>i.get(e),r=(e,t)=>i.set(t.l=e,t),c=(e,t)=>t in e,a=e=>console.error(e),f=new Map,u=e.__stencil_cssshim;let p=0,$=!1;const d=[],m=[],h=[],y=e=>t=>{e.push(t),$||($=!0,n.raf(_))},w=(e,t)=>{let n=0,s=0;for(;n<e.length&&(s=performance.now())<t;)try{e[n++](s)}catch(e){a(e)}n===e.length?e.length=0:0!==n&&e.splice(0,n)},_=()=>{p++,(e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){a(e)}e.length=0})(d);const e=2==(6&n.t)?performance.now()+7*Math.ceil(p*(1/22)):1/0;w(m,e),w(h,e),m.length>0&&(h.push(...m),m.length=0),($=d.length+m.length+h.length>0)?n.raf(_):p=0},b=y(m),v={},g=e=>null!=e,k=e=>e.toLowerCase(),j=e=>["object","function"].includes(typeof e),S=()=>e.CSS&&e.CSS.supports&&e.CSS.supports("color","var(--c)")?Promise.resolve():__sc_import_datepicker_plus("./p-f7ddb189.js"),L=async()=>{{const n=Array.from(t.querySelectorAll("script")).find(e=>e.src.includes("/datepicker-plus.esm.js")||"datepicker-plus"===e.getAttribute("data-namespace")),s=new URL(".",new URL(n.getAttribute("data-resources-url")||n.src,e.location.href));return M(s.href),window.customElements||await __sc_import_datepicker_plus("./p-a0c82e31.js"),s.href}},M=n=>{const s=`__sc_import_${"datepicker-plus".replace(/\s|-/g,"_")}`;try{e[s]=new Function("w","return import(w);")}catch(l){const i=new Map;e[s]=l=>{const o=new URL(l,n).href;let r=i.get(o);if(!r){const n=t.createElement("script");n.type="module",n.src=URL.createObjectURL(new Blob([`import * as m from '${o}'; window.${s}.m = m;`],{type:"application/javascript"})),r=new Promise(t=>{n.onload=()=>{t(e[s].m),n.remove()}}),i.set(o,r),t.head.appendChild(n)}return r}}},R=new WeakMap,U=e=>"sc-"+e,O=(e,t,...n)=>{let s,l=null,i=!1,o=!1,r=[];const c=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?c(l):null!=l&&"boolean"!=typeof l&&((i="function"!=typeof e&&!j(l))&&(l=String(l)),i&&o?r[r.length-1].i+=l:r.push(i?{t:0,i:l}:l),o=i)};if(c(n),t){s=t.key||void 0;{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter(t=>e[t]).join(" "))}}if("function"==typeof e)return e(t,r,C);const a={t:0,o:e,u:r.length>0?r:null,p:void 0,$:t};return a.h=s,a},x={},C={forEach:(e,t)=>e.map(E).forEach(t),map:(e,t)=>e.map(E).map(t).map(A)},E=e=>({vattrs:e.$,vchildren:e.u,vkey:e.h,vname:e._,vtag:e.o,vtext:e.i}),A=e=>({t:0,$:e.vattrs,u:e.vchildren,h:e.vkey,_:e.vname,o:e.vtag,i:e.vtext}),P=(e,t,s,l,i,o)=>{if(s!==l)if("class"!==t||i)if("style"===t){for(const t in s)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)s&&l[t]===s[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(t.startsWith("on")&&!c(e,t))t=c(e,k(t))?k(t.substring(2)):k(t[2])+t.substring(3),s&&n.rel(e,t,s,!1),l&&n.ael(e,t,l,!1);else{const n=c(e,t),s=j(l);if((n||s&&null!==l)&&!i)try{e[t]=null==l&&-1===e.tagName.indexOf("-")?"":l}catch(e){}null==l||!1===l?e.removeAttribute(t):(!n||4&o||i)&&!s&&(l=!0===l?"":l.toString(),e.setAttribute(t,l))}else{const t=W(s),n=W(e.className).filter(e=>!t.includes(e));e.className=n.concat(W(l).filter(e=>!n.includes(e))).join(" ")}},W=e=>e?e.split(" "):[],F=(e,t,n,s)=>{const l=11===t.p.nodeType&&t.p.host?t.p.host:t.p,i=e&&e.$||v,o=t.$||v;for(s in i)null==o[s]&&null!=i[s]&&P(l,s,i[s],void 0,n,t.t);for(s in o)P(l,s,i[s],o[s],n,t.t)};let T,q;const B=(e,n,s)=>{let l,i,o=n.u[s],r=0;if(g(o.i))o.p=t.createTextNode(o.i);else if(l=o.p=t.createElement(o.o),F(null,o,!1),g(T)&&l["s-si"]!==T&&l.classList.add(l["s-si"]=T),o.u)for(r=0;r<o.u.length;++r)(i=B(e,o,r))&&l.appendChild(i);return o.p},D=(e,t,n,s,l,i)=>{let o,r=e;for(r.shadowRoot&&k(r.tagName)===q&&(r=r.shadowRoot);l<=i;++l)s[l]&&(o=B(null,n,l))&&(s[l].p=o,r.insertBefore(o,t))},H=(e,t,n,s)=>{for(;t<=n;++t)g(e[t])&&(s=e[t].p,z(e[t],!0),s.remove())},N=(e,t)=>e.o===t.o&&e.h===t.h,V=(e,t)=>{const n=t.p=e.p,s=e.u,l=t.u;g(t.i)?e.i!==t.i&&(n.textContent=t.i):(F(e,t,!1),g(s)&&g(l)?((e,t,n,s)=>{let l,i,o=0,r=0,c=0,a=0,f=t.length-1,u=t[0],p=t[f],$=s.length-1,d=s[0],m=s[$];for(;o<=f&&r<=$;)if(null==u)u=t[++o];else if(null==p)p=t[--f];else if(null==d)d=s[++r];else if(null==m)m=s[--$];else if(N(u,d))V(u,d),u=t[++o],d=s[++r];else if(N(p,m))V(p,m),p=t[--f],m=s[--$];else if(N(u,m))V(u,m),e.insertBefore(u.p,p.p.nextSibling),u=t[++o],m=s[--$];else if(N(p,d))V(p,d),e.insertBefore(p.p,u.p),p=t[--f],d=s[++r];else{for(c=-1,a=o;a<=f;++a)if(t[a]&&g(t[a].h)&&t[a].h===d.h){c=a;break}c>=0?((i=t[c]).o!==d.o?l=B(t&&t[r],n,c):(V(i,d),t[c]=void 0,l=i.p),d=s[++r]):(l=B(t&&t[r],n,r),d=s[++r]),l&&u.p.parentNode.insertBefore(l,u.p)}o>f?D(e,null==s[$+1]?null:s[$+1].p,n,s,r,$):r>$&&H(t,o,f)})(n,s,t,l):g(l)?(g(e.i)&&(n.textContent=""),D(n,null,t,l,0,l.length-1)):g(s)&&H(s,0,s.length-1))},z=(e,t)=>{e&&(e.$&&e.$.ref&&e.$.ref(t?null:e.p),e.u&&e.u.forEach(e=>{z(e,t)}))},G=async(e,t)=>{if(e&&e[t])try{await e[t]()}catch(e){a(e)}},I=async(e,t,n,s)=>{t.t|=16;const l=t.l;s&&await G(l,"componentWillLoad"),b(()=>J(e,t,n,l,s))},J=(e,n,l,i,o)=>{n.t&=-17,e["s-lr"]=!1,o&&((e,n)=>{const l=((e,s,l,i)=>{let o=U(n.v),r=f.get(o);if(e=11===e.nodeType?e:t,r)if("string"==typeof r){let n,s=R.get(e=e.head||e);if(s||R.set(e,s=new Set),!s.has(o)){if(u){const e=(n=u.createHostStyle(i,o,r))["s-sc"];e&&(o=e,s=null)}else(n=t.createElement("style")).innerHTML=r;e.insertBefore(n,e.querySelector("link")),s&&s.add(o)}}else e.adoptedStyleSheets.includes(r)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,r]);return o})(s&&e.shadowRoot?e.shadowRoot:e.getRootNode(),0,0,e);10&n.t&&(e["s-sc"]=l,e.classList.add(l+"-h"))})(e,l),n.t|=4;try{((e,t,n,s)=>{const l=t.g||{t:0};q=k(e.tagName),(e=>e&&e.o===x)(s)?s.o=null:s=O(null,null,s),s.t|=4,t.g=s,s.p=l.p=e.shadowRoot||e,T=e["s-sc"],V(l,s)})(e,n,0,i.render())}catch(e){a(e)}n.t&=-5,u&&u.updateHost(e),e["s-lr"]=!0,n.t|=2,e["s-rc"].length>0&&(e["s-rc"].forEach(e=>e()),e["s-rc"].length=0),K(e,n)},K=(e,s,l)=>{if(!e["s-al"]){const i=s.l,o=s.k;512&s.t||(s.t|=512,e.classList.add("hydrated"),G(i,"componentDidLoad"),s.j(e),o||(t.documentElement.classList.add("hydrated"),setTimeout(()=>n.t|=2,999))),o&&((l=o["s-al"])&&(l.delete(e),0===l.size&&(o["s-al"]=void 0,o["s-init"]())),s.k=void 0)}},Q=(e,t,n)=>{if(t.S){const s=Object.entries(t.S),l=e.prototype;s.forEach(([e,[s]])=>{(31&s||2&n&&32&s)&&Object.defineProperty(l,e,{get(){return((e,t)=>o(e).L.get(t))(this,e)},set(n){((e,t,n,s)=>{const l=o(this),i=l.M,r=l.L.get(t),c=l.t;(n=(e=>(null==e||j(e),e))(n))===r||8&c&&void 0!==r||(l.L.set(t,n),l.l&&2==(22&c)&&I(i,l,s,!1))})(0,e,n,t)},configurable:!0,enumerable:!0})})}return e},X=async(e,t,n,s,i)=>{if(0==(256&t.t)){t.t|=256,(i=await(e=>__sc_import_datepicker_plus(`./${e.R}.entry.js`).then(t=>t[e.v.replace(/-/g,"_")],a))(n)).isProxied||(Q(i,n,2),i.isProxied=!0),t.t|=8;try{new i(t)}catch(e){a(e)}if(t.t&=-9,Y(t.l),!i.isStyleRegistered&&i.style){let e=i.style,t=U(n.v);8&n.t&&(e=await __sc_import_datepicker_plus("./p-549b16dd.js").then(n=>n.scopeCss(e,t,!1))),((e,t,n)=>{let s=f.get(e);l&&n?(s=s||new CSSStyleSheet).replace(t):s=t,f.set(e,s)})(t,e,!!(1&n.t)),i.isStyleRegistered=!0}}const o=t.k;o&&!o["s-lr"]&&o["s-rc"]?o["s-rc"].push(()=>X(e,t,n)):I(e,t,n,!0)},Y=()=>{},Z=(l,r={})=>{const c=[],a=r.exclude||[],f=t.head,p=e.customElements,$=f.querySelector("meta[charset]"),d=t.createElement("style");Object.assign(n,r),n.s=new URL(r.resourcesUrl||"/",e.location.href).href,r.syncQueue&&(n.t|=4),l.forEach(e=>e[1].forEach(t=>{const l={t:t[0],v:t[1],S:t[2],U:t[3]};!s&&1&l.t&&(l.t|=8);const r=l.v;l.R=e[0],a.includes(r)||p.get(r)||(c.push(r),p.define(r,Q(class extends HTMLElement{constructor(e){super(e),e=this,this["s-lr"]=!1,this["s-rc"]=[],(e=>{{const t={t:0,M:e,L:new Map};t.O=new Promise(e=>t.j=e),i.set(e,t)}})(e),1&l.t&&(s?e.attachShadow({mode:"open"}):"shadowRoot"in e||(e.shadowRoot=e))}connectedCallback(){((e,t)=>{if(0==(1&n.t)){const n=o(e);if(!(1&n.t)){n.t|=1;{let t=e;for(;t=t.parentNode||t.host;)if(t["s-init"]&&!t["s-lr"]){n.k=t,(t["s-al"]=t["s-al"]||new Set).add(e);break}}t.S&&Object.entries(t.S).forEach(([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}}),X(e,n,t)}Y(n.l)}})(this,l)}disconnectedCallback(){0==(1&n.t)&&u&&u.removeHost(this)}"s-init"(){const e=o(this);e.l&&K(this,e)}"s-hmr"(e){}forceUpdate(){I(this,o(this),l,!1)}componentOnReady(){return o(this).O}},l,1)))})),d.innerHTML=c+"{visibility:hidden}.hydrated{visibility:inherit}",d.setAttribute("data-styles",""),f.insertBefore(d,$?$.nextSibling:f.firstChild)},ee=(e,t,n)=>{const s=te(e);return{emit:e=>s.dispatchEvent(new CustomEvent(t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e}))}},te=e=>o(e).M;export{S as a,Z as b,ee as c,O as h,L as p,r};