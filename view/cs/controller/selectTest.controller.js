sap.ui.controller("ccs.selectTest", {
   
   onInit : function() {
		oApplication.app = sap.ui.getCore().byId("App");
        window.countProfile = 0; // Globale Variable zum Aufzählen der ColumnList ID in der Tabelle
        
	},
    
    
    openMenu : function(){
         oApplication.loadViews();
        oApplication.app.to("menu");
    },
    profilLoeschen: function(){
        var pid = sap.ui.getCore().byId("inputFeld").getValue();
        
        var url = "./service/profil_buchungen_loeschen.xsjs?pid="+pid;
		var check = false;
		var data = [];
		
		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			success : function(response) {
				data = response.data;
				//sap.m.MessageBox.show("Buchung gelöscht!", sap.m.MessageBox.Icon.SUCCESS," Erfolg");
				
				check = true;
			},
			error : function(e) {
				console.log(e.message);
				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
			}
		});
		if (check){
		     url = "./service/profil_loeschen.xsjs?pid="+pid;
    		 check = false;
    		 data = [];
    		
    		$.ajax({
    			async : false,
    			url : url,
    			dataType : 'json',
    			success : function(response) {
    				data = response.data;
    				//sap.m.MessageBox.show("Buchung gelöscht!", sap.m.MessageBox.Icon.SUCCESS," Erfolg");
    				
    				check = true;
    			},
    			error : function(e) {
    				console.log(e.message);
    				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
    			}
    		});
		}
		if (check){
		    sap.m.MessageBox.show("Profil gelöscht!", sap.m.MessageBox.Icon.SUCCESS," Erfolg");
		    this.openMenu();
		}
    },
    
    
    selectPress : function() {
		var bnr = sap.ui.getCore().byId("inputFeld").getValue();
        
	
		var url = "./service/select_buchung.xsjs?bnr="+bnr;
		
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
		//console.log(data);
		var jsonModel = new sap.ui.model.json.JSONModel(data);
		sap.ui.getCore().setModel(jsonModel, "responseData");
		
		//var m = sap.ui.getCore().getModel("responseData").getProperty(property);
		
		var m = sap.ui.getCore().getModel("responseData").getProperty("/");
		//console.log(m[0].uid);
		var listbookings = sap.ui.getCore().byId("listbookings");
		
		for (var i in m) {
			var obj = m[i];
			
			listbookings.addItem(new sap.m.ColumnListItem("profile"+window.countProfile,{
				type : sap.m.ListType.Navigation,
				//press : [ oController.showInformation, oController ],
				cells : [ new sap.m.Label({
					text : obj.bnr
				}),
				new sap.m.Label({
					text : obj.start
				}),
				new sap.m.Label({
					text : obj.ende
				}),
				new sap.m.Label({
					text : obj.personen
				}),
				new sap.m.Label({
					text : obj.reichweite
				}),
				new sap.m.Label({
					text : obj.kennzeichen
				}),
				new sap.m.Label({
					text : obj.uid
				})
				]
			}));
			window.countProfile++;
		}
	}
});