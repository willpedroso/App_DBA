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

}
