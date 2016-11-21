sap.ui.jsview("cs.userprofiles", {

	getControllerName: function() {
		return "ccs.userprofiles";
	},

	createContent: function(controller) {
		var oButton = new sap.m.Button({
			id: "userprofileswxd",
			text: "Fahrzeug buchen",
			width: "100%",
			icon: "sap-icon://instance",
			press: [controller.zurBuchung, controller]
		});
		
        var column1 = new sap.m.Column("userprofilesProfilName",{
					header: new sap.m.Label({
						text: "Name:"
					}),
					//hAlign: "Begin",
					width: "160px",
					//minScreenWidth: "Desktop",
					//demandPopin : true,
					vAlign: "Middle"
					
				});
				
		var column2 = new sap.m.Column("userprofilesProfilID",{
					header: new sap.m.Label({
						text: "PID.:"
					}),
					//hAlign: "Begin",
					width: "60px",
					vAlign: "Middle"
					
				});
				
		var column3 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Gültig ab"
					}),
					id: "userprofilesStart",
					width: "100px",
					minScreenWidth : "small",
					demandPopin : true,
					hAlign: "Center"
				});
		
		var column4 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Gültig bis"
					}),
					minScreenWidth : "small",
					width: "100px",
					demandPopin : true,
					hAlign: "Center"
				});
				
		var column5 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Zeit von"
					}),
					id: "userprofilesStartZeit",
					width: "100px",
					minScreenWidth : "small",
					demandPopin : true,
					hAlign: "Center"
				});
		
		var column6 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Zeit bis"
					}),
					minScreenWidth : "small",
					width: "100px",
					demandPopin : true,
					hAlign: "Center"
				});
				
		var column7 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Mo"
					}),
					minScreenWidth : "small",
					demandPopin : true,
					hAlign: "Center"
				});
				
		var column8 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Di"
					}),
					minScreenWidth : "small",
					demandPopin : true,
					hAlign: "Center"
				});
				
		var column9 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Mi"
					}),
					minScreenWidth : "small",
					demandPopin : true,
					hAlign: "Center"
				});
				
		var column10 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Do"
					}),
					minScreenWidth : "small",
					demandPopin : true,
					hAlign: "Center"
				});
				
		var column11 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Fr"
					}),
					minScreenWidth : "small",
					demandPopin : true,
					hAlign: "Center"
				});
		
		var column12 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Personen"
					}),
					minScreenWidth : "small",
					demandPopin : true,
					vAlign: "Middle"
					
				});
		var column13 = new sap.m.Column({
					header: new sap.m.Label({
						text: "Distanz"
					}),
					width: "60px",
					minScreenWidth : "small",
					demandPopin : true,
					vAlign: "Middle"
				});
		

		var table = new sap.m.Table({
			id: "userprofilesbuchungsTabelle",
			
			title: "Ihre Buchungen:",
			
			columns: [
			    column1,
			    column2,
                column3,
                column4,
                column5,
                
                column6,
                column7,
                column8,
                column9,
                column10,
                column11,
                column12,
                column13
                                 ]
		});
		var ProfileToolbar = new sap.m.Toolbar("ProfileToolbar",{
		     title: new sap.m.Label({
		        text: "Profile: "
		    }),
		    content: [
		        new sap.m.Button({
		            icon: "sap-icon://refresh",
		            press: [controller.refresh, controller]
		            
		        }),
		        new sap.m.ToolbarSpacer({
		            width: "10%"
		        }),
		        new sap.m.Button({
		            icon: "sap-icon://delete",
		            press: [controller.delete, controller]
		        })
		        ]
		});
		table.setHeaderToolbar(ProfileToolbar);
		table.bindAggregation("items", {
            path: "/",
            template: new sap.m.ColumnListItem({
                type : "Active",
                press: [controller.handleLinkPress],
                id: "userprofilesbuchungszeile",
                cells: [
                        new sap.m.Label({ id:"userprofilesbNrId", 
                        text: "{pname}"}), //evtl hier falsche bezeichnung
                        
                        new sap.m.Label({ id: "userprofilesPID", text: "{pid}" }),
                        
                        new sap.m.DateTimeInput({
                          editable: false,
                          value : "{gueltigab}",
                          valueFormat : "yyyy-MM-dd HH:mm:ss.0000000",
                          displayFormat : "dd.MM.yyyy"
                          }),
                        new sap.m.DateTimeInput({
                          editable: false,
                          
                          value : "{gueltigbis}",
                          valueFormat : "yyyy-MM-dd HH:mm:ss.0000000",
                          displayFormat : "dd.MM.yyyy"
                          }),
                          
                         new sap.m.DateTimeInput({
                          editable: false,
                          value : "{start}",
                          valueFormat : "yyyy-MM-dd HH:mm:ss.0000000",
                          displayFormat : "HH:mm"
                          }),
                        new sap.m.DateTimeInput({
                          editable: false,
                          
                          value : "{ende}",
                          valueFormat : "yyyy-MM-dd HH:mm:ss.0000000",
                          displayFormat : "HH:mm"
                          }),
                        
                        new sap.m.CheckBox({
                        editable: false,
                        selected : "{mo}"
                        }),
                        new sap.m.CheckBox({
                            editable: false,
                        selected : "{di}"
                        }),
                        new sap.m.CheckBox({
                            editable: false,
                        selected : "{mi}"
                        }),
                        new sap.m.CheckBox({
                            editable: false,
                        selected : "{don}"
                        }),
                        new sap.m.CheckBox({
                            editable: false,
                        selected : "{fr}"
                        }),
                        
                        new sap.m.Label({ text: "{personen}" }),
                        new sap.m.Label({ text: "{reichweite}" })
                       // new sap.m.Label({ text: "{uid}" })
                        
                        
                ]
            })
        });
        

//Ende Enwicklungen vor Datenbankanbindung
		return new sap.m.Page({
			title: "Ihre Profile",
			id: "cs.userprofiles",
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