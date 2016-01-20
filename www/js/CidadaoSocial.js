var CIDADAOSOCIAL = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	cidadao_id: null,
	dadosSocial: null,
	
    // ****************** Obtém os dados de entrada *********************
	// 	
    // ******************************************************************
    dadosEntrada: function(cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");
		
		// Salva funções de retorno
		CIDADAOSOCIAL.cbSuccess_f = cbSuccess;
		CIDADAOSOCIAL.cbFail_f = cbFail;
		
		// Salva identificação do cidadão
		CIDADAOSOCIAL.cidadao_id = cidadao;
		
		// Utiliza sempre o registro mais novo, por meio da data de criação
		BANCODADOS.sqlCmdDB("SELECT id " +
							", nome_contato " +
							", endereco_contato " +
							", tipo_estado_id " +
							", municipio_contato " +
							", local_referencia " +
							", formacao_profissional " +
							", atividade_profissional " +
							", nome_empresa " +
							", data_admissao " +
							", cargo " +
							", faixa_renda " +
							", endereco_empresa " +
							", problemas_saude " +
							", uso_medicamentos " +
							", qual_medicamento " +
							", encaminhamento " +
							", unidade_saude " +
							", nome_unidade_saude " +
							", entrevista_projeto_vida " +
							", houve_providencias " +
							", numero_nis " +
							", ctps " +
							", titulo_eleitor " +
							", numero_portaria_naturalizacao " +
							", observacoes_gerais " +
							", MAX(dt_criacao) as dt_criacao " +
							", status " +
							"FROM smads WHERE cidadao_id = ? and status = ?", [CIDADAOSOCIAL.cidadao_id, 1], CIDADAOSOCIAL.dadosEntradaSuccess, CIDADAOSOCIAL.dadosEntradaFail);
	},
	
	dadosEntradaSuccess: function(trans, res) {
		console.log("dadosEntradaSuccess");
		
		if (res.rows.length != 1) {
			// todo: há mais de um registro de saúde para o cidadão
		}
		
		var ds = {
			id: res.rows.item(0).id,
			nome_contato: res.rows.item(0).nome_contato,
			endereco_contato: res.rows.item(0).endereco_contato,
			tipo_estado_id: res.rows.item(0).tipo_estado_id,
			municipio_contato: res.rows.item(0).municipio_contato,
			local_referencia: res.rows.item(0).local_referencia,
			formacao_profissional: res.rows.item(0).formacao_profissional,
			atividade_profissional: res.rows.item(0).atividade_profissional,
			nome_empresa: res.rows.item(0).nome_empresa,
			data_admissao: res.rows.item(0).data_admissao,
			cargo: res.rows.item(0).cargo,
			faixa_renda: res.rows.item(0).faixa_renda,
			endereco_empresa: res.rows.item(0).endereco_empresa,
			problemas_saude: res.rows.item(0).problemas_saude,
			uso_medicamentos: res.rows.item(0).uso_medicamentos,
			qual_medicamento: res.rows.item(0).qual_medicamento,
			encaminhamento: res.rows.item(0).encaminhamento,
			unidade_saude: res.rows.item(0).unidade_saude,
			nome_unidade_saude: res.rows.item(0).nome_unidade_saude,
			entrevista_projeto_vida: res.rows.item(0).entrevista_projeto_vida,
			houve_providencias: res.rows.item(0).houve_providencias,
			numero_nis: res.rows.item(0).numero_nis,
			ctps: res.rows.item(0).ctps,
			titulo_eleitor: res.rows.item(0).titulo_eleitor,
			numero_portaria_naturalizacao: res.rows.item(0).numero_portaria_naturalizacao,
			observacoes_gerais: res.rows.item(0).observacoes_gerais,
			dt_criacao: res.rows.item(0).dt_criacao,
			status: res.rows.item(0).status,		
		};
		CIDADAOSOCIAL.dadosSocial = ds;
		
		// todo: testes retirar
		var Print = "Dados do Social:\r\n";
		Print += "id: " + CIDADAOSOCIAL.dadosSocial.id + "\r\n";
		Print += "nome_contato: " + CIDADAOSOCIAL.dadosSocial.nome_contato + "\r\n";
		Print += "endereco_contato: " + CIDADAOSOCIAL.dadosSocial.endereco_contato + "\r\n";
		Print += "tipo_estado_id: " + CIDADAOSOCIAL.dadosSocial.tipo_estado_id + "\r\n";
		Print += "municipio_contato: " + CIDADAOSOCIAL.dadosSocial.municipio_contato + "\r\n";
		Print += "local_referencia: " + CIDADAOSOCIAL.dadosSocial.local_referencia + "\r\n";
		Print += "formacao_profissional: " + CIDADAOSOCIAL.dadosSocial.formacao_profissional + "\r\n";
		Print += "atividade_profissional: " + CIDADAOSOCIAL.dadosSocial.atividade_profissional + "\r\n";
		Print += "nome_empresa: " + CIDADAOSOCIAL.dadosSocial.nome_empresa + "\r\n";
		Print += "data_admissao: " + CIDADAOSOCIAL.dadosSocial.data_admissao + "\r\n";
		Print += "cargo: " + CIDADAOSOCIAL.dadosSocial.cargo + "\r\n";
		Print += "faixa_renda: " + CIDADAOSOCIAL.dadosSocial.faixa_renda + "\r\n";
		Print += "endereco_empresa: " + CIDADAOSOCIAL.dadosSocial.endereco_empresa + "\r\n";
		Print += "problemas_saude: " + CIDADAOSOCIAL.dadosSocial.problemas_saude + "\r\n";
		Print += "uso_medicamentos: " + CIDADAOSOCIAL.dadosSocial.uso_medicamentos + "\r\n";
		Print += "qual_medicamento: " + CIDADAOSOCIAL.dadosSocial.qual_medicamento + "\r\n";
		Print += "encaminhamento: " + CIDADAOSOCIAL.dadosSocial.encaminhamento + "\r\n";
		Print += "unidade_saude: " + CIDADAOSOCIAL.dadosSocial.unidade_saude + "\r\n";
		Print += "nome_unidade_saude: " + CIDADAOSOCIAL.dadosSocial.nome_unidade_saude + "\r\n";
		Print += "entrevista_projeto_vida: " + CIDADAOSOCIAL.dadosSocial.entrevista_projeto_vida + "\r\n";
		Print += "houve_providencias: " + CIDADAOSOCIAL.dadosSocial.houve_providencias + "\r\n";
		Print += "numero_nis: " + CIDADAOSOCIAL.dadosSocial.numero_nis + "\r\n";
		Print += "ctps: " + CIDADAOSOCIAL.dadosSocial.ctps + "\r\n";
		Print += "titulo_eleitor: " + CIDADAOSOCIAL.dadosSocial.titulo_eleitor + "\r\n";
		Print += "numero_portaria_naturalizacao: " + CIDADAOSOCIAL.dadosSocial.numero_portaria_naturalizacao + "\r\n";
		Print += "observacoes_gerais: " + CIDADAOSOCIAL.dadosSocial.observacoes_gerais + "\r\n";
		Print += "dt_criacao: " + CIDADAOSOCIAL.dadosSocial.dt_criacao + "\r\n";
		Print += "status: " + CIDADAOSOCIAL.dadosSocial.status + "\r\n";

		console.log(Print);
		// testes retirar
		
		// retorna
		CIDADAOSOCIAL.cbSuccess_f();
	},
	
	dadosEntradaFail: function(err) {
		console.log("");

		CIDADAOSOCIAL.cbFail_f (err);
	},
/*	
    // ****************** Salva os dados  *********************
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
		
		// Retorna
		CIDADAO.cbSuccess_f();
	},
	
	salvaCidadaoFail: function (err) {
		console.log("salvaCidadaoFail");
		
		// Retorna
		CIDADAO.cbFail_f(err);
	},*/
}
