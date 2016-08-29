sap.ui
		.jsview(
				"view.search",
				{
					/**
					 * Specifies the Controller belonging to this View. In the
					 * case that it is not implemented, or that "null" is
					 * returned, this View does not have a Controller.
					 * 
					 * @memberOf view.search
					 */
					getControllerName : function() {
						return "view.search";
					},

					/**
					 * Is initially called once after the Controller has been
					 * instantiated. It is the place where the UI is
					 * constructed. Since the Controller is given to this
					 * method, its event handlers can be attached right away.
					 * 
					 * @memberOf view.search
					 */
					createContent : function(oController) {
						var appController = sap.ui.getCore().byId("App")
								.getController();

						this.titleTop = new sap.m.Title("", {
							text : "Ladestationssuche",
							titleStyle : sap.ui.core.TitleLevel.H1,
							align : sap.ui.core.TextAlign.Center
						});

						this.fbox_top = new sap.m.FlexBox("", {
							width : "100%",
							height : "auto",
							justifyContent : sap.m.FlexJustifyContent.Center,
							alignItems : sap.m.FlexAlignItems.Center,
							items : [ this.titleTop ]
						});
						this.fbox_top.addStyleClass("sapUiSmallMargin");

						// PANEL
						this.panel_content = new sap.m.Panel(
								"",
								{
									headerToolbar : this.toolbar_head,
									height : "90%",
									content : [ new sap.ui.core.HTML(
											"",
											{
												content : "<div style=\"width: 100%; height: 100%; overflow: hidden\" id=\"diviframe\"><iframe style=\"position: relative; width: 100%; height: 100%;\" id=\"iframeiframe\" src=\"http://openchargemap.org/app/?mode=embedded\" ></iframe></div>"
											}) ]
								});

						return new sap.m.Page({
							title : "{meta>/appname}",
							showNavButton : sap.ui.Device.system.phone,
							enableScrolling : true,
							content : [ this.fbox_top, this.panel_content ],
							navButtonPress : [ appController.openMenu,
									appController ],
									footer : new sap.m.Bar({
										contentMiddle : [ new sap.m.Button({
											text : "Verbunden",
											type : sap.m.ButtonType.Accept
										}), new sap.m.Button({
											text : "Lädt nicht",
											type : sap.m.ButtonType.Reject
										}) ],
										design : sap.m.BarDesign.Footer
									})
						});
					}

				});