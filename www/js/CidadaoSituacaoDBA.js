var SITUACAODBA = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	cidadao_id: null,
	
	situacaoCadastral: null,
	auxsituacaoCadastral: null,
	motivoInativacaoOutros: null,
	auxmotivoInativacaoOutros: null,
	prioridade: null,
	auxprioridade: null,
	programaDBA: null,
	auxprogramaDBA: null,
	pontoServicoId: null,
	auxpontoServicoId: null,
	listaMotivoInativacao: [],
	auxListaMotivoInativacao: null,
	listaMotivoInativacaoCounter: 0,
	dt_inclusao_dba: null,
	auxdt_inclusao_dba: null,
	dt_exclusao_dba: null,
	auxdt_exclusao_dba: null,
	pontoServicoIDAnterior: null,

    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");

		// Salva funções de retorno
		SITUACAODBA.cbSuccess_f = cbSuccess;
		SITUACAODBA.cbFail_f = cbFail;
		
		// Salva cidadão
		//SITUACAODBA.cidadao_id = cidadao;
		//SITUACAODBA.cidadao_id = CIDADAO.listaCidadaosId[CIDADAO.indiceListaCidadao];
		SITUACAODBA.cidadao_id = CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].id;
		
		// Obtém situação DBA
		// todo: perguntar sobre os campos ponto_servico_id, dt_inclusao_dba, dt_exclusao_dba, dt_criacao, dt_atualizacao
		BANCODADOS.sqlCmdDB("SELECT situacao_cadastral, motivo_inativacao_outros, prioridade, programa_dba, ponto_servico_id, dt_inclusao_dba, dt_exclusao_dba FROM cidadao WHERE id = ?",
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
			SITUACAODBA.dt_inclusao_dba = res.rows.item(0).dt_inclusao_dba;
			SITUACAODBA.dt_exclusao_dba = res.rows.item(0).dt_exclusao_dba;
			
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
							   dataInclusao,
							   dataExclusao,
							   cbSuccess, cbFail) {
	    console.log("salvaSituacaoDBA");

		// Salva funções de retorno
		SITUACAODBA.cbSuccess_f = cbSuccess;
		SITUACAODBA.cbFail_f = cbFail;

		SITUACAODBA.auxListaMotivoInativacao = listaMotivoInativacao;
		SITUACAODBA.auxsituacaoCadastral = situacaoCadastral;
		SITUACAODBA.auxmotivoInativacaoOutros = motivoInativacaoOutros;
		SITUACAODBA.auxprioridade = prioridade;
		SITUACAODBA.auxprogramaDBA = programaDBA;
		SITUACAODBA.auxpontoServicoId = pontoServicoId;
		SITUACAODBA.auxdt_inclusao_dba = dataInclusao;
		SITUACAODBA.auxdt_exclusao_dba = dataInclusao;
		
		SITUACAODBA.pontoServicoIDAnterior = SITUACAODBA.pontoServicoId;
		
		if (SITUACAODBA.pontoServicoId == SITUACAODBA.auxpontoServicoId) {
			// Não houve mudança do local de acolhida
			ATIVIDADE.atualizaSituacaoDBA();
		}
		else {
			// Houve mudança no local de acolhida (pontoServicoId), troca a atividade diária do cidadão
			ATIVIDADE.trocaAtividade(SITUACAODBA.pontoServicoId);
		}
	},
	
	atualizaSituacaoDBA: function () {
		console.log("atualizaSituacaoDBA");

		// Atualiza
		BANCODADOS.sqlCmdDB("UPDATE cidadao SET situacao_cadastral = ?, motivo_inativacao_outros = ?, prioridade = ?, programa_dba = ?, ponto_servico_id = ?, dt_inclusao_dba = ?, dt_exclusao_dba = ?, mobile = ? WHERE id = ?",
							[SITUACAODBA.auxsituacaoCadastral,
							 SITUACAODBA.auxmotivoInativacaoOutros,
							 SITUACAODBA.auxprioridade,
							 SITUACAODBA.auxprogramaDBA,
							 SITUACAODBA.auxpontoServicoId,
							 SITUACAODBA.auxdt_inclusao_dba,
							 SITUACAODBA.auxdt_exclusao_dba,
							 CIDADAO.UPDATE_MOBILE,
							 SITUACAODBA.cidadao_id],
							 SITUACAODBA.excluiMotivoInativacao, 
							 SITUACAODBA.salvaSituacaoDBAFail);
	},
	
	excluiMotivoInativacao: function (trans, res) {
		console.log("excluiMotivoInativacao");
		
		SITUACAODBA.listaMotivoInativacaoCounter = 0;
		BANCODADOS.sqlCmdDB("DELETE FROM motivo_inativacao WHERE cidadao_id = ?",
							[SITUACAODBA.cidadao_id],
							SITUACAODBA.auxListaMotivoInativacao.length > 0 ? SITUACAODBA.excluiMotivoInativacaoSuccess : (SITUACAODBA.auxprogramaDBA == 0 && SITUACAODBA.programaDBA == 1 ? SITUACAODBA.excluiCidadaoEquipeCoordenacao : SITUACAODBA.salvaSituacaoDBASuccess),
							SITUACAODBA.salvaSituacaoDBAFail);	
	},
	
	excluiMotivoInativacaoSuccess: function (trans, res) {
		console.log("excluiMotivoInativacaoSuccess");

		// Salva motivo inativação
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO motivo_inativacao (tipo_motivo_inativacao_id, cidadao_id, dt_criacao, mobile) VALUES (?, ?, ?, ?)",
							[SITUACAODBA.auxListaMotivoInativacao[SITUACAODBA.listaMotivoInativacaoCounter++],
							 SITUACAODBA.cidadao_id,
							 (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds()),
							 CIDADAO.INSERT_MOBILE],
	//						SITUACAODBA.listaMotivoInativacaoCounter < SITUACAODBA.auxListaMotivoInativacao.length ? SITUACAODBA.excluiMotivoInativacaoSuccess : SITUACAODBA.salvaSituacaoDBASuccess,
							SITUACAODBA.listaMotivoInativacaoCounter < SITUACAODBA.auxListaMotivoInativacao.length ? SITUACAODBA.excluiMotivoInativacaoSuccess : (SITUACAODBA.auxprogramaDBA == 0 && SITUACAODBA.programaDBA == 1 ? SITUACAODBA.excluiCidadaoEquipeCoordenacao : SITUACAODBA.salvaSituacaoDBASuccess),
							SITUACAODBA.salvaSituacaoDBAFail);
	},
	
	excluiCidadaoEquipeCoordenacao: function () {
		console.log("excluiCidadaoEquipeCoordenacao");
		
		// Exclui cidadão da equipe de coordenação fazendo status = 0
		BANCODADOS.sqlCmdDB("UPDATE equipe_cidadao SET status = ?, mobile = ? WHERE cidadao_id = ?",
							[
							0,
							CIDADAO.UPDATE_MOBILE,
							SITUACAODBA.cidadao_id
							],
							SITUACAODBA.salvaSituacaoDBASuccess, 
							SITUACAODBA.salvaSituacaoDBAFail);
	},
	
	salvaSituacaoDBASuccess: function (trans, res) {
		console.log("salvaSituacaoDBASuccess");
		
		$('.msgParabens').removeAttr('style').fadeOut(5000);
		$('html, body').animate({scrollTop:0}, 'slow');
		
		// atualiza dados
		SITUACAODBA.situacaoCadastral = SITUACAODBA.auxsituacaoCadastral;
		SITUACAODBA.motivoInativacaoOutros = SITUACAODBA.auxmotivoInativacaoOutros;
		SITUACAODBA.prioridade = SITUACAODBA.auxprioridade;
		SITUACAODBA.programaDBA = SITUACAODBA.auxprogramaDBA;
		SITUACAODBA.pontoServicoId = SITUACAODBA.auxpontoServicoId;
		SITUACAODBA.listaMotivoInativacao = SITUACAODBA.auxListaMotivoInativacao;
		SITUACAODBA.dt_inclusao_dba = SITUACAODBA.auxdt_inclusao_dba;
		SITUACAODBA.dt_exclusao_dba = SITUACAODBA.auxdt_exclusao_dba;

		// Atualiza ficha
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].situacao_cadastral = SITUACAODBA.situacaoCadastral;
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].prioridade = SITUACAODBA.prioridade;
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].programa_dba = SITUACAODBA.programaDBA;
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].ponto_servico_id = SITUACAODBA.pontoServicoId;		
		atualizaFichaCidadao();
		
		// Atualiza opções de abas
		iniAbasUsuario(null);

		// Retorna
		SITUACAODBA.cbSuccess_f();
	},
	
	salvaSituacaoDBAFail: function (err) {
		console.log("salvaSituacaoDBAFail");
		
		// Retorna
		//SITUACAODBA.cbFail_f(err);
		alertMessage("Erro na operação: " + err);
	},
}
