var CIDADAOSOCIAL = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	cidadao_id: null,
	dadosSocial: null,
	newSmadsId: 0,
	auxVar: null,
	ehSalvamento: false,
	
	// Listas de tipos
	listaTipoCertidao: null,
	listaTipoDispositivoContato: null,
	listaEstados: null,
	listaTipoDocumento: null,

	// Listas de dados
	listaContatos: [],
	listaContatosEmpresa: [],
	listaCertidoes: [],
	listaProvidencias: [],
	
	// auxiliares
	auxCounter: 0,
	auxlistaContatos: null,
	auxlistaContatosEmpresa: null,
	auxlistaCertidoes: null,
	auxlistaProvidencias: null,
	
	// Lista de rotinas de salvamento
	listaSalvamentoListas: [],
	
	// Carrega dados básicos
	dadosBasicos: function () {
		console.log("dadosBasicos");
		
		BD_DTO.tipo_certidao_carrega(CIDADAOSOCIAL.dadosBasicosCertidao, CIDADAOSOCIAL.dadosBasicosFail);
	},
	
	dadosBasicosCertidao: function () {
		console.log("dadosBasicosCertidao");

		CIDADAOSOCIAL.listaTipoCertidao = BD_DTO.tipo_certidao_data;
	
		// todo: testes retirar
		var Print = "Tipos de Certidão:\r\n";
		for (var i = 0; i < CIDADAOSOCIAL.listaTipoCertidao.length; i++) {
			Print += "\tID: " + CIDADAOSOCIAL.listaTipoCertidao[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOSOCIAL.listaTipoCertidao[i].nome + "\r\n";			
		}
		console.log(Print);
		// testes retirar

		BD_DTO.tipo_dispositivo_contato_carrega(CIDADAOSOCIAL.dadosBasicosListaEstados, CIDADAOSOCIAL.dadosBasicosFail);
	},
	
	dadosBasicosListaEstados: function (trans, res) {
		console.log("dadosBasicosListaEstados");

		CIDADAOSOCIAL.listaTipoDispositivoContato = BD_DTO.tipo_dispositivo_contato_data;
	
		// todo: testes retirar
		var Print = "Tipos de Dispositivo de Contato:\r\n";
		for (var i = 0; i < CIDADAOSOCIAL.listaTipoDispositivoContato.length; i++) {
			Print += "\tID: " + CIDADAOSOCIAL.listaTipoDispositivoContato[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOSOCIAL.listaTipoDispositivoContato[i].nome + "\r\n";			
		}
		console.log(Print);
		// testes retirar

		BD_DTO.tipo_estado_carrega(CIDADAOSOCIAL.dadosBasicosListaTipoDocumento, CIDADAOSOCIAL.dadosBasicosFail);
	},
	
	dadosBasicosListaTipoDocumento: function (trans, res) {
		console.log("dadosBasicosListaTipoDocumento");
		
		CIDADAOSOCIAL.listaEstados = BD_DTO.tipo_estado_data;
	
		// todo: testes retirar
		var Print = "Estados:\r\n";
		for (var i = 0; i < CIDADAOSOCIAL.listaEstados.length; i++) {
			Print += "\tID: " + CIDADAOSOCIAL.listaEstados[i].id + "\r\n";
			Print += "\tSigla: " + CIDADAOSOCIAL.listaEstados[i].sigla + "\r\n";			
			Print += "\tNome: " + CIDADAOSOCIAL.listaEstados[i].nome + "\r\n";			
		}
		console.log(Print);
		// testes retirar

		BD_DTO.tipo_documento_carrega(CIDADAOSOCIAL.dadosBasicosSuccess, CIDADAOSOCIAL.dadosBasicosFail);
	}
	
	dadosBasicosSuccess: function (trans, res) {
		console.log("dadosBasicosSuccess");
		
		CIDADAOSOCIAL.listaTipoDocumento = BD_DTO.tipo_documento_data;
	
		// todo: testes retirar
		var Print = "Tipos de documentos:\r\n";
		for (var i = 0; i < CIDADAOSOCIAL.listaTipoDocumento.length; i++) {
			Print += "\tID: " + CIDADAOSOCIAL.listaTipoDocumento[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOSOCIAL.listaTipoDocumento[i].nome + "\r\n";			
		}
		console.log(Print);
		// testes retirar

		//CIDADAOSOCIAL.cbSuccess_f();
		PageManager.loadTmpl('social');
	},
	
	dadosBasicosFail: function (err) {
		console.log("dadosBasicosFail: " + err);
		
		CIDADAOSOCIAL.cbFail_f(err);
	},
	// ****************** Obtém os dados de entrada *********************
	// 	
    // ******************************************************************
	
    dadosEntrada: function(cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");
		
		// Salva funções de retorno
		CIDADAOSOCIAL.cbSuccess_f = cbSuccess;
		CIDADAOSOCIAL.cbFail_f = cbFail;
		
		// Salva identificação do cidadão
		CIDADAOSOCIAL.cidadao_id = CIDADAO.listaCidadaosId[CIDADAO.indiceListaCidadao];
		
		// Utiliza sempre o registro mais novo, por meio da data de criação
		BANCODADOS.sqlCmdDB("SELECT id " +
							", nome_contato " +
							", endereco_contato " +
							", tipo_estado_id " +
							", municipio_contato " +
							", local_referencia " +
							", formacao_profissional " +
							", atividade_profissional " +
							", nome_empresa " +
							", data_admissao " +
							", cargo " +
							", faixa_renda " +
							", endereco_empresa " +
							", problemas_saude " +
							", uso_medicamentos " +
							", qual_medicamento " +
							", encaminhamento " +
							", unidade_saude " +
							", nome_unidade_saude " +
							", entrevista_projeto_vida " +
							", houve_providencias " +
							", numero_nis " +
							", ctps " +
							", titulo_eleitor " +
							", numero_portaria_naturalizacao " +
							", observacoes_gerais " +
							", documentos_apos_programa " +
							", vinculo_familia_restabelecido " +
							", MAX(dt_criacao) as dt_criacao " +
							", status " +
							"FROM smads WHERE cidadao_id = ? and status = ?", [CIDADAOSOCIAL.cidadao_id, 1], CIDADAOSOCIAL.dadosEntradaSuccess, CIDADAOSOCIAL.dadosEntradaFail);
	},
	
	dadosEntradaSuccess: function(trans, res) {
		console.log("dadosEntradaSuccess");
		/*
		if (res.rows.length != 1) {
			// todo: há mais de um registro social para o cidadão
			alert ("Erro: Há mais de um registro social para o cidadão!");
		}
		*/
		var ds = {
			id: res.rows.item(0).id,
			nome_contato: res.rows.item(0).nome_contato,
			endereco_contato: res.rows.item(0).endereco_contato,
			tipo_estado_id: res.rows.item(0).tipo_estado_id,
			municipio_contato: res.rows.item(0).municipio_contato,
			local_referencia: res.rows.item(0).local_referencia,
			formacao_profissional: res.rows.item(0).formacao_profissional,
			atividade_profissional: res.rows.item(0).atividade_profissional,
			nome_empresa: res.rows.item(0).nome_empresa,
			data_admissao: res.rows.item(0).data_admissao,
			cargo: res.rows.item(0).cargo,
			faixa_renda: res.rows.item(0).faixa_renda,
			endereco_empresa: res.rows.item(0).endereco_empresa,
			problemas_saude: res.rows.item(0).problemas_saude,
			uso_medicamentos: res.rows.item(0).uso_medicamentos,
			qual_medicamento: res.rows.item(0).qual_medicamento,
			encaminhamento: res.rows.item(0).encaminhamento,
			unidade_saude: res.rows.item(0).unidade_saude,
			nome_unidade_saude: res.rows.item(0).nome_unidade_saude,
			entrevista_projeto_vida: res.rows.item(0).entrevista_projeto_vida,
			houve_providencias: res.rows.item(0).houve_providencias,
			numero_nis: res.rows.item(0).numero_nis,
			ctps: res.rows.item(0).ctps,
			titulo_eleitor: res.rows.item(0).titulo_eleitor,
			numero_portaria_naturalizacao: res.rows.item(0).numero_portaria_naturalizacao,
			observacoes_gerais: res.rows.item(0).observacoes_gerais,
			documentos_apos_programa: res.rows.item(0).documentos_apos_programa,
			vinculo_familia_restabelecido: res.rows.item(0).vinculo_familia_restabelecido,
			dt_criacao: res.rows.item(0).dt_criacao,
			status: res.rows.item(0).status,		
		};
		CIDADAOSOCIAL.dadosSocial = ds;
		
		// todo: testes retirar
		var Print = "Dados do Social:\r\n";
		Print += "id: " + CIDADAOSOCIAL.dadosSocial.id + "\r\n";
		Print += "nome_contato: " + CIDADAOSOCIAL.dadosSocial.nome_contato + "\r\n";
		Print += "endereco_contato: " + CIDADAOSOCIAL.dadosSocial.endereco_contato + "\r\n";
		Print += "tipo_estado_id: " + CIDADAOSOCIAL.dadosSocial.tipo_estado_id + "\r\n";
		Print += "municipio_contato: " + CIDADAOSOCIAL.dadosSocial.municipio_contato + "\r\n";
		Print += "local_referencia: " + CIDADAOSOCIAL.dadosSocial.local_referencia + "\r\n";
		Print += "formacao_profissional: " + CIDADAOSOCIAL.dadosSocial.formacao_profissional + "\r\n";
		Print += "atividade_profissional: " + CIDADAOSOCIAL.dadosSocial.atividade_profissional + "\r\n";
		Print += "nome_empresa: " + CIDADAOSOCIAL.dadosSocial.nome_empresa + "\r\n";
		Print += "data_admissao: " + CIDADAOSOCIAL.dadosSocial.data_admissao + "\r\n";
		Print += "cargo: " + CIDADAOSOCIAL.dadosSocial.cargo + "\r\n";
		Print += "faixa_renda: " + CIDADAOSOCIAL.dadosSocial.faixa_renda + "\r\n";
		Print += "endereco_empresa: " + CIDADAOSOCIAL.dadosSocial.endereco_empresa + "\r\n";
		Print += "problemas_saude: " + CIDADAOSOCIAL.dadosSocial.problemas_saude + "\r\n";
		Print += "uso_medicamentos: " + CIDADAOSOCIAL.dadosSocial.uso_medicamentos + "\r\n";
		Print += "qual_medicamento: " + CIDADAOSOCIAL.dadosSocial.qual_medicamento + "\r\n";
		Print += "encaminhamento: " + CIDADAOSOCIAL.dadosSocial.encaminhamento + "\r\n";
		Print += "unidade_saude: " + CIDADAOSOCIAL.dadosSocial.unidade_saude + "\r\n";
		Print += "nome_unidade_saude: " + CIDADAOSOCIAL.dadosSocial.nome_unidade_saude + "\r\n";
		Print += "entrevista_projeto_vida: " + CIDADAOSOCIAL.dadosSocial.entrevista_projeto_vida + "\r\n";
		Print += "houve_providencias: " + CIDADAOSOCIAL.dadosSocial.houve_providencias + "\r\n";
		Print += "numero_nis: " + CIDADAOSOCIAL.dadosSocial.numero_nis + "\r\n";
		Print += "ctps: " + CIDADAOSOCIAL.dadosSocial.ctps + "\r\n";
		Print += "titulo_eleitor: " + CIDADAOSOCIAL.dadosSocial.titulo_eleitor + "\r\n";
		Print += "numero_portaria_naturalizacao: " + CIDADAOSOCIAL.dadosSocial.numero_portaria_naturalizacao + "\r\n";
		Print += "observacoes_gerais: " + CIDADAOSOCIAL.dadosSocial.observacoes_gerais + "\r\n";
		Print += "documentos_apos_programa: " + CIDADAOSOCIAL.dadosSocial.documentos_apos_programa + "\r\n";
		Print += "vinculo_familia_restabelecido: " + CIDADAOSOCIAL.dadosSocial.vinculo_familia_restabelecido + "\r\n";
		Print += "dt_criacao: " + CIDADAOSOCIAL.dadosSocial.dt_criacao + "\r\n";
		Print += "status: " + CIDADAOSOCIAL.dadosSocial.status + "\r\n";

		console.log(Print);
		// testes retirar
		
		// Carrega contatos
		BANCODADOS.sqlCmdDB("SELECT id, tipo_dispositivo_contato_id, numero_descricao, dt_criacao FROM smads_contato WHERE smads_id = ?",
							[CIDADAOSOCIAL.dadosSocial.id], 
							CIDADAOSOCIAL.dadosEntradaContatoSuccess, 
							CIDADAOSOCIAL.dadosEntradaFail);
	},
	
	dadosEntradaContatoSuccess: function (trans, res) {
		console.log("dadosEntradaContatoSuccess");
		
		// Salva dados
		for (var i = 0; i < res.rows.length; i++) {
			var lc = {
				id: res.rows.item(i).id,
				tipo_dispositivo_contato_id: res.rows.item(i).tipo_dispositivo_contato_id,
				numero_descricao: res.rows.item(i).numero_descricao,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			CIDADAOSOCIAL.listaContatos.push(lc);
		}

		// todo: testes retirar
		var Print = "Contatos do Cidadão:\r\n";
		for (var i = 0; i < CIDADAOSOCIAL.listaContatos.length; i++) {
			Print += "\tid: " + CIDADAOSOCIAL.listaContatos[i].id + "\r\n";
			Print += "\ttipo_dispositivo_contato_id: " + CIDADAOSOCIAL.listaContatos[i].tipo_dispositivo_contato_id + "\r\n";
			Print += "\tnumero_descricao: " + CIDADAOSOCIAL.listaContatos[i].numero_descricao + "\r\n";
			Print += "\tdt_criacao: " + CIDADAOSOCIAL.listaContatos[i].dt_criacao + "\r\n";
		}

		console.log(Print);
		// testes retirar

		// Carrega contatos empresa
		BANCODADOS.sqlCmdDB("SELECT id, tipo_dispositivo_contato_id, numero_descricao, dt_criacao FROM smads_contato_empresa WHERE smads_id = ?",
							[CIDADAOSOCIAL.dadosSocial.id], 
							CIDADAOSOCIAL.dadosEntradaContatoEmpresaSuccess, 
							CIDADAOSOCIAL.dadosEntradaFail);
	},
	
	dadosEntradaContatoEmpresaSuccess: function (trans, res) {
		console.log("dadosEntradaContatoEmpresaSuccess");

		// Salva dados
		for (var i = 0; i < res.rows.length; i++) {
			var lce = {
				id: res.rows.item(i).id,
				tipo_dispositivo_contato_id: res.rows.item(i).tipo_dispositivo_contato_id,
				numero_descricao: res.rows.item(i).numero_descricao,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			CIDADAOSOCIAL.listaContatosEmpresa.push(lce);
		}

		// todo: testes retirar
		var Print = "Contatos da Empresa:\r\n";
		for (var i = 0; i < CIDADAOSOCIAL.listaContatosEmpresa.length; i++) {
			Print += "\tid: " + CIDADAOSOCIAL.listaContatosEmpresa[i].id + "\r\n";
			Print += "\ttipo_dispositivo_contato_id: " + CIDADAOSOCIAL.listaContatosEmpresa[i].tipo_dispositivo_contato_id + "\r\n";
			Print += "\tnumero_descricao: " + CIDADAOSOCIAL.listaContatosEmpresa[i].numero_descricao + "\r\n";
			Print += "\tdt_criacao: " + CIDADAOSOCIAL.listaContatosEmpresa[i].dt_criacao + "\r\n";
		}

		console.log(Print);
		// testes retirar

		// Carrega certidões
		BANCODADOS.sqlCmdDB("SELECT id, tipo_certidao_id, numero, dt_criacao FROM smads_certidao WHERE smads_id = ?",
							[CIDADAOSOCIAL.dadosSocial.id], 
							CIDADAOSOCIAL.dadosEntradaCertidaoSuccess, 
							CIDADAOSOCIAL.dadosEntradaFail);
	},
	
	dadosEntradaCertidaoSuccess: function (trans, res) {
		console.log("dadosEntradaCertidaoSuccess");

		// Salva dados
		for (var i = 0; i < res.rows.length; i++) {
			var lc = {
				id: res.rows.item(i).id,
				tipo_certidao_id: res.rows.item(i).tipo_certidao_id,
				numero: res.rows.item(i).numero,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			CIDADAOSOCIAL.listaCertidoes.push(lc);
		}

		// todo: testes retirar
		var Print = "Certidões:\r\n";
		for (var i = 0; i < CIDADAOSOCIAL.listaCertidoes.length; i++) {
			Print += "\tid: " + CIDADAOSOCIAL.listaCertidoes[i].id + "\r\n";
			Print += "\ttipo_certidao_id: " + CIDADAOSOCIAL.listaCertidoes[i].tipo_certidao_id + "\r\n";
			Print += "\tnumero: " + CIDADAOSOCIAL.listaCertidoes[i].numero + "\r\n";
			Print += "\tdt_criacao: " + CIDADAOSOCIAL.listaCertidoes[i].dt_criacao + "\r\n";
		}

		console.log(Print);
		// testes retirar

		// Carrega providências
		BANCODADOS.sqlCmdDB("SELECT id, tipo, situacao, observacao, dt_criacao FROM smads_providencia WHERE smads_id = ?",
							[CIDADAOSOCIAL.dadosSocial.id], 
							CIDADAOSOCIAL.dadosEntradaProvidenciaSuccess, 
							CIDADAOSOCIAL.dadosEntradaFail);
	},
	
	dadosEntradaProvidenciaSuccess: function (trans, res) {
		console.log("dadosEntradaProvidenciaSuccess");
		
		// Salva dados
		for (var i = 0; i < res.rows.length; i++) {
			var lp = {
				id: res.rows.item(i).id,
				tipo: res.rows.item(i).tipo,
				situacao: res.rows.item(i).situacao,
				observacao: res.rows.item(i).observacao,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			CIDADAOSOCIAL.listaProvidencias.push(lp);
		}

		// todo: testes retirar
		var Print = "Providências:\r\n";
		for (var i = 0; i < CIDADAOSOCIAL.listaProvidencias.length; i++) {
			Print += "\tid: " + CIDADAOSOCIAL.listaProvidencias[i].id + "\r\n";
			Print += "\ttipo: " + CIDADAOSOCIAL.listaProvidencias[i].tipo + "\r\n";
			Print += "\tsituacao: " + CIDADAOSOCIAL.listaProvidencias[i].situacao + "\r\n";
			Print += "\tobservacao: " + CIDADAOSOCIAL.listaProvidencias[i].observacao + "\r\n";
			Print += "\tdt_criacao: " + CIDADAOSOCIAL.listaProvidencias[i].dt_criacao + "\r\n";
		}

		console.log(Print);
		// testes retirar
		
		// carrega dados básicos
		CIDADAOSOCIAL.dadosBasicos();
	},
	
	dadosEntradaFail: function(err) {
		console.log("");

		CIDADAOSOCIAL.cbFail_f (err);
	},
	
    // ****************** Salva os dados  *********************
	// Salva no banco e atualiza memória
	salvaCidadaoSocial: function(dadosLista, cbSuccess, cbFail) {
		console.log("salvaCidadaoSocial");
		
		// Salva funções de retorno
		CIDADAOSOCIAL.cbSuccess_f = cbSuccess;
		CIDADAOSOCIAL.cbFail_f = cbFail;

		// Prepara lista de salvamento de listas
		CIDADAOSOCIAL.listaSalvamentoListas = [];
		if (CIDADAOSOCIAL.auxlistaContatos.length) {
			CIDADAOSOCIAL.listaSalvamentoListas.push(CIDADAOSOCIAL.salvaContatos);
		}
		if (CIDADAOSOCIAL.auxlistaContatosEmpresa.length) {
			CIDADAOSOCIAL.listaSalvamentoListas.push(CIDADAOSOCIAL.salvaContatosEmpresa);
		}
		if (CIDADAOSOCIAL.auxlistaCertidoes.length) {
			CIDADAOSOCIAL.listaSalvamentoListas.push(CIDADAOSOCIAL.salvaCertidoes);
		}
		if (CIDADAOSOCIAL.auxlistaProvidencias.length) {
			CIDADAOSOCIAL.listaSalvamentoListas.push(CIDADAOSOCIAL.salvaProvidencias);
		}
		CIDADAOSOCIAL.listaSalvamentoListas.push(CIDADAOSOCIAL.salvaCidadaoSocialSuccess);
		
		// Salva no banco de dados
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO smads " +
							"(cidadao_id " +
							", nome_contato " +
							", endereco_contato " +
							", tipo_estado_id " +
							", municipio_contato " +
							", local_referencia " +
							", formacao_profissional " +
							", atividade_profissional " +
							", nome_empresa " +
							", data_admissao " +
							", cargo " +
							", faixa_renda " +
							", endereco_empresa " +
							", problemas_saude " +
							", uso_medicamentos " +
							", qual_medicamento " +
							", encaminhamento " +
							", unidade_saude " +
							", nome_unidade_saude " +
							", entrevista_projeto_vida " +
							", houve_providencias " +
							", numero_nis " +
							", ctps " +
							", titulo_eleitor " +
							", numero_portaria_naturalizacao " +
							", observacoes_gerais " +
							", documentos_apos_programa " +
							", vinculo_familia_restabelecido " +
							", dt_criacao " +
							", status) " +
							"VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
							[
							CIDADAOSOCIAL.cidadao_id,
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							CIDADAOSOCIAL.auxVar = (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds()),
							1														
							], 
							CIDADAOSOCIAL.obtemNovoSmadsID, CIDADAOSOCIAL.salvaCidadaoSocialFail);
	},
	
	obtemNovoSmadsID: function () {
		console.log("obtemNovoSmadsID");
		
		BANCODADOS.sqlCmdDB("SELECT id FROM smads WHERE dt_criacao = ?",
							[CIDADAOSOCIAL.auxVar], CIDADAOSOCIAL.obtemNovoSmadsIDSuccess, CIDADAOSOCIAL.salvaCidadaoSocialFail);
	},
	
	obtemNovoSmadsIDSuccess: function (trans, res) {
		console.log("obtemNovoSmadsIDSuccess");
		
		CIDADAOSOCIAL.newSmadsId = res.rows.item(0).id;
		CIDADAOSOCIAL.auxCounter = 0;
		CIDADAOSOCIAL.listaSalvamentoListas.shift()();
	},
	
	fimSalvaLista: function (trans, res) {
		console.log("fimSalvaLista");
		
		// Zera contador e segue salvamento
		CIDADAOSOCIAL.auxCounter = 0;
		CIDADAOSOCIAL.listaSalvamentoListas.shift()();
	},
		
	salvaContatos: function () {
		console.log("salvaContatos");
		
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO smads_contato (smads_id, tipo_dispositivo_contato_id, numero_descricao, dt_criacao) VALUES (?, ?, ?, ?)",
							[CIDADAOSOCIAL.newSmadsId,
							 CIDADAOSOCIAL.auxlistaContatos[CIDADAOSOCIAL.auxCounter].tipoDispositivoContato,
							 CIDADAOSOCIAL.auxlistaContatos[CIDADAOSOCIAL.auxCounter].numeroContato,
							 (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds())],
							++CIDADAOSOCIAL.auxCounter < CIDADAOSOCIAL.auxlistaContatos.length ? CIDADAOSOCIAL.salvaContatos : CIDADAOSOCIAL.fimSalvaLista,
							CIDADAOSOCIAL.salvaCidadaoFail);
	},
	
	salvaContatosEmpresa: function () {
		console.log("salvaContatosEmpresa");
		
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO smads_contato_empresa (smads_id, tipo_dispositivo_contato_id, numero_descricao, dt_criacao) VALUES (?, ?, ?, ?)",
							[CIDADAOSOCIAL.newSmadsId,
							 CIDADAOSOCIAL.auxlistaContatosEmpresa[CIDADAOSOCIAL.auxCounter].tipoDispositivoContatoEmpresa,
							 CIDADAOSOCIAL.auxlistaContatosEmpresa[CIDADAOSOCIAL.auxCounter].numeroContato,
							 (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds())],
							++CIDADAOSOCIAL.auxCounter < CIDADAOSOCIAL.auxlistaContatosEmpresa.length ? CIDADAOSOCIAL.salvaContatosEmpresa : CIDADAOSOCIAL.fimSalvaLista,
							CIDADAOSOCIAL.salvaCidadaoFail);
	},
	
	salvaCertidoes: function () {
		console.log("salvaCertidoes");
		
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO smads_certidao (smads_id, tipo_certidao_id, numero, dt_criacao) VALUES (?, ?, ?, ?)",
							[CIDADAOSOCIAL.newSmadsId,
							 CIDADAOSOCIAL.auxlistaCertidoes[CIDADAOSOCIAL.auxCounter].id,
							 CIDADAOSOCIAL.auxlistaCertidoes[CIDADAOSOCIAL.auxCounter].numero,
							 (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds())],
							++CIDADAOSOCIAL.auxCounter < CIDADAOSOCIAL.auxlistaCertidoes.length ? CIDADAOSOCIAL.salvaCertidoes : CIDADAOSOCIAL.fimSalvaLista,
							CIDADAOSOCIAL.salvaCidadaoFail);
	},
	
	salvaProvidencias: function () {
		console.log("salvaProvidencias");
		
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO smads_providencia (smads_id, tipo, situacao, observacao, dt_criacao) VALUES (?, ?, ?, ?, ?)",
							[CIDADAOSOCIAL.newSmadsId,
							 CIDADAOSOCIAL.auxlistaProvidencias[CIDADAOSOCIAL.auxCounter].tipo,
							 CIDADAOSOCIAL.auxlistaProvidencias[CIDADAOSOCIAL.auxCounter].situacao,
							 CIDADAOSOCIAL.auxlistaProvidencias[CIDADAOSOCIAL.auxCounter].observacao,
							 (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds())],
							++CIDADAOSOCIAL.auxCounter < CIDADAOSOCIAL.auxlistaProvidencias.length ? CIDADAOSOCIAL.salvaProvidencias : CIDADAOSOCIAL.fimSalvaLista,
							CIDADAOSOCIAL.salvaCidadaoFail);
	},
	
	salvaCidadaoSocialSuccess: function (trans, res) {
		console.log("salvaCidadaoSocialSuccess");
		
		// Atualiza dados na memória
		CIDADAOSAUDE.ehSalvamento = true;
		CIDADAOSOCIAL.dadosEntrada(CIDADAOSOCIAL.cidadao_id, CIDADAOSOCIAL.cbSuccess_f, CIDADAOSOCIAL.cbFail_f);
	},
	
	salvaCidadaoSocialFail: function (err) {
		console.log("salvaCidadaoSocialFail");
		
		// Retorna
		CIDADAOSOCIAL.cbFail_f(err);
	},
}
