$(document).ready(function() {
// mostra esconde menu
  $("a.mostra-esconde-menu").click(function(){
      $(".menu_mluv_retratil").toggleClass('esconder');

      if ($(this).text() != "Perfil ▼")
       $(this).text("Perfil ▼")
        else
       $(this).text("Perfil ▲"); 
  }); 
});
