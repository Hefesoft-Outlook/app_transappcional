

define(["kendo", "azure", "q"],
 function (kendo, azure, Q) {

     var azureMobileClient = {};
     azureMobileClient.isLoggedIn = false;
     azureMobileClient.azureError = "";
     azureMobileClient.azureMSC = new WindowsAzure.MobileServiceClient('https://hefesoft-medicament-sales-force.azure-mobile.net/', 'KPtpYTfuLvrhWBkSCcxADFVOmUNleG14');
     var deferred = Q.defer();
     var client = new WindowsAzure.MobileServiceClient('https://hefesoft-medicament-sales-force.azure-mobile.net/', 'KPtpYTfuLvrhWBkSCcxADFVOmUNleG14');

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