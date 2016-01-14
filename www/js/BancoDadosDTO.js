var BD_DTO = {
	// Manipulação de dados do banco
	
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,

//*******************************************************************************************************************
// Tipos de Sexo
//*******************************************************************************************************************
	tipo_sexo_data: [],
	tipo_sexo_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_sexo_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_sexo_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_sexo_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de sexo
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_sexo",
								[], 
								BD_DTO.tipo_sexo_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_sexo_carrega_success: function (trans, res) {
		console.log("tipo_sexo_carrega_success");
		
		var ts;
		while (BD_DTO.tipo_sexo_data.length > 0) {
			BD_DTO.tipo_sexo_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			ts = new BD_DTO.tipo_sexo_DTO();
			ts.id = res.rows.item(i).id;
			ts.nome = res.rows.item(i).nome;
			ts.status = res.rows.item(i).status;
			BD_DTO.tipo_sexo_data.push(ts);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Sexo
//*******************************************************************************************************************

//*******************************************************************************************************************
// Informações dos pontos de serviço
//*******************************************************************************************************************
	ponto_servico_data: [],
	ponto_servico_DTO: function () {
		id: null;
		organizacao_id: null;
		tipo_servico_id: null;
		nome: null;
		descricao: null;
		cep: null;
		logradouro: null;
		complemento: null;
		status: null;
		dt_criacao: null;
	},
	ponto_servico_carrega: function (cbSuccess, cbFail) {
		console.log("ponto_servico_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.ponto_servico_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os pontos de serviço
			BANCODADOS.sqlCmdDB("SELECT id, organizacao_id, tipo_servico_id, nome, descricao, cep, logradouro, complemento, status, dt_criacao FROM ponto_servico",
								[], 
								BD_DTO.ponto_servico_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	ponto_servico_carrega_success: function (trans, res) {
		console.log("ponto_servico_carrega_success");
		
		var ps;
		while (BD_DTO.ponto_servico_data.length > 0) {
			BD_DTO.ponto_servico_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			ps = new BD_DTO.ponto_servico_DTO();
			ps.id = res.rows.item(i).id;
			ps.organizacao_id = res.rows.item(i).organizacao_id;
			ps.tipo_servico_id = res.rows.item(i).tipo_servico_id;
			ps.nome = res.rows.item(i).nome;
			ps.descricao = res.rows.item(i).descricao;
			ps.cep = res.rows.item(i).cep;
			ps.logradouro = res.rows.item(i).logradouro;
			ps.complemento = res.rows.item(i).complemento;
			ps.status = res.rows.item(i).status;
			ps.dt_criacao = res.rows.item(i).dt_criacao;
			BD_DTO.ponto_servico_data.push(ps);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Informações dos pontos de serviço
//*******************************************************************************************************************

}
