var bnr = $.request.parameters.get("bnr");

// SQL Stuff
var query = "SELECT * FROM \"IMEI.BOOKINGS\" WHERE \"BNR\"=" + bnr
        + ";";

// JSON Stuff
var result = {};
var data = [];
var tmp = {};

if (bnr !== null) {

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
