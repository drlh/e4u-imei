sap.ui.controller("view.master", {

	handleListSelect : function(evt) {

		var pageid = evt.getParameter("listItem").getId();

		var app = sap.ui.getCore().byId("theSA");

		switch (pageid) {
		case "listStart": {
			app.toDetail("d_dashboard");
			break;
		}
		case "listUserData": {
			app.toDetail("d_personaldata");
			break;
		}
		case "listCars": {
			app.toDetail("d_cars");
			break;
		}
		case "listLV": {
			app.toDetail("d_lv");
			break;
		}
		case "listLM": {
			app.toMaster("master2");
			break;
		}
		case "listSearch": {
			app.toDetail("d_search");
			break;
		}
		case "listStat": {
			app.toDetail("d_stat");
			break;
		}
		case "listLogin": {
			app.toDetail("d_login");
			break;
		}
		case "listLogout": {
			this.logout();
		}
		}
	},

	logout : function(y) {

//		sap.ui.getCore().byId("listStart").setProperty("visible", false);
//		sap.ui.getCore().byId("listUserData").setProperty("visible", false);
//		sap.ui.getCore().byId("listCars").setProperty("visible", false);
//		sap.ui.getCore().byId("listLV").setProperty("visible", false);
//		sap.ui.getCore().byId("listLM").setProperty("visible", false);
//		sap.ui.getCore().byId("listSearch").setProperty("visible", false);
//		sap.ui.getCore().byId("listStat").setProperty("visible", false);
//		sap.ui.getCore().byId("listLogin").setProperty("visible", true);
//		sap.ui.getCore().byId("listLogout").setProperty("visible", false);
//		
//		
//		var y = sap.ui.getCore().byId("theSA");
//		y.toDetail("d_login");
//		
//		y.removeDetailPage("d_personaldata");
//		y.removeDetailPage("d_cars");
//		y.removeDetailPage("d_cardetail");
//		y.removeDetailPage("d_lv");
//		y.removeDetailPage("d_v1");
//		y.removeDetailPage("d_v2");
//		y.removeDetailPage("d_profile");
//		y.removeDetailPage("d_search");
//		y.removeDetailPage("d_stat");
//		y.removeDetailPage("d_dashboard");
		
		window.location.replace("http://e4umaha01.e4uma.local:8010/imei/index.html");
	}

/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf view.master
 */
// onInit: function() {
//
// },
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf view.master
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf view.master
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf view.master
 */
// onExit: function() {
//
// }
});