/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/m/AvatarShape","sap/m/AvatarSize","sap/m/AvatarType","sap/m/AvatarColor","sap/m/AvatarImageFitType","sap/m/IllustratedMessageType","sap/m/IllustratedMessageSize","sap/m/library","sap/ui/Global","sap/ui/core/library","sap/ui/layout/library"],function(a,e,i,s,n,t,r,p){"use strict";var d=sap.ui.getCore().initLibrary({name:"sap.f",version:"1.120.1",dependencies:["sap.ui.core","sap.m","sap.ui.layout"],designtime:"sap/f/designtime/library.designtime",interfaces:["sap.f.cards.IHeader","sap.f.ICard","sap.f.IShellBar","sap.f.IDynamicPageStickyContent","sap.f.dnd.IGridDroppable"],types:["sap.f.AvatarImageFitType","sap.f.AvatarShape","sap.f.AvatarSize","sap.f.AvatarType","sap.f.AvatarColor","sap.f.AvatarGroupType","sap.f.cards.HeaderPosition","sap.f.cards.NumericHeaderSideIndicatorsAlignment","sap.f.DynamicPageTitleArea","sap.f.DynamicPageTitleShrinkRatio","sap.f.IllustratedMessageSize","sap.f.IllustratedMessageType","sap.f.LayoutType"],controls:["sap.f.Avatar","sap.f.AvatarGroup","sap.f.AvatarGroupItem","sap.f.cards.Header","sap.f.cards.NumericHeader","sap.f.cards.NumericIndicators","sap.f.cards.NumericSideIndicator","sap.f.CalendarInCard","sap.f.Card","sap.f.GridContainer","sap.f.DynamicPage","sap.f.DynamicPageHeader","sap.f.DynamicPageTitle","sap.f.IllustratedMessage","sap.f.FlexibleColumnLayout","sap.f.semantic.SemanticPage","sap.f.GridList","sap.f.GridListItem","sap.f.PlanningCalendarInCardLegend","sap.f.ProductSwitch","sap.f.ProductSwitchItem","sap.f.ShellBar","sap.f.SidePanel","sap.f.Illustration"],elements:["sap.f.DynamicPageAccessibleLandmarkInfo","sap.f.GridContainerItemLayoutData","sap.f.FlexibleColumnLayoutAccessibleLandmarkInfo","sap.f.semantic.AddAction","sap.f.semantic.CloseAction","sap.f.semantic.CopyAction","sap.f.semantic.DeleteAction","sap.f.semantic.DiscussInJamAction","sap.f.semantic.EditAction","sap.f.semantic.ExitFullScreenAction","sap.f.semantic.FavoriteAction","sap.f.semantic.FlagAction","sap.f.semantic.FooterMainAction","sap.f.semantic.FullScreenAction","sap.f.semantic.MainAction","sap.f.semantic.MessagesIndicator","sap.f.semantic.NegativeAction","sap.f.semantic.PositiveAction","sap.f.semantic.PrintAction","sap.f.semantic.SemanticButton","sap.f.semantic.SemanticControl","sap.f.semantic.SemanticToggleButton","sap.f.semantic.SendEmailAction","sap.f.semantic.SendMessageAction","sap.f.semantic.ShareInJamAction","sap.f.semantic.TitleMainAction","sap.f.SearchManager","sap.f.SidePanelItem"],extensions:{flChangeHandlers:{"sap.f.Avatar":"sap/f/flexibility/Avatar","sap.f.DynamicPageHeader":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.f.DynamicPageTitle":"sap/f/flexibility/DynamicPageTitle","sap.f.semantic.SemanticPage":{moveControls:"default"}},"sap.ui.support":{publicRules:true,internalRules:true}}});d.DynamicPageTitleArea={Begin:"Begin",Middle:"Middle"};d.DynamicPageTitleShrinkRatio=a.createType("sap.f.DynamicPageTitleShrinkRatio",{isValid:function(a){return/^(([0-9]\d*)(\.\d)?:([0-9]\d*)(\.\d)?:([0-9]\d*)(\.\d)?)$/.test(a)}},a.getType("string"));d.LayoutType={OneColumn:"OneColumn",TwoColumnsBeginExpanded:"TwoColumnsBeginExpanded",TwoColumnsMidExpanded:"TwoColumnsMidExpanded",MidColumnFullScreen:"MidColumnFullScreen",ThreeColumnsMidExpanded:"ThreeColumnsMidExpanded",ThreeColumnsEndExpanded:"ThreeColumnsEndExpanded",ThreeColumnsMidExpandedEndHidden:"ThreeColumnsMidExpandedEndHidden",ThreeColumnsBeginExpandedEndHidden:"ThreeColumnsBeginExpandedEndHidden",EndColumnFullScreen:"EndColumnFullScreen"};d.AvatarShape=e;d.AvatarSize=i;d.AvatarType=s;d.AvatarColor=n;d.AvatarImageFitType=t;d.AvatarGroupType={Group:"Group",Individual:"Individual"};d.cards=d.cards||{};d.cards.HeaderPosition={Top:"Top",Bottom:"Bottom"};d.cards.NumericHeaderSideIndicatorsAlignment={Begin:"Begin",End:"End"};d.NavigationDirection={Up:"Up",Down:"Down",Left:"Left",Right:"Right"};d.SidePanelPosition={Left:"Left",Right:"Right"};d.IllustratedMessageType=r;d.IllustratedMessageSize=p;(function(){sap.ui.lazyRequire("sap.f.routing.Router");sap.ui.lazyRequire("sap.f.routing.Target");sap.ui.lazyRequire("sap.f.routing.TargetHandler");sap.ui.lazyRequire("sap.f.routing.Targets")})();return d});
//# sourceMappingURL=library.js.map