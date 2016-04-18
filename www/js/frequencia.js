function carregaFrequencia () {
	console.log("carregaFrequencia");
	$('.divMenuInterno').removeClass('showme');
	$('.divMenuInterno').addClass('hideme');
	window.scrollTo(0, 0);
	var hoje = new Date();
	FREQUENCIA.auxData = hoje.getFullYear() + "-" + ((hoje.getMonth() + 1) > 9 ? (hoje.getMonth() + 1) : "0" + (hoje.getMonth() + 1)) + "-" + (hoje.getDate() > 9 ? hoje.getDate() : "0" + hoje.getDate());
	$("#dataCorrente").val((hoje.getDate() > 9 ? hoje.getDate() : "0" + hoje.getDate()) + "/" + 
						   ((hoje.getMonth() + 1) > 9 ? (hoje.getMonth() + 1) : "0" + (hoje.getMonth() + 1)) + "/" +
						   hoje.getFullYear());
			
	if (USUARIO.perfil_tecnico == true) {
		// Usuário é técnico, abre em frequências
		aguardeMsgOn("Carregando dados...");
		PageManager.loadTmpl('div_frequencia');
	}
	else {
		// Usuário não é técnico, abre a lista de cidadãos
		PageManager.loadTmpl('div_cidadaos_frequencia');
	}
}	

function salvaFrequenciaSuccess () {
	console.log("salvaFrequenciaSuccess");
	
	aguardeMsgOn("Carregando dados...");
	PageManager.loadTmpl('div_frequencia');
}

function salvaFrequenciaFail (err) {
	console.log("salvaFrequenciaFail: " + err);

	aguardeMsgOff();
	alertMessage ("Houve falha no salvamento da frequência.");
}

function validaCamposFrequencia(indiceCidadao, indiceFrequencia, nomeRadio, nomeObs, cidadao_id, tipo_atuacao_id, nomeCheck) {
	console.log("validaCamposFrequencia");
	
	// todo: testes retirar
	/*
	console.log("Indice do cidadão: " + indiceCidadao + 
				" - Indice da frequência: " + indiceFrequencia + 
				" - Nome do rádio: " + nomeRadio + 
				" - Nome da observação: " + nomeObs +
				" - ID do cidadão: " + cidadao_id +
				" - Tipo de atuação: " + tipo_atuacao_id);
	*/
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
	/*
	console.log("frequencia = " + frequencia + " - justificativa = " + $('#' + nomeObs).val());
	*/
	// testes retirar
	
	if (indiceFrequencia != null) {
		FREQUENCIA.salvaFrequencia (indiceCidadao, indiceFrequencia, frequencia, $('#' + nomeObs).val(), cidadao_id, tipo_atuacao_id, nomeCheck, this.salvaFrequenciaSuccess, this.salvaFrequenciaFail);
	}
	else {
		FREQUENCIA.salvaFrequencia (indiceCidadao, indiceFrequencia, frequencia, $('#' + nomeObs).val(), cidadao_id, tipo_atuacao_id, nomeCheck, this.salvaFrequenciaSuccess, this.salvaFrequenciaFail);
	}
}

function dataMudou() {
	console.log("dataMudou");
	
	var data = $("#dataCorrente").val().split("/");
	if (FREQUENCIA.auxData != (data[2] + "-" + data[1] + "-" + data[0]))
	{
		// Houve mudança de data
		FREQUENCIA.auxData = data[2] + "-" + data[1] + "-" + data[0];
		aguardeMsgOn("Carregando dados...");
		PageManager.loadTmpl('div_frequencia');
	}
}
