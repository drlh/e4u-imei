// insert_lv.xsjs
var r = $.request.parameters;
function parseIntFunction(v) {
    return parseInt(v);
}

var pid = parseIntFunction(r.get("pid"));
var profilName = r.get("profilName");
var profilGueltigAb = r.get("profilGueltigAb");
var profilGueltigBis = r.get("profilGueltigBis");
var p_mo = parseIntFunction(r.get("p_mo"));
var p_di = parseIntFunction(r.get("p_di"));
var p_mi = parseIntFunction(r.get("p_mi"));
var p_do = parseIntFunction(r.get("p_do"));
var p_fr = parseIntFunction(r.get("p_fr"));
var p_sa = parseIntFunction(r.get("p_sa"));
var p_so = parseIntFunction(r.get("p_so"));
var profilZeitVon = r.get("profilZeitVon");
var profilZeitBis = r.get("profilZeitBis");
var distanz = parseIntFunction(r.get("distanz"));
var profilSitzplaetze = r.get("profilSitzplaetze");
var sitzPlaetze;
var uid = 1001;

// CLEARING & CALCULATION
var isTrueSet = (profilSitzplaetze === 'true');
if (isTrueSet){
    sitzPlaetze = 4;
} else {
    sitzPlaetze = 2;
}

var output = {};
output.data = [];


var query = 'INSERT INTO \"IMEI.PROFILES\" (\"PID\", \"AKTIV\", \"GUELTIG_AB\", \"GUELTIG_BIS\", \"MO\", \"DI\", \"MI\", \"DO\", \"FR\", \"SA\", \"SO\", \"START\", \"ENDE\", \"REICHWEITE\", \"UID\", \"PROFIL_NAME\", \"PERSONEN\") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';

var conn = $.db.getConnection();
var st = conn.prepareStatement(query);

st.setInt(1, pid);
st.setInt(2, 1);
st.setString(3, profilGueltigAb)
st.setString(4, profilGueltigBis);
st.setInt(5, p_mo);
st.setInt(6, p_di);
st.setInt(7, p_mi);
st.setInt(8, p_do);
st.setInt(9, p_fr);
st.setInt(10, p_sa);
st.setInt(11, p_so);
st.setString(12, profilZeitVon);
st.setString(13, profilZeitBis);
st.setInt(14, distanz);
st.setInt(15, uid);
st.setString(16, profilName);
st.setInt(17, sitzPlaetze);

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
