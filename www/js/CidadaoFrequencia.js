var FREQUENCIA = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	cidadao_id: null,
	
    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao, data, cbSuccess, cbFail) {
	    console.log("dadosEntrada");

		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;
		
		// Salva cidadão
		FREQUENCIA.cidadao_id = CIDADAO.listaCidadaosId[CIDADAO.indiceListaCidadao];

		// Se o usuário for perfil_tecnico (tabela perfil) apresenta as atividades de todos os cidadãos do usuário, sem apresentar a lista de cidadãos
		
		// Obtém informações na tabela frequencia
		BANCODADOS.sqlCmdDB("SELECT atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, status, dt_criacao " +
							"FROM frequencia " +
							" WHERE cidadao_id = ? AND tipo_atuacao_id = ? AND usuario_id = ? " +
							(data != null ? "AND data_frequencia = ?" : ""),
							[FREQUENCIA.cidadao_id], 
							FREQUENCIA.dadosEntradaInfoCompleSuccess, 
							FREQUENCIA.dadosEntradaInfoCompleFail);
	},

	dadosEntradaInfoCompleSuccess: function (trans, res) {
		console.log("dadosEntradaInfoCompleSuccess");
		
		// Salva
		if (res.rows.length == 1) {
			FREQUENCIA.infoComplementares = res.rows.item(0).informacoes_complementares;
			// Retorna
			// todo: revisar
			//INFOCOMPLE.cbSuccess_f();
			PageManager.loadTmpl('info_basicas');
		}
		else {
			// Não encontrou o registro
			FREQUENCIA.cbFail_f("O registro do cidadão não foi encontrado no banco de dados.");
		}
	},

	dadosEntradaInfoCompleFail: function (err) {
		console.log("dadosEntradaInfoCompleFail");
		
		// Retorna
		// todo: revisar
		alert("Houve falha na obtenção de informações complementares do cidadão.");
		
		FREQUENCIA.cbFail_f(err);
	},
	
    // ****************** Salva informações complementares *********************
    salvaInfoComple: function(info, cbSuccess, cbFail) {
	    console.log("salvaInfoComple");

		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;

		// Atualiza
		BANCODADOS.sqlCmdDB("UPDATE cidadao SET informacoes_complementares = ? WHERE cidadao_id = ?",
							[FREQUENCIA.infoComplementares = info, FREQUENCIA.cidadao_id], FREQUENCIA.salvaInfoCompleSuccess, FREQUENCIA.salvaInfoCompleFail);
	},
	
	salvaInfoCompleSuccess: function (trans, res) {
		console.log("salvaInfoCompleSuccess");
		
		// Retorna
		FREQUENCIA.cbSuccess_f();
	},
	
	salvaInfoCompleFail: function (err) {
		console.log("salvaInfoCompleFail");
		
		// Retorna
		FREQUENCIA.cbFail_f(err);
	},
}
