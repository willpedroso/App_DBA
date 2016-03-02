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
	indiceFrequencia: null,
	listaPontosServico: [],
	
	// ****************** FREQUENCIAS ***********************************
	listaFrequenciasCidadaos: [],
	
	tFrequencia: function () {
		id: null;
		cidadao_id: null;		// todo: talvez possa ser eliminada
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
	},
	// ****************** FREQUENCIAS ***********************************
	
	// ****************** Verifica entrada ******************************
	iniFrequencia: function (data, cbSuccess, cbFail) {
		console.log("iniFrequencia");

		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;
		FREQUENCIA.auxData = data;

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
			}
		}
		
		// todo: testes retirar
		var Print = "Tipos de Atuação - Nome Versus ID" + "\r\n";
		for (var i = 0; i < FREQUENCIA.listaTiposAtuacao.length; i++) {
			Print += "ID de " + FREQUENCIA.listaTiposAtuacao[i].nome + ": " + FREQUENCIA.listaAtuacao_NomeVersusID[FREQUENCIA.listaTiposAtuacao[i].nome] + "\r\n";
		}
		console.log (Print);
		// testes retirar

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
			
			var listaCidadaosFrequencia = "<li class='li-header'><div>Nome Completo</div><div>Nome Social</div><div>Local de Acolhida</div></li>";
			for (var i = 0; i < CIDADAO.listaCidadaosDados.length; i++) {
				var nomeAcolhida = "";
				for (var j = 0; j < FREQUENCIA.listaPontosServico.length; j++) {
					if (FREQUENCIA.listaPontosServico[j].id == CIDADAO.listaCidadaosDados[i].ponto_servico_id) {
						nomeAcolhida = FREQUENCIA.listaPontosServico[j].nome;
						break;
					}
				}				
				// todo: Monta a lista de cidadãos e insere no HTML
                listaCidadaosFrequencia += "<li><div onclick='FREQUENCIA.dadosEntrada(" + CIDADAO.listaCidadaosDados[i].id + ")';>" + CIDADAO.listaCidadaosDados[i].nome + "</div><div>" + CIDADAO.listaCidadaosDados[i].nome_social + "</div><div>" + nomeAcolhida + "</div></li>";
			}
			// todo: testes retirar
			console.log(listaCidadaosFrequencia);
			// testes retirar
			$("#ullistaFreqCidadaos").empty();
			$("#ullistaFreqCidadaos").append(listaCidadaosFrequencia);
		}
	},
	
    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao) {
	    console.log("dadosEntrada");

		FREQUENCIA.cidadao_id = null;
		
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
			v.cidadao_nome = "";			// todo: obter o nome

			// Inclui na lista de frequencia
			for (var i = 0; i < res.rows.length; i++) {
				dt = new FREQUENCIA.tFrequencia();
				dt.id = res.rows.item(i).id;
				dt.cidadao_id = res.rows.item(i).cidadao_id;		// todo: talvez possa ser eliminada
				dt.atividade_id = res.rows.item(i).atividade_id;
				dt.tipo_atuacao_id = res.rows.item(i).tipo_atuacao_id;
				dt.usuario_id = res.rows.item(i).usuario_id;
				dt.data_frequencia = res.rows.item(i).data_frequencia;
				dt.frequencia = res.rows.item(i).frequencia;
				dt.justificativa = res.rows.item(i).justificativa;
				dt.frequencia_livre = res.rows.item(i).frequencia_livre;
				dt.dt_criacao = res.rows.item(i).dt_criacao;
				if (lcidadao != res.rows.item(i).cidadao_id) {
					// Mudou o cidadão, salva na lista e cria outro objeto
					FREQUENCIA.listaFrequenciasCidadaos.push(v);
					v = new FREQUENCIA.frequenciasCidadao(); 
					v.listaFrequencias = [];
					v.cidadao_id = lcidadao = dt.cidadao_id;
					v.cidadao_nome = "";			// todo: obter o nome
				}
				v.listaFrequencias.push(dt);
			}
			FREQUENCIA.listaFrequenciasCidadaos.push(v);

			// todo: testes retirar
			var Print = "Frequências na tabela frequencia: \r\n";
			for (var i = 0; i < FREQUENCIA.listaFrequenciasCidadaos.length; i++)
			{
				Print += "Cidadão: " + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_nome + "(" + FREQUENCIA.listaFrequenciasCidadaos[i].cidadao_id + ")\r\n";
				for (var j = 0; j < FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias.length; j++) {
					Print += "\tFrequência " + i + ":\r\n";
					Print += "\tid: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].id + "\r\n";
					Print += "\tcidadao_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].cidadao_id + "\r\n";
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
		}

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
					for (var k = 0; k < FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias.length; k++) {
						if (FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[k].atividade_id == ATIVIDADE.listaAtividades[jsonAtividades[j].id].id) {
							// Atividade já está presente na lista
							encontrou = true;
							break;
						}
					}
				}
				if (encontrou) {
					continue;
				}
				
				// Não encontrou, adiciona na lista
				for (var i = 0; i < ATIVIDADE.listaAtividades.length; i++) {
					if (jsonAtividades[j].id == i/*ATIVIDADE.listaAtividades[i].id*/) {
						
						// Monta dados da frequencia
						var dt = new FREQUENCIA.tFrequencia();
						dt.id = null;
						dt.cidadao_id = CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id;		// todo: talvez possa ser eliminada
						dt.atividade_id = ATIVIDADE.listaAtividades[i].id;
						dt.tipo_atuacao_id = ATIVIDADE.listaAtividades[i].tipo_atuacao_id;
						dt.usuario_id = USUARIO.usuario_id;
						dt.data_frequencia = null;
						dt.frequencia = null;
						dt.justificativa = null;
						dt.frequencia_livre = null;
						dt.dt_criacao = null;
						
						// Procura pelo cidadão na lista de atividades por cidadãos
						encontrou = false;
						for (var k = 0; k < FREQUENCIA.listaFrequenciasCidadaos.length; k++) {
							if (FREQUENCIA.listaFrequenciasCidadaos[k].cidadao_id == CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id) {
								// encontrou o cidadão, insere na lista
								encontrou = true;
								FREQUENCIA.listaFrequenciasCidadaos[k].listaFrequencias.push(dt);
							}
						}
						if (encontrou) {
							continue;
						}
						
						// Não encontrou o cidadão, cria lista para o cidadão
						var v = new FREQUENCIA.frequenciasCidadao();
						v.listaFrequencias = [];
						v.cidadao_id = CIDADAO.listaCidadaosDados[FREQUENCIA.auxCounter].id;
						v.cidadao_nome = "";			// todo: obter o nome
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
		if ((FREQUENCIA.cidadao_id == null) && (FREQUENCIA.auxCounter < CIDADAO.listaCidadaosDados.length)) {
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
					Print += "\tcidadao_id: " + FREQUENCIA.listaFrequenciasCidadaos[i].listaFrequencias[j].cidadao_id + "\r\n";
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
		
		// todo: Percorre a lista de frequencias, cria HTML e insere
		/*
		for (var i = 0; i < FREQUENCIA.listaFrequencia.length; i++)
		{
                <div class="divFrequenciaLivre">
                  <p class="atividadeFreq"><img src="img/icoSetaIn.png">FREQUÊNCIA LIVRE</p>
                  <div class="linhaForm" id="divFrequencias">
                    <div class="radioFrequencias radioButton">
                      <input type="radio" name="radioFrequencias" value="Não Informado" class="radio" onchange="()">
                      <p>Não Informado</p>
                      <input type="radio" name="radioFrequencias" value="Não" class="radio" onchange="()">
                      <p>Não</p>
                      <input type="radio" name="radioFrequencias" value="Sim" class="radio" onchange="()">
                      <p>Sim</p>
                      <input type="button" id="btnSalvar" onclick="()" value="Salvar" class="btnSalvar disable" disabled="">
                    </div>
                  </div>
                  <textarea placeholder="Observações" name="justificativa_275" class="inputGrande inputFrequenciaLivre"></textarea>
                </div>

		}
		*/
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
    salvaFrequencia: function(indiceFrequencia, cbSuccess, cbFail) {
	    console.log("salvaFrequencia");

		// Salva funções de retorno
		FREQUENCIA.cbSuccess_f = cbSuccess;
		FREQUENCIA.cbFail_f = cbFail;

		FREQUENCIA.indiceFrequencia = indiceFrequencia;
		
		if (FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].id == null) {
			// Nova frequência, insere
			var hoje = new Date();
			var strHoje = hoje.getFullYear() + "-" + ((hoje.getMonth() + 1) > 9 ? (hoje.getMonth() + 1) : "0" + (hoje.getMonth() + 1)) + "-" + (hoje.getDate() > 9 ? hoje.getDate() : "0" + hoje.getDate());
			BANCODADOS.sqlCmdDB("INSERT INTO frequencia (cidadao_id, atividade_id, tipo_atuacao_id, usuario_id, data_frequencia, frequencia, justificativa, frequencia_livre, status, dt_criacao) \
								VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
								[
								FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].cidadao_id,
								FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].atividade_id,
								FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].tipo_atuacao_id,
								FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].usuario_id,
								strHoje,
								/* todo: frequencia */1,
								/* todo: justificativa */"",
								/* todo: frequencia_livre */0,
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
								FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].id
								], 
								FREQUENCIA.salvaPeriodicidade, FREQUENCIA.salvaFrequenciaFail);
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
							FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].cidadao_id,
							FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].atividade_id,
							FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].tipo_atuacao_id,
							FREQUENCIA.listaFrequencia[FREQUENCIA.indiceFrequencia].usuario_id,
							strHoje,
							/* todo: frequencia */1,
							/* todo: justificativa */"",
							/* todo: frequencia_livre */0,
							1,
							strHoje
							], 
							FREQUENCIA.salvaFrequenciaSuccess, 
							FREQUENCIA.salvaFrequenciaFail);
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
