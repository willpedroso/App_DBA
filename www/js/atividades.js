function preparaListasOpt () {
	console.log("preparaListasOpt");
	
	var opts = "<select name='pontoServicoLabel' id='pontoServicoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='pontoServicoLabel' for='ponto_servico_id'>Selecione</option>";
	for (var i = 0; i < ATIVIDADE.listaTiposServico.length; i++) {
		opts += "<option value='" + i + "' data-id='pontoServicoLabel' for='ponto_servico_id'>" + ATIVIDADE.listaTiposServico[i].nome + "</option>";
	}
	opts += "</div></select>";
	
	//console.log(opts);
	
	$("#listaPontosServicos").empty();
	$("#listaPontosServicos").append(opts);
	
	opts = "<select name='tipoAtuacaoLabel' id='tipoAtuacaoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'>Selecione</option>";
	for (var i = 0; i < ATIVIDADE.listaTiposAtuacao.length; i++) {
		opts += "<option value='" + i + "' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'>" + ATIVIDADE.listaTiposAtuacao[i].nome + "</option>";
	}
	opts += "</div></select>";
	
	//console.log(opts);
	
	$("#listaTiposAtuacao").empty();
	$("#listaTiposAtuacao").append(opts);
	
	opts = "<select name='tipoPeriodicidadeLabel' id='tipoPeriodicidadeLabel' onChange='exibePeriodo()' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='tipoPeriodicidadeLabel' for='tipo_periodicidade_id'>Selecione</option>";
	for (var i = 0; i < ATIVIDADE.listaTiposPeriodicidade.length; i++) {
		//opts += "<option value='" + i + "' data-id='tipoPeriodicidadeLabel' for='tipo_periodicidade_id'>" + ATIVIDADE.listaTiposPeriodicidade[i].nome + "</option>";
		opts += "<option value='" + ATIVIDADE.listaTiposPeriodicidade[i].nome + "' data-id='tipoPeriodicidadeLabel' for='tipo_periodicidade_id'>" + ATIVIDADE.listaTiposPeriodicidade[i].nome + "</option>";
	}
	opts += "</div></select>";
	
	//console.log(opts);
	
	$("#ListaTiposPeriodicidade").empty();
	$("#ListaTiposPeriodicidade").append(opts);
}