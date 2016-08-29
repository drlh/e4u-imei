sap.ui.controller("view.car",
		{

			/**
			 * Called when a controller is instantiated and its View controls
			 * (if available) are already created. Can be used to modify the
			 * View before it is displayed, to bind event handlers and do other
			 * one-time initialization.
			 * 
			 * @memberOf view.car
			 */
			// onInit: function() {
			//
			// },
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the
			 * controller's View is re-rendered (NOT before the first rendering!
			 * onInit() is used for that one!).
			 * 
			 * @memberOf view.car
			 */
			// onBeforeRendering: function() {
			//
			// },
			/**
			 * Called when the View has been rendered (so its HTML is part of
			 * the document). Post-rendering manipulations of the HTML could be
			 * done here. This hook is the same one that SAPUI5 controls get
			 * after being rendered.
			 * 
			 * @memberOf view.car
			 */
			// onAfterRendering: function() {
			//
			// },
			/**
			 * Called when the Controller is destroyed. Use this one to free
			 * resources and finalize activities.
			 * 
			 * @memberOf view.car
			 */
			// onExit: function() {
			//
			// }
			showInformation : function(evt) {

				var carid = evt.getParameters();

				var property = "/" + carid.id + "/";
				var m = sap.ui.getCore().getModel("carsInfo").getProperty(
						property);
				
				m.src = this.getImgSrc(m.bez);
				console.log(m.src);
				
				var model = new sap.ui.model.json.JSONModel(m);
				sap.ui.getCore().setModel(model, "info");
				
				this.navigateToDetail();
			},

			navigateToDetail : function() {
				
				var sa = sap.ui.getCore().byId("theSA");
				
				if (sa.getDetailPage("d_cardetail") == null) {
					sa.addDetailPage(sap.ui.jsview("d_cardetail",
							"view.cardetail"));
				}

				sa.toDetail("d_cardetail");
			},
			
			getImgSrc : function(bez) 
			{
				var srcImg = "./img/cars/";
				
				switch (bez) {
				case "Nissan Leaf": {
					srcImg += "leaf.jpg";
					break;
				}
				case "Mitsubishi iMiev": {
					srcImg += "imiev.jpg";
					break;
				}
				case "Twizy": {
					srcImg += "twizy.png";
					break;
				}
				case "Opel Ampera": {
					srcImg += "opel.jpg";
					break;
				}
				case "Smart": {
					srcImg += "smart.png";
					break;
				}
				case "Renault Kangoo ZE": {
					srcImg += "ze.jpg";
					break;
				}
				}
				
				return srcImg;
			}

		});