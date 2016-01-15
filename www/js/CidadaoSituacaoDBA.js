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
	listaMotivoInativacao: [],
	auxListaMotivoInativacao: null,
	listaMotivoInativacaoCounter: 0,

    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");

		// Salva funções de retorno
		SITUACAODBA.cbSuccess_f = cbSuccess;
		SITUACAODBA.cbFail_f = cbFail;
		
		// Salva cidadão
		//SITUACAODBA.cidadao_id = cidadao;
		SITUACAODBA.cidadao_id = CIDADAO.listaCidadaosId[CIDADAO.indiceListaCidadao];

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
			
			// Obtém a lista de motivos da inativação
			BANCODADOS.sqlCmdDB("SELECT tipo_motivo_inativacao_id FROM motivo_inativacao WHERE cidadao_id = ?",
								[SITUACAODBA.cidadao_id], 
								SITUACAODBA.dadosEntradaMotivoInativacaoSuccess, 
								SITUACAODBA.dadosEntradaSituacaoDBAFail);
		}
		else {
			// Não encontrou o registro
			SITUACAODBA.cbFail_f("O registro do cidadão não foi encontrado no banco de dados.");
		}
	},
	
	dadosEntradaMotivoInativacaoSuccess: function (trans, res) {
		console.log("dadosEntradaMotivoInativacaoSuccess");
		
		while (SITUACAODBA.listaMotivoInativacao.length > 0) {
			SITUACAODBA.listaMotivoInativacao.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			SITUACAODBA.listaMotivoInativacao.push(res.rows.item(i).tipo_motivo_inativacao_id);
		}
		
		// Retorna
		//SITUACAODBA.cbSuccess_f();
		PageManager.loadTmpl('div_sitDBA');
	},

	dadosEntradaSituacaoDBAFail: function (err) {
		console.log("dadosEntradaSituacaoDBAFail");
		
		// Retorna
		SITUACAODBA.cbFail_f(err);
	},
	
    // ****************** Salva situação DBA *********************
    salvaSituacaoDBA: function(situacaoCadastral,
							   motivoInativacaoOutros,
							   prioridade,
							   programaDBA,
							   pontoServicoId,
							   listaMotivoInativacao,
							   cbSuccess, cbFail) {
	    console.log("salvaSituacaoDBA");

		// Salva funções de retorno
		SITUACAODBA.cbSuccess_f = cbSuccess;
		SITUACAODBA.cbFail_f = cbFail;

		SITUACAODBA.auxListaMotivoInativacao = listaMotivoInativacao;
		
/*		// todo: testes retirar
		var Print = "Salvar Situação DBA\r\n";
		Print += "Situação cadastral: " + (situacaoCadastral == 1 ? "Ativo" : "Inativo") + "\r\n";
		Print += "Motivos da inativação: \r\n";
		for (var i = 0; i < listaMotivoInativacao.length; i++) {
			Print += "Motivo" + i + ": " + CIDADAO.listaTipoMotivoInativacao[i].nome + "\r\n";
		}
		Print += "Outros: " + motivoInativacaoOutros + "\r\n";
		var pri = "Não informado";
		if (prioridade == 1) {
			pri = "Sim";
		}
		else {
			pri = "Não";
		}
		Print += "Prioridade: " + pri + "\r\n";
		var la = "";
		for (var i = 0; i < CIDADAO.listaPontosServico.length; i++) {
			if (pontoServicoId == CIDADAO.listaPontosServico[i].id) {
				la = CIDADAO.listaPontosServico[i].nome;
				break;
			}
		}
		Print += "Local de acolhida: " + la + "\r\n";
		alert(Print);
		// todo: testes retirar*/
		
		// Atualiza
		BANCODADOS.sqlCmdDB("UPDATE cidadao SET situacao_cadastral = ?, motivo_inativacao_outros = ?, prioridade = ?, programa_dba = ?, ponto_servico_id = ? WHERE id = ?",
							[situacaoCadastral,
							 motivoInativacaoOutros,
							 prioridade,
							 programaDBA,
							 pontoServicoId,
							 SITUACAODBA.cidadao_id],
							 SITUACAODBA.excluiMotivoInativacao, 
							 SITUACAODBA.salvaSituacaoDBAFail);
	},
	
	excluiMotivoInativacao: function (trans, res) {
		console.log("excluiMotivoInativacao");
		
		SITUACAODBA.listaMotivoInativacaoCounter = 0;
		BANCODADOS.sqlCmdDB("DELETE FROM motivo_inativacao WHERE cidadao_id = ?",
							[SITUACAODBA.cidadao_id],
							SITUACAODBA.auxListaMotivoInativacao.length > 0 ? SITUACAODBA.excluiMotivoInativacaoSuccess : SITUACAODBA.salvaSituacaoDBASuccess,
							SITUACAODBA.salvaSituacaoDBAFail);	
	},
	
	excluiMotivoInativacaoSuccess: function (trans, res) {
		console.log("excluiMotivoInativacaoSuccess");

		// Salva motivo inativação
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO motivo_inativacao (tipo_motivo_inativacao_id, cidadao_id, dt_criacao) VALUES (?, ?, ?)",
							[SITUACAODBA.auxListaMotivoInativacao[SITUACAODBA.listaMotivoInativacaoCounter++],
							 SITUACAODBA.cidadao_id,
							 (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds())],
							SITUACAODBA.listaMotivoInativacaoCounter < SITUACAODBA.auxListaMotivoInativacao.length ? SITUACAODBA.excluiMotivoInativacaoSuccess : SITUACAODBA.salvaSituacaoDBASuccess,
							SITUACAODBA.salvaSituacaoDBAFail);
	},
	
	salvaSituacaoDBASuccess: function (trans, res) {
		console.log("salvaSituacaoDBASuccess");
		
/*		// todo: testes retirar
		alert("Situação DBA foi salva com sucesso!");
		// todo: testes retirar*/
		
		// Retorna
		SITUACAODBA.cbSuccess_f();
	},
	
	salvaSituacaoDBAFail: function (err) {
		console.log("salvaSituacaoDBAFail");
		
/*		// todo: testes retirar
		alert("Houve falha no salvamento da situação DBA!");
		// todo: testes retirar*/
		
		// Retorna
		SITUACAODBA.cbFail_f(err);
	},
}
