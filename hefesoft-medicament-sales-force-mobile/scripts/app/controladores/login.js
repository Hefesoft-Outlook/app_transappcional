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
                                 window.kendoApp.navigate("scripts/app/vistas/registroVisitas.html");
                             }
                         }
                     );
                 
             },
             Usuario_Entidad: kendo.observable({
                 usuario: '',
                 password: ''
             })
         }
     };
 });