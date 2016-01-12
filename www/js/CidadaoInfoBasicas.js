var INFOBASICAS = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	cidadao_id: null,
	
	generoCidadao: null,
	infoAdicionaisCidadao: null,
	situacaoRuaCidadao: null,
	trabalhoEducacaoCidadao: null,
	saudeCidadao: null,
	
	tipoSexo: [],
	tipoOrientacaoSexual: [],
	tipoEstadoCivil: [],
	tipoEstado: [],
	tipoPais: [],
	tipoHabilidade: [],
	tipoFonteRenda: [],
	tipoEscolaridade: [],
	tipoSituacaoProfissional: [],
	tipoAcompanhanteRua: [],
	tipoParentesco: [],
	tipoCondicaoSaude: [],

    // ****************** Obtém os dados básicos *********************
	// Lista de tipos de sexo
	// Lista de tipos de orientação sexual
	// Lista de tipos de estado civil
	// Lista de estados
	// Lista de paises
	// Lista de tipos de habilidade
	// Lista de tipos de fonte de renda
	// Lista de tipos de escolaridade
	// Lista de tipos de situação profissional
	// Lista de tipos de acompanhantes de rua
	// Lista de tipos de parentesco
	// Lista de tipos de condição de saúde
	dadosBasicos: function () {
		console.log("dadosBasicos");
/*
		// Obtém os dados básicos - tipos de sexo
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_sexo",
							[], 
							INFOBASICAS.dadosBasicosTipoSexoSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
*/
		BD_DTO.tipo_sexo_carrega(INFOBASICAS.dadosBasicosTipoSexoSuccess, INFOBASICAS.dadosEntradaInfoBasicasFail)
	},
	
	dadosBasicosTipoSexoSuccess: function (trans, res) {
		console.log("dadosBasicosTipoSexoSuccess");
		
		INFOBASICAS.tipoSexo = BD_DTO.tipo_sexo_data;
/*		
		// Limpa a lista
		while (INFOBASICAS.tipoSexo.length > 0) {
			INFOBASICAS.tipoSexo.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tSexo = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoSexo.push(tSexo);
		}
*/		
		// Obtém os dados básicos - tipos de orientação sexual
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_orientacao_sexual",
							[], 
							INFOBASICAS.dadosBasicosTipoOrientacaoSexualSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoOrientacaoSexualSuccess: function (trans, res) {
		console.log("dadosBasicosTipoOrientacaoSexualSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoOrientacaoSexual.length > 0) {
			INFOBASICAS.tipoOrientacaoSexual.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tOrientacaoSexual = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoOrientacaoSexual.push(tOrientacaoSexual);
		}
		
		// Obtém os dados básicos - tipos de estado civil
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_estado_civil",
							[], 
							INFOBASICAS.dadosBasicosTipoEstadoCivilSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoEstadoCivilSuccess: function (trans, res) {
		console.log("dadosBasicosTipoEstadoCivilSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoEstadoCivil.length > 0) {
			INFOBASICAS.tipoEstadoCivil.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tEstadoCivil = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoEstadoCivil.push(tEstadoCivil);
		}
		
		// Obtém os dados básicos - tipos de estado
		BANCODADOS.sqlCmdDB("SELECT id, sigla, nome, status FROM tipo_estado",
							[], 
							INFOBASICAS.dadosBasicosTipoEstadoSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoEstadoSuccess: function (trans, res) {
		console.log("dadosBasicosTipoEstadoSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoEstado.length > 0) {
			INFOBASICAS.tipoEstado.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tEstado = {
				id: res.rows.item(i).id,
				sigla: res.rows.item(i).sigla,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoEstado.push(tEstado);
		}
		
		// Obtém os dados básicos - tipos de pais
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_pais",
							[], 
							INFOBASICAS.dadosBasicosTipoPaisSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoPaisSuccess: function (trans, res) {
		console.log("dadosBasicosTipoPaisSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoPais.length > 0) {
			INFOBASICAS.tipoPais.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tPais = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoPais.push(tPais);
		}
		
		// Obtém os dados básicos - tipos de habilidade
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_habilidades",
							[], 
							INFOBASICAS.dadosBasicosTipoHabilidadeSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoHabilidadeSuccess: function (trans, res) {
		console.log("dadosBasicosTipoHabilidadeSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoHabilidade.length > 0) {
			INFOBASICAS.tipoHabilidade.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tHabilidade = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoHabilidade.push(tHabilidade);
		}
		
		// Obtém os dados básicos - tipos de fonte de renda
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_fonte_renda",
							[], 
							INFOBASICAS.dadosBasicosTipoFonteRendaSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoFonteRendaSuccess: function (trans, res) {
		console.log("dadosBasicosTipoFonteRendaSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoFonteRenda.length > 0) {
			INFOBASICAS.tipoFonteRenda.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tFonteRenda = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoFonteRenda.push(tFonteRenda);
		}
		
		// Obtém os dados básicos - tipos de escolaridade
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_escolaridade",
							[], 
							INFOBASICAS.dadosBasicosTipoEscolaridadeSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoEscolaridadeSuccess: function (trans, res) {
		console.log("dadosBasicosTipoEscolaridadeSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoEscolaridade.length > 0) {
			INFOBASICAS.tipoEscolaridade.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tEscolaridade = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoEscolaridade.push(tEscolaridade);
		}
		
		// Obtém os dados básicos - tipos de situação profissional
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_situacao_profissional",
							[], 
							INFOBASICAS.dadosBasicosTipoSituacaoProfissionalSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoSituacaoProfissionalSuccess: function (trans, res) {
		console.log("dadosBasicosTipoSituacaoProfissionalSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoSituacaoProfissional.length > 0) {
			INFOBASICAS.tipoSituacaoProfissional.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tSituacaoProfissional = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoSituacaoProfissional.push(tSituacaoProfissional);
		}
		
		// Obtém os dados básicos - tipos de acompanhante de rua
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_acompanhante_rua",
							[], 
							INFOBASICAS.dadosBasicosTipoAcompanhanteRuaSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoAcompanhanteRuaSuccess: function (trans, res) {
		console.log("dadosBasicosTipoAcompanhanteRuaSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoAcompanhanteRua.length > 0) {
			INFOBASICAS.tipoAcompanhanteRua.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tAcompanhanteRua = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoAcompanhanteRua.push(tAcompanhanteRua);
		}
		
		// Obtém os dados básicos - tipos de parentesco
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_parentesco",
							[], 
							INFOBASICAS.dadosBasicosTipoParentescoSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoParentescoSuccess: function (trans, res) {
		console.log("dadosBasicosTipoParentescoSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoParentesco.length > 0) {
			INFOBASICAS.tipoParentesco.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tParentesco = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoParentesco.push(tParentesco);
		}
		
		// Obtém os dados básicos - tipos de condição de saúde
		BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_condicao_saude",
							[], 
							INFOBASICAS.dadosBasicosTipoCondicaoSaudeSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosBasicosTipoCondicaoSaudeSuccess: function (trans, res) {
		console.log("dadosBasicosTipoCondicaoSaudeSuccess");
		
		// Limpa a lista
		while (INFOBASICAS.tipoCondicaoSaude.length > 0) {
			INFOBASICAS.tipoCondicaoSaude.pop();
		}
		
		// Salva
		for (var i = 0; i < res.rows.length; i++) {
			var tCondicaoSaude = {
				id: res.rows.item(i).id,
				nome: res.rows.item(i).nome,
				status: res.rows.item(i).status,
			};
			INFOBASICAS.tipoCondicaoSaude.push(tCondicaoSaude);
		}
		
		// Continua com os dados de entrada
		INFOBASICAS.dadosBasicosSuccess();
	},
	
	dadosBasicosSuccess: function() {
		console.log("dadosBasicosSuccess");

		// Continua dados de entrada
		// Obtém as informações básicas
		BANCODADOS.sqlCmdDB("SELECT " +
							// Gênero
							"info_orientacao_sexual_genero, sexo_id, orientacao_sexual_id" +
							// Informações Adicionais
							", rg_rne, cpf, estado_civil_id, nome_pai, cidade_nascimento, nascimento_estado_id" +
							// Situação de Rua
							", dias_situaca_rua, meses_situacao_rua, anos_situacao_rua, outros_situacao_rua, local_onde_encontra, onde_morava_antes_rua, bairro, municipio_procendencia, procedencia_estado_id, procendencia_pais_id, acompanhante_rua_outros, tem_filhos, qtd_filhos" +
							", contato_familia, contato_parente, contato_familia_outros, referencia_familiar, telefone" +
							// Trabalho e Educação
							", trabalhando, profissao_atividade, habilidades_id, fonte_renda_id, tipo_escolaridade_id, escolaridades_outros, situacao_profissional_id" +
							// Saúde
							", condicao_saude_outros, gestante, possui_deficiencia, quais_deficiencias, alcool_droga, nome_drogas, frequencia_drogas" +
							" FROM cidadao" +
							" WHERE id = ?",
							[INFOBASICAS.cidadao_id], 
							INFOBASICAS.dadosEntradaInfoBasicasSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
    // ****************** Obtém as informações básicas de entrada *********************
    dadosEntrada: function(cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");

		// Salva funções de retorno
		INFOBASICAS.cbSuccess_f = cbSuccess;
		INFOBASICAS.cbFail_f = cbFail;
		
		// Salva cidadão
		//INFOBASICAS.cidadao_id = cidadao;
		INFOBASICAS.cidadao_id = CIDADAO.listaCidadaosId[CIDADAO.indiceListaCidadao];

		// Obtém dados básicos
		INFOBASICAS.dadosBasicos();
	},
	
	dadosEntradaInfoBasicasSuccess: function (trans, res) {
		console.log("dadosEntradaInfoBasicasSuccess");
		
		if (res.rows.length != 1) {
			INFOBASICAS.cbFail_f("As informações básicas do cidadão não foram encontradas");
		}
		else {
			// Armazena em memória
			var gc = {
				info_orientacao_sexual_genero: res.rows.item(0).info_orientacao_sexual_genero,
				sexo_id: res.rows.item(0).sexo_id,
				orientacao_sexual_id: res.rows.item(0).orientacao_sexual_id,
			};
			INFOBASICAS.generoCidadao = gc;
			
			var iac = {
				rg: res.rows.item(0).rg_rne,
				cpf: res.rows.item(0).cpf,
				estado_civil_id: res.rows.item(0).estado_civil_id,
				nome_pai: res.rows.item(0).nome_pai,
				cidade_nascimento: res.rows.item(0).cidade_nascimento,
				nascimento_estado_id: res.rows.item(0).nascimento_estado_id,
			};
			INFOBASICAS.infoAdicionaisCidadao = iac;
			
			var src = {
				dias_situaca_rua: res.rows.item(0).dias_situaca_rua,
				meses_situacao_rua: res.rows.item(0).meses_situacao_rua,
				anos_situacao_rua: res.rows.item(0).anos_situacao_rua,
				outros_situacao_rua: res.rows.item(0).outros_situacao_rua,
				local_onde_encontra: res.rows.item(0).local_onde_encontra,
				onde_morava_antes_rua: res.rows.item(0).onde_morava_antes_rua,
				bairro: res.rows.item(0).bairro,
				municipio_procendencia: res.rows.item(0).municipio_procendencia,
				procedencia_estado_id: res.rows.item(0).procedencia_estado_id,
				procedencia_pais_id: res.rows.item(0).procendencia_pais_id,
				acompanhante_rua_outros: res.rows.item(0).acompanhante_rua_outros,
				acompanhante_rua: [],
				
				tem_filhos: res.rows.item(0).tem_filhos,
				qtd_filhos: res.rows.item(0).qtd_filhos,
				// todo: falta implementar idade dos filhos
				contato_familia: res.rows.item(0).contato_familia,
				contato_parente: res.rows.item(0).contato_parente,
				quais_familiares: [],
				
				contato_familia_outros: res.rows.item(0).contato_familia_outros,
				referencia_familiar: res.rows.item(0).referencia_familiar,
				telefone: res.rows.item(0).telefone,
			};
			INFOBASICAS.situacaoRuaCidadao = src;
			
			var tec = {
				trabalhando: res.rows.item(0).trabalhando,
				profissao_atividade: res.rows.item(0).profissao_atividade,
				habilidades_id: res.rows.item(0).habilidades_id,
				fonte_renda_id: res.rows.item(0).fonte_renda_id,
				tipo_escolaridade_id: res.rows.item(0).tipo_escolaridade_id,
				escolaridades_outros: res.rows.item(0).escolaridades_outros,
				situacao_profissional_id: res.rows.item(0).situacao_profissional_id,
			};
			INFOBASICAS.trabalhoEducacaoCidadao = tec;
			
			var sc = {
				// todo: Condições de saúde
				condicoes_saude: [],
				
				condicoes_saude_outros: res.rows.item(0).condicoes_saude_outros,
				gestante: res.rows.item(0).gestante,
				possui_deficiencia: res.rows.item(0).possui_deficiencia,
				quais_deficiencias: res.rows.item(0).quais_deficiencias,
				alcool_droga: res.rows.item(0).alcool_droga,
				nome_drogas: res.rows.item(0).nome_drogas,
				frequencia_drogas: res.rows.item(0).frequencia_drogas,
			}
			INFOBASICAS.saudeCidadao = sc;
			
		// Obtém os dados - acompanhantes da rua
		BANCODADOS.sqlCmdDB("SELECT tipo_acompanhante_rua_id FROM acompanhantes_rua where cidadao_id = ?",
							[INFOBASICAS.cidadao_id], 
							INFOBASICAS.dadosEntradaAcompanhanteRuaSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
		}
	},
	
	dadosEntradaAcompanhanteRuaSuccess: function (trans, res) {
		console.log("dadosEntradaAcompanhanteRuaSuccess");
		
		// Salva os dados
		var lista = [];
		for (var i = 0; i < res.rows.length; i++) {
			lista.push(res.rows.item(i).tipo_acompanhante_rua_id);
		}
		INFOBASICAS.situacaoRuaCidadao.acompanhante_rua = lista;

		// Obtém os dados - quais familiares
		BANCODADOS.sqlCmdDB("SELECT tipo_parentesco_id FROM contato_familia where cidadao_id = ?",
							[INFOBASICAS.cidadao_id], 
							INFOBASICAS.dadosEntradaFamiliarSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosEntradaFamiliarSuccess: function (trans, res) {
		console.log("dadosEntradaFamiliarSuccess");

		// Salva os dados
		var lista = [];
		for (var i = 0; i < res.rows.length; i++) {
			lista.push(res.rows.item(i).tipo_parentesco_id);
		}
		INFOBASICAS.situacaoRuaCidadao.quais_familiares = lista;

		// Obtém os dados - condições de saúde
		BANCODADOS.sqlCmdDB("SELECT tipo_condicao_saude_id FROM condicao_saude where cidadao_id = ?",
							[INFOBASICAS.cidadao_id], 
							INFOBASICAS.dadosEntradaCondicoesSaudeSuccess, 
							INFOBASICAS.dadosEntradaInfoBasicasFail);
	},
	
	dadosEntradaCondicoesSaudeSuccess: function (trans, res) {
		console.log("dadosEntradaCondicoesSaudeSuccess");

		// Salva os dados
		var lista = [];
		for (var i = 0; i < res.rows.length; i++) {
			lista.push(res.rows.item(i).tipo_condicao_saude_id);
		}
		INFOBASICAS.saudeCidadao.condicoes_saude = lista;

		// Retorna
		//INFOBASICAS.cbSuccess_f();
		PageManager.loadTmpl('info_basicas');
	},
	
	dadosEntradaInfoBasicasFail: function (err) {
		console.log("dadosEntradaInfoBasicasFail");
		
		// Retorna
		INFOBASICAS.cbFail_f(err);
	},
	
    // ****************** Obtém os dados de um cidadão *********************
    salvaCidadao: function(cidadao, cbSuccess, cbFail) {
	    console.log("salvaCidadao");
		// ** Dados
		// 				
		// ** Dados
	},
}
