// get_user_information.xsjs
// THIS SCRIPT READS THE INFORMATION FOR A SPECIFIC LADESAEULE FROM THE DB

var lsid = $.request.parameters.get("lsid");

//SQL Stuff
var query = "SELECT * FROM \"PUBLIC\".\"IMEI.LS\" WHERE \"LSID\" = "+ lsid +";";

//JSON Stuff
var response;
var result = {};
var data = [];
var tmp = {};

if (lsid !== null) {
	
	var connection = $.db.getConnection();
	
	var prepStatement = connection.prepareStatement( query );
	var resultSet = prepStatement.executeQuery();
	
	if (!resultSet.next()) {
		response ="";
		
	}
	else {
		
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