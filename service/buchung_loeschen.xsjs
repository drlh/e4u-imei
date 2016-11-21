var bnr = $.request.parameters.get("bnr");
bnr = parseInt(bnr);
// SQL Stuff
var query = "DELETE FROM \"IMEI.BOOKINGS\" WHERE \"BNR\"=" + bnr
        + ";";

// JSON Stuff
$.response.contentType = "application/text";
var output = {};
output.data = [];

function getTxtData(){

var connection = $.db.getConnection();
var resultSet = null;
var statement = null;
    try{
    statement = connection.prepareStatement(query);
    resultSet=statement.executeQuery();
    connection.commit();
    } finally{
    statement.close();
    connection.close();
    
    output.data = ["OK"];
    
    $.response.status = $.net.http.OK;
    $.response.contentType = "text/json";
    $.response.setBody(JSON.stringify(output));
    }
    
}    

getTxtData();


/*$.response.status = $.net.http.OK;
$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(output));*/
