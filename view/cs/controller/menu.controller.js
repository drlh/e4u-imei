sap.ui.controller("ccs.menu", {
   
   onInit : function() {
		oApplication.app = sap.ui.getCore().byId("App");
		
		var oDataUser = {
				name : "Fabian",
				uid: 1001,
				nav: 0,
				car: "Test",
				pid: -1,
				checkzurBuchung: false,
				checkzuUserBuchungen: false,
				checkzuProfilAnlegen: false,
				checkzuProfileAnzeigen: false,
				checkzuselectTest: false,
				checkzurMap: false
			};
			var userModel = new sap.ui.model.json.JSONModel(oDataUser);
			
			sap.ui.getCore().setModel(userModel, "userModel");
		    /*var checkzurBuchung = false,
		    checkzuUserBuchungen = false,
		    checkzuProfilAnlegen = false,
		    checkzuProfileAnzeigen = false,
		    checkzuselectTest = false;*/
	},
    buildScreen: function(screenID, check){
        if (check) {
            oApplication.loadViews();
            oApplication.app.to(screenID);
            return true;
        } else {
       var  screen = sap.ui.view({
    			id : screenID,
    			viewName : "cs." + screenID,
    			type : sap.ui.core.mvc.ViewType.JS
		    });
		sap.ui.getCore().byId("App").addPage(screen);
        oApplication.app.to(screenID);
        return true;
        }
    },
    mapAnzeigen:function (){
        var  screen = sap.ui.view({
    			id : "mapsPage",
    			viewName : "cs." + "mapsPage",
    			type : sap.ui.core.mvc.ViewType.XML
		    });
		sap.ui.getCore().byId("App").addPage(screen);
        oApplication.app.to("mapsPage");
    },
    zurBuchung : function (){
        var check = sap.ui.getCore().getModel("userModel").getProperty("/checkzurBuchung");
        sap.ui.getCore().getModel("userModel").setProperty("/checkzurBuchung", this.buildScreen("buchen", check));
        /*if (this.checkzurBuchung) {
            oApplication.loadViews();
            oApplication.app.to("buchen");
        } else {
        var buchen = sap.ui.view({
    			id : "buchen",
    			viewName : "cs.buchen",
    			type : sap.ui.core.mvc.ViewType.JS
		    });
		sap.ui.getCore().byId("App").addPage(buchen);
        oApplication.app.to("buchen");
        this.checkzurBuchung = true;
        }*/
       
		
    },
    zuUserBuchungen : function (){
        var check = sap.ui.getCore().getModel("userModel").getProperty("/checkzuUserBuchungen");
        sap.ui.getCore().getModel("userModel").setProperty("/checkzuUserBuchungen", this.buildScreen("userbuchungen", check));
       //this.checkzuUserBuchungen = this.buildScreen("userbuchungen", this.checkzuUserBuchungen);
        /*var userbuchungen = sap.ui.view({
    			id : "userbuchungen",
    			viewName : "cs.userbuchungen",
    			type : sap.ui.core.mvc.ViewType.JS
		    });
		sap.ui.getCore().byId("App").addPage(userbuchungen);
        oApplication.app.to("userbuchungen");*/
        
        
		
    },
    zuProfilAnlegen : function (){
        var check = sap.ui.getCore().getModel("userModel").getProperty("/checkzuProfilAnlegen");
        sap.ui.getCore().getModel("userModel").setProperty("/checkzuProfilAnlegen", this.buildScreen("profilanlegen", check));
       //this.checkzuProfilAnlegen = this.buildScreen("profilanlegen", this.checkzuProfilAnlegen);
        
       /* var profilanlegen = sap.ui.view({
    			id : "profilanlegen",
    			viewName : "cs.profilanlegen",
    			type : sap.ui.core.mvc.ViewType.JS
		    });
		sap.ui.getCore().byId("App").addPage(profilanlegen);
        oApplication.app.to("profilanlegen");*/
		
    },
    
    zuProfileAnzeigen : function (){
        var check = sap.ui.getCore().getModel("userModel").getProperty("/checkzuProfileAnzeigen");
        sap.ui.getCore().getModel("userModel").setProperty("/checkzuProfileAnzeigen", this.buildScreen("userprofiles", check));
        
        //this.checkzuProfileAnzeigen = this.buildScreen("userprofiles", this.checkzuProfileAnzeigen);
        //this.checkzuProfileAnzeigen = false;
    },
    
    zuselectTest : function (){
        var check = sap.ui.getCore().getModel("userModel").getProperty("/checkzuselectTest");
        sap.ui.getCore().getModel("userModel").setProperty("/checkzuselectTest", this.buildScreen("selectTest", check));
        
       //this.checkzuselectTest = this.buildScreen("selectTest", this.checkzuselectTest);
        
        /*var selectTest = sap.ui.view({
    			id : "selectTest",
    			viewName : "cs.selectTest",
    			type : sap.ui.core.mvc.ViewType.JS
		    });
		sap.ui.getCore().byId("App").addPage(selectTest);
        oApplication.app.to("selectTest");*/
		
    }

});