sap.ui.jsview("view.master", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.master
	 */
	getControllerName : function() {
		return "view.master";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf view.master
	 */
	createContent : function(oController) {

		return new sap.m.Page({
			title : "Hauptmenü",
			content : [ new sap.m.List({
				mode : "SingleSelectMaster",
				rememberSelections: false,
				select : function(evt) {
					oController.handleListSelect(evt);
					this.removeSelections(true);
				},
				items : [ new sap.m.StandardListItem("listStart", {
					title : "Dashboard",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("home")
				}), new sap.m.StandardListItem("listUserData", {
					title : "Kundendaten",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("account")
				}), new sap.m.StandardListItem("listCars", {
					title : "Fahrzeugverwaltung",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("car-rental")
				}), new sap.m.StandardListItem("listLV", {
					title : "Ladevorgang starten",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("begin")
				}), new sap.m.StandardListItem("listLM", {
					title : "Lademanagement",
					type: sap.m.ListType.Navigation,
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("bo-strategy-management")
				}), new sap.m.StandardListItem("listSearch", {
					title : "Ladestationssuche",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("search")
				}), new sap.m.StandardListItem("listStat", {
					title : "Statistiken",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("bar-chart")
				}), new sap.m.StandardListItem("listLogin", {
					title : "Login",
					icon : sap.ui.core.IconPool.getIconURI("visits")
				}), new sap.m.StandardListItem("listLogout", {
					title : "Logout",
					icon : sap.ui.core.IconPool.getIconURI("log")
				}) ]
			}) ]
		});
	}

});