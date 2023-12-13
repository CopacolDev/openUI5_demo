/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var t=function(i){this.mSettings=i||{};this.sMode=this.mSettings.mode||t.Mode.ALLOW;this.fnCallback=this.mSettings.callback;this.iTimeout=this.mSettings.timeout||1e4;this.bBlockEvents=this.mSettings.blockEvents!==false;this.bShowBlockLayer=this.mSettings.showBlockLayer!==false;this.bAllowSameOrigin=this.mSettings.allowSameOrigin!==false;this.sParentOrigin="";this.bUnlocked=false;this.bRunnable=false;this.bParentUnlocked=false;this.bParentResponded=false;this.sStatus="pending";this.aFPChilds=[];var s=this;this.iTimer=setTimeout(function(){if(s.bRunnable&&s.bParentResponded&&!s.bParentUnlocked){e.error("Reached timeout of "+s.iTimeout+"ms waiting for the parent to be unlocked","","sap/ui/security/FrameOptions")}else{e.error("Reached timeout of "+s.iTimeout+"ms waiting for a response from parent window","","sap/ui/security/FrameOptions")}s._callback(false)},this.iTimeout);var n=function(){s._handlePostMessage.apply(s,arguments)};t.__window.addEventListener("message",n);if(t.__parent===t.__self||t.__parent==null||this.sMode===t.Mode.ALLOW){this._applyState(true,true)}else{this._lock();if(this.sMode===t.Mode.DENY){e.error("Embedding blocked because configuration mode is set to 'DENY'","","sap/ui/security/FrameOptions");this._callback(false);return}if(this.bAllowSameOrigin){try{var o=t.__parent;var r=false;var a=true;do{var l=o.document.domain;if(o==t.__top){if(l!=undefined){r=true}break}o=o.parent}while(a);if(r){this._applyState(true,true)}}catch(e){this._sendRequireMessage()}}else{this._sendRequireMessage()}}};t.Mode={TRUSTED:"trusted",ALLOW:"allow",DENY:"deny"};t.__window=window;t.__parent=parent;t.__self=self;t.__top=top;t._events=["mousedown","mouseup","click","dblclick","mouseover","mouseout","touchstart","touchend","touchmove","touchcancel","keydown","keypress","keyup"];t.prototype.match=function(e,t){if(!/\*/i.test(t)){return e==t}else{t=t.replace(/\//gi,"\\/");t=t.replace(/\./gi,"\\.");t=t.replace(/\*/gi,".*");t=t.replace(/:\.\*$/gi,":\\d*");if(t.substr(t.length-1,1)!=="$"){t=t+"$"}if(t.substr(0,1)!=="^"){t="^"+t}var i=new RegExp(t,"i");return i.test(e)}};t._lockHandler=function(e){e.stopPropagation();e.preventDefault()};t.prototype._createBlockLayer=function(){if(document.readyState=="complete"){var e=document.createElement("div");e.style.position="absolute";e.style.top="-1000px";e.style.bottom="-1000px";e.style.left="-1000px";e.style.right="-1000px";e.style.opacity="0";e.style.backgroundColor="white";e.style.zIndex=2147483647;document.body.appendChild(e);this._lockDiv=e}};t.prototype._setCursor=function(){if(this._lockDiv){this._lockDiv.style.cursor=this.sStatus=="denied"?"not-allowed":"wait"}};t.prototype._lock=function(){var e=this;if(this.bBlockEvents){for(var i=0;i<t._events.length;i++){document.addEventListener(t._events[i],t._lockHandler,true)}}if(this.bShowBlockLayer){this._blockLayer=function(){e._createBlockLayer();e._setCursor()};if(document.readyState=="complete"){this._blockLayer()}else{document.addEventListener("readystatechange",this._blockLayer)}}};t.prototype._unlock=function(){if(this.bBlockEvents){for(var e=0;e<t._events.length;e++){document.removeEventListener(t._events[e],t._lockHandler,true)}}if(this.bShowBlockLayer){document.removeEventListener("readystatechange",this._blockLayer);if(this._lockDiv){document.body.removeChild(this._lockDiv);delete this._lockDiv}}};t.prototype._callback=function(e){this.sStatus=e?"allowed":"denied";this._setCursor();clearTimeout(this.iTimer);if(typeof this.fnCallback==="function"){this.fnCallback.call(null,e)}};t.prototype._applyState=function(e,t){if(this.bUnlocked){return}if(e){this.bRunnable=true}if(t){this.bParentUnlocked=true}if(!this.bRunnable||!this.bParentUnlocked){return}this._unlock();this._callback(true);this._notifyChildFrames();this.bUnlocked=true};t.prototype._applyTrusted=function(e){if(e){this._applyState(true,false)}else{this._callback(false)}};t.prototype._check=function(i){if(this.bRunnable){return}var s=false;if(this.bAllowSameOrigin&&this.sParentOrigin&&t.__window.document.URL.indexOf(this.sParentOrigin)==0){s=true}else if(this.mSettings.allowlist&&this.mSettings.allowlist.length!=0){var n=this.sParentOrigin.split("//")[1];n=n.split(":")[0];for(var o=0;o<this.mSettings.allowlist.length;o++){var r=n.indexOf(this.mSettings.allowlist[o]);if(r!=-1&&n.substring(r)==this.mSettings.allowlist[o]){s=true;break}}}if(s){this._applyTrusted(s)}else if(this.mSettings.allowlistService){var a=this;var l=new XMLHttpRequest;var c=this.mSettings.allowlistService+"?parentOrigin="+encodeURIComponent(this.sParentOrigin);l.onreadystatechange=function(){if(l.readyState==4){a._handleXmlHttpResponse(l,i)}};l.open("GET",c,true);l.setRequestHeader("Accept","application/json");l.send()}else{e.error("Embedding blocked because the allowlist or the allowlist service is not configured correctly","","sap/ui/security/FrameOptions");this._callback(false)}};t.prototype._handleXmlHttpResponse=function(t,i){if(t.status===200){var s=false;var n=t.responseText;var o=JSON.parse(n);if(o.active==false){this._applyState(true,true)}else if(i){return}else{if(this.match(this.sParentOrigin,o.origin)){s=o.framing}if(!s){e.error("Embedding blocked because the allowlist service does not allow framing","","sap/ui/security/FrameOptions")}this._applyTrusted(s)}}else{e.error("The configured allowlist service is not available: "+t.status,"","sap/ui/security/FrameOptions");this._callback(false)}};t.prototype._notifyChildFrames=function(){for(var e=0;e<this.aFPChilds.length;e++){this.aFPChilds[e].postMessage("SAPFrameProtection*parent-unlocked","*")}};t.prototype._sendRequireMessage=function(){t.__parent.postMessage("SAPFrameProtection*require-origin","*");if(this.mSettings.allowlistService){setTimeout(function(){if(!this.bParentResponded){this._check(true)}}.bind(this),10)}};t.prototype._handlePostMessage=function(e){var i=e.source,s=e.data;if(i===t.__self||i==null||typeof s!=="string"||s.indexOf("SAPFrameProtection*")===-1){return}if(i===t.__parent){this.bParentResponded=true;if(!this.sParentOrigin){this.sParentOrigin=e.origin;this._check()}if(s=="SAPFrameProtection*parent-unlocked"){this._applyState(false,true)}}else if(i.parent===t.__self&&s=="SAPFrameProtection*require-origin"&&this.bUnlocked){i.postMessage("SAPFrameProtection*parent-unlocked","*")}else{i.postMessage("SAPFrameProtection*parent-origin","*");this.aFPChilds.push(i)}};return t});
//# sourceMappingURL=FrameOptions.js.map