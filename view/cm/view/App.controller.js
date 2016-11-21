sap.ui.controller("view.App", {

	initModel : function() {

		var metadata = {
			"appname" : "iLoad"
		}

		var ladestrategie = {
			"1" : "1.0 KwH",
			"2" : "3.6 KwH",
			"3" : "11.0 KwH"
		}

		var consumptiondata = [ {
			date : "1.1.16",
			cons : -15
		}, {
			date : "2.1.16",
			cons : 26.5
		}, {
			date : "3.1.16",
			cons : -6
		}, {
			date : "5.1.16",
			cons : 15
		}, {
			date : "6.1.16",
			cons : 12
		}, {
			date : "10.1.16",
			cons : 20
		}, {
			date : "12.1.16",
			cons : -16
		}, {
			date : "12.1.16",
			cons : 11
		}, {
			date : "13.1.16",
			cons : 4
		}, {
			date : "13.1.16",
			cons : 17
		}, {
			date : "14.1.16",
			cons : 23
		}, {
			date : "17.1.16",
			cons : -12
		}, {
			date : "22.1.16",
			cons : 12
		}

		];

		
		

		// creates a Model based on the JSON Object
		var jsonMetadataModel = new sap.ui.model.json.JSONModel(metadata);
		var jsonLSModel = new sap.ui.model.json.JSONModel(ladestrategie);
		var jsonConsumptionModel = new sap.ui.model.json.JSONModel(consumptiondata);
		
		// initialises the global models
		sap.ui.getCore().setModel(jsonMetadataModel, "meta");
		sap.ui.getCore().setModel(jsonLSModel, "ladestrategie");
		sap.ui.getCore().setModel(jsonConsumptionModel, "consumption");
	},

	openMenu : function() {
		sap.ui.getCore().byId("theSA").toMaster("master1");
	},

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf test123.App
	 */
	onInit : function() {
		this.initModel();
	},

	/**
	 * Fügt der Anwendung die Detailseiten hinzu
	 */
	_addDetailPages : function() {

		var splitApp = sap.ui.getCore().byId("theSA");

		splitApp.addDetailPage(sap.ui.jsview("d_dashboard", "view.dashboard"));
		splitApp.addDetailPage(sap.ui.jsview("d_personaldata",
				"view.personaldata"));
		splitApp.addDetailPage(sap.ui.jsview("d_cars", "view.car"));
		splitApp.addDetailPage(sap.ui.jsview("d_lv", "view.lv"));
		splitApp.addDetailPage(sap.ui.jsview("d_v1", "view.v1"));
		splitApp.addDetailPage(sap.ui.jsview("d_v2", "view.v2"));
		splitApp.addDetailPage(sap.ui.jsview("d_profile", "view.profile"));
		splitApp.addDetailPage(sap.ui.jsview("d_search", "view.search"));
		splitApp.addDetailPage(sap.ui.jsview("d_stat", "view.stat"));
		splitApp.addDetailPage(sap.ui.jsview("d_profilelist", "view.profilelist"));
	}

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf test123.App
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf test123.App
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf test123.App
 */
// onExit: function() {
//
// }
});