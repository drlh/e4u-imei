sap.ui.controller("view.lv", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.lv
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.lv
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.lv
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.lv
*/
//	onExit: function() {
//
//	}
	
	startLV : function() {
		var model = sap.ui.getCore().getModel("activeCar");
		var ladestrategiebutton = sap.ui.getCore().byId("lv_csIn").getSelectedButton();
		
		var vb = model.getProperty("/vb");
		var kz = model.getProperty("/kz");
		var ent = sap.ui.getCore().byId("lv_range").getValue();
		var lstid = ladestrategiebutton.substring(9);
	
		var url = "../services/pref/insert_lv.xsjs?kz="+kz+"&vb="+vb+"&ent="+ent+"&lstid="+lstid;
		
		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			success : function(resultUser) {
				var ids = ["status_2_lv", "status_2_v1", "status_2_v2"];
				
				for (var i = 0; i < ids.length; i++) {
					var btn = sap.ui.getCore().byId(ids[i]);
					btn.setText("Fahrzeug wird geladen");
					btn.setType(sap.m.ButtonType.Accept);
				}	
				
				sap.m.MessageBox.show("Ladevorgang gestartet", sap.m.MessageBox.Icon.SUCCESS," Info");
			},
			error : function(e) {
				console.log(e.message);
				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
			}
		});
	}
});