/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/core/util/reflection/JsControlTreeModifier"],function(e,r){"use strict";var t={};t.enhanceConfig=function(n,a){var i=a.propertyBag;var o=i?i.modifier:r;var g;var u;return o.getControlMetadata(n).then(function(e){g=e;a.controlMetadata=g;return o.getAggregation(n,"customData")}).then(function(e){return Promise.all(e.map(function(e){return o.getProperty(e,"key")})).then(function(r){return e.reduce(function(e,t,n){return r[n]==="xConfig"?t:e},undefined)})}).then(function(r){u=r;if(u){return o.getProperty(u,"value").then(function(r){return e({},JSON.parse(r.replace(/\\/g,"")))})}return{}}).then(function(r){var g;if(a.controlMeta&&a.controlMeta.aggregation){g=t.createAggregationConfig(n,a,r)}else{g=t.createPropertyConfig(n,a,r)}if(a.markAsModified){g.modified=true}var f=i?i.appComponent:undefined;var s=Promise.resolve();if(u&&n.isA){s=o.removeAggregation(n,"customData",u).then(function(){return o.destroy(u)})}return s.then(function(){return o.createAndAddCustomData(n,"xConfig",JSON.stringify(g),f).then(function(){return e({},g)})})})};t.readConfig=function(t,n){var a,i;if(n){var o=n.propertyBag?n.propertyBag.modifier:r;return o.getAggregation(t,"customData").then(function(e){return Promise.all(e.map(function(e){return o.getProperty(e,"key")})).then(function(r){return e.reduce(function(e,t,n){return r[n]==="xConfig"?t:e},undefined)})}).then(function(r){if(r){return o.getProperty(r,"value").then(function(r){return e({},JSON.parse(r.replace(/\\/g,"")))})}return null})}var g=function(e,r){var t=function(e,r){if(e){if(e.getMetadata){var t=e.getMetadata();var n=t.getAllAggregations();if(n){return n[r]}}}return undefined};var n=t(e,r);if(n){return e[n._sGetter]()}return undefined};var u=function(e,r){var t=e.getMetadata().getPropertyLikeSetting(r);if(t){var n=t._sGetter;return e[n]()}return undefined};i=g(t,"customData").find(function(e){return u(e,"key")=="xConfig"});a=i?e({},JSON.parse(u(i,"value").replace(/\\/g,""))):null;return a};t.createAggregationConfig=function(e,r,t){var n=r.key||r.name;var a=r.controlMeta;var i=r.property;var o=r.value;var g=r.controlMetadata||e.getMetadata();var u=a.aggregation;var f=u?u:g.getDefaultAggregation().name;var s=t||{};if(!s.hasOwnProperty("aggregations")){s.aggregations={}}if(!s.aggregations.hasOwnProperty(f)){if(g.hasAggregation(f)){s.aggregations[f]={}}else{throw new Error("The aggregation "+f+" does not exist for"+e)}}if(!s.aggregations[f].hasOwnProperty(n)){s.aggregations[f][n]={}}if(o!==null||o&&o.hasOwnProperty("value")&&o.value!==null){switch(r.operation){case"move":Object.entries(s.aggregations[f]).forEach(e=>{if(e[0]!==n&&e[1].position!==undefined){var t=o.index;var a=r.currentState;var i=a?.find(e=>e.key==n);var g=a?.indexOf(i);if(t<e[1].position){e[1].position++}if(t>e[1].position&&g<e[1].position){e[1].position--}if(e[1].position==t){g>e[1].position?e[1].position++:e[1].position--}}});s.aggregations[f][n][i]=o.index;break;case"remove":case"add":default:if(o.hasOwnProperty("value")){s.aggregations[f][n][i]=o.value;s.aggregations[f][n]["position"]=o.index}else{s.aggregations[f][n][i]=o}break}}else{delete s.aggregations[f][n][i];if(Object.keys(s.aggregations[f][n]).length===0){delete s.aggregations[f][n];if(Object.keys(s.aggregations[f]).length===0){delete s.aggregations[f]}}}return s};t.createPropertyConfig=function(e,r,t){var n=r.value;var a=r.property;var i=t||{};if(!i.properties){i.properties={}}if(!i.properties.hasOwnProperty(a)){i.properties[a]=[]}var o=r.operation;var g=i.properties[a].find(function(e){return e.key===r.key});if(g){i.properties[a].splice(i.properties[a].indexOf(g),1)}if(o!=="remove"){i.properties[a].splice(r.value.index,0,n)}return i};return t});
//# sourceMappingURL=xConfigAPI.js.map