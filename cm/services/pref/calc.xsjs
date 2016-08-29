//
//var vb ="15.1";
//var ent = "108";
//
//var menge = ( parseFloat(vb) /100 )* parseFloat(ent);
//

var split = vb.split(".");
//
//for (var int = 0; int < 5; int++) {
//	split.push("123");
//	split.push(split.length);
//}


var currentdate = new Date();
var datetime = "Last Sync: " + currentdate.getDay() + "/"+currentdate.getMonth() 
+ "/" + currentdate.getFullYear();


$.response.status = $.net.http.OK;
$.response.contentType = "text/json";
$.response.setBody(JSON.stringify(datetime));