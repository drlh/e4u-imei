sap.ui.controller("view.profilelist", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf view.car
	 */
	// onInit : function() {
	//		
	// },
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf view.car
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf view.car
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf view.car
	 */
	// onExit: function() {
	//
	// }
	showInformation : function(evt) {

		var sa = sap.ui.getCore().byId("theSA");

		var profile = evt.getParameters();

		var id = "" + profile.id;
		id = id.substring(7);

		var property = "/" + id + "/";
		var m = sap.ui.getCore().getModel("profileTableData").getProperty(
				property);

		for ( var i in m) {
			if (m[i] == 1) {
				m[i] = true;
			} else if (m[i] == 0) {
				m[i] = false;
			}
		}
		if (m.pid == true) {
			m.pid = 1;
		}
		if (m.lstid == true) {
			m.lstid = 1;
		}
		if (m.entfernung == true) {
			m.entfernung = 1;
		}
		if (m.menge == true) {
			m.menge = 1;
		}


		var model = new sap.ui.model.json.JSONModel(m);
		sap.ui.getCore().setModel(model, "profile");
		
		console.log("model: profile");
		console.log(model);

		this.navigateToDetail(model);

	},

	navigateToDetail : function(m) {

		var sa = sap.ui.getCore().byId("theSA");

		if (sa.getDetailPage("d_profilelistdetail") == null) {
			sa.addDetailPage(sap.ui.jsview("d_profilelistdetail",
					"view.profilelistdetail"));
		}
		var lstid = "pd_btn_ls"+m.lstid;
		sap.ui.getCore().byId("pd_csIn").setSelectedButton(lstid);
		sa.toDetail("d_profilelistdetail");
	},

	/**
	 * called within view
	 */
	setModel : function() {

		var uid = sap.ui.getCore().getModel("userdata").getProperty("/");

		if (uid != null) {
			var url = "../services/profile/get_profile_information.xsjs?uid="
					+ uid.uid;
			var data = [];

			$.ajax({
				async : false,
				url : url,
				dataType : 'json',
				success : function(result) {
					data = result.data;
				},
				error : function(e) {
					console.log(e.message);
				}
			});

			var jsonModel = new sap.ui.model.json.JSONModel(data);
			sap.ui.getCore().setModel(jsonModel, "profileTableData");
		}
	}

});