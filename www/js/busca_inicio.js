function btBusca(textoBusca){
	console.log("Busca por: " + textoBusca);
	
	// Chama fun��o de login
	CIDADAO.buscaCidadao(textoBusca);
	
	// Listas no console
	// Testes
	var Print = "Lista dos " + CIDADAO.listaCidadaosDadosBusca.length + " cidad�os encontrados:";
	// Testes
	
	// todo: o que apresentar caso n�o encontre cidad�os na busca
	
	// Cabe�alho
	var node = "<li>";
		node += "<div>Nome Completo</div>";
		node += "<div>Nome Social</div>";
		node += "<div>Nome da M�e</div>";
		node += "<div>Data de Nascimento</div>";
		node += "<div>Situa��o Cadastral</div>";
		node += "<div>Programa DBA</div>";
		node += "</li>";
	for (var i = 0; i < CIDADAO.listaCidadaosDadosBusca.length; i++) {
		// Testes
		Print += "Nome: " + CIDADAO.listaCidadaosDadosBusca[i].nome + "\r\n";
		// Testes
		// Preenche com os dados
		node += "<li onclick=\"showTela('#ficha-statica');showTela('#container_abas');PageManager.loadTmpl('identificacao');\">";
		//node += "<li onclick=\"console.log('clique LI');\">";
		node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].nome + "</div>";
		node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].nome_social + "</div>";
		node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].nome_mae + "</div>";
		node += "<div>" + CIDADAO.listaCidadaosDadosBusca[i].dia_nascimento + "/" + CIDADAO.listaCidadaosDadosBusca[i].mes_nascimento + "/" + CIDADAO.listaCidadaosDadosBusca[i].ano_nascimento + "</div>";
		node += "<div>" + (CIDADAO.listaCidadaosDados[i].situacao_cadastral == 0 ? "inativo" : "ativo") + "</div>";
		node += "<div>" + (CIDADAO.listaCidadaosDados[i].programa_dba == 0 ? "N�o" : "Sim") + "</div>";
		node += "</li>";
	}
	console.log(node);
	$("#ullistaCidadaos").empty();
	$("#ullistaCidadaos").append(node);
	
	// Testes
	console.log(Print);
	// Testes
}
