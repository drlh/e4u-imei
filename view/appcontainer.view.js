sap.ui.jsview("view.appcontainer", {

	
	getControllerName : function() {
		return "controller.appcontainer";
	},

	createContent : function(controller) {

		this.btn_cm = new sap.m.Button("btn_cm", {
			text : "Private Car Management",
			width : "100%",
			icon : "sap-icon://car-rental",
			press : [ controller.btnPress, controller ]
		});

		this.btn_cs = new sap.m.Button("btn_cs", {
			text : "Corporate Car Sharing",
			width : "100%",
			icon : "sap-icon://car-rental",
			press : [ controller.navigateToCsMenu, controller ]
		});

		/*this.vbox = new sap.m.FlexBox({
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "40%",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			items : [ new sap.m.Button({
				text : "Private Car Management",
				width : "50%",
				icon : "sap-icon://car-rental",
				press : [ controller.btnPress, controller ]
			}) ]
		});*/

		return new sap.m.Page({
			title : "IMEI Anwendungen",
			content : [ this.btn_cm, this.btn_cs ]
		});
	}
});