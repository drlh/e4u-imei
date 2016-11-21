sap.ui.jsview("view.dashboard", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.dashboard
	*/ 
	getControllerName : function() {
		return "view.dashboard";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.dashboard
	*/ 
	createContent : function(oController) {
		

		var appController = sap.ui.getCore().byId("App").getController();
		
		this.titleTop = new sap.m.Title("", {
			text : "Dashboard LM",
			titleStyle : sap.ui.core.TitleLevel.H1,
			align : sap.ui.core.TextAlign.Center
		});

		this.fbox_top = new sap.m.FlexBox("", {
			width : "100%",
			height : "auto",
			justifyContent : sap.m.FlexJustifyContent.Center,
			alignItems : sap.m.FlexAlignItems.Center,
			items : [ this.titleTop ]
		});
		this.fbox_top.addStyleClass("sapUiSmallMargin");
		
		var fragement1 = sap.ui.jsfragment("fragments.actualcar");
		
		this.vbox = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			items : [new sap.m.Button( {
				text : "Ladevorgang starten",
				width : "100%",
				type : sap.m.ButtonType.Accept,
				press : [oController.lv, oController]
			}), new sap.m.Button( {
				text : "Lademanagement",
				width : "100%",
				type : sap.m.ButtonType.Accept,
				press: [oController.lm, oController]
			}), new sap.m.Button( {
				text : "Ladestationssuche",
				width : "100%",
				type : sap.m.ButtonType.Accept,
				press: [oController.search, oController]
			})]
		});
		
		this.panel_content = new sap.m.Panel("", {
			content : [ fragement1, this.vbox ]
		});
		
		return new sap.m.Page({
			title : "{meta>/appname}",
			showNavButton : sap.ui.Device.system.phone,
			content : [this.fbox_top, this.panel_content ],
			navButtonPress : [appController.openMenu , appController],
			footer : new sap.m.Bar({
				contentMiddle : [ new sap.m.Button({
					text : "Verbunden",
					type : sap.m.ButtonType.Accept
				}), new sap.m.Button({
					text : "Lädt nicht",
					type : sap.m.ButtonType.Reject
				}) ],
				design : sap.m.BarDesign.Footer
			})
		});
	}

});