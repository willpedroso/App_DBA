/*----------------
*
* ---- MODULO :PageManager
*
-----------------*/

var PageManager = (function(window,document,$){
    
    //guarda referencia dos tempates
    var arrTempls ={};

    //carrega um template
    //passar apenas o nome do arquivo
    //o form deve ficar dentro de um div e o id deve ser o mesmo do nome do arquivo 
    function loadTmpl(tmpl){

        //template exist?
        if(arrTempls[tmpl]){
            //console.log('YEP')
            showTmpl(tmpl);
        }else{
            //console.log('NOP')
            arrTempls[tmpl] = true;
            loadTmplFromFile(tmpl);
        }
    }

    //carrega o template de uma URL local ou web
    function loadTmplFromFile(tmpl){

       $.ajax({url: (tmpl+'.html'), success: function(result){
            
            //container que inserimos o conteudo
            $('#div_conteudo').append(result);
            
            //mostra o template
            showTmpl(tmpl);

        }});
    }


    function showTmpl(tmpl){

        //loop pelos templates
         for( var tmplName in arrTempls){
            //console.log(tmplName);
            if(tmplName == tmpl){
                //mostra o div
                //console.log('mostrar: ',tmplName,tmpl)
                $('#'+tmplName).show();
            }else{
                //esconde o div
                //console.log('esconde: ',tmplName,tmpl)
                $('#'+tmplName).hide();
            }
        }
    }

//==>> Public methods
    return {
        loadTmpl : loadTmpl,
        loadTmplFromFile: loadTmplFromFile,
        showTmpl:showTmpl
    };
//passa estes itens para o modulo 
})(window, document,jQuery);