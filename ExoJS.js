!function(t){function e(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var o={};e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,o){if(1&o&&(t=e(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var r in t)e.d(n,r,function(e){return t[e]}.bind(null,r));return n},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(){window.ExoJS=class{constructor(t){this.appId=t,this.component=null,this.model={},this.templates={}}onRegister(){}onReady(){}attach(){this.component=document.querySelector(`[data-exo-component="${this.appId}"]`),this.component&&(this.onRegister(),setTimeout(()=>{this.bindData(),this.bindEvents(),this.bindIterables(),this.bindConditionals(this.component.querySelectorAll("[data-if]"),"data-if"),this.onReady()},0))}bindData(){this.component.querySelectorAll("[data-model]").forEach(t=>{this.model[t.getAttribute("data-model")]=this.bindItem(t)})}bindItem(t){let e;switch(t.tagName){case"INPUT":e=this.bindInputValue(t);break;case"SELECT":case"TEXTAREA":e=t.value;break;default:e=this.bindNormalValue(t)}return e}bindNormalValue(t){const e=t.getAttribute("data-type");let o=t.textContent;return e&&"int"===e&&(o=parseFloat(o)),e&&"string"===e&&(o+=""),o}bindInputValue(t){let e;return e="checkbox"===(t.getAttribute("type")+"").toLowerCase()?t.checked:t.value}bindEvents(){this.component.querySelectorAll("[data-action]").forEach(t=>{this.bindEvent(t)})}bindEvent(t,e,o){const n=t.getAttribute("data-action").split(":"),r=n[0],i=n[1];t[r]=t=>{this[i](t,e,o)}}bindConditionals(t,e,o){t.forEach(t=>{let n,r=t.getAttribute(e),i=!0;if(!r)return;0<=r.indexOf(":")&&(n=r.split(":")[1]||"",r=r.split(":")[0]||""),"!"===r.charAt(0)&&(i=!1,r=r.substring(1));let a=this.model[r];n&&null!=o&&(a=(a=a[o])[n]),null!=a&&(t.style.display=a===i?null:"none")})}bindIterables(){this.component.querySelectorAll("[data-foreach]").forEach(t=>{const e=t.getAttribute("data-foreach");this.model[e]=[],t.querySelectorAll(`[data-item-for="${e}"]`).forEach((t,o)=>{const n={},r=t.querySelectorAll("[data-model-for]"),i=t.querySelectorAll("[data-action]");r.forEach(t=>{const o=(t.getAttribute("data-model-for")+"").split(":");o[0]===e&&(n[o[1]]=this.bindItem(t))}),this.model[e].push(n),i.forEach(t=>{this.bindEvent(t,this.model[e][o],o)}),this.bindConditionals(t.querySelectorAll("[data-if-for]"),"data-if-for",o)})})}registerIterableTemplate(t,e){this.templates[t]=e}update(t){setTimeout(()=>{const e=this.model[t];void 0===e||(Array.isArray(e)?this.updateIterableNode(t):this.updateSingleNode(t))},0)}updateSingleNode(t){const e=this.component.querySelectorAll(`[data-model="${t}"]`),o=this.model[t];e.forEach(t=>{switch(t.tagName){case"INPUT":"checkbox"===(t.getAttribute("type")+"").toLowerCase()?t.checked=o:t.value=o;break;case"SELECT":case"TEXTAREA":t.value=o;break;default:t.textContent=o}}),this.bindConditionals(this.component.querySelectorAll("[data-if]"),"data-if")}updateIterableNode(t){const e=this.model[t],o=this.component.querySelectorAll(`[data-foreach="${t}"]`);if(!o||!o.length||!e)return;const n=this.templates[t];if(!n)return void console.error("ExoJS: A template must be registered to update a list");let r="";e.forEach(t=>{r+=n(t)}),o.forEach(t=>{t.innerHTML=r}),this.bindIterables()}}}]);