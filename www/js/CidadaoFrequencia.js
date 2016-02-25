var FREQUENCIA = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	listaFrequencia: [],
	cidadao_id: null,
	abas: [],
	
	// Auxiliares
	auxData: null,
	auxCounter: null,
	auxCounterII: null,
	
	// ****************** Verifica entrada ******************************
	iniFrequencia: function (data, cbSuccess, cbFail) {
		console.log("iniFrequencia");
		
		FREQUENCIA.auxCounterII = 0;
		if (USUARIO.perfil_tecnico == false) {		// todo: mudar para true
			var i = 0;
			var perfil = USUARIO.perfil_codigo;
			do {
				switch (perfil) {
				case "TSAU":
					abas.push("Saúde");
					break;
				case "TTRA":
					abas.push("Trabalho");
					break;
				case "TSOC":
					abas.push("Social");
					break;
				}
			} while ((i < USUARIO.perfil_acumulado.length) && (perfil = USUARIO.perfil_acumulado[i++]) != null);		
		
			FREQUENCIA.dadosEntrada(data, null, cbSuccess, cbFail);
		}
		else {
			// O usuário não possui perfil_tecnico, apresenta a lista de cidadãos do usuário
			abas.push("Saúde");
			abas.push("Trabalho");
			abas.push("Social");
			
			for (var i = 0; i < CIDADAO.listaCidadaosDados.length; i++) {
				// Monta a lista de cidadãos e insere no HTML
			}
		}
	},
	
    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(data, cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");

		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;
		
		FREQUENCIA.auxData = data;
		FREQUENCIA.cidadao_id = null;
		
		var tipoAtuacao = ATIVIDADE.listaAtuacao_NomeVersusID[abas[FREQUENCIA.auxCounterII]];
		
		// Se o usuário for perfil_tecnico (tabela perfil) apresenta as atividades de todos os cidadãos do usuário, sem apresentar a lista de cidadãos
		if (USUARIO.perfil_tecnico == false) {		// todo: mudar para true
			// Obtém frequencias do usuário (tabela "frequencia"), com status = 1, para a data selecionada 
			BANCODADOS.sqlCmdDB("SELECT id, cidadao_id, atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, dt_criacao " +
								"FROM frequencia " +
								"WHERE usuario_id = ? " +
								"AND data_frequencia = ? " +
								"AND (tipo_atuacao_id = ? OR tipo_atuacao_id = ?)",
								[USUARIO.usuario_id, data, tipoAtuacao, ATIVIDADE.listaAtuacao_NomeVersusID["Todas"]], 
								FREQUENCIA.listaFrequenciaSuccess, 
								FREQUENCIA.dadosEntradaFrequenciaFail);
		}
		else {
			// Obtém frequencias do usuário/cidadão (tabela "frequencia"), com status = 1, para a data selecionada 
			BANCODADOS.sqlCmdDB("SELECT id, cidadao_id, atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, dt_criacao " +
								"FROM frequencia " +
								"WHERE usuario_id = ? " +
								"AND data_frequencia = ? " +
								"AND cidadao_id = ? " +
								"AND (tipo_atuacao_id = ? OR tipo_atuacao_id = ?)",
								[USUARIO.usuario_id, data, FREQUENCIA.cidadao_id = cidadao, tipoAtuacao, ATIVIDADE.listaAtuacao_NomeVersusID["Todas"]], 
								FREQUENCIA.listaFrequenciaSuccess, 
								FREQUENCIA.dadosEntradaFrequenciaFail);
		}
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
		
		// todo: testes retirar
		var Print = "Frequências na tabela frequencia: \r\n";
		for (var i = 0; i < FREQUENCIA.listaFrequencia.length; i++)
		{
			Print += "Frequência " + i + ":\r\n";
			Print += "\tid: " + FREQUENCIA.listaFrequencia[i].id + "\r\n";
			Print += "\tcidadao_id: " + FREQUENCIA.listaFrequencia[i].cidadao_id + "\r\n";
			Print += "\tatividade_id: " + FREQUENCIA.listaFrequencia[i].atividade_id + "\r\n";
			Print += "\ttipo_atuacao_id: " + FREQUENCIA.listaFrequencia[i].tipo_atuacao_id + "\r\n";
			Print += "\tusuario_id: " + FREQUENCIA.listaFrequencia[i].usuario_id + "\r\n";
			Print += "\tdata_frequencia: " + FREQUENCIA.listaFrequencia[i].data_frequencia + "\r\n";
			Print += "\tfrequencia: " + FREQUENCIA.listaFrequencia[i].frequencia + "\r\n";
			Print += "\tjustificativa: " + FREQUENCIA.listaFrequencia[i].justificativa + "\r\n";
			Print += "\tdt_criacao: " + FREQUENCIA.listaFrequencia[i].dt_criacao + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		// Obtém lista de atividades para cidadãos
		FREQUENCIA.auxCounter = 0;
		FREQUENCIA.obtemListaAtividades();
	},
	
	obtemListaAtividades: function () {
		console.log("obtemListaAtividades");
		
		ATIVIDADE.dadosEntrada(FREQUENCIA.cidadao_id == null ? CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter++].id : FREQUENCIA.cidadao_id, 
							   FREQUENCIA.listaAtividadesSuccess,
							   FREQUENCIA.dadosEntradaFrequenciaFail);
	},
	
	listaAtividadesSuccess: function (trans, res) {
		console.log("listaAtividadesSuccess");
		
		var encontrou;
		if (ATIVIDADE.listaAtividades.length > 0) {
			// Filtra pela data
			var jsonAtividades = ATIVIDADE.montaCalendario(new Date(FREQUENCIA.auxData), new Date(FREQUENCIA.auxData));
			
			/*
			// todo: testes retirar
			console.log("Quantidade: " + jsonAtividades.length);
			console.log(jsonAtividades);
			// testes retirar
			*/
			
			// todo: Adiciona na lista de frequencias, considerando atividades já presentes (na lista)
			for (var j = 0; j < jsonAtividades.length; j++) {
				
				/*
				// todo: testes retirar
				var Print = "Dados do JSON\r\n";
				Print += "\tJSON " + j + "\r\n";
				Print += "\tID: " + jsonAtividades[j].id + "\r\n";
				Print += "\tTítulo: " + jsonAtividades[j].title + "\r\n";
				console.log(Print);
				// testes retirar
				*/
				encontrou = false;
				for (var i = 0; i < FREQUENCIA.listaFrequencia.length; i++) {
					if (FREQUENCIA.listaFrequencia[i].id == ATIVIDADE.listaAtividades[jsonAtividades[j].id].id) {
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
					if (jsonAtividades[j].id == i/*ATIVIDADE.listaAtividades[i].id*/) {
						// Encontrou a atividade, insere na lita de frequencias
						var dt = {
							id: null,
							cidadao_id: CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id,
							atividade_id: ATIVIDADE.listaAtividades[i].id,
							tipo_atuacao_id: ATIVIDADE.listaAtividades[i].tipo_atuacao_id,
							usuario_id: USUARIO.usuario_id,
							data_frequencia: null,			// todo: o que representa esta data?
							frequencia: null,
							justificativa: null,
							dt_criacao: null,
						};
						FREQUENCIA.listaFrequencia.push(dt);
						break;
					}
				}
				
				// todo: testes retirar
				var Print = "Total de frequência para o cidadão: " + CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id + "\r\n";
				for (var i = 0; i < FREQUENCIA.listaFrequencia.length; i++)
				{
					Print += "Frequência " + i + ":\r\n";
					Print += "\tid: " + FREQUENCIA.listaFrequencia[i].id + "\r\n";
					Print += "\tcidadao_id: " + FREQUENCIA.listaFrequencia[i].cidadao_id + "\r\n";
					Print += "\tatividade_id: " + FREQUENCIA.listaFrequencia[i].atividade_id + "\r\n";
					Print += "\ttipo_atuacao_id: " + FREQUENCIA.listaFrequencia[i].tipo_atuacao_id + "\r\n";
					Print += "\tusuario_id: " + FREQUENCIA.listaFrequencia[i].usuario_id + "\r\n";
					Print += "\tdata_frequencia: " + FREQUENCIA.listaFrequencia[i].data_frequencia + "\r\n";
					Print += "\tfrequencia: " + FREQUENCIA.listaFrequencia[i].frequencia + "\r\n";
					Print += "\tjustificativa: " + FREQUENCIA.listaFrequencia[i].justificativa + "\r\n";
					Print += "\tdt_criacao: " + FREQUENCIA.listaFrequencia[i].dt_criacao + "\r\n";
				}
				console.log(Print);
				// testes retirar
			}
		}
		
		// Há mais cidadãos na lista do usuário
		if ((FREQUENCIA.cidadao_id == null) && (FREQUENCIA.auxCounter < CIDADAO.listaCidadaosDados.length)) {
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
		switch (FREQUENCIA.abas[FREQUENCIA.auxCounterII++]) {
			case "Saúde":
				// todo: Aba Saúde
				break;
			case "Trabalho":
				// todo: Aba Trabalho
				break;
			case "Social":
				// todo: Aba Social
				break;
		}
		
		if (FREQUENCIA.auxCounterII < FREQUENCIA.abas.length) {
			FREQUENCIA.dadosEntrada(FREQUENCIA.auxData, FREQUENCIA.cidadao_id, FREQUENCIA.cbSuccess_f, FREQUENCIA.cbFail_f);
		}
	},
	
	dadosEntradaFrequenciaFail: function (err) {
		console.log("dadosEntradaFrequenciaFail");
		
		// Retorna
		// todo: revisar
		alert("Houve falha na obtenção de informações de frequência.");
		
		FREQUENCIA.cbFail_f(err);
	},
	
    // ****************** Salva frequência *********************
    salvaFrequencia: function(info, cbSuccess, cbFail) {
	    console.log("salvaFrequencia");

		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;

		// Atualiza
		BANCODADOS.sqlCmdDB("UPDATE cidadao SET informacoes_complementares = ? WHERE cidadao_id = ?",
							[FREQUENCIA.infoComplementares = info, FREQUENCIA.cidadao_id], FREQUENCIA.salvaFrequenciaSuccess, FREQUENCIA.salvaFrequenciaFail);
	},
	
	salvaFrequenciaSuccess: function (trans, res) {
		console.log("salvaFrequenciaSuccess");
		
		// Retorna
		FREQUENCIA.cbSuccess_f();
	},
	
	salvaFrequenciaFail: function (err) {
		console.log("salvaFrequenciaFail");
		
		// Retorna
		FREQUENCIA.cbFail_f(err);
	},
}
