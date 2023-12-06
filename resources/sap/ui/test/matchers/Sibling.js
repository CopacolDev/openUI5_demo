/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/test/matchers/Matcher"],function(e,t){"use strict";var r=e.getLogger("sap.ui.test.matchers.Sibling");var i=new t;return function(e,t){return function(a){if(!e){r.debug("No sibling was defined so no controls will be filtered.");return true}var s=false;var l;if(typeof e==="string"){var o=i._getApplicationWindow();l=o.sap.ui.require("sap/ui/core/Element").getElementById(e)}else{l=e}if(t&&t.useDom){var u=-1;var g=-1;var f=l.getDomRef().parentNode;for(var d=0;d<f.children.length;d+=1){var b=f.children[d].getAttribute("data-sap-ui");if(b===l.getId()){u=d}if(b===a.getId()){g=d}}if(g>-1){if(t.prev){if(g<u){s=true}else{r.debug("Control '"+a+"' has sibling '"+l+"' but it isn't ordered before the sibling")}}else if(t.next){if(g>u){s=true}else{r.debug("Control '"+a+"' has sibling '"+l+"' but it isn't ordered after the sibling")}}else{r.debug("Sibling order should be defined")}}}else{var v=l.getParent();var c=0;var h=t&&t.level>=0&&t.level||Number.MAX_SAFE_INTEGER;while(c<h&&v&&!s){var p=n(v.mAggregations);p.forEach(function(e){if(e!==l){if(e===a){s=true}else{if(n(e.mAggregations).includes(a)){s=true}}}});c+=1;v=v.getParent()}}r.debug("Control '"+a+"' "+(s?"has":"does not have")+" sibling '"+l);return s}};function n(e){var t=[];for(var r in e){var i=e[r];if(Array.isArray(i)){t=t.concat(i.slice(0,20))}else if(i){t.push(i)}}t=t.filter(function(e){return e.getMetadata&&e.getMetadata().getName()&&e.$().length});return t}},true);
//# sourceMappingURL=Sibling.js.map