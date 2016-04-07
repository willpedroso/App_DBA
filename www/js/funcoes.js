// JavaScript Document
$(document).ready(function(){

 var flag = "1";
$('#bt_aba, #bt_opt').click(function(event){
  flag = "0"; //flag 0 means click happened in the area where we should not do any action
});

$('html').click(function() {
  if(flag != "0"){
    $('#menu_abas').removeClass('showme');
    $('#menu_opt').removeClass('showme');
    $('#container_abas').removeClass('container_show');
    $('#container_opt').removeClass('container_show');
    $('#div_abas').removeClass('div_show');
    $('#div_opt').removeClass('div_show');
    console.log('clique fora');
   }
  else{
   flag = "1";
   }
});
  /* FIM - RADIO SITUACAO CADASTRAL */
  
/*MÁSCARAS*/
jQuery('#data_admissao').mask('00/00/0000');
jQuery('#cpf').mask('000.000.000-00', {reverse: true});
//jQuery('#user').mask('000.000.000-00', {reverse: true});


$("#bt_cidadao").click(function(){
	$("#bt_frequencia").removeClass('ativado');
	$("#bt_cidadao").addClass('ativado');
});
$("#bt_frequencia").click(function(){
	$("#bt_cidadao").removeClass('ativado');
	$("#bt_frequencia").addClass('ativado');
});
  
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
  
  /* INICIO - infoAcompanhamentoCaps */
  var valRadio = '';
  jQuery("#infoAcompanhamentoCaps .radio").click(function(){
  	if ($( "input:radio[name=infoAcompanhamentoCaps]:checked" ).val() == "Sim")
	{
		jQuery('#qualAcompanhamentoCaps').attr('style','display:block');
	}
	else{
		jQuery('#qualAcompanhamentoCaps').attr('style','display:none');
	}
  });
  /* FIM - infoAcompanhamentoCaps */





  /* INICIO - infoCadastroAcompanhamentoUbs */
  var valRadio = '';
  jQuery("#infoCadastroAcompanhamentoUbs .radio").click(function(){
  	if ($( "input:radio[name=infoCadastroAcompanhamentoUbs]:checked" ).val() == "Sim")
	{
		jQuery('#ubsAcompanhamentoCadasdtro').attr('style','display:block');
	}
	else{
		jQuery('#ubsAcompanhamentoCadasdtro').attr('style','display:none');
	}
  });
  /* FIM - infoCadastroAcompanhamentoUbs */


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
			alertMessage("Preencha o campo Observações Rápidas");
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
		adicionaCertidao(null);
		/*
		var d = new Date();
		var idobj =  d.getTime();
		
		if($('input.adicionaObsCertidao').val()  == '' || $('.selectCertidao').text() == 'Selecione'){
			alertMessage("Preencha os campos corretamente");
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
		*/
	});
	
	
	
	//ADICIONA DROGAS ALEM DO CRACK
	$( document ).on( "click", ".btnAdicionaInputDrogasAlemCrack", function() {
		adicionaDrogasAlemCrack();
		/*
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaDrogasAlemCrack').val()  == '' ){
			alertMessage("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaDrogasAlemCrack").val()+'" name="descricao_drogas_alem_crack[]" class="inputAdicionaDrogasAlemCrack" readonly id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputDrogasAlemCrack').append(	html2insert);
			$('input.adicionaDrogasAlemCrack').val('');
		}
		*/
		
	});
	
	
	
	//ADICIONA ESPECIALIDADE CONSULTA HOJE
	$( document ).on( "click", ".btnAdicionaInputEspecialidade", function() {
		adicionaEspecialidadeConsultaHoje();
		/*
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaEspecialidade').val()  == '' ){
			alertMessage("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaEspecialidade").val()+'" name="especialidades_consulta_hoje[]" class="inputAdicionaEspecialidade" readonly id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputEspecialidadeConsulta').append(	html2insert);
			$('input.adicionaEspecialidade').val('');
		}
		*/
	});
	
	
	
	//ADICIONA USOU DROGA HOJE
	$( document ).on( "click", ".btnAdicionaInputDrogaHoje", function() {
		adicionaDrogaHoje();
		/*
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaDrogaHoje').val()  == '' ){
			alertMessage("Preencha os campos corretamente");
		}
		else{
			
			var html2insert ='<div id="div'+idobj+'">'+
			'<input type="text" value="'+$(".adicionaDrogaHoje").val()+'" name="usou_drogas_hoje[]" class="inputAdicionaDrogaHoje" readonly id="input_'+idobj+'">'+
			'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
				
			$('.adicionaInputDrogaHoje').append(	html2insert);
			$('input.adicionaDrogaHoje').val('');
		}
		*/
	});
	
	
	
	//ADICIONA OFICINA PARTICIOU
	$( document ).on( "click", ".btnAdicionaInputOficinaParticiou", function() {
		adicionaOficinaParticipou();
		/*
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaQualOficina').val()  == '' || $('input.adicionaLocalOficina').val()  == '' ){
			alertMessage("Preencha os campos corretamente");
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
		*/
	});
	
	//ADICIONA ATIVIDADE PARTICIOU
	$( document ).on( "click", ".btnAdicionaInputAtividadeParticiou", function() {
		adicionaAtividadeRecreativa();
		/*
		var d = new Date();
		var idobj =  d.getTime();
		
		if( $('input.adicionaQualAtividade').val()  == '' || $('input.adicionaLocalAtividade').val()  == '' ){
			alertMessage("Preencha os campos corretamente");
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
		*/
	});
	
	
	//ADICIONA CONTATO
	$( document ).on( "click", ".btnAdicionaInputContato", function() {
		adicionaContato(null);
	});
	
	//ADICIONA CONTATO
	$( document ).on( "click", ".btnAdicionaInputDocumento", function() {
		adicionaDocumento(null);
	});
	
	
	//ADICIONA CONTATO familiar
	$( document ).on( "click", ".btnAdicionaInputContatoFamiliar", function() {
		adicionaTelefoneFamiliar(null);
	});
	
	
	//ADICIONA DROGAS
	$( document ).on( "click", ".btnAdicionaInputDrogas", function() {
		adicionaDrogas(null, null, null);
	});
	
	
	
	//ADICIONA CONTATO EMPRESA
	$( document ).on( "click", ".btnAdicionaInputContatoEmpresa", function() {
		adicionaContatoEmpresa(null);
	});
	
	
	//ADICIONA PROVIDENCIA
	$( document ).on( "click", ".btnAdicionaInputProvidencia", function() {
		adicionaProvidencia();
	});

	//ADD PROVIDENCIA
	$( document ).on( "click", ".btnAdicionaProvidencia", function() {
		addProvidencia();
	});
	
	
	
	//ADICIONA ACOMPANHAMENTO/CADASTRO UBS
	$( document ).on( "click", ".btnAdicionaInputUbs", function() {
		adicionaAcompanhamentoUBS();
	});
	
	
	
	//ADICIONA INTERNACAO
	$( document ).on( "click", ".btnAdicionaInputInternacao", function() {
		adicionaInternacao();
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

function adicionaCertidao(nome_certidao) {
	var d = new Date();
	var idobj =  d.getTime();
	
	var nomeCertidao;
	if (nome_certidao == null) {
		nomeCertidao = $("#tipoCertidaoLabel option:selected").text();
	}
	else {
		nomeCertidao = nome_certidao;
	}

	if($('input.adicionaObsCertidao').val()  == '' || (nome_certidao == null ? ($("#tipoCertidaoLabel option:selected").text() == 'Selecione') : false)){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+ nomeCertidao +'" name="input_'+idobj+'" class="inputAdicionaCertidao inputPeq" readonly id="input_'+idobj+'">'+
//		'<input type="text" value="'+$(".selectCertidao").text()+'" name="input_'+idobj+'" class="inputAdicionaCertidao" readonly id="input_'+idobj+'">'+
		'<input type="hidden" value="'+$("#tipo_certidao_id").val()+'" name="tipo_certidao_id[]">'+
		'<input type="text" value="'+$(".adicionaObsCertidao").val()+'" name="input_'+idobj+'" class="inputAdicionaCertidao inputPeq" readonly id="input_'+idobj+'">'+
		'<input type="hidden" value="'+$(".adicionaObsCertidao").val()+'" name="numero_certidao[]">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputCertidao').append(	html2insert);
		$('input.adicionaObsCertidao').val('');
		$('.selectCertidao').text('Tipo');
	}
}

function adicionaProvidencia() {
	var d = new Date();
	var idobj =  d.getTime();
	
//	if($('input.adicionaObsProvidencia').val()  == '' || $('.selectProvidencia').text() == 'Selecione'){
	if($('input.adicionaObsProvidencia').val()  == '' || $('input.adicionaObsProvidenciaPeq').val() == ''){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaObsProvidencia").val()+'" name="tipo_providencia[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaObsProvidencia").val()+'" name="status_providencia[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
		'<textarea name="observacao_providencia[]" class="inputTextArea" readonly id="input_'+idobj+'">' + $(".textareaProvidencia").val() + '</textarea>'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputProvidencia').append(	html2insert);
		$('input.adicionaObsProvidencia').val('');
		$('input.adicionaObsProvidenciaPeq').val('');
		$('textarea.textareaProvidencia').val('');
	}
}
function addProvidencia() {
	var d = new Date();
	var idobj =  d.getTime();
	
//	if($('input.adicionaObsProvidencia').val()  == '' || $('.selectProvidencia').text() == 'Selecione'){
	if($('input.adicionaObsProvidencia').val()  == '' || $('input.adicionaObsProvidenciaPeq').val() == ''){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaObsProvidencia").val()+'" name="tipo_providencia[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaObsProvidenciaPeq").val()+'" name="status_providencia[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
		'<textarea name="observacao_providencia[]" class="textareaAdicionaProvidencia" readonly id="input_'+idobj+'">' + $(".textareaProvidencia").val() + '</textarea>'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaProvidencia').append(	html2insert);
		$('input.adicionaObsProvidencia').val('');
		$('input.adicionaObsProvidenciaPeq').val('');
		$('textarea.textareaProvidencia').val('');
	}
}

function adicionaContatoEmpresa(nome_dispositivo_contato) {
	var d = new Date();
	var idobj =  d.getTime();
	
	var tipoDispositivo;
	if (nome_dispositivo_contato == null) {
		tipoDispositivo = $("#tipoDispositivoContatoEmpresaLabel option:selected").text();
	}
	else {
		tipoDispositivo = nome_dispositivo_contato;
	}
	
	if($('input.adicionaNumContatoEmpresa').val()  == '' || (nome_dispositivo_contato == null ? ($('#tipoDispositivoContatoEmpresaLabel').val() == 'Selecione') : false)){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		//'<input type="text" value="'+$("#tipoDispositivoEmpresa")[0].options[$("#tipoDispositivoEmpresa")[0].selectedIndex].value+'" name="input_'+idobj+'" class="inputAdicionaContatoEmpresa" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+ tipoDispositivo +'" name="input_'+idobj+'" class="inputPeq inputAdicionaContatoEmpresa" readonly id="input_'+idobj+'">'+
		//'<input type="hidden" value="'+$("#tipo_dispositivo_contato_empresa_id").val()+'" name="tipo_dispositivo_contato_empresa_id[]">'+
		'<input type="text" value="'+$(".adicionaNumContatoEmpresa").val()+'" name="input_'+idobj+'" class="inputPeq inputAdicionaContatoEmpresa" readonly id="input_'+idobj+'">'+
		'<input type="hidden" value="'+$(".adicionaNumContatoEmpresa").val()+'" name="numero_descricao_empresa[]">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputContatoEmpresa').append(	html2insert);
		$('input.adicionaNumContatoEmpresa').val('');
		$("select#tipoDispositivoContatoEmpresaLabel").prop('selectedIndex', 0);
		//$('.selectDispositivoContatoEmpresa').text('Tipo');
	}
}

function adicionaContato (nome_dispositivo_contato) {
	var d = new Date();
	var idobj =  d.getTime();
	
	var tipoDispositivo;
	if (nome_dispositivo_contato == null) {
		tipoDispositivo = $("#tipoDispositivoContatoLabel option:selected").text();
	}
	else {
		tipoDispositivo = nome_dispositivo_contato;
	}
	
	//if($('input.adicionaNumContato').val()  == '' || $('.selectDispositivoContato').text() == 'Selecione'){
	if($('input.adicionaNumContato').val()  == '' || (nome_dispositivo_contato == null ? ($('#tipoDispositivoContatoLabel').val() == 'Selecione') : false)){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		
		var html2insert ='<div id="div'+idobj+'">'+
		//'<input type="text" value="'+$("#tipoDispositivoContato")[0].options[$("#tipoDispositivoContato")[0].selectedIndex].value+'" name="input_'+idobj+'" class="inputAdicionaContato" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+ tipoDispositivo +'" name="input_'+idobj+'" class="inputPeq inputAdicionaContato" readonly id="input_'+idobj+'">'+
		//'<input type="hidden" value="'+$("#tipo_dispositivo_contato_id").val()+'" name="tipo_dispositivo_contato_id[]">'+
		'<input type="text" value="'+$(".adicionaNumContato").val()+'" name="input_'+idobj+'" class="inputPeq inputAdicionaContato" readonly id="input_'+idobj+'">'+
		'<input type="hidden" value="'+$(".adicionaNumContato").val()+'" name="numero_descricao[]">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputContato').append(	html2insert);
		$('.adicionaNumContato').val('');
		$("select#tipoDispositivoContatoLabel").prop('selectedIndex', 0);
		//$('#tipoDispositivoContato').val('');
	}
}

function adicionaDocumento (nome_documento) {
	var d = new Date();
	var idobj =  d.getTime();
	
	var nomeDocumento;
	if (nome_documento == null) {
		nomeDocumento = $("#tipoDocumentoLabel option:selected").text();
	}
	else {
		nomeDocumento = nome_documento;
	}
	
	if($('input.adicionaNumDocumento').val()  == '' || (nome_documento == null ? ($('#tipoDocumentoLabel').val() == 'Selecione') : false)){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+ nomeDocumento +'" name="input_'+idobj+'" class="inputPeq inputAdicionaContato" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaNumDocumento").val()+'" name="input_'+idobj+'" class="inputPeq " readonly id="input_'+idobj+'">'+
		'<input type="hidden" value="'+$(".adicionaNumDocumento").val()+'" name="numeroDocumentoLabel[]">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputDocumento').append(	html2insert);
		$('.adicionaNumDocumento').val('');
		$("select#tipoDocumentoLabel").prop('selectedIndex', 0);
	}
}

function adicionaDrogaHoje() {
	var d = new Date();
	var idobj =  d.getTime();
	
	if( $('input.adicionaDrogaHoje').val()  == '' ){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaDrogaHoje").val()+'" name="usou_drogas_hoje[]" class="inputPeq inputAdicionaDrogaHoje" readonly id="input_'+idobj+'">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputDrogaHoje').append(	html2insert);
		$('input.adicionaDrogaHoje').val('');
	}
}

function adicionaAtividadeRecreativa() {
	var d = new Date();
	var idobj =  d.getTime();
	
	if( $('input.adicionaQualAtividade').val()  == '' || $('input.adicionaLocalAtividade').val()  == '' ){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaQualAtividade").val()+'" name="qual_atividade_particiou[]" class="inputPeq inputAdicionaQualAtividadeParticiou" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaLocalAtividade").val()+'" name="local_atividade_particiou[]" class="inputPeq inputAdicionaLocalAtividadeParticiou" readonly id="input_'+idobj+'">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputAtividadesParticipou').append(	html2insert);
		$('input.adicionaQualAtividade').val('');
		$('input.adicionaLocalAtividade').val('');
	}	
}

function adicionaOficinaParticipou() {
	var d = new Date();
	var idobj =  d.getTime();
	
	if( $('input.adicionaQualOficina').val()  == '' || $('input.adicionaLocalOficina').val()  == '' ){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaQualOficina").val()+'" name="qual_oficina_particiou[]" class="inputPeq inputAdicionaQualOficinaParticiou" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaLocalOficina").val()+'" name="local_oficina_particiou[]" class="inputPeq inputAdicionaLocalOficinaParticiou" readonly id="input_'+idobj+'">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputOficinasParticipou').append(	html2insert);
		$('input.adicionaQualOficina').val('');
		$('input.adicionaLocalOficina').val('');
	}
}

function adicionaEspecialidadeConsultaHoje() {
	var d = new Date();
	var idobj =  d.getTime();
	
	if( $('input.adicionaEspecialidade').val()  == '' ){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaEspecialidade").val()+'" name="especialidades_consulta_hoje[]" class="inputPeq inputAdicionaEspecialidade" readonly id="input_'+idobj+'">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputEspecialidadeConsulta').append(	html2insert);
		$('input.adicionaEspecialidade').val('');
	}
}

function adicionaDrogasAlemCrack() {
	var d = new Date();
	var idobj =  d.getTime();
	
	if( $('input.adicionaDrogasAlemCrack').val()  == '' ){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaDrogasAlemCrack").val()+'" name="descricao_drogas_alem_crack[]" class="inputPeq inputAdicionaDrogasAlemCrack" readonly id="input_'+idobj+'">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputDrogasAlemCrack').append(	html2insert);
		$('input.adicionaDrogasAlemCrack').val('');
	}	
}

function adicionaDrogas(dias, meses, anos) {
	var d = new Date();
	var idobj =  d.getTime();
	
	if($('input.adicionaDrogas').val()  == ''){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		var vdias = dias != null ? dias : $("#diaDrogasFazUsoLabel option:selected").text();
		var vmeses = meses != null ? meses : $("#mesesDrogasFazUsoLabel option:selected").text();
		var vanos = anos != null ? anos : $("#anosDrogasFazUsoLabel option:selected").text();
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaDrogas").val()+'" name="drogas_faz_uso[]" class="inputPeq inputAdicionaQualDroga" readonly id="input_'+idobj+'">'+'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span>'+
		'<div class="inputsTempo">'+
		
//		'<input type="text" value="'+(($("#diaDrogasFazUsoLabel").text() == 'Dias')? '':$("#diaDrogasFazUsoLabel").text()) +'" name="dias_drogas_faz_uso[]" class="inputAdicionaDrogasTempo" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+((vdias == 'Dias')? '':vdias) +'" name="dias_drogas_faz_uso[]" class="inputPeq inputAdicionaDrogasTempo" readonly id="input_'+idobj+'">'+
		
//		'<input type="text" value="'+(($("#mesesDrogasFazUsoLabel").text() == 'Meses')? '':$("#mesesDrogasFazUsoLabel").text())+'" name="meses_drogas_faz_uso[]" class="inputAdicionaDrogasTempo" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+((vmeses == 'Meses')? '':vmeses)+'" name="meses_drogas_faz_uso[]" class="inputPeq inputAdicionaDrogasTempo" readonly id="input_'+idobj+'">'+
		
//		'<input type="text" value="'+(($("#anosDrogasFazUsoLabel").text() == 'Anos')? '':$("#anosDrogasFazUsoLabel").text())+'" name="anos_drogas_faz_uso[]" class="inputAdicionaDrogasTempo" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+((vanos == 'Anos')? '':vanos)+'" name="anos_drogas_faz_uso[]" class="inputPeq inputAdicionaDrogasTempo" readonly id="input_'+idobj+'">'+
		
		'</div>'+'</div>';

		$('.adicionaInputDrogas').append(	html2insert);
		$('input.adicionaDrogas').val('');
		$('#diaDrogasFazUsoLabel').val('Dias');
		$('#mesesDrogasFazUsoLabel').val('Meses');
		$('#anosDrogasFazUsoLabel').val('Anos');
	}
}

function adicionaTelefoneFamiliar(parentesco) {
	var d = new Date();
	var idobj =  d.getTime();
	
	if($('input.adicionaNumContatoFamiliar').val()  == '' || $('.selectTipoParente').text() == 'Selecione'){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+
		(parentesco == null ? $("#selectTipoParente option:selected").text() : parentesco)+
		'" name="input_'+idobj+'" class="inputPeq inputAdicionaContato" readonly id="input_'+idobj+'">'+
		'<input type="hidden" value="'+$("#tipo_parentesco_id").val()+'" name="tipo_familiar[]">'+
		'<input type="text" value="'+$(".adicionaNumContatoFamiliar").val()+'" name="input_'+idobj+'" class="inputPeq inputAdicionaContato" readonly id="input_'+idobj+'">'+
		'<input type="hidden" value="'+$(".adicionaNumContatoFamiliar").val()+'" name="numero_familiar[]">'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
			
		$('.adicionaInputContatoFamiliar').append(	html2insert);
		$('input.adicionaNumContatoFamiliar').val('');
		$('input.tipo_parentesco_id').val('');
		$('#selectTipoParente').val('Tipo');
	}
}

function adicionaInternacao() {
	var d = new Date();
	var idobj =  d.getTime();
	
	var html2insert ='<div id="div'+idobj+'">'+
	'<input type="text" value="'+$(".adicionaQuantasVezesInternado").val()+'" name="quantidade_internacao[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
	'<input type="text" value="'+$(".adicionaLocalInternacao").val()+'" name="local_internacao[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
	'<textarea name="motivo_internacao[]" class="textareaAdicionaInternacao " readonly id="input_'+idobj+'">' + $(".textareaMotivoInternacao").val() + '</textarea>'+
	'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
		
	$('.adicionaInputInternacao').append(	html2insert);
	$('input.adicionaQuantasVezesInternado').val('');
	$('input.adicionaLocalInternacao').val('');
	$('textarea.textareaMotivoInternacao').val('');
}

function adicionaAcompanhamentoUBS() {
	var d = new Date();
	var idobj =  d.getTime();
	
	if( $('input.adicionaQualUbsSaude').val()  == '' || $('input.adicionaTecnicoReferenciaUbsSaude').val() == '' ){
		alertMessage("Preencha os campos corretamente");
	}
	else{
		
		var html2insert ='<div id="div'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaQualUbsSaude").val()+'" name="nome_ubs[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
		'<input type="text" value="'+$(".adicionaTecnicoReferenciaUbsSaude").val()+'" name="tecnico_referencia_ubs[]" class="inputAdicionaProvidencia" readonly id="input_'+idobj+'">'+
		'<textarea name="especialidade_ubs[]" class="textareaAdicionaEspecialidadeUbs " readonly id="input_'+idobj+'">' + $(".textareaEspecialidadeUbsSaude").val() + '</textarea>'+
		'<span class="btn-remover" onclick="removeMe(\''+('div'+idobj)+'\')"></span></div>';
		
		$('.adicionaInputUbsSaude').append(	html2insert);
		$('input.adicionaQualUbsSaude').val('');
		$('input.adicionaTecnicoReferenciaUbsSaude').val('');
		$('textarea.textareaEspecialidadeUbsSaude').val('');
	}		
}
	
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
}

function radioFrequencia(elemento, radio){
	console.log("radioFrequencia");
	
	/* INICIO - RADIO SITUACAO CADASTRAL */
	if ($( 'input:radio[name=' + radio + ']:checked' ).val() == "Não")
	{
		$('#' + elemento).show();
	}
	else{
		$('#' + elemento).hide();
	}
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

function infoDiaInt(){
	if ($( "input:radio[name=infoDiaInteiro]:checked" ).val() == "Sim")
	{
		jQuery('#divHoraInicio').hide();
        jQuery('#divHoraTermino').hide();
	}
	else{
		if ($( "input:radio[name=infoPermanente]:checked" ).val() == "Sim"){
			jQuery('#divHoraTermino').hide();
		}
		else{
			jQuery('#divHoraTermino').show();
		}
		jQuery('#divHoraInicio').show();
	}
}

function infoPerma(){
	if ($( "input:radio[name=infoPermanente]:checked" ).val() == "Sim")
	{
		jQuery('#divDataTermino').hide();
        jQuery('#divHoraTermino').hide();
	}
	else{
		if ($( "input:radio[name=infoDiaInteiro]:checked" ).val() == "Não"){
			jQuery('#divHoraTermino').show();
		}
		jQuery('#divDataTermino').show();
	}
}


function infoRep(){
	if ($( "input:radio[name=infoRepetir]:checked" ).val() == "dia da semana")
	{
		jQuery('#divDiasSemanaRadio').show();
        jQuery('#divDiasMes').hide();
	}
	else{
		jQuery('#divDiasSemanaRadio').hide();
        jQuery('#divDiasMes').show();
	}
}

function abas(){
	$('.divMenuInterno').toggleClass('showme');
    $('#menu_abas').toggleClass('showme');
    $('#container_abas').toggleClass('container_show');
    $('#ficha-statica').addClass('showme');
	$('#ficha-statica').removeClass('hideme');
	$('.msgParabens, .msgErro, .msgAtencao').hide;
	window.scrollTo(0, 0);
}
function abasmenu(){
	//window.scrollTo(0, 0);
	if($('.divMenuInterno').hasClass('showme')){
		$('.divMenuInterno').removeClass('showme');
		$('.divMenuInterno').addClass('hideme');
	}
	else{
		$('.divMenuInterno').addClass('hideme');
		$('#menu_abas').toggleClass('showme');
    	$('#container_abas').toggleClass('container_show');
	}
}  
function fechaficha(){
	$('#ficha-statica').removeClass('showme');
	$('#ficha-statica').addClass('hideme');

    // Esconde menu do cidadão
	//jQuery('#bt_aba').attr('style','display:none');
}
function exibePeriodo(){
	if($('#tipoPeriodicidadeLabel').val() == 'Selecione'){
		console.log("exibe");
		jQuery('#divDiaInteiro').hide();  
		jQuery('#divDataInicio').hide();  
		jQuery('#divHoraInicio').hide();  
		jQuery('#divPermanente').hide();  
		jQuery('#divDataTermino').hide();
		jQuery('#divHoraTermino').hide();
		jQuery('#divRepetir').hide();
		jQuery('#divDiaRepetir').hide();
		jQuery('#divDiasMes').hide();
		jQuery('#divDiasSemana').hide();
		jQuery('#divDiasSemanaRadio').hide();
		return;
	}
	if($('#tipoPeriodicidadeLabel').val() == 'Diário'){
		jQuery('#divDiaInteiro').show();  
		jQuery('#divDataInicio').show();  
		jQuery('#divHoraInicio').show();  
		jQuery('#divPermanente').show();  
		jQuery('#divDataTermino').show();
		jQuery('#divHoraTermino').show();
		jQuery('#divRepetir').hide();
		jQuery('#divDiaRepetir').hide();
		jQuery('#divDiasMes').hide();
		jQuery('#divDiasSemana').hide();
		jQuery('#divDiasSemanaRadio').hide();
	}
	if($('#tipoPeriodicidadeLabel').val() == 'Semanal'){
		jQuery('#divDiaInteiro').show();  
		jQuery('#divDataInicio').show();  
		jQuery('#divHoraInicio').show();  
		jQuery('#divPermanente').show();  
		jQuery('#divDataTermino').show();
		jQuery('#divHoraTermino').show();
		jQuery('#divRepetir').hide();
		jQuery('#divDiaRepetir').hide();
		jQuery('#divDiasMes').hide();
		jQuery('#divDiasSemana').show();
		jQuery('#divDiasSemanaRadio').hide();
		
	}
	if($('#tipoPeriodicidadeLabel').val() == 'Mensal'){
      jQuery('#divDiaInteiro').show();  
      jQuery('#divDataInicio').show();  
      jQuery('#divHoraInicio').show();  
      jQuery('#divPermanente').show();  
      jQuery('#divDataTermino').show();
      jQuery('#divHoraTermino').show();
      jQuery('#divRepetir').show();
      jQuery('#divDiaRepetir').hide();
      jQuery('#divDiasMes').show();
      jQuery('#divDiasSemana').hide();
      jQuery('#divDiasSemanaRadio').hide();
	  infoRep();
		
	}
	if($('#tipoPeriodicidadeLabel').val() == 'Anual'){
		jQuery('#divDiaInteiro').show();  
		jQuery('#divDataInicio').show();  
		jQuery('#divHoraInicio').show();  
		jQuery('#divPermanente').show();  
		jQuery('#divDataTermino').show();
		jQuery('#divHoraTermino').show();
		jQuery('#divRepetir').hide();
		jQuery('#divDiaRepetir').show();
		jQuery('#divDiasMes').hide();
		jQuery('#divDiasSemana').hide();
		jQuery('#divDiasSemanaRadio').hide();
	}
	
	infoDiaInt();
	infoPerma();
}

// funcao fomrulario questao qtos filhos
function addFilhos(qtd)
{		
	var str='';
	
	for(var i =0; i<qtd.value;i++){
	
		str+='<div class="linhaForm" id="qtdFilho" >'; 
		str+='<span class="titLabel">Idade do Filho '+(i+1)+':</span>';
		str+='<input type="text" class="inputGrande"  value="" name="idade_filhos[]" id="filho_'+(i+1)+'" />';
		str+='</div>';
	
	}
	
	$('#containerQtdFilhos').html(str);
}



//Saude

/* INICIO - usouCrackHoje */
function usouCrackHoje()
{
  var valRadio = '';
//  jQuery("#infoUsouCrackHoje .radio").click(function(){
  	if ($( "input:radio[name=infoUsouCrackHoje]:checked" ).val() == "Sim")
	{
		jQuery('#usouCrackHoje').attr('style','display:block');
	}
	else{
		jQuery('#usouCrackHoje').attr('style','display:none');
	}
//  });
}
/* FIM - usouCrackHoje */

/* INICIO - usouDrogaHoje */
function usouDrogaHoje()
{
  var valRadio = '';
//  jQuery("#infoUsouDrogaHoje .radio").click(function(){
  	if ($( "input:radio[name=infoUsouDrogaHoje]:checked" ).val() == "Sim")
	{
		jQuery('#usouDrogaHoje').attr('style','display:block');
	}
	else{
		jQuery('#usouDrogaHoje').attr('style','display:none');
	}
//  });
}
/* FIM - usouDrogaHoje */

/* INICIO - atividadeRecreativaExterna */
function atividadeRecreativaExterna()
{
  var valRadio = '';
//  jQuery("#infoParticipouAtividadeHoje .radio").click(function(){
  	if ($( "input:radio[name=infoParticipouAtividadeHoje]:checked" ).val() == "Sim")
	{
		jQuery('#atividadeRecreativaExterna').attr('style','display:block');
	}
	else{
		jQuery('#atividadeRecreativaExterna').attr('style','display:none');
	}
//  });
}
/* FIM - atividadeRecreativaExterna */


/* INICIO - infoParticipouOficinaHoje */
function infoParticipouOficinaHojef()
{
  var valRadio = '';
//  jQuery("#infoParticipouOficinaHoje .radio").click(function(){
  	if ($( "input:radio[name=infoParticipouOficinaHoje]:checked" ).val() == "Sim")
	{
		jQuery('#participouOficinaHoje').attr('style','display:block');
		jQuery('#naoParticipouOficinaHoje').attr('style','display:none');
	}
	else if($( "input:radio[name=infoParticipouOficinaHoje]:checked" ).val() == "Não")
	{
		jQuery('#naoParticipouOficinaHoje').attr('style','display:block');
		jQuery('#participouOficinaHoje').attr('style','display:none');
	}
	else{
		jQuery('#naoParticipouOficinaHoje').attr('style','display:none');
		jQuery('#participouOficinaHoje').attr('style','display:none');
	}
//  });
}
/* FIM - infoParticipouOficinaHoje */



/* INICIO - compareceuTrabalhoHoje */
function compareceuTrabalhoHoje()
{
  var valRadio = '';
//  jQuery("#infoCompareceuTrabalhoHoje .radio").click(function(){
  	if ($( "input:radio[name=infoCompareceuTrabalhoHoje]:checked" ).val() == "Não")
	{
		jQuery('#compareceuTrabalhoHoje').attr('style','display:block');
	}
	else{
		jQuery('#compareceuTrabalhoHoje').attr('style','display:none');
	}
//  });
}
/* FIM - compareceuTrabalhoHoje */

/* INICIO - consultaSaudeHoje */
function consultaSaudeHoje()
{
  var valRadio = '';
//  jQuery("#infoConsultaSaudeHoje .radio").click(function(){
  	if ($( "input:radio[name=infoConsultaSaudeHoje]:checked" ).val() == "Sim")
	{
		jQuery('#consultaSaudeHoje').attr('style','display:block');
	}
	else{
		jQuery('#consultaSaudeHoje').attr('style','display:none');
	}
//  });
}
/* FIM - consultaSaudeHoje */




/* INICIO - preNatal */
function preNatal()
{
  var valRadio = '';
//  jQuery("#infoPreNatal .radio").click(function(){
  	if ($( "input:radio[name=infoPreNatal]:checked" ).val() == "Sim")
	{
		jQuery('#preNatal').attr('style','display:block');
	}
	else{
		jQuery('#preNatal').attr('style','display:none');
	}
//  });
}
/* FIM - preNatal */

/* INICIO - planejamentoFamiliar */
function planejamentoFamiliar()
{
  var valRadio = '';
//  jQuery("#infoPlanejamentoFamiliar .radio").click(function(){
  	if ($( "input:radio[name=infoPlanejamentoFamiliar]:checked" ).val() == "Sim")
	{
		jQuery('#planejamentoFamiliar').attr('style','display:block');
	}
	else{
		jQuery('#planejamentoFamiliar').attr('style','display:none');
	}
//  });
}
/* FIM - planejamentoFamiliar */

/* INICIO - metodoAnticoncepcional */
function metodoAnticoncepcional()
{
  var valRadio = '';
//  jQuery("#infoMetodoAnticoncepcional .radio").click(function(){
  	if ($( "input:radio[name=infoMetodoAnticoncepcional]:checked" ).val() == "Sim")
	{
		jQuery('#metodoAnticoncepcional').attr('style','display:block');
	}
	else{
		jQuery('#metodoAnticoncepcional').attr('style','display:none');
	}
//  });
}
/* FIM - metodoAnticoncepcional */

/* INICIO - avaliacaoGinecologica */
function avaliacaoGinecologica()
{
  var valRadio = '';
//  jQuery("#infoAvaliacaoGinecologica .radio").click(function(){
  	if ($( "input:radio[name=infoAvaliacaoGinecologica]:checked" ).val() == "Sim")
	{
		jQuery('#avaliacaoGinecologica').attr('style','display:block');
	}
	else{
		jQuery('#avaliacaoGinecologica').attr('style','display:none');
	}
//  });
}
/* FIM - avaliacaoGinecologica */








/* INICIO - fezTratamentoTuberculose */
function fezTratamentoTuberculose()
{
  var valRadio = '';
//  jQuery("#infoFezTratamentoTuberculose .radio").click(function(){
  	if ($( "input:radio[name=infoFezTratamentoTuberculose]:checked" ).val() == "Sim")
	{
		jQuery('#fezTratamentoTuberculose').attr('style','display:block');
	}
	else{
		jQuery('#fezTratamentoTuberculose').attr('style','display:none');
	}
//  });
}
/* FIM - fezTratamentoTuberculose */

/* INICIO - teveTuberculose */
function teveTuberculose()
{
  var valRadio = '';
//  jQuery("#infoTeveTuberculose .radio").click(function(){
  	if ($( "input:radio[name=infoTeveTuberculose]:checked" ).val() == "Sim")
	{
		jQuery('#teveTuberculose').attr('style','display:block');
	}
	else{
		jQuery('#teveTuberculose').attr('style','display:none');
	}
//  });
}
/* FIM - teveTuberculose */



/* INICIO - diagnosticoTuberculose */
function diagnosticoTuberculose()
{
  var valRadio = '';
//  jQuery("#infoDiagnosticoTuberculose .radio").click(function(){
  	if ($( "input:radio[name=infoDiagnosticoTuberculose]:checked" ).val() == "Sim")
	{
		jQuery('#diagnosticoTuberculose').attr('style','display:block');
	}
	else{
		jQuery('#diagnosticoTuberculose').attr('style','display:none');
	}
//  });
}
/* FIM - diagnosticoTuberculose */

/* INICIO - realizouTesteTuberculose */
function realizouTesteTuberculose()
{
  var valRadio = '';
//  jQuery("#infoRealizouTesteTuberculose .radio").click(function(){
  	if ($( "input:radio[name=infoRealizouTesteTuberculose]:checked" ).val() == "Sim")
	{
		jQuery('#realizouTesteTuberculose').attr('style','display:block');
	}
	else{
		jQuery('#realizouTesteTuberculose').attr('style','display:none');
	}
//  });
}
/* FIM - realizouTesteTuberculose */











/* INICIO - tratamentoSintomasRespiratorios */
function tratamentoSintomasRespiratorios()
{
  var valRadio = '';
//  jQuery("#infoTratamentoSintomasRespiratorios .radio").click(function(){
  	if ($( "input:radio[name=infoTratamentoSintomasRespiratorios]:checked" ).val() == "Sim")
	{
		jQuery('#tratamentoSintomasRespiratorios').attr('style','display:block');
	}
	else{
		jQuery('#tratamentoSintomasRespiratorios').attr('style','display:none');
	}
//  });
}
/* FIM - tratamentoSintomasRespiratorios */

/* INICIO - sintomasRespiratorios */
function sintomasRespiratorios()
{
  var valRadio = '';
//  jQuery("#infoSintomasRespiratorios .radio").click(function(){
  	if ($( "input:radio[name=infoSintomasRespiratorios]:checked" ).val() == "Sim")
	{
		jQuery('#sintomasRespiratorios').attr('style','display:block');
	}
	else{
		jQuery('#sintomasRespiratorios').attr('style','display:none');
	}
//  });
}
/* FIM - sintomasRespiratorios */


/* INICIO - tratamentoSifilis */
function passouAvaliacaoOdontologica()
{
  var valRadio = '';
//  jQuery("#infoPassouAvaliacaoOdontologica .radio").click(function(){
  	if ($( "input:radio[name=infoPassouAvaliacaoOdontologica]:checked" ).val() == "Sim")
	{
		jQuery('#passouAvaliacaoOdontologica').attr('style','display:block');
	}
	else{
		jQuery('#passouAvaliacaoOdontologica').attr('style','display:none');
	}
//  });
}
/* FIM - tratamentoSifilis */


/* INICIO - tratamentoSifilis */
function tratamentoSifilis()
{
  var valRadio = '';
//  jQuery("#infoTratamentoSifilis .radio").click(function(){
  	if ($( "input:radio[name=infoTratamentoSifilis]:checked" ).val() == "Sim")
	{
		jQuery('#tratamentoSifilis').attr('style','display:block');
	}
	else{
		jQuery('#tratamentoSifilis').attr('style','display:none');
	}
//  });
}
/* FIM - tratamentoSifilis */


/* INICIO - diagnosticoSifilis */
function diagnosticoSifilis()
{
  var valRadio = '';
//  jQuery("#infoDiagnosticoSifilis .radio").click(function(){
  	if ($( "input:radio[name=infoDiagnosticoSifilis]:checked" ).val() == "Sim")
	{
		jQuery('#diagnosticoSifilis').attr('style','display:block');
	}
	else{
		jQuery('#diagnosticoSifilis').attr('style','display:none');
	}
//  });
}
/* FIM - diagnosticoSifilis */



/* INICIO - infoAcompanhamentoDst */
function tratamentoHivAids()
{
  var valRadio = '';
//  jQuery("#infoTratamentoHivAids .radio").click(function(){
  	if ($( "input:radio[name=infoTratamentoHivAids]:checked" ).val() == "Sim")
	{
		jQuery('#tratamentoHivAids').attr('style','display:block');
	}
	else{
		jQuery('#tratamentoHivAids').attr('style','display:none');
	}
//  });
}
/* FIM - infoAcompanhamentoDst */


/* INICIO - infoAcompanhamentoDst */
function diagnosticoHivAids()
{
  var valRadio = '';
//  jQuery("#infoDiagnosticoHivAids .radio").click(function(){
  	if ($( "input:radio[name=infoDiagnosticoHivAids]:checked" ).val() == "Sim")
	{
		jQuery('#diagnosticoHivAids').attr('style','display:block');
	}
	else{
		jQuery('#diagnosticoHivAids').attr('style','display:none');
	}
//  });
}
/* FIM - infoAcompanhamentoDst */



/* INICIO - infoAcompanhamentoDst */
function acompanhamentoDst()
{
  var valRadio = '';
//  jQuery("#infoAcompanhamentoDst .radio").click(function(){
  	if ($( "input:radio[name=infoAcompanhamentoDst]:checked" ).val() == "Sim")
	{
		jQuery('#acompanhamentoDst').attr('style','display:block');
	}
	else{
		jQuery('#acompanhamentoDst').attr('style','display:none');
	}
//  });
}
/* FIM - infoAcompanhamentoDst */



/* INICIO - infoTesteRapidoDstAids */
function testeRapidoDstAids()
{
  var valRadio = '';
//  jQuery("#infoTesteRapidoDstAids .radio").click(function(){
  	if ($( "input:radio[name=infoTesteRapidoDstAids]:checked" ).val() == "Sim")
	{
		jQuery('#testeRapidoDstAids').attr('style','display:block');
	}
	else{
		jQuery('#testeRapidoDstAids').attr('style','display:none');
	}
//  });
}
/* FIM - infoTesteRapidoDstAids */






/* INICIO - infoAbstinenciaAposPrograma */
function abstinenciaAposPrograma()
{
  var valRadio = '';
//  jQuery("#infoAbstinenciaAposPrograma .radio").click(function(){
  	if ($( "input:radio[name=infoAbstinenciaAposPrograma]:checked" ).val() == "Sim")
	{
		jQuery('#abstinenciaAposPrograma').attr('style','display:block');
	}
	else{
		jQuery('#abstinenciaAposPrograma').attr('style','display:none');
	}
//  });
}
/* FIM - infoAbstinenciaAposPrograma */


/* INICIO - infoUsoDrogasInjetaveis */
function usoDrogasInjetaveisf()
{
  var valRadio = '';
//  jQuery("#infoUsoDrogasInjetaveis .radio").click(function(){
  	if ($( "input:radio[name=infoUsoDrogasInjetaveis]:checked" ).val() == "Sim")
	{
		jQuery('#usoDrogasInjetaveis').attr('style','display:block');
	}
	else{
		jQuery('#usoDrogasInjetaveis').attr('style','display:none');
	}
//  });
}
/* FIM - infoUsoDrogasInjetaveis */



/* INICIO - infoDrogasAlemCrack */
function drogasAlemCrackf()
{
  var valRadio = '';
//  jQuery("#infoDrogasAlemCrack .radio").click(function(){
  	if ($( "input:radio[name=infoDrogasAlemCrack]:checked" ).val() == "Sim")
	{
		jQuery('#drogasAlemCrack').attr('style','display:block');
	}
	else{
		jQuery('#drogasAlemCrack').attr('style','display:none');
	}
//  });
}
/* FIM - infoDrogasAlemCrack */








/* INICIO - infoTemCompanheiro */
function infoTemCompanheiro()
{
  var valRadio = '';
//  jQuery("#infoTemCompanheiro .radio").click(function(){
  	if ($( "input:radio[name=infoTemCompanheiro]:checked" ).val() == "Sim")
	{
		jQuery('#companheiroInseridoPrograma').attr('style','display:block');
	}
	else{
		jQuery('#companheiroInseridoPrograma').attr('style','display:none');
	}
//  });
  /* FIM - infoTemCompanheiro */
}

/* INICIO - infoEsteveInternado */
function infoEsteveInternadof()
{
  var valRadio = '';
//  jQuery("#infoEsteveInternado .radio").click(function(){
  	if ($( "input:radio[name=infoEsteveInternado]:checked" ).val() == "Sim")
	{
		jQuery('#internacao').attr('style','display:block');
	}
	else{
		jQuery('#internacao').attr('style','display:none');
	}
//  });
  /* FIM - infoEsteveInternado */
}

/* INICIO - infoAcompanhamentoCaps */
function infoAcompanhamentoCapsf()
{
  var valRadio = '';
//  jQuery("#infoAcompanhamentoCaps .radio").click(function(){
  	if ($( "input:radio[name=infoAcompanhamentoCaps]:checked" ).val() == "Sim")
	{
		jQuery('#qualAcompanhamentoCaps').attr('style','display:block');
		jQuery('#tipoFrequenciaCaps').attr('style','display:block');
		jQuery('#nomeTecnicoReferenciaCaps').attr('style','display:block');
	}
	else{
		jQuery('#qualAcompanhamentoCaps').attr('style','display:none');
		jQuery('#tipoFrequenciaCaps').attr('style','display:none');
		jQuery('#nomeTecnicoReferenciaCaps').attr('style','display:none');
	}
//  });
  /* FIM - infoAcompanhamentoCaps */
}

function infoCadastroAcompanhamentoUbsf()
{  
  /* INICIO - infoCadastroAcompanhamentoUbs */
  var valRadio = '';
//  jQuery("#infoCadastroAcompanhamentoUbs .radio").click(function(){
  	if ($( "input:radio[name=infoCadastroAcompanhamentoUbs]:checked" ).val() == "Sim")
	{
		jQuery('#ubsAcompanhamentoCadasdtro').attr('style','display:block');
	}
	else{
		jQuery('#ubsAcompanhamentoCadasdtro').attr('style','display:none');
	}
//  });
  /* FIM - infoCadastroAcompanhamentoUbs */
}

//Social

/* INICIO - providencias */
function providenciasf()
{
  var valRadio = '';
//  jQuery("#infoHouveProvidencias .radio").click(function(){
  	if ($( "input:radio[name=infoHouveProvidencias]:checked" ).val() == "Sim")
	{
		jQuery('#providencias').attr('style','display:block');
	}
	else{
		jQuery('#providencias').attr('style','display:none');
	}
//  });
}
/* FIM - providencias */

/* INICIO - infoEncaminhamento */
function infoEncaminhamento()
{
  var valRadio = '';
//  jQuery("#infoEncaminhamento .radio").click(function(){
  	if ($( "input:radio[name=infoEncaminhamento]:checked" ).val() == "Sim")
	{
		jQuery('#unidadeSaude').attr('style','display:block');
		jQuery('#nomeUnidadeSaude').attr('style','display:block');
	}
	else{
		jQuery('#unidadeSaude').attr('style','display:none');
		jQuery('#nomeUnidadeSaude').attr('style','display:none');
	}
//  });
}
/* FIM - infoEncaminhamento */

/* INICIO - quaisMedicamentos */
function quaisMedicamentosf()
{
  var valRadio = '';
//  jQuery("#infoUsoMedicamentos .radio").click(function(){
  	if ($( "input:radio[name=infoUsoMedicamentos]:checked" ).val() == "Sim")
	{
		jQuery('#quaisMedicamentos').attr('style','display:block');
	}
	else{
		jQuery('#quaisMedicamentos').attr('style','display:none');
	}
//  });
}
/* FIM - quaisMedicamentos */

/* INICIO - listaDocumentos */
function listaDocumentosf()
{
  var valRadio = '';
//  jQuery("#infoDocumentosAposPrograma .radio").click(function(){
  	if ($( "input:radio[name=infoDocumentosAposPrograma]:checked" ).val() == "Sim")
	{
		jQuery('#listaDocumentos').attr('style','display:block');
	}
	else{
		jQuery('#listaDocumentos').attr('style','display:none');
	}
//  });
}
/* FIM - listaDocumentos */

//Trabalho
/* INICIO - quaisCursoQualificacaoProfissional */
function quaisCursoQualificacaoProfissionalf()
{
  var valRadio = '';
//  jQuery("#infoCursoQualificacaoProfissional .radio").click(function(){
  	if ($( "input:radio[name=infoCursoQualificacaoProfissional]:checked" ).val() == "Sim")
	{
		jQuery('#quaisCursoQualificacaoProfissional').attr('style','display:block');
	}
	else{
		jQuery('#quaisCursoQualificacaoProfissional').attr('style','display:none');
	}
//  });
}
/* FIM - quaisCursoQualificacaoProfissional */

/* INICIO - quaisOutraAtividadeBico */
function quaisOutraAtividadeBicof()
{
  var valRadio = '';
//  jQuery("#infoOutraAtividadeBico .radio").click(function(){
  	if ($( "input:radio[name=infoOutraAtividadeBico]:checked" ).val() == "Sim")
	{
		jQuery('#quaisOutraAtividadeBico').attr('style','display:block');
	}
	else{
		jQuery('#quaisOutraAtividadeBico').attr('style','display:none');
	}
//  });
}
/* FIM - quaisOutraAtividadeBico */


/* INICIO - quaisTeveNegocioProprio */
function quaisTeveNegocioPropriof()
{
  var valRadio = '';
//  jQuery("#infoTeveNegocioProprio .radio").click(function(){
  	if ($( "input:radio[name=infoTeveNegocioProprio]:checked" ).val() == "Sim")
	{
		jQuery('#quaisTeveNegocioProprio').attr('style','display:block');
	}
	else{
		jQuery('#quaisTeveNegocioProprio').attr('style','display:none');
	}
//  });
}
/* FIM - quaisTeveNegocioProprio */

/* INICIO - quaisProcurouProgramaPmsp */
function quaisProcurouProgramaPmspf()
{
  var valRadio = '';
//  jQuery("#infoProcurouProgramaPmsp .radio").click(function(){
  	if ($( "input:radio[name=infoProcurouProgramaPmsp]:checked" ).val() == "Sim")
	{
		jQuery('#quaisProcurouProgramaPmsp').attr('style','display:block');
	}
	else{
		jQuery('#quaisProcurouProgramaPmsp').attr('style','display:none');
	}
//  });
}
/* FIM - quaisProcurouProgramaPmsp */

/* VOLTAR */
function btnVoltar()
{
	jQuery("#div_atividades_add").hide();
	jQuery("#div_atividades").show();
}

// AGUARDE
function aguardeMsgOn(msg) {
	$("#loader").empty();
	$("#loader").append("<img src='img/loading.gif' /><p>" + msg + "</p>");
	$('#loader').attr('style','display:block');
}
function aguardeMsgOff(msg) {
	$('#loader').attr('style','display:none');
}

// Botão de atualização após o login
function btnSincronizar() {
	if (localStorage.getItem("dadosEnviar") == 1) {
		// Há dados para enviar
		BANCODADOS.initUpload(USUARIO.usuario_id);
	}
	else {
		// Executa sincronismo automático
		BANCODADOS.initSincronismo(USUARIO.usuario_id);
	}
}

// MENSAGENS EM ALERTA
function alertClose() {
	$('#msg-ok').attr('style','display:none');
}

var alertOptionsCallback = null;

function alertCloseYes(cb) {
	$('#msg-yn').attr('style','display:none');
}

function alertCloseCallback() {
	$('#msg-ok').attr('style','display:none');
	alertOptionsCallback();
}

function alertMessageCallback(msg, cb) {
	alertOptionsCallback = cb;
	$("#txtMsgOK").empty();
	var conteudo = "<img src='img/msgInfo.png' width='128'><p>";
	conteudo += msg;
	conteudo += "</p><input onclick='alertCloseCallback()' type='button'  value='OK' id='bt-msgok' class='btnOk'>";
	$("#txtMsgOK").append(conteudo);
	$('#msg-ok').attr('style','display:block');
}

function alertCloseYesCallback() {
	$('#msg-yn').attr('style','display:none');
	alertOptionsCallback();
}

function alertCloseNo() {
	$('#msg-yn').attr('style','display:none');
}

function alertMessage(msg) {
	$("#txtMsgOK").empty();
	var conteudo = "<img src='img/msgInfo.png' width='128'><p>";
	conteudo += msg;
	conteudo += "</p><input onclick='alertClose()' type='button'  value='OK' id='bt-msgok' class='btnOk'>";
	$("#txtMsgOK").append(conteudo);
	$('#msg-ok').attr('style','display:block');
}

function alertOptionsCallback(msg, cb) {
	alertOptionsCallback = cb;
	$("#txtMsgYN").empty();
	var conteudo = "<img src='img/msgWarning.png' width='128'><p>";
	conteudo += msg;
    conteudo += "</p><input onclick='alertCloseYesCallback()' type='button'  value='Sim' id='bt-msgy' class='btnY'>";
    conteudo += "<input onclick='alertCloseNo()' type='button'  value='Não' id='bt-msgn' class='btnN'>";
	$("#txtMsgYN").append(conteudo);
	$('#msg-yn').attr('style','display:block');
}

function alertOptions(msg) {
	$("#txtMsgYN").empty();
	var conteudo = "<img src='img/msgWarning.png' width='128'><p>";
	conteudo += msg;
    conteudo += "</p><input onclick='alertCloseYes()' type='button'  value='Sim' id='bt-msgy' class='btnY'>";
    conteudo += "<input onclick='alertCloseNo()' type='button'  value='Não' id='bt-msgn' class='btnN'>";
	$("#txtMsgYN").append(conteudo);
	$('#msg-yn').attr('style','display:block');
}

function alertLogoff(msg) {
	$("#txtMsgYN").empty();
	var conteudo = "<img src='img/msgWarning.png' width='128'><p>";
	conteudo += "Você realmente deseja sair?";
    conteudo += "</p><input onclick='alertOffYes()' type='button'  value='Sim' id='bt-msgy' class='btnY'>";
    conteudo += "<input onclick='alertOffNo()' type='button'  value='Não' id='bt-msgn' class='btnN'>";
	$("#txtMsgYN").append(conteudo);
	$('#msg-yn').attr('style','display:block');
}
function alertOffYes() {
	if (navigator.app) {
        navigator.app.exitApp();
    } else if (navigator.device) {
        navigator.device.exitApp();
    }
	$('#msg-yn').attr('style','display:none');
}

function alertOffNo() {
	$('#msg-yn').attr('style','display:none');
}