// get_user_information.xsjs
// THIS SCRIPT READS THE INFORMATION FOR A SPECIFIC LADESAEULE FROM THE DB
var tmp = {};

tmp.uid = $.request.parameters.get("uid");
tmp.name = $.request.parameters.get("name");
tmp.vorname = $.request.parameters.get("vorname");
tmp.strasse = $.request.parameters.get("strasse");
tmp.plz = $.request.parameters.get("plz");
tmp.ort = $.request.parameters.get("ort");
tmp.passwort = $.request.parameters.get("passwort");


//CLearing
tmp.strasse = tmp.strasse.replace("%20", " ");



// SQL Stuff
var query = "UPDATE \"A611414\".\"USER\" SET \"NAME\"='" + tmp.name
		+ "' , \"VORNAME\"='" + tmp.vorname + "' , \"STRASSE\"='"
		+ tmp.strasse + "' , \"PLZ\"='" + tmp.plz + "' , \"ORT\"='"
		+ tmp.ort + "' , \"PASSWORT\"='" + tmp.passwort
		+ "' WHERE \"UID\"=" + tmp.uid + ";";

// JSON Stuff
var result = {};


if (tmp.uid !== null) {

	var conn = $.db.getConnection("imei.cm.services.userdata::Admin");

	var st = conn.prepareStatement(query);
	
	st.executeUpdate();
	conn.commit();
	
	st.close();
	conn.close();
	
	result.id =tmp.uid;
}

$.response.status = $.net.http.OK;
$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(result));