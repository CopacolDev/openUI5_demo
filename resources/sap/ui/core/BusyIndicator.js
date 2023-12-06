/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","../base/EventProvider","./Popup","./BusyIndicatorUtils","sap/ui/core/Core","sap/ui/core/library","sap/ui/core/Lib","sap/ui/performance/trace/FESR","sap/ui/performance/trace/Interaction","sap/base/Log","sap/base/assert","sap/base/util/now"],function(jQuery,e,t,s,i,o,n,a,u,r,d,p){"use strict";var l=o.BusyIndicatorSize;var c=Object.assign(new e,{oPopup:null,oDomRef:null,bOpenRequested:false,iDEFAULT_DELAY_MS:1e3,sDOM_ID:"sapUiBusyIndicator"});c.M_EVENTS={Open:"Open",Close:"Close"};c._bShowIsDelayed=undefined;c._init=function(){var e=document.createElement("div");e.id=this.sDOM_ID;var i=document.createElement("div");this._oResBundle=n.getResourceBundleFor("sap.ui.core");var o=this._oResBundle.getText("BUSY_TEXT");delete this._oResBundle;i.className="sapUiBusy";i.setAttribute("tabindex","0");i.setAttribute("role","progressbar");i.setAttribute("alt","");i.setAttribute("title",o);e.appendChild(i);var a=s.getElement(l.Large);a.setAttribute("title",o);e.appendChild(a);this.oDomRef=e;this.oPopup=new t(e);this.oPopup.setModal(true,"sapUiBlyBusy");this.oPopup.setShadow(false);this.oPopup.attachOpened(function(e){this._onOpen(e)},this)};c._onOpen=function(e){var t=document.getElementById(c.sDOM_ID);t.style.height="100%";t.style.width="100%";var s=t.querySelector(".sapUiLocalBusyIndicator");s.className+=" sapUiLocalBusyIndicatorFade";if(t){t.focus()}this.fireOpen({$Busy:this.oPopup._$()})};c.show=function(e){r.debug("sap.ui.core.BusyIndicator.show (delay: "+e+") at "+Date.now());d(e===undefined||typeof e=="number"&&e%1==0,"iDelay must be empty or an integer");if(c._bShowIsDelayed===undefined){c._bShowIsDelayed=true;i.ready(function(){c._bShowIsDelayed=undefined;if(e===undefined||e!=0&&parseInt(e)==0||parseInt(e)<0){e=this.iDEFAULT_DELAY_MS}if(a.getActive()){this._fDelayedStartTime=p()+e}if(!this.oDomRef){this._init()}this.bOpenRequested=true;if(e===0){this._showNowIfRequested()}else{setTimeout(this["_showNowIfRequested"].bind(this),e)}}.bind(this))}};c._showNowIfRequested=function(){r.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: "+this.bOpenRequested+") at "+Date.now());if(!this.bOpenRequested){return}var e=window.scrollX===undefined?window.pageXOffset:window.scrollX;var s=window.scrollY===undefined?window.pageYOffset:window.scrollY;var i=e+" "+s;this.bOpenRequested=false;this.oPopup.open(0,t.Dock.LeftTop,t.Dock.LeftTop,document,i)};c.hide=function(){r.debug("sap.ui.core.BusyIndicator.hide at "+Date.now());if(this._fDelayedStartTime){var e=p()-this._fDelayedStartTime;u.addBusyDuration(e>0?e:0);delete this._fDelayedStartTime}var t=c;if(c._bShowIsDelayed===true){c._bShowIsDelayed=false}t.bOpenRequested=false;if(t.oDomRef){var s=t.oDomRef.querySelector(".sapUiLocalBusyIndicator");jQuery(s).removeClass("sapUiLocalBusyIndicatorFade");this.fireClose({$Busy:this.oPopup._$()});t.oPopup.close(0)}};c.attachOpen=function(e,t){this.attachEvent(c.M_EVENTS.Open,e,t);return this};c.detachOpen=function(e,t){this.detachEvent(c.M_EVENTS.Open,e,t);return this};c.attachClose=function(e,t){this.attachEvent(c.M_EVENTS.Close,e,t);return this};c.detachClose=function(e,t){this.detachEvent(c.M_EVENTS.Close,e,t);return this};c.fireOpen=function(e){this.fireEvent(c.M_EVENTS.Open,e)};c.fireClose=function(e){this.fireEvent(c.M_EVENTS.Close,e)};return c},true);
//# sourceMappingURL=BusyIndicator.js.map