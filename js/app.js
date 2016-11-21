var oApplication = {}; // Global application object  
oApplication.views = {}; // Global views reference via application object  
oApplication.loadViews = function ()   
// LoadViews method for loading views   
// in case of successfull login  
{  
    this.loadView("mainView");  
    this.loadView("detailView");  
};
oApplication.loadView = function( sViewName )  
// LoadView method for loading a single view   
// and assigning it to application  
{  
          if (typeof this.views[sViewName] === "undefined"){  
        var sViewFullName = "view."+sViewName;  
        this.views[sViewName] = new sap.ui.core.mvc.JSView(sViewName, sViewFullName);  
        this.app.addPage( this.views[sViewName] );  
          }      
};  
sap.ui.localResources("./view"); // setting views folder  
// Loading a main application view - container for all other views  
sap.ui.core.mvc.JSView("appstart", "view.appstart").placeAt("content"); 
//oApplication.loadView("appstart");