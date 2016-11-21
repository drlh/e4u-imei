var uid = $.request.parameters.get("uid");

// SQL Abfrage aller Buchungen des Users + zusätzlich der Bezeichnung des Fahrzeuges
/*var query = "SELECT * FROM (SELECT \"IMEI.BOOKINGS\".BNR, \"IMEI.BOOKINGS\".\"START\", \"IMEI.BOOKINGS\".ENDE, \"IMEI.BOOKINGS\".PERSONEN, "
+ "\"IMEI.BOOKINGS\".REICHWEITE, \"IMEI.BOOKINGS\".KENNZEICHEN, \"IMEI.BOOKINGS\".UID, \"IMEI.CARS\".BEZEICHNUNG "
+ "FROM \"IMEI.CARS\" RIGHT JOIN \"IMEI.BOOKINGS\" ON \"IMEI.CARS\".KENNZEICHEN = TO_VARCHAR(\"IMEI.BOOKINGS\".KENNZEICHEN)) WHERE UID ="
+ uid + " ORDER BY \"PID\";";*/

var query = "SELECT * FROM \"IMEI.PROFILES\" WHERE \"UID\"=" + uid
        + " ORDER BY \"PID\";";

// JSON Stuff
var result = {};
var data = [];
var tmp = {};

if (uid !== null) {

    var connection = $.db.getConnection();

    var prepStatement = connection.prepareStatement(query);
    var rs = prepStatement.executeQuery();

    if (!rs.next()) {
        tmp.lsid = "NO DATA";
        data.push(tmp);
    } else {

        do {
            tmp = {};

            tmp.pid = rs.getInteger(1);
            tmp.aktiv = rs.getInteger(2);
            tmp.gueltigab = rs.getString(3);
            tmp.gueltigbis = rs.getString(4);
            tmp.mo = rs.getInteger(5);
            tmp.di = rs.getInteger(6);
            tmp.mi = rs.getInteger(7);
            tmp.don = rs.getInteger(8);
            tmp.fr = rs.getInteger(9);
            tmp.sa = rs.getInteger(10);
            tmp.so = rs.getInteger(11);
            tmp.start = rs.getString(12);
            tmp.ende = rs.getString(13);
            tmp.reichweite = rs.getInteger(14);
            tmp.uid = rs.getInteger(15);
            tmp.pname = rs.getString(16);
            tmp.personen = rs.getInteger(17);

            data.push(tmp);
        } while (rs.next());

    }
    result.data = data;

    $.response.status = $.net.http.OK;
}

rs.close();
prepStatement.close();
connection.close();

$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(result));
