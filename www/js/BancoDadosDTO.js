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
//*******************************************************************************************************************
// Tipos de Motivo de Inativacao
//*******************************************************************************************************************
	tipo_motivo_inativacao_data: [],
	tipo_motivo_inativacao_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_motivo_inativacao_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_motivo_inativacao_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_motivo_inativacao_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de motivo de inativação
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_motivo_inativacao",
								[], 
								BD_DTO.tipo_motivo_inativacao_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_motivo_inativacao_carrega_success: function (trans, res) {
		console.log("tipo_motivo_inativacao_carrega_success");
		
		var tmi;
		while (BD_DTO.tipo_motivo_inativacao_data.length > 0) {
			BD_DTO.tipo_motivo_inativacao_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			tmi = new BD_DTO.tipo_motivo_inativacao_DTO();
			tmi.id = res.rows.item(i).id;
			tmi.nome = res.rows.item(i).nome;
			tmi.status = res.rows.item(i).status;
			BD_DTO.tipo_motivo_inativacao_data.push(tmi);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Motivo de Inativacao
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos de Frequência CAPS
//*******************************************************************************************************************
	tipo_frequencia_caps_data: [],
	tipo_frequencia_caps_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_frequencia_caps_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_frequencia_caps_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_frequencia_caps_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de frequência CAPS
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_frequencia_caps",
								[], 
								BD_DTO.tipo_frequencia_caps_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_frequencia_caps_carrega_success: function (trans, res) {
		console.log("tipo_frequencia_caps_carrega_success");
		
		var tfc;
		while (BD_DTO.tipo_frequencia_caps_data.length > 0) {
			BD_DTO.tipo_frequencia_caps_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			tfc = new BD_DTO.tipo_frequencia_caps_DTO();
			tfc.id = res.rows.item(i).id;
			tfc.nome = res.rows.item(i).nome;
			tfc.status = res.rows.item(i).status;
			BD_DTO.tipo_frequencia_caps_data.push(tfc);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Frequência CAPS
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos de Trabalho Coletivo
//*******************************************************************************************************************
	tipo_trabalho_coletivo_data: [],
	tipo_trabalho_coletivo_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_trabalho_coletivo_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_trabalho_coletivo_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_trabalho_coletivo_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de trabalho coletivo
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_trabalho_coletivo",
								[], 
								BD_DTO.tipo_trabalho_coletivo_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_trabalho_coletivo_carrega_success: function (trans, res) {
		console.log("tipo_trabalho_coletivo_carrega_success");
		
		var ttc;
		while (BD_DTO.tipo_trabalho_coletivo_data.length > 0) {
			BD_DTO.tipo_trabalho_coletivo_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			ttc = new BD_DTO.tipo_trabalho_coletivo_DTO();
			ttc.id = res.rows.item(i).id;
			ttc.nome = res.rows.item(i).nome;
			ttc.status = res.rows.item(i).status;
			BD_DTO.tipo_trabalho_coletivo_data.push(ttc);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Trabalho Coletivo
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos Onde Aprendeu Profissão
//*******************************************************************************************************************
	tipo_onde_aprendeu_profissao_data: [],
	tipo_onde_aprendeu_profissao_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_onde_aprendeu_profissao_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_onde_aprendeu_profissao_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_onde_aprendeu_profissao_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos onde aprendeu profissão
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_onde_aprendeu_profissao",
								[], 
								BD_DTO.tipo_onde_aprendeu_profissao_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_onde_aprendeu_profissao_carrega_success: function (trans, res) {
		console.log("tipo_onde_aprendeu_profissao_carrega_success");
		
		var toap;
		while (BD_DTO.tipo_onde_aprendeu_profissao_data.length > 0) {
			BD_DTO.tipo_onde_aprendeu_profissao_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			toap = new BD_DTO.tipo_onde_aprendeu_profissao_DTO();
			toap.id = res.rows.item(i).id;
			toap.nome = res.rows.item(i).nome;
			toap.status = res.rows.item(i).status;
			BD_DTO.tipo_onde_aprendeu_profissao_data.push(toap);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos Onde Aprendeu Profissão
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos Comprovante Conhecimento Profissional
//*******************************************************************************************************************
	tipo_comprovante_conhecimento_profissional_data: [],
	tipo_comprovante_conhecimento_profissional_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_comprovante_conhecimento_profissional_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_comprovante_conhecimento_profissional_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_comprovante_conhecimento_profissional_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos comprovante conhecimento profissional
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_comprovante_conhecimento_profissional",
								[], 
								BD_DTO.tipo_comprovante_conhecimento_profissional_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_comprovante_conhecimento_profissional_carrega_success: function (trans, res) {
		console.log("tipo_comprovante_conhecimento_profissional_carrega_success");
		
		var tccp;
		while (BD_DTO.tipo_comprovante_conhecimento_profissional_data.length > 0) {
			BD_DTO.tipo_comprovante_conhecimento_profissional_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			tccp = new BD_DTO.tipo_comprovante_conhecimento_profissional_DTO();
			tccp.id = res.rows.item(i).id;
			tccp.nome = res.rows.item(i).nome;
			tccp.status = res.rows.item(i).status;
			BD_DTO.tipo_comprovante_conhecimento_profissional_data.push(tccp);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos Comprovante Conhecimento Profissional
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos Ramo Curso
//*******************************************************************************************************************
	tipo_ramo_curso_data: [],
	tipo_ramo_curso_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_ramo_curso_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_ramo_curso_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_ramo_curso_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos ramo curso
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_ramo_curso",
								[], 
								BD_DTO.tipo_ramo_curso_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_ramo_curso_carrega_success: function (trans, res) {
		console.log("tipo_ramo_curso_carrega_success");
		
		var rc;
		while (BD_DTO.tipo_ramo_curso_data.length > 0) {
			BD_DTO.tipo_ramo_curso_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			rc = new BD_DTO.tipo_ramo_curso_DTO();
			rc.id = res.rows.item(i).id;
			rc.nome = res.rows.item(i).nome;
			rc.status = res.rows.item(i).status;
			BD_DTO.tipo_ramo_curso_data.push(rc);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos Ramo Curso
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos Pretenção Cursos
//*******************************************************************************************************************
	tipo_pretencao_cursos_data: [],
	tipo_pretencao_cursos_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_pretencao_cursos_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_pretencao_cursos_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_pretencao_cursos_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos pretenção cursos
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_pretencao_cursos",
								[], 
								BD_DTO.tipo_pretencao_cursos_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_pretencao_cursos_carrega_success: function (trans, res) {
		console.log("tipo_pretencao_cursos_carrega_success");
		
		var pc;
		while (BD_DTO.tipo_pretencao_cursos_data.length > 0) {
			BD_DTO.tipo_pretencao_cursos_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			pc = new BD_DTO.tipo_pretencao_cursos_DTO();
			pc.id = res.rows.item(i).id;
			pc.nome = res.rows.item(i).nome;
			pc.status = res.rows.item(i).status;
			BD_DTO.tipo_pretencao_cursos_data.push(pc);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos Pretenção Cursos
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos Primeira Escolha
//*******************************************************************************************************************
	tipo_primeira_escolha_data: [],
	tipo_primeira_escolha_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_primeira_escolha_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_primeira_escolha_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_primeira_escolha_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos primeira escolha
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_primeira_escolha",
								[], 
								BD_DTO.tipo_primeira_escolha_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_primeira_escolha_carrega_success: function (trans, res) {
		console.log("tipo_primeira_escolha_carrega_success");
		
		var pe;
		while (BD_DTO.tipo_primeira_escolha_data.length > 0) {
			BD_DTO.tipo_primeira_escolha_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			pe = new BD_DTO.tipo_primeira_escolha_DTO();
			pe.id = res.rows.item(i).id;
			pe.nome = res.rows.item(i).nome;
			pe.status = res.rows.item(i).status;
			BD_DTO.tipo_primeira_escolha_data.push(pe);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos Primeira Escolha
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos de Certidão
//*******************************************************************************************************************
	tipo_certidao_data: [],
	tipo_certidao_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_certidao_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_certidao_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_certidao_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de certidão
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_certidao",
								[], 
								BD_DTO.tipo_certidao_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_certidao_carrega_success: function (trans, res) {
		console.log("tipo_certidao_carrega_success");
		
		var tc;
		while (BD_DTO.tipo_certidao_data.length > 0) {
			BD_DTO.tipo_certidao_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			tc = new BD_DTO.tipo_certidao_DTO();
			tc.id = res.rows.item(i).id;
			tc.nome = res.rows.item(i).nome;
			tc.status = res.rows.item(i).status;
			BD_DTO.tipo_certidao_data.push(tc);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Certidão
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos de Dispositivo de Contato
//*******************************************************************************************************************
	tipo_dispositivo_contato_data: [],
	tipo_dispositivo_contato_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_dispositivo_contato_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_dispositivo_contato_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_dispositivo_contato_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de dispositivo de contato
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_dispositivo_contato",
								[], 
								BD_DTO.tipo_dispositivo_contato_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_dispositivo_contato_carrega_success: function (trans, res) {
		console.log("tipo_dispositivo_contato_carrega_success");
		
		var tdc;
		while (BD_DTO.tipo_dispositivo_contato_data.length > 0) {
			BD_DTO.tipo_dispositivo_contato_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			tdc = new BD_DTO.tipo_dispositivo_contato_DTO();
			tdc.id = res.rows.item(i).id;
			tdc.nome = res.rows.item(i).nome;
			tdc.status = res.rows.item(i).status;
			BD_DTO.tipo_dispositivo_contato_data.push(tdc);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Dispositivo de Contato
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos de Estado
//*******************************************************************************************************************
	tipo_estado_data: [],
	tipo_estado_DTO: function () {
		id: null;
		sigla: null;
		nome: null;
		status: null;
	},
	tipo_estado_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_estado_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_estado_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de estado
			BANCODADOS.sqlCmdDB("SELECT id, sigla, nome, status FROM tipo_estado",
								[], 
								BD_DTO.tipo_estado_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_estado_carrega_success: function (trans, res) {
		console.log("tipo_estado_carrega_success");
		
		var te;
		while (BD_DTO.tipo_estado_data.length > 0) {
			BD_DTO.tipo_estado_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			te = new BD_DTO.tipo_estado_DTO();
			te.id = res.rows.item(i).id;
			te.sigla = res.rows.item(i).sigla;
			te.nome = res.rows.item(i).nome;
			te.status = res.rows.item(i).status;
			BD_DTO.tipo_estado_data.push(te);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Estado
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos de Parentesco
//*******************************************************************************************************************
	tipo_parentesco_data: [],
	tipo_parentesco_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_parentesco_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_parentesco_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_parentesco_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de parentesco
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_parentesco",
								[], 
								BD_DTO.tipo_parentesco_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_parentesco_carrega_success: function (trans, res) {
		console.log("tipo_parentesco_carrega_success");
		
		var tp;
		while (BD_DTO.tipo_parentesco_data.length > 0) {
			BD_DTO.tipo_parentesco_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			tp = new BD_DTO.tipo_parentesco_DTO();
			tp.id = res.rows.item(i).id;
			tp.nome = res.rows.item(i).nome;
			tp.status = res.rows.item(i).status;
			BD_DTO.tipo_parentesco_data.push(tp);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Parentesco
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos de Atividade Tempo Livre
//*******************************************************************************************************************
	tipo_atividade_tempo_livre_data: [],
	tipo_atividade_tempo_livre_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_atividade_tempo_livre_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_atividade_tempo_livre_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_atividade_tempo_livre_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de atividade_tempo_livre
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_atividade_tempo_livre",
								[], 
								BD_DTO.tipo_atividade_tempo_livre_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_atividade_tempo_livre_carrega_success: function (trans, res) {
		console.log("tipo_atividade_tempo_livre_carrega_success");
		
		var tp;
		while (BD_DTO.tipo_atividade_tempo_livre_data.length > 0) {
			BD_DTO.tipo_atividade_tempo_livre_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			tp = new BD_DTO.tipo_atividade_tempo_livre_DTO();
			tp.id = res.rows.item(i).id;
			tp.nome = res.rows.item(i).nome;
			tp.status = res.rows.item(i).status;
			BD_DTO.tipo_atividade_tempo_livre_data.push(tp);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Atividade Tempo Livre
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos de Local Visitar
//*******************************************************************************************************************
	tipo_local_visitar_data: [],
	tipo_local_visitar_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_local_visitar_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_local_visitar_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_local_visitar_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de local_visitar
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_local_visitar",
								[], 
								BD_DTO.tipo_local_visitar_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_local_visitar_carrega_success: function (trans, res) {
		console.log("tipo_local_visitar_carrega_success");
		
		var tp;
		while (BD_DTO.tipo_local_visitar_data.length > 0) {
			BD_DTO.tipo_local_visitar_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			tp = new BD_DTO.tipo_local_visitar_DTO();
			tp.id = res.rows.item(i).id;
			tp.nome = res.rows.item(i).nome;
			tp.status = res.rows.item(i).status;
			BD_DTO.tipo_local_visitar_data.push(tp);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos Local Visitar
//*******************************************************************************************************************
//*******************************************************************************************************************
// Tipos de Documento
//*******************************************************************************************************************
	tipo_documento_data: [],
	tipo_documento_DTO: function () {
		id: null;
		nome: null;
		status: null;
	},
	tipo_documento_carrega: function (cbSuccess, cbFail) {
		console.log("tipo_documento_carrega");
		
		// Salva funções de retorno
		BD_DTO.cbSuccess_f = cbSuccess;
		BD_DTO.cbFail_f = cbFail;
		
		if (BD_DTO.tipo_documento_data.length > 0) {
			BD_DTO.cbSuccess_f();
		}
		else {
			// Carrega todos os tipos de documento
			BANCODADOS.sqlCmdDB("SELECT id, nome, status FROM tipo_documento",
								[], 
								BD_DTO.tipo_documento_carrega_success, 
								BD_DTO.cbFail_f);
		}
	},
	tipo_documento_carrega_success: function (trans, res) {
		console.log("tipo_documento_carrega_success");
		
		var tp;
		while (BD_DTO.tipo_documento_data.length > 0) {
			BD_DTO.tipo_documento_data.pop();
		}
		for (var i = 0; i < res.rows.length; i++) {
			tp = new BD_DTO.tipo_documento_DTO();
			tp.id = res.rows.item(i).id;
			tp.nome = res.rows.item(i).nome;
			tp.status = res.rows.item(i).status;
			BD_DTO.tipo_documento_data.push(tp);
		}
		BD_DTO.cbSuccess_f();
	},
//*******************************************************************************************************************
// Tipos de Documento
//*******************************************************************************************************************
}
