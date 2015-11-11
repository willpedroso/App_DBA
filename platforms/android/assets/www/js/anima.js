// anima abertura abas

var bt1 =  document.getElementById('bt1');
bt1.addEventListener('touchend',cliqueaba );

var container = document.getElementById('container_abas');

  function cliqueaba(event){
    console.log("CLICK",container.className);

    if(event.target.id =='bt1'){
        document.getElementById("menu_abas").setAttribute("class","div_show");
      }

      if(container.className == 'container_hide'){
        document.getElementById("container_abas").setAttribute("class","container_show");
    }else{
        document.getElementById("container_abas").setAttribute("class","container_hide");
    }
     console.log(container.className)

    if(container.className == 'container_hide'){
        document.getElementById("menu_abas").setAttribute("class","div_show");
      }