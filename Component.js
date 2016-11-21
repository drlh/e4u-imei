sap.ui.define([ "sap/ui/core/UIComponent", 
                "sap/ui/model/json/JSONModel",
                "sap/ui/model/resource/ResourceModel" 
                ], 
    function(UIComponent, JSONModel, ResourceModel) {
	"use strict";
	
	return UIComponent.extend("e4u.imei.Component", {

		metadata : {
			rootView: "sap.ui.demo.wt.view.appstart",
			manifest : "json"
		},

		init : function() {
			
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
 
			// set data model
			var oData = {
				recipient : {
					name : "Fabian",
					uid: 1001
				}
			};
			var oModel = new sap.ui.model.json.JSONModel(oData);
			//this.setModel(oModel);
			sap.ui.getCore().setModel(oModel, "userdatamodel");
			
			
			// set i18n model
			var i18nModel = new ResourceModel({
				bundleName : "e4u.imei.i18n.i18n"
			});
			this.setModel(i18nModel, "i18n");
		}
	});
});