function carregaDadosCidadao () {
	console.log("carregaDadosCidadao");
	
	$("#nome").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome);
	$("#nome_social").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_social);
	$("#nome_mae").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_mae);
	$("#sisrua").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].sisrua);
	$("#data_nascimento").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].ano_nascimento + "-" +
							  CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].mes_nascimento + "-" +
							  CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].dia_nascimento);
							  
	// Preenche a ficha do cidadão
	var dadosFichaCidadao = "";
	dadosFichaCidadao += "<img class='foto-cidadao' src='img/user1.png'>";
    dadosFichaCidadao += "<p class='info-basica' lingdex='0'>";
    dadosFichaCidadao += "Nome completo: <strong>" + CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome + "</strong>";
    dadosFichaCidadao += "<br>";
    dadosFichaCidadao += "Nome social: <strong>" + CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_social + "</strong>";
    dadosFichaCidadao += "<br>";
    dadosFichaCidadao += "Nome da mãe: <strong>" + CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_mae + "</strong>";
    dadosFichaCidadao += "<br>";
    dadosFichaCidadao += "Número SISA: <strong>" + CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].sisrua + "</strong>";
    dadosFichaCidadao += "<br>";
    dadosFichaCidadao += "Data de nascimento: <strong>" + CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].dia_nascimento + "/" +
														  CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].mes_nascimento + "/" +
														  CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].ano_nascimento + "</strong>";
    dadosFichaCidadao += "<br>";
    dadosFichaCidadao += "Situação Cadastral: <strong>" + (CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].situacao_cadastral == 1 ? "Ativa" : "Inativa") + "</strong>";
    dadosFichaCidadao += "<br>";
    dadosFichaCidadao += "Prioridade: <strong>" + (CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].prioridade == 1 ? "Sim" : "Não") + "</strong>";
    dadosFichaCidadao += "<br>";
    dadosFichaCidadao += "Autoriza Programa DBA: <strong>" + (CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].programa_dba == 1 ? "Sim" : "Não") + "</strong>";
    dadosFichaCidadao += "<br>";
    dadosFichaCidadao += "Local de Acolhida: <strong>" + CIDADAO.listaPontosServico[CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].ponto_servico_id].nome + "</strong>";
    dadosFichaCidadao += "<br>";
    dadosFichaCidadao += "</p>";
	$("#info-basica").empty();
	$("#info-basica").append(dadosFichaCidadao);
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
