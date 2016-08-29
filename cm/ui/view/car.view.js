sap.ui.jsview("view.car", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.car
	 */
	getControllerName : function() {
		return "view.car";
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
			text : "Fahrzeugverwaltung",
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
					text : "Bez."
				}),
			}), new sap.m.Column({
				header : new sap.m.Label({
					text : "Kennzeichen"
				}),
			}) ]
		});

		var details = sap.ui.getCore().getModel("carsTableData").getProperty("/");

		for (var i = 0; i < details.length; i++) {
			var obj = details[i];
			var id = "car"+i;
			listcars.addItem(new sap.m.ColumnListItem(id,{
				type : sap.m.ListType.Navigation,
				press : [ oController.showInformation, oController ],
				cells : [ new sap.m.Label({
					text : obj.bez
				}), new sap.m.Label({
					text : obj.kz
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
			enableScrolling : false,
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