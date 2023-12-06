/*!
 * copyright
 */
sap.ui.define(["sap/base/assert","sap/base/config","sap/base/Event","sap/base/Eventing","sap/base/Log","sap/base/i18n/Localization","sap/base/util/deepEqual","sap/ui/core/theming/ThemeHelper"],function(e,t,n,a,i,o,s,h){"use strict";const l=t.getWritableInstance();const c=new a;let r;let g;const m={getTheme:()=>{let e=l.get({name:"sapTheme",type:l.Type.String,defaultValue:l.get({name:"sapUiTheme",type:l.Type.String,external:true}),external:true});if(e===""){const t=h.getDefaultThemeInfo();e=`${t.DEFAULT_THEME}${t.DARK_MODE?"_dark":""}`}const t=e.indexOf("@");if(t>=0){const n=T(e.slice(t+1));e=t>0?e.slice(0,t):e;if(n!==m.getThemeRoot(e)){m.setThemeRoot(e,n)}}e=h.validateAndFallbackTheme(e,m.getThemeRoot(e));return e},setTheme:e=>{if(e){if(e.indexOf("@")!==-1){throw new TypeError("Providing a theme root as part of the theme parameter is not allowed.")}const t=!r;r??={};const n=m.getTheme();l.set("sapTheme",e);const a=m.getTheme();const i=n!==a;if(i){r.theme={new:a,old:n}}else{r=undefined}if(t){p(r)}if(!g&&i){f({theme:a})}}},getThemeRoot:(e,t)=>{const n=l.get({name:"sapUiThemeRoots",type:l.Type.Object});let a;e??=m.getTheme();if(n[e]&&typeof n[e]==="string"){a=n[e]}else if(n[e]&&typeof n[e]==="object"){a=n[e][t]||n[e][""]}return a},setThemeRoot:(t,n,a,i)=>{e(typeof t==="string","sThemeName must be a string");e(typeof n==="string","sThemeBaseUrl must be a string");const o=!r;r??={};const h={name:"sapUiThemeRoots",type:l.Type.Object};const c=l.get(Object.assign(h,{defaultValue:{}}));const g=l.get(Object.assign(h,{defaultValue:{}}));if(typeof a==="boolean"){i=a;a=undefined}g[t]??={};if(typeof g[t]==="string"){g[t]={"":g[t]};c[t]={"":c[t]}}if(a){for(let e=0;e<a.length;e++){const i=a[e];g[t][i]=n}}else{g[t][""]=n}if(!s(c,g)){l.set("sapUiThemeRoots",g);if(a){r.themeRoots={new:Object.assign({},g[t]),old:Object.assign({},c[t])}}else{r.themeRoots={new:n,old:c[t]?.[""]}}r.themeRoots.forceUpdate=i&&t===m.getTheme()}else{r=undefined}if(o){p()}},attachAppliedOnce:e=>{const t="applied";if(g){if(g.themeLoaded){e.call(null,new n(t,{theme:m.getTheme()}))}else{c.attachEventOnce(t,e)}}else{e.call(null,new n(t,{theme:m.getTheme()}))}},attachApplied:e=>{const t="applied";c.attachEvent(t,e);if(g){if(g.themeLoaded){e.call(null,new n(t,{theme:m.getTheme()}))}}else{e.call(null,new n(t,{theme:m.getTheme()}))}},detachApplied:e=>{c.detachEvent("applied",e)},attachChange:e=>{c.attachEvent("change",e)},detachChange:e=>{c.detachEvent("change",e)},attachThemeScopingChanged:e=>{c.attachEvent("themeScopingChanged",e)},detachThemeScopingChanged:e=>{c.detachEvent("themeScopingChanged",e)},fireThemeScopingChanged:e=>{c.fireEvent("themeScopingChanged",e)},notifyContentDensityChanged:()=>{f({theme:m.getTheme()})},registerThemeManager:e=>{g=e;g._attachThemeApplied(function(e){f(n.getParameters(e))});o.attachChange(function(e){var t=e.rtl;if(t!==undefined){g._updateThemeUrls(m.getTheme())}})}};function p(){if(r){c.fireEvent("change",r);r=undefined}}function f(e){c.fireEvent("applied",e)}function d(e,t){const n=l.get({name:"sapAllowedThemeOrigins",type:l.Type.String});return!!n?.split(",").some(n=>{try{n=t&&!n.startsWith("//")?"//"+n:n;return n==="*"||e===new URL(n.trim(),globalThis.location.href).origin}catch(e){i.error("sapAllowedThemeOrigin provides invalid theme origin: "+n);return false}})}function T(e){const t=e.startsWith("//");let n,a;try{n=new URL(e,globalThis.location.href);n.search="";if(n.origin&&d(n.origin,t)){a=n.toString()}else{n=new URL(n.pathname,globalThis.location.href);a=n.toString()}if(t){a=a.replace(n.protocol,"")}a+=(a.endsWith("/")?"":"/")+"UI5/"}catch(e){}return a}return m});
//# sourceMappingURL=Theming.js.map