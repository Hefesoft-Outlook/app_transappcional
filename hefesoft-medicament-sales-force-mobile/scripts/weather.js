(function (global) {
    var WeatherViewModel,
        app = global.app = global.app || {};

    WeatherViewModel = kendo.data.ObservableObject.extend({
        weatherDataSource: null,

        init: function () {
            var that = this,
                dataSource;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            dataSource = new kendo.data.DataSource({
              transport: {
                read: function(options) {
                  dataSourceRead(options);                  
                }
              }
            });
            dataSource.fetch(function() {
              console.log(dataSource.view().length); // displays "77"
            });

            that.set("weatherDataSource", dataSource);
        }
    });
    
    function dataSourceRead(options){        
        var client = new WindowsAzure.MobileServiceClient('https://hefesoft-medicament-sales-force.azure-mobile.net/', 'KPtpYTfuLvrhWBkSCcxADFVOmUNleG14'),
        todoItemTable = client.getTable('tm_visita_realizada');        
         var deferred = Q.defer();
        
        var query = todoItemTable;
        query.read().then(         
            function(result){
              options.success(result);
              deferred.resolve(result);
            },
            function(error){
              options.error();  
            }
        );
        return deferred.promise;
    }    

    app.weatherService = {
        viewModel: new WeatherViewModel()
    };
})(window);