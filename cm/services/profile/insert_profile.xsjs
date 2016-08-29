// get_user_password.xsjs
// THIS SCRIPT READS THE NON ENCRYPTED PASSWORD FOR A USER FROM THE DB
var name = $.request.parameters.get("name");
var aktiv = $.request.parameters.get("aktiv");
var kz = $.request.parameters.get("kz");
var mo = $.request.parameters.get("mo");
var di = $.request.parameters.get("di");
var mi = $.request.parameters.get("mi");
var don = $.request.parameters.get("do");
var fr = $.request.parameters.get("fr");
var sa = $.request.parameters.get("sa");
var so = $.request.parameters.get("so");
var arr = $.request.parameters.get("arr");
var dep = $.request.parameters.get("dep");
var entfernung = $.request.parameters.get("ent");
var verbrauch = $.request.parameters.get("vb");
var lstid = $.request.parameters.get("lstid");
var uid = $.request.parameters.get("uid");

// CLEARING & CALCULATION
kz = kz.replace("%20", " ");
var vb = parseFloat(verbrauch);
var ent = parseFloat(entfernung);

var m = (vb / 100) * ent;
var menge = Math.round((m * 100)) / 100;

// SQL Stuff
// var schema = "SET SCHEMA \"A611414\"";
var query = 'insert into "PUBLIC"."IMEI.PR" (\"NAME\",\"AKTIV\",\"KENNZEICHEN\",'
		+ '\"MO\",\"DI\",\"MI\",\"DO\",\"FR\",\"SA\",\"SO\",'
		+ '\"ANKUNFT\",\"ABFAHRT\",\"MENGE\",\"ENTFERNUNG\",\"LSTID\",\"UID\") values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

// JSON Stuff
var output = {};
output.data = [];

var conn = $.db.getConnection("imei.cm.services.profile::Admin");
var st = conn.prepareStatement(query);

st.setString(1, name);
st.setInteger(2, parseInt(aktiv));
st.setString(3, kz);
st.setInteger(4, parseInt(mo));
st.setInteger(5, parseInt(di));
st.setInteger(6, parseInt(mi));
st.setInteger(7, parseInt(don));
st.setInteger(8, parseInt(fr));
st.setInteger(9, parseInt(sa));
st.setInteger(10, parseInt(so));
st.setString(11, arr);
st.setString(12, dep);
st.setDouble(13, menge);
st.setDouble(14, parseFloat(ent));
st.setString(15, lstid);
st.setInteger(16, parseInt(uid));

st.execute();
conn.commit();

var record = [];
record.push(uid);
record.push();
output.data.push(record);

st.close();
conn.close();

$.response.status = $.net.http.OK;
$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(output));