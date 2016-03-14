/**************************************** Prelogin **********************************************************/ 
var PreLoginValidator ;
app.Prelogin = kendo.observable({
    onShow: function() { }
    ,afterShow: function() {}
     ,onInit: function() {
         PreLoginValidator = $("#frmConnect").kendoValidator().data("kendoValidator");
    } 
}); 

 function hplConnect_Click(e) {
     if (PreLoginValidator.validate()) {
         var strUrl = $("#txtPMWebUrl").val();
         var regex = new RegExp("/\+$");
         strUrl = strUrl.replace(regex, "");
         app.data.PMWebUrl = strUrl;
          setParamValue('PMWebUrl',app.data.PMWebUrl);
          app.mobileApp.navigate('components/Login/PMWebDatabases.html');
     }
}

/**************************************** PMWebDatabases **********************************************************/

app.PMWebDatabases = kendo.observable({
    onShow: function() {
         var dtsDatabases= new kendo.data.DataSource({  
            	offlineStorage: "dtsDatabases-offline"
                ,transport: {
                            read: {
                                url:  app.data.PMWebUrl + "/login.svc/getdatabases"
                                ,type: "GET"
                                ,dataType: "json"
                                ,timeout: 10000
                            }
                    
                        }
            	,error: function (e) {
                    app.openModalMessage(e.status,'components/Home/Home.html');
        				//if($('.km-loader.km-widget'))$('.km-loader.km-widget').hide();
                    	app.mobileApp.pane.loader.hide();
                    	
                  }
            });
        dtsDatabases.online(app.isOnline());
        $("#lstDatabases").data("kendoMobileListView").setDataSource(dtsDatabases);
        
    }
    ,beforeShow: function() { 
    }
    ,afterShow: function() { 
    }
     ,onInit: function() {
   
    }
}); 
 function lstDatabases_Click(e) {
         app.data.PMWebDbId = e.dataItem.DatabaseID;
         app.mobileApp.navigate('components/Login/Login.html');
    }





/**************************************** Login **********************************************************/
var dtsUsers;
app.Login = kendo.observable({
    onShow: function() {
        dtsUsers = null;
        dtsUsers= new kendo.data.DataSource({  
                transport: {
                            read: {
                                url:  app.data.PMWebUrl + "/login.svc/getUsers/" + app.data.PMWebDbId
                                ,type: "GET"
                                ,dataType: "json"
                                ,timeout: 10000
                            }
                    
                        }
            	,error: function (e) {
                   // app.openModalMessage(e.status,'');
                    	app.mobileApp.pane.loader.hide();
                    	
                  }
            });
        
     $("#txtUsername").kendoAutoComplete({
              dataSource: dtsUsers
              ,dataTextField: "UserName"
            	,filter: "contains"
            	,height:180
            });   
    }
    ,afterShow: function() {}
     ,onInit: function() {
    } 
}); 
/*data: {UserName : "'" + $("#txtUsername").val() + "'"
        				,Password:  "'" + $("#txtUsername").val()  + "'"
            			,DatabaseId:  app.data.PMWebDbId  
        			},*/
function hplLogin_Click(e) {
    app.mobileApp.pane.loader.show();
        $.ajax({
                type: "POST"
                ,url: app.data.PMWebUrl + "/login.svc/CheckCredentials"
                ,contentType: "application/json; charset=utf-8"
                //,data: "{'Username':'admin' ,'Password':  'History23', 'DatabaseId': '" + app.data.PMWebDbId + '"}'
            	,data: JSON.stringify({Username: $("#txtUsername").val()
                                      ,Password: $("#txtPassword").val()
                                      ,DatabaseId: app.data.PMWebDbId})
                ,dataType: "json"
                ,success: function (data) {
                    app.mobileApp.pane.loader.hide();
                    if (data.substring(0, 2) == '$$'){
                         app.openModalMessage(data.substring(2, data.length),'');
                        return;
                    }
                    app.data.UserToken = data;
                    var blnRemember = $("#chkRememberMe").data("kendoMobileSwitch").check();
                    if (blnRemember){
                        setParamValue('PMWebDbId',app.data.PMWebDbId);
                        setParamValue('UserName',$("#txtUsername").val());
                        setParamValue('Password',$("#txtPassword").val()); 
                        setParamValue('UserToken',app.data.UserToken); 
                    }
         			app.mobileApp.navigate('components/Home/Home.html');
                }
    			,error: function (jqXHR, textStatus, errorThrown) {
                    app.mobileApp.pane.loader.hide();
                     app.openModalMessage(textStatus + '<br/>' + errorThrown, '');
                }
            });
}





//$("#txtPMWebUrl").kendoValidator();