//To use a javascript view its name must end with .view.js
sap.ui.jsview("cs.menu", {

    getControllerName : function() {
        return "ccs.menu";
    },
    
	createContent : function(controller) {	
        var oButton = new sap.m.Button({
         id : "MyButton",
         text : "Fahrzeug buchen",
         width : "250px",
         icon: "sap-icon://instance",
         press : [ controller.zurBuchung, controller ]
        });
        var userBButton = new sap.m.Button({
         id : "userBButton",
         text : "Ihre Buchungen einsehen",
         width : "250px",
         icon: "sap-icon://list",
         press : [ controller.zuUserBuchungen, controller ]
        });
        var profilButton = new sap.m.Button({
         id : "profilButton",
         text : "Profil anlegen",
         width : "250px",
         icon: "sap-icon://gantt-bars",
         press : [ controller.zuProfilAnlegen, controller ]
        });
        var selectTestButton = new sap.m.Button({
         id : "selectTestButton",
         text : "Profil löschen",
         width : "250px",
         icon: "sap-icon://delete",
         press : [ controller.zuselectTest, controller ]
        });
        var profileAnzeigenButton = new sap.m.Button({
         id : "profileAnzeigenButton",
         text : "Profile anzeigen",
         width : "250px",
         icon: "sap-icon://activity-2",
         press : [ controller.zuProfileAnzeigen, controller ]
        });
         var mapsButton = new sap.m.Button({
         id : "mapsButton",
         text : "Map anzeigen",
         width : "250px",
         icon: "sap-icon://map-2",
         press : [ controller.mapAnzeigen, controller ]
        });
        var slideTile = new sap.m.SlideTile("menuSlideTile1", {
            tiles: [
                new sap.m.GenericTile({
                    backgroundImage: "view/img/ecar-flotte.jpg",
                    frameType: "TwoByOne",
                    header: "Fahrzeug buchen",
                    subheader: "Einmalige Reservierung",
                    press: [ controller.zurBuchung, controller ]
                    /*tileContent: [
                        content: [
                            NewsContent: [
                                contentText: "TestText Bla Bla"
                                ]
                            ]
                        ]*/

                }),
                new sap.m.GenericTile({
                    backgroundImage: "view/img/strasse.png",
                    frameType: "TwoByOne",
                    header: "Profil anlegen",
                    subheader: "Regelmäßige Fahrt",
                    press: [ controller.zuProfilAnlegen, controller ]
                    

                })
                ]
        });
        
        var myVbox = new sap.m.VBox("menuBox", {
            alignItems: "Center",
            
            //width : "100%",
            items: [slideTile, oButton, userBButton, profilButton, profileAnzeigenButton, selectTestButton, mapsButton]
        });
        /*var myFlexBox = new sap.m.FlexBox("myFlexBox", {
            alignItems: "Center",
            height: "100px",
            justifyContent: "Center",
            items: [oButton, userBButton, profilButton, selectTestButton]
        });*/
        /*var myVerticalLayout = new sap.ui.layout.VerticalLayout("myVerticalLayout", {
            width: "100px",
            content: [myFlexBox]
        })*/
        
        
        
        return new sap.m.Page({
			title : "IMEI Carsharing Hauptmenü",
			content : [ myVbox ]
		});
	}
});