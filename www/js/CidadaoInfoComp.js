var INFOCOMPLE = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	cidadao_id: null,
	
	infoComplementares: null,

    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");

		// Salva funções de retorno
		INFOCOMPLE.cbSuccess_f = cbSuccess;
		INFOCOMPLE.cbFail_f = cbFail;
		
		// Salva cidadão
		INFOCOMPLE.cidadao_id = cidadao;

		// Obtém informações complementares
		BANCODADOS.sqlCmdDB("SELECT informacoes_complementares FROM cidadao WHERE id = ?",
							[INFOBASICAS.cidadao_id], 
							INFOBASICAS.dadosEntradaInfoCompleSuccess, 
							INFOBASICAS.dadosEntradaInfoCompleFail);
	},

	dadosEntradaInfoCompleSuccess: function (trans, res) {
		console.log("dadosEntradaInfoCompleSuccess");
		
		// Salva
		if (res.rows.length == 1) {
			INFOCOMPLE.infoComplementares = res.rows.item(0).informacoes_complementares;
			// Retorna
			INFOCOMPLE.cbSuccess_f();
		}
		else {
			// Não encontrou o registro
			INFOCOMPLE.cbFail_f("O registro do cidadão não foi encontrado no banco de dados.");
		}
	},

	dadosEntradaInfoCompleFail: function (err) {
		console.log("dadosEntradaInfoCompleFail");
		
		// Retorna
		INFOCOMPLE.cbFail_f(err);
	},
	
    // ****************** Salva informações complementares *********************
    salvaInfoComple: function(info, cbSuccess, cbFail) {
	    console.log("salvaInfoComple");

		// Salva funções de retorno
		INFOCOMPLE.cbSuccess_f = cbSuccess;
		INFOCOMPLE.cbFail_f = cbFail;

		// Atualiza
		BANCODADOS.sqlCmdDB("UPDATE cidadao SET informacoes_complementares = ? WHERE cidadao_id = ?",
							[INFOCOMPLE.infoComplementares = info, INFOCOMPLE.cidadao_id], INFOCOMPLE.salvaInfoCompleSuccess, INFOCOMPLE.salvaInfoCompleFail);
	},
	
	salvaInfoCompleSuccess: function (trans, res) {
		console.log("salvaInfoCompleSuccess");
		
		// Retorna
		INFOCOMPLE.cbSuccess_f();
	},
	
	salvaInfoCompleFail: function (err) {
		console.log("salvaInfoCompleFail");
		
		// Retorna
		INFOCOMPLE.cbFail_f(err);
	},
}
