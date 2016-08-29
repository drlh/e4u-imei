var mail = new $.net.Mail({
 sender: {address: "leonhard.hellwich@atos.net"},
 to: [{ address: "Fabian.orth@atos.net"}],
 subject: "XSJS Email Test",
 parts: [ new $.net.Mail.Part({
 type: $.net.Mail.Part.TYPE_TEXT,
 text: "The body of the mail. Lappen",
 contentType: "text/plain"
 })]
});
var returnValue = mail.send(); 
