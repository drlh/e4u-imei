sap.ui.controller("ccs.buchen", {
   onInit : function() {
		oApplication.app = sap.ui.getCore().byId("App");
        
        var distanzModel = new sap.ui.model.json.JSONModel('view/cs/Distanz.json');
        sap.ui.getCore().setModel(distanzModel, "DistanzenListe");
        var oItemSelectTemplate = new sap.ui.core.Item({
            key: "{Reichweite}",
            text : "{Text}" 
        }); 
        var distanz2 = sap.ui.getCore().byId("distanz2");
        distanz2.setModel(sap.ui.getCore().getModel("DistanzenListe"));
        distanz2.bindAggregation("items", "/Werte", oItemSelectTemplate);
	},
    
    
    openMenu : function(){
        oApplication.loadViews();
        oApplication.app.to("menu");
    },
    checkCars : function (){
        var data = [];
        var reichweite = sap.ui.getCore().byId("distanz2").getSelectedKey();
        var personen = sap.ui.getCore().byId("checkSitzplaetze").getSelected();
        if (personen){
            personen = 4;
        } else {
            personen = 2;
        }
        var url = "./service/check_cars.xsjs?personen="+personen+"&reichweite="+reichweite;
        
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
		
		var carModel = new sap.ui.model.json.JSONModel(data);
		sap.ui.getCore().setModel(carModel, "carModel");
		var cars = sap.ui.getCore().getModel("carModel").getProperty("/");
        
        for (var i in cars){
                var obj = cars[i];
                var kennzeichen = obj.kennzeichen
                var buchungMoeglich = this.checkIfBookingTimeIsAvailable(kennzeichen);
                if (buchungMoeglich){
                    console.log("Buchung möglich");
                    break;
                } else {
                    kennzeichen = "NODATA";
                }
            }
        
        return kennzeichen;
    },
    checkIfBookingTimeIsAvailable : function(kennzeichen){
        
        var abfahrtsDatumUhrzeit = sap.ui.getCore().byId("abfahrtsDatumUhrzeit").getDateValue();
		var startZeit = this.formatDate(abfahrtsDatumUhrzeit);
        var rueckkehrDatumUhrzeit = sap.ui.getCore().byId("rueckkehrDatumUhrzeit").getDateValue();
        var endeZeit = this.formatDate(rueckkehrDatumUhrzeit);
        
        var url = "./service/check_time.xsjs?startZeit="+startZeit+"&endeZeit="+endeZeit+"&kennzeichen="+kennzeichen;
        
        
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
		
		
		
		var m = sap.ui.getCore().getModel("responseData").getProperty("/");
		for (var i in m) {
		    var obj = m[i];
		    var noData = obj.lsid;
		    console.log(noData);
		    if (noData === "NODATA"){
		    console.log("Buchung möglich!");
		    return true;
		    } else {
		        return false;
		    }
		}
    },
    getLastBRN : function(){
        var url = "./service/last_bnr.xsjs";
        
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
		
		
		
		var m = sap.ui.getCore().getModel("responseData").getProperty("/");
		for (var i in m) {
		    var obj = m[i];
		    var bnrNeu = obj.bnr + 1;
		    return bnrNeu;
		}
    },
    formatDate : function(v) {
        jQuery.sap.require("sap.ui.core.format.DateFormat");
        //var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MM-YYYY"});
        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "YYYY-MM-dd HH:mm:ss.0000000"});
        return oDateFormat.format(new Date(v));
    },
    buchenPress : function() {
        var abfahrtsDatumUhrzeit = sap.ui.getCore().byId("abfahrtsDatumUhrzeit").getDateValue();
		abfahrtsDatumUhrzeit = this.formatDate(abfahrtsDatumUhrzeit);
        var rueckkehrDatumUhrzeit = sap.ui.getCore().byId("rueckkehrDatumUhrzeit").getDateValue();
        rueckkehrDatumUhrzeit = this.formatDate(rueckkehrDatumUhrzeit);
        if (rueckkehrDatumUhrzeit <= abfahrtsDatumUhrzeit){
            sap.m.MessageBox.show("Ende-Zeit ist kleiner Start-Zeit, bitte korrigieren!", sap.m.MessageBox.Icon.ERROR," Info");
            return;
        }
        
        var kennzeichen = this.checkCars();
            
            
        if (kennzeichen === "NODATA"){
            sap.m.MessageBox.show("Zu dieser Zeit steht leider kein freies Fahrzeug mehr zur Verfügung!", sap.m.MessageBox.Icon.ERROR," Info");
            return;
        }
       // var kennzeichen = "MATE450";
       /* var buchungMoeglich = this.checkIfBookingTimeIsAvailable(kennzeichen);
        
        if (buchungMoeglich){
            console.log("Buchung möglich");
        } else {
            sap.m.MessageBox.show("Zu dieser Zeit steht leider kein freies Fahrzeug mehr zur Verfügung!", sap.m.MessageBox.Icon.ERROR," Info");
            return;
        }*/
        var bnrNeu = this.getLastBRN();
        console.log(bnrNeu);
		
        var distanz = sap.ui.getCore().byId("distanz2").getSelectedKey();
        var checkSitzplaetze = sap.ui.getCore().byId("checkSitzplaetze").getSelected();
	
		var url = "./service/insert_buchung.xsjs?abfahrtsDatumUhrzeit="+abfahrtsDatumUhrzeit+"&rueckkehrDatumUhrzeit="+rueckkehrDatumUhrzeit+"&distanz="+distanz+"&checkSitzplaetze="+checkSitzplaetze+"&bnrNeu="+bnrNeu+"&kennzeichen="+kennzeichen;
		var check = false;
		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			success : function(response) {
				
				sap.m.MessageBox.show("Buchung erfolgreich ", sap.m.MessageBox.Icon.SUCCESS," Info");
				check = true;
			},
			error : function(e) {
				console.log(e.message);
				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
			}
		});
		if(check) {
		    this.openMenu();
		}
	}
});