var ATIVIDADE = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,

	// Dados armazenados
	cidadao_id: null,
	cidadao_nome: null,
	cidadao_nome_social: null,
	indexAtividade: null,
	editIndexAtividade: null,
	listaAtividades: [],
	listaTiposServico: [],
	listaPontosServico: [],
	listaTiposAtuacao: [],
	listaAtuacao_NomeVersusID: [],
	listaTiposPeriodicidade: [],
	listaTiposDiaSemana: [],
	atividadesCounter: 0,
	auxDados: null,
	diasSemanaCounter: 0,
	
	// Auxiliares
	servicoTipoAcolhida: null,
	tipoChamada: null,
	auxDate: null,
	auxAtividadeID: null,
	salvouAtividade: false,

    // ****************** Obtém os dados básicos *********************
	dadosBasicos: function () {
		console.log("dadosBasicos");
		
		// Verifica se os dados básicos já foram carregados anteriormente
		if (ATIVIDADE.listaTiposServico.length > 0) {
			// Não recarrega
			// Continua dados de entrada
			// Dados do cidadão
			BANCODADOS.sqlCmdDB("SELECT nome, nome_social FROM cidadao WHERE id = ?", [ATIVIDADE.cidadao_id], ATIVIDADE.dadosEntradaCidadaoSuccess, ATIVIDADE.dadosEntradaFail);		}
		else {
			// Tipos de serviço
			BANCODADOS.sqlCmdDB("SELECT id, nome, descricao, status, dt_criacao FROM tipo_servico WHERE status = 1", [], ATIVIDADE.dadosBasicosTipoServicoSuccess, ATIVIDADE.dadosEntradaFail);
		}
	},
	
	dadosBasicosTipoServicoSuccess: function (trans, res) {
		console.log("dadosBasicosTipoServicoSuccess");

		// Salva tipos de serviço
		while (ATIVIDADE.listaTiposServico.length > 0) {
			ATIVIDADE.listaTiposServico.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			var lts = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				descricao: res.rows.item(i).descricao,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaTiposServico.push(lts);
			
			// Salva Id do serviço do tipo "Acolhida"
			if (lts.nome == "Acolhida") {
				ATIVIDADE.servicoTipoAcolhida = lts.id;
			}
		}
		
		// todo: Testes retirar
		/*
		var Print = "Tipos de Serviço" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaTiposServico.length; i++) {
			Print += "TIPO DE SERVIÇO: " + i + "\r\n";
			Print += "Id: " + ATIVIDADE.listaTiposServico[i].id + "\r\n";
			Print += "Nome: " + ATIVIDADE.listaTiposServico[i].nome + "\r\n";
			Print += "Descrição: " + ATIVIDADE.listaTiposServico[i].descricao + "\r\n";
			Print += "Status: " + ATIVIDADE.listaTiposServico[i].status + "\r\n";
			Print += "Data de criação: " + ATIVIDADE.listaTiposServico[i].dt_criacao + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);
		*/
		// testes retirar

		// Pontos de serviço
		BANCODADOS.sqlCmdDB("SELECT id, tipo_servico_id, nome, descricao, status, dt_criacao FROM ponto_servico WHERE status = 1", [], ATIVIDADE.dadosBasicosPontoServicoSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
	dadosBasicosPontoServicoSuccess: function (trans, res) {
		console.log("dadosBasicosPontoServicoSuccess");

		// Salva pontos de serviço
		while (ATIVIDADE.listaPontosServico.length > 0) {
			ATIVIDADE.listaPontosServico.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			var lps = {
				id: res.rows.item(i).id,
				tipo_servico_id: res.rows.item(i).tipo_servico_id,
				nome: res.rows.item(i).nome,
				descricao: res.rows.item(i).descricao,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaPontosServico.push(lps);
		}
		
		// todo: Testes retirar
		/*
		var Print = "Pontos de Serviço" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaPontosServico.length; i++) {
			Print += "PONTO DE SERVIÇO: " + i + "\r\n";
			Print += "Id: " + ATIVIDADE.listaPontosServico[i].id + "\r\n";
			Print += "Tipo do ponto de serviço: " + ATIVIDADE.listaPontosServico[i].tipo_servico_id + "\r\n";
			Print += "Nome: " + ATIVIDADE.listaPontosServico[i].nome + "\r\n";
			Print += "Descrição: " + ATIVIDADE.listaPontosServico[i].descricao + "\r\n";
			Print += "Status: " + ATIVIDADE.listaPontosServico[i].status + "\r\n";
			Print += "Data de criação: " + ATIVIDADE.listaPontosServico[i].dt_criacao + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);
		*/
		// testes retirar

		// Tipos de atuação
		BD_DTO.tipo_atuacao_carrega(ATIVIDADE.dadosBasicosTipoAtuacaoSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
	dadosBasicosTipoAtuacaoSuccess: function (trans, res) {
		console.log("dadosBasicosTipoAtuacaoSuccess");

		// Salva tipos de atuação
		ATIVIDADE.listaTiposAtuacao = BD_DTO.tipo_atuacao_data;
		
		// todo: testes retirar
		/*
		var Print = "Tipos de Atuação" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaTiposAtuacao.length; i++) {
			Print += "TIPO DE ATUAÇÃO: " + i + "\r\n";
			Print += "Id: " + ATIVIDADE.listaTiposAtuacao[i].id + "\r\n";
			Print += "Nome: " + ATIVIDADE.listaTiposAtuacao[i].nome + "\r\n";
			Print += "Status: " + ATIVIDADE.listaTiposAtuacao[i].status + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);
		*/
		// testes retirar

		// Cria lista de nome x id para tipos de atuação
		for (var i = 0; i < ATIVIDADE.listaTiposAtuacao.length; i++) {
			if (ATIVIDADE.listaTiposAtuacao[i].status == 1) {
				ATIVIDADE.listaAtuacao_NomeVersusID[ATIVIDADE.listaTiposAtuacao[i].nome] = ATIVIDADE.listaTiposAtuacao[i].id;
			}
		}
		
		// todo: testes retirar
		/*
		var Print = "Tipos de Atuação - Nome Versus ID" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaTiposAtuacao.length; i++) {
			Print += "ID de " + ATIVIDADE.listaTiposAtuacao[i].nome + ": " + ATIVIDADE.listaAtuacao_NomeVersusID[ATIVIDADE.listaTiposAtuacao[i].nome] + "\r\n";
		}
		console.log (Print);
		*/
		// testes retirar

		// Tipos de periodicidade
		BANCODADOS.sqlCmdDB("SELECT id, nome, status, dt_criacao FROM tipo_periodicidade WHERE status = 1", [], ATIVIDADE.dadosBasicosTipoPeriodicidadeSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
	dadosBasicosTipoPeriodicidadeSuccess: function (trans, res) {
		console.log("dadosBasicosTipoPeriodicidadeSuccess");

		// Salva tipos de periodicidade
		while (ATIVIDADE.listaTiposPeriodicidade.length > 0) {
			ATIVIDADE.listaTiposPeriodicidade.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			var ltp = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaTiposPeriodicidade.push(ltp);
		}

		// todo: Testes retirar
		/*
		var Print = "Tipos de Periodicidade" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaTiposPeriodicidade.length; i++) {
			Print += "TIPO DE PERIODICIDADE: " + i + "\r\n";
			Print += "Id: " + ATIVIDADE.listaTiposPeriodicidade[i].id + "\r\n";
			Print += "Nome: " + ATIVIDADE.listaTiposPeriodicidade[i].nome + "\r\n";
			Print += "Status: " + ATIVIDADE.listaTiposPeriodicidade[i].status + "\r\n";
			Print += "Data de criação: " + ATIVIDADE.listaTiposPeriodicidade[i].dt_criacao + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);
		*/
		// testes retirar

		// Tipo de dias da semana
		BANCODADOS.sqlCmdDB("SELECT id, nome, nome_abreviado, status, dt_criacao FROM tipo_dias_semana WHERE status = 1", [], ATIVIDADE.dadosBasicosTipoDiaSemanaSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
	dadosBasicosTipoDiaSemanaSuccess: function (trans, res) {
		console.log("dadosBasicosTipoDiaSemanaSuccess");

		// Salva tipos de dia da semana
		while (ATIVIDADE.listaTiposDiaSemana.length > 0) {
			ATIVIDADE.listaTiposDiaSemana.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			var ltds = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				nome_abreviado: res.rows.item(i).nome_abreviado,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaTiposDiaSemana.push(ltds);
		}

		// todo: Testes retirar
		/*
		var Print = "Tipos de Dia da Semana" + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaTiposDiaSemana.length; i++) {
			Print += "TIPO DE DIA DA SEMANA: " + i + "\r\n";
			Print += "Id: " + ATIVIDADE.listaTiposDiaSemana[i].id + "\r\n";
			Print += "Nome: " + ATIVIDADE.listaTiposDiaSemana[i].nome + "\r\n";
			Print += "Nome abreviado: " + ATIVIDADE.listaTiposDiaSemana[i].nome_abreviado + "\r\n";
			Print += "Status: " + ATIVIDADE.listaTiposDiaSemana[i].status + "\r\n";
			Print += "Data de criação: " + ATIVIDADE.listaTiposDiaSemana[i].dt_criacao + "\r\n";
			Print += "\r\n";
		}
		console.log (Print);
		*/
		// testes retirar

		// Continua dados de entrada
		// Dados do cidadão
		BANCODADOS.sqlCmdDB("SELECT nome, nome_social FROM cidadao WHERE id = ?", [ATIVIDADE.cidadao_id], ATIVIDADE.dadosEntradaCidadaoSuccess, ATIVIDADE.dadosEntradaFail);
	},
	
    // ****************** Obtém os dados de entrada *********************
    dadosEntrada: function(cidadao_id, tipoChamada, cbSuccess, cbFail) {
	    console.log("dadosEntrada");
		
		// Salva funções de retorno
		ATIVIDADE.cbSuccess_f = cbSuccess;
		ATIVIDADE.cbFail_f = cbFail;
		
		ATIVIDADE.tipoChamada = tipoChamada;
		
		// Salva identificação do cidadão
		//ATIVIDADE.cidadao_id = CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].id;
		ATIVIDADE.cidadao_id = (cidadao_id == null ? CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].id : cidadao_id);
		
		// Desvia para carregar dados básicos
		ATIVIDADE.dadosBasicos();
	},

	dadosEntradaAtividadeSuccess: function(trans, res) {
	    console.log("dadosEntradaAtividadeSuccess");

		// Limpa a lista de atividades
		while (ATIVIDADE.listaAtividades.length > 0) {
			ATIVIDADE.listaAtividades.pop();
		}

		// Preenche a lista de atividades
		for (var i = 0; i < res.rows.length; i++) {

			var a = {
				id: res.rows.item(i).id,
				
				ponto_servico_id: res.rows.item(i).ponto_servico_id,
				ponto_servico_nome: null,
				ponto_servico_descricao: null,
				
				tipo_servico_id: null,
				tipo_servico_nome: null,
				tipo_servico_descricao: null,
				tipo_servico_status: null,
				tipo_servico_dt_criacao: null,
		
				tipo_atuacao_id: res.rows.item(i).tipo_atuacao_id,
				tipo_atuacao_nome: null,
				tipo_atuacao_status: null,
				tipo_atuacao_dt_criacao: null,
		
				periodicidade_id: null,
				
				periodicidade_tipo_id: null,
				periodicidade_tipo_nome: null,
				
				periodicidade_data_inicio: null,
				periodicidade_hora_inicio: null,
				periodicidade_data_termino: null,
				periodicidade_hora_termino: null,
				periodicidade_dia_inteiro: null,
				periodicidade_permanente: null,
				periodicidade_dia_ano_repetir: null,
				periodicidade_dia_mes_repetir: null,
				periodicidade_dia_semana_repetir: null,
				periodicidade_dt_criacao: null,
				periodicidade_status: null,
				
				periodicidade_tipo_ds: [],
				
				privada: res.rows.item(i).privada,
				descricao: res.rows.item(i).descricao,
				status: res.rows.item(i).status,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			ATIVIDADE.listaAtividades.push(a);
		}
		
		// todo: Testes retirar
		/*
		var AtividadesPrint = "Nome do Cidadão: " + ATIVIDADE.cidadao_nome + "\r\nNome Social do Cidadão: " + ATIVIDADE.cidadao_nome_social + "\r\n";
		for (var i = 0; i < ATIVIDADE.listaAtividades.length; i++) {
			AtividadesPrint += "ATIVIDADE " + i + "\r\n";
			AtividadesPrint += "Id da atividade: " + ATIVIDADE.listaAtividades[i].id + "\r\n";
			AtividadesPrint += "Id do ponto de serviço: " + ATIVIDADE.listaAtividades[i].ponto_servico_id + "\r\n";
			AtividadesPrint += "Id do tipo de atuação: " + ATIVIDADE.listaAtividades[i].tipo_atuacao_id + "\r\n";
			AtividadesPrint += "Privada: " + ATIVIDADE.listaAtividades[i].privada + "\r\n";
			AtividadesPrint += "Descrição: " + ATIVIDADE.listaAtividades[i].descricao + "\r\n";
			AtividadesPrint += "Status: " + ATIVIDADE.listaAtividades[i].status + "\r\n";
			AtividadesPrint += "Data de criação: " + ATIVIDADE.listaAtividades[i].dt_criacao + "\r\n";
			AtividadesPrint += "\r\n";
		}
		console.log (AtividadesPrint);
		*/
		// testes retirar
		
		if (ATIVIDADE.listaAtividades.length > 0) {
			// Precisa de todos os dados de todas as atividades antes de retornar
			ATIVIDADE.atividadesCounter = 0;
			ATIVIDADE.dadosAtividade(ATIVIDADE.atividadesCounter++);
		}
		else {
			// retorna
			ATIVIDADE.cbSuccess_f();
		}
	},
		
	dadosEntradaCidadaoSuccess: function(trans, res) {
	    console.log("dadosEntradaCidadaoSuccess");

		if (res.rows.length != 1) {
			ATIVIDADE.cbFail_f("O cidadão não foi localizado no banco de dados.");
		}
		else {
			var listaTipoAtuacaoIDBusca;
			ATIVIDADE.cidadao_nome = res.rows.item(0).nome;
			ATIVIDADE.cidadao_nome_social = res.rows.item(0).nome_social;
			
			// Seleção de tipo de atuação em função do perfil do usuário
			if (ATIVIDADE.tipoChamada == "ATIVIDADE") {
				// Obtém a lista de atividades para a tela de atividades
				// Obtém as atividades de todas as atuações e controla o acesso à elas pelo perfil, na apresentação
				listaTipoAtuacaoIDBusca = "";
			}
			else if (ATIVIDADE.tipoChamada == "FREQUENCIA") {
				// Obtém a lista de atividades para a tela de frequência
				listaTipoAtuacaoIDBusca = "AND (";
				if (USUARIO.perfil_tecnico == true) {
					// Perfil técnico: obtém as atividades da atuação do técnico (incluindo as acumuladas) e "Todas"
					var i = 0;
					var perfil = USUARIO.perfil_codigo;
					do {
						switch (perfil) {
						case "TSAU":
							listaTipoAtuacaoIDBusca += (i == 0 ? "tipo_atuacao_id = " : " OR tipo_atuacao_id = ") + ATIVIDADE.listaAtuacao_NomeVersusID["Saúde"] + " ";
							break;
						case "TTRA":
							listaTipoAtuacaoIDBusca += (i == 0 ? "tipo_atuacao_id = " : " OR tipo_atuacao_id = ") + ATIVIDADE.listaAtuacao_NomeVersusID["Trabalho"] + " ";
							break;
						case "TSOC":
							listaTipoAtuacaoIDBusca += (i == 0 ? "tipo_atuacao_id = " : " OR tipo_atuacao_id = ") + ATIVIDADE.listaAtuacao_NomeVersusID["Social"] + " ";
							break;
						}
					} while ((i < USUARIO.perfil_acumulado.length) && (perfil = USUARIO.perfil_acumulado[i++]) != null);
					listaTipoAtuacaoIDBusca += " OR tipo_atuacao_id = " + ATIVIDADE.listaAtuacao_NomeVersusID["Todas"] + " ";
					listaTipoAtuacaoIDBusca += ")";
				}
				else {
					// O usuário não possui perfil_tecnico
					listaTipoAtuacaoIDBusca += "tipo_atuacao_id = " + ATIVIDADE.listaAtuacao_NomeVersusID["Saúde"] + " ";
					listaTipoAtuacaoIDBusca += " OR tipo_atuacao_id = " + ATIVIDADE.listaAtuacao_NomeVersusID["Trabalho"] + " ";
					listaTipoAtuacaoIDBusca += " OR tipo_atuacao_id = " + ATIVIDADE.listaAtuacao_NomeVersusID["Social"] + " ";
					listaTipoAtuacaoIDBusca += " OR tipo_atuacao_id = " + ATIVIDADE.listaAtuacao_NomeVersusID["Todas"] + " ";
					listaTipoAtuacaoIDBusca += ")";
				}
			}
		
			// Atividades
			BANCODADOS.sqlCmdDB("SELECT id, ponto_servico_id, tipo_atuacao_id, privada, descricao, status, dt_criacao " +
								"FROM atividade " +
								"WHERE cidadao_id = ? AND (status = 1 OR status = 2) " +
								listaTipoAtuacaoIDBusca,
								[ATIVIDADE.cidadao_id], 
								ATIVIDADE.dadosEntradaAtividadeSuccess, 
								ATIVIDADE.dadosEntradaFail);
		}
	},
	
	dadosEntradaFail: function (error) {
	    console.log("dadosEntradaFail");

		ATIVIDADE.cbFail_f (error);
	},
	
	// ***********************************************************************
	// CALENDÁRIO DE ATIVIDADES
	// ***********************************************************************
	apresentaCalendario: function () {
		console.log("apresentaCalendario");
		
        $('#calendarioAtividades').fullCalendar({
            header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			//defaultDate: new Date().toISOString(),
			lang: 'pt-br',
			editable: false,
			events: function(start, end, timezone, callback) {
				// todo: testes retirar
				/*
				console.log("start: " + start + " - end: " + end + " - timezone: " + timezone + " - callback: " + callback);
				*/
				// testes retirar
				var js = [];
				js = ATIVIDADE.montaCalendario(start, end);
				callback(js);
			},
			eventClick: function(calEvent, jsEvent, view) {
				// todo: testes retirar
				/*
				console.log("fullCalendar/eventClick: atividade = " + calEvent.id);
				*/
				// testes retirar
				if (calEvent.privada == true) {
					// Não executa o click
					return;
				}
				ATIVIDADE.editIndexAtividade = calEvent.id;
				PageManager.loadTmpl('div_atividades_add');
				//preparaListasOpt();
			},
			eventLimit: true
        });
	},
	
	montaCalendario: function (lstart, lend) {
		console.log("montaCalendario");
		
		// todo: testes retirar
		/*
		console.log("\r\nSTART = " + lstart + " - END = " + lend + "\r\n");
		*/
		// testes retirar
		
		// Monta json para o fullcalendar
		var hoje = new Date();
		var jsonFullCalendar = [];
		var color;
		var title;
		var restrita;
		var id;
		var start;
		var end;
		
		for (var i = 0; i < ATIVIDADE.listaAtividades.length; i++) {
			// todo: testes retirar
			/*
			console.log("Atividade " + i + " de " + ATIVIDADE.listaAtividades.length);
			*/
			// testes retirar
			id = i;
			
			color = '#e1e1e1';
			title = ATIVIDADE.listaAtividades[i].ponto_servico_nome + (ATIVIDADE.listaAtividades[i].descricao != "" ? " - " + ATIVIDADE.listaAtividades[i].descricao : "");
			
			// Prepara datas
			var dstart = lstart / 1000;
			var dend = lend / 1000;
		
			var data_inicio = Date.UTC(ATIVIDADE.listaAtividades[i].periodicidade_data_inicio.substring(0, 4), ATIVIDADE.listaAtividades[i].periodicidade_data_inicio.substring(5, 7) - 1, ATIVIDADE.listaAtividades[i].periodicidade_data_inicio.substring(8, 10)) / 1000;
			var data_termino;
			if (ATIVIDADE.listaAtividades[i].periodicidade_data_termino != null) {
				data_termino = Date.UTC(ATIVIDADE.listaAtividades[i].periodicidade_data_termino.substring(0, 4), ATIVIDADE.listaAtividades[i].periodicidade_data_termino.substring(5, 7) - 1, ATIVIDADE.listaAtividades[i].periodicidade_data_termino.substring(8, 10)) / 1000;;
			}
			else data_termino = 0;
			var diff;
			
			// Para controle de atividades privadas
			var acessoAtividade = true;
			if (USUARIO.perfil_tecnico == true && ATIVIDADE.listaAtividades[i].privada == 1) {
				acessoAtividade = false;
				color = '#FECB53';
				// Perfil técnico: avalia acesso às atividades privads
				var j = 0;
				var perfil = USUARIO.perfil_codigo;
				do {
					switch (perfil) {
					case "TSAU":
						if (ATIVIDADE.listaAtividades[i].tipo_atuacao_id == ATIVIDADE.listaAtuacao_NomeVersusID["Saúde"]) {
							acessoAtividade = true;
							color = '#e1e1e1';
						}
						break;
					case "TTRA":
						if (ATIVIDADE.listaAtividades[i].tipo_atuacao_id == ATIVIDADE.listaAtuacao_NomeVersusID["Trabalho"]) {
							acessoAtividade = true;
							color = '#e1e1e1';
						}
						break;
					case "TSOC":
						if (ATIVIDADE.listaAtividades[i].tipo_atuacao_id == ATIVIDADE.listaAtuacao_NomeVersusID["Social"]) {
							acessoAtividade = true;
							color = '#e1e1e1';
						}
						break;
					}
				} while ((j < USUARIO.perfil_acumulado.length) && (perfil = USUARIO.perfil_acumulado[j++]) != null);
			}					
			
			// Dados de acordo com a periodicidade
			switch (ATIVIDADE.listaAtividades[i].periodicidade_tipo_id) {
				case 1:			// Diário
					if (ATIVIDADE.listaAtividades[i].periodicidade_permanente == 0) {
						diff = Math.ceil((data_termino - data_inicio + 1) / (24*60*60));
					
						for (var j = 0; j < diff; j++) {
							if (data_inicio >= dstart && dend >= data_inicio) {
								var aux = new Date(data_inicio*1000);
								//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
								start = end = aux.getUTCFullYear() + "-" +
											  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
											  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
								
								// adiciona atividade
								var jfc = {
									title: acessoAtividade == true ? title : "PRIVADA",
									color: color,
									id: id,
									start: start,
									end: end,
									privada: acessoAtividade == false ? true : false,
								};
								jsonFullCalendar.push(jfc);
							}
							data_inicio += (24*60*60);
						}
					}
					else if (ATIVIDADE.listaAtividades[i].periodicidade_permanente == 1) {
						diff = Math.ceil((dend - dstart + 1) / (24*60*60));
						
						for (var j = 0; j < diff; j++) {
							if (dstart >= data_inicio && dend >= data_inicio) {
								var aux = new Date(dstart*1000);
								//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
								start = end = aux.getUTCFullYear() + "-" +
											  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
											  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
								
								// adiciona atividade
								var jfc = {
									title: acessoAtividade == true ? title : "PRIVADA",
									color: color,
									id: id,
									start: start,
									end: end,
									privada: acessoAtividade == false ? true : false,
								};
								jsonFullCalendar.push(jfc);
							}
							dstart += (24*60*60);
						}
					}
				break;
				
				case 2: 		// Semanal
					var diaSemanaCorrente;
					
					if (ATIVIDADE.listaAtividades[i].periodicidade_permanente == 0) {
						diff = Math.ceil((data_termino - data_inicio + 1) / (24*60*60));
					
						for (var j = 0; j < diff; j++) {
							if (data_inicio >= dstart && dend >= data_inicio) {

								diaSemanaCorrente = (new Date(data_inicio*1000)).getDay()+1;
								if (ATIVIDADE.listaAtividades[i].periodicidade_tipo_ds.indexOf(diaSemanaCorrente) != -1) {
									var aux = new Date(data_inicio*1000);
									//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
									start = end = aux.getUTCFullYear() + "-" +
												  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
												  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
									
									// adiciona atividade
									var jfc = {
										title: acessoAtividade == true ? title : "PRIVADA",
										color: color,
										id: id,
										start: start,
										end: end,
										privada: acessoAtividade == false ? true : false,
									};
									jsonFullCalendar.push(jfc);
								}
							}
							data_inicio += (24*60*60);
						}
					}
					else if (ATIVIDADE.listaAtividades[i].periodicidade_permanente == 1) {
						diff = Math.ceil((dend - dstart + 1) / (24*60*60));
						
						for (var j = 0; j < diff; j++) {
							if (dstart >= data_inicio && dend >= data_inicio) {
								
								diaSemanaCorrente = (new Date(data_inicio*1000)).getDay()+1;
								if (ATIVIDADE.listaAtividades[i].periodicidade_tipo_ds.indexOf(diaSemanaCorrente) != -1) {
									var aux = new Date(dstart*1000);
									//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
									start = end = aux.getUTCFullYear() + "-" +
												  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
												  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
									
									// adiciona atividade
									var jfc = {
										title: acessoAtividade == true ? title : "PRIVADA",
										color: color,
										id: id,
										start: start,
										end: end,
										privada: acessoAtividade == false ? true : false,
									};
									jsonFullCalendar.push(jfc);
								}
							}
							dstart += (24*60*60);
						}
					}
				break;
				
				case 3:			// Mensal
					if (ATIVIDADE.listaAtividades[i].periodicidade_permanente == 0) {
						diff = Math.ceil((data_termino - data_inicio + 1) / (24*60*60));
						
						for (var j = 0; j < diff; j++) {
							if (data_inicio >= dstart && dend >= data_inicio) {

								if (ATIVIDADE.listaAtividades[i].periodicidade_dia_mes_repetir != null && ATIVIDADE.listaAtividades[i].periodicidade_dia_mes_repetir != "") {
									var aux = new Date(data_inicio*1000);
									var diaMesCorrente = aux.getUTCDate();
									
									if (diaMesCorrente == ATIVIDADE.listaAtividades[i].periodicidade_dia_mes_repetir) {
										//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
										start = end = aux.getUTCFullYear() + "-" +
													  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
													  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
										
										// adiciona atividade
										var jfc = {
											title: acessoAtividade == true ? title : "PRIVADA",
											color: color,
											id: id,
											start: start,
											end: end,
											privada: acessoAtividade == false ? true : false,
										};
										jsonFullCalendar.push(jfc);
									}
								}
								else if (ATIVIDADE.listaAtividades[i].periodicidade_dia_semana_repetir != null && ATIVIDADE.listaAtividades[i].periodicidade_dia_semana_repetir != "") {
									var aux = new Date(data_inicio*1000);
									//var diaSemanaCorrente = (new Date(data_inicio*1000)).getDay()+1;
									var diaSemanaCorrente = aux.getUTCDay()+1;
									
									if (diaSemanaCorrente == ATIVIDADE.listaAtividades[i].periodicidade_dia_semana_repetir) {
										//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
										start = end = aux.getUTCFullYear() + "-" +
													  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
													  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
										
										// adiciona atividade
										var jfc = {
											title: acessoAtividade == true ? title : "PRIVADA",
											color: color,
											id: id,
											start: start,
											end: end,
											privada: acessoAtividade == false ? true : false,
										};
										jsonFullCalendar.push(jfc);
									}
								}
							}
							data_inicio += (24*60*60);
						}
					}
					else if (ATIVIDADE.listaAtividades[i].periodicidade_permanente == 1) {
						diff = Math.ceil((dend - dstart + 1) / (24*60*60));
					
						for (var j = 0; j < diff; j++) {

							if (ATIVIDADE.listaAtividades[i].periodicidade_dia_mes_repetir != null && ATIVIDADE.listaAtividades[i].periodicidade_dia_mes_repetir != "") {

								if (dstart >= data_inicio) {
									var aux = new Date(dstart*1000);
									var diaMesCorrente = aux.getUTCDate();
									
									if (diaMesCorrente == ATIVIDADE.listaAtividades[i].periodicidade_dia_mes_repetir) {
										//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
										start = end = aux.getUTCFullYear() + "-" +
													  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
													  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
										
										// adiciona atividade
										var jfc = {
											title: acessoAtividade == true ? title : "PRIVADA",
											color: color,
											id: id,
											start: start,
											end: end,
											privada: acessoAtividade == false ? true : false,
										};
										jsonFullCalendar.push(jfc);
									}
								}
							}
							else if (ATIVIDADE.listaAtividades[i].periodicidade_dia_semana_repetir != null && ATIVIDADE.listaAtividades[i].periodicidade_dia_semana_repetir != "") {

								if (dstart >= data_inicio) {
									var aux = new Date(dstart*1000);
									//var diaSemanaCorrente = (new Date(data_inicio*1000)).getDay()+1;
									var diaSemanaCorrente = aux.getUTCDay()+1;
									
									if (diaSemanaCorrente == ATIVIDADE.listaAtividades[i].periodicidade_dia_semana_repetir) {
										//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
										start = end = aux.getUTCFullYear() + "-" +
													  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
													  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
										
										// adiciona atividade
										var jfc = {
											title: acessoAtividade == true ? title : "PRIVADA",
											color: color,
											id: id,
											start: start,
											end: end,
											privada: acessoAtividade == false ? true : false,
										};
										jsonFullCalendar.push(jfc);
										break;
									}
								}
							}
							dstart += (24*60*60);
						}
					}
				break;
				
				case 4:			// Anual
					if (ATIVIDADE.listaAtividades[i].periodicidade_permanente == 0) {
						diff = Math.ceil((dend - dstart + 1) / (24*60*60));
					
						for (var j = 0; j < diff; j++) {
							if (dstart >= data_inicio && dstart <= data_termino) {
								var aux = new Date(dstart*1000);
								var diaAnoCorrente = aux.getUTCDate() + "/" + ( (aux.getUTCMonth() + 1) < 10 ? "0" + (aux.getUTCMonth() + 1) : (aux.getUTCMonth() + 1) );
								
								if (diaAnoCorrente == ATIVIDADE.listaAtividades[i].periodicidade_dia_ano_repetir) {
									//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
									start = end = aux.getUTCFullYear() + "-" +
												  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
												  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
									
									// adiciona atividade
									var jfc = {
										title: acessoAtividade == true ? title : "PRIVADA",
										color: color,
										id: id,
										start: start,
										end: end,
										privada: acessoAtividade == false ? true : false,
									};
									jsonFullCalendar.push(jfc);
								}
							}
							dstart += (24*60*60);
						}
					}
					
					else if (ATIVIDADE.listaAtividades[i].periodicidade_permanente == 1) {
						diff = Math.ceil((dend - dstart + 1) / (24*60*60));
						
						for (var j = 0; j < diff; j++) {
							if (dstart >= data_inicio) {
								var aux = new Date(dstart*1000);
								var diaAnoCorrente = aux.getUTCDate() + "/" + ( (aux.getUTCMonth() + 1) < 10 ? "0" + (aux.getUTCMonth() + 1) : (aux.getUTCMonth() + 1) );
								
								if (diaAnoCorrente == ATIVIDADE.listaAtividades[i].periodicidade_dia_ano_repetir) {
									//start = end = aux.getUTCFullYear() + "-" + (aux.getUTCMonth()+1) + "-" + aux.getUTCDate();
									start = end = aux.getUTCFullYear() + "-" +
												  ((aux.getUTCMonth()+1) < 10 ? "0" + (aux.getUTCMonth()+1) : (aux.getUTCMonth()+1)) + "-" + 
												  (aux.getUTCDate() < 10 ? "0" + aux.getUTCDate(): aux.getUTCDate());
									
									// adiciona atividade
									var jfc = {
										title: acessoAtividade == true ? title : "PRIVADA",
										color: color,
										id: id,
										start: start,
										end: end,
										privada: acessoAtividade == false ? true : false,
									};
									jsonFullCalendar.push(jfc);
								}
							}
							dstart += (24*60*60);
						}
					}
					
				break;
			}
		}
		return jsonFullCalendar;
	},
	// ***********************************************************************
	// CALENDÁRIO DE ATIVIDADES
	// ***********************************************************************

    // ****************** Obtém os dados de uma atividade para edição *********************
//    dadosAtividade: function(indexAtividade, cbSuccess, cbFail) {
    dadosAtividade: function(indexAtividade) {
	    console.log("dadosAtividade");
		
//		// Salva funções de retorno
//		ATIVIDADE.cbSuccess_f = cbSuccess;
//		ATIVIDADE.cbFail_f = cbFail;
		
		// Salva identificação da atividade
		ATIVIDADE.indexAtividade = indexAtividade;

		// Ponto do serviço
		BANCODADOS.sqlCmdDB("SELECT tipo_servico_id, nome, descricao FROM ponto_servico WHERE id = ? AND status = 1", [ATIVIDADE.listaAtividades[indexAtividade].ponto_servico_id], ATIVIDADE.dadosAtividadeSuccess, ATIVIDADE.dadosAtividadeFail);
	},
	
	dadosAtividadeSuccess: function (trans, res) {
		console.log("dadosAtividadeSuccess");

		if (res.rows.length != 1) {
			// Erro no banco
			ATIVIDADE.cbFail_f("O ponto de serviço não foi encontrado no banco de dados");
		}
		else {
			// Salva o nome e a descrição do ponto de serviço
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].ponto_servico_nome = res.rows.item(0).nome;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].ponto_servico_descricao = res.rows.item(0).descricao;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_id = res.rows.item(0).tipo_servico_id;
			
			// Busca o tipo do serviço
			BANCODADOS.sqlCmdDB("SELECT nome, descricao, status, dt_criacao FROM tipo_servico WHERE id = ? AND status = 1", [res.rows.item(0).tipo_servico_id], ATIVIDADE.dadosTipoServicoSuccess, ATIVIDADE.dadosAtividadeFail);
		}
	},
	
	dadosTipoServicoSuccess: function (trans, res) {
		console.log ("dadosTipoServicoSuccess");

		if (res.rows.length != 1) {
			// Erro no banco
			ATIVIDADE.cbFail_f("O tipo de serviço não foi encontrado no banco de dados");
		}
		else {
			// Salva as informações de tipo de serviço
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_nome = res.rows.item(0).nome;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_descricao = res.rows.item(0).descricao;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_status = res.rows.item(0).status;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_dt_criacao = res.rows.item(0).dt_criacao;
			
			// Busca dados de tipo de atuação
			BANCODADOS.sqlCmdDB("SELECT nome, status, dt_criacao FROM tipo_atuacao WHERE id = ? AND status = 1", [ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_id], ATIVIDADE.dadosTipoAtuacaoSuccess, ATIVIDADE.dadosAtividadeFail);
		}
	},
	
	dadosTipoAtuacaoSuccess: function (trans, res) {
		console.log ("dadosTipoAtuacaoSuccess");

		if (res.rows.length != 1) {
			// Erro no banco
			ATIVIDADE.cbFail_f("O tipo de atuação não foi encontrado no banco de dados");
		}
		else {
			// Salva as informações de tipo de atuação
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_nome = res.rows.item(0).nome;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_status = res.rows.item(0).status;
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_dt_criacao = res.rows.item(0).dt_criacao;
			
			// Busca dados de periodicidade
			BANCODADOS.sqlCmdDB("SELECT id, tipo_periodicidade_id, data_inicio, hora_inicio, data_termino, hora_termino, dia_inteiro, permanente, dia_ano_repetir, dia_mes_repetir, dia_semana_repetir, dt_criacao, status FROM periodicidade WHERE atividade_id = ? AND status = 1", [ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].id], ATIVIDADE.dadosPeriodicidadeSuccess, ATIVIDADE.dadosAtividadeFail);
		}
	},
	
	dadosPeriodicidadeSuccess: function (trans, res) {
		console.log("dadosPeriodicidadeSuccess");

		// todo: como proceder se não tiver periodicidade na atividade?
		// Salva as informações de periodicidade
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_id = res.rows.item(0).id;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_id = res.rows.item(0).tipo_periodicidade_id;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_data_inicio = res.rows.item(0).data_inicio;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_hora_inicio = res.rows.item(0).hora_inicio;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_data_termino = res.rows.item(0).data_termino;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_hora_termino = res.rows.item(0).hora_termino;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dia_inteiro = res.rows.item(0).dia_inteiro;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_permanente = res.rows.item(0).permanente;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dia_ano_repetir = res.rows.item(0).dia_ano_repetir;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dia_mes_repetir = res.rows.item(0).dia_mes_repetir;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dia_semana_repetir = res.rows.item(0).dia_semana_repetir;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dt_criacao = res.rows.item(0).dt_criacao;
		ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_status = res.rows.item(0).status;
		
		// Busca informações do tipo de periodicidade
		BANCODADOS.sqlCmdDB("SELECT nome, status, dt_criacao FROM tipo_periodicidade WHERE id = ? AND status = 1", [ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_id], ATIVIDADE.dadosTipoPeriodicidadeSuccess, ATIVIDADE.dadosAtividadeFail);
	},
	
	dadosTipoPeriodicidadeSuccess: function (trans, res) {
		console.log ("dadosTipoPeriodicidadeSuccess");

		if (res.rows.length != 1) {
			// Erro no banco
			ATIVIDADE.cbFail_f("O tipo de periodicidade não foi encontrado no banco de dados");
		}
		else {
			// Salva as informações de tipo de periodicidade
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_nome = res.rows.item(0).nome;
			
			// Busca informações de periodicidade de dias da semana
			BANCODADOS.sqlCmdDB("SELECT tipo_dias_semana_id FROM periodicidade_has_tipo_dias_semana WHERE periodicidade_id = ?", [ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_id], ATIVIDADE.dadosPeriodicidadeHTDSSuccess, ATIVIDADE.dadosAtividadeFail);
		}
	},
	
	dadosPeriodicidadeHTDSSuccess: function (trans, res) {
		console.log ("dadosPeriodicidadeHTDSSuccess");

		// Limpa a lista
		while (ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds.length > 0) {
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds.pop();
		}
		
		for (var i = 0; i < res.rows.length; i++) {
			// Salva as informações
			ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds.push(res.rows.item(i).tipo_dias_semana_id);
		}
/*
		// Testes - apresenta dados da atividade selecionada
		alertMessage ("Dados da atividade: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].id);
		var dadosAtividadePrint = "Tipo de serviço: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_servico_nome + "\r\n";
		dadosAtividadePrint += "Área de atuação: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].tipo_atuacao_nome + "\r\n";
		dadosAtividadePrint += "Atividade privada: " + (ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].privada == 1 ? "Sim" : "Não") + "\r\n";
		dadosAtividadePrint += "Periodicidade: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_nome + "\r\n";
		
		for (var i = 0; i < ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds.length; i++) {
			dadosAtividadePrint += "Dia da semana: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds[i] + "-" + ATIVIDADE.listaTiposDiaSemana[ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds[i]].nome + "-" + ATIVIDADE.listaTiposDiaSemana[ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_tipo_ds[i]].nome_abreviado + "\r\n";
		}
		
		dadosAtividadePrint += "Dia inteiro: " + (ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_dia_inteiro == 1 ? "Sim" : "Não") + "\r\n";
		dadosAtividadePrint += "Data de início: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_data_inicio + "\r\n";
		dadosAtividadePrint += "Permanente: " + (ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_permanente == 1 ? "Sim" : "Não") + "\r\n";
		dadosAtividadePrint += "Data de término: " + ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_data_termino + "\r\n";
		console.log(dadosAtividadePrint);
*/
		// Retorna se não houver mais atividades
		if (ATIVIDADE.atividadesCounter == ATIVIDADE.listaAtividades.length) {
			ATIVIDADE.cbSuccess_f();
		}
		else {
			ATIVIDADE.dadosAtividade(ATIVIDADE.atividadesCounter++);
		}
	},
	
	dadosAtividadeFail: function (err) {
		console.log("dadosAtividadeFail");
		
		// Retorna
		ATIVIDADE.cbFail_f(err);
	},
	
    // ****************** Salva nova atividade ou atividade atualizada *********************
	salvaAtividade: function (indexAtividade, 
							  ponto_servico_index, 
							  tipo_atuacao_index, 
							  privada, 
							  descricao, 
							  periodicidade_nome,
							  dia_inteiro,
							  data_inicio,
							  hora_inicio,
							  permanente,
							  data_termino,
							  hora_termino,
							  diasSemana,
							  diaSemana,
							  dia_mes_repetir,
							  dia_ano_repetir,
							  cbSuccess, cbFail) {
		console.log ("salvaAtividade");
		
		// Salva funções de retorno
		ATIVIDADE.cbSuccess_f = cbSuccess;
		ATIVIDADE.cbFail_f = cbFail;
		
		// Salva os dados para uso durante a inclusão/atualização
		var a = {
			indexAtividade: indexAtividade, 
			idAtividade: null,
			ponto_servico_id: ATIVIDADE.listaPontosServico[ponto_servico_index].id, 
			tipo_atuacao_id: ATIVIDADE.listaTiposAtuacao[tipo_atuacao_index].id, 
			privada: privada, 
			descricao: descricao, 
			periodicidade_nome: periodicidade_nome,
			tipo_periodicidade_id: null,
			dia_inteiro: dia_inteiro,
			data_inicio: data_inicio,
			hora_inicio: hora_inicio,
			permanente: permanente,
			data_termino: data_termino,
			hora_termino: hora_termino,
			diasSemana: diasSemana,
			dia_semana_repetir: diaSemana,
			dia_mes_repetir: dia_mes_repetir,
			dia_ano_repetir: dia_ano_repetir,
			dt_criacao: null,
			periodicidade_id: null,
		};
		ATIVIDADE.auxDados = a;

		// cidadao_id já está armazenado em ATIVIDADE.cidadao_id
		if ((ATIVIDADE.indexAtividade = indexAtividade) != null) {
			// Atualiza atividade
			BANCODADOS.sqlCmdDB("UPDATE atividade SET ponto_servico_id = ?, tipo_atuacao_id = ?, privada = ?, descricao = ?, mobile = ? WHERE id = ?",
								[ATIVIDADE.auxDados.ponto_servico_id, 
								ATIVIDADE.auxDados.tipo_atuacao_id, 
								ATIVIDADE.auxDados.privada, 
								ATIVIDADE.auxDados.descricao,
								CIDADAO.UPDATE_MOBILE,
								ATIVIDADE.listaAtividades[indexAtividade].id], 
								ATIVIDADE.salvaPeriodicidade, ATIVIDADE.salvaAtividadeFail);
		}
		else {
			// Nova atividade
			var hoje = new Date();
			BANCODADOS.sqlCmdDB("INSERT INTO atividade (cidadao_id, ponto_servico_id, tipo_atuacao_id, privada, descricao, status, dt_criacao, mobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
								[ATIVIDADE.cidadao_id, 
								ATIVIDADE.auxDados.ponto_servico_id, 
								ATIVIDADE.auxDados.tipo_atuacao_id, 
								ATIVIDADE.auxDados.privada, 
								ATIVIDADE.auxDados.descricao,
								1, 
								ATIVIDADE.auxDados.dt_criacao = (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds()),
								CIDADAO.INSERT_MOBILE], 
								ATIVIDADE.recuperaIdAtividade, ATIVIDADE.salvaAtividadeFail);
		}
	},
	
	recuperaIdAtividade: function (trans, res) {
		console.log("recuperaIdAtividade");
		
		BANCODADOS.sqlCmdDB("SELECT id FROM atividade WHERE cidadao_id = ? and ponto_servico_id = ? and tipo_atuacao_id = ? and privada = ? and descricao = ? and status = ? and dt_criacao = ?",
							[ATIVIDADE.cidadao_id,
							ATIVIDADE.auxDados.ponto_servico_id,
							ATIVIDADE.auxDados.tipo_atuacao_id,
							ATIVIDADE.auxDados.privada,
							ATIVIDADE.auxDados.descricao,
							1,
							ATIVIDADE.auxDados.dt_criacao],
							ATIVIDADE.recuperaIdAtividadeSuccess,
							ATIVIDADE.salvaAtividadeFail);
	},
	
	recuperaIdAtividadeSuccess: function (trans, res) {
		console.log("recuperaIdAtividadeSuccess");
		
		ATIVIDADE.auxDados.idAtividade = res.rows.item(0).id;
		ATIVIDADE.salvaPeriodicidade(trans, res);
	},
	
	salvaPeriodicidade: function (trans, res) {
		console.log("salvaPeriodicidade");
		
		for (var i = 0; i < ATIVIDADE.listaTiposPeriodicidade.length; i++) {
			if (ATIVIDADE.auxDados.periodicidade_nome == ATIVIDADE.listaTiposPeriodicidade[i].nome) {
				ATIVIDADE.auxDados.tipo_periodicidade_id = ATIVIDADE.listaTiposPeriodicidade[i].id;
				break;
			}
		}
		
		if (ATIVIDADE.indexAtividade != null) {
			// Atualiza periodicidade da atividade
			BANCODADOS.sqlCmdDB("UPDATE periodicidade SET tipo_periodicidade_id = ?, data_inicio = ?, hora_inicio = ?, data_termino = ?, hora_termino = ?, dia_inteiro = ?, \
								permanente = ?, dia_ano_repetir = ?, dia_mes_repetir = ?, dia_semana_repetir = ?, status = ?, mobile = ? \
								WHERE id = ?",
								[ATIVIDADE.auxDados.tipo_periodicidade_id,
								ATIVIDADE.auxDados.data_inicio,
								ATIVIDADE.auxDados.hora_inicio,
								ATIVIDADE.auxDados.data_termino,
								ATIVIDADE.auxDados.hora_termino,
								ATIVIDADE.auxDados.dia_inteiro,
								ATIVIDADE.auxDados.permanente,
								ATIVIDADE.auxDados.dia_ano_repetir,
								ATIVIDADE.auxDados.dia_mes_repetir,
								ATIVIDADE.auxDados.dia_semana_repetir,
								1,
								CIDADAO.UPDATE_MOBILE,
								ATIVIDADE.auxDados.periodicidade_id = ATIVIDADE.listaAtividades[ATIVIDADE.indexAtividade].periodicidade_id], 
								ATIVIDADE.limpaPeriodicidadeDiasSemana, ATIVIDADE.salvaAtividadeFail);
		}
		else {
			// Nova atividade
			var hoje = new Date();
			BANCODADOS.sqlCmdDB("INSERT INTO periodicidade (atividade_id, tipo_periodicidade_id, data_inicio, hora_inicio, data_termino, hora_termino, dia_inteiro, \
								permanente, dia_ano_repetir, dia_mes_repetir, dia_semana_repetir, dt_criacao, status, mobile) \
								VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
								[ATIVIDADE.auxDados.idAtividade,
								ATIVIDADE.auxDados.tipo_periodicidade_id,
								ATIVIDADE.auxDados.data_inicio ,
								ATIVIDADE.auxDados.hora_inicio,
								ATIVIDADE.auxDados.data_termino,
								ATIVIDADE.auxDados.hora_termino,
								ATIVIDADE.auxDados.dia_inteiro,
								ATIVIDADE.auxDados.permanente,
								ATIVIDADE.auxDados.dia_ano_repetir,
								ATIVIDADE.auxDados.dia_mes_repetir,
								ATIVIDADE.auxDados.dia_semana_repetir,
								ATIVIDADE.auxDados.dt_criacao = (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds()), 
								1,
								CIDADAO.INSERT_MOBILE],
								// verifica se o tipo da periodicidade é semanal
								(ATIVIDADE.auxDados.periodicidade_nome == "Semanal" && ATIVIDADE.auxDados.diasSemana.length > 0) ? ATIVIDADE.recuperaIdPeriodicidade : ATIVIDADE.salvaAtividadeSuccess, 
								ATIVIDADE.salvaAtividadeFail);
		}
	},
	
	recuperaIdPeriodicidade: function (trans, res) {
		console.log("recuperaIdPeriodicidade");

		/* Retirados por problemas com o SELECT
		BANCODADOS.sqlCmdDB("SELECT id FROM periodicidade WHERE atividade_id = ? and tipo_periodicidade_id = ? and data_inicio = ? and hora_inicio = ? and data_termino = ? \
							and hora_termino = ? and dia_inteiro = ? and permanente = ? and dia_ano_repetir = ? and dia_mes_repetir = ? and dia_semana_repetir = ? \
							and dt_criacao = ? and status = ?",
		*/
		BANCODADOS.sqlCmdDB("SELECT id FROM periodicidade WHERE atividade_id = ? and tipo_periodicidade_id = ? and dt_criacao = ? and status = ?",
							[ATIVIDADE.auxDados.idAtividade,
							ATIVIDADE.auxDados.tipo_periodicidade_id,
							/* Retirados por problemas com o SELECT
							ATIVIDADE.auxDados.data_inicio,
							ATIVIDADE.auxDados.hora_inicio,
							ATIVIDADE.auxDados.data_termino,
							ATIVIDADE.auxDados.hora_termino,
							ATIVIDADE.auxDados.dia_inteiro,
							ATIVIDADE.auxDados.permanente,
							ATIVIDADE.auxDados.dia_ano_repetir,
							ATIVIDADE.auxDados.dia_mes_repetir,
							ATIVIDADE.auxDados.dia_semana_repetir,
							*/
							ATIVIDADE.auxDados.dt_criacao,
							1],
							ATIVIDADE.recuperaIdPeriodicidadeSuccess,
							ATIVIDADE.salvaAtividadeFail);
	},
	
	recuperaIdPeriodicidadeSuccess: function (trans, res) {
		console.log("recuperaIdPeriodicidadeSuccess");
		
		ATIVIDADE.auxDados.periodicidade_id = res.rows.item(0).id;
		ATIVIDADE.diasSemanaCounter = 0;
		ATIVIDADE.salvaPeriodicidadeDiasSemana(trans,res);
	},
	
	limpaPeriodicidadeDiasSemana: function (trans, res) {
		console.log("limpaPeriodicidadeDiasSemana");
		
		ATIVIDADE.diasSemanaCounter = 0;
		BANCODADOS.sqlCmdDB("DELETE FROM periodicidade_has_tipo_dias_semana WHERE periodicidade_id = ?", [ATIVIDADE.auxDados.periodicidade_id], 
							// verifica se o tipo da periodicidade é semanal
							(ATIVIDADE.auxDados.periodicidade_nome == "Semanal" && ATIVIDADE.auxDados.diasSemana.length > 0) ? ATIVIDADE.salvaPeriodicidadeDiasSemana : ATIVIDADE.salvaAtividadeSuccess, 
							ATIVIDADE.salvaAtividadeFail);
	},
	
	salvaPeriodicidadeDiasSemana: function (trans, res) {
		console.log("salvaPeriodicidadeDiasSemana");
		
		BANCODADOS.sqlCmdDB("INSERT INTO periodicidade_has_tipo_dias_semana (periodicidade_id, tipo_dias_semana_id, mobile) VALUES (?, ?, ?)",
							[ATIVIDADE.auxDados.periodicidade_id, ATIVIDADE.auxDados.diasSemana[ATIVIDADE.diasSemanaCounter++], CIDADAO.INSERT_MOBILE], 
							ATIVIDADE.diasSemanaCounter == ATIVIDADE.auxDados.diasSemana.length ? ATIVIDADE.salvaAtividadeSuccess : ATIVIDADE.salvaPeriodicidadeDiasSemana, ATIVIDADE.salvaAtividadeFail);
	},
	
	salvaAtividadeSuccess: function (trans, res) {
		console.log ("salvaAtividadeSuccess");

		ATIVIDADE.dadosEntrada(ATIVIDADE.cidadao_id, "ATIVIDADE", ATIVIDADE.cbSuccess_f, ATIVIDADE.cbFail_f);
		
		ATIVIDADE.salvouAtividade = true;
		PageManager.loadTmpl('div_atividades_add');
	},
	
	salvaAtividadeFail: function (err) {
		console.log ("salvaAtividadeFail: " + err);

		ATIVIDADE.cbFail_f(err);
	},
	
	encerraAtividade: function (indexAtividade) {
		console.log("encerraAtividade");
		
		BANCODADOS.sqlCmdDB("UPDATE atividade SET status = 2, mobile = ? \
							WHERE id = ?",
							[CIDADAO.UPDATE_MOBILE, ATIVIDADE.listaAtividades[indexAtividade].id], 
							ATIVIDADE.dataTerminoAtividadeEncerrada, ATIVIDADE.encerraAtividadeFail);
	},
	
	dataTerminoAtividadeEncerrada: function () {
		console.log("dataTerminoAtividadeEncerrada");
		
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("UPDATE periodicidade SET data_termino = ?, permanente = 0, mobile = ? \
							WHERE atividade_id = ?",
							[
							 hoje.getFullYear() + "-" + ((hoje.getMonth()+1) < 10 ? "0" + (hoje.getMonth()+1) : (hoje.getMonth()+1)) + "-" + (hoje.getDate() < 10 ? "0" + hoje.getDate() : hoje.getDate()),
							 CIDADAO.UPDATE_MOBILE,
							 ATIVIDADE.listaAtividades[indexAtividade].id
							], 
							ATIVIDADE.encerraAtividadeSuccess, ATIVIDADE.encerraAtividadeFail);		
	},
		
	encerraAtividadeSuccess: function () {
		console.log("encerraAtividadeSuccess");

		alertMessageCallback("Encerramento da atividade efetuado com sucesso!", ATIVIDADE.encerraAtividadeOK);
	},
	
	encerraAtividadeOK: function () {
		console.log("encerraAtividadeOK");

		PageManager.loadTmpl("div_atividades");
		ATIVIDADE.dadosEntrada(null, "ATIVIDADE", ATIVIDADE.apresentaCalendario, null);
	},
	
	encerraAtividadeFail: function (err) {
		console.log("encerraAtividadeFail");
		
		$('.msgErro').removeAttr('style').fadeOut(5000);
		$('html, body').animate({scrollTop:0}, 'slow');
	},

	excluiAtividade: function (indexAtividade) {
		console.log("excluiAtividade");
		
		BANCODADOS.sqlCmdDB("UPDATE atividade SET status = 0, mobile = ? \
							WHERE id = ?",
							[CIDADAO.UPDATE_MOBILE, ATIVIDADE.listaAtividades[indexAtividade].id], 
							ATIVIDADE.excluiAtividadeSuccess, ATIVIDADE.excluiAtividadeFail);
	},
	
	excluiAtividadeSuccess: function () {
		console.log("excluiAtividadeSuccess");
		
		alertMessageCallback("Encerramento da atividade efetuado com sucesso!", ATIVIDADE.excluiAtividadeOK);
	},
	
	excluiAtividadeOK: function () {
		console.log("excluiAtividadeOK");

		PageManager.loadTmpl("div_atividades");
		ATIVIDADE.dadosEntrada(null, "ATIVIDADE", ATIVIDADE.apresentaCalendario, null);
	},
	
	excluiAtividadeFail: function (err) {
		console.log("excluiAtividadeFail");
		
		$('.msgErro').removeAttr('style').fadeOut(5000);
		$('html, body').animate({scrollTop:0}, 'slow');
	},
	
	trocaAtividade: function (pontoServicoID_anterior) {
		console.log("trocaAtividade");
		
		// Localiza a atividade por meio do pontoServicoID, encerra a atividade e cria uma nova atividade com o novo pontoServicoID
		BANCODADOS.sqlCmdDB("SELECT id FROM atividade WHERE cidadao_id = ? AND ponto_servico_id = ? AND status = ?",
							[SITUACAODBA.cidadao_id, pontoServicoID_anterior, 1], 
							ATIVIDADE.localizaAtividadeSuccess, SITUACAODBA.salvaSituacaoDBAFail);
	},
	
	localizaAtividadeSuccess: function (trans, res) {
		console.log("localizaAtividadeSuccess");

		if (res.rows.length == 1) {
			// encerra a atividade
			BANCODADOS.sqlCmdDB("UPDATE atividade SET status = 2, mobile = ? \
								WHERE id = ?",
								[CIDADAO.UPDATE_MOBILE, ATIVIDADE.auxAtividadeID = res.rows.item(0).id], 
								ATIVIDADE.dataTerminoAtividadeEncerradaSitDBA, SITUACAODBA.salvaSituacaoDBAFail);
		}
		else {
			SITUACAODBA.salvaSituacaoDBAFail("A atividade associada ao local de acolhida não foi encontrada ou há mais de uma atividade!");
		}
	},
	
	dataTerminoAtividadeEncerradaSitDBA: function () {
		console.log("dataTerminoAtividadeEncerradaSitDBA");
		
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("UPDATE periodicidade SET data_termino = ?, permanente = 0, mobile = ? \
							WHERE atividade_id = ?",
							[
							 hoje.getFullYear() + "-" + ((hoje.getMonth()+1) < 10 ? "0" + (hoje.getMonth()+1) : (hoje.getMonth()+1)) + "-" + (hoje.getDate() < 10 ? "0" + hoje.getDate() : hoje.getDate()),
							 CIDADAO.UPDATE_MOBILE,
							 ATIVIDADE.auxAtividadeID
							], 
							ATIVIDADE.cancelaAtividadeSuccess, SITUACAODBA.salvaSituacaoDBAFail);		
	},
	
	cancelaAtividadeSuccess: function () {
		console.log("cancelaAtividadeSuccess");

		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO atividade (cidadao_id, ponto_servico_id, tipo_atuacao_id, privada, descricao, status, dt_criacao, mobile) VALUES \
							(?, ?, ?, ?, ?, ?, ?, ?)",
							[
							SITUACAODBA.cidadao_id,
							SITUACAODBA.auxpontoServicoId,
							4,									// todo: trocar por ATIVIDADE.listaAtuacao_NomeVersusID["Todas"], quando ATIVIDADE estiver carregada
							0,
							"Local de Acolhida",
							1,
							(ATIVIDADE.auxDate = (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds())),
							CIDADAO.INSERT_MOBILE], 
							ATIVIDADE.localizaNovaAtividade, SITUACAODBA.salvaSituacaoDBAFail);
	},
	
	localizaNovaAtividade: function () {
		console.log("localizaNovaAtividade");
		
		// Localiza a nova atividade
		BANCODADOS.sqlCmdDB("SELECT id FROM atividade WHERE cidadao_id = ? \
							AND ponto_servico_id = ? \
							AND tipo_atuacao_id = ? \
							AND privada = ? \
							AND descricao = ? \
							AND status = ? \
							AND dt_criacao = ? \
							AND mobile = ?",
							[
							 SITUACAODBA.cidadao_id, 
							 SITUACAODBA.auxpontoServicoId,
							 4,									// todo: trocar por ATIVIDADE.listaAtuacao_NomeVersusID["Todas"], quando ATIVIDADE estiver carregada
							 0,
							 "Local de Acolhida",
							 1,
							 ATIVIDADE.auxDate,
							 CIDADAO.INSERT_MOBILE
							], 
							ATIVIDADE.localizaNovaAtividadeSuccess, SITUACAODBA.salvaSituacaoDBAFail);
	},
	
	localizaNovaAtividadeSuccess: function (trans, res) {
		console.log("localizaNovaAtividadeSuccess");
		
		if (res.rows.length == 1) {
			// Utiliza o id para inserir nova periodicidade diária e permanente
			var hoje = new Date();
			BANCODADOS.sqlCmdDB("INSERT INTO periodicidade (atividade_id, tipo_periodicidade_id, data_inicio, dia_inteiro, permanente, status, dt_criacao, mobile) VALUES \
								(?, ?, ?, ?, ?, ?, ?, ?)",
								[
								res.rows.item(0).id,
								1,							// periodicidade diária
								hoje.getFullYear() + "-" + ((hoje.getMonth()+1) < 10 ? "0" + (hoje.getMonth()+1) : (hoje.getMonth()+1)) + "-" + (hoje.getDate() < 10 ? "0" + hoje.getDate() : hoje.getDate()),
								1,
								1,
								1,
								(hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds()),
								CIDADAO.INSERT_MOBILE], 
								SITUACAODBA.atualizaSituacaoDBA, SITUACAODBA.salvaSituacaoDBAFail);
		}
		else {
			SITUACAODBA.salvaSituacaoDBAFail();
		}
	},
	
	voltarAtiv: function () {
		console.log("voltarAtiv");

		PageManager.loadTmpl("div_atividades");
		ATIVIDADE.dadosEntrada(null, "ATIVIDADE", ATIVIDADE.apresentaCalendario, null);
	},
}
