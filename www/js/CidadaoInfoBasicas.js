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
		alert("Buscando lista de tipos de sexo no DTO");
		BD_DTO.tipo_sexo_carrega(INFOBASICAS.dadosBasicosTipoSexoSuccess, INFOBASICAS.dadosEntradaInfoBasicasFail)
	},
	
	dadosBasicosTipoSexoSuccess: function (trans, res) {
		console.log("dadosBasicosTipoSexoSuccess");
		
		alert("Busca OK");
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
							", cpf, estado_civil_id, nome_pai, cidade_nascimento, nascimento_estado_id" +
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
		INFOBASICAS.cidadao_id = cidadao;

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
				procedencia_pais_id: res.rows.item(0).procedencia_pais_id,
				acompanhante_rua_outros: res.rows.item(0).acompanhante_rua_outros,
				// todo: com quem você fica na rua
				acompanhante_rua: [],
				
				tem_filhos: res.rows.item(0).tem_filhos,
				qtd_filhos: res.rows.item(0).qtd_filhos,
				contato_familia: res.rows.item(0).contato_familia,
				contato_parente: res.rows.item(0).contato_parente,
				// todo: com quais familiares
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
		
		// Testes
		var Print = "Informações básicas:\r\n";
		// GÊNERO
		Print += "GÊNERO\r\n";
		Print += "Sexo: " + INFOBASICAS.tipoSexo[INFOBASICAS.generoCidadao.sexo_id].nome + "\r\n";
		Print += "Informação de orientação sexual: " + (INFOBASICAS.generoCidadao.info_orientacao_sexual_genero == 1 ? "Sim" : "Não") + "\r\n";
		if (INFOBASICAS.generoCidadao.orientacao_sexual_id == null) {
			Print += "Orientação sexual: " + "NÃO INFORMADA" + "\r\n";
		}
		else {
			Print += "Orientação sexual: " + INFOBASICAS.tipoOrientacaoSexual[INFOBASICAS.generoCidadao.orientacao_sexual_id].nome + "\r\n";
		}
		
		// INFORMAÇÕES ADICIONAIS
		Print += "INFORMAÇÕES ADICIONAIS\r\n";
		Print += "CPF: " + INFOBASICAS.infoAdicionaisCidadao.cpf + "\r\n";
		if (INFOBASICAS.infoAdicionaisCidadao.estado_civil_id == null) {
			Print += "Estado Civil: " + "NÃO INFORMADO" + "\r\n";
		}
		else {
			Print += "Estado Civil: " + INFOBASICAS.tipoEstadoCivil[INFOBASICAS.infoAdicionaisCidadao.estado_civil_id].nome + "\r\n";
		}
		Print += "Nome do pai: " + INFOBASICAS.infoAdicionaisCidadao.nome_pai + "\r\n";
		Print += "Cidade de Nascimento: " + INFOBASICAS.infoAdicionaisCidadao.cidade_nascimento + "\r\n";
		if (INFOBASICAS.infoAdicionaisCidadao.nascimento_estado_id == null) {
			Print += "Estado de Nascimento: " + "NÃO INFORMADO" + "\r\n";
		}
		else {
			Print += "Estado de Nascimento: " + INFOBASICAS.tipoEstado[INFOBASICAS.infoAdicionaisCidadao.nascimento_estado_id].nome + "\r\n";
		}

		// SITUAÇÃO DE RUA
		Print += "SITUAÇÃO DE RUA\r\n";
		Print += "Quanto tempo: " + INFOBASICAS.situacaoRuaCidadao.dias_situaca_rua + " dias, " + INFOBASICAS.situacaoRuaCidadao.meses_situacao_rua + " meses e " + INFOBASICAS.situacaoRuaCidadao.anos_situacao_rua + " anos " +"\r\n";
		Print += "Outros: " + INFOBASICAS.situacaoRuaCidadao.outros_situacao_rua + "\r\n";
		Print += "Local que se encontra: " + INFOBASICAS.situacaoRuaCidadao.local_onde_encontra + "\r\n";
		Print += "Onde morava: " + INFOBASICAS.situacaoRuaCidadao.onde_morava_antes_rua + "\r\n";
		Print += "Bairro: " + INFOBASICAS.situacaoRuaCidadao.bairro + "\r\n";
		Print += "Município de procedência: " + INFOBASICAS.situacaoRuaCidadao.municipio_procendencia + "\r\n";
		if (INFOBASICAS.infoAdicionaisCidadao.nascimento_estado_id == null) {
			Print += "Estado de Nascimento: " + "NÃO INFORMADO" + "\r\n";
		}
		else {
			Print += "Estado de procedência: " + INFOBASICAS.tipoEstado[INFOBASICAS.situacaoRuaCidadao.procedencia_estado_id].nome + "\r\n";
		}
		if (INFOBASICAS.infoAdicionaisCidadao.procedencia_pais_id == null) {
			Print += "País de procedência: " + "NÃO INFORMADO" + "\r\n";
		}
		else {
			Print += "País de procedência: " + INFOBASICAS.tipoPais[INFOBASICAS.situacaoRuaCidadao.procedencia_pais_id].nome + "\r\n";
		}
		Print += "Com quem fica na rua:\r\n";
		for (var i = 0; i < INFOBASICAS.situacaoRuaCidadao.acompanhante_rua.length; i++) {
			Print += INFOBASICAS.tipoAcompanhanteRua[INFOBASICAS.situacaoRuaCidadao.acompanhante_rua[i]].nome + "\r\n";
		}
		Print += "Outros acompanhantes: " + INFOBASICAS.situacaoRuaCidadao.acompanhante_rua_outros + "\r\n";
		Print += "Tem filhos: " + (INFOBASICAS.situacaoRuaCidadao.tem_filhos == 1 ? "Sim" : "Não") + "\r\n";
		Print += "Quantos filhos: " + INFOBASICAS.situacaoRuaCidadao.qtd_filhos + "\r\n";
		Print += "Tem contato com a família: " + (INFOBASICAS.situacaoRuaCidadao.contato_familia == 1 ? "Sim" : "Não") + "\r\n";
		Print += "O contato é parente: " + (INFOBASICAS.situacaoRuaCidadao.contato_parente == 1 ? "Sim" : "Não") + "\r\n";
		Print += "Quais familiares:\r\n";
		for (var i = 0; i < INFOBASICAS.situacaoRuaCidadao.quais_familiares.length; i++) {
			Print += INFOBASICAS.tipoParentesco[INFOBASICAS.situacaoRuaCidadao.quais_familiares[i]].nome + "\r\n";
		}
		Print += "Outros familiares: " + INFOBASICAS.situacaoRuaCidadao.contato_familia_outros + "\r\n";
		Print += "Referência familiar: " + INFOBASICAS.situacaoRuaCidadao.referencia_familiar + "\r\n";
		Print += "Telefone: " + INFOBASICAS.situacaoRuaCidadao.telefone + "\r\n";
		
		// TRABALHO E EDUCAÇÃO
		Print += "TRABALHO E EDUCAÇÃO\r\n";
		Print += "Está trabalhando atualmente: " + (INFOBASICAS.trabalhoEducacaoCidadao.trabalhando == 1 ? "Sim" : "Não") + "\r\n";
		Print += "Profissão/Atividade: " + INFOBASICAS.trabalhoEducacaoCidadao.profissao_atividade + "\r\n";
		if (INFOBASICAS.trabalhoEducacaoCidadao.habilidades_id != null) {
			Print += "Outras habilidades: " + INFOBASICAS.tipoHabilidade[INFOBASICAS.trabalhoEducacaoCidadao.habilidades_id].nome + "\r\n";
		}
		else {
			Print += "Outras habilidades: " + "NÃO INFORMADO" + "\r\n";
		}
		if (INFOBASICAS.trabalhoEducacaoCidadao.fonte_renda_id != null) {
			Print += "Fonte de renda: " + INFOBASICAS.tipoFonteRenda[INFOBASICAS.trabalhoEducacaoCidadao.fonte_renda_id].nome + "\r\n";
		}
		else {
			Print += "Fonte de renda: " + "NÃO INFORMADA" + "\r\n";
		}
		if (INFOBASICAS.trabalhoEducacaoCidadao.tipo_escolaridade_id != null) {
			Print += "Escolaridade: " + INFOBASICAS.tipoEscolaridade[INFOBASICAS.trabalhoEducacaoCidadao.tipo_escolaridade_id].nome + "\r\n";
		}
		else {
			Print += "Escolaridade: " + "NÃO INFORMADA" + "\r\n";
		}
		Print += "Outros (escolaridade): " + INFOBASICAS.trabalhoEducacaoCidadao.escolaridades_outros + "\r\n";
		if (INFOBASICAS.trabalhoEducacaoCidadao.situacao_profissional_id != null) {
			Print += "Situação Profissional: " + INFOBASICAS.tipoSituacaoProfissional[INFOBASICAS.trabalhoEducacaoCidadao.situacao_profissional_id].nome + "\r\n";
		}
		else {
			Print += "Situação Profissional: " + "NÃO INFORMADA" + "\r\n";
		}
		
		// CONDIÇÕES DE SAÚDE
		Print += "CONDIÇÕES DE SAÚDE\r\n";
		Print += "Condições de Saúde:\r\n";
		for (var i = 0; i < INFOBASICAS.saudeCidadao.condicoes_saude.length; i++) {
			Print += INFOBASICAS.tipoCondicaoSaude[INFOBASICAS.saudeCidadao.condicoes_saude[i]].nome + "\r\n";
		}
		Print += "Outros: " + INFOBASICAS.saudeCidadao.condicoes_saude_outros + "\r\n";
		Print += "Gestante: " + (INFOBASICAS.saudeCidadao.gestante == 1 ? "Sim" : "Não") + "\r\n";
		Print += "Possui deficiência: " + (INFOBASICAS.saudeCidadao.possui_deficiencia == 1 ? "Sim" : "Não") + "\r\n";
		Print += "Quais deficiências: " + INFOBASICAS.saudeCidadao.quais_deficiencias + "\r\n";
		Print += "Usuário de álcool ou drogas: " + (INFOBASICAS.saudeCidadao.alcool_droga == 1 ? "Sim" : "Não") + "\r\n";
		Print += "Quais drogas: " + INFOBASICAS.saudeCidadao.nome_drogas + "\r\n";
		Print += "Qual frequência: " + INFOBASICAS.saudeCidadao.frequencia_drogas + "\r\n";

		Print += "\r\n";
		console.log (Print);
		// Testes

		// Retorna
		INFOBASICAS.cbSuccess_f();
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
