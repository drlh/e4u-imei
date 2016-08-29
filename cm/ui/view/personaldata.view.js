sap.ui.jsview("view.personaldata", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.personaldata
	 */
	getControllerName : function() {
		return "view.personaldata";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf view.personaldata
	 */
	createContent : function(oController) {

		var appController = sap.ui.getCore().byId("App").getController();
		
		this.titleTop = new sap.m.Title("", {
			text : "Persönliche Daten",
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
		
		
		// USERDATA
		
		// USERDATA

		this.udInUid = new sap.m.InputListItem("", {
			label : "User Id",
			content : new sap.m.Input("userData_uidIn", {
				value : "{userdata>/uid}"
			})
		});
		/*
		 * Box um den Namen zu ändern
		 */
		this.udInName = new sap.m.InputListItem("", {
			label : "Name",
			content : new sap.m.Input("userData_nameIn", {
				value : "{userdata>/name}"
			})
		});
		/*
		 * Box um den Voramen zu ändern
		 */
		this.udInFirstName = new sap.m.InputListItem("", {
			label : "Vorname",
			content : new sap.m.Input("userData_firstnameIn", {
				value : "{userdata>/vorname}"
			})
		});
		/*
		 * Box um die Straße zu ändern
		 */
		this.udInStreet = new sap.m.InputListItem("", {
			label : "Straße",
			content : new sap.m.Input("userData_streetIn", {
				value : "{userdata>/strasse}"
			})
		});
		/*
		 * Box um die PLZ zu ändern
		 */
		this.udInZip = new sap.m.InputListItem("", {
			label : "PLZ",
			content : new sap.m.Input("userData_zipIn", {
				value : "{userdata>/plz}",
				maxLength : 6
			})
		});
		/*
		 * Box um die Stra�e zu �ndern
		 */
		this.udInTown = new sap.m.InputListItem("", {
			label : "Ort",
			content : new sap.m.Input("userData_townIn", {
				value : "{userdata>/ort}"
			})
		});
		this.udInMail = new sap.m.InputListItem("", {
			label : "PW",
			content : new sap.m.Input("userData_emailIn", {
				value : "{userdata>/passwort}",
				type: sap.m.InputType.Password
			})
		});
		/*
		 * Button um die Daten abzuschicken
		 */
		this.submitUserData = new sap.m.Button("userData_submitBtn", {
			text : "Kundendaten ändern",
			width : "100%",
			press: [oController.update, oController]
		});
		
		//PANELS		
		/**
		 * Beinhaltet die Kundendaten
		 */
		this.userDataPanel = new sap.m.Panel("", {
			width : "100%",
			content : [ this.udInUid, this.udInName, this.udInFirstName, this.udInStreet, 
			            this.udInZip,this.udInTown,this.udInMail,this.submitUserData 
			]
		});


		return new sap.m.Page({
			title : "{meta>/appname}",
			showNavButton : sap.ui.Device.system.phone,
			content : [this.fbox_top, this.userDataPanel],
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