var CIDADAOTRABALHO = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	ehSalvamento: false,
	
	cidadao_id: null,
	dadosTrabalho: null,
	listaAtividadesTempoLivre: [],
	listaLocaisVisitar: [],
	
	// Auxiliares
	auxDate: null,
	auxlistaAtividadesTempoLivre: null,
	auxlistaLocaisVisitar: null,
	
	// Listas
	listaTipoTrabalhoColetivo: null,
	listaTipoOndeAprendeuProfissao: null,
	listaTipoComprovanteConhecimentoProfissional: null,
	listaTipoRamoCurso: null,
	listaTipoPretencaoCurso: null,
	listaTipoAtividadeTempoLivre: null,
	listaTipoPrimeiraEscolha: null,
	listaTipoLocalVisitar: null,
		
	// Carrega dados básicos
	dadosBasicos: function () {
		console.log("dadosBasicos");
		
		BD_DTO.tipo_trabalho_coletivo_carrega(CIDADAOTRABALHO.dadosBasicosOndeAprendeuProfissao, CIDADAOTRABALHO.dadosBasicosFail);
	},
	
	dadosBasicosOndeAprendeuProfissao: function () {
		console.log("dadosBasicosOndeAprendeuProfissao");

		CIDADAOTRABALHO.listaTipoTrabalhoColetivo = BD_DTO.tipo_trabalho_coletivo_data;
	
		// todo: testes retirar
		/*
		var Print = "Tipos de Trabalho Coletivo:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaTipoTrabalhoColetivo.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaTipoTrabalhoColetivo[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOTRABALHO.listaTipoTrabalhoColetivo[i].nome + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		BD_DTO.tipo_onde_aprendeu_profissao_carrega(CIDADAOTRABALHO.dadosBasicosComprovanteConhecimentoProfissional, CIDADAOTRABALHO.dadosBasicosFail);
	},
	
	dadosBasicosComprovanteConhecimentoProfissional: function () {
		console.log("dadosBasicosComprovanteConhecimentoProfissional");

		CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao = BD_DTO.tipo_onde_aprendeu_profissao_data;
	
		// todo: testes retirar
		/*
		var Print = "Tipos de Onde Aprendeu Profissão:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao[i].nome + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		BD_DTO.tipo_comprovante_conhecimento_profissional_carrega(CIDADAOTRABALHO.dadosBasicosRamoCurso, CIDADAOTRABALHO.dadosBasicosFail);
	},
	
	dadosBasicosRamoCurso: function () {
		console.log("dadosBasicosRamoCurso");

		CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional = BD_DTO.tipo_comprovante_conhecimento_profissional_data;
	
		// todo: testes retirar
		/*
		var Print = "Tipos de Comprovante Conhecimento Profissional:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional[i].nome + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		BD_DTO.tipo_ramo_curso_carrega(CIDADAOTRABALHO.dadosBasicosPretencaoCurso, CIDADAOTRABALHO.dadosBasicosFail);
	},
	
	dadosBasicosPretencaoCurso: function () {
		console.log("dadosBasicosPretencaoCurso");

		CIDADAOTRABALHO.listaTipoRamoCurso = BD_DTO.tipo_ramo_curso_data;
	
		// todo: testes retirar
		/*
		var Print = "Tipos de Ramo Curso:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaTipoRamoCurso.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaTipoRamoCurso[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOTRABALHO.listaTipoRamoCurso[i].nome + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		BD_DTO.tipo_pretencao_cursos_carrega(CIDADAOTRABALHO.dadosBasicosPrimeiraEscolha, CIDADAOTRABALHO.dadosBasicosFail);
	},
	
	dadosBasicosPrimeiraEscolha: function () {
		console.log("dadosBasicosPrimeiraEscolha");

		CIDADAOTRABALHO.listaTipoPretencaoCurso = BD_DTO.tipo_pretencao_cursos_data;
	
		// todo: testes retirar
		/*
		var Print = "Tipos de Pretenção Curso:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaTipoPretencaoCurso.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaTipoPretencaoCurso[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOTRABALHO.listaTipoPretencaoCurso[i].nome + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		BD_DTO.tipo_primeira_escolha_carrega(CIDADAOTRABALHO.dadosBasicosListaAtividadeTempoLivre, CIDADAOTRABALHO.dadosBasicosFail);
	},
	
	dadosBasicosListaAtividadeTempoLivre: function () {
		console.log("dadosBasicosListaAtividadeTempoLivre");

		CIDADAOTRABALHO.listaTipoPrimeiraEscolha = BD_DTO.tipo_primeira_escolha_data;
	
		// todo: testes retirar
		/*
		var Print = "Tipos de Primeira Escolha:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaTipoPrimeiraEscolha.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaTipoPrimeiraEscolha[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOTRABALHO.listaTipoPrimeiraEscolha[i].nome + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		BD_DTO.tipo_atividade_tempo_livre_carrega(CIDADAOTRABALHO.dadosBasicosAtividadesTempoLivre, CIDADAOTRABALHO.dadosBasicosFail);
	},
	
	dadosBasicosAtividadesTempoLivre: function (trans, res) {
		console.log("dadosBasicosAtividadesTempoLivre");
		
		CIDADAOTRABALHO.listaTipoAtividadeTempoLivre = BD_DTO.tipo_atividade_tempo_livre_data;
	
		// todo: testes retirar
		/*
		var Print = "Tipos de Atividade Tempo Livre:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaTipoAtividadeTempoLivre.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaTipoAtividadeTempoLivre[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOTRABALHO.listaTipoAtividadeTempoLivre[i].nome + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		BANCODADOS.sqlCmdDB("SELECT id, trabalho_id, tipo_atividade_tempo_livre_id, dt_criacao " +		
							"FROM atividade_tempo_livre WHERE trabalho_id = ?", [CIDADAOTRABALHO.dadosTrabalho.id], CIDADAOTRABALHO.dadosBasicosListaLocalVisitar, CIDADAOTRABALHO.dadosEntradaFail);
	},
	
	dadosBasicosListaLocalVisitar: function (trans, res) {
		console.log("dadosBasicosListaLocalVisitar");
		
		CIDADAOTRABALHO.listaAtividadesTempoLivre = [];
		
		for (var i = 0; i < res.rows.length; i++) {
			var atl = {
				id: res.rows.item(i).id,
				tipo_atividade_tempo_livre_id: res.rows.item(i).tipo_atividade_tempo_livre_id,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			CIDADAOTRABALHO.listaAtividadesTempoLivre.push(atl);
		}

		// todo: testes retirar
		/*
		var Print = "Atividades Tempo Livre:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaAtividadesTempoLivre.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaAtividadesTempoLivre[i].id + "\r\n";
			Print += "\tTipo Atividade Tempo Livre: " + CIDADAOTRABALHO.listaAtividadesTempoLivre[i].tipo_atividade_tempo_livre_id + "\r\n";			
			Print += "\tData da Criação: " + CIDADAOTRABALHO.listaAtividadesTempoLivre[i].dt_criacao + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		BD_DTO.tipo_local_visitar_carrega(CIDADAOTRABALHO.dadosBasicosLocaisVisitar, CIDADAOTRABALHO.dadosBasicosFail);
	},
	
	dadosBasicosLocaisVisitar: function (trans, res) {
		console.log("dadosBasicosLocaisVisitar");

		CIDADAOTRABALHO.listaTipoLocalVisitar = BD_DTO.tipo_local_visitar_data;
	
		// todo: testes retirar
		/*
		var Print = "Tipos de Local Visitar:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaTipoLocalVisitar.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaTipoLocalVisitar[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOTRABALHO.listaTipoLocalVisitar[i].nome + "\r\n";			
			Print += "\tStatus: " + CIDADAOTRABALHO.listaTipoLocalVisitar[i].status + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		BANCODADOS.sqlCmdDB("SELECT id, trabalho_id, tipo_local_visitar_id, dt_criacao " +		
							"FROM local_visitar WHERE trabalho_id = ?", [CIDADAOTRABALHO.dadosTrabalho.id], CIDADAOTRABALHO.dadosBasicosSuccess, CIDADAOTRABALHO.dadosEntradaFail);
	},
	
	dadosBasicosSuccess: function (trans, res) {
		console.log("dadosBasicosSuccess");
		
		CIDADAOTRABALHO.listaLocaisVisitar = [];
		
		for (var i = 0; i < res.rows.length; i++) {
			var atl = {
				id: res.rows.item(i).id,
				tipo_local_visitar_id: res.rows.item(i).tipo_local_visitar_id,
				dt_criacao: res.rows.item(i).dt_criacao,
			};
			CIDADAOTRABALHO.listaLocaisVisitar.push(atl);
		}

		// todo: testes retirar
		/*
		var Print = "Locais Visitar:\r\n";
		for (var i = 0; i < CIDADAOTRABALHO.listaLocaisVisitar.length; i++) {
			Print += "\tID: " + CIDADAOTRABALHO.listaLocaisVisitar[i].id + "\r\n";
			Print += "\tTipo Local Visitar: " + CIDADAOTRABALHO.listaLocaisVisitar[i].tipo_local_visitar_id + "\r\n";			
			Print += "\tData da Criação: " + CIDADAOTRABALHO.listaLocaisVisitar[i].dt_criacao + "\r\n";			
		}
		console.log(Print);
		*/
		// testes retirar

		//CIDADAOTRABALHO.cbSuccess_f();
		PageManager.loadTmpl('trabalho');
	},
	
	dadosBasicosFail: function (err) {
		console.log("dadosBasicosFail: " + err);
		
		CIDADAOTRABALHO.cbFail_f(err);
	},
	
    // ****************** Obtém os dados de entrada *********************
	// 	
    // ******************************************************************
    dadosEntrada: function(cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");
		
		// Salva funções de retorno
		CIDADAOTRABALHO.cbSuccess_f = cbSuccess;
		CIDADAOTRABALHO.cbFail_f = cbFail;
		
		// Salva identificação do cidadão
		//CIDADAOTRABALHO.cidadao_id = CIDADAO.listaCidadaosId[CIDADAO.indiceListaCidadao];
		CIDADAOTRABALHO.cidadao_id = CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].id;

		// Utiliza sempre o registro mais novo, por meio da data de criação
		BANCODADOS.sqlCmdDB("SELECT id " +
							", participa_frente_trabalho " +
							", frente_trabalho " +
							", grupo " +
							", orientador " +
							", hotel " +
							", dias_empregado " +
							", meses_empregado " +
							", anos_empregado " +
							", procurou_emprego " +
							", procurou_programa_pmsp " +
							", qual_programa_pmsp " +
							", ocupacao_pretendida " +
							", ultima_atual_ocupacao " +
							", carteira_assinada " +
							", nome_empresa " +
							", dia_inicio_ocupacao " +
							", mes_inicio_ocupacao " +
							", ano_inicio_ocupacao " +
							", dia_ternino_ocupacao " +
							", mes_termino_ocupacao " +
							", ano_termino_ocupacao " +
							", teve_negocio_proprio " +
							", justificativa_teve_negocio_proprio " +
							", trabalhar_conta_propria_autonomo " +
							", conhecimento_negocio_proprio " +
							", tipo_trabalho_coletivo_id " +
							", meses_trabalho_coletivo " +
							", anos_trabalho_coletivo " +
							", outra_atividade_bico " +
							", qual_outra_atividade_bico " +
							", profissao_atividade " +
							", tipo_onde_aprendeu_profissao_id " +
							", tipo_comprovante_conhecimento_profissional_id " +
							", curso_qualificacao_profissional " +
							", qual_curso_qualificacao_profissional " +
							", tipo_ramo_curso_id " +
							", outros_ramo_curso " +
							", tipo_pretencao_cursos_id " +
							", qual_curso_pretencao " +
							", outros_atividade_tempo_livre " +
							", tipo_primeira_escolha_id " +
							", outros_primeira_escolha " +
							", observacoes_gerais " +
							", MAX(dt_criacao) as dt_criacao " +
							", status " +
							"FROM trabalho WHERE cidadao_id = ? and status = ?", [CIDADAOTRABALHO.cidadao_id, 1], CIDADAOTRABALHO.dadosEntradaSuccess, CIDADAOTRABALHO.dadosEntradaFail);
	},
	
	dadosEntradaSuccess: function(trans, res) {
		console.log("dadosEntradaSuccess");
		var dt = {
			id: res.rows.item(0).id,
			participa_frente_trabalho: res.rows.item(0).participa_frente_trabalho,
			frente_trabalho: res.rows.item(0).frente_trabalho,
			grupo: res.rows.item(0).grupo,
			orientador: res.rows.item(0).orientador,
			hotel: res.rows.item(0).hotel,
			dias_empregado: res.rows.item(0).dias_empregado,
			meses_empregado: res.rows.item(0).meses_empregado,
			anos_empregado: res.rows.item(0).anos_empregado,
			procurou_emprego: res.rows.item(0).procurou_emprego,
			procurou_programa_pmsp: res.rows.item(0).procurou_programa_pmsp,
			qual_programa_pmsp: res.rows.item(0).qual_programa_pmsp,
			ocupacao_pretendida: res.rows.item(0).ocupacao_pretendida,
			ultima_atual_ocupacao: res.rows.item(0).ultima_atual_ocupacao,
			carteira_assinada: res.rows.item(0).carteira_assinada,
			nome_empresa: res.rows.item(0).nome_empresa,
			dia_inicio_ocupacao: res.rows.item(0).dia_inicio_ocupacao,
			mes_inicio_ocupacao: res.rows.item(0).mes_inicio_ocupacao,
			ano_inicio_ocupacao: res.rows.item(0).ano_inicio_ocupacao,
			dia_ternino_ocupacao: res.rows.item(0).dia_ternino_ocupacao,
			mes_termino_ocupacao: res.rows.item(0).mes_termino_ocupacao,
			ano_termino_ocupacao: res.rows.item(0).ano_termino_ocupacao,
			teve_negocio_proprio: res.rows.item(0).teve_negocio_proprio,
			justificativa_teve_negocio_proprio: res.rows.item(0).justificativa_teve_negocio_proprio,
			trabalhar_conta_propria_autonomo: res.rows.item(0).trabalhar_conta_propria_autonomo,
			conhecimento_negocio_proprio: res.rows.item(0).conhecimento_negocio_proprio,
			tipo_trabalho_coletivo_id: res.rows.item(0).tipo_trabalho_coletivo_id,
			meses_trabalho_coletivo: res.rows.item(0).meses_trabalho_coletivo,
			anos_trabalho_coletivo: res.rows.item(0).anos_trabalho_coletivo,
			outra_atividade_bico: res.rows.item(0).outra_atividade_bico,
			qual_outra_atividade_bico: res.rows.item(0).qual_outra_atividade_bico,
			profissao_atividade: res.rows.item(0).profissao_atividade,
			tipo_onde_aprendeu_profissao_id: res.rows.item(0).tipo_onde_aprendeu_profissao_id,
			tipo_comprovante_conhecimento_profissional_id: res.rows.item(0).tipo_comprovante_conhecimento_profissional_id,
			curso_qualificacao_profissional: res.rows.item(0).curso_qualificacao_profissional,
			qual_curso_qualificacao_profissional: res.rows.item(0).qual_curso_qualificacao_profissional,
			tipo_ramo_curso_id: res.rows.item(0).tipo_ramo_curso_id,
			outros_ramo_curso: res.rows.item(0).outros_ramo_curso,
			tipo_pretencao_cursos_id: res.rows.item(0).tipo_pretencao_cursos_id,
			qual_curso_pretencao: res.rows.item(0).qual_curso_pretencao,
			outros_atividade_tempo_livre: res.rows.item(0).outros_atividade_tempo_livre,
			tipo_primeira_escolha_id: res.rows.item(0).tipo_primeira_escolha_id,
			outros_primeira_escolha: res.rows.item(0).outros_primeira_escolha,
			observacoes_gerais: res.rows.item(0).observacoes_gerais,
			dt_criacao: res.rows.item(0).dt_criacao,
			status: res.rows.item(0).status,		
		};
		CIDADAOTRABALHO.dadosTrabalho = dt;
		
		// todo: testes retirar
		/*
		var Print = "Dados de trabalho:\r\n";
		Print += "id: " + CIDADAOTRABALHO.dadosTrabalho.id + "\r\n";
		Print += "participa_frente_trabalho: " + CIDADAOTRABALHO.dadosTrabalho.participa_frente_trabalho + "\r\n";
		Print += "frente_trabalho: " + CIDADAOTRABALHO.dadosTrabalho.frente_trabalho + "\r\n";
		Print += "grupo: " + CIDADAOTRABALHO.dadosTrabalho.grupo + "\r\n";
		Print += "orientador: " + CIDADAOTRABALHO.dadosTrabalho.orientador + "\r\n";
		Print += "hotel: " + CIDADAOTRABALHO.dadosTrabalho.hotel + "\r\n";
		Print += "dias_empregado: " + CIDADAOTRABALHO.dadosTrabalho.dias_empregado + "\r\n";
		Print += "meses_empregado: " + CIDADAOTRABALHO.dadosTrabalho.meses_empregado + "\r\n";
		Print += "anos_empregado: " + CIDADAOTRABALHO.dadosTrabalho.anos_empregado + "\r\n";
		Print += "procurou_emprego: " + CIDADAOTRABALHO.dadosTrabalho.procurou_emprego + "\r\n";
		Print += "procurou_programa_pmsp: " + CIDADAOTRABALHO.dadosTrabalho.procurou_programa_pmsp + "\r\n";
		Print += "qual_programa_pmsp: " + CIDADAOTRABALHO.dadosTrabalho.qual_programa_pmsp + "\r\n";
		Print += "ocupacao_pretendida: " + CIDADAOTRABALHO.dadosTrabalho.ocupacao_pretendida + "\r\n";
		Print += "ultima_atual_ocupacao: " + CIDADAOTRABALHO.dadosTrabalho.ultima_atual_ocupacao + "\r\n";
		Print += "carteira_assinada: " + CIDADAOTRABALHO.dadosTrabalho.carteira_assinada + "\r\n";
		Print += "nome_empresa: " + CIDADAOTRABALHO.dadosTrabalho.nome_empresa + "\r\n";
		Print += "dia_inicio_ocupacao: " + CIDADAOTRABALHO.dadosTrabalho.dia_inicio_ocupacao + "\r\n";
		Print += "mes_inicio_ocupacao: " + CIDADAOTRABALHO.dadosTrabalho.mes_inicio_ocupacao + "\r\n";
		Print += "ano_inicio_ocupacao: " + CIDADAOTRABALHO.dadosTrabalho.ano_inicio_ocupacao + "\r\n";
		Print += "dia_ternino_ocupacao: " + CIDADAOTRABALHO.dadosTrabalho.dia_ternino_ocupacao + "\r\n";
		Print += "mes_termino_ocupacao: " + CIDADAOTRABALHO.dadosTrabalho.mes_termino_ocupacao + "\r\n";
		Print += "ano_termino_ocupacao: " + CIDADAOTRABALHO.dadosTrabalho.ano_termino_ocupacao + "\r\n";
		Print += "teve_negocio_proprio: " + CIDADAOTRABALHO.dadosTrabalho.teve_negocio_proprio + "\r\n";
		Print += "justificativa_teve_negocio_proprio: " + CIDADAOTRABALHO.dadosTrabalho.justificativa_teve_negocio_proprio + "\r\n";
		Print += "trabalhar_conta_propria_autonomo: " + CIDADAOTRABALHO.dadosTrabalho.trabalhar_conta_propria_autonomo + "\r\n";
		Print += "conhecimento_negocio_proprio: " + CIDADAOTRABALHO.dadosTrabalho.conhecimento_negocio_proprio + "\r\n";
		Print += "tipo_trabalho_coletivo_id: " + CIDADAOTRABALHO.dadosTrabalho.tipo_trabalho_coletivo_id + "\r\n";
		Print += "meses_trabalho_coletivo: " + CIDADAOTRABALHO.dadosTrabalho.meses_trabalho_coletivo + "\r\n";
		Print += "anos_trabalho_coletivo: " + CIDADAOTRABALHO.dadosTrabalho.anos_trabalho_coletivo + "\r\n";
		Print += "outra_atividade_bico: " + CIDADAOTRABALHO.dadosTrabalho.outra_atividade_bico + "\r\n";
		Print += "qual_outra_atividade_bico: " + CIDADAOTRABALHO.dadosTrabalho.qual_outra_atividade_bico + "\r\n";
		Print += "profissao_atividade: " + CIDADAOTRABALHO.dadosTrabalho.profissao_atividade + "\r\n";
		Print += "tipo_onde_aprendeu_profissao_id: " + CIDADAOTRABALHO.dadosTrabalho.tipo_onde_aprendeu_profissao_id + "\r\n";
		Print += "tipo_comprovante_conhecimento_profissional_id: " + CIDADAOTRABALHO.dadosTrabalho.tipo_comprovante_conhecimento_profissional_id + "\r\n";
		Print += "curso_qualificacao_profissional: " + CIDADAOTRABALHO.dadosTrabalho.curso_qualificacao_profissional + "\r\n";
		Print += "qual_curso_qualificacao_profissional: " + CIDADAOTRABALHO.dadosTrabalho.qual_curso_qualificacao_profissional + "\r\n";
		Print += "tipo_ramo_curso_id: " + CIDADAOTRABALHO.dadosTrabalho.tipo_ramo_curso_id + "\r\n";
		Print += "outros_ramo_curso: " + CIDADAOTRABALHO.dadosTrabalho.outros_ramo_curso + "\r\n";
		Print += "tipo_pretencao_cursos_id: " + CIDADAOTRABALHO.dadosTrabalho.tipo_pretencao_cursos_id + "\r\n";
		Print += "qual_curso_pretencao: " + CIDADAOTRABALHO.dadosTrabalho.qual_curso_pretencao + "\r\n";
		Print += "outros_atividade_tempo_livre: " + CIDADAOTRABALHO.dadosTrabalho.outros_atividade_tempo_livre + "\r\n";
		Print += "tipo_primeira_escolha_id: " + CIDADAOTRABALHO.dadosTrabalho.tipo_primeira_escolha_id + "\r\n";
		Print += "outros_primeira_escolha: " + CIDADAOTRABALHO.dadosTrabalho.outros_primeira_escolha + "\r\n";
		Print += "observacoes_gerais: " + CIDADAOTRABALHO.dadosTrabalho.observacoes_gerais + "\r\n";
		Print += "dt_criacao: " + CIDADAOTRABALHO.dadosTrabalho.dt_criacao + "\r\n";
		Print += "status: " + CIDADAOTRABALHO.dadosTrabalho.status + "\r\n";

		console.log(Print);
		*/
		// testes retirar
		
		// carrega dados básicos
		CIDADAOTRABALHO.dadosBasicos();
	},
	
	dadosEntradaFail: function(err) {
		console.log("");

		CIDADAOTRABALHO.cbFail_f (err);
	},
	
    // ****************** Salva os dados  *********************
	// Salva no banco e atualiza memória
	salvaCidadaoTrabalho: function(dadosLista, cbSuccess, cbFail) {
		console.log("salvaCidadaoTrabalho");
		
		// Salva funções de retorno
		CIDADAOTRABALHO.cbSuccess_f = cbSuccess;
		CIDADAOTRABALHO.cbFail_f = cbFail;

		// Salva no banco de dados
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO trabalho " +
							"(cidadao_id " +
							", participa_frente_trabalho " +
							", frente_trabalho " +
							", grupo " +
							", orientador " +
							", hotel " +
							", dias_empregado " +
							", meses_empregado " +
							", anos_empregado " +
							", procurou_emprego " +
							", procurou_programa_pmsp " +
							", qual_programa_pmsp " +
							", ocupacao_pretendida " +
							", ultima_atual_ocupacao " +
							", carteira_assinada " +
							", nome_empresa " +
							", dia_inicio_ocupacao " +
							", mes_inicio_ocupacao " +
							", ano_inicio_ocupacao " +
							", dia_ternino_ocupacao " +
							", mes_termino_ocupacao " +
							", ano_termino_ocupacao " +
							", teve_negocio_proprio " +
							", justificativa_teve_negocio_proprio " +
							", trabalhar_conta_propria_autonomo " +
							", conhecimento_negocio_proprio " +
							", tipo_trabalho_coletivo_id " +
							", meses_trabalho_coletivo " +
							", anos_trabalho_coletivo " +
							", outra_atividade_bico " +
							", qual_outra_atividade_bico " +
							", profissao_atividade " +
							", tipo_onde_aprendeu_profissao_id " +
							", tipo_comprovante_conhecimento_profissional_id " +
							", curso_qualificacao_profissional " +
							", qual_curso_qualificacao_profissional " +
							", tipo_ramo_curso_id " +
							", outros_ramo_curso " +
							", tipo_pretencao_cursos_id " +
							", qual_curso_pretencao " +
							", outros_atividade_tempo_livre " +
							", tipo_primeira_escolha_id " +
							", outros_primeira_escolha " +
							", observacoes_gerais " +
							", dt_criacao " +
							", status " +
							", mobile) " +
							"VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
							[
							CIDADAOTRABALHO.cidadao_id,
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							(CIDADAOTRABALHO.auxDate = (hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds())),
							1,
							CIDADAO.INSERT_MOBILE
							], 
							CIDADAOTRABALHO.salvaCidadaoTrabalhoSuccess, CIDADAOTRABALHO.salvaCidadaoTrabalhoFail);
	},
	
	salvaCidadaoTrabalhoSuccess: function (trans, res) {
		console.log("salvaCidadaoTrabalhoSuccess");
		
		// Atualiza dados na memória
		CIDADAOTRABALHO.ehSalvamento = true;
		CIDADAOTRABALHO.dadosEntrada(CIDADAOTRABALHO.cidadao_id, CIDADAOTRABALHO.cbSuccess_f, CIDADAOTRABALHO.cbFail_f);
	},
	
	salvaCidadaoTrabalhoFail: function (err) {
		console.log("salvaCidadaoTrabalhoFail");
		
		// Retorna
		CIDADAOTRABALHO.cbFail_f(err);
	},
}
