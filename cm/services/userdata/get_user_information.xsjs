// get_user_information.xsjs
// THIS SCRIPT READS THE INFORMATION FOR A SPECIFIC LADESAEULE FROM THE DB

var uid = $.request.parameters.get("uid");

// SQL Stuff
var query = "SELECT * FROM \"PUBLIC\".\"IMEI.US\" WHERE \"UID\" = " + uid + ";";

// JSON Stuff
var result = {};
var data = [];
var tmp = {};

if (uid !== null) {

	var connection = $.db.getConnection("imei.cm.services.userdata::Admin");

	var prepStatement = connection.prepareStatement(query);
	var resultSet = prepStatement.executeQuery();

	if (!resultSet.next()) {
		tmp.uid = "NO_DATA";
	} else {

		tmp.uid = resultSet.getInteger(1);
		tmp.name = resultSet.getString(2);
		tmp.vorname = resultSet.getString(3);
		tmp.strasse = resultSet.getString(4);
		tmp.plz = resultSet.getString(5);
		tmp.ort = resultSet.getString(6);
		tmp.passwort = resultSet.getString(7);

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