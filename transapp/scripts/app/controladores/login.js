define([
    "kendo",
    "app/services/dataContextAutenticacion"
],
 function (kendo, dataContextAutenticacion) {
     
     function recaudoReferenciado(){
         $('#recaudo-definicion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/referenciado/recaudoReferenciado.html");
                 })
                  
                  $('#recaudo-modalidades').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/referenciado/recaudoModalidades.html");
                 })
                  
                  $('#recaudo-argumentos').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/referenciado/recaudoArgumentos.html");
                 })
                  
                 $('#recaudo-implementacion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/referenciado/recaudoFuncionamiento.html");
                 })
                 
                 $('#recaudo-tarifas').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/referenciado/recaudoTarifas.html");
                 })
     }

     function recaudoTransporte(){
         $('#recaudo-transporte-definicion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/transporte/recaudoTransporte.html");
                 })
                 
                 $('#recaudo-transporte-modalidades').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/transporte/recaudoModalidadesTransporte.html");
                 })
                 
                 $('#recaudo-transporte-argumentos').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/transporte/recaudoArgumentosTransporte.html");
                 })
                 
                 $('#recaudo-transporte-implementacion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/transporte/recaudoFuncionamientoTransporte.html");
                 })
                  
                 $('#recaudo-transporte-tarifas').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/recaudos/transporte/recaudoTarifasTransporte.html");
                 })
     }
     
     function pagosElectronicos(){
         $('#pagos-electronicos-definicion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/electronicos/Definicion.html");
                 })
                 
                 $('#pagos-electronicos-modalidades').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/electronicos/Modalidades.html");
                 })
                 
                 $('#pagos-electronicos-argumentos').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/electronicos/Argumentos.html");
                 })
                 
                 $('#pagos-electronicos-implementacion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/electronicos/Funcionamiento.html");
                 })
                  
                 $('#pagos-electronicos-tarifas').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/electronicos/Tarifas.html");
                 })
     }
     
     function pagosConfirming(){
         $('#pagos-confirming-definicion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/confirming/Definicion.html");
                 })
                 
                 $('#pagos-confirming-modalidades').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/confirming/Modalidades.html");
                 })
                 
                 $('#pagos-confirming-argumentos').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/confirming/Argumentos.html");
                 })
                 
                 $('#pagos-confirming-implementacion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/confirming/Funcionamiento.html");
                 })
                  
                 $('#pagos-confirming-tarifas').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/confirming/Tarifas.html");
                 })
     }
     
     function pagosCheques(){
         $('#pagos-cheques-definicion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/cheques/Definicion.html");
                 })
                 
                 $('#pagos-cheques-modalidades').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/cheques/Modalidades.html");
                 })
                 
                 $('#pagos-cheques-argumentos').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/cheques/Argumentos.html");
                 })
                 
                 $('#pagos-cheques-implementacion').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/cheques/Funcionamiento.html");
                 })
                  
                 $('#pagos-cheques-tarifas').on("click", function () {
                     window.kendoApp.navigate("scripts/app/vistas/pagos/cheques/Tarifas.html");
                 })
     }

     return {
         viewModel: {
             loaded: function loaded() {                  
                 recaudoReferenciado();
                 recaudoTransporte();
                 pagosElectronicos();
                 pagosConfirming();
                 pagosCheques();
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