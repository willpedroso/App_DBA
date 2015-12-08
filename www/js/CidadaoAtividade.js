var ATIVIDADE = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,

	// Dados armazenados
	cidadao_id: null,
	cidadao_nome: null,
	cidadao_nome_social: null,
	indexAtividade: null,
	listaAtividades: [],
	listaTiposServico: [],
	listaTiposAtuacao: [],
	listaTiposPeriodicidade: [],
	listaTiposDiaSemana: [],
	datatype:function(){
		
		
	},

    // ****************** Obtém os dados básicos *********************
	dadosBasicos: function () {
		console.log("dadosBasicos");
		
		// Tipos de serviço
		BANCODADOS.sqlCmdDB("SELECT id, nome, descricao, status, dt_criacao FROM tipo_servico", [], ATIVIDADE.dadosBasicosTipoServicoSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
	dadosBasicosTipoServicoSuccess: function (trans, res) {
		console.log("dadosBasicosTipoServicoSuccess");

		// Salva tipos de serviço
		while (ATIVIDADE.listaTiposServico.length > 0) {
			ATIVIDADE.listaTiposServico.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			var lts = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				descricao: res.rows.item(i).descricao,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaTiposServico.push(lts);
		}
		
		// Testes
		var Print = "Tipos de Serviço" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaTiposServico.length; i++) {
			Print += "TIPO DE SERVIÇO: " + i + "\r\n";
			Print += "Id: " + ATIVIDADE.listaTiposServico[i].id + "\r\n";
			Print += "Nome: " + ATIVIDADE.listaTiposServico[i].nome + "\r\n";
			Print += "Descrição: " + ATIVIDADE.listaTiposServico[i].descricao + "\r\n";
			Print += "Status: " + ATIVIDADE.listaTiposServico[i].status + "\r\n";
			Print += "Data de criação: " + ATIVIDADE.listaTiposServico[i].dt_criacao + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);

		// Tipos de atuação
		BANCODADOS.sqlCmdDB("SELECT id, nome, status, dt_criacao FROM tipo_atuacao", [], ATIVIDADE.dadosBasicosTipoAtuacaoSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
	dadosBasicosTipoAtuacaoSuccess: function (trans, res) {
		console.log("dadosBasicosTipoAtuacaoSuccess");

		// Salva tipos de atuação
		while (ATIVIDADE.listaTiposAtuacao.length > 0) {
			ATIVIDADE.listaTiposAtuacao.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			var lta = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaTiposAtuacao.push(lta);
		}
		
		// Testes
		var Print = "Tipos de Atuação" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaTiposAtuacao.length; i++) {
			Print += "TIPO DE ATUAÇÃO: " + i + "\r\n";
			Print += "Id: " + ATIVIDADE.listaTiposAtuacao[i].id + "\r\n";
			Print += "Nome: " + ATIVIDADE.listaTiposAtuacao[i].nome + "\r\n";
			Print += "Status: " + ATIVIDADE.listaTiposAtuacao[i].status + "\r\n";
			Print += "Data de criação: " + ATIVIDADE.listaTiposAtuacao[i].dt_criacao + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);

		// Tipos de periodicidade
		BANCODADOS.sqlCmdDB("SELECT id, nome, status, dt_criacao FROM tipo_periodicidade", [], ATIVIDADE.dadosBasicosTipoPeriodicidadeSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
	dadosBasicosTipoPeriodicidadeSuccess: function (trans, res) {
		console.log("dadosBasicosTipoPeriodicidadeSuccess");

		// Salva tipos de periodicidade
		while (ATIVIDADE.listaTiposPeriodicidade.length > 0) {
			ATIVIDADE.listaTiposPeriodicidade.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			var ltp = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaTiposPeriodicidade.push(ltp);
		}

		// Testes
		var Print = "Tipos de Periodicidade" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaTiposPeriodicidade.length; i++) {
			Print += "TIPO DE PERIODICIDADE: " + i + "\r\n";
			Print += "Id: " + ATIVIDADE.listaTiposPeriodicidade[i].id + "\r\n";
			Print += "Nome: " + ATIVIDADE.listaTiposPeriodicidade[i].nome + "\r\n";
			Print += "Status: " + ATIVIDADE.listaTiposPeriodicidade[i].status + "\r\n";
			Print += "Data de criação: " + ATIVIDADE.listaTiposPeriodicidade[i].dt_criacao + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);

		// Tipo de dias da semana
		BANCODADOS.sqlCmdDB("SELECT id, nome, nome_abreviado, status, dt_criacao FROM tipo_dias_semana", [], ATIVIDADE.dadosBasicosTipoDiaSemanaSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
	dadosBasicosTipoDiaSemanaSuccess: function (trans, res) {
		console.log("dadosBasicosTipoDiaSemanaSuccess");

		// Salva tipos de dia da semana
		while (ATIVIDADE.listaTiposDiaSemana.length > 0) {
			ATIVIDADE.listaTiposDiaSemana.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			var ltds = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				nome_abreviado: res.rows.item(i).nome_abreviado,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaTiposDiaSemana.push(ltds);
		}

		// Testes
		var Print = "Tipos de Dia da Semana" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaTiposDiaSemana.length; i++) {
			Print += "TIPO DE DIA DA SEMANA: " + i + "\r\n";
			Print += "Id: " + ATIVIDADE.listaTiposDiaSemana[i].id + "\r\n";
			Print += "Nome: " + ATIVIDADE.listaTiposDiaSemana[i].nome + "\r\n";
			Print += "Nome abreviado: " + ATIVIDADE.listaTiposDiaSemana[i].nome_abreviado + "\r\n";
			Print += "Status: " + ATIVIDADE.listaTiposDiaSemana[i].status + "\r\n";
			Print += "Data de criação: " + ATIVIDADE.listaTiposDiaSemana[i].dt_criacao + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);

		// Continua dados de entrada
		// Dados do cidadão
		BANCODADOS.sqlCmdDB("SELECT nome, nome_social FROM cidadao WHERE id = ?", [ATIVIDADE.cidadao_id], ATIVIDADE.dadosEntradaCidadaoSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao_id, cbSuccess, cbFail) {
	    console.log("dadosEntrada");
		
		// Salva funções de retorno
		ATIVIDADE.cbSuccess_f = cbSuccess;
		ATIVIDADE.cbFail_f = cbFail;
		
		// Salva identificação do cidadão
		ATIVIDADE.cidadao_id = cidadao_id;
		
		// Desvia para carregar dados básicos
		ATIVIDADE.dadosBasicos();
	},

	dadosEntradaAtividadeSuccess: function(trans, res) {
	    console.log("dadosEntradaAtividadeSuccess");

		// Limpa a lista de atividades
		while (ATIVIDADE.listaAtividades.length > 0) {
			ATIVIDADE.listaAtividades.pop();
		}

		// Preenche a lista de atividades
		for (var i = 0; i < res.rows.length; i++) {

			var a = {
				id: res.rows.item(i).id,
				
				ponto_servico_id: res.rows.item(i).ponto_servico_id,
				ponto_servico_nome: null,
				ponto_servico_descricao: null,
				
				tipo_servico_id: null,
				tipo_servico_nome: null,
				tipo_servico_descricao: null,
				tipo_servico_status: null,
				tipo_servico_dt_criacao: null,
		
				tipo_atuacao_id: res.rows.item(i).tipo_atuacao_id,
				tipo_atuacao_nome: null,
				tipo_atuacao_status: null,
				tipo_atuacao_dt_criacao: null,
		
				periodicidade_id: null,
				
				periodicidade_tipo_id: null,
				periodicidade_tipo_nome: null,
				
				periodicidade_data_inicio: null,
				periodicidade_hora_inicio: null,
				periodicidade_data_termino: null,
				periodicidade_hora_termino: null,
				periodicidade_dia_inteiro: null,
				periodicidade_permanente: null,
				periodicidade_dia_mes_repetir: null,
				periodicidade_dia_semana_repetir: null,
				periodicidade_dt_criacao: null,
				periodicidade_status: null,
				
				periodicidade_tipo_ds: [],
				
				privada: res.rows.item(i).privada,
				descricao: res.rows.item(i).descricao,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaAtividades.push(a);
		}
		
		// Testes
		var AtividadesPrint = "Nome do Cidadão: " + ATIVIDADE.cidadao_nome + "\r\nNome Social do Cidadão: " + ATIVIDADE.cidadao_nome_social + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaAtividades.length; i++) {
			AtividadesPrint += "ATIVIDADE " + i + "\r\n";
			AtividadesPrint += "Id da atividade: " + ATIVIDADE.listaAtividades[i].id + "\r\n";
			AtividadesPrint += "Id do ponto de serviço: " + ATIVIDADE.listaAtividades[i].ponto_servico_id + "\r\n";
			AtividadesPrint += "Id do tipo de atuação: " + ATIVIDADE.listaAtividades[i].tipo_atuacao_id + "\r\n";
			AtividadesPrint += "Privada: " + ATIVIDADE.listaAtividades[i].privada + "\r\n";
			AtividadesPrint += "Descrição: " + ATIVIDADE.listaAtividades[i].descricao + "\r\n";
			AtividadesPrint += "Status: " + ATIVIDADE.listaAtividades[i].status + "\r\n";
			AtividadesPrint += "Data de criação: " + ATIVIDADE.listaAtividades[i].dt_criacao + "\r\n";
			AtividadesPrint += "\r\n";
		}
		console.log (AtividadesPrint);
		
		// retorna
		ATIVIDADE.cbSuccess_f();
	},
		
	dadosEntradaCidadaoSuccess: function(trans, res) {
	    console.log("dadosEntradaCidadaoSuccess");

		if (res.rows.length != 1) {
			ATIVIDADE.cbFail_f("O cidadão não foi localizado no banco de dados.");
		}
		else {
			ATIVIDADE.cidadao_nome = res.rows.item(0).nome;
			ATIVIDADE.cidadao_nome_social = res.rows.item(0).nome_social;

			// Atividades
			BANCODADOS.sqlCmdDB("SELECT id, ponto_servico_id, tipo_atuacao_id, privada, descricao, status, dt_criacao FROM atividade WHERE cidadao_id = ?", [ATIVIDADE.cidadao_id], ATIVIDADE.dadosEntradaAtividadeSuccess, ATIVIDADE.dadosEntradaFail);
		}
	},
	
	dadosEntradaFail: function (error) {
	    console.log("dadosEntradaFail");

		ATIVIDADE.cbFail_f (error);
	},
	
    // ****************** Obtém os dados de uma atividade para edição *********************
    dadosAtividade: function(indexAtividade, cbSuccess, cbFail) {
	    console.log("dadosAtividade");
		
		// Salva funções de retorno
		ATIVIDADE.cbSuccess_f = cbSuccess;
		ATIVIDADE.cbFail_f = cbFail;
		
		// Salva identificação da atividade
		ATIVIDADE.indexAtividade = indexAtividade;

		// Ponto do serviço
		BANCODADOS.sqlCmdDB("SELECT tipo_servico_id, nome, descricao FROM ponto_servico WHERE id = ?", [ATIVIDADE.listaAtividades[indexAtividade].ponto_servico_id], ATIVIDADE.dadosAtividadeSuccess, ATIVIDADE.dadosAtividadeFail);
	},
	
	dadosAtividadeSuccess: function (trans, res) {
		console.log("dadosAtividadeSuccess");

		if (res.rows.length != 1) {
			// Erro no banco
			ATIVIDADE.cbFail_f("O ponto de serviço não foi encontrado no banco de dados");
		}
		else {
			// Salva o nome e a descrição do ponto de serviço
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].ponto_servico_nome = res.rows.item(0).nome;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].ponto_servico_descricao = res.rows.item(0).descricao;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_id = res.rows.item(0).tipo_servico_id;
			
			// Busca o tipo do serviço
			BANCODADOS.sqlCmdDB("SELECT nome, descricao, status, dt_criacao FROM tipo_servico WHERE id = ?", [res.rows.item(0).tipo_servico_id], ATIVIDADE.dadosTipoServicoSuccess, ATIVIDADE.dadosAtividadeFail);
		}
	},
	
	dadosTipoServicoSuccess: function (trans, res) {
		console.log ("dadosTipoServicoSuccess");

		if (res.rows.length != 1) {
			// Erro no banco
			ATIVIDADE.cbFail_f("O tipo de serviço não foi encontrado no banco de dados");
		}
		else {
			// Salva as informações de tipo de serviço
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_nome = res.rows.item(0).nome;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_descricao = res.rows.item(0).descricao;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_status = res.rows.item(0).status;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_dt_criacao = res.rows.item(0).dt_criacao;
			
			// Busca dados de tipo de atuação
			BANCODADOS.sqlCmdDB("SELECT nome, status, dt_criacao FROM tipo_atuacao WHERE id = ?", [ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_id], ATIVIDADE.dadosTipoAtuacaoSuccess, ATIVIDADE.dadosAtividadeFail);
		}
	},
	
	dadosTipoAtuacaoSuccess: function (trans, res) {
		console.log ("dadosTipoAtuacaoSuccess");

		if (res.rows.length != 1) {
			// Erro no banco
			ATIVIDADE.cbFail_f("O tipo de atuação não foi encontrado no banco de dados");
		}
		else {
			// Salva as informações de tipo de atuação
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_nome = res.rows.item(0).nome;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_status = res.rows.item(0).status;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_dt_criacao = res.rows.item(0).dt_criacao;
			
			// Busca dados de periodicidade
			BANCODADOS.sqlCmdDB("SELECT id, tipo_periodicidade_id, data_inicio, hora_inicio, data_termino, hora_termino, dia_inteiro, permanente, dia_mes_repetir, dia_semana_repetir, dt_criacao, status FROM periodicidade WHERE atividade_id = ?", [ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].id], ATIVIDADE.dadosPeriodicidadeSuccess, ATIVIDADE.dadosAtividadeFail);
		}
	},
	
	dadosPeriodicidadeSuccess: function (trans, res) {
		console.log("dadosPeriodicidadeSuccess");

		// todo: como proceder se não tiver periodicidade na atividade?
		// Salva as informações de periodicidade
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_id = res.rows.item(0).id;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_id = res.rows.item(0).tipo_periodicidade_id;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_data_inicio = res.rows.item(0).data_inicio;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_hora_inicio = res.rows.item(0).hora_inicio;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_data_termino = res.rows.item(0).data_termino;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_hora_termino = res.rows.item(0).hora_termino;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dia_inteiro = res.rows.item(0).dia_inteiro;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_permanente = res.rows.item(0).permanente;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dia_mes_repetir = res.rows.item(0).dia_mes_repetir;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dia_semana_repetir = res.rows.item(0).dia_semana_repetir;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dt_criacao = res.rows.item(0).dt_criacao;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_status = res.rows.item(0).status;
		
		// Busca informações do tipo de periodicidade
		BANCODADOS.sqlCmdDB("SELECT nome, status, dt_criacao FROM tipo_periodicidade WHERE id = ?", [ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_id], ATIVIDADE.dadosTipoPeriodicidadeSuccess, ATIVIDADE.dadosAtividadeFail);
	},
	
	dadosTipoPeriodicidadeSuccess: function (trans, res) {
		console.log ("dadosTipoPeriodicidadeSuccess");

		if (res.rows.length != 1) {
			// Erro no banco
			ATIVIDADE.cbFail_f("O tipo de periodicidade não foi encontrado no banco de dados");
		}
		else {
			// Salva as informações de tipo de periodicidade
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_nome = res.rows.item(0).nome;
			
			// Busca informações de periodicidade de dias da semana
			BANCODADOS.sqlCmdDB("SELECT tipo_dias_semana_id FROM periodicidade_has_tipo_dias_semana WHERE periodicidade_id = ?", [ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_id], ATIVIDADE.dadosPeriodicidadeHTDSSuccess, ATIVIDADE.dadosAtividadeFail);
		}
	},
	
	dadosPeriodicidadeHTDSSuccess: function (trans, res) {
		console.log ("dadosPeriodicidadeHTDSSuccess");

		// Limpa a lista
		while (ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds.length > 0) {
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds.pop();
		}
		
		for (var i = 0; i < res.rows.length; i++) {
			// Salva as informações
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds.push(res.rows.item(i).tipo_dias_semana_id);
		}

		// Testes - apresenta dados da atividade selecionada
		alert ("Dados da atividade: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].id);
		var dadosAtividadePrint = "Tipo de serviço: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_nome + "\r\n";
		dadosAtividadePrint += "Área de atuação: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_nome + "\r\n";
		dadosAtividadePrint += "Atividade privada: " + (ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].privada == 1 ? "Sim" : "Não") + "\r\n";
		dadosAtividadePrint += "Periodicidade: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_nome + "\r\n";
		
		for (var i = 0; i < ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds.length; i++) {
			dadosAtividadePrint += "Dia da semana: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds[i] + "-" + ATIVIDADE.listaTiposDiaSemana[ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds[i]].nome + "-" + ATIVIDADE.listaTiposDiaSemana[ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds[i]].nome_abreviado + "\r\n";
		}
		
		dadosAtividadePrint += "Dia inteiro: " + (ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dia_inteiro == 1 ? "Sim" : "Não") + "\r\n";
		dadosAtividadePrint += "Data de início: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_data_inicio + "\r\n";
		dadosAtividadePrint += "Permanente: " + (ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_permanente == 1 ? "Sim" : "Não") + "\r\n";
		dadosAtividadePrint += "Data de término: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_data_termino + "\r\n";
		console.log(dadosAtividadePrint);

		// Retorna
		ATIVIDADE.cbSuccess_f();
	},
	
	dadosAtividadeFail: function (err) {
		console.log("dadosAtividadeFail");
		
		// Retorna
		ATIVIDADE.cbFail_f(err);
	},
	
	// todo: entender a regra de salvamento de atividades
    // ****************** Salva nova atividade ou atividade atualizada *********************
	salvaAtividade: function (indexAtividade, ponto_servico_id, tipo_atuacao_id, privada, descricao, status, dt_criacao, cbSuccess, cbFail) {
		console.log ("salvaAtividade");
		
		// Salva funções de retorno
		ATIVIDADE.cbSuccess_f = cbSuccess;
		ATIVIDADE.cbFail_f = cbFail;

		// cidadao_id já está armazenado em ATIVIDADE.cidadao_id
		if ((ATIVIDADE.indexAtividade = indexAtividade) != null) {
			// Salva novos dados na atividade da lista
			ATIVIDADE.listaAtividades[indexAtividade].ponto_servico_id = ponto_servico_id;
			ATIVIDADE.listaAtividades[indexAtividade].tipo_atuacao_id = tipo_atuacao_id;

			// Atualiza atividade
			BANCODADOS.sqlCmdDB("UPDATE atividade SET ponto_servico_id = ?, tipo_atuacao_id = ?, privada = ?, descricao = ?, status = ?, dt_criacao = ? WHERE id = ?",
								[ponto_servico_id, tipo_atuacao_id, privada, descricao, status, dt_criacao, ATIVIDADE.listaAtividades[indexAtividade].id], 
								ATIVIDADE.salvaAtividadeSuccess, ATIVIDADE.salvaAtividadeFail);
		}
		else {
			// Nova atividade
			BANCODADOS.sqlCmdDB("INSERT iNTO atividade (cidadao_id, ponto_servico_id, tipo_atuacao_id, privada, descricao, status, dt_criacao) VALUES (?, ?, ?, ?, ?, ?, ?)",
								[ATIVIDADE.cidadao_id, ponto_servico_id, tipo_atuacao_id, privada, descricao, status, dt_criacao], 
								ATIVIDADE.salvaPeriodicidade, ATIVIDADE.salvaAtividadeFail);
		}
	},
	
	salvaPeriodicidade: function (trans, res) {
		console.log("salvaPeriodicidade");
		
	},
	
	salvaPeriodicidadeDiasSemana: function (trans, res) {
		console.log("salvaPeriodicidadeDiasSemana");
	},
	
	salvaAtividadeSuccess: function (trans, res) {
		console.log ("salvaAtividadeSuccess");

		if (ATIVIDADE.indexAtividade == null) {
			// Uma nova atividade foi incluída, recarrega informações
			ATIVIDADE.dadosEntrada(ATIVIDADE.cidadao_id, ATIVIDADE.cbSuccess_f, ATIVIDADE.cbFail_f);
		}
		else {
			ATIVIDADE.cbSuccess_f();
		}
	},
	
	salvaAtividadeFail: function (err) {
		console.log ("salvaAtividadeFail");

		ATIVIDADE.cbFail_f(err);
	},
}
