sap.ui.jsview("cs.buchungbearbeiten", {

    getControllerName : function() {
        return "ccs.buchungbearbeiten";
    },
    
	createContent : function(controller) {	
        /*var oItemSelectTemplate = new sap.ui.core.Item({
            key: "{>Reichweite}",
            text : "{>Reichweite}"
        }); */
        var bNrText = new sap.m.Label({
            id: "bNrText",
            text: "Ihre Buchungsnummer:  "
        });
        
        var bNr = new sap.m.Label({
            id: "bNr"
            //text: "{navModel>/modelBnr}"
        });
        var loeschenButton = new sap.m.Button({
         id : "loeschenButton",
         text : "Buchung löschen",
         type: "Reject",
         press : [ controller.buchungLoeschen, controller ]
        });
        
        var dateTimeLabel = new sap.m.Label({
            text: "Start: ",
            width: "100%"
            });
        
        
        var abfahrtsDatumUhrzeitb = new sap.m.DateTimePicker("abfahrtsDatumUhrzeitb",{
            valueFormat: "ddMMyyyy, HH:mm",
            
            width: "80%"
            });
            
        var endedateTimeLabel = new sap.m.Label({
            text: "Ende: ",
            width: "100%"
            });
        
        
        var endeDatumUhrzeitb = new sap.m.DateTimePicker("endeDatumUhrzeitb",{
            valueFormat: "ddMMyyyy, HH:mm",
            
            width: "80%"
            });
        
        var distanzLabel = new sap.m.Label({
            text: "Welche Distanz werden Sie zurücklegen?",
            width: "100%"
            });
        
        var distanz2 = new sap.m.Select("distanzbearbeiten", {
            title: "Customer",
            width: "40%",
            visible: true,
        	enabled: true
          });
        var sitzPlaetzeLabel = new sap.m.Label({
            text: "Wird ein Fahrzeug mit 3 bis 5 Sitzplätzen benötigt?",
            width: "100%"
            });
        
        var checkSitzplaetzeBearbeiten = new sap.m.CheckBox("checkSitzplaetzeBearbeiten", {
            text: "Ja, es werden mehr als 2 Sitzplätze benötigt.",
            width: "100%"
        });
        
        var bearbeitenButton = new sap.m.Button({
         id : "bearbeitenButton",
         text : "Buchung ändern",
         type: "Emphasized",
         press : [ controller.buchungBearbeiten, controller ]
        });
        var autoBild = new sap.m.Image("autoBild",{
         
        });
        /*
        var absatzLabel = new sap.m.Label({
            text: "",
            width: "70%"
            });
        
        var rueckkehrTimeLabel = new sap.m.Label({
            text: "Datum & Uhrzeit zu der das Fahrzeug zurückgeben",
            width: "100%"
            });
            
        var rueckkehrDatumUhrzeit = new sap.m.DateTimePicker("rueckkehrDatumUhrzeit",{
            valueFormat: "ddMMyyyy",
            width: "80%"
            });
            
        var sitzPlaetzeLabel = new sap.m.Label({
            text: "Wird ein Fahrzeug mit 3 bis 5 Sitzplätzen benötigt?",
            width: "100%"
            });
        
        var checkSitzplaetze = new sap.m.CheckBox("checkSitzplaetze", {
            text: "Ja, es werden mehr als 2 Sitzplätze benötigt.",
            width: "100%"
        });
        
        var buchenButton = new sap.m.Button({
         id : "buchenButton",
         text : "Buchen",
         type: "Accept",
         press : [ controller.buchenPress, controller ]
        });*/
        
        return new sap.m.Page({
			title : "Buchung bearbeiten",
			/*content : [bNrText, bNr, dateTimeLabel, abfahrtsDatumUhrzeit, distanzLabel,distanz2, absatzLabel, rueckkehrTimeLabel, rueckkehrDatumUhrzeit,  
			sitzPlaetzeLabel,checkSitzplaetze,absatzLabel, buchenButton ],*/
			content : [bNrText, bNr, autoBild, dateTimeLabel, abfahrtsDatumUhrzeitb, endedateTimeLabel, endeDatumUhrzeitb, distanzLabel, 
			distanz2, sitzPlaetzeLabel, checkSitzplaetzeBearbeiten, bearbeitenButton, loeschenButton ],
			showNavButton : true,
			navButtonPress : [controller.goBack , controller]
		});
	}
});