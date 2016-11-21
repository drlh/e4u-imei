sap.ui.jsview("cs.profilanlegen", {

    getControllerName : function() {
        return "ccs.profilanlegen";
    },
    
	createContent : function(controller) {	
        /*var oItemSelectTemplate = new sap.ui.core.Item({
            key: "{>Reichweite}",
            text : "{>Reichweite}"
        }); */
        var profilNameLabel = new sap.m.Label({
           text: "Geben Sie Ihrem Profil einen Namen (z.B.: Projektmeeting XY München):" 
        });
        
        var profilName = new sap.m.Input("profilName",{
            
        });
        
        var gueltigAbLabel = new sap.m.Label({
            text: "Datum ab dem Ihr Profil gültig sein soll",
            width: "100%"
        });
        
        var profilGueltigAb = new sap.m.DatePicker("profilGueltigAb",{
            width: "80%"
        });
        
        var gueltigBisLabel = new sap.m.Label({
            text: "Datum bis zu dem Ihr Profil gültig sein soll",
            width: "100%"
        });
        
        var profilGueltigBis = new sap.m.DatePicker("profilGueltigBis",{
            width: "80%"
        });
        
        var profilWochentageLabel = new sap.m.Label ({
            text: "An welchen Wochentagen soll das Profil gültig sein?"
        });
        
        var profilWochentage = new sap.m.FlexBox("profilWochentage", {
			direction : sap.m.FlexDirection.Row,
			items : [ new sap.m.CheckBox( {
				text : "MO",
				id: "p_mo",
				//selected : "{profile>/mo}",
				textAlign : sap.ui.core.TextAlign.Center
			}), new sap.m.CheckBox("p_di", {
				//selected : "{profile>/di}",
				text : "DI",
				textAlign : sap.ui.core.TextAlign.Center
			}), new sap.m.CheckBox("p_mi", {
				//selected : "{profile>/mi}",
				text : "MI",
				textAlign : sap.ui.core.TextAlign.Center
			}), new sap.m.CheckBox("p_do", {
				//selected : "{profile>/don}",
				text : "DO",
				textAlign : sap.ui.core.TextAlign.Center
			}), new sap.m.CheckBox("p_fr", {
				//selected : "{profile>/fr}",
				text : "FR",
				textAlign : sap.ui.core.TextAlign.Center
			}) ]
		});
        
        var profilZeitLabel = new sap.m.Label ({
            text: "Von wann bis wann möchten Sie an den angegebenen Wochentagen ein Fahrzeug reservieren?"
        });
        
        var profilZeitVonBis = new sap.m.FlexBox("profilZeitVonBis", {
			direction : sap.m.FlexDirection.Row,
			alignItems: sap.m.FlexAlignItems.Center,
			items : [ new sap.m.Label ({
            textAlign : sap.ui.core.TextAlign.Center,
            text: "Von:   "
            }), new sap.m.TimePicker ({
            id: "profilZeitVon",
            displayFormat : "HH:mm",
            textAlign : sap.ui.core.TextAlign.Center
            }), new sap.m.Label ({
            textAlign : sap.ui.core.TextAlign.Center,
            text: "Bis:   "
            }), new sap.m.TimePicker ({
            id: "profilZeitBis",
            displayFormat : "HH:mm",
            textAlign : sap.ui.core.TextAlign.Center
            }) ]
		});
        
        /*var profilZeitVon = new sap.m.TimePicker ({
            title: "Von:",
            text: "Von:"
        });
        
        var profilZeitBis = new sap.m.TimePicker ({
            title: "Bis:"
        });*/
        
        /*var dateTimeLabel = new sap.m.Label({
            text: "Datum & Uhrzeit zu der Sie starten möchten",
            width: "100%"
            });*/
            
        /*var abfahrtsDatumUhrzeit = new sap.m.DateTimePicker("abfahrtsDatumUhrzeit",{
            valueFormat: "ddMMyyyy, HH:mm",
            width: "80%"
            });*/
        
        var distanzLabel = new sap.m.Label({
            text: "Welche Distanz werden Sie an den gewählten Tagen zurücklegen?",
            width: "100%"
            });
        
        var distanzProfil = new sap.m.Select("distanzProfil", {
            title: "Customer",
            width: "40%",
            visible: true,
        	enabled: true
          });
            
        var absatzLabel = new sap.m.Label({
            text: "",
            width: "70%"
            });
        
        /*var rueckkehrTimeLabel = new sap.m.Label({
            text: "Datum & Uhrzeit zu der das Fahrzeug zurückgeben",
            width: "100%"
            });
            
        var rueckkehrDatumUhrzeit = new sap.m.DateTimePicker("rueckkehrDatumUhrzeit",{
            valueFormat: "ddMMyyyy",
            width: "80%"
            });*/
            
        var sitzPlaetzeLabel = new sap.m.Label({
            text: "Wird ein Fahrzeug mit 3 bis 5 Sitzplätzen benötigt?",
            width: "100%"
            });
        
        var profilSitzplaetze = new sap.m.CheckBox("profilSitzplaetze", {
            text: "Ja, es werden mehr als 2 Sitzplätze benötigt.",
            width: "100%"
        });
        
        var wochenTageButton = new sap.m.Button({
         id : "wochenTage",
         text : "Wochentage check",
         type: "Accept",
         press : [ controller.wochentageBerechnen, controller ]
        });
        var profilAnlegenButton = new sap.m.Button({
         id : "profilAnlegen",
         text : "Profil anlegen",
         type: "Accept",
         press : [ controller.profilCheck, controller ]
        });
        
        return new sap.m.Page({
			title : "Profil für regelmäßige Fahrten anlegen",
			content : [ profilNameLabel, profilName, gueltigAbLabel, profilGueltigAb, gueltigBisLabel, profilGueltigBis, profilWochentageLabel, profilWochentage, profilZeitLabel, profilZeitVonBis, 
			distanzLabel, distanzProfil, absatzLabel, sitzPlaetzeLabel,profilSitzplaetze,absatzLabel, profilAnlegenButton, wochenTageButton],
			showNavButton : true,
			navButtonPress : [controller.openMenu , controller]
		});
	}
});