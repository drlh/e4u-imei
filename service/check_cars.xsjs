var personen = $.request.parameters.get("personen");
var reichweite = $.request.parameters.get("reichweite");
personen = parseInt(personen);
reichweite = parseInt(reichweite);


// SQL Stuff
var query = "SELECT * FROM \"IMEI.CARS\" WHERE \"PERSONEN\"=" + personen + " AND \"REICHWEITE\" >= " + reichweite
        + ";";

// JSON Stuff
var result = {};
var data = [];
var tmp = {};

if (personen !== null) {

    var connection = $.db.getConnection();

    var prepStatement = connection.prepareStatement(query);
    var rs = prepStatement.executeQuery();

    if (!rs.next()) {
        tmp.lsid = "NO DATA";
        data.push(tmp);
    } else {

        do {
            tmp = {};

            tmp.kennzeichen = rs.getString(1);
            tmp.bezeichnung = rs.getString(2);
            tmp.kapazitaet = rs.getDouble(3);
            tmp.reichweite = rs.getInteger(4);
            tmp.verbrauch = rs.getDouble(5);
            tmp.ladestand = rs.getDouble(6);
            tmp.anschluss = rs.getDouble(7);
            tmp.anschluss2 = rs.getDouble(7);
            tmp.personen = rs.getInteger(8);
            

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
