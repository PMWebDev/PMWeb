'use strict';

(function() {
    var app = {
        data: {PMWebUrl:''
              ,PMWebDbId:0
              ,UserToken:''
              
              }
        };

    var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'metro',
                initial: 'components/Home/Home.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function() {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li a.active').removeClass('active');
        currentItem.addClass('active');
    };
	
    app.AppendHeaderToView = function() {
        var ViewsHeader = '<header data-role="header"><div data-role="navbar" style="background-color:#8ebc00"><a class="nav-button" data-align="left" data-role="backbutton" data-icon="arrow-e" style="color:#ffffff;background:#8ebc00"></a><span data-role="view-title" style="color:#ffffff"></span></div></header>'
        $("#divViewsHeader").html(ViewsHeader);
    };
    
    window.app = app;

    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
    
    var argReturnToUrl = ''
    app.openModalMessage = function(msg,returnToUrl){
        argReturnToUrl = returnToUrl;
      	$("#ModalMessage").html(msg);
    	$("#MessageModalView").data("kendoMobileModalView").open();    
    };
    app.closeModalMessage = function(){
    	$("#MessageModalView").data("kendoMobileModalView").close();
        if (argReturnToUrl != ''){
            app.mobileApp.navigate(argReturnToUrl);
        }
    };
    
}());

// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_kendoUiMobileApp
