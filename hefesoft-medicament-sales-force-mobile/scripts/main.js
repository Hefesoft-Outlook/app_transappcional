require.config({
    paths: {
        jQuery: "libs/jquery.min",
        //kendo: "libs/kendo.mobile.min",
        kendo: "libs/kendo.all.min",
        azure : "libs/MobileServices.Web-1.1.0.min",
        q : "libs/q"
    },
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        kendo: {
            deps: ["jQuery"],
            exports: "kendo"
        },
        azure: {
            deps: ["jQuery"],
            exports: "azure"
        },
        q: {
            deps: ["jQuery"],
            exports: "Q"
        }
    }
});

var app;
 
require(["app/app"], function (application) {
    app = application;
    app.init();    
});