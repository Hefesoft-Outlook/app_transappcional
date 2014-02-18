define([
    "kendo",
    "app/services/dataContextAutenticacion"
],
 function (kendo, dataContextAutenticacion) {



     return {
         viewModel: {
             loaded: function loaded() {
                 
             },
             login: function login() {
                 window.kendoApp.showLoading();
                 var login = app.login_view.viewModel;
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
                                 })*/
                             }
                             else {
                                 $("#iconRegistrarVisita").css("visibility", "hidden");
                                 $("#iconVisitaNoPlaneada").css("visibility", "hidden");
                             }
                         }
                     );
                 
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