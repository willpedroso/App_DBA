//java script login
function btLogin(user, pass){
	console.log('clique login. user = ' + user + " - pass = " + pass);
	
	// Chama função de login
	USUARIO.login(user, pass, retLogin);
	
     //     PageManager.loadTmpl('div_busca_inicio');
    

    // hideTela('#div_login');
    // showTela('#div_header');
   //showTela('#container_abas');
    //showTela('#div_busca_inicio');
  
}

function retLogin (retCode) {

	if (retCode == USUARIO.login_return.OK) {
		alert("Sucesso");
		PageManager.loadTmpl('identificacao');
		hideTela('#div_login');
		showTela('#container_abas');
	}
	else if (retCode == USUARIO.login_return.SENHA_INCORRETA) {
		alert("Senha incorreta");
	}
	else if (retCode == USUARIO.login_return.NAO_ENCONTRADO) {
		alert("Não encontrado");
	}
	else if (retCode == USUARIO.login_return.REPETIDO) {
		alert("Repetido");
	}
	else if (retCode == USUARIO.login_return.INATIVO) {
		alert("Inativo");
	}
	else if (retCode == USUARIO.login_return.ALTERAR_SENHA) {
		alert("Alterar a senha");
	}
	else if (retCode == USUARIO.login_return.ERRO_BD) {
		alert("Erro no banco");
	}
	else {
		// Erro desconhecido
		alert("Erro desconhecido");
	}
}
