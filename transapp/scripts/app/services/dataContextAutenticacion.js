
define(["kendo", "azure", "q"],
 function (kendo, azure, Q) {

     function login(datos) {
         var client = new WindowsAzure.MobileServiceClient('https://hefesoft-medicament-sales-force.azure-mobile.net/', 'KPtpYTfuLvrhWBkSCcxADFVOmUNleG14'),
         usuarios = client.getTable('usuarios');
         var deferred = Q.defer();
         var query = usuarios.where(datos);
         query.read().then(
             function (result) {                 
                 deferred.resolve(result);
             },
             function (error) {
                 options.error();
             }
         );
         return deferred.promise;
     }

     return {
         login: login
     };
 });