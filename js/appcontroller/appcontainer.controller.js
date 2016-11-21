//To use a javascript controller its name must end with .controller.js
sap.ui.controller("controller.appcontainer", {

	onInit : function() {
		oApplication.app = sap.ui.getCore().byId("App");
	},
	
	btnPress : function() {
		// alert("hi");
		console.log("Klappt");
		oApplication.loadViews();
		oApplication.app.to("buchen");
	},

	navigateToCsMenu : function() {
		console.log("Klappt");
		oApplication.loadViews();
		oApplication.app.to("menu");
		// oApplication.app = this.getView().byId("view.cs.view.menu");
	}

});