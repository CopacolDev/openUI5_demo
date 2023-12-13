/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","../Device","./Control","./_IconRegistry","./InvisibleText","./library","./IconRenderer","./Lib","sap/ui/events/KeyCodes","sap/base/Log","sap/base/util/each"],function(e,t,o,r,s,i,n,a,l,u,p){"use strict";var c=i.IconColor;var h=i.CSSColor;var d=function(e){if(e!=null&&e!==""&&!h.isValid(e)&&!(e in c)){u.error('"'+e+'" is not of type sap.ui.core.CSSColor nor of type sap.ui.core.IconColor.');return false}else{return true}};var g=o.extend("sap.ui.core.Icon",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.ui.core",designtime:"sap/ui/core/designtime/Icon.designtime",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},size:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},color:{type:"string",group:"Appearance",defaultValue:null},hoverColor:{type:"string",group:"Appearance",defaultValue:null},activeColor:{type:"string",group:"Appearance",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},hoverBackgroundColor:{type:"string",group:"Appearance",defaultValue:null},activeBackgroundColor:{type:"string",group:"Appearance",defaultValue:null},decorative:{type:"boolean",group:"Accessibility",defaultValue:true},useIconTooltip:{type:"boolean",group:"Accessibility",defaultValue:true},alt:{type:"string",group:"Accessibility",defaultValue:null},noTabStop:{type:"boolean",group:"Accessibility",defaultValue:false}},aggregations:{_invisibleText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}}},renderer:n});g.prototype[t.support.touch?"ontouchstart":"onmousedown"]=function(e){if(this.hasListeners("press")){e.setMarked()}var t=this.getActiveColor(),o=this.getActiveBackgroundColor(),r;if(t||o){if(!e.targetTouches||e.targetTouches&&e.targetTouches.length===1){r=this.$();r.addClass("sapUiIconActive");if(t){this._addColorClass(t,"color")}if(o){this._addColorClass(o,"background-color")}}}};g.prototype[t.support.touch?"ontouchend":"onmouseup"]=function(e){if(!e.targetTouches||e.targetTouches&&e.targetTouches.length===0){this.$().removeClass("sapUiIconActive");this._restoreColors(t.system.desktop?"hover":undefined)}};g.prototype.onmouseover=function(){var e=this.getHoverColor(),t=this.getHoverBackgroundColor();if(e){this._addColorClass(e,"color")}if(t){this._addColorClass(t,"background-color")}};g.prototype.onmouseout=function(){this._restoreColors()};g.prototype[t.support.touch&&!t.system.desktop?"ontap":"onclick"]=function(e){if(this.hasListeners("press")){e.setMarked()}this.firePress({})};g.prototype.onkeydown=function(e){if(e.which===l.SPACE||e.which===l.ENTER){e.preventDefault();var t=this.$(),o=this.getActiveColor(),r=this.getActiveBackgroundColor();t.addClass("sapUiIconActive");if(o){this._addColorClass(o,"color")}if(r){this._addColorClass(r,"background-color")}}};g.prototype.onkeyup=function(e){if(e.which===l.SPACE||e.which===l.ENTER){this.$().removeClass("sapUiIconActive");this._restoreColors()}};g.prototype.onsapenter=g.prototype.onsapspace=function(e){if(this.hasListeners("press")){e.setMarked()}this.firePress({})};g.prototype._restoreColors=function(e){var t,o;if(e==="hover"){t=this.getHoverColor();o=this.getHoverBackgroundColor()}t=t||this.getColor();o=o||this.getBackgroundColor();this._addColorClass(t||"","color");this._addColorClass(o||"","background-color")};g.prototype._addColorClass=function(e,t){var o=this.$(),r=this;var s="";if(t==="color"){s="sapUiIconColor"}else if(t==="background-color"){s="sapUiIconBGColor"}else{return}p(c,function(e,t){r.removeStyleClass(s+t)});if(e in c){o.css(t,"");this.addStyleClass(s+e)}else{o.css(t,e)}};g.prototype.setSrc=function(t){e(t==null||r.isIconURI(t),this+": Property 'src' (value: '"+t+"') should be a valid Icon URI (sap-icon://...)");return this.setProperty("src",t)};g.prototype.setColor=function(e){if(d(e)){this.setProperty("color",e,true);this._addColorClass(e,"color")}return this};g.prototype.setActiveColor=function(e){if(d(e)){this.setProperty("activeColor",e,true)}return this};g.prototype.setHoverColor=function(e){if(d(e)){this.setProperty("hoverColor",e,true)}return this};g.prototype.setBackgroundColor=function(e){if(d(e)){this.setProperty("backgroundColor",e,true);this._addColorClass(e,"background-color")}return this};g.prototype.setActiveBackgroundColor=function(e){if(d(e)){this.setProperty("activeBackgroundColor",e,true)}return this};g.prototype.setHoverBackgroundColor=function(e){if(d(e)){this.setProperty("hoverBackgroundColor",e,true)}return this};g.prototype.attachEvent=function(e){o.prototype.attachEvent.apply(this,arguments);if(e=="press"&&this.hasListeners("press")){this.invalidate()}return this};g.prototype.detachEvent=function(e){o.prototype.detachEvent.apply(this,arguments);if(e=="press"&&!this.hasListeners("press")){this.invalidate()}return this};g.prototype._getOutputTitle=function(e){var t=this.getTooltip_AsString(),o=this.getUseIconTooltip();if(t||o&&e&&e.text){return t||e.text}};g.prototype._getIconLabel=function(e){var t=this.getAlt(),o=this.getTooltip_AsString(),r=this.getUseIconTooltip(),s=t||o||r&&e&&(e.text||e.name);if(s){return s}};g.prototype._createInvisibleText=function(e){var t=this.getAggregation("_invisibleText");if(!t){t=new s(this.getId()+"-label",{text:e});this.setAggregation("_invisibleText",t,true)}else{t.setText(e)}return t};g.prototype._getAccessibilityAttributes=function(e){var t=this.getAriaLabelledBy(),o={},r=this._getIconLabel(e),s;if(this.getDecorative()){o.role="presentation";o.hidden="true"}else if(this.hasListeners("press")){o.role="button"}else{o.role="img"}if(t.length>0){if(r){s=this._createInvisibleText(r);t.push(s.getId())}o.labelledby=t.join(" ")}else if(r){o.label=r}return o};g.prototype.getAccessibilityInfo=function(){if(this.getDecorative()){return null}var e=this.hasListeners("press");var t=r.getIconInfo(this.getSrc(),undefined,"sync");return{role:e?"button":"img",type:a.getResourceBundleFor("sap.ui.core").getText(e?"ACC_CTR_TYPE_BUTTON":"ACC_CTR_TYPE_IMAGE"),description:this.getAlt()||this.getTooltip_AsString()||(t?t.text||t.name:""),focusable:e}};return g});
//# sourceMappingURL=Icon.js.map