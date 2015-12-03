// JavaScript Document
$(document).ready(function(){
	

  /* FIM - RADIO SITUACAO CADASTRAL */
  
  
  /* INICIO - RADIO PRIORIDADE */
  var valRadio = '';
  jQuery("#infoPrioridade > .radio").click(function(){
    jQuery(this).addClass('active');    
    if(jQuery('#infoPrioridade > .radio').hasClass('active')){
      jQuery('#infoPrioridade > .radio').removeClass('active'); 
      jQuery(this).addClass('active');
      valRadio = jQuery(this).attr('title');
      jQuery(this).parent().find('#prioridade').val(valRadio);
    }
    else{
      jQuery(this).parent().find('#prioridade').val('');
    }
  });
  /* FIM - RADIO PRIORIDADE */
  
  
  /* INICIO - RADIO PROGRAMA DBA */
  var valRadio = '';
  jQuery("#infoProgramaDba .radio").click(function(){
  	if ($( "input:radio[name=infoProgramaDba]:checked" ).val() == "Sim")
	{
		jQuery('#localAcolhida').attr('style','display:block');
	}
	else{
		jQuery('#localAcolhida').attr('style','display:none');
	}

  });
  /* FIM - RADIO PROGRAMA DBA */
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
			'<input type="text" value="'+$(".adicionaObs").val()+'" name="observacao[]" class="inputAdiciona" readonly id="input_'+idobj+'">'+
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
			'<input type="text" value="'+$(".selectCertidao").text()+'" name="input_'+idobj+'" class="inputAdicionaCertidaoSelect" readonly id="input_'+idobj+'">'+
			'<input type="hidden" value="'+$("#tipo_certidao_id").val()+'" name="tipo_certidao_id[]">'+
			'<input type="text" value="'+$(".adicionaObsCertidao").val()+'" name="input_'+idobj+'" class="inputAdicionaCertidao" readonly id="input_'+idobj+'">'+
			'<input type="hidden" value="'+$(".adicionaObsCertidao").val()+'" name="numero_certidao[]">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputCertidao').append(	html2insert);
			$('input.adicionaObsCertidao').val('');
			$('.selectCertidao').text('Tipo');
		}

		
	});
	
	
	
	//ADICIONA DROGAS ALEM DO CRACK
	$( document ).on( "click", ".btnAdicionaInputDrogasAlemCrack", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaDrogasAlemCrack').val()  == '' ){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaDrogasAlemCrack").val()+'" name="descricao_drogas_alem_crack[]" class="inputAdicionaDrogasAlemCrack" readonly id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputDrogasAlemCrack').append(	html2insert);
			$('input.adicionaDrogasAlemCrack').val('');
		}

		
	});
	
	
	
	//ADICIONA ESPECIALIDADE CONSULTA HOJE
	$( document ).on( "click", ".btnAdicionaInputEspecialidade", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaEspecialidade').val()  == '' ){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaEspecialidade").val()+'" name="especialidades_consulta_hoje[]" class="inputAdicionaEspecialidade" readonly id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputEspecialidadeConsulta').append(	html2insert);
			$('input.adicionaEspecialidade').val('');
		}
	});
	
	
	
	//ADICIONA USOU DROGA HOJE
	$( document ).on( "click", ".btnAdicionaInputDrogaHoje", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaDrogaHoje').val()  == '' ){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaDrogaHoje").val()+'" name="usou_drogas_hoje[]" class="inputAdicionaDrogaHoje" readonly id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputDrogaHoje').append(	html2insert);
			$('input.adicionaDrogaHoje').val('');
		}
	});
	
	
	
	//ADICIONA OFICINA PARTICIOU
	$( document ).on( "click", ".btnAdicionaInputOficinaParticiou", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaQualOficina').val()  == '' || $('input.adicionaLocalOficina').val()  == '' ){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaQualOficina").val()+'" name="qual_oficina_particiou[]" class="inputAdicionaQualOficinaParticiou" readonly id="input_'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaLocalOficina").val()+'" name="local_oficina_particiou[]" class="inputAdicionaLocalOficinaParticiou" readonly id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputOficinasParticipou').append(	html2insert);
			$('input.adicionaQualOficina').val('');
			$('input.adicionaLocalOficina').val('');
		}
	});
	
	//ADICIONA ATIVIDADE PARTICIOU
	$( document ).on( "click", ".btnAdicionaInputAtividadeParticiou", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaQualAtividade').val()  == '' || $('input.adicionaLocalAtividade').val()  == '' ){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaQualAtividade").val()+'" name="qual_atividade_particiou[]" class="inputAdicionaQualAtividadeParticiou" readonly id="input_'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaLocalAtividade").val()+'" name="local_atividade_particiou[]" class="inputAdicionaLocalAtividadeParticiou" readonly id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputAtividadesParticipou').append(	html2insert);
			$('input.adicionaQualAtividade').val('');
			$('input.adicionaLocalAtividade').val('');
		}
	});
	
	
	//ADICIONA CONTATO
	$( document ).on( "click", ".btnAdicionaInputContato", function() {
		var d = new Date();
		var idobj =  d.getTime();
		//if($('input.adicionaNumContato').val()  == '' || $('.selectDispositivoContato').text() == 'Selecione'){
		if($('input.adicionaNumContato').val()  == '' || $('#tipoDispositivoContato').val() == 'Selecione'){
			alert("Preencha os campos corretamente");
		}
		else{
			
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$("#tipoDispositivoContato")[0].options[$("#tipoDispositivoContato")[0].selectedIndex].value+'" name="input_'+idobj+'" class="inputAdicionaContatoSelect" readonly id="input_'+idobj+'">'+
			'<input type="hidden" value="'+$("#tipo_dispositivo_contato_id").val()+'" name="tipo_dispositivo_contato_id[]">'+
			'<input type="text" value="'+$(".adicionaNumContato").val()+'" name="input_'+idobj+'" class="inputAdicionaContato" readonly id="input_'+idobj+'">'+
			'<input type="hidden" value="'+$(".adicionaNumContato").val()+'" name="numero_descricao[]">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputContato').append(	html2insert);
			$('input.adicionaNumContato').val('');
			$("select#tipoDispositivoContato").prop('selectedIndex', 0);
			//$('#tipoDispositivoContato').val('');
		}
	});
	
	
	//ADICIONA CONTATO familiar
	$( document ).on( "click", ".btnAdicionaInputContatoFamiliar", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if($('input.adicionaNumContatoFamiliar').val()  == '' || $('.selectTipoParente').text() == 'Selecione'){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".selectTipoParente").text()+'" name="input_'+idobj+'" class="inputAdicionaContatoSelect" readonly id="input_'+idobj+'">'+
			'<input type="hidden" value="'+$("#tipo_parentesco_id").val()+'" name="tipo_familiar[]">'+
			'<input type="text" value="'+$(".adicionaNumContatoFamiliar").val()+'" name="input_'+idobj+'" class="inputAdicionaContato" readonly id="input_'+idobj+'">'+
			'<input type="hidden" value="'+$(".adicionaNumContatoFamiliar").val()+'" name="numero_familiar[]">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputContatoFamiliar').append(	html2insert);
			$('input.adicionaNumContatoFamiliar').val('');
			$('input.tipo_parentesco_id').val('');
			$('.selectTipoParente').text('Tipo');
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
			'<input type="text" value="'+$(".adicionaDrogas").val()+'" name="drogas_faz_uso[]" class="inputAdicionaQualDroga" readonly id="input_'+idobj+'">'+
			'<div class="inputsTempo">'+
			'<input type="text" value="'+(($("#diaDrogasFazUsoLabel").text() == 'Dias')? '':$("#diaDrogasFazUsoLabel").text()) +'" name="dias_drogas_faz_uso[]" class="inputAdicionaDrogasTempo" readonly id="input_'+idobj+'">'+
			'<input type="text" value="'+(($("#mesesDrogasFazUsoLabel").text() == 'Meses')? '':$("#mesesDrogasFazUsoLabel").text())+'" name="meses_drogas_faz_uso[]" class="inputAdicionaDrogasTempo" readonly id="input_'+idobj+'">'+
			'<input type="text" value="'+(($("#anosDrogasFazUsoLabel").text() == 'Anos')? '':$("#anosDrogasFazUsoLabel").text())+'" name="anos_drogas_faz_uso[]" class="inputAdicionaDrogasTempo" readonly id="input_'+idobj+'">'+
			'</div>'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';

			$('.adicionaInputDrogas').append(	html2insert);
			$('input.adicionaDrogas').val('');
			$('#diaDrogasFazUsoLabel').text('Dias');
			$('#mesesDrogasFazUsoLabel').text('Meses');
			$('#anosDrogasFazUsoLabel').text('Anos');
		}
	});
	
	
	
	//ADICIONA CONTATO EMPRESA
	$( document ).on( "click", ".btnAdicionaInputContatoEmpresa", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if($('input.adicionaNumContatoEmpresa').val()  == '' || $('.selectDispositivoContatoEmpresa').text() == 'Selecione'){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$("#tipoDispositivoEmpresa")[0].options[$("#tipoDispositivoEmpresa")[0].selectedIndex].value+'" name="input_'+idobj+'" class="inputAdicionaContatoEmpresaSelect" readonly id="input_'+idobj+'">'+
			'<input type="hidden" value="'+$("#tipo_dispositivo_contato_empresa_id").val()+'" name="tipo_dispositivo_contato_empresa_id[]">'+
			'<input type="text" value="'+$(".adicionaNumContatoEmpresa").val()+'" name="input_'+idobj+'" class="inputAdicionaContatoEmpresa" readonly id="input_'+idobj+'">'+
			'<input type="hidden" value="'+$(".adicionaNumContatoEmpresa").val()+'" name="numero_descricao_empresa[]">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputContatoEmpresa').append(	html2insert);
			$('input.adicionaNumContatoEmpresa').val('');
			$("select#tipoDispositivoEmpresa").prop('selectedIndex', 0);
			//$('.selectDispositivoContatoEmpresa').text('Tipo');
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
			'<input type="text" value="'+$(".adicionaObsProvidencia").val()+'" name="tipo_providencia[]" class="inputAdicionaProvidenciaSelect" readonly id="input_'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaObsProvidenciaPeq").val()+'" name="status_providencia[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
			'<textarea name="observacao_providencia[]" class="textareaAdicionaProvidencia" readonly id="input_'+idobj+'">' + $(".textareaProvidencia").val() + '</textarea>'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputProvidencia').append(	html2insert);
			$('input.adicionaObsProvidencia').val('');
			$('input.adicionaObsProvidenciaPeq').val('');
			$('textarea.textareaProvidencia').val('');
		}

		
	});
	
	
	
	//ADICIONA ACOMPANHAMENTO/CADASTRO UBS
	$( document ).on( "click", ".btnAdicionaInputUbs", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaQualUbsSaude').val()  == '' || $('input.adicionaTecnicoReferenciaUbsSaude').val() == '' ){
			alert("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaQualUbsSaude").val()+'" name="nome_ubs[]" class="inputAdicionaProvidenciaSelect" readonly id="input_'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaTecnicoReferenciaUbsSaude").val()+'" name="tecnico_referencia_ubs[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
			'<textarea name="especialidade_ubs[]" class="textareaAdicionaEspecialidadeUbs " readonly id="input_'+idobj+'">' + $(".textareaEspecialidadeUbsSaude").val() + '</textarea>'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputUbsSaude').append(	html2insert);
			$('input.adicionaQualUbsSaude').val('');
			$('input.adicionaTecnicoReferenciaUbsSaude').val('');
			$('textarea.textareaEspecialidadeUbsSaude').val('');
		}

		
	});
	
	
	
	//ADICIONA INTERNACAO
	$( document ).on( "click", ".btnAdicionaInputInternacao", function() {
		var d = new Date();
		var idobj =  d.getTime();
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaQuantasVezesInternado").val()+'" name="quantidade_internacao[]" class="inputAdicionaProvidenciaSelect" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaLocalInternacao").val()+'" name="local_internacao[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
		'<textarea name="motivo_internacao[]" class="textareaAdicionaInternacao " readonly id="input_'+idobj+'">' + $(".textareaMotivoInternacao").val() + '</textarea>'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputInternacao').append(	html2insert);
		$('input.adicionaQuantasVezesInternado').val('');
		$('input.adicionaLocalInternacao').val('');
		$('textarea.textareaMotivoInternacao').val('');
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

	//abre input orientação sexual
	jQuery("#infoOrientacaoSexual .radio").click(function(){
		if ($( "input:radio[name=infoOrientacaoSexual]:checked" ).val() == "Sim")
		{
		jQuery('#orientacaoSexual').show();

		}
		else{
		jQuery('#orientacaoSexual').hide();

		}

});

	//abre input quantos filhos
	jQuery("#temFilho .radio").click(function(){
		if ($( "input:radio[name=temFilho]:checked" ).val() == "Sim")
		{
		
		jQuery('#qtdFilho').show();

		}
		else{
		
		jQuery('#qtdFilho').hide();

		}

});

	//abre input qual familiar
	jQuery("#infoTemContatoFamilia .radio").click(function(){
		if ($( "input:radio[name=infoTemContatoFamilia]:checked" ).val() == "Sim")
		{
		jQuery('#contatoFamilia').show();	
		jQuery('#qualFamiliar').show();

		}
		else{
		jQuery('#contatoFamilia').hide();
		jQuery('#qualFamiliar').hide();

		}

});

	//abre input qual deficiencia
	jQuery("#possui_deficiencia .radio").click(function(){
		if ($( "input:radio[name=possui_deficiencia]:checked" ).val() == "Sim")
		{
		jQuery('#quaisDeficiencias').show();	

		}
		else{
		jQuery('#quaisDeficiencias').hide();

		}

});

});





function salvarFormSituacaoDba()
{
  var flag = true;
  if ( jQuery('#programa_dba').val() == '1' && jQuery('#ponto_servico_id').val() == '' )
  {
    jQuery('#localAcolhidaLabel').addClass('inputFocus');
    flag = false;
  }
  else
    jQuery('#localAcolhidaLabel').removeClass('inputFocus');
    
    
  if ( flag )
  {
    jQuery('#formSituacaoDba').submit();
    return true;
  }
  else
  {
    jQuery('.msgAtencao').removeAttr('style');
    jQuery('.msgParabens').attr('style', 'display:none');
    jQuery('.msgErro').attr('style', 'display:none');
    return false;
  }
}

function removeMe(obl){
	console.log("remove")
	$("#"+obl).remove();	
}

function infoSitDba(){
	/* INICIO - RADIO SITUACAO CADASTRAL */
	jQuery("#infoSituacaoDba .radio").click(function(){
		if ($( "input:radio[name=infoSituacaoDba]:checked" ).val() == "Ativo")
		{
			jQuery('#motivoInativacao').hide();
	        jQuery('#autorizaDba').show();
	        jQuery('#localDba').show();
		}
		else{
			jQuery('#motivoInativacao').show();
	        jQuery('#autorizaDba').hide();
	        jQuery('#localDba').hide();
		}
	});
}

function infoPrDba() {
    if ($( "input:radio[name=infoProgramaDba]:checked" ).val() == "Sim")
  {
    jQuery('#localAcolhida').attr('style','display:block');
  }
  else{
    jQuery('#localAcolhida').attr('style','display:none');
  }
}

function infoDiaInteiro(){
	jQuery("#infoDiaInteiro .radio").click(function(){
		if ($( "input:radio[name=infoDiaInteiro]:checked" ).val() == "Sim")
		{
			jQuery('#divHoraInicio').hide();
	        jQuery('#divHoraTermino').hide();
		}
		else{
			jQuery('#divHoraInicio').show();
	        jQuery('#divHoraTermino').show();
		}
	});
}
function infoPermanente(){
	jQuery("#infoPermanente .radio").click(function(){
		if ($( "input:radio[name=infoPermanente]:checked" ).val() == "Sim")
		{
			jQuery('#divDataTermino').hide();
	        jQuery('#divHoraTermino').hide();
		}
		else{
			jQuery('#divDataTermino').show();
		}
	});
}



function abas(){
    $('#menu_abas').toggleClass('showme');
    $('#container_abas').toggleClass('container_show');
}
  
