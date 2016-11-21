sap.ui.jsview("view.appstart", {

	getControllerName: function() {
		return "controller.appstart";
	},

	createContent: function(controller) {

		var oApp = new sap.m.App("App", {
			initialPage: "appcontainer"
		});
		var page = sap.ui.view({
			id: "appcontainer",
			viewName: "view.appcontainer",
			type: sap.ui.core.mvc.ViewType.JS
		});
		

		oApp.addPage(page);
		
        
        this.createNavModel();
		
		return new sap.m.Shell("SHELL", {
			app: oApp
		});
		
	},
	createNavModel: function(){
	    var navModel = {

			modelBnr: "Test",

			userName: "User Name"

		};
		var model = new sap.ui.model.json.JSONModel(navModel);
		sap.ui.getCore().setModel(model, "navModel");
	}

});