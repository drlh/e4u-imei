sap.ui.jsview("cs.userbuchungen", {

	getControllerName: function() {
		return "ccs.userbuchungen";
	},

	createContent: function(controller) {
		var oButton = new sap.m.Button({
			id: "wxd",
			text: "Fahrzeug buchen",
			width: "100%",
			icon: "sap-icon://instance",
			press: [controller.zurBuchung, controller]
		});
	/*	var refreshButton = new sap.m.Button({
			id: "refreshButton",
			text: "Aktualisieren",
			width: "50%",
			icon: "sap-icon://refresh",
			press: [controller.refresh, controller]
		});
		var showAllButton = new sap.m.Button({
			id: "showAllButton",
			text: "Historie",
			width: "50%",
			icon: "sap-icon://history",
			press: [controller.loadAllBookingData, controller]
		});*/
        
        /*var listallbookings = new sap.m.Table({
			id: "listallbookings",
			itemPress : [ controller.handleLinkPress, controller],
			columns : [ new sap.m.Column({
				id: "BuchungsNr",
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
        
        
        
        var column1 = new sap.m.Column("Buchungsnr",{
					header: new sap.m.Label({
						text: "BNr.:"
					}),
					hAlign: "Begin",
					width: "60px",
					vAlign: "Middle"
					
				});
				
		var column9 = new sap.m.Column("ProfilID",{
					header: new sap.m.Label({
						text: "PID.:"
					}),
					hAlign: "Begin",
					width: "60px",
					vAlign: "Middle"
					
				});
				
		var column2 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Start"
					}),
					id: "Start",
					minScreenWidth : "small",
					demandPopin : true
				});
		
		var column3 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Ende"
					}),
					minScreenWidth : "small",
					demandPopin : true
				});
		
		var column4 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Personen (max)"
					}),
					minScreenWidth : "small",
					demandPopin : true,
					vAlign: "Middle"
					
				});
		var column5 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Distanz"
					}),
					width: "60px",
					vAlign: "Middle"
				});
		var column6 = new sap.m.Column({
			header: new sap.m.Label({
				text: "Kennzeichen"
			}),
			width: "100px",
			vAlign: "Middle"
		});
		/*var column7 = new sap.m.Column({
			header: new sap.m.Label({
				text: "UID"
			}),
			width: "60px"
		});*/
		var column8 = new sap.m.Column({
			header: new sap.m.Label({
				text: "Typ"
			}),
			width: "100px",
			minScreenWidth : "small",
			demandPopin : true,
			vAlign: "Middle"
		});
		var table = new sap.m.Table({
			id: "buchungsTabelle",
			
			title: "Ihre Buchungen:",
			
			columns: [
			    column1,
			    column9,
                column2,
                column3,
                column4,
                column5,
                column8,
                column6
                //column7
                                 ]
		});
		var BuchungenToolbar = new sap.m.Toolbar("BuchungenToolbar",{
		     title: new sap.m.Label({
		        text: "Profile: "
		    }),
		    content: [
		        new sap.m.Button({
		            text: "Aktualisieren",
		            icon: "sap-icon://refresh",
		            press: [controller.refresh, controller]
		            
		        }),
		        new sap.m.ToolbarSpacer({
		            width: "5%"
		        }),
		        new sap.m.Button({
		            text: "Historie einblenden",
		            icon: "sap-icon://history",
		            press: [controller.loadAllBookingData, controller]
		        })
		        ]
		});
		table.setHeaderToolbar(BuchungenToolbar);
		table.bindAggregation("items", {
            path: "/",
            template: new sap.m.ColumnListItem({
                type : "Navigation",
                press: [controller.handleLinkPress],
                id: "buchungszeile",
                cells: [
                        new sap.m.Label({ id:"bNrId", text: "{bnr}" }),
                        
                        new sap.m.Label({ id: "PID", text: "{pid}" }),
                        
                        new sap.m.DateTimeInput({
                          editable: false,
                          value : "{start}",
                          valueFormat : "yyyy-MM-dd HH:mm:ss.0000000",
                          displayFormat : "dd.MM.yyyy HH:mm"
                          }),
                        new sap.m.DateTimeInput({
                          editable: false,
                          
                          value : "{ende}",
                          valueFormat : "yyyy-MM-dd HH:mm:ss.0000000",
                          displayFormat : "dd.MM.yyyy HH:mm"
                          }),
                        
                        new sap.m.Label({ text: "{personen}" }),
                        new sap.m.Label({ text: "{reichweite}" }),
                        new sap.m.Label({ text: "{bezeichnung}" }),
                        new sap.m.Label({ text: "{kennzeichen}" })
                       // new sap.m.Label({ text: "{uid}" })
                        
                        
                ]
            })
        });

//Ende Enwicklungen vor Datenbankanbindung
		return new sap.m.Page({
			title: "Ihre Buchungen",
			id: "cs.userbuchungen",
			content: 
			[ //listallbookings, 
			//refreshButton,
			//showAllButton,
			table,
			oButton],
			showNavButton: true,
			navButtonPress: [controller.openMenu, controller]

		});
	}
});