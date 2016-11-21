sap.ui.jsview("cs.buchen", {

    getControllerName : function() {
        return "ccs.buchen";
    },
    
	createContent : function(controller) {	
        /*var oItemSelectTemplate = new sap.ui.core.Item({
            key: "{>Reichweite}",
            text : "{>Reichweite}"
        }); */
        
        var dateTimeLabel = new sap.m.Label({
            text: "Datum & Uhrzeit zu der Sie starten möchten",
            
            width: "350px"
            });
            
        var abfahrtsDatumUhrzeit = new sap.m.DateTimePicker("abfahrtsDatumUhrzeit",{
            displayFormat : "dd.MM.yyyy HH:mm",
            placeholder: "01.01.2000 12:00",
            width: "350px"
            });
        
        var distanzLabel = new sap.m.Label({
            text: "Welche Distanz werden Sie zurücklegen?",
            width: "350px"
            });
        
        var distanz2 = new sap.m.Select("distanz2", {
            title: "Customer",
            width: "350px",
            visible: true,
        	enabled: true
          });
            
        var absatzLabel = new sap.m.Label({
            text: "",
            width: "70px"
            });
        
        var rueckkehrTimeLabel = new sap.m.Label({
            text: "Datum & Uhrzeit zu der das Fahrzeug zurückgeben",
            width: "350px"
            });
            
        var rueckkehrDatumUhrzeit = new sap.m.DateTimePicker("rueckkehrDatumUhrzeit",{
            placeholder: "01.01.2000 16:00",
            displayFormat : "dd.MM.yyyy HH:mm",
            width: "350px"
            });
            
        var sitzPlaetzeLabel = new sap.m.Label({
            text: "Wird ein Fahrzeug mit 3 bis 4 Sitzplätzen benötigt?",
            width: "350px"
            });
        
        var checkSitzplaetze = new sap.m.CheckBox("checkSitzplaetze", {
            text: "Ja, es werden mehr als 2 Sitzplätze benötigt.",
            width: "330px"
        });
        
        var buchenButton = new sap.m.Button({
         id : "buchenButton",
         text : "Buchen",
         width: "150px",
         type: "Accept",
         icon: "sap-icon://accept",
         press : [ controller.buchenPress, controller ]
        });
        
        var buchenAbbrechenButton = new sap.m.Button({
         id : "buchenAbbrechenButton",
         text : "Abbrechen",
         width: "150px",
         type: "Default",
         icon: "sap-icon://sys-cancel",
         press : [ controller.openMenu, controller ]
        });
        
        var buchenVbox = new sap.m.VBox("buchenVbox", {
            alignItems: "Center",
            
            //width : "80%",
            items: [dateTimeLabel, abfahrtsDatumUhrzeit, distanzLabel,distanz2, absatzLabel, rueckkehrTimeLabel, rueckkehrDatumUhrzeit,  
			sitzPlaetzeLabel,checkSitzplaetze,absatzLabel, buchenButton, buchenAbbrechenButton]
        });
        
        
        return new sap.m.Page({
			title : "Fahrzeug buchen",
			content : [ buchenVbox ],
			showNavButton : true,
			navButtonPress : [controller.openMenu , controller]
		});
	}
});