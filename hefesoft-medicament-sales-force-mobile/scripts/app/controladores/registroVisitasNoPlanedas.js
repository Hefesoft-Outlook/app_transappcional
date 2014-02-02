define([
    "kendo",
    "azure",
    "q",
    "app/services/dataContextPanelVisitador",
    "app/services/azureMobileServicesGenerico"
],
 function (kendo, azure, Q, dataContextPanelVisitador, azureMobileServicesGenerico) {

     var fecha = new Date();
     fecha.aniofecha = fecha.getFullYear();
     fecha.mesfecha = fecha.getMonth() + 1;
     fecha.diafecha = fecha.getDate();
     var titulo = "Visitas para el dia" + " " + fecha.aniofecha + " " + fecha.mesfecha + " " + fecha.diafecha;
     var item;     
     
     var contactoNoPlaneado = kendo.observable({
         activarRealizarVisita: false,
         nombreRealizarVisita: "Realizar visita",
         onClick: botonOpciones,
         registrarVisita: registrarVisita,
        
     });
     
     
     return {
         viewModel: {
             loaded: function loaded() {
                 $("#endless-scrolling").kendoMobileListView({
                     dataSource: dataContextPanelVisitador.dataSourcePanelVisitador,
                     template: $("#visitas-no-planeadas-template").text(),
                     //filterable: {
                     //    field: "nombre",
                     //    operator: "startswith"
                     //},
                     endlessScroll: true,
                     click: function (e) {
                         item = e.dataItem;
                     }
                 });
             },            
             contactoNoPlaneado: contactoNoPlaneado,
             titulo: titulo
         }
     }

     
     function registrarVisita (e) {
         window.kendoApp.showLoading();
         if (item.contactoRealizado === undefined || item.contactoRealizado === null) {
             $.when(insertarTmVisita()).done(
                    function () {
                        window.kendoApp.hideLoading();
                    }
                 );
         }
         else {
             window.kendoApp.hideLoading();
         }
     }    

     function insertarTmVisita() {
        var deferred = Q.defer();
        var itemInsertar = { idCiclo: window.ciclo = 'D43B7F8D-DB0D-4784-92AC-F62DB01B6041', idUsuario: window.usuarioLogueado.id, nombre: item.nombre, fecha: new Date(), idPanelVisitador: item.id, datosExtra: JSON.stringify(item) };
        azureMobileServicesGenerico.azureMobileClient.addDataAsync("tm_visita_realizada", itemInsertar).then(
            function (result) {
                deferred.resolve(result);
            }
        );
        return deferred.promise;
     }

     function botonOpciones(e) {         
         $("#actionSheetVisitasNoPlaneadasText").text("Realizar visita no programadas");
         $("#actionsheetVisitasNoPlaneadas").data("kendoMobileActionSheet").open();
     }
     
 });