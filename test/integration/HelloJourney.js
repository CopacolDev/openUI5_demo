sap.ui.define(["sap/ui/test/opaQunit","./pages/Main"],function(){"use strict";QUnit.module("Sample Hello Journey");opaTest("Should open the Hello dialog",function(e,o,n){e.iStartMyUIComponent({componentConfig:{name:"pib.cafelandia.app"}});o.onTheMainPage.iPressTheSayHelloButton();n.onTheMainPage.iShouldSeeTheHelloDialog();o.onTheMainPage.iPressTheOkButtonInTheDialog();n.onTheMainPage.iShouldNotSeeTheHelloDialog();n.iTeardownMyApp()});opaTest("Should close the Hello dialog",function(e,o,n){e.iStartMyUIComponent({componentConfig:{name:"pib.cafelandia.app"}});o.onTheMainPage.iPressTheSayHelloButton();o.onTheMainPage.iPressTheOkButtonInTheDialog();n.onTheMainPage.iShouldNotSeeTheHelloDialog();n.iTeardownMyApp()})});
//# sourceMappingURL=HelloJourney.js.map