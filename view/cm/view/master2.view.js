sap.ui.jsview("view.master2", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf view.master
	 */
	getControllerName : function() {
		return "view.master2";
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
			title : "Lademanagement",
			showNavButton : true,
			navButtonPress : [ oController.navBack, oController ],
			rememberSelections : false,
			content : [ new sap.m.List({
				mode : "SingleSelectMaster",
				select : function(evt) {
					oController.handleListSelect(evt);
					this.removeSelections(true);
				},
				items : [ new sap.m.StandardListItem("listV1", {
					title : "Formularerfassung",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("form")
				}), new sap.m.StandardListItem("listV2", {
					title : "Interview",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("process")
				}), new sap.m.StandardListItem("listP", {
					title : "Profil hinzufügen ",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("add-activity-2")
				}), new sap.m.StandardListItem("listPr", {
					title : "Profilverwaltung",
					visible : true,
					icon : sap.ui.core.IconPool.getIconURI("task")
				}) ]
			}) ]
		});
	}

});