
define(["kendo", "azure", "q"],
 function (kendo, azure, Q) {

     var dataSource = new kendo.data.DataSource({
         transport: {
             read: function (options) {
                 dataSourceRead(options);
             }
         }
     });
     dataSource.fetch(function () {
         console.log(dataSource.view().length); // displays "77"
     });

     function dataSourceRead(options) {
         var client = new WindowsAzure.MobileServiceClient('https://hefesoft-medicament-sales-force.azure-mobile.net/', 'KPtpYTfuLvrhWBkSCcxADFVOmUNleG14'),
         todoItemTable = client.getTable('tm_visita_planeada');
         var deferred = Q.defer();

         var query = todoItemTable;
         query.read().then(
             function (result) {
                 options.success(result);
                 deferred.resolve(result);
             },
             function (error) {
                 options.error();
             }
         );
         return deferred.promise;
     }



     return {
         dataSource: dataSource
     };
 });