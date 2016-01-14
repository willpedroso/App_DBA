var SITUACAODBA = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	cidadao_id: null,
	
	situacaoCadastral: null,
	motivoInativacaoOutros: null,
	prioridade: null,
	programaDBA: null,
	pontoServicoId: null,

    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");

		// Salva funções de retorno
		SITUACAODBA.cbSuccess_f = cbSuccess;
		SITUACAODBA.cbFail_f = cbFail;
		
		// Salva cidadão
		SITUACAODBA.cidadao_id = cidadao;

		// Obtém situação DBA
		// todo: perguntar sobre os campos ponto_servico_id, dt_inclusao_dba, dt_exclusao_dba, dt_criacao, dt_atualizacao
		BANCODADOS.sqlCmdDB("SELECT situacao_cadastral, motivo_inativacao_outros, prioridade, programa_dba, ponto_servico_id FROM cidadao WHERE id = ?",
							[SITUACAODBA.cidadao_id], 
							SITUACAODBA.dadosEntradaSituacaoDBASuccess, 
							SITUACAODBA.dadosEntradaSituacaoDBAFail);
	},

	dadosEntradaSituacaoDBASuccess: function (trans, res) {
		console.log("dadosEntradaSituacaoDBASuccess");
		
		// Salva
		if (res.rows.length == 1) {
			SITUACAODBA.situacaoCadastral = res.rows.item(0).situacao_cadastral;
			SITUACAODBA.motivoInativacaoOutros = res.rows.item(0).motivo_inativacao_outros
			SITUACAODBA.prioridade = res.rows.item(0).prioridade;
			SITUACAODBA.programaDBA = res.rows.item(0).programa_dba;
			SITUACAODBA.pontoServicoId = res.rows.item(0).ponto_servico_id;
			
			// Retorna
			SITUACAODBA.cbSuccess_f();
		}
		else {
			// Não encontrou o registro
			SITUACAODBA.cbFail_f("O registro do cidadão não foi encontrado no banco de dados.");
		}
	},

	dadosEntradaSituacaoDBAFail: function (err) {
		console.log("dadosEntradaSituacaoDBAFail");
		
		// Retorna
		SITUACAODBA.cbFail_f(err);
	},
	
    // ****************** Salva situação DBA *********************
    salvaSituacaoDBA: function(info, cbSuccess, cbFail) {
	    console.log("salvaSituacaoDBA");

		// Salva funções de retorno
		SITUACAODBA.cbSuccess_f = cbSuccess;
		SITUACAODBA.cbFail_f = cbFail;

		// Atualiza
		BANCODADOS.sqlCmdDB("UPDATE cidadao SET informacoes_complementares = ? WHERE cidadao_id = ?",
							[SITUACAODBA.infoComplementares = info, SITUACAODBA.cidadao_id], SITUACAODBA.salvaSituacaoDBASuccess, SITUACAODBA.salvaSituacaoDBAFail);
	},
	
	salvaSituacaoDBASuccess: function (trans, res) {
		console.log("salvaSituacaoDBASuccess");
		
		// Retorna
		SITUACAODBA.cbSuccess_f();
	},
	
	salvaSituacaoDBAFail: function (err) {
		console.log("salvaSituacaoDBAFail");
		
		// Retorna
		SITUACAODBA.cbFail_f(err);
	},
}
