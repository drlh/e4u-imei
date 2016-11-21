sap.ui.controller("ccs.userbuchungen", {
   
   onInit : function() {
		oApplication.app = sap.ui.getCore().byId("App");
        this.loadBookingData();
	},
    
    onBeforeRendering : function(){
        
        this.refresh();
    },
    
    zurBuchung : function (){
        oApplication.loadViews();
        oApplication.app.to("buchen");
       
		
    },
    openMenu : function(){
        oApplication.loadViews();
        oApplication.app.to("menu");
    },
    handleLinkPress: function (oEvent) {
			
			var bnr = oEvent.getSource().getBindingContext().getProperty("bnr");
			var fahrzeug = oEvent.getSource().getBindingContext().getProperty("bezeichnung");
			console.log(fahrzeug);
			var navModel = sap.ui.getCore().getModel("userModel");
			navModel.setProperty("/nav", bnr);
			navModel.setProperty("/car", fahrzeug);

			var buchungbearbeiten = sap.ui.view({
    			id : "buchungbearbeiten",
    			viewName : "cs.buchungbearbeiten",
    			type : sap.ui.core.mvc.ViewType.JS
		    });
			sap.ui.getCore().byId("App").addPage(buchungbearbeiten);
            oApplication.app.to("buchungbearbeiten");
		},
	refresh : function (){
	    this.loadBookingData();
	    /*var table = sap.ui.getCore().byId("buchungsTabelle");
	    table.getBinding("items").refresh();*/
	},
	loadBookingData : function() {
		var xModel = JSON.parse(sap.ui.getCore().getModel("userModel").getJSON());
        var uid = xModel.uid;
	
		var url = "./service/select_alle_zukuenftigen_buchungen.xsjs?uid="+uid;
		
		var data = [];
		
		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			success : function(response) {
				data = response.data;
			},
			error : function(e) {
				console.log(e.message);
				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
			}
		});
		
		var jsonModel = new sap.ui.model.json.JSONModel(data);
		sap.ui.getCore().setModel(jsonModel, "responseData");
		this.getView().setModel(jsonModel);
	},
	loadAllBookingData : function() {
		var xModel = JSON.parse(sap.ui.getCore().getModel("userModel").getJSON());
        var uid = xModel.uid;
	
		var url = "./service/select_alle_buchungen.xsjs?uid="+uid;
		
		var data = [];
		
		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			success : function(response) {
				data = response.data;
			},
			error : function(e) {
				console.log(e.message);
				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
			}
		});
		
		var jsonModel = new sap.ui.model.json.JSONModel(data);
		sap.ui.getCore().setModel(jsonModel, "responseData");
		this.getView().setModel(jsonModel);
	}

});