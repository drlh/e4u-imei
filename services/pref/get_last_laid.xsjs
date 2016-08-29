// get_user_information.xsjs
// THIS SCRIPT READS THE INFORMATION FOR A SPECIFIC USER FROM THE DB

// SQL Stuff
var query = "SELECT \"LAID\" FROM \"PUBLIC\".\"IMEI.LA\" ORDER BY \"LAID\" DESC LIMIT 1;";

// JSON Stuff

var result = {};

var connection = $.db.getConnection();

var prepStatement = connection.prepareStatement(query);
var resultSet = prepStatement.executeQuery();

if (!resultSet.next()) {
	result.laid = "NO DATA";

} else {
	result.laid = resultSet.getInteger(1);
}


$.response.status = $.net.http.OK;

resultSet.close();
prepStatement.close();
connection.close();

$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(result));