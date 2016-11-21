sap.ui.jsview("cs.selectTest", {

    getControllerName : function() {
        return "ccs.selectTest";
    },
    
	createContent : function(controller) {	
        
        var inputLabel = new sap.m.Label({
            text: "Bitte geben Sie Die Profilnummer ein:"
        });
        
        var inputFeld = new sap.m.Input({
            id: "inputFeld"
        });
        
        /*var selectButton = new sap.m.Button({
         id : "selectButton",
         text : "Select ausführen",
         type: "Accept",
         press : [ controller.selectPress, controller ]
        });*/
        var profilLoeschenButton = new sap.m.Button({
         id : "profilLoeschenButton",
         text : "Profil löschen",
         type: "Reject",
         press : [ controller.profilLoeschen, controller ]
        });
        
        /*var listbookings = new sap.m.Table({
			id: "listbookings",
			columns : [ new sap.m.Column({
				header : new sap.m.Label({
					text : "Bnr."
				})
			}), new sap.m.Column({
				header : new sap.m.Label({
					text : "Start"
				})
			}), new sap.m.Column({
				header : new sap.m.Label({
					text : "Ende"
				})
			}), new sap.m.Column({
				header : new sap.m.Label({
					text : "Personen (max)"
				})
			}), new sap.m.Column({
				header : new sap.m.Label({
					text : "Reichweite"
				})
			}), new sap.m.Column({
				header : new sap.m.Label({
					text : "Kennzeichen"
				})
			}), new sap.m.Column({
				header : new sap.m.Label({
					text : "UID"
				})
			})
			]
		});*/
        
        return new sap.m.Page({
			title : "Profil löschen",
			content : [ inputLabel, inputFeld,  profilLoeschenButton ],
			showNavButton : true,
			navButtonPress : [controller.openMenu , controller]
		});
	}
});