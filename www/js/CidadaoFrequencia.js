var FREQUENCIA = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	listaFrequencia: [],
	cidadao_id: null,
	abas: [],
	listaTiposAtuacao: [],
	listaAtuacao_NomeVersusID: [],
	listaIDVersusAtuacao_Nome: [],
	listaTipoAtuacaoIDBusca: null,
	
	// Auxiliares
	auxData: null,
	auxCounter: null,
	indiceFrequencia: null,
	indiceCidadao: null,
	frequencia: null,
	justificativa: null,
	tipoAtuacaoID: null,
	listaPontosServico: [],
	
	// ****************** FREQUENCIAS ***********************************
	listaFrequenciasCidadaos: [],
	
	tFrequencia: function () {
		id: null;
		atividade_id: null;
		tipo_atuacao_id: null;
		usuario_id: null;
		data_frequencia: null;
		frequencia: null;
		justificativa: null;
		frequencia_livre: null;
		dt_criacao: null;
	},
	
	frequenciasCidadao: function () {
		listaFrequencias: null;
		cidadao_id: null;
		cidadao_nome: null;
		cidadao_nome_social: null;
		indice_frequencia_livre_Saude: null;
		indice_frequencia_livre_Trabalho: null;
		indice_frequencia_livre_Social: null;
	},
	// ****************** FREQUENCIAS ***********************************
	
	// ****************** Verifica entrada ******************************
	iniFrequencia: function (cbSuccess, cbFail) {
		console.log("iniFrequencia");
		
		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;
		
		FREQUENCIA.cidadao_id = null;

		// Tipos de atuação
		BD_DTO.ponto_servico_carrega(FREQUENCIA.listaPontosServicoSuccess, FREQUENCIA.dadosEntradaFrequenciaFail);
	},
	
	listaPontosServicoSuccess: function () {
		console.log("listaPontosServicoSuccess");

		FREQUENCIA.listaPontosServico = BD_DTO.ponto_servico_data;

		BD_DTO.tipo_atuacao_carrega(FREQUENCIA.listaTiposAtuacaoSuccess, FREQUENCIA.dadosEntradaFrequenciaFail);
	},
	
	listaTiposAtuacaoSuccess: function (trans, res) {
		console.log("listaTiposAtuacaoSuccess");
		
		// Salva tipos de atuação
		FREQUENCIA.listaTiposAtuacao = BD_DTO.tipo_atuacao_data;
		
		// todo: testes retirar
		var Print = "Tipos de Atuação" + "\r\n";
		for (var i = 0; i < FREQUENCIA.listaTiposAtuacao.length; i++) {
			Print += "TIPO DE ATUAÇÃO: " + i + "\r\n";
			Print += "Id: " + FREQUENCIA.listaTiposAtuacao[i].id + "\r\n";
			Print += "Nome: " + FREQUENCIA.listaTiposAtuacao[i].nome + "\r\n";
			Print += "Status: " + FREQUENCIA.listaTiposAtuacao[i].status + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);
		// testes retirar

		// Cria lista de nome x id para tipos de atuação
		for (var i = 0; i < FREQUENCIA.listaTiposAtuacao.length; i++) {
			if (FREQUENCIA.listaTiposAtuacao[i].status == 1) {
				FREQUENCIA.listaAtuacao_NomeVersusID[FREQUENCIA.listaTiposAtuacao[i].nome] = FREQUENCIA.listaTiposAtuacao[i].id;
				FREQUENCIA.listaIDVersusAtuacao_Nome[FREQUENCIA.listaTiposAtuacao[i].id] = FREQUENCIA.listaTiposAtuacao[i].nome;
			}
		}
		
		// todo: testes retirar
		var Print = "Tipos de Atuação - Nome Versus ID" + "\r\n";
		for (var i = 0; i < FREQUENCIA.listaTiposAtuacao.length; i++) {
			Print += "ID de " + FREQUENCIA.listaTiposAtuacao[i].nome + ": " + FREQUENCIA.listaAtuacao_NomeVersusID[FREQUENCIA.listaTiposAtuacao[i].nome] + "\r\n";
			Print += "Tipo de atuação " + FREQUENCIA.listaTiposAtuacao[i].id + ": " + FREQUENCIA.listaIDVersusAtuacao_Nome[FREQUENCIA.listaTiposAtuacao[i].id] + "\r\n";
		}
		console.log (Print);
		// testes retirar

		FREQUENCIA.listaTipoAtuacaoIDBusca = "AND (";

		FREQUENCIA.abas = [];
		if (USUARIO.perfil_tecnico == true) {
			var i = 0;
			var perfil = USUARIO.perfil_codigo;
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
			FREQUENCIA.listaTipoAtuacaoIDBusca += " OR tipo_atuacao_id = " + FREQUENCIA.listaAtuacao_NomeVersusID["Todas"] + " ";
			FREQUENCIA.listaTipoAtuacaoIDBusca += ")";
			
			var listaCidadaosFrequencia = "<li class='li-header'><div>Nome Completo</div><div>Nome Social</div><div>Local de Acolhida</div></li>";
			for (var i = 0; i < CIDADAO.listaCidadaosDados.length; i++) {
				var nomeAcolhida = "";
				for (var j = 0; j < FREQUENCIA.listaPontosServico.length; j++) {
					if (FREQUENCIA.listaPontosServico[j].id == CIDADAO.listaCidadaosDados[i].ponto_servico_id) {
						nomeAcolhida = FREQUENCIA.listaPontosServico[j].nome;
						break;
					}
				}				
				// Monta a lista de cidadãos e insere no HTML
                listaCidadaosFrequencia += "<li><div onclick='FREQUENCIA.selecionaCidadaoFrequencia(" + CIDADAO.listaCidadaosDados[i].id + ");'>" + CIDADAO.listaCidadaosDados[i].nome + "</div><div>" + CIDADAO.listaCidadaosDados[i].nome_social + "</div><div>" + nomeAcolhida + "</div></li>";
			}
			// todo: testes retirar
			console.log(listaCidadaosFrequencia);
			// testes retirar
			$("#ullistaFreqCidadaos").empty();
			$("#ullistaFreqCidadaos").append(listaCidadaosFrequencia);
		}
	},
	
	selecionaCidadaoFrequencia: function (cidadao) {
		console.log("selecionaCidadaoFrequencia");
		
		FREQUENCIA.cidadao_id = cidadao;
		aguardeMsgOn("Carregando dados...");
		PageManager.loadTmpl('div_frequencia');
	},
	
    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao) {
	    console.log("dadosEntrada");
		
		FREQUENCIA.cidadao_id = null;
		
		// todo: testes retirar
		console.log("FREQUENCIA.cidadao_id = " + FREQUENCIA.cidadao_id + " - cidadao = " + cidadao);
		// testes retirar
		
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
		
		var v = null;
		FREQUENCIA.listaFrequenciasCidadaos = [];
		var lcidadao;
		var dt;

		if (res.rows.length > 0) {
			lcidadao = res.rows.item(0).cidadao_id;
			v = new FREQUENCIA.frequenciasCidadao();
			v.listaFrequencias = [];
			v.cidadao_id = lcidadao;
			
			var dadosCidadao = null;
			v.cidadao_nome = "";
			if ((dadosCidadao = CIDADAO.dadosCidadaoID(v.cidadao_id)) != null) {
				v.cidadao_nome = dadosCidadao.nome;
				v.cidadao_nome_social = dadosCidadao.nome_social;
			}

			// Inclui na lista de frequencia
			for (var i = 0; i < res.rows.length; i++) {
				dt = new FREQUENCIA.tFrequencia();
				dt.id = res.rows.item(i).id;
				dt.atividade_id = res.rows.item(i).atividade_id;
				dt.tipo_atuacao_id = res.rows.item(i).tipo_atuacao_id;
				dt.usuario_id = res.rows.item(i).usuario_id;
				dt.data_frequencia = res.rows.item(i).data_frequencia;
				dt.frequencia = res.rows.item(i).frequencia;
				dt.justificativa = res.rows.item(i).justificativa;
				dt.frequencia_livre = res.rows.item(i).frequencia_livre;
				dt.dt_criacao = res.rows.item(i).dt_criacao;
				dt.descricao = "";
				if (lcidadao != res.rows.item(i).cidadao_id) {
					// Mudou o cidadão, salva na lista e cria outro objeto
					FREQUENCIA.listaFrequenciasCidadaos.push(v);
					v = new FREQUENCIA.frequenciasCidadao(); 
					v.listaFrequencias = [];
					v.cidadao_id = lcidadao = res.rows.item(i).cidadao_id;;

					var dadosCidadao = null;
					v.cidadao_nome = "";
					if ((dadosCidadao = CIDADAO.dadosCidadaoID(v.cidadao_id)) != null) {
						v.cidadao_nome = dadosCidadao.nome;
						v.cidadao_nome_social = dadosCidadao.nome_social;
					}
				}
				v.listaFrequencias.push(dt);

				// Salva o índice do registro que é frequência livre do cidadão, se houver
				if (dt.frequencia_livre) {
					if (FREQUENCIA.listaIDVersusAtuacao_Nome[dt.tipo_atuacao_id] == "Saúde") {
						v.indice_frequencia_livre_Saude = v.listaFrequencias.length-1;
					}
					else if (FREQUENCIA.listaIDVersusAtuacao_Nome[dt.tipo_atuacao_id] == "Trabalho") {
						v.indice_frequencia_livre_Trabalho = v.listaFrequencias.length-1;
					}
					else if (FREQUENCIA.listaIDVersusAtuacao_Nome[dt.tipo_atuacao_id] == "Social") {
						v.indice_frequencia_livre_Social = v.listaFrequencias.length-1;
					}
				}
			}
			/*
			// Salva o índice do registro que é frequência livre do cidadão, se houver
			if (dt.frequencia_livre) {
				if (FREQUENCIA.listaIDVersusAtuacao_Nome[dt.tipo_atuacao_id] == "Saúde")
				{
					v.indice_frequencia_livre_Saude = FREQUENCIA.listaFrequenciasCidadaos.length;
				}
				else if (FREQUENCIA.listaIDVersusAtuacao_Nome[dt.tipo_atuacao_id] == "Trabalho") {
					v.indice_frequencia_livre_Trabalho = FREQUENCIA.listaFrequenciasCidadaos.length;
				}
				else if (FREQUENCIA.listaIDVersusAtuacao_Nome[dt.tipo_atuacao_id] == "Social") {
					v.indice_frequencia_livre_Social = FREQUENCIA.listaFrequenciasCidadaos.length;
				}
			}
			*/
			FREQUENCIA.listaFrequenciasCidadaos.push(v);

			// todo: testes retirar
			var Print = "Frequências na tabela frequencia: \r\n";
			for (var i = 0; i < FREQUENCIA.listaFrequenciasCidadaos.length; i++)
			{
				Print += "Cidadão: " + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_nome + "(" + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_id + ")\r\n";
				for (var j = 0; j < FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias.length; j++) {
					Print += "\tFrequência " + j + ":\r\n";
					Print += "\tid: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].id + "\r\n";
					Print += "\tcidadao_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_id + "\r\n";
					Print += "\tatividade_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].atividade_id + "\r\n";
					Print += "\ttipo_atuacao_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].tipo_atuacao_id + "\r\n";
					Print += "\tusuario_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].usuario_id + "\r\n";
					Print += "\tdata_frequencia: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].data_frequencia + "\r\n";
					Print += "\tfrequencia: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].frequencia + "\r\n";
					Print += "\tjustificativa: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].justificativa + "\r\n";
					Print += "\tfrequencia_livre: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].frequencia_livre + "\r\n";
					Print += "\tdt_criacao: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].dt_criacao + "\r\n\r\n";
				}
			}
			console.log(Print);
			// testes retirar
		}

		// Obtém lista de atividades para cidadãos
		FREQUENCIA.auxCounter = 0;
		FREQUENCIA.obtemListaAtividades();
	},
	
	obtemListaAtividades: function () {
		console.log("obtemListaAtividades");
		
		ATIVIDADE.dadosEntrada(FREQUENCIA.cidadao_id == null ? CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id : FREQUENCIA.cidadao_id,
							   "FREQUENCIA",
							   FREQUENCIA.listaAtividadesSuccess,
							   FREQUENCIA.dadosEntradaFrequenciaFail);
	},
	
	listaAtividadesSuccess: function (trans, res) {
		console.log("listaAtividadesSuccess");
		
		var encontrou;
		var insercaoForcada;
		var indiceAuxiliar;
		if (ATIVIDADE.listaAtividades.length > 0) {
			// Filtra pela data
			var jsonAtividades = ATIVIDADE.montaCalendario(new Date(FREQUENCIA.auxData), new Date(FREQUENCIA.auxData));
			
			/*
			// todo: testes retirar
			console.log("Quantidade: " + jsonAtividades.length);
			console.log(jsonAtividades);
			// testes retirar
			*/
			
			// Adiciona na lista de frequencias, considerando atividades já presentes (na lista)
			for (var j = 0; j < jsonAtividades.length; j++) {
				
				
				// todo: testes retirar
				//var Print = "Dados do JSON\r\n";
				//Print += "\tJSON " + j + "\r\n";
				//Print += "\tID: " + jsonAtividades[j].id + "\r\n";
				//Print += "\tTítulo: " + jsonAtividades[j].title + "\r\n";
				//console.log(Print);
				// testes retirar
				
				encontrou = false;
				insercaoForcada = false;
				/*
				for (var i = 0; i < FREQUENCIA.listaFrequencia.length; i++) {
					if (FREQUENCIA.listaFrequencia[i].id == ATIVIDADE.listaAtividades[jsonAtividades[j].id].id) {
						// Atividade já está presente na lista
						encontrou = true;
						break;
					}
				}
				*/
				for (var i = 0; i < FREQUENCIA.listaFrequenciasCidadaos.length; i++) {
					//console.log("i = " + i);
					for (var k = 0; k < FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias.length; k++) {
						//console.log("k = " + k);
						if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[k].atividade_id == ATIVIDADE.listaAtividades[jsonAtividades[j].id].id) {
							// Atividade já está presente na lista
							//console.log("Encontrou");
							
							if (ATIVIDADE.listaAtividades[jsonAtividades[j].id].tipo_atuacao_id == FREQUENCIA.listaAtuacao_NomeVersusID["Todas"]) {
								// A atividade encontrada é uma atividade para todos os tipos de atuação (Saúde, Trabalho e Social), então é necessário verificar se há frequência
								// na lista para cada atuação, caso contrário deve criar as frequências faltantes
								// Deixa inserir e trata na montagem do HTML
								FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[k].descricao = ATIVIDADE.listaAtividades[jsonAtividades[j].id].ponto_servico_nome + " - " + ATIVIDADE.listaAtividades[jsonAtividades[j].id].descricao;
								insercaoForcada = true;
								//console.log("Inserção forçada");
//								break;
							}
							else {
								//console.log("Encontrou e não é Todas");
								encontrou = true;
								indiceAuxiliar = k;
								break;
							}
						}
					}
					if (encontrou || insercaoForcada) {
						//console.log("Encontrou ou é Forçada");
						break;
					}
				}
				if (encontrou) {
					//console.log("Encontrou e copia descrição");
					// Preenche a descrição da frequência que já está na lista
					FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[indiceAuxiliar].descricao = ATIVIDADE.listaAtividades[jsonAtividades[j].id].ponto_servico_nome + " - " + ATIVIDADE.listaAtividades[jsonAtividades[j].id].descricao;
					continue;
				}
				
				// Não encontrou, adiciona na lista
				for (var i = 0; i < ATIVIDADE.listaAtividades.length; i++) {
					if (jsonAtividades[j].id == i/*ATIVIDADE.listaAtividades[i].id*/) {
						
						console.log("Adiciona na lista");
						
						// Monta dados da frequencia
						var dt = new FREQUENCIA.tFrequencia();
						dt.id = null;
						dt.atividade_id = ATIVIDADE.listaAtividades[i].id;
						dt.tipo_atuacao_id = ATIVIDADE.listaAtividades[i].tipo_atuacao_id;
						dt.usuario_id = USUARIO.usuario_id;
						dt.data_frequencia = null;
						dt.frequencia = null;
						dt.justificativa = null;
						dt.frequencia_livre = null;
						dt.dt_criacao = null;
						dt.descricao = ATIVIDADE.listaAtividades[i].ponto_servico_nome + " - " + ATIVIDADE.listaAtividades[i].descricao;
						
						// Procura pelo cidadão na lista de atividades por cidadãos
						encontrou = false;
						for (var k = 0; k < FREQUENCIA.listaFrequenciasCidadaos.length; k++) {
							//if (FREQUENCIA.listaFrequenciasCidadaos[k].cidadao_id == CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id) {
							if (FREQUENCIA.listaFrequenciasCidadaos[k].cidadao_id == (FREQUENCIA.cidadao_id == null ? CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id : FREQUENCIA.cidadao_id)) {
								// encontrou o cidadão, insere na lista
								encontrou = true;
								console.log("Encontrou cidadão");
								FREQUENCIA.listaFrequenciasCidadaos[k].listaFrequencias.push(dt);
							}
						}
						if (encontrou) {
							continue;
						}
						
						// Não encontrou o cidadão, cria lista para o cidadão
						console.log("Não encontrou cidadão");
						var v = new FREQUENCIA.frequenciasCidadao();
						v.listaFrequencias = [];
						
						//v.cidadao_id = CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id;
						v.cidadao_id = FREQUENCIA.cidadao_id == null ? CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id : FREQUENCIA.cidadao_id;

						var dadosCidadao = null;
						v.cidadao_nome = "";
						if ((dadosCidadao = CIDADAO.dadosCidadaoID(v.cidadao_id)) != null) {
							v.cidadao_nome = dadosCidadao.nome;
							v.cidadao_nome_social = dadosCidadao.nome_social;
						}
						
						v.listaFrequencias.push(dt);
						FREQUENCIA.listaFrequenciasCidadaos.push(v);
						
						/*
						// Encontrou a atividade, insere na lita de frequencias
						var dt = {
							id: null,
							cidadao_id: CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id,
							atividade_id: ATIVIDADE.listaAtividades[i].id,
							tipo_atuacao_id: ATIVIDADE.listaAtividades[i].tipo_atuacao_id,
							usuario_id: USUARIO.usuario_id,
							data_frequencia: null,
							frequencia: null,
							justificativa: null,
							frequencia_livre: null,
							dt_criacao: null,
						};
						FREQUENCIA.listaFrequencia.push(dt);
						*/
						break;
					}
				}
			}
		}
		
		// Há mais cidadãos na lista do usuário
		if ((FREQUENCIA.cidadao_id == null) && (++FREQUENCIA.auxCounter < CIDADAO.listaCidadaosDados.length)) {
			console.log("Usuário: " + (FREQUENCIA.auxCounter));
			FREQUENCIA.obtemListaAtividades();
		}
		else {
			// todo: testes retirar
			var Print = "Total de frequência: " + "" + "\r\n";
			for (var i = 0; i < FREQUENCIA.listaFrequenciasCidadaos.length; i++)
			{
				Print += "Cidadão: " + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_nome + "(" + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_id + ")\r\n";
				for (var j = 0; j < FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias.length; j++) {
					Print += "\tFrequência " + i + ":\r\n";
					Print += "\tid: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].id + "\r\n";
					Print += "\tcidadao_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_id + "\r\n";
					Print += "\tatividade_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].atividade_id + "\r\n";
					Print += "\ttipo_atuacao_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].tipo_atuacao_id + "\r\n";
					Print += "\tusuario_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].usuario_id + "\r\n";
					Print += "\tdata_frequencia: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].data_frequencia + "\r\n";
					Print += "\tfrequencia: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].frequencia + "\r\n";
					Print += "\tjustificativa: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].justificativa + "\r\n";
					Print += "\tfrequencia_livre: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].frequencia_livre + "\r\n";
					Print += "\tdt_criacao: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].dt_criacao + "\r\n";
				}
			}
			console.log(Print);
			// testes retirar

			// Monta a tela
			FREQUENCIA.montaFrequencia();
		}
	},

	montaFrequencia: function () {
		console.log("montaFrequencia");
		
		// Cria um item em FREQUENCIA.listaFrequenciasCidadaos, sem listaFrequencias, para cidadaos que não têm frequência ou atividade na data selecionada, para criação da frequência livre
		var encontrou;
		var tamanhoListaFrequenciasCidadaos = FREQUENCIA.listaFrequenciasCidadaos.length;
		var v = null;
		if (FREQUENCIA.cidadao_id == null) {
			// Não é frequência para um cidadão selecionado na lista, ou seja, é um usuário técnico
			for (var i = 0; i < CIDADAO.listaCidadaosDados.length; i++) {
				encontrou = false;
				for (var j = 0; j < tamanhoListaFrequenciasCidadaos; j++)
				{
					if (CIDADAO.listaCidadaosDados[i].id == FREQUENCIA.listaFrequenciasCidadaos[j].cidadao_id) {
						encontrou = true;
						break;
					}
				}
				if (encontrou == false) {
					// Não encontrou, cria um item
					v = new FREQUENCIA.frequenciasCidadao();
					v.listaFrequencias = [];
					v.cidadao_id = CIDADAO.listaCidadaosDados[i].id;
					v.cidadao_nome = CIDADAO.listaCidadaosDados[i].nome;
					v.cidadao_nome_social = CIDADAO.listaCidadaosDados[i].nome_social;
					v.frequencia_livre = null;
					FREQUENCIA.listaFrequenciasCidadaos.push(v);
				}
			}
		}
		else {
			// Frequência para um cidadão selecionado na lista
			if (tamanhoListaFrequenciasCidadaos == 0) {
				// Cria uma frequência livre
				v = new FREQUENCIA.frequenciasCidadao();
				v.listaFrequencias = [];
				v.cidadao_id = FREQUENCIA.cidadao_id;
				var dadosCidadao = null;
				v.cidadao_nome = "";
				if ((dadosCidadao = CIDADAO.dadosCidadaoID(v.cidadao_id)) != null) {
					v.cidadao_nome = dadosCidadao.nome;
					v.cidadao_nome_social = dadosCidadao.nome_social;
				}
				v.frequencia_livre = null;
				FREQUENCIA.listaFrequenciasCidadaos.push(v);
			}
		}
		
		// Percorre a lista de frequencias, cria HTML e insere

		// Cria a frequência livre na primeira posição da lista de frequências para cada cidadão
		
		var htmlFrequencia = "";
		var htmlFrequenciasSaude = "";
		var htmlFrequenciasTrabalho = "";
		var htmlFrequenciasSocial = "";
		var lIndiceFrequenciaLivreSaude;
		var lIndiceFrequenciaLivreTrabalho;
		var lIndiceFrequenciaLivreSocial;
		var lCidadao = null;
		var selectedNI;
		var selectedSim;
		var selectedNao;
		var observacoes;
		var nomeRadio;
		var nomeObs;
		var showObservacoes;
		for (var i = 0; i < FREQUENCIA.listaFrequenciasCidadaos.length; i++)
		{
//			if (lCidadao != FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_id) {
				// Primeira iteração de um cidadão

				// Insere dados do cidadão
				htmlFrequencia = "<div class='divnome'>" + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_nome + "</div><div class='divnomesocial'>" + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_nome_social + "</div>";
				htmlFrequenciasSaude += htmlFrequencia;
				htmlFrequenciasTrabalho += htmlFrequencia;
				htmlFrequenciasSocial += htmlFrequencia;
				
				// Processa frequência livre (saúde, trabalho e social)
				if ((lIndiceFrequenciaLivreSaude = FREQUENCIA.listaFrequenciasCidadaos[i].indice_frequencia_livre_Saude) != null) {
					// Existe registro de frequência livre, deve aparecer no início da lista de frequências do cidadão
					if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[lIndiceFrequenciaLivreSaude].frequencia == 0) {
						selectedNao = " checked";
						selectedSim = selectedNI = "";
						showObservacoes = true;
					}
					else if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[lIndiceFrequenciaLivreSaude].frequencia == 1) {
						selectedSim = " checked";
						selectedNao = selectedNI = "";
						showObservacoes = false;
					}
					else {
						selectedNI = " checked";
						selectedNao = selectedSim = "";
						showObservacoes = false;
					}
					observacoes = FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[lIndiceFrequenciaLivreSaude].justificativa;
				}
				else {
					selectedNI = " checked";
					selectedNao = selectedSim = "";
					observacoes = "";
					showObservacoes = false;
				}
				nomeRadio = "radioFrequencias_Livre_Saude_" + i;
				nomeObs = "observacao_Livre_Saude_" + i;
				htmlFrequencia = "<div class='divFrequenciaLivre'>" + 
									  "<p class='atividadeFreq'><img src='img/icoSetaIn.png'>FREQUÊNCIA LIVRE</p>" +  
									  "<div class='linhaForm' id='divFrequencias'>" + 
										"<div class='radioFrequencias radioButton'>" + 
										  "<input type='radio' name='" + nomeRadio + "' value='Não Informado' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNI + ">" + 
										  "<p>Não Informado</p>" + 
										  "<input type='radio' name='" + nomeRadio + "' value='Não' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNao + ">" + 
										  "<p>Não</p>" + 
										  "<input type='radio' name='" + nomeRadio + "' value='Sim' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedSim + ">" + 
										  "<p>Sim</p>" + 
										  "<input type='button' id='btnSalvar' onclick='validaCamposFrequencia(" + i + ", " + (lIndiceFrequenciaLivreSaude >= 0 ? lIndiceFrequenciaLivreSaude : null) + ", \"" + nomeRadio + "\", \"" + nomeObs + "\", " + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_id + ", " + FREQUENCIA.listaAtuacao_NomeVersusID["Saúde"] + ");' value='Salvar' class='btnSalvar'>" + 
										"</div>" + 
									  "</div>" + 
									  "<textarea placeholder='Observações' id='" + nomeObs + "' class='inputGrande inputFrequenciaLivre'" + (showObservacoes ? "" : " style='display:none'") + ">" + observacoes + "</textarea>" + 
									"</div>";
				htmlFrequenciasSaude += htmlFrequencia;

				if ((lIndiceFrequenciaLivreTrabalho = FREQUENCIA.listaFrequenciasCidadaos[i].indice_frequencia_livre_Trabalho) != null) {
					// Existe registro de frequência livre, deve aparecer no início da lista de frequências do cidadão
					if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[lIndiceFrequenciaLivreTrabalho].frequencia == 0) {
						selectedNao = " checked";
						selectedSim = selectedNI = "";
						showObservacoes = true;
					}
					else if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[lIndiceFrequenciaLivreTrabalho].frequencia == 1) {
						selectedSim = " checked";
						selectedNao = selectedNI = "";
						showObservacoes = false;
					}
					else {
						selectedNI = " checked";
						selectedNao = selectedSim = "";
						showObservacoes = false;
					}
					observacoes = FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[lIndiceFrequenciaLivreTrabalho].justificativa;
				}
				else {
					selectedNI = " checked";
					selectedNao = selectedSim = "";
					observacoes = "";
					showObservacoes = false;
				}
				nomeRadio = "radioFrequencias_Livre_Trabalho_" + i;
				nomeObs = "observacao_Livre_Trabalho_" + i;
				htmlFrequencia = "<div class='divFrequenciaLivre'>" + 
									  "<p class='atividadeFreq'><img src='img/icoSetaIn.png'>FREQUÊNCIA LIVRE</p>" +  
									  "<div class='linhaForm' id='divFrequencias'>" + 
										"<div class='radioFrequencias radioButton'>" + 
										  "<input type='radio' name='" + nomeRadio + "' value='Não Informado' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNI + ">" + 
										  "<p>Não Informado</p>" + 
										  "<input type='radio' name='" + nomeRadio + "' value='Não' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNao + ">" + 
										  "<p>Não</p>" + 
										  "<input type='radio' name='" + nomeRadio + "' value='Sim' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedSim + ">" + 
										  "<p>Sim</p>" + 
										  "<input type='button' id='btnSalvar' onclick='validaCamposFrequencia(" + i + ", " + (lIndiceFrequenciaLivreTrabalho >= 0 ? lIndiceFrequenciaLivreTrabalho : null) + ", \"" + nomeRadio + "\", \"" + nomeObs + "\", " + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_id + ", " + FREQUENCIA.listaAtuacao_NomeVersusID["Trabalho"] + ");' value='Salvar' class='btnSalvar'>" + 
										"</div>" + 
									  "</div>" + 
									  "<textarea placeholder='Observações' id='" + nomeObs + "' class='inputGrande inputFrequenciaLivre'" + (showObservacoes ? "" : " style='display:none'") + ">" + observacoes + "</textarea>" + 
									"</div>";
				htmlFrequenciasTrabalho += htmlFrequencia;

				if ((lIndiceFrequenciaLivreSocial = FREQUENCIA.listaFrequenciasCidadaos[i].indice_frequencia_livre_Social) != null) {
					// Existe registro de frequência livre, deve aparecer no início da lista de frequências do cidadão
					if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[lIndiceFrequenciaLivreSocial].frequencia == 0) {
						selectedNao = " checked";
						selectedSim = selectedNI = "";
						showObservacoes = true;
					}
					else if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[lIndiceFrequenciaLivreSocial].frequencia == 1) {
						selectedSim = " checked";
						selectedNao = selectedNI = "";
						showObservacoes = false;
					}
					else {
						selectedNI = " checked";
						selectedNao = selectedSim = "";
						showObservacoes = false;
					}
					observacoes = FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[lIndiceFrequenciaLivreSocial].justificativa;
				}
				else {
					selectedNI = " checked";
					selectedNao = selectedSim = "";
					observacoes = "";
					showObservacoes = false;
				}
				nomeRadio = "radioFrequencias_Livre_Social_" + i;
				nomeObs = "observacao_Livre_Social_" + i;
				htmlFrequencia = "<div class='divFrequenciaLivre'>" + 
									  "<p class='atividadeFreq'><img src='img/icoSetaIn.png'>FREQUÊNCIA LIVRE</p>" +  
									  "<div class='linhaForm' id='divFrequencias'>" + 
										"<div class='radioFrequencias radioButton'>" + 
										  "<input type='radio' name='" + nomeRadio + "' value='Não Informado' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNI + ">" + 
										  "<p>Não Informado</p>" + 
										  "<input type='radio' name='" + nomeRadio + "' value='Não' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNao + ">" + 
										  "<p>Não</p>" + 
										  "<input type='radio' name='" + nomeRadio + "' value='Sim' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedSim + ">" + 
										  "<p>Sim</p>" + 
										  "<input type='button' id='btnSalvar' onclick='validaCamposFrequencia(" + i + ", " + (lIndiceFrequenciaLivreSocial >= 0 ? lIndiceFrequenciaLivreSocial : null) + ", \"" + nomeRadio + "\", \"" + nomeObs + "\", " + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_id + ", " + FREQUENCIA.listaAtuacao_NomeVersusID["Social"] + ");' value='Salvar' class='btnSalvar'>" + 
										"</div>" + 
									  "</div>" + 
									  "<textarea placeholder='Observações' id='" + nomeObs + "' class='inputGrande inputFrequenciaLivre'" + (showObservacoes ? "" : " style='display:none'") + ">" + observacoes + "</textarea>" + 
									"</div>";
				htmlFrequenciasSocial += htmlFrequencia;
//			}
			for (var j = 0; j < FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias.length; j++) {
				if (j == lIndiceFrequenciaLivreSaude || j == lIndiceFrequenciaLivreTrabalho || j == lIndiceFrequenciaLivreSocial) {
					// O índice é o índice da frequência livre já processada, continua
					continue;
				}
				if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].frequencia == 0) {
					selectedNao = " checked";
					selectedSim = selectedNI = "";
					showObservacoes = true;
				}
				else if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].frequencia == 1) {
					selectedSim = " checked";
					selectedNao = selectedNI = "";
					showObservacoes = false;
				}
				else {
					selectedNI = " checked";
					selectedNao = selectedSim = "";
					showObservacoes = false;
				}
				observacoes = FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].justificativa;
				
				var freqSaude = true;
				var freqTrabalho = true;
				var freqSocial = true;
				if (FREQUENCIA.listaIDVersusAtuacao_Nome[FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].tipo_atuacao_id] == "Todas") {
					// Avalia se deve criar frequências para todas as atuações
					for (var k = 0; k < FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias.length; k++) {
						if (k != j && FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[k].atividade_id == FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].atividade_id) {
							if (FREQUENCIA.listaIDVersusAtuacao_Nome[FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[k].tipo_atuacao_id] == "Saúde") {
								freqSaude = false;
							}
							else if (FREQUENCIA.listaIDVersusAtuacao_Nome[FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[k].tipo_atuacao_id] == "Trabalho") {
								freqTrabalho = false;
							}
							else if (FREQUENCIA.listaIDVersusAtuacao_Nome[FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[k].tipo_atuacao_id] == "Social") {
								freqSocial = false;
							}
						}
					}
					
					// Cria uma frequência para cada aba (saúde, trabalho e social), se necessário
					if (freqSaude) {
						nomeRadio = "radioFrequencias_Saude" + i + j;
						nomeObs = "observacao_Saude" + i + j;
						
						htmlFrequencia = "<div class='divFrequencia'>" + 
											  "<p class='atividadeFreq'><img src='img/icoSetaIn.png'>" + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].descricao + "</p>" +  
											  "<div class='linhaForm' id='divFrequencias'>" + 
												"<div class='radioFrequencias radioButton'>" + 
												  "<input type='radio' name='" + nomeRadio + "' value='Não Informado' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNI + ">" + 
												  "<p>Não Informado</p>" + 
												  "<input type='radio' name='" + nomeRadio + "' value='Não' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNao + ">" + 
												  "<p>Não</p>" + 
												  "<input type='radio' name='" + nomeRadio + "' value='Sim' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedSim + ">" + 
												  "<p>Sim</p>" + 
												  "<input type='button' id='btnSalvar' onclick='validaCamposFrequencia(" + i + ", " + j + ", \"" + nomeRadio + "\", \"" + nomeObs + "\", " + null + ", " + FREQUENCIA.listaAtuacao_NomeVersusID["Saúde"] + ");' value='Salvar' class='btnSalvar'>" + 
												"</div>" + 
											  "</div>" + 
											  "<textarea placeholder='Observações' id='" + nomeObs + "' class='inputGrande inputFrequenciaLivre'" + (showObservacoes ? "" : " style='display:none'") + ">" + observacoes + "</textarea>" + 
											"</div>";
						htmlFrequenciasSaude += htmlFrequencia;
					}
					
					if (freqTrabalho) {
						nomeRadio = "radioFrequencias_Trabalho" + i + j;
						nomeObs = "observacao_Trabalho" + i + j;
						
						htmlFrequencia = "<div class='divFrequencia'>" + 
											  "<p class='atividadeFreq'><img src='img/icoSetaIn.png'>" + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].descricao + "</p>" +  
											  "<div class='linhaForm' id='divFrequencias'>" + 
												"<div class='radioFrequencias radioButton'>" + 
												  "<input type='radio' name='" + nomeRadio + "' value='Não Informado' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNI + ">" + 
												  "<p>Não Informado</p>" + 
												  "<input type='radio' name='" + nomeRadio + "' value='Não' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNao + ">" + 
												  "<p>Não</p>" + 
												  "<input type='radio' name='" + nomeRadio + "' value='Sim' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedSim + ">" + 
												  "<p>Sim</p>" + 
												  "<input type='button' id='btnSalvar' onclick='validaCamposFrequencia(" + i + ", " + j + ", \"" + nomeRadio + "\", \"" + nomeObs + "\", " + null + ", " + FREQUENCIA.listaAtuacao_NomeVersusID["Trabalho"] + ");' value='Salvar' class='btnSalvar'>" + 
												"</div>" + 
											  "</div>" + 
											  "<textarea placeholder='Observações' id='" + nomeObs + "' class='inputGrande inputFrequenciaLivre'" + (showObservacoes ? "" : " style='display:none'") + ">" + observacoes + "</textarea>" + 
											"</div>";
						htmlFrequenciasTrabalho += htmlFrequencia;
					}
					
					if (freqSocial) {
						nomeRadio = "radioFrequencias_Social" + i + j;
						nomeObs = "observacao_Social" + i + j;
						
						htmlFrequencia = "<div class='divFrequencia'>" + 
											  "<p class='atividadeFreq'><img src='img/icoSetaIn.png'>" + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].descricao + "</p>" +  
											  "<div class='linhaForm' id='divFrequencias'>" + 
												"<div class='radioFrequencias radioButton'>" + 
												  "<input type='radio' name='" + nomeRadio + "' value='Não Informado' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNI + ">" + 
												  "<p>Não Informado</p>" + 
												  "<input type='radio' name='" + nomeRadio + "' value='Não' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNao + ">" + 
												  "<p>Não</p>" + 
												  "<input type='radio' name='" + nomeRadio + "' value='Sim' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedSim + ">" + 
												  "<p>Sim</p>" + 
												  "<input type='button' id='btnSalvar' onclick='validaCamposFrequencia(" + i + ", " + j + ", \"" + nomeRadio + "\", \"" + nomeObs + "\", " + null + ", " + FREQUENCIA.listaAtuacao_NomeVersusID["Social"] + ");' value='Salvar' class='btnSalvar'>" + 
												"</div>" + 
											  "</div>" + 
											  "<textarea placeholder='Observações' id='" + nomeObs + "' class='inputGrande inputFrequenciaLivre'" + (showObservacoes ? "" : " style='display:none'") + ">" + observacoes + "</textarea>" + 
											"</div>";
						htmlFrequenciasSocial += htmlFrequencia;
					}
				}
				else {
					var strAtuacaoNome = FREQUENCIA.listaIDVersusAtuacao_Nome[FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].tipo_atuacao_id];
					nomeRadio = "radioFrequencias_" + strAtuacaoNome + i + j;
					nomeObs = "observacao_" + strAtuacaoNome + i + j;
					
					htmlFrequencia = "<div class='divFrequencia'>" + 
										  "<p class='atividadeFreq'><img src='img/icoSetaIn.png'>" + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].descricao + "</p>" +  
										  "<div class='linhaForm' id='divFrequencias'>" + 
											"<div class='radioFrequencias radioButton'>" + 
											  "<input type='radio' name='" + nomeRadio + "' value='Não Informado' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNI + ">" + 
											  "<p>Não Informado</p>" + 
											  "<input type='radio' name='" + nomeRadio + "' value='Não' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedNao + ">" + 
											  "<p>Não</p>" + 
											  "<input type='radio' name='" + nomeRadio + "' value='Sim' class='radio' onchange='radioFrequencia(\"" + nomeObs + "\", \"" + nomeRadio + "\")'" + selectedSim + ">" + 
											  "<p>Sim</p>" + 
											  "<input type='button' id='btnSalvar' onclick='validaCamposFrequencia(" + i + ", " + j + ", \"" + nomeRadio + "\", \"" + nomeObs + "\", " + null + ", " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].tipo_atuacao_id + ");' value='Salvar' class='btnSalvar'>" + 
											"</div>" + 
										  "</div>" + 
										  "<textarea placeholder='Observações' id='" + nomeObs + "' class='inputGrande inputFrequenciaLivre'" + (showObservacoes ? "" : " style='display:none'") + ">" + observacoes + "</textarea>" + 
										"</div>";
					if (strAtuacaoNome == "Saúde") {
						htmlFrequenciasSaude += htmlFrequencia;
					}
					else if (strAtuacaoNome == "Trabalho") {
						htmlFrequenciasTrabalho += htmlFrequencia;
					}
					else if (strAtuacaoNome == "Social") {
						htmlFrequenciasSocial += htmlFrequencia;
					}
				}
			}
		}
		
		// todo: testes retirar
		console.log("Frequências Saúde: \r\n" + htmlFrequenciasSaude);
		console.log("Frequências Trabalho: \r\n" + htmlFrequenciasTrabalho);
		console.log("Frequências Social: \r\n" + htmlFrequenciasSocial);
		// testes retirar
		
		/*
		$("#idDivFreqCidadaoSaude").empty();
		$("#idDivFreqCidadaoSaude").append(htmlFrequenciasSaude);
		$("#idDivFreqCidadaoTrabalho").empty();
		$("#idDivFreqCidadaoTrabalho").append(htmlFrequenciasTrabalho);
		$("#idDivFreqCidadaoSocial").empty();
		$("#idDivFreqCidadaoSocial").append(htmlFrequenciasSocial);
		*/
		$("#idDivFreqCidadaoSaude").attr('style','display:none');
		$("#idDivFreqCidadaoTrabalho").attr('style','display:none');
		$("#idDivFreqCidadaoSocial").attr('style','display:none');
		var htmlAbasFrequencia = "";
		for (var i = 0; i < FREQUENCIA.abas.length; i++) {
			switch (FREQUENCIA.abas[i]) {
				case "Saúde":
					$("#idDivFreqCidadaoSaude").empty();
					$("#idDivFreqCidadaoSaude").append(htmlFrequenciasSaude);
					$("#idDivFreqCidadaoSaude").attr('style','display:block');
					htmlAbasFrequencia += "<li><a href='#freq_abas-saude'>Saúde</a></li>";
					break;
				case "Trabalho":
					$("#idDivFreqCidadaoTrabalho").empty();
					$("#idDivFreqCidadaoTrabalho").append(htmlFrequenciasTrabalho);
					$("#idDivFreqCidadaoTrabalho").attr('style','display:block');
					htmlAbasFrequencia += "<li><a href='#freq_abas-trabalho'>Trabalho</a></li>";
					break;
				case "Social":
					$("#idDivFreqCidadaoSocial").empty();
					$("#idDivFreqCidadaoSocial").append(htmlFrequenciasSocial);
					$("#idDivFreqCidadaoSocial").attr('style','display:block');
					htmlAbasFrequencia += "<li><a href='#freq_abas-social'>Social</a></li>";
					break;
			}
		}
		
		$("#freq_opcoes_abas").empty();
		$("#freq_opcoes_abas").append(htmlAbasFrequencia);
		// Efeito de abas do jquery
		$( "#freq_abas" ).tabs();
		aguardeMsgOff();
	},
	
	dadosEntradaFrequenciaFail: function (err) {
		console.log("dadosEntradaFrequenciaFail");
		
		// Retorna
		aguardeMsgOff();
		// todo: revisar
		alert("Houve falha na obtenção de informações de frequência.");
		
		FREQUENCIA.cbFail_f(err);
	},
	
    // ****************** Salva frequência *********************
    salvaFrequencia: function(indiceCidadao, indiceFrequencia, frequencia, justificativa, cidadao_id, tipo_atuacao_id, cbSuccess, cbFail) {
	    console.log("salvaFrequencia");
		
		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;

		if (indiceFrequencia != null) {
			FREQUENCIA.indiceFrequencia = indiceFrequencia;
			FREQUENCIA.indiceCidadao = indiceCidadao;
			FREQUENCIA.frequencia = frequencia;
			FREQUENCIA.justificativa = justificativa;
			FREQUENCIA.tipoAtuacaoID = tipo_atuacao_id;
			
			if (FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].id == null) {
				// Nova frequência, insere
				var hoje = new Date();
				var strHoje = hoje.getFullYear() + "-" + ((hoje.getMonth() + 1) > 9 ? (hoje.getMonth() + 1) : "0" + (hoje.getMonth() + 1)) + "-" + (hoje.getDate() > 9 ? hoje.getDate() : "0" + hoje.getDate());
				BANCODADOS.sqlCmdDB("INSERT INTO frequencia (cidadao_id, atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, frequencia_livre, status, dt_criacao) \
									VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
									[
									FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].cidadao_id,
									FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].atividade_id,
//									FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].tipo_atuacao_id,
									tipo_atuacao_id,
									FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].usuario_id,
									FREQUENCIA.auxData,
									FREQUENCIA.frequencia,
									FREQUENCIA.justificativa,
									FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].frequencia_livre,
									1,
									strHoje
									], 
									FREQUENCIA.salvaFrequenciaSuccess, 
									FREQUENCIA.salvaFrequenciaFail);
			}
			else {
				// Atualização de frequência, desabilita frequência (status = 0) e insere nova frequência
				BANCODADOS.sqlCmdDB("UPDATE frequencia SET status = ? WHERE id = ?",
									[0, 
									FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].id
									], 
									FREQUENCIA.insereNovaFrequencia, FREQUENCIA.salvaFrequenciaFail);
			}
		}
		else {
			// Nova frequência livre
			var hoje = new Date();
			var strHoje = hoje.getFullYear() + "-" + ((hoje.getMonth() + 1) > 9 ? (hoje.getMonth() + 1) : "0" + (hoje.getMonth() + 1)) + "-" + (hoje.getDate() > 9 ? hoje.getDate() : "0" + hoje.getDate());
			BANCODADOS.sqlCmdDB("INSERT INTO frequencia (cidadao_id, atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, frequencia_livre, status, dt_criacao) \
								VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
								[
								cidadao_id,
								"",
								tipo_atuacao_id,
								USUARIO.usuario_id,
								FREQUENCIA.auxData,
								frequencia,
								justificativa,
								1,
								1,
								strHoje
								], 
								FREQUENCIA.salvaFrequenciaSuccess, 
								FREQUENCIA.salvaFrequenciaFail);
		}
	},
	
	insereNovaFrequencia: function () {
		console.log("insereNovaFrequencia");

		// Insere nova frequencia
		var hoje = new Date();
		var strHoje = hoje.getFullYear() + "-" + ((hoje.getMonth() + 1) > 9 ? (hoje.getMonth() + 1) : "0" + (hoje.getMonth() + 1)) + "-" + (hoje.getDate() > 9 ? hoje.getDate() : "0" + hoje.getDate());
		BANCODADOS.sqlCmdDB("INSERT INTO frequencia (cidadao_id, atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, frequencia_livre, status, dt_criacao) \
							VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
							[
							FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].cidadao_id,
							FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].atividade_id,
//							FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].tipo_atuacao_id,
							FREQUENCIA.tipoAtuacaoID,
							FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].usuario_id,
							FREQUENCIA.auxData,
							FREQUENCIA.frequencia,
							FREQUENCIA.justificativa,
							FREQUENCIA.listaFrequenciasCidadaos[FREQUENCIA.indiceCidadao].listaFrequencias[FREQUENCIA.indiceFrequencia].frequencia_livre,
							1,
							strHoje
							], 
							FREQUENCIA.salvaFrequenciaSuccess, 
							FREQUENCIA.salvaFrequenciaFail);
	},
	
	salvaFrequenciaSuccess: function (trans, res) {
		console.log("salvaFrequenciaSuccess");
		
		// Retorna
		aguardeMsgOff();
		FREQUENCIA.cbSuccess_f();
	},
	
	salvaFrequenciaFail: function (err) {
		console.log("salvaFrequenciaFail");
		
		// Retorna
		aguardeMsgOff();
		FREQUENCIA.cbFail_f(err);
	},
}
