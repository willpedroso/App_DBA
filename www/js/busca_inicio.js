function btBusca(textoBusca, ativos, inativos){
	console.log("Busca por: " + textoBusca);
	
	// Chama função de login
	CIDADAO.buscaCidadao(textoBusca, ativos == "checked" ? true : false, inativos == "checked" ? true : false);
	/*
	// Monta opções de abas de acompanhamento em função do tipo de usuário
	var abaSaude = false;
	var abaTrabalho = false;
	var abaSocial = false;
	if (USUARIO.perfil_tecnico == true) {
		var i = 0;
		var perfil = USUARIO.perfil_codigo;
		do {
			switch (perfil) {
			case "TSAU":
				abaSaude = true;
				break;
			case "TTRA":
				abaTrabalho = true;
				break;
			case "TSOC":
				abaSocial = true;
				break;
			}
		} while (USUARIO.perfil_acumulado.length && (perfil = USUARIO.perfil_acumulado[i++]) != null);
	}
	else {
		// Apresenta todas as abas de acompanhamento
		abaSaude = abaSocial = abaTrabalho = true;
	}
	
	// Monta opções de abas de acompanhamento em função do cidadão
	if (CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].situacao_cadastral == 0 ||
	    CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].programa_dba == 0) {
		// Cidadão inativo ou fora do programa -> não apresenta opções de acompanhamento
		abaSaude = abaSocial = abaTrabalho = false;
	}
	
	var opcoesAba =
			"<ul class=\"\">" +
              "<li class=\"active\" onclick=\"console.log(\'Identificacao\');PageManager.loadTmpl(\'identificacao\'); abas();\">Identificação</li>" +
              "<li class=\"active\" onclick=\"console.log(\'InfoBasica\'); INFOBASICAS.dadosEntrada(); abas();\">Informações Básicas</li>" +
              "<li class=\"active\" onclick=\"console.log(\'Situacao DBA\');SITUACAODBA.dadosEntrada(); abas();\">Situação DBA</li>" +
              "<li class=\"active\" onclick=\"console.log(\'Atividades\');PageManager.loadTmpl(\'div_atividades\');ATIVIDADE.dadosEntrada(null, ATIVIDADE.apresentaCalendario, null); abas();\">Atividades</li>";
	if (abaSocial) {
        opcoesAba += "<li class=\"active\" onclick=\"console.log(\'Social\');CIDADAOSOCIAL.dadosEntrada(); abas();\">Social</li>";
	}
	if (abaTrabalho) {
        opcoesAba += "<li class=\"active\" onclick=\"console.log(\'Trabalho\');CIDADAOTRABALHO.dadosEntrada(); abas();\">Trabalho</li>";
	}
	if (abaSaude) {
        opcoesAba += "<li class=\"active\" onclick=\"console.log(\'Saude\');CIDADAOSAUDE.dadosEntrada(); abas();\">Saúde </li>";
	}
    opcoesAba += "<li class=\"active\">Historico de alterações</li>" +
				 "</ul>";
				 
	$("#menu_abas").empty();
	$("#menu_abas").append(opcoesAba);
	*/
	// Cabeçalho
	var node = "<li class='li-header'>";
		node += "<div>Nome Completo</div>";
		node += "<div>Nome Social</div>";
		node += "<div>Nome da Mãe</div>";
		node += "<div>Data de Nascimento</div>";
		node += "<div>Situação Cadastral</div>";
		node += "<div>Programa DBA</div>";
		node += "</li>";
	if (CIDADAO.listaCidadaosDadosBusca.length == 0) {
		node += "<div>" + "Nenhum registro encontrado." + "</div>";
	}
	else {
		for (var i = 0; i < CIDADAO.listaCidadaosDadosBusca.length; i++) {
			// Preenche com os dados
//			node += "<li " + ("cidadaoIndex='" + i + "' ") + "onclick=\"showTela('#ficha-statica');showTela('#container_abas');PageManager.loadTmpl('identificacao');CIDADAO.dadosCidadao(" + i + ");\">";
			node += "<li " + ("cidadaoIndex='" + i + "' ") + "onclick=\"showTela('#ficha-statica');showTela('#container_abas');PageManager.loadTmpl('identificacao');iniAbasUsuario(" + i + ");\">";
			node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].nome + "</div>";
			node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].nome_social + "</div>";
			node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].nome_mae + "</div>";
			node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].dia_nascimento + "/" + CIDADAO.listaCidadaosDadosBusca[i].mes_nascimento + "/" + CIDADAO.listaCidadaosDadosBusca[i].ano_nascimento + "</div>";
			node += "<div>" + (CIDADAO.listaCidadaosDadosBusca[i].situacao_cadastral == 0 ? "Inativo" : "Ativo") + "</div>";
			node += "<div>" + (CIDADAO.listaCidadaosDadosBusca[i].programa_dba == 0 ? "Não" : "Sim") + "</div>";
			node += "</li>";
		}
	}
	console.log(node);
	$("#ullistaCidadaos").empty();
	$("#ullistaCidadaos").append(node);
}

function iniAbasUsuario (indiceCidadao) {
	console.log("iniAbasUsuario");

	if (indiceCidadao != null) {
		CIDADAO.dadosCidadao(indiceCidadao);
	}
	
	// Monta opções de abas de acompanhamento em função do tipo de usuário
	var abaSaude = false;
	var abaTrabalho = false;
	var abaSocial = false;
	if (USUARIO.perfil_tecnico == true) {
		var i = 0;
		var perfil = USUARIO.perfil_codigo;
		do {
			switch (perfil) {
			case "TSAU":
				abaSaude = true;
				break;
			case "TTRA":
				abaTrabalho = true;
				break;
			case "TSOC":
				abaSocial = true;
				break;
			}
		} while (USUARIO.perfil_acumulado.length && (perfil = USUARIO.perfil_acumulado[i++]) != null);
	}
	else {
		// Apresenta todas as abas de acompanhamento
		abaSaude = abaSocial = abaTrabalho = true;
	}
	
	// Monta opções de abas de acompanhamento em função do cidadão
	if (CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].situacao_cadastral == 0 ||
	    CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].programa_dba == 0) {
		// Cidadão inativo ou fora do programa -> não apresenta opções de acompanhamento
		abaSaude = abaSocial = abaTrabalho = false;
	}
	
	var opcoesAba =
			"<ul class=\"\">" +
              "<li class=\"active\" onclick=\"console.log(\'Identificacao\');PageManager.loadTmpl(\'identificacao\'); abas();\">Identificação</li>" +
              "<li class=\"active\" onclick=\"console.log(\'InfoBasica\'); INFOBASICAS.dadosEntrada(); abas();\">Informações Básicas</li>" +
              "<li class=\"active\" onclick=\"console.log(\'Situacao DBA\');SITUACAODBA.dadosEntrada(); abas();\">Situação DBA</li>" +
              "<li class=\"active\" onclick=\"console.log(\'Atividades\');PageManager.loadTmpl(\'div_atividades\');ATIVIDADE.dadosEntrada(null, ATIVIDADE.apresentaCalendario, null); abas();\">Atividades</li>";
	if (abaSocial) {
        opcoesAba += "<li class=\"active\" onclick=\"console.log(\'Social\');CIDADAOSOCIAL.dadosEntrada(); abas();\">Social</li>";
	}
	if (abaTrabalho) {
        opcoesAba += "<li class=\"active\" onclick=\"console.log(\'Trabalho\');CIDADAOTRABALHO.dadosEntrada(); abas();\">Trabalho</li>";
	}
	if (abaSaude) {
        opcoesAba += "<li class=\"active\" onclick=\"console.log(\'Saude\');CIDADAOSAUDE.dadosEntrada(); abas();\">Saúde </li>";
	}
    opcoesAba += "<li class=\"active\">Historico de alterações</li>" +
				 "</ul>";
				 
	$("#menu_abas").empty();
	$("#menu_abas").append(opcoesAba);
}
