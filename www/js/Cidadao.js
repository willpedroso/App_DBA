var CIDADAO = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	usuario_id: null,
	indiceListaCidadao: null,
	
	listaCidadaosId: [],
	listaCidadaosDados: [],
	listaCidadaosDadosBusca: [],
	listaPontosServico: [],
	listaTipoMotivoInativacao: [],
	auxCidadaoDados: null,
	countListaCidadaosId: 0,
	equipe_coordenacao_id: null,

    // ****************** Obtém os dados de entrada *********************
	// 				      Lista de cidadãos do usuário
    // ******************************************************************
    dadosEntrada: function(usuario, cbSuccess, cbFail) {
	    console.log("dadosEntrada");
		
		// Salva funções de retorno
		CIDADAO.cbSuccess_f = cbSuccess;
		CIDADAO.cbFail_f = cbFail;
		
		// Salva identificação do usuário
		CIDADAO.usuario_id = usuario;
		
		// Prepara a busca por cidadãos
		CIDADAO.equipe_coordenacao_id = null;
		if (USUARIO.perfil_codigo == "TSAU" ||
			USUARIO.perfil_codigo == "TTRA" ||
			USUARIO.perfil_codigo == "TSOC" ||
			USUARIO.perfil_codigo == "CORD") {
			// Usuário é técnico ou coordenador
			if (USUARIO.perfil_codigo == "TSAU" ||
				USUARIO.perfil_codigo == "TTRA" ||
				USUARIO.perfil_codigo == "TSOC") {
				// Usuário é técnico, obtém a "equipe_coordenacao_id" em "equipe_tecnica"
				BANCODADOS.sqlCmdDB("SELECT equipe_coordenacao_id FROM equipe_tecnica WHERE usuario_id = ? and status = ?",
									[CIDADAO.usuario_id, 1], 
									CIDADAO.dadosEntradaEquipeCoordenacaoSuccess, 
									CIDADAO.dadosEntradaFail);
			}
			else
			{
				// Usuário é coordenador, obtém a "equipe_coordenacao_id" em "equipe_coordenacao" (todo: testar "AS equipe_coordenacao_id")
				BANCODADOS.sqlCmdDB("SELECT id AS equipe_coordenacao_id FROM equipe_coordenacao WHERE usuario_id = ? and status = ?",
									[CIDADAO.usuario_id, 1], 
									CIDADAO.dadosEntradaEquipeCoordenacaoSuccess, 
									CIDADAO.dadosEntradaFail);
			}
		}
		else
		{
			// Não precisa de "equipe_coordenacao_id" para listar cidadãos
			// Obtém a lista de pontos de serviço
			BD_DTO.ponto_servico_carrega(CIDADAO.dadosEntradaPontosServicoSuccess, CIDADAO.dadosEntradaFail);
		}
	},
	
	dadosEntradaEquipeCoordenacaoSuccess: function(trans, res) {
		console.log("dadosEntradaEquipeCoordenacaoSuccess");
		
		if (res.rows.length != 1) {
			// Erro: usuário não foi encontrado na equipe técnica (todo: revisar)
			CIDADAO.cbFail_f("O usuário não foi encontrado na equipe técnica");
		}
		else {
			CIDADAO.equipe_coordenacao_id = res.rows.item(0).equipe_coordenacao_id;
			// Obtém a lista de pontos de serviço
			BD_DTO.ponto_servico_carrega(CIDADAO.dadosEntradaPontosServicoSuccess, CIDADAO.dadosEntradaFail);
		}
	},
	
	dadosEntradaPontosServicoSuccess: function (trans, res) {
		console.log("dadosEntradaPontosServicoSuccess");

		CIDADAO.listaPontosServico = BD_DTO.ponto_servico_data;

		// Obtém a lista de tipos de motivo de inativação
		BD_DTO.tipo_motivo_inativacao_carrega(CIDADAO.dadosEntradaTipoMotivoInativacaoSuccess, CIDADAO.dadosEntradaFail);
	},
	
	dadosEntradaTipoMotivoInativacaoSuccess: function (trans, res) {
		console.log("dadosEntradaTipoMotivoInativacaoSuccess");
		
		CIDADAO.listaTipoMotivoInativacao = BD_DTO.tipo_motivo_inativacao_data;

		// Obtém a lista de cidadãos
		if (CIDADAO.equipe_coordenacao_id == null) {
			// lista todos os cidadãos
			// todo: regras:
			//		 1. Inativo / Fora do Programa
			//				.todo: apenas a tela de situação DBA pode ser editada, com restrições
			//		 2. Inativo / No Programa
			//				.IMPOSSÍVEL
			//		 3. Ativo / Fora do Programa
			//				.todo: verificar o caso do cidadão que é retirado do programa depois de pertencer a uma equipe técnica
			//		 4. Ativo / No Programa
			//				.uso normal
			BANCODADOS.sqlCmdDB("SELECT cidadao_id FROM equipe_cidadao WHERE status = ?", 
								[1], 
								CIDADAO.dadosEntradaCidadaosSuccess, 
								CIDADAO.dadosEntradaFail);
		}
		else {
			// lista cidadãos da coordenação, que estejam no programa (programa_dba = 1)
			BANCODADOS.sqlCmdDB("SELECT cidadao_id FROM equipe_cidadao WHERE equipe_coordenacao_id = ? AND status = ?", 
								[CIDADAO.equipe_coordenacao_id, 1], 
								CIDADAO.dadosEntradaCidadaosSuccess, 
								CIDADAO.dadosEntradaFail);
		}
	},
	
	dadosEntradaCidadaosSuccess: function(trans, res) {
		console.log("dadosEntradaCidadaosSuccess");
		
		// Limpa a lista de cidadãos
		while (CIDADAO.listaCidadaosId.length > 0) {
			CIDADAO.listaCidadaosId.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			CIDADAO.listaCidadaosId.push(res.rows.item(i).cidadao_id);
		}
		// Obtém detalhes dos cidadãos
		CIDADAO.initDadosCidadaos();
	},
	
	initDadosCidadaos: function() {
		console.log("initDadosCidadaos");

		CIDADAO.countListaCidadaosId = 0;
		// Limpa a lista de dados dos cidadãos
		while(CIDADAO.listaCidadaosDados.length > 0) {
			CIDADAO.listaCidadaosDados.pop();
		}

		// Obtém dados dos cidadãos
		if (CIDADAO.equipe_coordenacao_id == null) {
			BANCODADOS.sqlCmdDB("SELECT id, nome, nome_social, nome_mae, dia_nascimento, mes_nascimento, ano_nascimento, situacao_cadastral, sisrua, programa_dba, ponto_servico_id, prioridade FROM cidadao WHERE id = ?", [CIDADAO.listaCidadaosId[CIDADAO.countListaCidadaosId++]], CIDADAO.dadosEntradaDadosCidadaosSuccess, CIDADAO.dadosEntradaFail);
		}
		else {
			BANCODADOS.sqlCmdDB("SELECT id, nome, nome_social, nome_mae, dia_nascimento, mes_nascimento, ano_nascimento, situacao_cadastral, sisrua, programa_dba, ponto_servico_id, prioridade FROM cidadao WHERE programa_dba = ? AND id = ?", [1, CIDADAO.listaCidadaosId[CIDADAO.countListaCidadaosId++]], CIDADAO.dadosEntradaDadosCidadaosSuccess, CIDADAO.dadosEntradaFail);
		}
	},
	
	dadosEntradaDadosCidadaosSuccess: function (trans, res) {
		console.log("dadosEntradaDadosCidadaosSuccess");
		
		var cdados = {
			id: res.rows.item(0).id,
			nome: res.rows.item(0).nome,
			nome_social: res.rows.item(0).nome_social,
			nome_mae: res.rows.item(0).nome_mae,
			dia_nascimento: res.rows.item(0).dia_nascimento,
			mes_nascimento: res.rows.item(0).mes_nascimento,
			ano_nascimento: res.rows.item(0).ano_nascimento,
			situacao_cadastral: res.rows.item(0).situacao_cadastral,
			sisrua: res.rows.item(0).sisrua,
			programa_dba: res.rows.item(0).programa_dba,
			ponto_servico_id: res.rows.item(0).ponto_servico_id,
			prioridade: res.rows.item(0).prioridade,
		};
		CIDADAO.listaCidadaosDados.push(cdados);
		if (CIDADAO.countListaCidadaosId == CIDADAO.listaCidadaosId.length) {
			// Todos os cidadãos já foram processados
			
			// Testes
			var Print = "Lista de Cidadãos" + "\r\n";
			for (var i = 0; i < CIDADAO.listaCidadaosDados.length; i++) {
				Print += "Cidadão: " + i + "\r\n";
				Print += "Nome: " + CIDADAO.listaCidadaosDados[i].nome + "\r\n";
				Print += "Nome Social: " +  CIDADAO.listaCidadaosDados[i].nome_social + "\r\n";
				Print += "Nome da Mãe: " +  CIDADAO.listaCidadaosDados[i].nome_mae + "\r\n";
				Print += "Data do Nascimento: " +  CIDADAO.listaCidadaosDados[i].dia_nascimento + "/" + CIDADAO.listaCidadaosDados[i].mes_nascimento + "/" + CIDADAO.listaCidadaosDados[i].ano_nascimento + "\r\n";
				Print += "Situação Cadastral: " +  (CIDADAO.listaCidadaosDados[i].situacao_cadastral == 0 ? "inativo" : "ativo") + "\r\n";
				Print += "Número SISA: " +  CIDADAO.listaCidadaosDados[i].sisrua + "\r\n";
				Print += "Programa DBA: " +  (CIDADAO.listaCidadaosDados[i].programa_dba == 0 ? "Não" : "Sim") + "\r\n";
				Print += "\r\n";
			}
			console.log (Print);
			// Testes
			
			// Retorna
			CIDADAO.cbSuccess_f();
		}
		else {
			if (CIDADAO.equipe_coordenacao_id == null) {
				BANCODADOS.sqlCmdDB("SELECT id, nome, nome_social, nome_mae, dia_nascimento, mes_nascimento, ano_nascimento, situacao_cadastral, sisrua, programa_dba, ponto_servico_id, prioridade FROM cidadao WHERE id = ?", [CIDADAO.listaCidadaosId[CIDADAO.countListaCidadaosId++]], CIDADAO.dadosEntradaDadosCidadaosSuccess, CIDADAO.dadosEntradaFail);
			}
			else {
				BANCODADOS.sqlCmdDB("SELECT id, nome, nome_social, nome_mae, dia_nascimento, mes_nascimento, ano_nascimento, situacao_cadastral, sisrua, programa_dba, ponto_servico_id, prioridade FROM cidadao WHERE programa_dba = ? AND id = ?", [1, CIDADAO.listaCidadaosId[CIDADAO.countListaCidadaosId++]], CIDADAO.dadosEntradaDadosCidadaosSuccess, CIDADAO.dadosEntradaFail);
			}
		}
	},
	
	dadosEntradaFail: function(err) {
		console.log("");

		CIDADAO.cbFail_f (err);
	},
	
    // ****************** Obtém os dados de identificação de um cidadão *********************
	// todo: avaliar a necessidade, pois o próprio HTML pode indexar CIDADAO.listaCidadaosDados
    dadosCidadao: function(indice, cbSuccess, cbFail) {
	    console.log("dadosCidadao");
		
		// Salva o índice
		CIDADAO.indiceListaCidadao = indice;

		// Retorna os dados do cidadão - pela listaCidadaosDadosBusca
		return CIDADAO.listaCidadaosDadosBusca[indice];
	},
	
    // ****************** procura cidadão na lista *********************
    buscaCidadao: function(buscaTxt, ativos, inativos, cbSuccess, cbFail) {
		console.log("buscaCidadao");
		
		// Limpa a lista de busca
		while (CIDADAO.listaCidadaosDadosBusca.length > 0) {
			CIDADAO.listaCidadaosDadosBusca.pop();
		}
		
		// Procura
		if (buscaTxt == "") {
			if ((ativos && inativos) || (!ativos && !inativos)) {
				CIDADAO.listaCidadaosDadosBusca = CIDADAO.listaCidadaosDados.slice();
			}
			else {
				for (var i = 0; i < CIDADAO.listaCidadaosDados.length; i++) {
					if (!ativos) {
						// apenas os inativos
						if (CIDADAO.listaCidadaosDados[i].situacao_cadastral == 0) {
							CIDADAO.listaCidadaosDadosBusca.push(CIDADAO.listaCidadaosDados[i]);
						}
					}
					else // (!inativos) 
					{
						// apenas os ativos
						if (CIDADAO.listaCidadaosDados[i].situacao_cadastral == 1) {
							CIDADAO.listaCidadaosDadosBusca.push(CIDADAO.listaCidadaosDados[i]);
						}
					}
				}
			}
		}
		else {
			for (var i = 0; i < CIDADAO.listaCidadaosDados.length; i++) {
				//if (CIDADAO.listaCidadaosDados[i].nome.search(buscaTxt) != -1) {
				if (CIDADAO.listaCidadaosDados[i].nome.search(new RegExp(buscaTxt, "i")) != -1) {
					// Encontrou, verifica ativos/inativos
					if ((ativos && inativos) || (!ativos && !inativos)) {
						CIDADAO.listaCidadaosDadosBusca.push(CIDADAO.listaCidadaosDados[i]);
					}
					else if (!ativos) {
						// apenas os inativos
						if (CIDADAO.listaCidadaosDados[i].situacao_cadastral == 0) {
							CIDADAO.listaCidadaosDadosBusca.push(CIDADAO.listaCidadaosDados[i]);
						}
					}
					else // (!inativos) 
					{
						// apenas os ativos
						if (CIDADAO.listaCidadaosDados[i].situacao_cadastral == 1) {
							CIDADAO.listaCidadaosDadosBusca.push(CIDADAO.listaCidadaosDados[i]);
						}
					}
				}
			}
		}
	},
	
    // ****************** Salva os dados de identificação de um cidadão *********************
	// Salva no banco e atualiza memória
	salvaCidadao: function(nome, nome_social, nome_mae, numero_sisa, dia_nascimento, mes_nascimento, ano_nascimento, cbSuccess, cbFail) {
		console.log("salvaCidadao");
		
		// Salva funções de retorno
		CIDADAO.cbSuccess_f = cbSuccess;
		CIDADAO.cbFail_f = cbFail;

		// Salva o índice
		//CIDADAO.indiceListaCidadao = indice;
		
		// Salva os dados
		var cdados = {
			nome: nome,
			nome_social: nome_social,
			nome_mae: nome_mae,
			dia_nascimento: dia_nascimento,
			mes_nascimento: mes_nascimento,
			ano_nascimento: ano_nascimento,
			sisrua: numero_sisa,
		};
		CIDADAO.auxCidadaoDados = cdados;
		
		// Salva no banco de dados
		BANCODADOS.sqlCmdDB("UPDATE cidadao SET nome = ?, nome_social = ?, nome_mae = ?, sisrua = ?, dia_nascimento = ?, mes_nascimento = ?, ano_nascimento = ? WHERE id = ?",
							[
							nome,
							nome_social,
							nome_mae,
							numero_sisa,
							dia_nascimento,
							mes_nascimento,
							ano_nascimento,
							CIDADAO.listaCidadaosId[CIDADAO.indiceListaCidadao]
							], CIDADAO.salvaCidadaoSuccess, CIDADAO.salvaCidadaoFail);
	},
	
	salvaCidadaoSuccess: function (trans, res) {
		console.log("salvaCidadaoSuccess");
		
		// Atualiza dados na memória
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome = CIDADAO.auxCidadaoDados.nome;
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_social = CIDADAO.auxCidadaoDados.nome_social;
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_mae = CIDADAO.auxCidadaoDados.nome_mae;
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].sisrua = CIDADAO.auxCidadaoDados.sisrua;
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].dia_nascimento = CIDADAO.auxCidadaoDados.dia_nascimento;
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].mes_nascimento = CIDADAO.auxCidadaoDados.mes_nascimento;
		CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].ano_nascimento = CIDADAO.auxCidadaoDados.ano_nascimento;

		$('.msgParabens').removeAttr('style');
		$('html, body').animate({scrollTop:0}, 'slow');
		
		atualizaFichaCidadao();
		
		// Retorna
		CIDADAO.cbSuccess_f();
	},
	
	salvaCidadaoFail: function (err) {
		console.log("salvaCidadaoFail");
		
		// Retorna
		CIDADAO.cbFail_f(err);
	}
}
