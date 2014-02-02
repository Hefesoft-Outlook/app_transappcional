define([
"jQuery", 
"kendo", 
"azure", 
"q",
"app/controladores/utils",
"app/controladores/login",
"app/controladores/registroVisitas"
], 
function ($, kendo, azure, q, utils, login_view, registroVisitas) {
        var global = window;
        var mobileSkin = "",
            app = global.app = global.app || {};

        document.addEventListener('deviceready', function () {
            navigator.splashscreen.hide();
            $(document.body).height(window.innerHeight);
        }, false);        

        var _onError = function (error, url, line) {            
            utils.showError(error);
        };

        var init = function () {
            window.onerror = _onError;

            window.kendoApp = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
            window.ciclo = 'D43B7F8D-DB0D-4784-92AC-F62DB01B6041';
            window.azureCliente = new WindowsAzure.MobileServiceClient('https://hefesoft-medicament-sales-force.azure-mobile.net/', 'KPtpYTfuLvrhWBkSCcxADFVOmUNleG14');
            
            app.changeSkin = function (e) {
                if (e.sender.element.text() === "Flat") {
                    e.sender.element.text("Native");
                    mobileSkin = "flat";
                }
                else {
                    e.sender.element.text("Flat");
                    mobileSkin = "";
                }

                app.application.skin(mobileSkin);
            };
            
            utils.init(kendoApp);
        };

        return {
            init: init,
            login_view: login_view,            
            registroVisitas : registroVisitas
        };
});