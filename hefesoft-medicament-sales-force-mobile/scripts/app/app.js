define([
"jQuery", 
"kendo", 
"azure", 
"q",
"app/controladores/utils",
"app/controladores/login",
"app/controladores/registroVisitas",
"app/controladores/registroVisitasNoPlanedas"
], 
function ($, kendo, azure, q, utils, login_view, registroVisitas, registroVisitasNoPlanedas) {
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

            window.convertirDatosExtra = convertirDatosExtra;
            window.mapearNombres = convertirDatosExtra;
            
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
            
            extensionesKendo();
            utils.init(kendoApp);
        };

        return {
            init: init,
            login_view: login_view,            
            registroVisitas: registroVisitas,
            registroVisitasNoPlanedas: registroVisitasNoPlanedas
        };

        function convertirDatosExtra(resultado) {
            for (var i in resultado) {
                try {
                    // Revizarlo
                    while (!(resultado[i].datosExtra instanceof Array)) {
                        if (resultado[i].datosExtra !== undefined && resultado[i].datosExtra !== null) {
                            resultado[i].datosExtra = JSON.parse(resultado[i].datosExtra);
                        }
                        else {
                            break;
                        }
                    }
                } catch (e) {

                }
            }
        };

        function mapearNombres(resultado) {
            for (var i in resultado) {
                try {
                    if (resultado[i].datosExtra.primerNombre === undefined) {
                        if (resultado[i].datosExtra.Nombre !== undefined) {
                            resultado[i]["nombre"] = resultado[i].datosExtra.Nombre;
                            resultado[i]["tipo"] = 2;
                            resultado[i]["tipoNombre"] = "Farmacia";
                        }
                        else {
                            resultado[i]["nombre"] = resultado[i].datosExtra.nombre;
                            resultado[i]["tipo"] = 3;
                            resultado[i]["tipoNombre"] = "Actividad Justificada";
                        }
                    }
                    else {
                        resultado[i]["nombre"] = resultado[i].datosExtra.primerNombre + " " + resultado[i].datosExtra.primerApellido;
                        resultado[i]["tipo"] = 1;
                        resultado[i]["tipoNombre"] = "Medico";
                    }

                    resultado[i]["direccion"] = resultado[i].datosExtra.Direccion;

                } catch (e) {

                }
            }
        };

        function extensionesKendo(){
            var dataSourceExtensions = {
                updateField: function (e) {
                    var ds = this;
                    $.each(ds._data, function (idx, record) {
                        if (record[e.keyField] == e.keyValue) {
                            ds._data[idx][e.updateField] = e.updateValue;
                            //ds.read(ds._data);
                            return false;
                        }
                    });
                },
                existeElemento: function (e) {
                    var ds = this;
                    var resultado = false;
                    $.each(ds._data, function (idx, record) {
                        if (record[e.keyField] == e.keyValue) {
                            resultado = true;
                        }
                    });

                    return resultado;
                }
            };

            $.extend(true, kendo.data.DataSource.prototype, dataSourceExtensions);
        }
});