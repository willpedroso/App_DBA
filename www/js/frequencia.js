function carregaFrequencia () {
	console.log("carregaFrequencia");

	var hoje = new Date();
	FREQUENCIA.auxData = hoje.getFullYear() + "-" + ((hoje.getMonth() + 1) > 9 ? (hoje.getMonth() + 1) : "0" + (hoje.getMonth() + 1)) + "-" + (hoje.getDate() > 9 ? hoje.getDate() : "0" + hoje.getDate());
			
	if (USUARIO.perfil_tecnico == true) {
		// Usuário é técnico, abre em frequências
		PageManager.loadTmpl('div_frequencia');
	}
	else {
		// Usuário não é técnico, abre a lista de cidadãos
		PageManager.loadTmpl('div_cidadaos_frequencia');
	}
}	

function salvaFrequenciaSuccess () {
	console.log("salvaFrequenciaSuccess");
	
	// todo: revisar
	alert ("Frequência salva com sucesso.");
	// revisar

	PageManager.loadTmpl('div_frequencia');
}

function salvaFrequenciaFail (err) {
	console.log("salvaFrequenciaFail: " + err);

	// todo: revisar
	alert ("Houve falha no salvamento da frequência.");
	// revisar
}

function validaCamposFrequencia(indiceCidadao, indiceFrequencia, nomeRadio, nomeObs, cidadao_id, tipo_atuacao_id) {
	console.log("validaCamposFrequencia");
	
	// todo: testes retirar
	console.log("Indice do cidadão: " + indiceCidadao + 
				" - Indice da frequência: " + indiceFrequencia + 
				" - Nome do rádio: " + nomeRadio + 
				" - Nome da observação: " + nomeObs +
				" - ID do cidadão: " + cidadao_id +
				" - Tipo de atuação: " + tipo_atuacao_id);
	// testes retirar
	
	// Obtém frequência
	var frequencia = null;
	if ($( 'input:radio[name=' + nomeRadio + ']:checked' ).val() == "Não") {
		frequencia = 0;
	}
	else if ($( 'input:radio[name=' + nomeRadio + ']:checked' ).val() == "Sim") {
		frequencia = 1;
	}
	
	// todo: testes retirar
	console.log("frequencia = " + frequencia + " - justificativa = " + $('#' + nomeObs).val());
	// testes retirar
	
	if (indiceFrequencia != null) {
		FREQUENCIA.salvaFrequencia (indiceCidadao, indiceFrequencia, frequencia, $('#' + nomeObs).val(), cidadao_id, tipo_atuacao_id, this.salvaFrequenciaSuccess, this.salvaFrequenciaFail);
	}
	else {
		FREQUENCIA.salvaFrequencia (indiceCidadao, indiceFrequencia, frequencia, $('#' + nomeObs).val(), cidadao_id, tipo_atuacao_id, this.salvaFrequenciaSuccess, this.salvaFrequenciaFail);
	}
}

function dataMudou() {
	console.log("dataMudou");
	
	FREQUENCIA.auxData = $("#dataCorrente").val();
	PageManager.loadTmpl('div_frequencia');
}
