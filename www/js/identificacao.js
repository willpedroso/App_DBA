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
	
}

function salvaCidadaoFail (err) {
	console.log("identificacao.salvaCidadaoFail: " + err);
	
}

function validaCamposIdentificacao() {
	console.log("validaCamposIdentificacao");

	var erro = false;
	

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
		
		CIDADAO.salvaCidadao(/*todo: indice do cidadao*/,									// índice do cidadão
								 $("#nome").val(),											// nome
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
