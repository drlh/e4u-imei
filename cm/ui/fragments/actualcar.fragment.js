sap.ui.jsfragment("fragments.actualcar", {

	createContent : function(oController) {

		var obj = sap.ui.getCore().getModel("activeCar").getProperty("/");
		var srcImg = "./img/cars/";

		switch (obj.bez) {
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

		var fbox1 = new sap.m.FlexBox("", {
			width : "100%",
			height : "auto",
			justifyContent : sap.m.FlexJustifyContent.Center,
			alignItems : sap.m.FlexAlignItems.Center,
			items : [ new sap.m.Image("", {
				src : srcImg,
				width : "auto",
				height : "auto"
			}), new sap.m.ObjectHeader({
				title : "{activeCar>/bez}",
				attributes : [ new sap.m.ObjectAttribute({
					title: "max. Reichw",
					text: obj.rw+"km"
				}), new sap.m.ObjectAttribute({
					title: "Ladestand",
					text: obj.ladestand+" KwH"
				}) ]
			}) ]
		});
		return fbox1;
	}
});