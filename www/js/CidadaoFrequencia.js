var FREQUENCIA = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	listaFrequencia: [],
	cidadao_id: null,
	abas: [],
	listaTiposAtuacao: [],
	listaAtuacao_NomeVersusID: [],
	listaTipoAtuacaoIDBusca: null,
	
	// Auxiliares
	auxData: null,
	auxCounter: null,
	//auxCounterII: null,
	
	// ****************** Verifica entrada ******************************
	iniFrequencia: function (data, cbSuccess, cbFail) {
		console.log("iniFrequencia");

		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;
		FREQUENCIA.auxData = data;

		// Tipos de atuação
		BANCODADOS.sqlCmdDB("SELECT id, nome, status, dt_criacao FROM tipo_atuacao WHERE status = ?", [1], FREQUENCIA.listaTiposAtuacaoSuccess, FREQUENCIA.dadosEntradaFrequenciaFail);
	},
	
	listaTiposAtuacaoSuccess: function (trans, res) {
		console.log("listaTiposAtuacaoSuccess");
		
		// Salva tipos de atuação
		FREQUENCIA.listaTiposAtuacao = [];
		for (var i = 0; i < res.rows.length; i++) {
			var lta = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			FREQUENCIA.listaTiposAtuacao.push(lta);
		}
		
		// todo: testes retirar
		var Print = "Tipos de Atuação" + "\r\n";
		for (var i = 0; i < FREQUENCIA.listaTiposAtuacao.length; i++) {
			Print += "TIPO DE ATUAÇÃO: " + i + "\r\n";
			Print += "Id: " + FREQUENCIA.listaTiposAtuacao[i].id + "\r\n";
			Print += "Nome: " + FREQUENCIA.listaTiposAtuacao[i].nome + "\r\n";
			Print += "Status: " + FREQUENCIA.listaTiposAtuacao[i].status + "\r\n";
			Print += "Data de criação: " + FREQUENCIA.listaTiposAtuacao[i].dt_criacao + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);
		// testes retirar

		// Cria lista de nome x id para tipos de atuação
		for (var i = 0; i < FREQUENCIA.listaTiposAtuacao.length; i++) {
			if (FREQUENCIA.listaTiposAtuacao[i].status == 1) {
				FREQUENCIA.listaAtuacao_NomeVersusID[FREQUENCIA.listaTiposAtuacao[i].nome] = FREQUENCIA.listaTiposAtuacao[i].id;
			}
		}
		
		// todo: testes retirar
		var Print = "Tipos de Atuação - Nome Versus ID" + "\r\n";
		for (var i = 0; i < FREQUENCIA.listaTiposAtuacao.length; i++) {
			Print += "ID de " + FREQUENCIA.listaTiposAtuacao[i].nome + ": " + FREQUENCIA.listaAtuacao_NomeVersusID[FREQUENCIA.listaTiposAtuacao[i].nome] + "\r\n";
		}
		console.log (Print);
		// testes retirar

		//FREQUENCIA.auxCounterII = 0;
		FREQUENCIA.listaTipoAtuacaoIDBusca = "AND (";
		if (USUARIO.perfil_tecnico == true) {
			var i = 0;
			var perfil = USUARIO.perfil_codigo;
			FREQUENCIA.abas = [];
			do {
				switch (perfil) {
				case "TSAU":
					FREQUENCIA.abas.push("Saúde");
					FREQUENCIA.listaTipoAtuacaoIDBusca += (i == 0 ? "tipo_atuacao_id = " : " OR tipo_atuacao_id = ") + FREQUENCIA.listaAtuacao_NomeVersusID["Saúde"] + " ";
					break;
				case "TTRA":
					FREQUENCIA.abas.push("Trabalho");
					FREQUENCIA.listaTipoAtuacaoIDBusca += (i == 0 ? "tipo_atuacao_id = " : " OR tipo_atuacao_id = ") + FREQUENCIA.listaAtuacao_NomeVersusID["Trabalho"] + " ";
					break;
				case "TSOC":
					FREQUENCIA.abas.push("Social");
					FREQUENCIA.listaTipoAtuacaoIDBusca += (i == 0 ? "tipo_atuacao_id = " : " OR tipo_atuacao_id = ") + FREQUENCIA.listaAtuacao_NomeVersusID["Social"] + " ";
					break;
				}
			} while ((i < USUARIO.perfil_acumulado.length) && (perfil = USUARIO.perfil_acumulado[i++]) != null);		
			FREQUENCIA.listaTipoAtuacaoIDBusca += ")";
			
			FREQUENCIA.dadosEntrada(null);
		}
		else {
			// O usuário não possui perfil_tecnico, apresenta a lista de cidadãos do usuário
			FREQUENCIA.abas.push("Saúde");
			FREQUENCIA.abas.push("Trabalho");
			FREQUENCIA.abas.push("Social");
			FREQUENCIA.listaTipoAtuacaoIDBusca += "tipo_atuacao_id = " + FREQUENCIA.listaAtuacao_NomeVersusID["Saúde"] + " ";
			FREQUENCIA.listaTipoAtuacaoIDBusca += " OR tipo_atuacao_id = " + FREQUENCIA.listaAtuacao_NomeVersusID["Trabalho"] + " ";
			FREQUENCIA.listaTipoAtuacaoIDBusca += " OR tipo_atuacao_id = " + FREQUENCIA.listaAtuacao_NomeVersusID["Social"] + " ";
			FREQUENCIA.listaTipoAtuacaoIDBusca += ")";
			
			for (var i = 0; i < CIDADAO.listaCidadaosDados.length; i++) {
				// todo: Monta a lista de cidadãos e insere no HTML
			}
		}
	},
	
    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao) {
	    console.log("dadosEntrada");

		FREQUENCIA.cidadao_id = null;
		
		//var tipoAtuacao = ATIVIDADE.listaAtuacao_NomeVersusID[abas[FREQUENCIA.auxCounterII]];
		
		// Se o usuário for perfil_tecnico (tabela perfil) apresenta as atividades de todos os cidadãos do usuário, sem apresentar a lista de cidadãos
		if (USUARIO.perfil_tecnico == true) {
			// Obtém frequencias do usuário (tabela "frequencia"), com status = 1, para a data selecionada 
			BANCODADOS.sqlCmdDB("SELECT id, cidadao_id, atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, frequencia_livre, dt_criacao " +
								"FROM frequencia " +
								"WHERE usuario_id = ? " +
								"AND data_frequencia = ? " +
								"AND status = ? " +
								//"AND tipo_atuacao_id = ?",
								FREQUENCIA.listaTipoAtuacaoIDBusca,
								//[USUARIO.usuario_id, FREQUENCIA.auxData, 1, tipoAtuacao], 
								[USUARIO.usuario_id, FREQUENCIA.auxData, 1], 
								FREQUENCIA.listaFrequenciaSuccess, 
								FREQUENCIA.dadosEntradaFrequenciaFail);
		}
		else {
			// Obtém frequencias do usuário/cidadão (tabela "frequencia"), com status = 1, para a data selecionada 
			BANCODADOS.sqlCmdDB("SELECT id, cidadao_id, atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, frequencia_livre, dt_criacao " +
								"FROM frequencia " +
								"WHERE usuario_id = ? " +
								"AND data_frequencia = ? " +
								"AND status = ? " +
								"AND cidadao_id = ? " +
								//"AND tipo_atuacao_id = ?",
								FREQUENCIA.listaTipoAtuacaoIDBusca,
								//[USUARIO.usuario_id, FREQUENCIA.auxData, 1, FREQUENCIA.cidadao_id = cidadao, tipoAtuacao], 
								[USUARIO.usuario_id, FREQUENCIA.auxData, 1, FREQUENCIA.cidadao_id = cidadao], 
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
				frequencia_livre: res.rows.item(i).frequencia_livre,
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
			Print += "\tfrequencia_livre: " + FREQUENCIA.listaFrequencia[i].frequencia_livre + "\r\n";
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
							frequencia_livre: null,
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
		
		for (var i = 0; i < FREQUENCIA.abas.length; i++) {
			switch (FREQUENCIA.abas[i]) {
				case "Saúde":
					// todo: Aba Saúde (usa tipo_atuacao_id de saúde e também tipo_atuacao_id de todas)
					break;
				case "Trabalho":
					// todo: Aba Trabalho (usa tipo_atuacao_id de trabalho e também tipo_atuacao_id de todas)
					break;
				case "Social":
					// todo: Aba Social (usa tipo_atuacao_id de social e também tipo_atuacao_id de todas)
					break;
			}
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
