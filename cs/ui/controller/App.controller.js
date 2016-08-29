sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel'
], function (jQuery, MessageToast, Fragment, Controller, Filter, JSONModel) {
	"use strict";
 
	var CController = Controller.extend("controller.App", {
		 
		onInit: function(){
			this.getSplitAppObj().setHomeIcon({
				'phone':'phone-icon.png',
				'tablet':'tablet-icon.png',
				'icon':'desktop.ico'
			});
			
			var data = [
			            {
			            	"BuchungsNr": 1,
			            	"Personen": 2,
			            	"Reichweite": 120.00,
			            	"Kennzeichen": "MA-TE-450",
			            	"Start": "2015-04-01T08:00:00",
			            	"Ende": "2015-04-01T16:00:00"
			              },
			              {
			            	"BuchungsNr": 2,
			            	"Personen": 2,
			            	"Reichweite": 60.00,
			            	"Kennzeichen": "MA-TE-450",
			            	"Start": "2015-04-06T08:00:00",
			            	"Ende": "2015-04-06T16:00:00"
			              },
			              {
			            	"BuchungsNr": 3,
			            	"Personen": 4,
			            	"Reichweite": 80.00,
			            	"Kennzeichen": "KA-EU-333",
			            	"Start": "2015-04-15T08:00:00",
			            	"Ende": "2015-04-15T16:00:00"
			              },
			              {
			            	"BuchungsNr": 4,
			            	"Personen": 2,
			            	"Reichweite": 15.00,
			            	"Kennzeichen": "MA-TE-450",
			            	"Start": "2015-05-02T08:00:00",
			            	"Ende": "2015-05-02T16:00:00"
			              },
			              {
			            	"BuchungsNr": 5,
			            	"Personen": 2,
			            	"Reichweite": 40.00,
			            	"Kennzeichen": "MA-TE-450",
			            	"Start": "2015-05-09T08:00:00",
			            	"Ende": "2015-05-09T16:00:00"
			              }
			            ];
			
			var model = new sap.ui.model.json.JSONModel(data);
			sap.ui.getCore().setModel(model, "buchungen");
			
			var sSplitAppMode = "HideMode";
			this.getSplitAppObj().setMode(sSplitAppMode);
			
		},
 
		onOrientationChange: function(oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {duration: 5000});
		},
 
		
 
		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},
 
		onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},
 
		onPressGoToStatistik : function() {
			this.getSplitAppObj().toMaster(this.createId("master2"));
		},
		onPressGoToProfile : function() {
			this.getSplitAppObj().toMaster(this.createId("master3"));
		},
 
		onListItemPress : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
 
			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},
		
		onBuchungsuebersichtItemPress : function(oEvent) {
			this.getSplitAppObj().toDetail(this.createId("buchungsuebersicht"));
		},
		onFahrzeugbuchenItemPress : function(oEvent) {
			this.getSplitAppObj().toDetail(this.createId("fzgbuchen"));
		},
		onProfileItemPress : function(oEvent) {
			this.getSplitAppObj().toDetail(this.createId("profile"));
		},
		showStatistiken : function(oEvent) {
			this.getSplitAppObj().toDetail(this.createId("statistik"));
		},
		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		}
 
	});
 
 
	return CController;
 
});