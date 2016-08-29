sap.ui.jsview("view.profilelistdetail", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.profile
	 */
	getControllerName : function() {
		return "view.profilelistdetail";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf view.profile
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

		// PAGE 1
		this.vbox11 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [ new sap.m.Label({
				text : "Name",
				width : "100%"
			}), new sap.m.Input("pd_name", {
				type : sap.m.InputType.Text,
				value : "{profile>/name}"
			}) ]
		});

		this.vbox12 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [

			new sap.m.Label({
				text : "Status",
				width : "100%"
			}), new sap.m.Switch("pd_status", {
				type : sap.m.SwitchType.AcceptReject,
				state : "{profile>/aktiv}"
			}) ]
		});

		// Droppdown
		this.cardropdown = new sap.m.Select({
			width : "100%",
			items : [ new sap.ui.core.Item("pd_c1", {
				text : "{profile>/kennzeichen}"
			}) ]
		});

		this.vbox13 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [ new sap.m.Label({
				text : "Fahrzeug",
				width : "100%"
			}), this.cardropdown ]
		});

		this.hbox_check1 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Row,
			items : [ new sap.m.CheckBox("pd_mo", {
				text : "MO",
				selected : "{profile>/mo}",
				textAlign : sap.ui.core.TextAlign.Center
			}), new sap.m.CheckBox("pd_di", {
				selected : "{profile>/di}",
				text : "DI",
				textAlign : sap.ui.core.TextAlign.Center
			}), new sap.m.CheckBox("pd_mi", {
				selected : "{profile>/mi}",
				text : "MI",
				textAlign : sap.ui.core.TextAlign.Center
			}), new sap.m.CheckBox("pd_do", {
				selected : "{profile>/don}",
				text : "DO",
				textAlign : sap.ui.core.TextAlign.Center
			}), new sap.m.CheckBox("pd_fr", {
				selected : "{profile>/fr}",
				text : "FR",
				textAlign : sap.ui.core.TextAlign.Center
			}) ]
		});

		this.hbox_check2 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Row,
			items : [ new sap.m.CheckBox("pd_sa", {
				selected : "{profile>/sa}",
				text : "SA",
				textAlign : sap.ui.core.TextAlign.Center
			}), new sap.m.CheckBox("pd_so", {
				selected : "{profile>/so}",
				text : "So",
				textAlign : sap.ui.core.TextAlign.Center
			}) ]
		});

		this.vbox14 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [ new sap.m.Label({
				text : "Tage",
				width : "100%"
			}), this.hbox_check1, this.hbox_check2 ]
		});

		this.it1 = new sap.m.IconTabFilter({
			text : "Profil",
			icon : "sap-icon://hint",
			content : [ this.vbox11, this.vbox12, this.vbox13, this.vbox14, ]
		});

		// PAGE 2

		this.vbox1 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [ new sap.m.Label("", {
				text : "Ankunft",
				width : "100%"
			}), new sap.m.TimePicker("pd_arr", {
				width : "100%",
				localeId : "de-DE",
				displayFormat : "HH:mm",
				valueFormat : "HH:mm:ss",
				title : "Zeit"
			}).setValue("{profile>/ankunft}") ]
		});

		this.vbox2 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [ new sap.m.Label("", {
				text : "Abfahrt",
				width : "100%"
			}), new sap.m.TimePicker("pd_dep", {
				height : "auto",
				width : "100%",
				localeId : "de-DE",
				displayFormat : "HH:mm",
				valueFormat : "HH:mm:ss",
				title : "Zeit"
			}).setValue("{profile>/abfahrt}") ]
		});

		this.vbox3 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [

			new sap.m.Label("", {
				text : "Reichweite (km)",
				width : "100%"
			}), new sap.m.Input("pd_ent", {
				type : sap.m.InputType.Text,
				value : "{profile>/entfernung}"
			}) ]
		});

		this.vbox4 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			items : [

			new sap.m.Label("", {
				text : "Ladestrategie",
				width : "100%"
			}), new sap.m.SegmentedButton("pd_csIn", {
				width : "100%",
				buttons : [ new sap.m.Button("pd_btn_ls1", {
					text : "{ladestrategie>/1}"
				}), new sap.m.Button("pd_btn_ls2", {
					text : "{ladestrategie>/2}"
				}), new sap.m.Button("pd_btn_ls3", {
					text : "{ladestrategie>/3}"
				}) ]
			}) ]
		});

		this.it2 = new sap.m.IconTabFilter({
			icon : "sap-icon://hint",
			text : "Präferenzen",
			content : [ this.vbox1, this.vbox2, this.vbox3, this.vbox4 ]
		});

		// ICONBAR
		this.iconbar = new sap.m.IconTabBar({
			items : [ this.it1, this.it2 ]
		});

		this.btnSend = new sap.m.Button("pd_btnSend", {
			text : "Profil bearbeiten",
			width : "100%",
			type : sap.m.ButtonType.Accept
		});

		this.btnDel = new sap.m.Button("pd_btnDel", {
			text : "Profil löschen",
			width : "100%",
			type : sap.m.ButtonType.Accept
		// press: [oController.loginBtnPress, oController]
		});
		this.vbox5 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Row,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			items : [ this.btnSend, this.btnDel ]
		});

		this.panel = new sap.m.Panel("", {
			width : "100%",
			content : [ this.fbox_top, this.iconbar, this.vbox5 ]
		});

		return new sap.m.Page({
			title : "{meta>/appname}",
			showNavButton : sap.ui.Device.system.phone,
			enableScrolling : true,
			content : [ this.panel ],
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