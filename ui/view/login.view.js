sap.ui.jsview("view.login", {

	/**
	 * Lisa Buchner - 015741363121 - call her 
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf imei.lm.login
	 */
	getControllerName : function() {
		return "view.login";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf imei.lm.login
	 */
	createContent : function(oController) {
		
		var appController = sap.ui.getCore().byId("App").getController();

		this.titleTop = new sap.m.Image("", {
			src : "./img/login.png",
			width : "auto",
			height : "auto"
		});

		this.fbox_top = new sap.m.FlexBox("", {
			width : "100%",
			height : "auto",
			justifyContent : sap.m.FlexJustifyContent.Center,
			alignItems : sap.m.FlexAlignItems.Center,
			items : [ this.titleTop ]
		});
		this.fbox_top.addStyleClass("sapUiSmallMargin");


		this.loginBtn = new sap.m.Button("home_loginBtn", {
			text : "Login",
			width : "100%",
		 press: [oController.loginBtnPress, oController]
		});

		this.inputUser = new sap.m.InputListItem("", {
			label : "User:",
			content : new sap.m.Input("home_userIn", {
				placeholder : "User"
			})
		});
		this.inputPw = new sap.m.InputListItem("", {
			label : "Password:",
			content : new sap.m.Input("home_pwIn", {
				placeholder : "Password",
				type : sap.m.InputType.Password
			})
		});

		this.panel_content = new sap.m.Panel("", {
			content : [ this.inputUser, this.inputPw, this.loginBtn ]
		});
		
		this.busy =  new sap.m.BusyDialog("BusyDialog",{});
		
		return new sap.m.Page({
			title : "{meta>/appname}",
			showNavButton : false,
			content : [ this.fbox_top, this.panel_content],
			navButtonPress : [appController.openMenu , appController],
			dependents : [this.busy]
		});
	}

});