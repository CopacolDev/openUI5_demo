sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models"],function(e,t,s){"use strict";return e.extend("pib.cafelandia.app.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.call(this);this.setModel(s.createDeviceModel(),"device");this.setModel(s.createBlankJSONModel(),"screenControl");this.setModel(s.createBlankJSONModel(),"token");this.setModel(s.createBlankJSONModel(),"sideMenu");this.getRouter().initialize()},getContentDensityClass:function(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!t.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}})});
//# sourceMappingURL=Component.js.map