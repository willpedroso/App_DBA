
var array_Divs= [];

console.log('inicio');
$( document ).ready(function() {

    console.log($(document).width(), $(document).height());
  $('#bt_aba').click(function() {
    console.log('clique aba');
    $('#menu_abas').toggleClass('showme');
    $('#container_abas').toggleClass('container_show');
 });    



// navega entre da tela frequencia a cidadao
$('#bt_frequencia').click(function(){
    //array_Divs = array_Divs[1];
    showTela('#div_frequencia');
    hideTela('#div_busca_inicio');
    console.log(array_Divs);
});

$('#bt_cidadao').click(function(){
    //array_Divs = array_Divs[2];
    showTela('#div_busca_inicio');
     hideTela('#div_frequencia');
    console.log('show div_busca_inicio');
});

$('#bt_login').click(function(){
    hideTela('#div_login');
    showTela('#div_header');
    showTela('#container_abas');
    //showTela('#div_busca_inicio');
     console.log(array_Divs);
});

var transitionsevents = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'; 

    function showTela(tela){
        

        $(tela).removeClass('hideme');
        $(tela).addClass('showme');
        console.log(tela);



        //     if (((UIS.array_Divs.length - 1) == 1) && (UIS.array_Divs[0] === UIS.div_metasObjetivos)) {
        //         //oculta a tela metas por objetivos transição para lista de metas
        //         UIS.div_metasObjetivos.attr("style", "display: none");
        //         //console.log("div_metasObjetivos - none");
        //     }

        //     console.log("Mostra a tela!!");

        //     // Libera uso do click
        //     UIS.aguardaTransicaoTela = false;
        //     console.log("Liberando click!!!");
         }

          function hideTela(tela){
        

        $(tela).removeClass('showme');
        $(tela).addClass('hideme');
        console.log("SHOWTELA(): ");
    }
    

    function voltar(){
        console.log("VOLTAR() - Entrada: ",UIS.array_Divs.length );

        //tela para voltar
        if (array_Divs.length == 1){
             return;
        }else{

            UIS.animandovoltar = true;

            //excluir tela atual da lista
            if (((UIS.array_Divs.length - 1) == 1) && (UIS.array_Divs[0] === UIS.div_metasObjetivos)) {
                //mostra a tela metas por objetivos na volta da lista de metas
                UIS.div_metasObjetivos.attr("style", "display: block");
                console.log("div_metasObjetivos - block");
            }

            UIS.array_Divs[UIS.array_Divs.length -1].removeClass('showme');
            UIS.array_Divs[UIS.array_Divs.length -1].addClass('hideme').one(transitionsevents,function(){

                UIS.array_Divs[UIS.array_Divs.length -1].addClass('box-escondido');
                UIS.array_Divs[UIS.array_Divs.length -1].removeClass('box-ativo');

                UIS.array_Divs.pop();
                console.log("VOLTAR() - Apos pop: ",UIS.array_Divs.length );

                //se clicou voltar de tela de metas para a home, esconde o div container relativo
                if(UIS.array_Divs.length == 1){
                    $('#container_relativo').css({"height":"0"});
                }

                UIS.animandovoltar = false;

            });
        }
        console.log("VOLTAR() - Saida: ",UIS.array_Divs.length );
    }


});





