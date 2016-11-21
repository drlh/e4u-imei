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

var user = $.request.parameters.get("uid");

// SQL Stuff
// var schema = "SET SCHEMA \"A611414\"";
var query = "SELECT * FROM \"PUBLIC\".\"PROFILE\" WHERE \"UID\" = " + user
		+ ";";

// JSON Stuff
var result = {};
var data = [];
var tmp = {};

if (user !== null) {

	var connection = $.db.getConnection();

	var prepStatement = connection.prepareStatement(query);
	var resultSet = prepStatement.executeQuery();

	if (!resultSet.next()) {
		tmp.lsid = "NO DATA";
		data.push(tmp);
	} else {

		tmp.lsid = resultSet.getString(1);
		tmp.bezeichnung = resultSet.getString(2);
		tmp.typ1 = resultSet.getString(3);
		tmp.typ2 = resultSet.getString(4);
		tmp.leistung = resultSet.getString(5);
		tmp.hersteller = resultSet.getString(6);
		tmp.ip = resultSet.getString(7);

		data.push(tmp);

	}
	result.data = data;

	$.response.status = $.net.http.OK;
}

resultSet.close();
prepStatement.close();
connection.close();

$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(result));