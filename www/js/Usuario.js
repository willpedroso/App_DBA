var USUARIO = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	cbRet_f: null,

    // Variáveis auxiliares
    auxVar_1: null,
    auxVar_2: null,

    // Variáveis listas auxiliares
    auxListVar_1: [],
    auxListVar_2: [],
	
	// Códigos de retorno para login
	login_return: {
		OK: 0,
		SENHA_INCORRETA: 1,
		NAO_ENCONTRADO: 2,
		REPETIDO: 3,
		INATIVO: 4,
		ALTERAR_SENHA: 5,
		ERRO_BD: 6
	},
	
	nome_usuario: null,
	auxUsuario: null,
	usuario_id: null,
	perfil_id: null,
	perfil_acumulado: [],
	perfil_tecnico: false,
	equipe_tecnica_id: null,
	perfil_codigo: null,
	listaPerfis: [],

    // ****************** Efetua o login do usuário *********************
	loginFail: function(error) {
		console.log("loginFail: " + error);
		USUARIO.cbRet_f(USUARIO.login_return.ERRO_BD);
	},
	
	loginSuccess: function(trans, res) {
		console.log("loginSuccess");
		if (res.rows.length < 1) {
			// O usuário não foi encontrado
//			alert("O usuário não foi encontrado! Por favor, repita a operação.");
			USUARIO.cbRet_f(USUARIO.login_return.NAO_ENCONTRADO);
		}
		else if (res.rows.length > 1) {
			// Há mais de um usuário com o mesmo login
//			alert("Há mais de um usuário com o mesmo login! Por favor, consulte o administrador do sistema.");
			USUARIO.cbRet_f(USUARIO.login_return.REPETIDO);
		}
		else {
			// Armazena o nome do usuário
			USUARIO.nome_usuario = res.rows.item(0).nome;
			// Apresenta o nome
			$(".nomeuser").append(USUARIO.nome_usuario);
			
			// Verifica se a senha está correta
//			alert("Verificando senha: senha digitada resumida = " + CryptoJS.MD5(USUARIO.auxVar_1) + " \r\nsenha do banco = " + res.rows.item(0).senha);
			if (CryptoJS.MD5(USUARIO.auxVar_1) != res.rows.item(0).senha) {
				USUARIO.cbRet_f(USUARIO.login_return.SENHA_INCORRETA);
				return;
			}
			// Verifica se o usuário está ativo
//			alert("Verificando usuário ativo");
			if (res.rows.item(0).status == 0) {
				USUARIO.cbRet_f(USUARIO.login_return.INATIVO);
				return;
			}
			// Verifica se a senha ainda é válida
//			alert("Verificando senha válida");
			if (Date(res.rows.item(0).dt_expirar_senha) < Date()) {
				USUARIO.cbRet_f(USUARIO.login_return.ALTERAR_SENHA);
				return;
			}
			// Salva o perfil do usuário
			USUARIO.usuario_id = res.rows.item(0).id;
			USUARIO.perfil_id = res.rows.item(0).perfil_id;
			
			// todo: testes retirar
			/*
			var Print = "Dados Usuário: \r\n";
			Print += "\tID: " + USUARIO.usuario_id + "\r\n";
			Print += "\tID Perfil Principal: " + USUARIO.perfil_id + "\r\n";
			console.log(Print);
			*/
			// testes retirar
			
			// Carrega perfis
			BD_DTO.perfis_carrega(USUARIO.carregaPerfisSucesso, USUARIO.cargaCidadaosFail);
		}
	},
	
	carregaPerfisSucesso: function () {
		console.log("carregaPerfisSucesso");
		
		USUARIO.listaPerfis = BD_DTO.perfis_data;
		
		// todo: testes retirar
		/*
		var Print = "Perfis do sistema: \r\n";
		for (var i = 0; i < USUARIO.listaPerfis.length; i++) {
			Print += "\tID: " + USUARIO.listaPerfis[i].id + "\r\n";
			Print += "\tcodigo: " + USUARIO.listaPerfis[i].codigo + "\r\n";
			Print += "\tnome: " + USUARIO.listaPerfis[i].nome + "\r\n";
			Print += "\tdescricao: " + USUARIO.listaPerfis[i].descricao + "\r\n";
			Print += "\tperfil_tecnico: " + USUARIO.listaPerfis[i].perfil_tecnico + "\r\n";
			Print += "\tstatus: " + USUARIO.listaPerfis[i].status + "\r\n";
			Print += "\tdt_criacao: " + USUARIO.listaPerfis[i].dt_criacao + "\r\n";
		}
		console.log(Print);
		*/
		// testes retirar
		
		// Perfil é técnico
		USUARIO.perfil_tecnico = false;
		for (var i = 0; i < USUARIO.listaPerfis.length; i++) {
			if (USUARIO.perfil_id == USUARIO.listaPerfis[i].id) {
				USUARIO.perfil_tecnico = USUARIO.listaPerfis[i].perfil_tecnico;
				USUARIO.perfil_codigo = USUARIO.listaPerfis[i].codigo;
				break;
			}
		}
		
		// Obtém equipe técnica do usuário
		BANCODADOS.sqlCmdDB("SELECT id, dt_criacao FROM equipe_tecnica WHERE usuario_id = ? AND status = ?",
							[USUARIO.usuario_id, 1], 
							USUARIO.equipeTecnicaSucesso, 
							USUARIO.cargaCidadaosFail);
	},
	
	equipeTecnicaSucesso: function (trans, res) {
		console.log("equipeTecnicaSucesso");
		
		USUARIO.perfil_acumulado = [];

		if (res.rows.length == 1) {
			// Faz parte da equipe técnica
			USUARIO.equipe_tecnica_id = res.rows.item(0).id;
			
			// todo: testes retirar
			/*
			var Print = "Equipe Técnica: \r\n";
			Print += "\tID: " + USUARIO.equipe_tecnica_id + "\r\n";
			console.log(Print);
			*/
			// testes retirar

			// Obtém perfil acumulado
			BANCODADOS.sqlCmdDB("SELECT perfil_id, dt_criacao FROM perfil_acumulado WHERE equipe_tecnica_id = ? AND status = ?",
								[USUARIO.equipe_tecnica_id, 1], 
								USUARIO.perfilAcumuladoSucesso, 
								USUARIO.cargaCidadaosFail);
		}
		else {
			// Não faz parte da equipe técnica
			// Carrega dados dos cidadãos
			aguardeMsgOn("Carregando dados...");
			CIDADAO.dadosEntrada(USUARIO.usuario_id, USUARIO.cargaCidadaosSucesso, USUARIO.cargaCidadaosFail);
		}
	},
	
	perfilAcumuladoSucesso: function (trans, res) {
		console.log("perfilAcumuladoSucesso");
		
		for (var i = 0; i < res.rows.length; i++) {
			// Utiliza o código do perfil
			for (var j = 0; j < USUARIO.listaPerfis.length; j++) {
				if (res.rows.item(i).perfil_id == USUARIO.listaPerfis[j].id) {
					USUARIO.perfil_acumulado.push(USUARIO.listaPerfis[j].codigo);
					break;
				}
			}
		}

		// todo: testes retirar
		/*
		var Print = "Perfis Acumulados: \r\n";
		for (var i = 0; i < USUARIO.perfil_acumulado.length; i++) {
			Print += "\tID Perfil Acumulado: " + USUARIO.perfil_acumulado[i] + "\r\n";
		}
		console.log(Print);
		*/
		// testes retirar

		// Carrega dados dos cidadãos
		aguardeMsgOn("Carregando dados...");
		CIDADAO.dadosEntrada(USUARIO.usuario_id, USUARIO.cargaCidadaosSucesso, USUARIO.cargaCidadaosFail);
	},
	
	cargaCidadaosSucesso: function () {
		console.log("cargaCidadaosSucesso");
		
		aguardeMsgOff();
		USUARIO.cbRet_f(USUARIO.login_return.OK);
	},
	
	cargaCidadaosFail: function (err) {
		console.log("cargaCidadaosFail - erro = " + err);
		
		aguardeMsgOff();
		USUARIO.cbRet_f(USUARIO.login_return.ERRO_BD);
	},
	
    login: function(usuario, senha, cbRet) {
	    console.log("login");
		
		USUARIO.auxUsuario = usuario;
		USUARIO.cbRet_f = cbRet;
		USUARIO.auxVar_1 = senha;
		BANCODADOS.sqlCmdDB("SELECT id, senha, status, nome, dt_expirar_senha, perfil_id FROM usuario WHERE login = ? AND status = ?", [usuario, 1], USUARIO.loginSuccess, USUARIO.loginFail);
	},
}
