var FREQUENCIA = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	listaFrequencia: [],
	
	// Auxiliares
	auxData: null,
	auxCounter: null,
	
    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(data, cbSuccess, cbFail) {
	    console.log("dadosEntrada");

		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;
		
		FREQUENCIA.auxData = data;
		
		// todo: Se o usuário for perfil_tecnico (tabela perfil) apresenta as atividades de todos os cidadãos do usuário, sem apresentar a lista de cidadãos
		if (USUARIO.perfil_tecnico == false) {		// todo: mudar para true
			// Obtém frequencias do usuário (tabela "frequencia"), com status = 1, para a data selecionada 
			BANCODADOS.sqlCmdDB("SELECT id, cidadao_id, atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, dt_criacao " +
								"FROM frequencia " +
								"WHERE usuario_id = ? " +
								"AND data_frequencia = ?",
								[USUARIO.usuario_id, data], 
								FREQUENCIA.listaFrequenciaSuccess, 
								FREQUENCIA.dadosEntradaFrequenciaFail);
		// Inclui na lista
		
		// Usar a lista CIDADAO.listaCidadaosDados
		// Para cada cidadão da lista CIDADAO.listaCidadaosDados buscar lista de atividades em ATIVIDADE.dadosEntrada([id do cidadao], [retorno de sucesso], [retorno de falha])
		// Filtrar pela data
		// Inclui na lista se não estiver na lista de frequencia obtida pela tabela "frequencia"
		}
		
		// todo: Se o usuário não for perfil_tecnico apresenta a lista de cidadãos
	},

	listaFrequenciaSuccess: function (trans, res) {
		console.log("listaFrequenciaSuccess");
		
		FREQUENCIA.listaFrequencia = [];

		// Inclui na lista de frequencia
		for (var i = 0; i < res.rows.length; i++) {
			var dt = {
				id: res.rows.item(i).id,
				cidadao_id: res.rows.item(i).cidadao_id,
				atividade_id: res.rows.item(i).atividade_id,
				tipo_atuacao_id: res.rows.item(i).tipo_atuacao_id,
				usuario_id: res.rows.item(i).usuario_id,
				data_frequencia: res.rows.item(i).data_frequencia,
				frequencia: res.rows.item(i).frequencia,
				justificativa: res.rows.item(i).justificativa,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			FREQUENCIA.listaFrequencia.push(dt);
		}
		
		// Obtém lista de atividades para cidadãos
		FREQUENCIA.obtemListaAtividades();
	},
	
	obtemListaAtividades: function () {
		console.log("obtemListaAtividades");
		
		ATIVIDADE.dadosEntrada(CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter++].id, 
							   FREQUENCIA.listaAtividadesSuccess,
							   FREQUENCIA.dadosEntradaFrequenciaFail);
	},
	
	listaAtividadesSuccess: function (trans, res) {
		console.log("listaAtividadesSuccess");
		
		var encontrou;
		if (ATIVIDADE.listaAtividades.length > 0) {
			// Filtra pela data
			var jsonAtividades = ATIVIDADE.montaCalendario(new Date(FREQUENCIA.auxData) * 1000, new Date(FREQUENCIA.auxData) * 1000);
			console.log(jsonAtividades);
			alert("Cidadão: " + CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id);
			
			// todo: Adiciona na lista de frequencias, considerando atividades já presentes (na lista)
			for (var j = 0; j < jsonAtividades.length; j++) {
				encontrou = false;
				for (var i = 0; i < FREQUENCIA.listaFrequencia.length; i++) {
					if (FREQUENCIA.listaFrequencia[i].id == jsonAtividade[j].id) {
						// Atividade já está presente na lista
						encontrou = true;
						break;
					}
				}
				if (encontrou) {
					continue;
				}
				
				// Adiciona na lista
				for (var i = 0; i < ATIVIDADE.listaAtividades.length; i++) {
					if (jsonAtividade[j].id = ATIVIDADE.listaAtividades[i].id) {
						// Encontrou a atividade, insere na lita de frequencias
						var dt = {
							id: null,
							cidadao_id: ATIVIDADE.listaAtividades[i].cidadao_id,
							atividade_id: ATIVIDADE.listaAtividades[i].atividade_id,
							tipo_atuacao_id: ATIVIDADE.listaAtividades[i].tipo_atuacao_id,
							usuario_id: ATIVIDADE.listaAtividades[i].usuario_id,
							data_frequencia: ATIVIDADE.listaAtividades[i].data_frequencia,
							frequencia: null,
							justificativa: null,
							dt_criacao: null,
						};
						FREQUENCIA.listaFrequencia.push(dt);
						break;
					}
				}
			}
		}
		
		// Há mais cidadãos na lista do usuário
		if (FREQUENCIA.auxCounter < CIDADAO.listaCidadaosDados.length) {
			FREQUENCIA.obtemListaAtividades();
		}
		else {
			// todo:
			alert("Acabaram os cidadãos");
			
			// Monta a tela
			FREQUENCIA.montaFrequencia();
		}
	},

	montaFrequencia: function () {
		console.log("montaFrequencia");
		
		// todo: Percorre a lista de frequencias, cria HTML e insere
	}
	dadosEntradaFrequenciaFail: function (err) {
		console.log("dadosEntradaFrequenciaFail");
		
		// Retorna
		// todo: revisar
		alert("Houve falha na obtenção de informações de frequência.");
		
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
