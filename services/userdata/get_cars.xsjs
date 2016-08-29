// get_user_information.xsjs
// THIS SCRIPT READS THE INFORMATION FOR A SPECIFIC LADESAEULE FROM THE DB

var uid = $.request.parameters.get("uid");

// SQL Stuff
var query = "SELECT \"KENNZEICHEN\", \"AKTIV\" FROM \"PUBLIC\".\"IMEI.Z_UEV\" WHERE \"UID\" = " + uid + ";";

// JSON Stuff
var result = {};
var data = [];
var tmp = {};

if (uid !== null) {

	var connection = $.db.getConnection("imei.services.userdata::Admin");

	var prepStatement = connection.prepareStatement(query);
	var resultSet = prepStatement.executeQuery();

	if (!resultSet.next()) {
		tmp.kz = "NO_DATA";
	} else {

		do {	
			tmp.kz = resultSet.getString(1);
			tmp.aktiv = resultSet.getInteger(2);
			data.push(tmp);
			
			tmp = {};
		} while (resultSet.next());

	}

	result.data = data;

	$.response.status = $.net.http.OK;
}

resultSet.close();
prepStatement.close();
connection.close();

$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(result));