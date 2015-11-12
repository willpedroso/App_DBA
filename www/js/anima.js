// console.log('inicio');
// $(function (){
//     $('#bt1').click(function abre(event){
//        if($("#container_abas").hasClass("container_hide")){

//         console.log('classe é hide');
//           $("#container_abas").addClass("container_show");
//           $("#menu_abas").addClass("div_show");

//           console.log('trocou pra show');
//         }else {}

//     });
// });


    // $('#bt1').click(function fecha(event){
    //    if($("#container_abas").hasClass("container_show")){

    //     console.log('classe é show');
    //       $("#container_abas").addClass("container_hide");
    //       $("#menu_abas").addClass("div_hide");

    //       console.log('trocou pra hide');
    //     }else {}
    // });
$( document ).ready(function() {
  $('#container_abas #bt1').click(function() {
    $('#menu_abas').toggle();
    $(this).parent().toggleClass('container_show');
 });
});



