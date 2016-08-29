sap.ui.controller("view.login", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf imei.lm.login
	 */
	// onInit: function() {
	//
	// },
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf imei.lm.login
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf imei.lm.login
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf imei.lm.login
	 */
	// onExit: function() {
	//
	// }
	showError : function() {
		sap.m.MessageBox.show("Anmeldung fehlgeschlagen", {
			icon : sap.m.MessageBox.Icon.ERROR,
			title : "Fehler",
			actions : [ sap.m.MessageBox.Action.OK ]
		// onClose : function(oAction) {
		// / * do something * /
		// }
		});
	},

	loginBtnPress : function() {

		var that = this;
		var core = sap.ui.getCore();

		// Busy Indicator
		var busy = core.byId("BusyDialog");
		busy.open();

		var user_in = sap.ui.getCore().byId("home_userIn").getValue();
		var password_in = "" + sap.ui.getCore().byId("home_pwIn").getValue();
		var pwdb = "";

		if (user_in != "" && password_in != "") {

			var urlUserPW = "../services/login/get_user_password.xsjs?uid="
					+ user_in;

			$.ajax({
				async : false,
				url : urlUserPW,
				dataType : 'json',
				success : function(resultUser) {
					var x = new String(resultUser.data[0]);
					var json = {
						id : "" + x
					};
					pwdb = "" + json.id;
				},
				error : function(e) {
					console.log(e.message);
					that.showError();
				}
			});
			if (pwdb == password_in) {
				console.log("passt");
				jQuery.sap.delayedCall(1000, this, function() {
					
					/* Initiiert die Models */
					this._initUserModel(user_in);
					this._initCarModel(user_in);
					this._initActiveCarModel();

					sap.ui.getCore().byId("App").getController()
							._addDetailPages();

					this.setMenuVisibility();
					// Busy Indicator
					busy.close();

					sap.ui.getCore().byId("theSA").toDetail("d_dashboard");
				});

			} else {
				console.log("passt nicht");
				that.showError();
			}

		} else {
			busy.close();
			that.showError();
		}
	},

	/**
	 * Erstellt das User Model / Informationen zum User
	 */
	_initUserModel : function(user) {

		var tmp = {};

		$.ajax({
			async : false,
			url : "../services/userdata/get_user_information.xsjs?uid=" + user,
			dataType : 'json',
			success : function(result) {

				var r = result.data[0];

				tmp.uid = r.uid;
				tmp.name = r.name;
				tmp.vorname = r.vorname;
				tmp.strasse = r.strasse;
				tmp.plz = r.plz;
				tmp.ort = r.ort;
				tmp.passwort = r.passwort;

				var jsonModel = new sap.ui.model.json.JSONModel(tmp);
				sap.ui.getCore().setModel(jsonModel, "userdata");
			},
			error : function(e) {
				console.log(e.message);
			}
		});
	},

	/**
	 * 
	 * @param user
	 */
	_initCarModel : function(user) {

		var carId = [];

		// GET ALL CARS
		$.ajax({
			async : false,
			url : "../services/userdata/get_cars.xsjs?uid=" + user,
			dataType : 'json',
			success : function(result) {

				carId = result.data;
				var jsonModel = new sap.ui.model.json.JSONModel(carId);
				sap.ui.getCore().setModel(jsonModel, "carId");
			},
			error : function(e) {
				console.log(e.message);
			}
		});

		// Array für Fahrzeuge
		var cars = [];
		var carsTableData = []

		for ( var i in carId) {

			var car = carId[i];

			var name = "car" + i;

			$.ajax({
				async : false,
				url : "../services/userdata/get_car_information.xsjs?kz="
						+ car.kz,
				dataType : 'json',
				success : function(result) {

					var r = result.data["0"];

					cars[name] = {};

					cars[name].kz = r.kz;
					cars[name].bez = r.bez;
					cars[name].typ = r.typ;
					cars[name].kap = r.kap;
					cars[name].anschluss = r.anschluss;
					cars[name].anschluss2 = r.anschluss2;
					cars[name].vb = r.vb;
					cars[name].rw = r.rw;
					cars[name].ladestand = r.ladestand;
					cars[name].aktiv = car.aktiv;

					carsTableData.push(r);

				},
				error : function(e) {
					console.log(e.message);
				}
			});
		}

		var jsonModel = new sap.ui.model.json.JSONModel(cars);
		sap.ui.getCore().setModel(jsonModel, "carsInfo");

		// SPECIAL Model for Table
		var jsonModel2 = new sap.ui.model.json.JSONModel(carsTableData);
		sap.ui.getCore().setModel(jsonModel2, "carsTableData");
	},

	/**
	 * Erstellt das Model für das aktiv verwendete Fahrzeug
	 */
	_initActiveCarModel : function() {
		var carIdModel = sap.ui.getCore().getModel("carId").getProperty("/");

		for ( var i in carIdModel) {

			var obj = carIdModel[i];

			if (obj.aktiv == 1) {
				var carInfoModel = sap.ui.getCore().getModel("carsInfo")
						.getProperty("/");

				var cid = "car" + i;
				var activeCar = carInfoModel[cid];

				var jsonModel = new sap.ui.model.json.JSONModel(activeCar);
				sap.ui.getCore().setModel(jsonModel, "activeCar");

				break;
			}
		}
	},

	setMenuVisibility : function() {
		sap.ui.getCore().byId("listStart").setProperty("visible", true);
		sap.ui.getCore().byId("listUserData").setProperty("visible", true);
		sap.ui.getCore().byId("listCars").setProperty("visible", true);
		sap.ui.getCore().byId("listLV").setProperty("visible", true);
		sap.ui.getCore().byId("listLM").setProperty("visible", true);
		sap.ui.getCore().byId("listSearch").setProperty("visible", true);
		sap.ui.getCore().byId("listStat").setProperty("visible", true);
		sap.ui.getCore().byId("listLogin").setProperty("visible", false);
		sap.ui.getCore().byId("listLogout").setProperty("visible", true);
	}

});