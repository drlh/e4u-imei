sap.ui.jsview("view.profilelist", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.car
	 */
	getControllerName : function() {
		return "view.profilelist";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf view.car
	 */
	createContent : function(oController) {
		var appController = sap.ui.getCore().byId("App").getController();

		this.titleTop = new sap.m.Title("", {
			text : "Profilverwaltung",
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

		var listcars = new sap.m.Table({
			columns : [ new sap.m.Column({
				header : new sap.m.Label({
					text : "Name."
				}),
			}), new sap.m.Column({
				header : new sap.m.Label({
					text : "Kennzeichen"
				}),
			}) ]
		});

		
		//Model instanziation
		oController.setModel();
		var details = sap.ui.getCore().getModel("profileTableData").getProperty("/");

		for (var i in details) {
			var obj = details[i];
			listcars.addItem(new sap.m.ColumnListItem("profile"+i,{
				type : sap.m.ListType.Navigation,
				press : [ oController.showInformation, oController ],
				cells : [ new sap.m.Label({
					text : obj.name
				}), new sap.m.Label({
					text : obj.kennzeichen
				}) ]
			}));
		}

		// listcars.bindAggregation("items", {
		// path : "/carsTableData",
		// template : new sap.m.ColumnListItem({
		// type : sap.m.ListType.Navigation,
		// press : [ detailController.showInformation, detailController ],
		// cells : [ new sap.m.Label({
		// text : "{bez}"
		// }), new sap.m.Label({
		// text : "{kz}"
		// }) ]
		// })
		// });

		// PANEL
		this.panel_content = new sap.m.Panel("", {
			content : [ listcars ]
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
				}), new sap.m.Button({
					text : "Lädt nicht",
					type : sap.m.ButtonType.Reject
				}) ],
				design : sap.m.BarDesign.Footer
			})
		});
	}

});