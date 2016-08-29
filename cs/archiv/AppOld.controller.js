sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
 
	return Controller.extend("sap.ui.demo.wt.controller.App", {
 
		onOpenDialog : function () {
			this.getOwnerComponent().helloDialog.open(this.getView());
		},
		
 
		handleToggleSecondaryContent: function(oEvent) {
			var oSplitContainer = this.getView().byId("mySplitContainer");
			oSplitContainer.setShowSecondaryContent(!oSplitContainer.getShowSecondaryContent());
		}
		
	});
 
});