function carregaDadosCidadao () {
	console.log("carregaDadosCidadao");
	
	$("#nome").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome);
	$("#nome_social").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_social);
	$("#nome_mae").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_mae);
	$("#sisrua").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].sisrua);
	$("#data_nascimento").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].ano_nascimento + "-" +
							  CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].mes_nascimento + "-" +
							  CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].dia_nascimento);
}	

function salvaCidadaoSuccess () {
	console.log("salvaCidadaoSuccess");
	// todo: testes retirar
	alert("Cidadão foi salvo com sucesso.");
	// todo: testes retirar
}

function salvaCidadaoFail (err) {
	console.log("identificacao.salvaCidadaoFail: " + err);
	// todo: testes retirar
	alert("Houve erro no salvamento do cidadão: " + err);
	// todo: testes retirar
}

function validaCamposIdentificacao() {
	console.log("validaCamposIdentificacao");

	var erro = false;
	if ($("#nome").val().length == 0) {
		$("#nome").addClass("inputFocus");
		erro = true;
	}
	else $("#nome").removeClass("inputFocus");
	if ($("#nome_mae").val().length == 0) {
		$("#nome_mae").addClass("inputFocus");
		erro = true;
	}
	else $("#nome_mae").removeClass("inputFocus");

	// Se houve erro
	if (erro == true) {
		// Apresenta mensagem "msgAtencao"
		$('.msgAtencao').removeAttr('style');
		$('.msgParabens').attr('style', 'display:none');
		$('.msgErro').attr('style', 'display:none');
	}
	else {
		$('.msgAtencao').attr('style', 'display:none');
		$('.msgParabens').attr('style', 'display:none');
		$('.msgErro').attr('style', 'display:none');

		// todo: testes retirar

		// todo: testes retirar
		// prepara data de nascimento
		var dnascimento = new Date($('#data_nascimento').val());
		
		// todo: testes retirar
		console.log(dnascimento);
		// todo: testes retirar
		
		CIDADAO.salvaCidadao($("#nome").val(),											// nome
							 $("#nome_social").val(),									// nome social
							 $("#nome_mae").val(),										// nome da mãe
							 $("#sisrua").val(),										// sisrua
							 dnascimento.getDate(),										// dia do nascimento
							 dnascimento.getMonth()+1,									// mês do nascimento
							 dnascimento.getFullYear(),									// ano do nascimento
							 this.salvaCidadaoSuccess,
							 this.salvaCidadaoFail);
	}
}
