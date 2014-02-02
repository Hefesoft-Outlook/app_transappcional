
define([
    "kendo",
    "azure",
    "q",
    "app/services/azureMobileServicesGenerico"
],
 function (kendo, azure, Q, azureMobileServicesGenerico) {

     var dataSourcePanelVisitador = new kendo.data.DataSource({
         transport: {
             read: function (options) { dataSourceRead(options); }         
         },         
         serverPaging: true,
         serverFiltering: true,
         serverSorting: true,
         pageSize: 50
            ,schema: {               
                total: function (response) {
                    return response.totalCount; // total is returned in the "total" field of the response
                },
                model: {
                    id: "id",
                    fields: {
                        id: { editable: false, validation: { required: false } },
                        nombre: { field: "nombre", type: "string", validation: { required: true } },
                        contactosCiclo: { field: "contactosCiclo", type: "numeric", validation: { required: true } },
                        contactosPendientes: { field: "contactosPendientes", type: "numeric", validation: { required: true } },
                        direccion: { field: "direccion", type: "string", validation: { required: true } },
                        tipoNombre: { field: "tipoNombre", type: "string", validation: { required: true } },
                    }
                }
            },
     });
     

     function dataSourceRead(options) {
         var deferred = Q.defer();
         var customParameter = new Object();

         if (options.data.sort === undefined) {
             options.data.sort = new Array();
             options.data.sort.push({ dir: 'asc', field: 'nombre' });
         }

         if (options.data.filter === undefined) {
             options.data.filter = new Object();
             options.data.filter.filters = new Array();
         }
         else
         {
             try {
                 customParameter.esprocedimiento = 1;
                 customParameter.elementoBuscar = options.data.filter.filters[0].value;
                 customParameter.take = options.data.take;
                 customParameter.skip = options.data.skip;

                 customParameter.idCiclo = window.ciclo;
                 customParameter.idUsuario = window.usuarioLogueado.idAntiguo;

                 options.data.filter.filters = new Array();
             } catch (e) {
                 if (options.data.filter === undefined || options.data.filter == null) {
                     options.data.filter = new Object();
                     options.data.filter.filters = new Array();
                 }
                 customParameter = undefined;
             }
             
         }
         
         
         

         options.data.filter.filters.push({ field: "idCiclo", value: window.ciclo });
         options.data.filter.filters.push({ field: "idUsuario", value: window.usuarioLogueado.idAntiguo });

         azureMobileServicesGenerico.azureMobileClient.getDataFilterskip('TM_Panel_Visitador', options.data.filter, options.data.take, options.data.skip, options.data.sort, customParameter).then(
                 function (result) {
                     window.convertirDatosExtra(result);
                     window.mapearNombres(result);
                     deferred.resolve(result);
                     try {
                         options.success(result);
                     } catch (e) {
                         alert(e);
                     }
                     
                 },
                 function (error) {
                     deferred.reject(error);
                 }
             );

         return deferred.promise;
     }



     return {
         dataSourcePanelVisitador: dataSourcePanelVisitador         
     };
 });