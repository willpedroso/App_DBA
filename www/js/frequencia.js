function carregaFrequencia () {
	console.log("carregaFrequencia");
	
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
}

function salvaFrequenciaFail (err) {
	console.log("salvaFrequenciaFail: " + err);
}

function validaCamposFrequencia() {
	console.log("validaCamposFrequencia");
}
