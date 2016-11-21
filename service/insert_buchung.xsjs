// insert_lv.xsjs

var abfahrtsDatumUhrzeit = $.request.parameters.get("abfahrtsDatumUhrzeit");
var rueckkehrDatumUhrzeit = $.request.parameters.get("rueckkehrDatumUhrzeit");
var distanz = $.request.parameters.get("distanz");
var checkSitzplaetze = $.request.parameters.get("checkSitzplaetze");
var bnrNeu = $.request.parameters.get("bnrNeu");
var sitzPlaetze = 1;
var kennZeichen = $.request.parameters.get("kennzeichen");
var uid = 1001;

// CLEARING & CALCULATION
var isTrueSet = (checkSitzplaetze === 'true');
if (isTrueSet){
    sitzPlaetze = 4;
} else {
    sitzPlaetze = 2;
}
distanz = parseInt(distanz);

/*var startDate = new Date();
startDate = Date.parse(abfahrtsDatumUhrzeit);
var endDate = new Date();
endDate = Date.parse(rueckkehrDatumUhrzeit);*/

/*kz = kz.replace("%20", " ");//Leerzeichen entfernen
var vb = parseFloat(verbrauch);
var ent = parseFloat(entfernung);

var m = (vb / 100) * ent;
var menge = Math.round((m*100))/100;
var currentdate = new Date();
var arr = currentdate.getHours() + ":" + currentdate.getMinutes();
var d_arr = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1) + "-"
+ currentdate.getDate();*/

// JSON Stuff

var output = {};
output.data = [];

//var query = 'SELECT * FROM \"IMEI.BOOKINGS\"';



/*var query = 'INSERT INTO \"IMEI.BOOKINGS\" (\"BNR\", \"START\", \"ENDE\",'
+' \"PERSONEN\", \"REICHWEITE\", \"KENNZEICHEN\", \"UID\") VALUES (?,?,?,?,?,?,?);';*/
var query = 'INSERT INTO \"IMEI.BOOKINGS\" (\"BNR\", \"START\", \"ENDE\", \"PERSONEN\", \"REICHWEITE\", \"KENNZEICHEN\", \"UID\") VALUES (?,?,?,?,?,?,?);';

var conn = $.db.getConnection();
var st = conn.prepareStatement(query);

st.setString(1, bnrNeu);
st.setString(2, abfahrtsDatumUhrzeit);
st.setString(3, rueckkehrDatumUhrzeit);
st.setInt(4, sitzPlaetze);
st.setInt(5, distanz);
st.setText(6, kennZeichen);
st.setInt(7, uid);

//var conn = $.db.getConnection();
// var conn = $.db.getConnection();
//var st = conn.prepareStatement(query);


//st.execute();
st.executeUpdate();
conn.commit();

/*var record = [];
record.push(arr);
record.push();
output.data.push(record);*/

st.close();
conn.close();

$.response.status = $.net.http.OK;
$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(output));
