define([
    "kendo",
    "azure",
    "q",
    "app/services/dataContextVisitaPlaneada",
    "app/services/azureMobileServicesGenerico"
],
 function (kendo, azure, Q, dataContextVisitaPlaneada, azureMobileServicesGenerico) {

     var fecha = new Date();
     fecha.aniofecha = fecha.getFullYear();
     fecha.mesfecha = fecha.getMonth() + 1;
     fecha.diafecha = fecha.getDate();
     var titulo = "Visitas para el dia" + " " + fecha.aniofecha + " " + fecha.mesfecha + " " + fecha.diafecha;
     var item;
     
     var contactoRealizado = kendo.observable({
         activarRealizarVisita: false,
         nombreRealizarVisita: "Realizar visita",
         onClick: botonOpciones,
         registrarVisita: registrarVisita
     });
     
     
     return {
         viewModel: {
             loaded: function loaded() {

             },            
             contactoRealizado: contactoRealizado,             
             dataSource: dataContextVisitaPlaneada.dataSource,
             titulo: titulo             
         }
     }

     
     function registrarVisita (e) {
         window.kendoApp.showLoading();
         if (item.contactoRealizado === undefined || item.contactoRealizado === null) {
             $.when(actualizartm_visita_planeada(), insertarTmVisita()).done(
                    function () {
                        window.kendoApp.hideLoading();
                    }
                 );
         }
         else {
             window.kendoApp.hideLoading();
         }
     }

     function actualizartm_visita_planeada() {
        var deferred = Q.defer();
        item["contactoRealizado"] = true;
        azureMobileServicesGenerico.azureMobileClient.updateDataAsync("tm_visita_planeada", item).then(
            function (result) {
                deferred.resolve(result);
            }
        );
        return deferred.promise;
     }

     function insertarTmVisita() {
        var deferred = Q.defer();
        var itemInsertar = { idCiclo: window.ciclo = 'D43B7F8D-DB0D-4784-92AC-F62DB01B6041', idUsuario: window.usuarioLogueado.id, nombre: item.nombre, fecha: new Date(), idPanelVisitador: item.id, datosExtra: JSON.stringify(item) };
        azureMobileServicesGenerico.azureMobileClient.addDataAsync("tm_visita_realizada", item).then(
            function (result) {
                deferred.resolve(result);
            }
        );
        return deferred.promise;
     }

     function botonOpciones(e) {
         item = e.data;
         if (item.contactoRealizado != undefined) {                 
             nombreRealizarVisita = "Visita ya realizada";
         }
         else {                 
             nombreRealizarVisita = "Realizar visita";
         }
         $("#actionSheetRegistrarVisitaText").text(nombreRealizarVisita);
         $("#actionsheet").data("kendoMobileActionSheet").open();
     }

     
     
 });