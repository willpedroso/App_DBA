function btBusca(textoBusca){
	console.log("Busca por: " + textoBusca);
	
	// Chama fun��o de login
	CIDADAO.buscaCidadao(textoBusca);
	
	// Listas no console
	var Print = "Lista de cidad�os encontrados:";
	for (var i = 0; i < CIDADAO.listaCidadaosDadosBusca.length; i++) {
		Print += "Nome: " + CIDADAO.listaCidadaosDadosBusca[i].nome + "\r\n";
	}
	console.log(Print);
}
