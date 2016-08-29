sap.ui.define([
		'jquery.sap.global',
		
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/MessageToast'
	], function(jQuery, Controller, JSONModel, MessageToast) {
	"use strict";
 
	var TableController = Controller.extend("controller.BuchungsTabelle", {
 
		onInit: function () {
			// set explored app's demo model on this sample
			var oModel = new JSONModel(jQuery.sap.getModulePath("ui", "/Buchung.json"));
			var x = sap.ui.getCore().getModel("buchungen");
			this.getView().setModel(oModel);
		},
		handleLinkPress: function (oEvent) {
			var bnr = oEvent.getSource().getBindingContext("buchungen").getProperty("BuchungsNr");
			MessageToast.show("Buchungsnummer: " + bnr);
			//funktioniert nicht...andere Lösung finden um zu nächstem Screen zu navigieren
			//this.getSplitAppObj().to(this.createId("fzgbuchen"));
			var sToPageId = "detail"
			sap.ui.getCore().byId("SplitAppDemo").toDetail(sToPageId);
			//this.getSplitAppObj().toDetail(this.createId(sToPageId));
			 //this.getView().byId(sToPageId);
		}
		
		
	});
 
 
	return TableController;
 
});