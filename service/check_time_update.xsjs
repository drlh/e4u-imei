var startZeit = $.request.parameters.get("startZeit");
startZeit = startZeit.replace("%20", " ");
var endeZeit = $.request.parameters.get("endeZeit");
endeZeit = endeZeit.replace("%20", " ");
var kennzeichen = $.request.parameters.get("kennzeichen");
var bnr = $.request.parameters.get("bnr");

var query = "SELECT * FROM (SELECT * FROM \"IMEI.BOOKINGS\" WHERE TO_VARCHAR(KENNZEICHEN) = '" + kennzeichen + "' AND BNR != " + bnr + ") "
+ " WHERE ('" + startZeit + "' <= \"START\" AND '" + endeZeit + "' >= \"START\")"
+ " OR ('" + startZeit + "' >= \"START\" AND '" + endeZeit + "' <= \"ENDE\")"
+ " OR ('" + startZeit + "' <= \"ENDE\" AND '" + endeZeit + "' >= \"ENDE\")"
+ " OR ('" + startZeit + "' <= \"START\" AND '" + endeZeit + "' >= \"ENDE\");";



// JSON Stuff
var result = {};
var data = [];
var tmp = {};

if (startZeit !== null) {

    var connection = $.db.getConnection();

    var prepStatement = connection.prepareStatement(query);
    var rs = prepStatement.executeQuery();

    if (!rs.next()) {
        tmp.lsid = "NODATA";
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