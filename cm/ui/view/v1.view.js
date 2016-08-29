sap.ui.jsview("view.v1", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.v1
	 */
	getControllerName : function() {
		return "view.v1";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf view.v1
	 */
	createContent : function(oController) {
		
		var appController = sap.ui.getCore().byId("App").getController();
		var model = sap.ui.getCore().getModel("activeCar").getProperty("/");
		
		var maxRange = parseFloat(model.rw);

		this.titleTop = new sap.m.Title("", {
			text : "Ladesteuerung",
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
			}), new sap.m.DatePicker("d_arr1", {
				displayFormat : "dd.MMMM.YYYY",
				valueFormat : "YYYY-MM-dd",
				placeholder : "Datum"
			}), new sap.m.TimePicker("arr1", {
				width : "100%",
				localeId : "de-DE",
				displayFormat : "HH:mm",
				valueFormat : "HH:mm",
				title : "Zeit"
			}) ]
		}).addStyleClass("sapUiTinyMarginTopBottom");

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
			}), new sap.m.DatePicker("d_dep1", {
				height : "auto",
				width : "100%",
				displayFormat : "dd.MMMM.YYYY",
				valueFormat : "YYYY-MM-dd",
				placeholder : "Datum"
			}), new sap.m.TimePicker("dep1", {
				height : "auto",
				width : "100%",
				localeId : "de-DE",
				displayFormat : "HH:mm",
				valueFormat : "HH:mm",
				title : "Zeit"
			}) ]
		}).addStyleClass("sapUiTinyMarginTopBottom");

		this.vbox3 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [

			new sap.m.Label("ent1_label", {
				text : "Reichweite",
				width : "100%"
			}), new sap.m.Slider("ent1", {
				max : maxRange,
				value : 40.0,
				name : "Reichweite",
				liveChange: [oController.sliderChange, oController],
				change : [oController.sliderChange, oController]
			}) ]
		}).addStyleClass("sapUiTinyMarginTopBottom");

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
			}), new sap.m.SegmentedButton("v1_csIn", {
				width : "100%",
				buttons : [ new sap.m.Button("v1_btn_ls1", {
					text : "{ladestrategie>/1}"
				}), new sap.m.Button("v1_btn_ls2", {
					text : "{ladestrategie>/2}"
				}), new sap.m.Button("v1_btn_ls3", {
					text : "{ladestrategie>/3}"
				}) ]
			}) ]
		}).addStyleClass("sapUiTinyMarginTopBottom");

		this.btnSend = new sap.m.Button("v1_btnSend", {
			text : "Daten übermitteln",
			width : "100%",
			type : sap.m.ButtonType.Accept,
		 press: [oController.sendData, oController]
		});

		// PANEL
		this.panel_content = new sap.m.Panel("", {
			content : [this.vbox1, this.vbox2, this.vbox3, this.vbox4 , this.btnSend ]
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
				}), new sap.m.Button("status_2_v1",{
					text : "Lädt nicht",
					type : sap.m.ButtonType.Reject
				}) ],
				design : sap.m.BarDesign.Footer
			})
		});

	}

});