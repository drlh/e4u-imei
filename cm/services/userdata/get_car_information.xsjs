// get_user_information.xsjs
// THIS SCRIPT READS THE INFORMATION FOR A SPECIFIC LADESAEULE FROM THE DB

var kz = $.request.parameters.get("kz");
kz = kz.replace("%20", " ");
// SQL Stuff
var query = "SELECT * FROM \"PUBLIC\".\"IMEI.EV\" WHERE \"KENNZEICHEN\" = '" + kz + "';";

// JSON Stuff
var result = {};
var data = [];
var tmp = {};

if (kz !== null) {

	var connection = $.db.getConnection("imei.cm.services.userdata::Admin");

	var prepStatement = connection.prepareStatement(query);
	var resultSet = prepStatement.executeQuery();

	if (!resultSet.next()) {
		tmp.kz = "NO_DATA";
	} else {

		tmp.kz = resultSet.getString(1);
		tmp.bez = resultSet.getString(2);
		tmp.typ = resultSet.getString(3);
		tmp.kap = resultSet.getDouble(4);
		tmp.anschluss = resultSet.getDouble(5);
		tmp.anschluss2 = resultSet.getDouble(6);
		tmp.vb = resultSet.getDouble(7);
		tmp.rw = resultSet.getDouble(8);
		tmp.ladestand = resultSet.getDouble(9);
	}

	data.push(tmp);
	result.data = data;

	$.response.status = $.net.http.OK;
}

resultSet.close();
prepStatement.close();
connection.close();

$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(result));