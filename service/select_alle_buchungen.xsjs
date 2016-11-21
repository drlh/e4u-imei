var uid = $.request.parameters.get("uid");

// SQL Abfrage aller Buchungen des Users + zusätzlich der Bezeichnung des Fahrzeuges
var query = "SELECT * FROM (SELECT \"IMEI.BOOKINGS\".BNR, \"IMEI.BOOKINGS\".\"START\", \"IMEI.BOOKINGS\".ENDE, \"IMEI.BOOKINGS\".PERSONEN, "
+ "\"IMEI.BOOKINGS\".REICHWEITE, \"IMEI.BOOKINGS\".KENNZEICHEN, \"IMEI.BOOKINGS\".UID, \"IMEI.CARS\".BEZEICHNUNG "
+ "FROM \"IMEI.CARS\" RIGHT JOIN \"IMEI.BOOKINGS\" ON \"IMEI.CARS\".KENNZEICHEN = TO_VARCHAR(\"IMEI.BOOKINGS\".KENNZEICHEN)) WHERE UID ="
+ uid + " ORDER BY \"START\";";

/*var query = "SELECT * FROM \"IMEI.BOOKINGS\" WHERE \"UID\"=" + uid
        + " ORDER BY \"START\";";*/

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

            tmp.bnr = rs.getInteger(1);
            tmp.start = rs.getString(2);
            tmp.ende = rs.getString(3);
            tmp.personen = rs.getInteger(4);
            tmp.reichweite = rs.getInteger(5);
            tmp.kennzeichen = rs.getString(6);
            tmp.uid = rs.getInteger(7);
            tmp.bezeichnung = rs.getString(8);
            

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
