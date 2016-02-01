function btBusca(textoBusca, ativos, inativos){
	console.log("Busca por: " + textoBusca);
	
	// Chama função de login
	CIDADAO.buscaCidadao(textoBusca, ativos == "checked" ? true : false, inativos == "checked" ? true : false);
	
	// Listas no console
	// Testes
	var Print = "Lista dos " + CIDADAO.listaCidadaosDadosBusca.length + " cidadãos encontrados:";
	// Testes
	
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
			// Testes
			Print += "Nome: " + CIDADAO.listaCidadaosDadosBusca[i].nome + "\r\n";
			// Testes
			// Preenche com os dados
			node += "<li " + ("cidadaoIndex='" + i + "' ") + "onclick=\"showTela('#ficha-statica');showTela('#container_abas');PageManager.loadTmpl('identificacao');CIDADAO.dadosCidadao(" + i + ");\">";
			//node += "<li onclick=\"console.log('clique LI');\">";
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
