function btBusca(textoBusca){
	console.log("Busca por: " + textoBusca);
	
	// Chama função de login
	CIDADAO.buscaCidadao(textoBusca);
	
	// Listas no console
	// Testes
	var Print = "Lista dos " + CIDADAO.listaCidadaosDadosBusca.length + " cidadãos encontrados:";
	// Testes
	
	// todo: o que apresentar caso não encontre cidadãos na busca
	
	var node = "";
	for (var i = 0; i < CIDADAO.listaCidadaosDadosBusca.length; i++) {
		// Testes
		Print += "Nome: " + CIDADAO.listaCidadaosDadosBusca[i].nome + "\r\n";
		// Testes
		// Preenche com os dados
		node += "<li>";
		node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].nome + "</div>";
		node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].nome_social + "</div>";
		node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].nome_mae + "</div>";
		node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].dia_nascimento + "/" + CIDADAO.listaCidadaosDadosBusca[i].mes_nascimento + "/" + CIDADAO.listaCidadaosDadosBusca[i].ano_nascimento + "</div>";
		node += "<div>" + (CIDADAO.listaCidadaosDados[i].situacao_cadastral == 0 ? "inativo" : "ativo") + "</div>";
		node += "<div>" + (CIDADAO.listaCidadaosDados[i].programa_dba == 0 ? "Não" : "Sim") + "</div>";
		node += "</li>";
	}
	$("#ullistaCidadaos").empty();
	$("#ullistaCidadaos").append(node);
	
	// Testes
	console.log(Print);
	// Testes
}
