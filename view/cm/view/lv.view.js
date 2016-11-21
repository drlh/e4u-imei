sap.ui.jsview("view.lv", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.lv
	 */
	getControllerName : function() {
		return "view.lv";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf view.lv
	 */
	createContent : function(oController) {

		var appController = sap.ui.getCore().byId("App").getController();

		this.titleTop = new sap.m.Title("", {
			text : "Ladevorgang starten",
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

		// INPUT ITEMS

		this.vbox1 = new sap.m.FlexBox({
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			items : [ new sap.m.Label("", {
				text : "Gewünschte Reichweite",
				width : "100%"
			}), new sap.m.Input("lv_range", {
				type : sap.m.InputType.Number,
				maxLength : 3,
				valueLiveUpdate : true
			}) ]});

		this.vbox2 = new sap.m.FlexBox({
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			items : [ new sap.m.Label("", {
				text : "Ladestrategie",
				width : "100%"
			}), new sap.m.SegmentedButton("lv_csIn", {
				width : "100%",
				buttons : [ new sap.m.Button("lv_btn_ls1", {
					text : "{ladestrategie>/1}"
				}), new sap.m.Button("lv_btn_ls2", {
					text : "{ladestrategie>/2}"
				}), new sap.m.Button("lv_btn_ls3", {
					text : "{ladestrategie>/3}"
				}) ]
			}) ]
		});

		this.btnSend = new sap.m.Button("lv_btnSend", {
			text : "Ladevorgang starten",
			width : "100%",
			type : sap.m.ButtonType.Accept,
			press : [ oController.startLV, oController ]
		});

		var fragement = sap.ui.jsfragment("fragments.actualcar");

		// PANEL
		this.panel_content = new sap.m.Panel("", {
			content : [ fragement,  this.vbox1, this.vbox2, this.btnSend ]
		});

		return new sap.m.Page({
			title : "{meta>/appname}",
			showNavButton : sap.ui.Device.system.phone,
			content : [ this.fbox_top, this.panel_content ],
			navButtonPress : [ appController.openMenu, appController ],
			footer : new sap.m.Bar({
				contentMiddle : [ new sap.m.Button({
					text : "Verbunden",
					type : sap.m.ButtonType.Accept
				}), new sap.m.Button("status_2_lv", {
					text : "Lädt nicht",
					type : sap.m.ButtonType.Reject
				}) ],
				design : sap.m.BarDesign.Footer
			})
		});
	}

});