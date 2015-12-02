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
			// todo: Salva o perfil do usuário
			
//			alert("Login OK");
			USUARIO.cbRet_f(USUARIO.login_return.OK);
		}
	},
	
    login: function(usuario, senha, cbRet) {
	    console.log("login");
		USUARIO.cbRet_f = cbRet;
		USUARIO.auxVar_1 = senha;
		BANCODADOS.sqlCmdDB("SELECT senha, status, nome, dt_expirar_senha, perfil_id FROM usuario WHERE login = ?", [usuario], USUARIO.loginSuccess, USUARIO.loginFail);
	},
}
