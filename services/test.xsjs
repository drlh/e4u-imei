// get_user_data.xsjs
// THIS SCRIPT READS THE METERDATA FOR A SPECIFIC METER FROM THE DB

var id = $.request.parameters.get("id");

//SQL Stuff
var schema = "SET SCHEMA \"A571568\"";
var query = "SELECT * FROM \"PORTAL_METERDATA\" WHERE \"METERID\" = '"+ id +"'";

//JSON Stuff
var response;
var result = {};
var data = [];
var tmp = {};

if (id !== null) {
	
	var connection = $.db.getConnection();
	
	connection.prepareStatement( schema ).execute();
	
	var prepStatement = connection.prepareStatement( query );
	var resultSet = prepStatement.executeQuery();
	
	if (!resultSet.next()) {
		response ="";
		
	}
	else {
		/* Auslesen der ersten Zeile um doppelten ersten Eintrag zu vermeiden */
		resultSet.next();
			do {
				
				result.meterid = resultSet.getString(2);
				tmp.date = resultSet.getString(3);
				tmp.value = resultSet.getString(4);
				
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
$.response.setBody( JSON.stringify(result) );
	
	
