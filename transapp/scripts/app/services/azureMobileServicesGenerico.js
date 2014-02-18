

define(["kendo", "azure", "q"],
 function (kendo, azure, Q) {

     var azureMobileClient = {};
     azureMobileClient.isLoggedIn = false;
     azureMobileClient.azureError = "";
     azureMobileClient.azureMSC = new WindowsAzure.MobileServiceClient('https://hefesoft-medicament-sales-force.azure-mobile.net/', 'KPtpYTfuLvrhWBkSCcxADFVOmUNleG14');
     var deferred = Q.defer();
     var client = new WindowsAzure.MobileServiceClient('https://hefesoft-medicament-sales-force.azure-mobile.net/', 'KPtpYTfuLvrhWBkSCcxADFVOmUNleG14');


     azureMobileClient.getDataFilterskip = function (tableName, data, numberRows, skipNumber, sort, customParameter) {

         var todoItemTable = client.getTable(tableName).includeTotalCount().skip(skipNumber).take(numberRows);
         var query = todoItemTable;
         

         if (data !== undefined && data != null) {
             var filtros = new Object();
             for (var iterador in data.filters) {
                 filtros[data.filters[iterador].field] = data.filters[iterador].value;
             }
             query.where(filtros);
         }

         if (sort !== undefined && sort != null) {
             for (var iterador in sort) {
                 var sortItem = sort[iterador].field;
                 var dir = sort[iterador].dir;
                 break;
             }

             if (dir === 'asc') {
                 query.orderBy(sortItem);
             }
             else {
                 query.orderByDescending(sortItem);
             }
         }

         if (customParameter === undefined) {
             return query.read();
         } else {
             return query.read(customParameter);
         }


         
     };

     azureMobileClient.updateDataAsync = function (tableName, data) {

         var todoItemTable = client.getTable(tableName);
         var query = todoItemTable;        

         query.update(data)
         .done(function (result) {
             deferred.resolve(result);
         }, function (err) {
             deferred.reject(err);
         });

         return deferred.promise;
     };

     azureMobileClient.addDataAsync = function (tableName, data) {
         var todoItemTable = client.getTable(tableName);
         var query = todoItemTable;
         query.insert(data)
         .done(function (result) {
             deferred.resolve(result);
         }, function (err) {
             deferred.reject(err);
         });

         return deferred.promise;
     };


     return {
         azureMobileClient: azureMobileClient
     };
 });