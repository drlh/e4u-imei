var uid = $.request.parameters.get("uid");

// SQL Stuff
var query = 'SELECT TOP 1 (\"BNR\") FROM \"IMEI.BOOKINGS\" ORDER BY (\"BNR\") DESC;';

       

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