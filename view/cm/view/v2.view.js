sap.ui.jsview("view.v2", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.v2
	 */
	getControllerName : function() {
		return "view.v2";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf view.v2
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
				text : "Wann planen sie anzukommen?",
				design : sap.m.LabelDesign.Bold,
				textAlign : sap.ui.core.TextAlign.Center,
				width : "100%"
			}), new sap.m.DatePicker("d_arr2", {
				displayFormat : "dd.MMMM.YYYY",
				valueFormat : "YYYY-MM-dd",
				placeholder : "Datum"
			}), new sap.m.TimePicker("arr2", {
				width : "100%",
				localeId : "de-DE",
				displayFormat : "HH:mm",
				valueFormat : "HH:mm",
				title : "Zeit"
			}) ]
		});

		this.vbox2 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [ new sap.m.Label("", {
				text : "Wann wollen sie abfahren?",
				design : sap.m.LabelDesign.Bold,
				textAlign : sap.ui.core.TextAlign.Center,
				width : "100%"
			}), new sap.m.DatePicker("d_dep2", {
				height : "auto",
				width : "100%",
				displayFormat : "dd.MMMM.YYYY",
				valueFormat : "YYYY-MM-dd",
				placeholder : "Datum"
			}), new sap.m.TimePicker("dep2", {
				height : "auto",
				width : "100%",
				localeId : "de-DE",
				displayFormat : "HH:mm",
				valueFormat : "HH:mm",
				title : "Zeit"
			}) ]
		});

		this.vbox3 = new sap.m.FlexBox("", {
			direction : sap.m.FlexDirection.Column,
			width : "100%",
			height : "auto",
			align : sap.m.FlexAlignItems.Center,
			justifyContent : sap.m.FlexJustifyContent.Center,
			height : "auto",
			items : [

			new sap.m.Label("ent2_label", {
				text : "Wie weit möchten sie fahren?",
				design : sap.m.LabelDesign.Bold,
				textAlign : sap.ui.core.TextAlign.Center,
				width : "100%"
			}), new sap.m.Slider("ent2", {
				max : maxRange,
				value : 40.0,
				name : "Reichweite",
				liveChange : [ oController.sliderChange, oController ],
				change : [ oController.sliderChange, oController ]
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
				text : "Wie soll geladen werden?",
				design : sap.m.LabelDesign.Bold,
				textAlign : sap.ui.core.TextAlign.Center,
				width : "100%"
			}), new sap.m.SegmentedButton("v2_csIn", {
				width : "100%",
				buttons : [ new sap.m.Button("v2_btn_ls1", {
					text : "{ladestrategie>/1}"
				}), new sap.m.Button("v2_btn_ls2", {
					text : "{ladestrategie>/2}"
				}), new sap.m.Button("v2_btn_ls3", {
					text : "{ladestrategie>/3}"
				}) ]
			}) ]
		});


		this.step1 = new sap.m.WizardStep("step1", {
			title : "Ankunft",
			content : [ this.vbox1 ]
		});
		this.step2 = new sap.m.WizardStep("step2", {
			title : "Abfahrt",
			content : [ this.vbox2 ]
		});
		this.step3 = new sap.m.WizardStep("step3", {
			title : "Reichweite",
			content : [ this.vbox3 ]
		});
		this.step4 = new sap.m.WizardStep("step4", {
			title : "Ladestrategie",
			content : [ this.vbox4 ]
		});

		this.wizard = new sap.m.Wizard("wizard", {
			finishButtonText : "Absenden",
			width : "100%",
			height : "auto",
			complete : [oController.sendData, oController],
			steps : [ this.step1, this.step2, this.step3, this.step4]
		});

		this.panel_content = new sap.m.Panel("", {
			content : [ this.wizard ]
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
				}), new sap.m.Button("status_2_v2", {
					text : "Lädt nicht",
					type : sap.m.ButtonType.Reject
				}) ],
				design : sap.m.BarDesign.Footer
			})
		});
	}

});