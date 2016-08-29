// get_user_information.xsjs
// THIS SCRIPT READS THE INFORMATION FOR A SPECIFIC LADESAEULE FROM THE DB

//var name = $.request.parameters.get("name");
//var status = $.request.parameters.get("status");
//var car = $.request.parameters.get("car");
//var mo = $.request.parameters.get("mo");
//var di = $.request.parameters.get("di");
//var mi = $.request.parameters.get("mi");
//var don = $.request.parameters.get("don");
//var fr = $.request.parameters.get("fr");
//var sa = $.request.parameters.get("sa");
//var so = $.request.parameters.get("so");
//var arr = $.request.parameters.get("arr");
//var ent = $.request.parameters.get("ent");
//var men = $.request.parameters.get("men");
//var lstid = $.request.parameters.get("lstid");

var uid = $.request.parameters.get("uid");

// SQL Stuff
var query = "SELECT * FROM \"A611414\".\"PROFILE\" WHERE \"UID\"=" + uid
		+ ";";

// JSON Stuff
var result = {};
var data = [];
var tmp = {};

if (uid !== null) {

	var connection = $.db.getConnection("imei.services.profile::Admin");

	var prepStatement = connection.prepareStatement(query);
	var rs = prepStatement.executeQuery();

	if (!rs.next()) {
		tmp.lsid = "NO DATA";
		data.push(tmp);
	} else {

		do {
			tmp = {};
			
			tmp.pid = rs.getInteger(1);
			tmp.name = rs.getString(2);
			tmp.aktiv = rs.getInteger(3);
			tmp.kennzeichen = rs.getString(4);
			tmp.mo = rs.getInteger(5);72
			tmp.di = rs.getInteger(6);
			tmp.mi = rs.getInteger(7);
			tmp.don = rs.getInteger(8);
			tmp.fr = rs.getInteger(9);
			tmp.sa = rs.getInteger(10);
			tmp.so = rs.getInteger(11);
			tmp.ankunft = rs.getString(12);
			tmp.abfahrt = rs.getString(13);
			tmp.menge = rs.getString(14);
			tmp.entfernung = rs.getString(15);
			tmp.lstid = rs.getString(16);
			tmp.uid = rs.getString(17);
			
			data.push(tmp);
		} while (rs.next());

	}
	result.data = data;

	$.response.status = $.net.http.OK;
}

rs.close();
prepStatement.close();
connection.close();

$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(result));