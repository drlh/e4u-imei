sap.ui.jsview("view.stat", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.stat
	*/ 
	getControllerName : function() {
		return "view.stat";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.stat
	*/ 
	createContent : function(oController) {
		var appController = sap.ui.getCore().byId("App").getController();
		
		this.titleTop = new sap.m.Title("", {
			text : "Statistiken",
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
		
		
		this.oChart = new sap.makit.Chart("consupmtionChart",{
			width : "100%",
			height: "75%",
			category : new sap.makit.Category({
				column : "date"
			}),
			type : sap.makit.ChartType.Column,
			values : new sap.makit.Value({
				expression : "consumptionValue",
				format : "number"
			}),
			categoryAxis : new sap.makit.CategoryAxis({
				displayLastLabel : true
			}),
			valueBubble : new sap.makit.ValueBubble({
				style : sap.makit.ValueBubbleStyle.Top,
				showCategoryText : true
			}),
			columns : [ new sap.makit.Column({
				name : "date",
				value : "{date}"
			}), new sap.makit.Column({
				name : "consumptionValue",
				value : "{cons}",
				type : "number"
			}) ]
		});
		var jsonModel = sap.ui.getCore().getModel("consumption");	
		
		this.oChart.setModel(jsonModel);
		this.oChart.bindRows("/");
		
		
		
		
		return new sap.m.Page({
			title : "{meta>/appname}",
			showNavButton : sap.ui.Device.system.phone,
			enableScrolling : true,
			content : [ this.fbox_top, this.oChart ],
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