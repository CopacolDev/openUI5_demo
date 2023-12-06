/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./WaiterBase"],function(i){"use strict";var e={PENDING:"PENDING",EXECUTED:"EXECUTED",CANCELLED:"CANCELLED"};var n=i.extend("sap.ui.test.autowaiter._jsAnimationWaiter",{constructor:function(){i.apply(this,arguments);this._oTrackedAnimations=new Set;if(window.requestAnimationFrame){var n=window.requestAnimationFrame;window.requestAnimationFrame=function(i){var t,r=Array.prototype.slice.call(arguments,1),a=function(n){i(n);this._deregister(t,e.EXECUTED)}.bind(this);t=n.apply(null,[a].concat(r));this._register(t,e.PENDING);return t}.bind(this)}if(window.cancelAnimationFrame){var t=window.cancelAnimationFrame;window.cancelAnimationFrame=function(i){this._deregister(i,e.CANCELLED);return t(i)}.bind(this)}},_register:function(i,e){this._oLogger.trace("register","ID: "+i+" Reason: "+e);this._oTrackedAnimations.add(i)},_deregister:function(i,e){this._oLogger.trace("deregister","ID: "+i+" Reason: "+e);this._oTrackedAnimations.delete(i)},hasPending:function(){var i=this._oTrackedAnimations.size>0;this._oLogger.trace("hasPending",i);if(i){this._oHasPendingLogger.debug("jsAnimation in progress")}return i}});return new n});
//# sourceMappingURL=_jsAnimationWaiter.js.map