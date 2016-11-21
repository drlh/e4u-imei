sap.ui.controller("ccs.userprofiles", {
   
   onInit : function() {
		oApplication.app = sap.ui.getCore().byId("App");
        this.loadProfilesData();
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
			
			var pid = oEvent.getSource().getBindingContext().getProperty("pid");
			console.log(pid);
			
			var navModel = sap.ui.getCore().getModel("userModel");
			navModel.setProperty("/pid", pid);
			

			
		},
	refresh : function (){
	    this.loadProfilesData();
	    /*var table = sap.ui.getCore().byId("buchungsTabelle");
	    table.getBinding("items").refresh();*/
	},
	delete : function (){
	    var pid = sap.ui.getCore().getModel("userModel").getProperty("/pid");
	    if (pid < 0){
	        sap.m.MessageBox.show("Bitte wählen Sie zuerst ein Profil zum Löschen aus der Tabelle", sap.m.MessageBox.Icon.ERROR," Info");
	        return;
	    }
	    this.showDeleteMessage(pid);
	    
	},
	showDeleteMessage : function (pid){
	    var that = this;
	    var textText = "Wollen Sie das Profil mit der ID: " + pid + " wirklich löschen?"
	    var oMessageDialog1 = new sap.m.Dialog("oMessageDialog1",{
				title: "Achtung",
				content: [
					new sap.m.Text("dialogText", {
						text: textText,
						wrapping: true
					})
				],
				beginButton: new sap.m.Button({
					text: "Abbrechen",
					type: sap.m.ButtonType.Back ,
					press: function () {
						oMessageDialog1.close();
						
					}
				}),
				endButton: new sap.m.Button({
					text: "Löschen",
					type: sap.m.ButtonType.Reject,
					press: function () {
					oMessageDialog1.close();
						
					that.performDelete();
						
					}
				}),
				type: sap.m.DialogType.Message
			});
	    //var oMessageDialog1 = sap.ui.getCore().getElementById("dialogText");
	    //oMessageDialog1.text = textText;
	    oMessageDialog1.open();
	    
	},
	performDelete : function (){
	    var pid = sap.ui.getCore().getModel("userModel").getProperty("/pid");
	    console.log(pid + " wird gelöscht...");
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
		    sap.ui.getCore().getModel("userModel").setProperty("/pid", -1);
		    //sap.ui.getCore().getModel("userModel").setProperty("/checkzuProfileAnzeigen", true);
		    //sap.ui.getCore().getElementById("userprofiles").destroy();
		    this.openMenu();
		    this.refresh();
		}
	},
	loadProfilesData : function() {
		var xModel = JSON.parse(sap.ui.getCore().getModel("userModel").getJSON());
        var uid = xModel.uid;
	
		var url = "./service/select_alle_profile.xsjs?uid="+uid;
		
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
		
		var profileData = new sap.ui.model.json.JSONModel(data);
		sap.ui.getCore().setModel(profileData, "profileData");
		this.getView().setModel(profileData);
	}
	/*loadAllBookingData : function() {
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
	}*/

});