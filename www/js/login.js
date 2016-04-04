//java script login
function btLogin(user, pass){
	console.log('clique login. user = ' + user + " - pass = " + pass);
	
	// Chama função de login
	aguardeMsgOn("Autenticando usuário...");
	USUARIO.login(user, pass, retLogin);
}

function retLogin (retCode) {
	console.log("retLogin");
	
	aguardeMsgOff();
	if (retCode == USUARIO.login_return.OK) {

		// Login efetuado com sucesso, avalia a necessidade de sincronismo automático de dados do usuário
		var lastUser = null;
		if ((lastUser = localStorage.getItem("lastUser")) == null ||
			lastUser != USUARIO.usuario_id) {
			
			// É a primeira execução ou o usuário foi trocado, executa sincronismo automático
			if (localStorage.getItem("dadosEnviar") == 1) {
				// Há dados para enviar, utiliza o usuário anterior no envio
				BANCODADOS.initUpload(lastUser);
			}
			else {
				// Executa sincronismo automático
				localStorage.setItem("lastUser", USUARIO.usuario_id);				// armazena usuário atual
				BANCODADOS.initSincronismo(USUARIO.usuario_id);
			}
		}
		else {
			// O usuário é o mesmo do último acesso
			PageManager.loadTmpl('div_busca_inicio');
			hideTela('#div_login');
			showTela('#div_header');
		}
	}
	else if (retCode == USUARIO.login_return.SENHA_INCORRETA) {
		alertMessage("Senha incorreta");
	}
	else if (retCode == USUARIO.login_return.NAO_ENCONTRADO) {
		alertMessage("Não encontrado");
	}
	else if (retCode == USUARIO.login_return.REPETIDO) {
		alertMessage("Repetido");
	}
	else if (retCode == USUARIO.login_return.INATIVO) {
		alertMessage("Inativo");
	}
	else if (retCode == USUARIO.login_return.ALTERAR_SENHA) {
		alertMessage("Alterar a senha");
	}
	else if (retCode == USUARIO.login_return.ERRO_BD) {
		alertMessage("Erro no banco");
	}
	else {
		// Erro desconhecido
		alertMessage("Erro desconhecido");
	}
}
