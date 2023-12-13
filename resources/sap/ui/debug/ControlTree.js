/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define("sap/ui/debug/ControlTree",["sap/ui/base/EventProvider","sap/ui/core/Element","sap/ui/core/Rendering","sap/ui/core/UIArea","./Highlighter","sap/ui/dom/getOwnerWindow","sap/base/Log"],function(e,t,i,s,r,o,n){"use strict";var a=e.extend("sap.ui.debug.ControlTree",{constructor:function(t,s,o,n){e.apply(this,arguments);this.oWindow=s;this.oDocument=s.document;this.oCore=t;this.oSelectedNode=null;this.oParentDomRef=o;this.oSelectionHighlighter=new r("sap-ui-testsuite-SelectionHighlighter");this.oHoverHighlighter=new r("sap-ui-testsuite-HoverHighlighter",true,"#c8f",1);this.onclick=a.prototype.onclick.bind(this);this.onmouseover=a.prototype.onmouseover.bind(this);this.onmouseout=a.prototype.onmouseout.bind(this);this.oParentDomRef.addEventListener("click",this.onclick);this.oParentDomRef.addEventListener("mouseover",this.onmouseover);this.oParentDomRef.addEventListener("mouseout",this.onmouseout);this.enableInplaceControlSelection();i.attachUIUpdated(this.renderDelayed,this);this.sSelectedNodeId="";this.sResourcePath=window.top.sap.ui.require.toUrl("")+"/";this.sTestResourcePath=this.sResourcePath+"../test-resources/";this.sSpaceUrl=this.sResourcePath+"sap/ui/debug/images/space.gif";this.sMinusUrl=this.sResourcePath+"sap/ui/debug/images/minus.gif";this.sPlusUrl=this.sResourcePath+"sap/ui/debug/images/plus.gif";this.sLinkUrl=this.sResourcePath+"sap/ui/debug/images/link.gif"}});a.M_EVENTS={SELECT:"SELECT"};a.prototype.exit=function(){document.removeEventListener("mouseover",this.selectControlInTree);this.oParentDomRef.removeEventListener("click",this.onclick);this.oParentDomRef.removeEventListener("mouseover",this.onmouseover);this.oParentDomRef.removeEventListener("mouseout",this.onmouseout)};a.prototype.renderDelayed=function(){if(this.oTimer){this.oWindow.clearTimeout(this.oTimer)}this.oTimer=this.oWindow.setTimeout(this.render.bind(this),0)};a.prototype.render=function(){var e=this.oParentDomRef;var t=null,i=s.registry.all();e.innerHTML="";for(var r in i){var t=i[r],o=this.createTreeNodeDomRef(t.getId(),0,"UIArea",this.sTestResourcePath+"sap/ui/core/images/controls/sap.ui.core.UIArea.gif");e.appendChild(o);var n=t.getContent();for(var r=0,a=n.length;r<a;r++){this.renderNode(e,n[r],1)}}};a.prototype.createTreeNodeDomRef=function(e,t,i,s){var r=this.oParentDomRef.ownerDocument.createElement("DIV");r.setAttribute("id","sap-debug-controltree-"+e);var o=i.substring(i.lastIndexOf(".")>-1?i.lastIndexOf(".")+1:0);r.innerHTML="<img src='"+this.sSpaceUrl+"' align='absmiddle'><img src='"+s+"' align='absmiddle'>&nbsp;<span>"+o+" - "+e+"</span>";r.firstChild.style="height:12px;width:12px;display:none;";r.firstChild.nextSibling.style="height:16px;width:16px;";r.style.overflow="hidden";r.style.whiteSpace="nowrap";r.style.textOverflow="ellipsis";r.style.paddingLeft=t*16+"px";r.style.height="20px";r.style.cursor="default";r.setAttribute("sap-type",i);r.setAttribute("sap-id",e);r.setAttribute("sap-expanded","true");r.setAttribute("sap-level",""+t);r.title=i+" - "+e;return r};a.prototype.createLinkNode=function(e,t,i,s){var r=this.oParentDomRef.ownerDocument.createElement("DIV");r.setAttribute("id","sap-debug-controltreelink-"+t);var o=s?s.substring(s.lastIndexOf(".")>-1?s.lastIndexOf(".")+1:0):"";r.innerHTML="<img src='"+this.sSpaceUrl+"' align='absmiddle'><img src='"+this.sLinkUrl+"' align='absmiddle'>&nbsp;<span>"+(o?o+" - ":"")+t+"</span>";r.firstChild.style="height:12px;width:12px;display:none;";r.firstChild.nextSibling.style="height:12px;width:12px;";r.lastChild.style="color:#888;border-bottom:1px dotted #888;";r.style.overflow="hidden";r.style.whiteSpace="nowrap";r.style.textOverflow="ellipsis";r.style.paddingLeft=i*16+"px";r.style.height="20px";r.style.cursor="default";r.setAttribute("sap-type","Link");r.setAttribute("sap-id",t);r.setAttribute("sap-expanded","true");r.setAttribute("sap-level",""+i);r.title="Association to '"+t+"'";e.appendChild(r);return r};a.prototype.renderNode=function(e,i,s){if(!i){return}var r=i.getMetadata();var o=this.sTestResourcePath+r.getLibraryName().replace(/\./g,"/")+"/images/controls/"+r.getName()+".gif";var n=this.createTreeNodeDomRef(i.getId(),s,r.getName(),o);e.appendChild(n);var a=false;if(i.mAggregations){for(var l in i.mAggregations){a=true;var h=i.mAggregations[l];if(h&&h.length){for(var d=0;d<h.length;d++){var p=h[d];if(p instanceof t){this.renderNode(e,h[d],s+1)}}}else if(h instanceof t){this.renderNode(e,h,s+1)}}}if(i.mAssociations){for(var l in i.mAssociations){a=true;var g=i.mAssociations[l];if(Array.isArray(g)){for(var d=0;d<g.length;d++){var p=g[d];if(typeof p==="string"){this.createLinkNode(e,p,s+1)}}}else if(typeof g==="string"){this.createLinkNode(e,g,s+1)}}}if(a){var u=n.getElementsByTagName("IMG")[0];u.src=this.sMinusUrl;u.style.display=""}};a.prototype.onclick=function(e){var i=e.target;if(i.tagName=="IMG"){var s=i.parentNode,r=parseInt(s.getAttribute("sap-level")),o=s.nextSibling,n=s.getAttribute("sap-expanded")=="true";i=s.firstChild;if(o){var a=parseInt(o.getAttribute("sap-level"));while(o&&a>r){var l=o.getElementsByTagName("IMG")[0];if(n){o.style.display="none";o.setAttribute("sap-expanded","false");if(l&&l.src!==this.sSpaceUrl){l.src=this.sPlusUrl}}else{o.style.display="block";o.setAttribute("sap-expanded","true");if(l&&l.src!==this.sSpaceUrl){l.src=this.sMinusUrl}}o=o.nextSibling;if(o){a=parseInt(o.getAttribute("sap-level"))}}}if(n){i.src=this.sPlusUrl;s.setAttribute("sap-expanded","false")}else{i.src=this.sMinusUrl;s.setAttribute("sap-expanded","true")}}else{if(i.tagName!="SPAN"){i=i.getElementsByTagName("SPAN")[0]}var s=i.parentNode,h=s.getAttribute("sap-id"),d=t.getElementById(h),p=s.getAttribute("sap-type")==="Link"?"sap-debug-controltree-"+h:s.id;this.oSelectionHighlighter.hide();if(d instanceof t){this.oSelectionHighlighter.highlight(d.getDomRef());this.oHoverHighlighter.hide()}this.deselectNode(this.sSelectedNodeId);this.selectNode(p)}};a.prototype.onmouseover=function(e){var t=e.target;if(t.tagName=="SPAN"){this.oHoverHighlighter.highlight(this.getTargetDomRef(t.parentNode))}};a.prototype.onmouseout=function(e){var t=e.target;if(t.tagName=="SPAN"){if(this.getTargetDomRef(t.parentNode)){this.oHoverHighlighter.hide()}}};a.prototype.selectNode=function(e){if(!e){return}var t=(o(this.oParentDomRef)||window).document.getElementById(e);if(!t){n.warning("Control with Id '"+e.substring(22)+"' not found in tree");return}var i=t.getAttribute("sap-id");var s=t.getElementsByTagName("SPAN")[0];s.style.backgroundColor="#000066";s.style.color="#FFFFFF";this.sSelectedNodeId=e;this.fireEvent(a.M_EVENTS.SELECT,{id:e,controlId:i})};a.prototype.deselectNode=function(e){if(!e){return}var t=(o(this.oParentDomRef)||window).document.getElementById(e);var i=t.getElementsByTagName("SPAN")[0];i.style.backgroundColor="transparent";i.style.color="#000000";this.sSelectedNodeId=e};a.prototype.getTargetDomRef=function(e){var i=e.getAttribute("sap-type"),r=e.getAttribute("sap-id"),o=i==="UIArea"?s.registry.get(r):t.getElementById(r);while(o instanceof t){var n=o.getDomRef();if(n){return n}o=o.getParent()}if(o instanceof s){return o.getRootNode()}};a.prototype.enableInplaceControlSelection=function(){this.selectControlInTree=a.prototype.selectControlInTree.bind(this);document.addEventListener("mouseover",this.selectControlInTree)};a.prototype.selectControlInTree=function(e){if(e){if(e.ctrlKey&&e.shiftKey&&!e.altKey){var i=e.srcElement||e.target;while(i&&(!i.id||!t.getElementById(i.id))){i=i.parentNode}if(i&&i.id&&t.getElementById(i.id)){this.oHoverHighlighter.highlight(i)}else{this.oHoverHighlighter.hide()}}else{this.oHoverHighlighter.hide()}}};return a});
//# sourceMappingURL=ControlTree.js.map