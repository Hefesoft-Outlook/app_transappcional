define([
    "kendo",
    "app/services/dataContextAutenticacion"
],
 function (kendo, dataContextAutenticacion) {



     return {
         viewModel: {
             loaded: function loaded() {                 
                  $('#recaudo-definicion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudoReferenciado.html");
                 })
                  
                  $('#recaudo-modalidades').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudoModalidades.html");
                 })
                  
                  $('#recaudo-argumentos').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudoArgumentos.html");
                 })
             },
             login: function login() {
                 var login = app.login_view.viewModel;                
                 
                 
                
                 
                 
                 
                 /*window.kendoApp.showLoading();                 
                 dataContextAutenticacion.login({ email: login.Usuario_Entidad.usuario, clave: login.Usuario_Entidad.password }).then(
                         function (result) {

                             window.kendoApp.hideLoading();

                             if (result.length > 0) {
                                 window.usuarioLogueado = result[0];                                 

                                 /*$("#iconRegistrarVisita").css("visibility", "visible");
                                 $("#iconVisitaNoPlaneada").css("visibility", "visible");

                                 $('#iconLogin').on("click", function () {
                                     window.kendoApp.navigate("#tabstrip-login");
                                 })

                                 $('#iconRegistrarVisita').on("click", function () {
                                     window.kendoApp.navigate("scripts/app/vistas/registroVisitas.html");
                                 })

                                 $('#iconVisitaNoPlaneada').on("click", function () {
                                     window.kendoApp.navigate("scripts/app/vistas/registroVisitasNoPlaneadas.html");
                                 })
                             }
                             else {
                                 $("#iconRegistrarVisita").css("visibility", "hidden");
                                 $("#iconVisitaNoPlaneada").css("visibility", "hidden");
                             }
                         }
                     );*/
                 
             },
             registrarVisitaPlaneada : function(){
                 window.kendoApp.navigate("scripts/app/vistas/registroVisitas.html");
             },
             registrarVisitaNoPlaneada: function () {
                 window.kendoApp.navigate("scripts/app/vistas/registroVisitasNoPlaneadas.html");
             },
             Usuario_Entidad: kendo.observable({
                 usuario: '',
                 password: ''
             })
         }
     };
 });