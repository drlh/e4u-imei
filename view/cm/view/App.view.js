sap.ui.jsview("view.App", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf test123.App
	 */
	getControllerName : function() {
		return "view.App";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf test123.App
	 */
	createContent : function(oController) {
		// SplitApp-Control


		 this.app = new sap.m.SplitApp("theSA",{
			mode: sap.m.SplitAppMode.HideMode,
			masterButtonText : "Menü",
			afterDetailNavigate : function() {
				this.hideMaster();
			}
		});
		// Views
		this.app.addMasterPage(sap.ui.jsview("master1", "view.master"));
		this.app.addMasterPage(sap.ui.jsview("master2", "view.master2"));
		this.app.addDetailPage(sap.ui.jsview("d_login", "view.login"));
		
		/*Die restlichen Seiten werden nach Login hinzugefügt! -> login.controller -> _addDetailPages()*/

		// angezeigt wird
		this.app.toMaster("master1");
		this.app.toDetail("d_login");
		
		// Control zurückgeben
		return this.app;
	}

});