/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","./library","./ListItemBase","./GroupHeaderListItemRenderer"],function(e,t,r,a){"use strict";var n=t.ListMode;var o=e.TextDirection;var i=r.extend("sap.m.GroupHeaderListItem",{metadata:{interfaces:["sap.m.ITableItem"],library:"sap.m",properties:{title:{type:"string",group:"Data",defaultValue:null},count:{type:"string",group:"Data",defaultValue:null},upperCase:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:o.Inherit}}},renderer:a});i.prototype.getMode=function(){return n.None};i.prototype.shouldClearLastValue=function(){return true};i.prototype.getTable=function(){var e=this.getParent();if(e&&e.isA("sap.m.Table")){return e}};i.prototype.onBeforeRendering=function(){var e=this.getTable();if(e){e.getColumns().forEach(function(e){e.clearLastValue()});this.TagName="tr";this.aAriaOwns=[]}};i.prototype.getAccessibilityType=function(e){};i.prototype.getContentAnnouncement=function(){return this.getTitle()};i.prototype.getGroupAnnouncement=function(){};return i});
//# sourceMappingURL=GroupHeaderListItem.js.map