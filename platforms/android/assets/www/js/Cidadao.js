﻿var CIDADAO = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	usuario_id: null,
	indiceListaCidadao: null,
	
	listaCidadaosId: [],
	listaCidadaosDados: [],
	listaCidadaosDadosBusca: [],
	auxCidadaoDados: null,
	countListaCidadaosId: 0,

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
		
		// Obtém a coordenação da qual pertence o usuário - todo: confirmar status = 1 na busca
		// todo: testes
		//BANCODADOS.sqlCmdDB("SELECT equipe_coordenacao_id, dt_criacao FROM equipe_tecnica WHERE usuario_id = ? and status = ?", [CIDADAO.usuario_id, 1], CIDADAO.dadosEntradaEquipeCoordenacaoSuccess, CIDADAO.dadosEntradaFail);
		BANCODADOS.sqlCmdDB("SELECT equipe_coordenacao_id, dt_criacao FROM equipe_tecnica WHERE usuario_id = ? and status = ?", [34, 1], CIDADAO.dadosEntradaEquipeCoordenacaoSuccess, CIDADAO.dadosEntradaFail);
	},
	
	dadosEntradaEquipeCoordenacaoSuccess: function(trans, res) {
		console.log("dadosEntradaEquipeCoordenacaoSuccess");
		
		if (res.rows.length != 1) {
			// Erro: usuário não foi encontrado na equipe técnica (todo: revisar)
			CIDADAO.cbFail_f("O usuário não foi encontrado na equipe técnica");
		}
		else {
			// Obtém a lista de cidadãos
			BANCODADOS.sqlCmdDB("SELECT cidadao_id FROM equipe_cidadao WHERE equipe_coordenacao_id = ?", [res.rows.item(0).equipe_coordenacao_id], CIDADAO.dadosEntradaCidadaosSuccess, CIDADAO.dadosEntradaFail);
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
		BANCODADOS.sqlCmdDB("SELECT id, nome, nome_social, nome_mae, dia_nascimento, mes_nascimento, ano_nascimento, situacao_cadastral, sisrua FROM cidadao WHERE id = ?", [CIDADAO.listaCidadaosId[CIDADAO.countListaCidadaosId++]], CIDADAO.dadosEntradaDadosCidadaosSuccess, CIDADAO.dadosEntradaFail);
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
				Print += "\r\n";
			}
			console.log (Print);
			// Testes
			
			// Retorna
			CIDADAO.cbSuccess_f();
		}
		else {
			BANCODADOS.sqlCmdDB("SELECT nome, nome_social, nome_mae, dia_nascimento, mes_nascimento, ano_nascimento, situacao_cadastral, sisrua FROM cidadao WHERE id = ?", [CIDADAO.listaCidadaosId[CIDADAO.countListaCidadaosId++]], CIDADAO.dadosEntradaDadosCidadaosSuccess, CIDADAO.dadosEntradaFail);
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
		
		// Retorna os dados do cidadão - pela listaCidadaosDadosBusca
		return CIDADAO.listaCidadaosDadosBusca[indice];
	},
	
    // ****************** procura cidadão na lista *********************
    buscaCidadao: function(buscaTxt, cbSuccess, cbFail) {
		console.log("buscaCidadao");
		
		// Limpa a lista de busca
		while (CIDADAO.listaCidadaosDadosBusca.length > 0) {
			CIDADAO.listaCidadaosDadosBusca.pop();
		}
		
		// Procura
		if (buscaTxt == "") {
			CIDADAO.listaCidadaosDadosBusca = CIDADAO.listaCidadaosDados.slice();
		}
		else {
			for (var i = 0; i < CIDADAO.listaCidadaosDados.length; i++) {
				//if (CIDADAO.listaCidadaosDados[i].nome.search(buscaTxt) != -1) {
				if (CIDADAO.listaCidadaosDados[i].nome.search(new RegExp(buscaTxt, "i")) != -1) {
					// Encontrou, coloca na lista de busca
					CIDADAO.listaCidadaosDadosBusca.push(CIDADAO.listaCidadaosDados[i]);
				}
			}
		}
	},
	
    // ****************** Salva os dados de identificação de um cidadão *********************
	// Salva no banco e atualiza memória
	salvaCidadao: function(indice, nome, nome_social, nome_mae, numero_sisa, dia_nascimento, mes_nascimento, ano_nascimento, cbSuccess, cbFail) {
		console.log("salvaCidadao");
		
		// Salva funções de retorno
		CIDADAO.cbSuccess_f = cbSuccess;
		CIDADAO.cbFail_f = cbFail;

		// Salva o índice
		CIDADAO.indiceListaCidadao = indice;
		
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
		BANCODADOS.sqlCmdDB("UPDATE cidadao SET nome = ?, nome_social = ?, nome_mae = ?, sisrua = ?, dia_nascimento = ?, mes_nascimento = ?, ano_nascimento = ? WHERE cidadao_id = ?",
							[
							CIDADAO.listaCidadaosDados[indice].nome,
							CIDADAO.listaCidadaosDados[indice].nome_social,
							CIDADAO.listaCidadaosDados[indice].nome_mae,
							CIDADAO.listaCidadaosDados[indice].sisrua,
							CIDADAO.listaCidadaosDados[indice].dia_nascimento,
							CIDADAO.listaCidadaosDados[indice].mes_nascimento,
							CIDADAO.listaCidadaosDados[indice].ano_nascimento,
							CIDADAO.listaCidadaosId[indice]
							], CIDADAO.salvaCidadaoSuccess, CIDADAO.salvaCidadaoFail);
	},
	
	salvaCidadaoSuccess: function (trans, res) {
		console.log("salvaCidadaoSuccess");
		
		// Atualiza dados na memória
		CIDADAO.listaCidadaosDados[CIDADAO.indiceListaCidadao].nome = CIDADAO.auxCidadaoDados.nome;
		CIDADAO.listaCidadaosDados[CIDADAO.indiceListaCidadao].nome_social = CIDADAO.auxCidadaoDados.nome_social;
		CIDADAO.listaCidadaosDados[CIDADAO.indiceListaCidadao].nome_mae = CIDADAO.auxCidadaoDados.nome_mae;
		CIDADAO.listaCidadaosDados[CIDADAO.indiceListaCidadao].sisrua = CIDADAO.auxCidadaoDados.sisrua;
		CIDADAO.listaCidadaosDados[CIDADAO.indiceListaCidadao].dia_nascimento = CIDADAO.auxCidadaoDados.dia_nascimento;
		CIDADAO.listaCidadaosDados[CIDADAO.indiceListaCidadao].mes_nascimento = CIDADAO.auxCidadaoDados.mes_nascimento;
		CIDADAO.listaCidadaosDados[CIDADAO.indiceListaCidadao].ano_nascimento = CIDADAO.auxCidadaoDados.ano_nascimento;
		
		// Retorna
		CIDADAO.cbSuccess_f();
	},
	
	salvaCidadaoFail: function (err) {
		console.log("salvaCidadaoFail");
		
		// Retorna
		CIDADAO.cbFail_f(err);
	}
}
