function socialOpcoes () {
	console.log("socialOpcoes");
}

function carregaSocial () {
	console.log("carregaSocial");
	
	// Verifica se é salvamento
	if (CIDADAOSOCIAL.ehSalvamento == true) {
		$('.msgParabens').removeAttr('style');
		$('html, body').animate({scrollTop:0}, 'slow');
		CIDADAOSOCIAL.ehSalvamento = false;
	}
	
	var edit = true;		// todo: sempre em edição

	var auxVar;
	
	// Nome do contato
	auxVar = CIDADAOSOCIAL.dadosSocial.nome_contato;
	$("#nome_contato").val(auxVar === null ? "" : auxVar);
	
	// Endereço do contato
	auxVar = CIDADAOSOCIAL.dadosSocial.endereco_contato;
	$("#endereco_contato").val(auxVar === null ? "" : auxVar);
	
	// UF do contato
	var opts = "<div class='comboStilo selectInicialUF'><select name='estadoNomeLabel' id='estadoNomeLabel' class='selectUF'><div class='comboStilo'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOSOCIAL.listaEstados.length; i++) {
		opts += "<option value='" + CIDADAOSOCIAL.listaEstados[i].id + "' data-id='estadoNomeLabel' for='tipo_estado_id'";
		opts += ((edit == true && CIDADAOSOCIAL.dadosSocial.tipo_estado_id == CIDADAOSOCIAL.listaEstados[i].id) ? " selected>" : ">") + CIDADAOSOCIAL.listaEstados[i].sigla + " - " + CIDADAOSOCIAL.listaEstados[i].nome + "</option>";
	}
	opts += "</div></select></div>";
	
	$("#ufContato").empty();
	$("#ufContato").append(opts);

	// Município do contato
	auxVar = CIDADAOSOCIAL.dadosSocial.municipio_contato;
	$("#municipio_contato").val(auxVar === null ? "" : auxVar);

	// Dispositivos de contato
	var opts = "<div class='comboStilo selectInicial'><select name='tipoDispositivoContatoLabel' id='tipoDispositivoContatoLabel' class='selectPersonalizado'><div class='comboStilo'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOSOCIAL.listaTipoDispositivoContato.length; i++) {
		opts += "<option value='" + CIDADAOSOCIAL.listaTipoDispositivoContato[i].id + "' data-id='tipoDispositivoContatoLabel' for='tipo_dispositivo_contato_id'>";
		opts += CIDADAOSOCIAL.listaTipoDispositivoContato[i].nome + "</option>";
	}
	opts += "</div></select></div>";
	console.log(opts);
	
	$("#listaSelectTipoDispositivoContato").empty();
	$("#listaSelectTipoDispositivoContato").append(opts);
	for (var i = 0; i < CIDADAOSOCIAL.listaContatos.length; i++) {
		auxVar = CIDADAOSOCIAL.listaContatos[i].numero_descricao;
		$('.adicionaNumContato').val(auxVar === null ? "" : auxVar);

		// Obtém o nome do tipo de dispositivo de contato
		for (j = 0; j < CIDADAOSOCIAL.listaTipoDispositivoContato.length; j++) {
			if (CIDADAOSOCIAL.listaTipoDispositivoContato[j].id == CIDADAOSOCIAL.listaContatos[i].tipo_dispositivo_contato_id) {
				adicionaContato(CIDADAOSOCIAL.listaTipoDispositivoContato[j].nome);		
				break;
			}
		}
	}
	
	// Local de referência
	auxVar = CIDADAOSOCIAL.dadosSocial.local_referencia;
	$("#local_referencia").val(auxVar === null ? "" : auxVar);
	
	// A partir da inserção do Programa DBA, retirou documentos
	if (CIDADAOSOCIAL.dadosSocial.documentos_apos_programa === 1) {
		// Sim
		$("input[name='infoDocumentosAposPrograma'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSOCIAL.dadosSocial.documentos_apos_programa === 0) {
		// Não
		$("input[name='infoDocumentosAposPrograma'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoDocumentosAposPrograma'][value='Não Informado']").prop("checked", true);
	}
	listaDocumentosf();
	var opts = "<div class='comboStilo selectInicial'><select name='tipoDocumentoLabel' id='tipoDocumentoLabel' class='selectPersonalizado'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOSOCIAL.listaTipoDocumento.length; i++) {
		opts += "<option value='" + CIDADAOSOCIAL.listaTipoDocumento[i].id + "' data-id='tipoDocumentoLabel' for='tipo_documento_id'>";
		opts += CIDADAOSOCIAL.listaTipoDocumento[i].nome + "</option>";
	}
	opts += "</select></div>";
	console.log(opts);
	
	$("#listaDocumentos2").empty();
	$("#listaDocumentos2").append(opts);
	for (var i = 0; i < CIDADAOSOCIAL.listaDocumentos.length; i++) {
		auxVar = CIDADAOSOCIAL.listaDocumentos[i].numero_descricao_documento;
		$('.adicionaNumDocumento').val(auxVar === null ? "" : auxVar);

		// Obtém o nome do tipo de documento
		for (j = 0; j < CIDADAOSOCIAL.listaTipoDocumento.length; j++) {
			if (CIDADAOSOCIAL.listaTipoDocumento[j].id == CIDADAOSOCIAL.listaDocumentos[i].tipo_documento_id) {
				adicionaDocumento(CIDADAOSOCIAL.listaTipoDocumento[j].nome);		
				break;
			}
		}
	}
	
	// todo: Houve restabelecimento de vínculos familiares
	if (CIDADAOSOCIAL.dadosSocial.vinculo_familia_restabelecido === 1) {
		// Sim
		$("input[name='infoVinculoFamiliaRestabelecido'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSOCIAL.dadosSocial.vinculo_familia_restabelecido === 0) {
		// Não
		$("input[name='infoVinculoFamiliaRestabelecido'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoVinculoFamiliaRestabelecido'][value='Não Informado']").prop("checked", true);
	}
	
	// Formação Profissional
	auxVar = CIDADAOSOCIAL.dadosSocial.formacao_profissional;
	$("#formacao_profissional").val(auxVar === null ? "" : auxVar);

	// Atividades profissionais
	auxVar = CIDADAOSOCIAL.dadosSocial.atividade_profissional;
	$("#atividade_profissional").val(auxVar === null ? "" : auxVar);

	// Nome da empresa
	auxVar = CIDADAOSOCIAL.dadosSocial.nome_empresa;
	$("#nome_empresa").val(auxVar === null ? "" : auxVar);

	// Data de admissão
	auxVar = CIDADAOSOCIAL.dadosSocial.data_admissao;
	$("#data_admissao").val(auxVar === null ? "" : auxVar);

	// Cargo
	auxVar = CIDADAOSOCIAL.dadosSocial.cargo;
	$("#cargo").val(auxVar === null ? "" : auxVar);

	// Faixa de Renda
	auxVar = CIDADAOSOCIAL.dadosSocial.faixa_renda;
	$("#faixa_renda").val(auxVar === null ? "" : auxVar);

	// Endereço da empresa
	auxVar = CIDADAOSOCIAL.dadosSocial.endereco_empresa;
	$("#endereco_empresa").val(auxVar === null ? "" : auxVar);

	// Dispositivos de contato da empresa
	var opts = "<div class='comboStilo selectInicial'><select name='tipoDispositivoContatoEmpresaLabel' id='tipoDispositivoContatoEmpresaLabel' class='selectPersonalizado'><div class='comboStilo'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOSOCIAL.listaTipoDispositivoContato.length; i++) {
		opts += "<option value='" + CIDADAOSOCIAL.listaTipoDispositivoContato[i].id + "' data-id='tipoDispositivoContatoEmpresaLabel' for='tipo_dispositivo_contato_id'>";
		opts += CIDADAOSOCIAL.listaTipoDispositivoContato[i].nome + "</option>";
	}
	opts += "</div></select></div>";
	console.log(opts);
	
	$("#listaSelectTipoDispositivoContatoEmpresa").empty();
	$("#listaSelectTipoDispositivoContatoEmpresa").append(opts);
	for (var i = 0; i < CIDADAOSOCIAL.listaContatosEmpresa.length; i++) {
		auxVar = CIDADAOSOCIAL.listaContatosEmpresa[i].numero_descricao;
		$('.adicionaNumContatoEmpresa').val(auxVar === null ? "" : auxVar);

		// Obtém o nome do tipo de dispositivo de contato empresa
		for (j = 0; j < CIDADAOSOCIAL.listaTipoDispositivoContato.length; j++) {
			if (CIDADAOSOCIAL.listaTipoDispositivoContato[j].id == CIDADAOSOCIAL.listaContatosEmpresa[i].tipo_dispositivo_contato_id) {
				adicionaContatoEmpresa(CIDADAOSOCIAL.listaTipoDispositivoContato[j].nome);		
				break;
			}
		}
	}
	
	// Problemas de saúde
	auxVar = CIDADAOSOCIAL.dadosSocial.problemas_saude;
	$("#problemas_saude").val(auxVar === null ? "" : auxVar);

	// Faz uso de medicamentos
	if (CIDADAOSOCIAL.dadosSocial.uso_medicamentos === 1) {
		// Sim
		$("input[name='infoUsoMedicamentos'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSOCIAL.dadosSocial.uso_medicamentos === 0) {
		// Não
		$("input[name='infoUsoMedicamentos'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoUsoMedicamentos'][value='Não Informado']").prop("checked", true);
	}
	quaisMedicamentosf();
	auxVar = CIDADAOSOCIAL.dadosSocial.qual_medicamento;
	$("#qual_medicamento").val(auxVar === null ? "" : auxVar);

	// Houve encaminhamento
	if (CIDADAOSOCIAL.dadosSocial.encaminhamento === 1) {
		// Sim
		$("input[name='infoEncaminhamento'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSOCIAL.dadosSocial.encaminhamento === 0) {
		// Não
		$("input[name='infoEncaminhamento'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoEncaminhamento'][value='Não Informado']").prop("checked", true);
	}
	infoEncaminhamento();
	auxVar = CIDADAOSOCIAL.dadosSocial.unidade_saude;
	$("#unidade_saude").val(auxVar === null ? "" : auxVar);
	auxVar = CIDADAOSOCIAL.dadosSocial.nome_unidade_saude;
	$("#nome_unidade_saude").val(auxVar === null ? "" : auxVar);

	// Entrevistas - Projeto de vida
	auxVar = CIDADAOSOCIAL.dadosSocial.entrevista_projeto_vida;
	$("#entrevista_projeto_vida").val(auxVar === null ? "" : auxVar);

	// Houve providências
	if (CIDADAOSOCIAL.dadosSocial.houve_providencias === 1) {
		// Sim
		$("input[name='infoHouveProvidencias'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSOCIAL.dadosSocial.houve_providencias === 0) {
		// Não
		$("input[name='infoHouveProvidencias'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoHouveProvidencias'][value='Não Informado']").prop("checked", true);
	}
	providenciasf();
	for (var i = 0; i < CIDADAOSOCIAL.listaProvidencias.length; i++) {
		auxVar = CIDADAOSOCIAL.listaProvidencias[i].tipo;
		$('.adicionaObsProvidencia').val(auxVar === null ? "" : auxVar);
		auxVar = CIDADAOSOCIAL.listaProvidencias[i].situacao;
		$('.adicionaObsProvidenciaPeq').val(auxVar === null ? "" : auxVar);
		auxVar = CIDADAOSOCIAL.listaProvidencias[i].observacao;
		$('.textareaProvidencia').val(auxVar === null ? "" : auxVar);

		adicionaProvidencia();		
	}
	
	// Número do NIS
	auxVar = CIDADAOSOCIAL.dadosSocial.numero_nis;
	$("#numero_nis").val(auxVar === null ? "" : auxVar);

	// CTPS
	auxVar = CIDADAOSOCIAL.dadosSocial.ctps;
	$("#ctps").val(auxVar === null ? "" : auxVar);

	// Título de eleitor
	auxVar = CIDADAOSOCIAL.dadosSocial.titulo_eleitor;
	$("#titulo_eleitor").val(auxVar === null ? "" : auxVar);

	// Certidões
	var opts = "<div class='comboStilo selectInicial'><select name='tipoCertidaoLabel' id='tipoCertidaoLabel' class='selectPersonalizado'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOSOCIAL.listaTipoCertidao.length; i++) {
		opts += "<option value='" + CIDADAOSOCIAL.listaTipoCertidao[i].id + "' data-id='tipoCertidaoLabel' for='tipo_certidao_id'>";
		opts += CIDADAOSOCIAL.listaTipoCertidao[i].nome + "</option>";
	}
	opts += "</select></div>";
	console.log(opts);
	
	$("#listaTipoCertidao").empty();
	$("#listaTipoCertidao").append(opts);
	for (var i = 0; i < CIDADAOSOCIAL.listaCertidoes.length; i++) {
		auxVar = CIDADAOSOCIAL.listaCertidoes[i].numero;
		$('.adicionaObsCertidao').val(auxVar === null ? "" : auxVar);

		// Obtém o nome do tipo de dispositivo de contato empresa
		for (j = 0; j < CIDADAOSOCIAL.listaTipoCertidao.length; j++) {
			if (CIDADAOSOCIAL.listaTipoCertidao[j].id == CIDADAOSOCIAL.listaCertidoes[i].tipo_certidao_id) {
				adicionaCertidao(CIDADAOSOCIAL.listaTipoCertidao[j].nome);		
				break;
			}
		}
	}
	
	// Número da portaria de naturalização
	auxVar = CIDADAOSOCIAL.dadosSocial.numero_portaria_naturalizacao;
	$("#numero_portaria_naturalizacao").val(auxVar === null ? "" : auxVar);

	// Observações
	auxVar = CIDADAOSOCIAL.dadosSocial.observacoes_gerais;
	$("#observacoes_gerais").val(auxVar === null ? "" : auxVar);
}

function salvaSocialSuccess () {
	console.log("salvaSocialSuccess");
	// todo: revisar
}

function salvaSocialFail (err) {
	console.log("salvaSocialFail: " + err);
	// todo: revisar
}

function socialSalva() {
	console.log("socialSalva");

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

		var listaDados = [];
		var auxVar;

		// Nome do contato
		listaDados.push($("#nome_contato").val());
		
		// Endereço do contato
		listaDados.push($("#endereco_contato").val());
		
		// UF do contato
		listaDados.push($("#estadoNomeLabel").val() == "Selecione" ? null : $("#estadoNomeLabel").val());

		// Município do contato
		listaDados.push($("#municipio_contato").val());

		// Local de referência
		listaDados.push($("#local_referencia").val());
		
		// Formação Profissional
		listaDados.push($("#formacao_profissional").val());

		// Atividades profissionais
		listaDados.push($("#atividade_profissional").val());

		// Nome da empresa
		listaDados.push($("#nome_empresa").val());

		// Data de admissão
		listaDados.push($("#data_admissao").val());

		// Cargo
		listaDados.push($("#cargo").val());

		// Faixa de Renda
		listaDados.push($("#faixa_renda").val());

		// Endereço da empresa
		listaDados.push($("#endereco_empresa").val());

		// Problemas de saúde
		listaDados.push($("#problemas_saude").val());

		// Faz uso de medicamentos
		auxVar = null;
		if ($("input:radio[name=infoUsoMedicamentos]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoUsoMedicamentos]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#qual_medicamento").val());

		// Houve encaminhamento
		auxVar = null;
		if ($("input:radio[name=infoEncaminhamento]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoEncaminhamento]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#unidade_saude").val());
		listaDados.push($("#nome_unidade_saude").val());

		// Entrevistas - Projeto de vida
		listaDados.push($("#entrevista_projeto_vida").val());
		
		// Houve providências
		auxVar = null;
		if ($("input:radio[name=infoHouveProvidencias]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoHouveProvidencias]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// Número do NIS
		listaDados.push($("#numero_nis").val());

		// CTPS
		listaDados.push($("#ctps").val());

		// Título de eleitor
		listaDados.push($("#titulo_eleitor").val());

		// Número da portaria de naturalização
		listaDados.push($("#numero_portaria_naturalizacao").val());

		// Observações
		listaDados.push($("#observacoes_gerais").val());

		// A partir da inserção do Programa DBA, retirou documentos
		auxVar = null;
		if ($("input:radio[name=infoDocumentosAposPrograma]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoDocumentosAposPrograma]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Houve restabelecimento de vínculos familiares
		auxVar = null;
		if ($("input:radio[name=infoVinculoFamiliaRestabelecido]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoVinculoFamiliaRestabelecido]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// todo: testes retirar
		var Print = "Salvar em trabalho: " + listaDados.length + " campos.\r\n";
		for (var i = 0; i < listaDados.length; i++) {
			Print += "Campo " + i + "= " + listaDados[i] + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		//***************************
		// LISTAS
		//***************************
		// Dispositivos de contato
		var dispositivosContato = [];
		var idTipoDispositivoContato = 0;
		$(".adicionaInputContato").children().each(function () {
			// Obtém o id do tipo de dispositivo de contato
			for (var i = 0; i < CIDADAOSOCIAL.listaTipoDispositivoContato.length; i++) {
				if (CIDADAOSOCIAL.listaTipoDispositivoContato[i].nome == this.children[0].value) {
					idTipoDispositivoContato = CIDADAOSOCIAL.listaTipoDispositivoContato[i].id;
					break;
				}
			}
			var v = {
				tipoDispositivoContato: idTipoDispositivoContato,
				numeroContato: this.children[1].value,
			};
			dispositivosContato.push(v);
		});
		CIDADAOSOCIAL.auxlistaContatos = dispositivosContato;
		
		// todo: testes retirar
		var Print = "Dispositivos de Contato\r\n";
		for (var i = 0; i < dispositivosContato.length; i++) {
			Print += "Tipo: " + dispositivosContato[i].tipoDispositivoContato + " - Número: " + dispositivosContato[i].numeroContato + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		// Documentos
		var documentos = [];
		var idTipoDocumento = 0;
		$(".adicionaInputDocumento").children().each(function () {
			// Obtém o id do tipo de documento
			for (var i = 0; i < CIDADAOSOCIAL.listaTipoDocumento.length; i++) {
				if (CIDADAOSOCIAL.listaTipoDocumento[i].nome == this.children[0].value) {
					idTipoDocumento = CIDADAOSOCIAL.listaTipoDocumento[i].id;
					break;
				}
			}
			var v = {
				tipoDocumento: idTipoDocumento,
				numero: this.children[1].value,
			};
			documentos.push(v);
		});
		CIDADAOSOCIAL.auxlistaDocumentos = documentos;
		
		// todo: testes retirar
		var Print = "Documentos\r\n";
		for (var i = 0; i < documentos.length; i++) {
			Print += "Tipo: " + documentos[i].tipoDocumento + " - Número: " + documentos[i].numero + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		// Dispositivos de contato da empresa
		var dispositivosContatoEmpresa = [];
		var idTipoDispositivoContatoEmpresa = 0;
		$(".adicionaInputContatoEmpresa").children().each(function () {
			// Obtém o id do tipo de dispositivo de contato empresa
			for (var i = 0; i < CIDADAOSOCIAL.listaTipoDispositivoContato.length; i++) {
				if (CIDADAOSOCIAL.listaTipoDispositivoContato[i].nome == this.children[0].value) {
					idTipoDispositivoContatoEmpresa = CIDADAOSOCIAL.listaTipoDispositivoContato[i].id;
					break;
				}
			}
			var v = {
				tipoDispositivoContatoEmpresa: idTipoDispositivoContatoEmpresa,
				numeroContato: this.children[1].value,
			};
			dispositivosContatoEmpresa.push(v);
		});
		CIDADAOSOCIAL.auxlistaContatosEmpresa = dispositivosContatoEmpresa;

		// todo: testes retirar
		var Print = "Dispositivos de Contato Empresa\r\n";
		for (var i = 0; i < dispositivosContatoEmpresa.length; i++) {
			Print += "Tipo: " + dispositivosContatoEmpresa[i].tipoDispositivoContatoEmpresa + " - Número: " + dispositivosContatoEmpresa[i].numeroContato + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		// Houve providências
		var providencias = [];
		$(".adicionaInputProvidencia").children().each(function () {
			var v = {
				tipo: this.children[0].value,
				situacao: this.children[1].value,
				observacao: this.children[2].value,
			};
			providencias.push(v);
		});
		CIDADAOSOCIAL.auxlistaProvidencias = providencias;

		// todo: testes retirar
		var Print = "Providências\r\n";
		for (var i = 0; i < providencias.length; i++) {
			Print += "Tipo: " + providencias[i].tipo + " - Situação: " + providencias[i].situacao + " - Observação: " + providencias[i].observacao + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		// Certidões
		var certidoes = [];
		var idTipoCertidao = 0;
		$(".adicionaInputCertidao").children().each(function () {
			// Obtém o id do tipo de certidão
			for (var i = 0; i < CIDADAOSOCIAL.listaTipoCertidao.length; i++) {
				if (CIDADAOSOCIAL.listaTipoCertidao[i].nome == this.children[0].value) {
					idTipoCertidao = CIDADAOSOCIAL.listaTipoCertidao[i].id;
					break;
				}
			}
			var v = {
				id: idTipoCertidao,
				numero: this.children[2].value,
			};
			certidoes.push(v);
		});
		CIDADAOSOCIAL.auxlistaCertidoes = certidoes;

		// todo: testes retirar
		var Print = "Certidões\r\n";
		for (var i = 0; i < certidoes.length; i++) {
			Print += "ID: " + certidoes[i].id + " - Número: " + certidoes[i].numero + "\r\n";
		}
		console.log(Print);
		// testes retirar

		//***************************
		// LISTAS
		//***************************
				
		CIDADAOSOCIAL.salvaCidadaoSocial(listaDados,
											this.salvaSocialSuccess,
											this.salvaSocialFail);
	}
}
