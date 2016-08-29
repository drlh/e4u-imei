// get_user_password.xsjs
var entfernung = $.request.parameters.get("ent");
var kz = $.request.parameters.get("kz");
var lstid = $.request.parameters.get("lstid");
var verbrauch = $.request.parameters.get("vb");
var arr = $.request.parameters.get("arr");
var d_arr = $.request.parameters.get("d_arr");
var dep = $.request.parameters.get("dep");
var d_dep = $.request.parameters.get("d_dep");

// CLEARING & CALCULATION
kz = kz.replace("%20", " ");
var vb = parseFloat(verbrauch);
var ent = parseFloat(entfernung);

var m = (vb / 100) * ent;
var menge = Math.round((m * 100)) / 100;

// JSON Stuff
var output = {};
output.data = [];

var query = 'INSERT INTO \"A611414\".\"LADEAUFTRAEGE\" (\"ANKUNFT\",'
		+ ' \"ABFAHRT\", \"MENGE\", \"ENTFERNUNG\",'
		+ '\"KENNZEICHEN\", \"LSTID\", \"DIREKT\", \"D_ANKUNFT\", '
		+ '\"D_ABFAHRT\") VALUES (?,?,?,?,?,?,?,?,?);';

var conn = $.db.getConnection("imei.services.pref::Admin");
var st = conn.prepareStatement(query);

st.setString(1, arr);
st.setString(2, dep);
st.setDouble(3, menge);
st.setDouble(4, ent);
st.setString(5, kz);
st.setString(6, lstid);
st.setInteger(7, 0);
st.setString(8, d_arr);
st.setString(9, d_dep);

st.execute();
conn.commit();

var record = [];
record.push(arr);
record.push();
output.data.push(record);

st.close();
conn.close();

$.response.status = $.net.http.OK;
$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(output));