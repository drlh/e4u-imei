// get_user_password.xsjs
// THIS SCRIPT READS THE NON ENCRYPTED PASSWORD FOR A USER FROM THE DB

var uid = $.request.parameters.get("uid");

//SQL Stuff
var query = "SELECT \"PASSWORT\" FROM \"PUBLIC\".\"IMEI.US\" WHERE \"UID\" = "+ uid +";";

//JSON Stuff
var response;
var result = {};
result.data = [];

if (uid !== null && uid !== "") {
	
	var connection = $.db.getConnection("imei.cm.services.login::Admin");
	
	
	var prepStatement = connection.prepareStatement( query );
	var resultSet = prepStatement.executeQuery();
	
	if (!resultSet.next()) {
		response = "USER_NOT_FOUND";
		$.response.status = $.net.http.OK;
	}
	else {
		response = resultSet.getString(1);
		$.response.status = $.net.http.OK;
	}
	
	result.data.push(response);
	
	resultSet.close();
	prepStatement.close();
	connection.close();
	
	$.response.contentType = "text/json"; 
	$.response.setBody( JSON.stringify(result) );
}