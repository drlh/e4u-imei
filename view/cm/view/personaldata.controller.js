sap.ui.controller("view.personaldata", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf view.personaldata
	 */
	// onInit: function() {
	//
	// },
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf view.personaldata
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf view.personaldata
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf view.personaldata
	 */
	// onExit: function() {
	// data: { field1: "hello", field2 : "hello2"} ,userdata
	// }

	update : function() {

		var model = sap.ui.getCore().getModel("userdata").getProperty("/");
		console.log(model);
		var url = "../services/userdata/update_user_information.xsjs?uid=" + model.uid
				+ "&name=" + model.name + "&vorname=" + model.vorname
				+ "&strasse=" + model.strasse + "&plz=" + model.plz + "&ort="
				+ model.ort + "&passwort=" + model.passwort;

		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			success : function(resultUser) {
				sap.m.MessageBox.show("Daten erfolreich geändert",
						sap.m.MessageBox.Icon.SUCCESS, " Info");
			},
			error : function(e) {
				console.log(e.message);
				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen",
						sap.m.MessageBox.Icon.ERROR, " Info");
			}
		});
	}

});