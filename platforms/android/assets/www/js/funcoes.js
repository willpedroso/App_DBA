// JavaScript Document
$(document).ready(function(){
	
	//CheckBox Personalizado
	$(".checkbox .check").click(function(){
		$(this).toggleClass('active');		
		if($(this).hasClass('active')){
			$(this).parent().find('.valueCheck').val('checked');
		}
		else{
			$(this).parent().find('.valueCheck').val('');
		}
	});
	
	//RadioButton Personalizado
	var valRadio = '';
	$(".radioButton .radio").click(function(){
		$(this).addClass('active');		
		if($('.radioButton .radio').hasClass('active')){
			$('.radioButton .radio').removeClass('active');	
			$(this).addClass('active');
			valRadio = $(this).attr('title');
			$(this).parent().find('.valueCheck').val(valRadio);
		}
		else{
			$(this).parent().find('.valueCheck').val('');
		}
	});
	
	//Slider Range
	$(function() {
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 1000,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "R$" + ui.values[ 0 ] + " - R$" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).val( "R$" + $( "#slider-range" ).slider( "values", 0 ) +
			" - R$" + $( "#slider-range" ).slider( "values", 1 ) );
	});
	$(".onoffswitch-label").click(function(){
		$(this).toggleClass('active');		
		if($(this).hasClass('active')){
			$(this).parent().find('.onoffswitch-checkbox').val('sim');
		}
		else{
			$(this).parent().find('.onoffswitch-checkbox').val('nao');
		}
	});
	
	//SELECT Personalizado
	$(".selectInicial").click(function(){
		$(this).next('ul').slideToggle('fast');
	});
	var valorLi = "";
	$(".selectPersonalizado li").click(function(){
		$(".selectPersonalizado").slideUp();
		valorLi = $(this).html();
		$(this).parent().parent().find('.selectInicial').text(valorLi);
		$(this).parent().next().val(valorLi);
	});
	
	
	//ADICIONA OBS INPUT
	$( document ).on( "click", ".btnAdicionaInput", function() {
		var d = new Date();
		//$(this).blur();
		var idobj =  d.getTime();
		
		if($('input.adicionaObs').val()  == ''){
			alert("Preencha o campo Observações Rápidas");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaObs").val()+'" name="observacao[]" class="inputAdiciona" disabled id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInput').append(	html2insert);
			$('input.adicionaObs').val('');
		}

		
	});



	//ADICIONA OBS CERTIDOES
	$( document ).on( "click", ".btnAdicionaInputCertidao", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if($('input.adicionaObsCertidao').val()  == '' || $('.selectCertidao').text() == 'Selecione'){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".selectCertidao").text()+'" name="observacao[]" class="inputAdicionaCertidaoSelect" disabled id="input_'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaObsCertidao").val()+'" name="observacao[]" class="inputAdicionaCertidao" disabled id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputCertidao').append(	html2insert);
			$('input.adicionaObsCertidao').val('');
			$('.selectCertidao').text('Selecione');
		}

		
	});
	
	//ADICIONA PROVIDENCIA
	$( document ).on( "click", ".btnAdicionaInputProvidencia", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if($('input.adicionaObsProvidencia').val()  == '' || $('.selectProvidencia').text() == 'Selecione'){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaObsProvidencia").val()+'" name="observacao[]" class="inputAdicionaProvidenciaSelect" disabled id="input_'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaObsProvidenciaPeq").val()+'" name="observacao[]" class="inputAdicionaProvidencia" disabled id="input_'+idobj+'">'+
			'<textarea name="observacao[]" class="textareaAdicionaProvidencia" disabled id="input_'+idobj+'">' + $(".textareaProvidencia").val() + '</textarea>'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputProvidencia').append(	html2insert);
			$('input.adicionaObsProvidencia').val('');
			$('input.adicionaObsProvidenciaPeq').val('');
			$('textarea.textareaProvidencia').val('');
		}
		
	});


	//ADICIONA DROGAS
	$( document ).on( "click", ".btnAdicionaInputDrogas", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if($('input.adicionaDrogas').val()  == ''){
			alert("Preencha os campos corretamente");
		}
		else{
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaDrogas").val()+'" name="observacao[]" class="inputAdicionaQualDroga" disabled id="input_'+idobj+'">'+
			'<div class="inputsTempo">'+
			'<input type="text" value="'+(($("#diasFazUsoCrackLabel").text() == 'Dias')? '-':$("#diasFazUsoCrackLabel").text()) +'" name="observacao[]" class="inputAdicionaDrogasTempo" disabled id="input_'+idobj+'">'+
			'<input type="text" value="'+(($("#mesesFazUsoCrackLabel").text() == 'Meses')? '-':$("#mesesFazUsoCrackLabel").text())+'" name="observacao[]" class="inputAdicionaDrogasTempo" disabled id="input_'+idobj+'">'+
			'<input type="text" value="'+(($("#anosFazUsoCrackLabel").text() == 'Anos')? '-':$("#anosFazUsoCrackLabel").text())+'" name="observacao[]" class="inputAdicionaDrogasTempo" disabled id="input_'+idobj+'">'+
			'</div>'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';

			$('.adicionaInputDrogas').append(	html2insert);
			$('input.adicionaDrogas').val('');
			$('#diasFazUsoCrackLabel').text('Dias');
			$('#mesesFazUsoCrackLabel').text('Meses');
			$('#anosFazUsoCrackLabel').text('Anos');
		}
		
	});

	
	//MENU FIXO
	$( document ).on( "click", ".menuFixo .abreMenu", function() {
		$(this).next().slideToggle();
	});
	
	$(window).scroll(function() {
		var height = $(window).scrollTop();
	
		if(height  > 300) {
			$('.menuFixo').addClass('fixed');
		}
		else{
			$('.menuFixo').removeClass('fixed')
		}
	});

	//TABLE
	$("tr:odd").css("background-color", "#eeeeee");
	$("tr:even").css("background-color", "#f9f9f9");
	
	//BANDEIRA
	$(".icoBandeira").on("click", function() {
		$(this).parent().parent().toggleClass('active');
		$(this).toggleClass('active');
		$(this).parent().parent().find('.bandeiraon').toggle();
		return false;
	});
	
	//INCREMENTER INPUT
	$(function() {
	
	  $(".buttonInc").on("click", function() {
	
		var $button = $(this);
		var oldValue = $button.parent().find(".partridge").val();
	
		if ($button.text() == "+") {
		  var newVal = parseFloat(oldValue) + 1;
		} else {
		   // Don't allow decrementing below zero
		  if (oldValue > 0) {
			var newVal = parseFloat(oldValue) - 1;
			} else {
			newVal = 0;
		  }
		  }
	
		$button.parent().find(".partridge").val(newVal);
	
	  });
	
	});

});


function removeMe(obl){
	console.log("remove")
	$("#"+obl).remove();	
}