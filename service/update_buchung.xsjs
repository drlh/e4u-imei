// insert_lv.xsjs

var abfahrtsDatumUhrzeit = $.request.parameters.get("abfahrtsDatumUhrzeit");
abfahrtsDatumUhrzeit = abfahrtsDatumUhrzeit.replace("%20", " ");
var rueckkehrDatumUhrzeit = $.request.parameters.get("rueckkehrDatumUhrzeit");
rueckkehrDatumUhrzeit = rueckkehrDatumUhrzeit.replace("%20", " ");
var distanz = $.request.parameters.get("distanz");
var personen = $.request.parameters.get("personen");
var bNr = $.request.parameters.get("bNr");
var kennZeichen = $.request.parameters.get("kennzeichen");
var uid = 1001;

// CLEARING & CALCULATION
personen = parseInt(personen);
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
//var query = 'INSERT INTO \"IMEI.BOOKINGS\" (\"BNR\", \"START\", \"ENDE\", \"PERSONEN\", \"REICHWEITE\", \"KENNZEICHEN\", \"UID\") VALUES (?,?,?,?,?,?,?);';
var query = "UPDATE \"IMEI.BOOKINGS\" SET \"START\" = '" + abfahrtsDatumUhrzeit + "' ,\"ENDE\" = '" +rueckkehrDatumUhrzeit + "' ,\"PERSONEN\" = " + personen + " ,\"REICHWEITE\" = " 
+ distanz + " ,\"KENNZEICHEN\" = '"
+ kennZeichen + "' WHERE \"BNR\"= " + bNr +";";


var conn = $.db.getConnection();
var st = conn.prepareStatement(query);



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
output.data = ["OK"];
$.response.status = $.net.http.OK;
$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(output));
