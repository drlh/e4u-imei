sap.ui.jsview("view.cardetail", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.car
	 */
	getControllerName : function() {
		return "view.cardetail";
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


		this.fbox1 = new sap.m.FlexBox("", {
			width : "100%",
			height : "auto",
			direction : sap.m.FlexDirection.Column,
			justifyContent : sap.m.FlexJustifyContent.Center,
			alignItems : sap.m.FlexAlignItems.Center,
			items : [ new sap.m.Title({
				text : "{info>/bez}",
				titleStyle : sap.ui.core.TitleLevel.H2
			}), new sap.m.Image("", {
				src : "{info>/src}",
				width : "auto",
				height : "auto"
			}) ]
		});

		this.listcars = new sap.m.Table({
			columns : [ new sap.m.Column({
				header : new sap.m.Label({
					text : "Eigenschaft."
				}),
			}), new sap.m.Column({
				header : new sap.m.Label({
					text : "Wert"
				}),
			}) ],
			items : [ new sap.m.ColumnListItem({
				cells : [ new sap.m.Label({
					text : "Kennzeichen"
				}), new sap.m.Label({
					text : "{info>/kz}"
				}) ]
			}), new sap.m.ColumnListItem({
				cells : [ new sap.m.Label({
					text : "Max. Reichweite (km)"
				}), new sap.m.Label({
					text : "{info>/rw}"
				}) ]
			}), new sap.m.ColumnListItem({
				cells : [ new sap.m.Label({
					text : "Kapazität (KwH)"
				}), new sap.m.Label({
					text :"{info>/kap}"
				}) ]
			}), new sap.m.ColumnListItem({
				cells : [ new sap.m.Label({
					text : "Verbrauch (KwH)"
				}), new sap.m.Label({
					text : "{info>/vb}"
				}) ]
			}), new sap.m.ColumnListItem({
				cells : [ new sap.m.Label({
					text : "Anschluss 1 (KwH)"
				}), new sap.m.Label({
					text : "{info>/anschluss}"
				}) ]
			}), new sap.m.ColumnListItem({
				cells : [ new sap.m.Label({
					text : "Anschluss 2 (KwH)"
				}), new sap.m.Label({
					text : "{info>/anschluss2}"
				}) ]
			})

			]
		});


		// PANEL
		this.panel_content = new sap.m.Panel("", {
			content : [ this.fbox1, this.listcars ]
		});

		return new sap.m.Page({
			title : "{meta>/appname}",
			showNavButton : sap.ui.Device.system.phone,
			navButtonPress : [appController.openMenu , appController],
			content : [ this.fbox_top, this.panel_content ],
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