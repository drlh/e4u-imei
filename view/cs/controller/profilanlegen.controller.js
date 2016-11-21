sap.ui.controller("ccs.profilanlegen", {
	onInit: function() {
		oApplication.app = sap.ui.getCore().byId("App");

		var distanzModel = new sap.ui.model.json.JSONModel('view/cs/Distanz.json');
		sap.ui.getCore().setModel(distanzModel, "DistanzenListe");
		var oItemSelectTemplate = new sap.ui.core.Item({
			key: "{Reichweite}",
			text: "{Text}" //Wie kann ich hier noch Kilometer hinzufügen?
		});
		var distanzProfil = sap.ui.getCore().byId("distanzProfil");
		distanzProfil.setModel(sap.ui.getCore().getModel("DistanzenListe"));
		distanzProfil.bindAggregation("items", "/Werte", oItemSelectTemplate);

		// Datumsspielereien
		/*var today = new Date();
        var numberOfDaysToAdd = 7;
        today.setDate(today.getDate() + numberOfDaysToAdd); 
        console.log(today);*/

	},

	openMenu: function() {
		oApplication.loadViews();
		oApplication.app.to("menu");
	},

	profilAnlegenPress: function(pid) {
	    // Buchungsvorgang in der IMEI.PROFILES Tabelle
		var profilName = sap.ui.getCore().byId("profilName").getValue();
		var profilGueltigAb = sap.ui.getCore().byId("profilGueltigAb").getDateValue();
		profilGueltigAb = this.formatDate(profilGueltigAb);
		var profilGueltigBis = sap.ui.getCore().byId("profilGueltigBis").getDateValue();
		profilGueltigBis = this.formatDate(profilGueltigBis);
		var p_mo = this.dayin1or0(sap.ui.getCore().byId("p_mo").getSelected());
		var p_di = this.dayin1or0( sap.ui.getCore().byId("p_di").getSelected());
		var p_mi = this.dayin1or0(sap.ui.getCore().byId("p_mi").getSelected());
		var p_do = this.dayin1or0(sap.ui.getCore().byId("p_do").getSelected());
		var p_fr = this.dayin1or0(sap.ui.getCore().byId("p_fr").getSelected());
		var p_sa = 0;
		var p_so = 0;
		var profilZeitVon = this.formatTime( sap.ui.getCore().byId("profilZeitVon").getDateValue());
		var profilZeitBis = this.formatTime( sap.ui.getCore().byId("profilZeitBis").getDateValue());
		var distanz = sap.ui.getCore().byId("distanzProfil").getSelectedKey();
		var profilSitzplaetze = sap.ui.getCore().byId("profilSitzplaetze").getSelected();
		
		
		var url1 = "./service/insert_profile.xsjs?pid="+pid+"&profilName="+profilName+"&profilGueltigAb="+profilGueltigAb+"&profilGueltigBis="+profilGueltigBis+"&p_mo="+p_mo+"&p_di="+p_di+"&p_mi="+p_mi;
		var url2 = "&p_do="+p_do+"&p_fr="+p_fr+"&p_sa="+p_sa+"&p_so="+p_so+"&profilZeitVon="+profilZeitVon+"&profilZeitBis="+profilZeitBis+"&distanz="+distanz+"&profilSitzplaetze="+profilSitzplaetze;
		var url = url1 + url2;
		var check = false;
		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			success : function(response) {
				
				
				check = true;
			},
			error : function(e) {
				console.log(e.message);
				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
			}
		});
		if(check) {
		    var text = "Profil mit der Nummer: " + pid + " und der Bezeichnung: " + profilName + " erfolgreich angelegt.";
		    sap.m.MessageBox.show(text, sap.m.MessageBox.Icon.SUCCESS," Info");
		    this.openMenu();
		}
	},
	dayin1or0: function(day){
	    if (day === true){
	        day = 1;
	    } else if (day === false){
	        day = 0;
	    }
	    return day;
	},
	inDays: function(startDate, endDate) {
       
       var nDays = (   endDate - startDate ) / 86400000;
        return nDays + 1;
    },
    checkCars : function (datum){
        var data = [];
        var reichweite = sap.ui.getCore().byId("distanzProfil").getSelectedKey();
        var personen = sap.ui.getCore().byId("profilSitzplaetze").getSelected();
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
                var buchungMoeglich = this.checkIfBookingTimeIsAvailable(kennzeichen, datum);
                if (buchungMoeglich){
                    console.log("Buchung möglich");
                    break;
                } else {
                    kennzeichen = "NODATA";
                }
            }
        
        return kennzeichen;
    },
    checkIfBookingTimeIsAvailable : function(kennzeichen, datum){
        // Hier weitermachen
        var abfahrtsUhrzeit = sap.ui.getCore().byId("profilZeitVon").getDateValue();
        var startKomplett = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate(), abfahrtsUhrzeit.getHours(), abfahrtsUhrzeit.getMinutes());
		var startZeit = this.formatDate(startKomplett);
		
        var rueckkehrUhrzeit = sap.ui.getCore().byId("profilZeitBis").getDateValue();
        var rueckkehrKomplett = new Date (datum.getFullYear(), datum.getMonth(), datum.getDate(), rueckkehrUhrzeit.getHours(), rueckkehrUhrzeit.getMinutes());
        var endeZeit = this.formatDate(rueckkehrKomplett);
        
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
	wochentageBerechnen: function() {
	    
		var startWeekdateField = sap.ui.getCore().byId("profilGueltigAb").getDateValue();
		var startWeekdate = new Date(startWeekdateField.getFullYear(), startWeekdateField.getMonth(), startWeekdateField.getDate());
		
		var endDateField = sap.ui.getCore().byId("profilGueltigBis").getDateValue();
		var endDate = new Date(endDateField.getFullYear(),endDateField.getMonth(), endDateField.getDate());
		
		if (endDate <= startWeekdate){
            sap.m.MessageBox.show("Ende-Zeit ist kleiner oder gleich Start-Zeit, bitte korrigieren!", sap.m.MessageBox.Icon.ERROR," Info");
            return;
        }
		
		var p_mo = sap.ui.getCore().byId("p_mo").getSelected();
		var p_di = sap.ui.getCore().byId("p_di").getSelected();
		var p_mi = sap.ui.getCore().byId("p_mi").getSelected();
		var p_do = sap.ui.getCore().byId("p_do").getSelected();
		var p_fr = sap.ui.getCore().byId("p_fr").getSelected();

		var wochenTageDatumDaten = new Array();

		var tage = this.inDays(startWeekdate, endDate);
	
		for (var i =  0; i < tage; i++) {

            var currentDaysDate = new Date(startWeekdate.getFullYear(), startWeekdate.getMonth(), startWeekdate.getDate());
			var dayIndex = currentDaysDate.getDay();
			if (p_mo) {
				if (dayIndex === 1) {
					wochenTageDatumDaten.push(currentDaysDate);
					//console.log(currentDaysDate.toString());
				}
			}
			if (p_di) {
				if (dayIndex === 2) {
					wochenTageDatumDaten.push(currentDaysDate);
					//console.log(currentDaysDate.toString());
				}
			}
			if (p_mi) {
				if (dayIndex === 3) {
					wochenTageDatumDaten.push(currentDaysDate);
					//console.log(currentDaysDate.toString());
				}
			}
			if (p_do) {
				if (dayIndex === 4) {
					wochenTageDatumDaten.push(currentDaysDate);
					//console.log(currentDaysDate.toString());
				}
			}
			if (p_fr) {
				if (dayIndex === 5) {
					wochenTageDatumDaten.push(currentDaysDate);
					//console.log(currentDaysDate.toString());
				}
			}
			// Datum hochzählen
			startWeekdate = new Date(currentDaysDate.getFullYear(), currentDaysDate.getMonth(), currentDaysDate.getDate() + 1);
			currentDaysDate = null;
		}
		console.log(wochenTageDatumDaten);
        tage = null;
        return wochenTageDatumDaten;
	},
	profilCheck : function(){
	    //Überprüfung ob an allen Profiltagen ein Fahrzeug verfügbar ist
	    var tageArray = this.wochentageBerechnen();
	    var kennzeichenArray = new Array();
	    for (var i = 0; i < tageArray.length; i++){
	        kennzeichenArray.push(this.checkCars(tageArray[i]));
	    }
	    for (var k = 0; k < kennzeichenArray.length; k++){
	        if (kennzeichenArray[k] === "NODATA"){
	            var nachricht = "Am " + this.formatMessageDate(tageArray[k]) + " ist zu der von Ihnen gewählten Zeit leider kein Fahrzeug mehr verfügbar! Die Profilerstellung wurde abgebrochen.";
	            sap.m.MessageBox.show(nachricht , sap.m.MessageBox.Icon.ERROR," Info");
                return;
	        }
	    }
	    //Ende Überprüfung
	    //Start Buchungsprozess
	    var distanz = sap.ui.getCore().byId("distanzProfil").getSelectedKey();
        var checkSitzplaetze = sap.ui.getCore().byId("profilSitzplaetze").getSelected();
        //Abfrage der neuen Profil ID
        var pidNeu = this.getLastPID();
        //Buchungsschleife
	    for (var j = 0; j < kennzeichenArray.length; j++){
	        var bnrNeu = this.getLastBRN();
	        var abfahrtsUhrzeit = sap.ui.getCore().byId("profilZeitVon").getDateValue();
            var startKomplett = new Date(tageArray[j].getFullYear(), tageArray[j].getMonth(), tageArray[j].getDate(), abfahrtsUhrzeit.getHours(), abfahrtsUhrzeit.getMinutes());
    		var abfahrtsDatumUhrzeit = this.formatDate(startKomplett);
    		
            var rueckkehrUhrzeit = sap.ui.getCore().byId("profilZeitBis").getDateValue();
            var rueckkehrKomplett = new Date (tageArray[j].getFullYear(), tageArray[j].getMonth(), tageArray[j].getDate(), rueckkehrUhrzeit.getHours(), rueckkehrUhrzeit.getMinutes());
            var rueckkehrDatumUhrzeit = this.formatDate(rueckkehrKomplett);
            var kennzeichen = kennzeichenArray[j];
            var url = "./service/insert_buchung_with_PID.xsjs?abfahrtsDatumUhrzeit="+abfahrtsDatumUhrzeit+"&rueckkehrDatumUhrzeit="+rueckkehrDatumUhrzeit+"&distanz="+distanz+"&checkSitzplaetze="+checkSitzplaetze+"&bnrNeu="+bnrNeu+"&kennzeichen="+kennzeichen+"&pid="+pidNeu;
    		var check = false;
    		$.ajax({
    			async : false,
    			url : url,
    			dataType : 'json',
    			success : function(response) {
    				
    				//sap.m.MessageBox.show("Buchung erfolgreich ", sap.m.MessageBox.Icon.SUCCESS," Info");
    				check = true;
    			},
    			error : function(e) {
    				console.log(e.message);
    				sap.m.MessageBox.show("Irgendwas ist schiefgelaufen", sap.m.MessageBox.Icon.ERROR," Info");
    			}
    		});
	    }
	    // Profil in der Profiltabelle anlegen
	    this.profilAnlegenPress(pidNeu);
	},
	formatDate : function(v) {
        jQuery.sap.require("sap.ui.core.format.DateFormat");
        //var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MM-YYYY"});
        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "YYYY-MM-dd HH:mm:ss.0000000"});
        return oDateFormat.format(new Date(v));
    },
	formatMessageDate : function(v) {
        jQuery.sap.require("sap.ui.core.format.DateFormat");
        //var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MM-YYYY"});
        var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd.MM.YYYY"});
        return dateFormat.format(new Date(v));
    },
    formatTime : function(v) {
        jQuery.sap.require("sap.ui.core.format.DateFormat");
        //var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MM-YYYY"});
        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "HH:mm:ss"});
        return oDateFormat.format(new Date(v));
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
    getLastPID : function(){
        var url = "./service/last_pid.xsjs";
        
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
		    var pnrNeu = obj.pid + 1;
		    return pnrNeu;
		}
    }
});