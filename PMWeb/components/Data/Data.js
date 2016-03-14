document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  createTables();
}
 
function createTables() {
       // if (window.sqlitePlugin !== undefined) {
           // app.db = window.sqlitePlugin.openDatabase("PMWebDb");
      // } else { }
           app.db = window.openDatabase("PMWebDb", "1.0", "PMWebDb", 200000);
        
    
       app.db.transaction(function(tx) {
           		//tx.executeSql("DROP TABLE Parameters");
                tx.executeSql("CREATE TABLE IF NOT EXISTS MyTable (id INTEGER PRIMARY KEY ASC, text_sample TEXT, date_sample DATETIME)", []);
                tx.executeSql("CREATE TABLE IF NOT EXISTS Parameters (ParamName TEXT PRIMARY KEY ASC, ParamValue TEXT)",[]
                                 , function(tx, res) {
                                    }
                                ,  function(tx, res) {
                    alert(res.message);
                                    }
                                );
                tx.executeSql("INSERT INTO Parameters(ParamName,ParamValue) SELECT 'PMWebUrl','' WHERE NOT EXISTS(SELECT * FROM Parameters WHERE ParamName='PMWebUrl')",[]
                                 , function(tx, res) {
                                    }
                                ,  function(tx, res) {
                    alert(res.message);
                                    }
                                );
                tx.executeSql("INSERT INTO Parameters(ParamName,ParamValue) SELECT 'PMWebDbId',0 WHERE NOT EXISTS(SELECT * FROM Parameters WHERE ParamName='PMWebDbId')");
                tx.executeSql("INSERT INTO Parameters(ParamName,ParamValue) SELECT 'UserName','' WHERE NOT EXISTS(SELECT * FROM Parameters WHERE ParamName='UserName')");
                tx.executeSql("INSERT INTO Parameters(ParamName,ParamValue) SELECT 'Password','' WHERE NOT EXISTS(SELECT * FROM Parameters WHERE ParamName='Password')");
                tx.executeSql("INSERT INTO Parameters(ParamName,ParamValue) SELECT 'UserToken','' WHERE NOT EXISTS(SELECT * FROM Parameters WHERE ParamName='UserToken')");
            }); 
    
    
            
} 

function getParamValue(argParamName){
    app.db.transaction(function (tx) {
           tx.executeSql('SELECT ParamValue FROM Parameters WHERE ParamName=?', [argParamName]
                         , function (tx, res) {
         						strResults = res.rows.item(0).ParamValue;
							}
       					,  function(tx, res) {
                               strResults = 'error';
                            }
                        );
        
   });
    return strResults
}
                   
function setParamValue(argParamName, argParamValue){
    app.db.transaction(function (tx) {
          tx.executeSql("UPDATE Parameters SET ParamValue =? WHERE ParamName=?", [argParamValue,argParamName], nullDataHandler, killTransaction);
        //tx.executeSql("UPDATE Parameters SET ParamValue ='http://10.0.20.100/mobileservice' WHERE ParamName='PMWebUrl'");
   });
}
      
function nullDataHandler(transaction, results)   {
   }
   /* This is the error handler */
   function killTransaction(transaction, error) {
    	alert(error.message);
   }



 