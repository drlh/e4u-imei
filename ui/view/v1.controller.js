sap.ui.controller("view.v1", {

/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf view.v1
 */
// onInit: function() {
//
// },

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf view.v1
 */
// onBeforeRendering: function() {
//
// },

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf view.v1
 */
// onAfterRendering: function() {
//
// },

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf view.v1
 */
// onExit: function() {
//
// }
	
	sliderChange : function() {
		var obj = sap.ui.getCore().byId("ent1");
		var value = obj.getValue();
		sap.ui.getCore().byId("ent1_label").setText("Reichweite "+value+" km");
	},

	sendData : function() {
	
	var model = sap.ui.getCore().getModel("activeCar");
	var ladestrategiebutton = sap.ui.getCore().byId("v1_csIn").getSelectedButton();
	
	var vb = model.getProperty("/vb");
	var kz = model.getProperty("/kz");
	var ent = sap.ui.getCore().byId("ent1").getValue();
	var lstid = ladestrategiebutton.substring(9);
	var arr = sap.ui.getCore().byId("arr1").getValue();
	var d_arr = sap.ui.getCore().byId("d_arr1").getValue();
	var dep = sap.ui.getCore().byId("dep1").getValue();
	var d_dep = sap.ui.getCore().byId("d_dep1").getValue();

	
	var url = "../services/pref/insert_v1v2.xsjs?kz="+kz+"&vb="+vb+"&ent="+ent+"&lstid="+lstid+"&arr="+arr+"&d_arr="+d_arr+"&dep="+dep+"&d_dep="+d_dep;
	
	$.ajax({
		async : false,
		url : url,
		dataType : 'json',
		success : function(resultUser) {	
			
			sap.m.MessageBox.show("Daten übermittelt", sap.m.MessageBox.Icon.SUCCESS," Info");
		},
		error : function(e) {
			console.log(e.message);
			sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
		}
	});
	
	}

});