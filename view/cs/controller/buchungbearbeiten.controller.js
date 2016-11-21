sap.ui.controller("ccs.buchungbearbeiten", {
   onInit : function(bnr) {
		oApplication.app = sap.ui.getCore().byId("App");
        var bild = sap.ui.getCore().getElementById("autoBild");
        var car = sap.ui.getCore().getModel("userModel").getProperty("/car");
        switch (car){
            case "BMW i3": 
                bild.setSrc("view/img/bmwi3.png");
                break;
            case "Nissan Leaf":
                bild.setSrc("view/img/nissanleaf.png");
                break;
            case "Tesla Model S":
                bild.setSrc("view/img/tesla2.png");
                break;
            case "Smart":
                bild.setSrc("view/img/Smartelectric.png");
        }
        bild.setWidth("40%");
        
        this.loadData();
	},
    
    
    goBack : function(){
         oApplication.loadViews();
        oApplication.app.to("userbuchungen");
        sap.ui.getCore().getElementById("buchungbearbeiten").destroy();
    },
    openMenu : function(){
         oApplication.loadViews();
        oApplication.app.to("menu");
    },
    
    loadData: function(){
        var bNr = sap.ui.getCore().getModel("userModel").getProperty("/nav");
        console.log(bNr + "wurde gelesen");
        var bNrText = sap.ui.getCore().getElementById("bNr");
        bNrText.setText(bNr);
        
        var url = "./service/select_buchung.xsjs?bnr="+bNr;
		
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
		
		var detailModel = new sap.ui.model.json.JSONModel(data);
		sap.ui.getCore().setModel(detailModel, "detailModel");
		this.getView().setModel(detailModel);
		
		var start = sap.ui.getCore().getModel("detailModel").getProperty("/");
		var m = start[0];
		
		var abfahrtsDatumUhrzeit = sap.ui.getCore().getElementById("abfahrtsDatumUhrzeitb");
		var startdate = new Date (m.start);
		abfahrtsDatumUhrzeit.setDateValue(startdate);
		
		var endeDatumUhrzeitb = sap.ui.getCore().getElementById("endeDatumUhrzeitb");
		var endedate = new Date (m.ende);
		endeDatumUhrzeitb.setDateValue(endedate);
		
		//Select Model
		var distanzModel = new sap.ui.model.json.JSONModel('view/cs/Distanz.json');
        sap.ui.getCore().setModel(distanzModel, "DistanzenListe");
        var oItemSelectTemplate = new sap.ui.core.Item({
            key: "{Reichweite}",
            text : "{Text}" 
        }); 
        var distanz2 = sap.ui.getCore().byId("distanzbearbeiten");
        distanz2.setModel(sap.ui.getCore().getModel("DistanzenListe"));
        distanz2.bindAggregation("items", "/Werte", oItemSelectTemplate);
	    distanz2.setSelectedKey(m.reichweite);
	    
	    var checkSitzplaetzeBearbeitenAktuell;
	    var anzahlSitzplaetzeTabelle = m.personen;
	    if (anzahlSitzplaetzeTabelle === 2){
	        checkSitzplaetzeBearbeitenAktuell = false;
	    } else if (anzahlSitzplaetzeTabelle === 4){
	        checkSitzplaetzeBearbeitenAktuell = true;
	    }
	    var checkSitzplaetzeBearbeiten = sap.ui.getCore().byId("checkSitzplaetzeBearbeiten");
	    checkSitzplaetzeBearbeiten.setProperty("selected", checkSitzplaetzeBearbeitenAktuell);
	    
	    
	
    },
    buchungLoeschen: function(){
        var bnr = sap.ui.getCore().getModel("userModel").getProperty("/nav");
        var url = "./service/buchung_loeschen.xsjs?bnr="+bnr;
		var check = false;
		var data = [];
		
		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			success : function(response) {
				data = response.data;
				//sap.m.MessageBox.show("Buchung gelöscht!", sap.m.MessageBox.Icon.SUCCESS," Erfolg");
				sap.m.MessageBox.show("Buchung gelöscht!", {
                    icon: sap.m.MessageBox.Icon.SUCCESS,                  
                    title: "Erfolg",                                       
                    actions: sap.m.MessageBox.Action.OK,                
                    onClose: null                                        
                    
                });
				check = true;
			},
			error : function(e) {
				console.log(e.message);
				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
			}
		});
		if (check){
		    this.openMenu();
		    sap.ui.getCore().getElementById("buchungbearbeiten").destroy();
		    
		}
    },
    buchungBearbeiten: function (){
        var abfahrtsDatumUhrzeit = sap.ui.getCore().byId("abfahrtsDatumUhrzeitb").getDateValue();
		abfahrtsDatumUhrzeit = this.formatDate(abfahrtsDatumUhrzeit);
        var rueckkehrDatumUhrzeit = sap.ui.getCore().byId("endeDatumUhrzeitb").getDateValue();
        rueckkehrDatumUhrzeit = this.formatDate(rueckkehrDatumUhrzeit);
        
        if (rueckkehrDatumUhrzeit <= abfahrtsDatumUhrzeit){
            sap.m.MessageBox.show("Ende-Zeit ist kleiner Start-Zeit, bitte korrigieren!", sap.m.MessageBox.Icon.ERROR," Info");
            return;
        }
        var kennzeichen = this.checkCars();
        
        if (kennzeichen === "NODATA"){
            sap.m.MessageBox.show("Bearbeiten mit eingegebenen Daten nicht möglich!", sap.m.MessageBox.Icon.ERROR," Info");
            return;
        }
        var bNr = sap.ui.getCore().getModel("userModel").getProperty("/nav");
        var distanz = sap.ui.getCore().byId("distanzbearbeiten").getSelectedKey();
        var personen = sap.ui.getCore().byId("checkSitzplaetzeBearbeiten").getSelected();
        if (personen){
            personen = 4;
        } else {
            personen = 2;
        }
        
        var url = "./service/update_buchung.xsjs?abfahrtsDatumUhrzeit="+abfahrtsDatumUhrzeit+"&rueckkehrDatumUhrzeit="+rueckkehrDatumUhrzeit+"&distanz="+distanz+"&personen="+personen+"&bNr="+bNr+"&kennzeichen="+kennzeichen;
		var check = false;
		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			success : function(response) {
				
				sap.m.MessageBox.show("Buchung erfolgreich geändert ", sap.m.MessageBox.Icon.SUCCESS," Info");
				check = true;
			},
			error : function(e) {
				console.log(e.message);
				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
			}
		});
		if(check) {
		    this.openMenu();
		    sap.ui.getCore().getElementById("buchungbearbeiten").destroy();
		}
    },
    formatDate : function(v) {
        jQuery.sap.require("sap.ui.core.format.DateFormat");
        //var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MM-YYYY"});
        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "YYYY-MM-dd HH:mm:ss.0000000"});
        return oDateFormat.format(new Date(v));
    },
    checkCars : function (){
        var data = [];
        var reichweite = sap.ui.getCore().byId("distanzbearbeiten").getSelectedKey();
        var personen = sap.ui.getCore().byId("checkSitzplaetzeBearbeiten").getSelected();
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
        var bnr = sap.ui.getCore().getModel("userModel").getProperty("/nav");
        var abfahrtsDatumUhrzeit = sap.ui.getCore().byId("abfahrtsDatumUhrzeitb").getDateValue();
		var startZeit = this.formatDate(abfahrtsDatumUhrzeit);
        var rueckkehrDatumUhrzeit = sap.ui.getCore().byId("endeDatumUhrzeitb").getDateValue();
        var endeZeit = this.formatDate(rueckkehrDatumUhrzeit);
        
        var url = "./service/check_time_update.xsjs?startZeit="+startZeit+"&endeZeit="+endeZeit+"&kennzeichen="+kennzeichen+"&bnr="+bnr;
        
        
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
    }
});