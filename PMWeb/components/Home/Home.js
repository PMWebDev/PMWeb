
app.Home = kendo.observable({
    onShow: function() {
    }
    ,afterShow: function() {
         
    }
    ,onInit: function() { 
       
        
    }
    ,beforeShow: function() {
         //alert(cordova.file.dataDirectory);
        	app.db.transaction(function (tx) {
           tx.executeSql('SELECT ParamName, ParamValue FROM Parameters', []
                         , function (tx, res) {
                                for (i = 0; i < res.rows.length; i++) {
                                   if ((app.data.PMWebUrl =='') && (res.rows.item(i).ParamName == 'PMWebUrl')){
                                       app.data.PMWebUrl = res.rows.item(i).ParamValue;
                                   }  
                                   if ((app.data.PMWebDbId == 0) && (res.rows.item(i).ParamName == 'PMWebDbId')){
                                       app.data.PMWebDbId = res.rows.item(i).ParamValue;
                                   }  
                                   if ((app.data.UserToken =='') && (res.rows.item(i).ParamName == 'UserToken')){
                                       app.data.UserToken = res.rows.item(i).ParamValue;
                                   }  
                                }
               					 if (app.data.PMWebUrl == '') {
                                   app.mobileApp.navigate('components/Login/PreLogin.html');
                                    return;
                                }
                                if (app.data.PMWebDbId == 0) {
                                   app.mobileApp.navigate('components/Login/PMWebDatabases.html');
                                    return;
                                }
                                if (app.data.UserToken == '') {
                                   app.mobileApp.navigate('components/Login/PMWebDatabases.html');
                                    return;
                                }	
           					}
               					
       					,  function(tx, res) {
                              alert(res.message);
                            }
                        )});
        
    }
        
   });


/******************************************* ProjectsList  ******************************************************/

app.ProjectsList = kendo.observable({
    onShow: function() {
         var dtsProjectsList= new kendo.data.DataSource({  
                transport: {
                            read: {
                                url:  app.data.PMWebUrl + "/login.svc/GetUserProjects/" + app.data.UserToken + "/10/10"
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
        dtsProjectsList.online(app.isOnline());
        $("#lstProjectsList").data("kendoMobileListView").setDataSource(dtsProjectsList);
    }
    ,afterShow: function() {
         
    }
    ,onInit: function() { 
       
        
    }
    ,beforeShow: function() {

        
    }
        
   });
   
