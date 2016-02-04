function saudeOpcoes () {
	console.log("saudeOpcoes");
}

function carregaSaude () {
	console.log("carregaSaude");
	
	var edit = true;		// todo: sempre em edição

	var auxVar;
	// Número do SUS
	auxVar = CIDADAOSAUDE.dadosSaude.numero_sus;
	$("#numero_sus").val(auxVar == null ? "" : auxVar);
	
	// Cadastro UBS
	if (CIDADAOSAUDE.dadosSaude.cadastro_acompanhamento_ubs == 1) {
		// Sim
		$("input[name='infoCadastroAcompanhamentoUbs'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.cadastro_acompanhamento_ubs == 0) {
		// Não
		$("input[name='infoCadastroAcompanhamentoUbs'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoCadastroAcompanhamentoUbs'][value='Não Informado']").prop("checked", true);
	}
	infoCadastroAcompanhamentoUbsf();
	for (var i = 0; i < CIDADAOSAUDE.listaCadastroAcompanhamentoUBS.length; i++) {
		auxVar = CIDADAOSAUDE.listaCadastroAcompanhamentoUBS[i].nome_ubs;
		$('input.adicionaQualUbsSaude').val(auxVar == null ? "" : auxVar);
		auxVar = CIDADAOSAUDE.listaCadastroAcompanhamentoUBS[i].especialidade;
		$('textarea.textareaEspecialidadeUbsSaude').val(auxVar == null ? "" : auxVar);
		auxVar = CIDADAOSAUDE.listaCadastroAcompanhamentoUBS[i].nome_tecnico_referencia;
		$('input.adicionaTecnicoReferenciaUbsSaude').val(auxVar == null ? "" : auxVar);

		adicionaAcompanhamentoUBS();
	}

	// Acompanhamento CAPS
	var opts = "<select name='tipoAtuacaoLabel' id='tipoFrequenciaCapsLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOSAUDE.listaTipoFrequenciaCaps.length; i++) {
		opts += "<option value='" + i + "' data-id='tipoFrequenciaCapsLabel' for='tipo_frequencia_caps_id'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.tipo_frequencia_caps_id == CIDADAOSAUDE.listaTipoFrequenciaCaps[i].id) ? " selected>" : ">") + CIDADAOSAUDE.listaTipoFrequenciaCaps[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaTiposFrequenciaCaps").empty();
	$("#listaTiposFrequenciaCaps").append(opts);
	
	if (CIDADAOSAUDE.dadosSaude.acompanhamento_caps == 1) {
		// Sim
		$("input[name='infoAcompanhamentoCaps'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.acompanhamento_caps == 0) {
		// Não
		$("input[name='infoAcompanhamentoCaps'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoAcompanhamentoCaps'][value='Não Informado']").prop("checked", true);
	}
	auxVar = CIDADAOSAUDE.dadosSaude.qual_acompanhamento_caps;
	$("input[name='qual_acompanhamento_caps']").val(auxVar == null ? "" : auxVar);
	auxVar = CIDADAOSAUDE.dadosSaude.nome_tecnico_referencia_caps;
	$("input[name='nome_tecnico_referencia_caps']").val(auxVar == null ? "" : auxVar);
	infoAcompanhamentoCapsf();

	// Internação
	if (CIDADAOSAUDE.dadosSaude.esteve_internado == 1) {
		// Sim
		$("input[name='infoEsteveInternado'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.esteve_internado == 0) {
		// Não
		$("input[name='infoEsteveInternado'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoEsteveInternado'][value='Não Informado']").prop("checked", true);
	}
	infoEsteveInternadof();
	for (var i = 0; i < CIDADAOSAUDE.listaInternacao.length; i++) {
		auxVar = CIDADAOSAUDE.listaInternacao[i].quantas_vezes;
		$('input.adicionaQuantasVezesInternado').val(auxVar == null ? "" : auxVar);
		auxVar = CIDADAOSAUDE.listaInternacao[i].motivo;
		$('textarea.textareaMotivoInternacao').val(auxVar == null ? "" : auxVar);
		auxVar = CIDADAOSAUDE.listaInternacao[i].local;
		$('input.adicionaLocalInternacao').val(auxVar == null ? "" : auxVar);

		adicionaInternacao();
	}

	// Como chegou à situação de rua
	auxVar = CIDADAOSAUDE.dadosSaude.como_chegou_situacao_rua;
	$("#como_chegou_situacao_rua").val(auxVar == null ? "" : auxVar);
	
	var opts = "<span class='titSang'>Por quanto tempo permaneceu em situação de rua:</span>" + 
			   "<select name='diasLabel' id='diasLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 1; i < 32; i++) {
		opts += "<option value='" + i + "' data-id='diasLabel' for='dias_situacao_rua'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.dias_situacao_rua == i) ? " selected>" : ">") + i + (i == 1 ? " Dia" : " Dias") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='mesesLabel' id='mesesLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesLabel' for='meses_situacao_rua'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.meses_situacao_rua == i) ? " selected>" : ">") + i + (i == 1 ? " Mês" : " Meses") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='anosLabel' id='anosLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Anos</option>";
	for (var i = 1; i < 51; i++) {
		opts += "<option value='" + i + "' data-id='anosLabel' for='anos_situacao_rua'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.anos_situacao_rua == i) ? " selected>" : ">") + i + (i == 1 ? " Ano" : " Anos") + "</option>";
	}
	opts += "</div></select>";
	
	$("#listaDiasMesesAnosRua").empty();
	$("#listaDiasMesesAnosRua").append(opts);
	
	// Iniciou o uso de drogras
	if (CIDADAOSAUDE.dadosSaude.drogas_antes_depois_situacao_rua == 1) {
		// Sim
		$("input[name='infoDrogasAntesDepoisSituacaoRua'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.drogas_antes_depois_situacao_rua == 0) {
		// Não
		$("input[name='infoDrogasAntesDepoisSituacaoRua'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoDrogasAntesDepoisSituacaoRua'][value='Não Informado']").prop("checked", true);
	}
	
	// Horas de Sono
	auxVar = CIDADAOSAUDE.dadosSaude.sono_antes_programa;
	$("#sono_antes_programa").val(auxVar == null ? "" : auxVar);
	auxVar = CIDADAOSAUDE.dadosSaude.sono_depois_programa;
	$("#sono_depois_programa").val(auxVar == null ? "" : auxVar);

	// Tem amigos
	if (CIDADAOSAUDE.dadosSaude.tem_amigos == 1) {
		// Sim
		$("input[name='infoTemAmigos'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tem_amigos == 0) {
		// Não
		$("input[name='infoTemAmigos'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTemAmigos'][value='Não Informado']").prop("checked", true);
	}

	// Tem companheiro
	if (CIDADAOSAUDE.dadosSaude.tem_companheiro == 1) {
		// Sim
		$("input[name='infoTemCompanheiro'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tem_companheiro == 0) {
		// Não
		$("input[name='infoTemCompanheiro'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTemCompanheiro'][value='Não Informado']").prop("checked", true);
	}

	// Companheiro inserido no programa
	if (CIDADAOSAUDE.dadosSaude.companheiro_programa == 1) {
		// Sim
		$("input[name='infoTemCompanheiroPrograma'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.companheiro_programa == 0) {
		// Não
		$("input[name='infoTemCompanheiroPrograma'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTemCompanheiroPrograma'][value='Não Informado']").prop("checked", true);
	}

	// Tem família
	if (CIDADAOSAUDE.dadosSaude.tem_familia == 1) {
		// Sim
		$("input[name='infoTemFamilia'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tem_familia == 0) {
		// Não
		$("input[name='infoTemFamilia'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTemFamilia'][value='Não Informado']").prop("checked", true);
	}

	// Tem contato com a família
	if (CIDADAOSAUDE.dadosSaude.tem_contato_familia == 1) {
		// Sim
		$("input[name='infoTemContatoFamilia'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tem_contato_familia == 0) {
		// Não
		$("input[name='infoTemContatoFamilia'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTemContatoFamilia'][value='Não Informado']").prop("checked", true);
	}

	// UF onde reside a família
	var opts = "<label class='selectDefault'><span class='titSang'>UF onde reside sua família:</span>" + 
			   "<select name='estadoNomeLabel' id='estadoNomeLabel' class='selectPersonalizado'><div class='comboStilo'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOSAUDE.listaEstados.length; i++) {
		opts += "<option value='" + i + "' data-id='estadoNomeLabel' for='tipo_estado_id'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.tipo_estado_id == CIDADAOSAUDE.listaEstados[i].id) ? " selected>" : ">") + CIDADAOSAUDE.listaEstados[i].sigla + " - " + CIDADAOSAUDE.listaEstados[i].nome + "</option>";
	}
	opts += "</div></select></label>";
	
	$("#listaEstadosFamiliaReside").empty();
	$("#listaEstadosFamiliaReside").append(opts);
	
	// Descrição de onde reside sua família
	auxVar = CIDADAOSAUDE.dadosSaude.descricao_reside_familia;
	$("#descricao_reside_familia").val(auxVar == null ? "" : auxVar);
	
	// Telefone de algum familiar
	var opts = "<option value='Tipo'>Tipo</option>";
	for (var i = 0; i < CIDADAOSAUDE.listaTipoParentesco.length; i++) {
		opts += "<option value='" + i + "' data-id='tipoParentescoLabel' for='tipoParentescoLabel'>";
		opts += CIDADAOSAUDE.listaTipoParentesco[i].nome + "</option>";
	}
	console.log("\r\n" + opts);
	
	$("#selectTipoParente").empty();
	$("#selectTipoParente").append(opts);
	
	for (var i = 0; i < CIDADAOSAUDE.listaTelefoneFamiliar.length; i++) {
		auxVar = CIDADAOSAUDE.listaTelefoneFamiliar[i].numero;
		$('input.adicionaNumContatoFamiliar').val(auxVar == null ? "" : auxVar);
		
		var parentesco;
		for (var j = 0; j < CIDADAOSAUDE.listaTipoParentesco.length; j++) {
			if (CIDADAOSAUDE.listaTelefoneFamiliar[i].tipo_parentesco_id == CIDADAOSAUDE.listaTipoParentesco[j].id) {
				parentesco = CIDADAOSAUDE.listaTipoParentesco[j].nome;
				break;
			}
		}
		adicionaTelefoneFamiliar(parentesco);
	}
	
	/*	
	// Lista de pontos de serviço
	var opts = "<select name='pontoServicoLabel' id='pontoServicoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='pontoServicoLabel' for='ponto_servico_id'>Selecione</option>";
	for (var i = 0; i < ATIVIDADE.listaPontosServico.length; i++) {
		opts += "<option value='" + i + "' data-id='pontoServicoLabel' for='ponto_servico_id'";
		//opts += "<option value='" + ATIVIDADE.listaTiposServico[i].id + "' data-id='pontoServicoLabel' for='ponto_servico_id'";
		opts += ((edit == true && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].ponto_servico_nome == ATIVIDADE.listaPontosServico[i].nome) ? " selected>" : ">") + ATIVIDADE.listaPontosServico[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaPontosServicos").empty();
	$("#listaPontosServicos").append(opts);
	
	// Lista de tipos de atuação
	opts = "<select name='tipoAtuacaoLabel' id='tipoAtuacaoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'>Selecione</option>";
	for (var i = 0; i < ATIVIDADE.listaTiposAtuacao.length; i++) {
		opts += "<option value='" + i + "' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'";
		//opts += "<option value='" + ATIVIDADE.listaTiposAtuacao[i].id + "' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'";
		opts += ((edit == true && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_atuacao_nome == ATIVIDADE.listaTiposAtuacao[i].nome) ? " selected>" : ">") + ATIVIDADE.listaTiposAtuacao[i].nome + "</option>";
	}
	opts += "</div></select>";
	//console.log(opts + "\r\n");
	
	$("#listaTiposAtuacao").empty();
	$("#listaTiposAtuacao").append(opts);
	
	// Lista de tipos de periodicidade
	opts = "<select name='tipoPeriodicidadeLabel' id='tipoPeriodicidadeLabel' onChange='exibePeriodo()' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='tipoPeriodicidadeLabel' for='tipo_periodicidade_id'>Selecione</option>";
	for (var i = 0; i < ATIVIDADE.listaTiposPeriodicidade.length; i++) {
	//	opts += "<option value='" + ATIVIDADE.listaTiposPeriodicidade[i].nome + "' data-id='tipoPeriodicidadeLabel' for='tipo_periodicidade_id'>" + ATIVIDADE.listaTiposPeriodicidade[i].nome + "</option>";
		opts += "<option value='" + ATIVIDADE.listaTiposPeriodicidade[i].nome + "' data-id='tipoPeriodicidadeLabel' for='tipo_periodicidade_id'";
		opts += ((edit == true && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_tipo_nome == ATIVIDADE.listaTiposPeriodicidade[i].nome) ? " selected>" : ">") + ATIVIDADE.listaTiposPeriodicidade[i].nome + "</option>";
	}
	opts += "</div></select>";
	
	$("#ListaTiposPeriodicidade").empty();
	$("#ListaTiposPeriodicidade").append(opts);
	
	// Lista de dias da semana para checkbox
	opts = "";
	for (var i = 0; i < ATIVIDADE.listaTiposDiaSemana.length; i++) {
		opts += "<div class='checkbox'>";
		opts += "<input type='checkbox' id='dias_semana_" + i + "' value='" + ATIVIDADE.listaTiposDiaSemana[i].id + "' class='checkbox check'";
		if (edit && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_tipo_nome == "Semanal") {
			for (var j = 0; j < ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_tipo_ds.length; j++) {
				if (ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_tipo_ds[j] == ATIVIDADE.listaTiposDiaSemana[i].id) {
					opts += " checked>";
					break;
				}
			}
		}
		else {
			opts += ">";
		}
        opts += "<p>" + ATIVIDADE.listaTiposDiaSemana[i].nome_abreviado + "</p></div>";
	}
	
	$("#container_dias_semana").empty();
	$("#container_dias_semana").append(opts);
	
	// Lista de dias da semana para radio
	opts = "";
	for (var i = 0; i < ATIVIDADE.listaTiposDiaSemana.length; i++) {
		opts += "<input type='radio' name='infoDiasSemanaRadio' value='" + ATIVIDADE.listaTiposDiaSemana[i].id + "' class='radio'";
		if (edit && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_tipo_nome == "Mensal" &&
			ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_semana_repetir == ATIVIDADE.listaTiposDiaSemana[i].id) {
			opts += " checked>";
		}
		else {
			opts += (i == 0 ? " checked>" : ">");
		}
        opts += "<p>" + ATIVIDADE.listaTiposDiaSemana[i].nome_abreviado + "</p>";
	}
	
	$("#infoDiasSemanaRadio").empty();
	$("#infoDiasSemanaRadio").append(opts);
	
	// Corrige campos que devem ser apresentados
	exibePeriodo();
	if (edit && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_tipo_nome == "Mensal") {
		infoRep();
	}
//	exibePeriodo();
	if (edit)
		infoDiaInt();
	if (edit)
		infoPerma();
*/
}

function salvaSaudeSuccess () {
	console.log("salvaSaudeSuccess");
	// todo: revisar
}

function salvaSaudeFail (err) {
	console.log("salvaSaudeFail: " + err);
	// todo: revisar
}

function validaCampos() {
	console.log("validaCampos");
/*
	var erro = false;
	
	// Avalia ponto de serviço
	if ($("#pontoServicoLabel").val() == "Selecione") {
		$("#pontoServicoLabel").addClass("inputFocus");
		erro = true;
	}
	else $("#pontoServicoLabel").removeClass("inputFocus");
	
	// Avalia tipo de atuação
	if ($("#tipoAtuacaoLabel").val() == "Selecione") {
		$("#tipoAtuacaoLabel").addClass("inputFocus");
		erro = true;
	}
	else $("#tipoAtuacaoLabel").removeClass("inputFocus");
	
	// Avalia tipo de periodicidade
	if ($("#tipoPeriodicidadeLabel").val() == "Selecione") {
		$("#tipoPeriodicidadeLabel").addClass("inputFocus");
		erro = true;
	}
	else $("#tipoPeriodicidadeLabel").removeClass("inputFocus");
	
	// Havendo algum tipo de periodiciade
	if ($("#tipoPeriodicidadeLabel").val() != "Selecione") {
		// Avalia data de início
		if ($('#data_inicio').val() == '')
		{
			$('#data_inicio').addClass('inputFocus');	
			erro = true;
		}
		else $('#data_inicio').removeClass('inputFocus');	
		
		// Se não for dia inteiro
		if ($("input:radio[name=infoDiaInteiro]:checked").val() == "Não")
		{
			// Avalia hora de início
			var auxVar = $('#hora_inicio').val();
			if (auxVar == '' || 
				auxVar.length != 5 ||
				isNaN(auxVar.substring(0, 2)) ||
				isNaN(auxVar.substring(3, 5)) ||
				auxVar.substring(2, 3) != ":" ||
				auxVar.substring(0, 2) > 23 ||
				auxVar.substring(3, 5) > 59)
			{
				$('#hora_inicio').addClass('inputFocus');	
				erro = true;
			}
			else $('#hora_inicio').removeClass('inputFocus');
		}
			
		// Se não for permanente
		if ($("input:radio[name=infoPermanente]:checked").val() == "Não") {
			// Avalia data de término
			if ($('#data_termino').val() == '')
			{
				$('#data_termino').addClass('inputFocus');	
				erro = true;
			} 
			else $('#data_termino').removeClass('inputFocus');		
			
			// Se não for dia inteiro
			if ($("input:radio[name=infoDiaInteiro]:checked").val() == "Não") {
				// Avalia hora de término
				var auxVar = $('#hora_termino').val();
				if (auxVar == '' || 
					auxVar.length != 5 ||
					isNaN(auxVar.substring(0, 2)) ||
					isNaN(auxVar.substring(3, 5)) ||
					auxVar.substring(2, 3) != ":" ||
					auxVar.substring(0, 2) > 23 ||
					auxVar.substring(3, 5) > 59)
				{
					$('#hora_termino').addClass('inputFocus');	
					erro = true;
				}
				else $('#hora_termino').removeClass('inputFocus');
			}
		}			
		else {
			$('#data_termino').removeClass('inputFocus');
			$('#hora_termino').removeClass('inputFocus');
		}
	}
	
	switch ($('#tipoPeriodicidadeLabel').val()) {
	// Periodiciade semanal (2)
	case "Semanal":
		// Avalia se pelo menos um dia de semana foi selecionado
		var diaSemanaSelecionado = false;
		for (var i = 0; i < ATIVIDADE.listaTiposDiaSemana.length; i++) {
			if ($("#dias_semana_" + i).is(":checked") == true) {
				diaSemanaSelecionado = true;
				break;
			}
		}
		if (diaSemanaSelecionado == false) {
			$('#container_dias_semana').addClass('inputFocus');	
			erro = true;			
		}
		else {
			$('#container_dias_semana').removeClass('inputFocus');
		}
	break;
	
	// Periodicidade mensal (3)
	case "Mensal":
		if ($("input:radio[name=infoRepetir]:checked").val() == "dia do mês")
		{
			if ($('#dia_mes_repetir').val() == '' || $('#dia_mes_repetir').val().length != 2 || parseInt($('#dia_mes_repetir').val()) > 31 || parseInt($('#dia_mes_repetir').val()) < 1)
			{
				$('#dia_mes_repetir').addClass('inputFocus');	
				erro = true;
			}
			else
				$('#dia_mes_repetir').removeClass('inputFocus');
		}
		else if ($('#repetir').val() == '1')
		{
			if ( $('#dia_semana_repetir').val() == '' )
			{
				$('#infoDiasSemanaRadio').addClass('inputFocus');	
				erro = true;
			}
			else $('#infoDiasSemanaRadio').removeClass('inputFocus');
		}
	break;
	
	// Periodicidades anual (4)
	case "Anual":
		// Avalia dia do ano a repetir
		if ($('#dia_ano_repetir').val() == '' || $('#dia_ano_repetir').val().length != 5)
		{
			$('#dia_ano_repetir').addClass('inputFocus');	
			erro = true;
		}
		else $('#dia_ano_repetir').removeClass('inputFocus');
	break;	
	}
	// Se houve erro
	if (erro == true) {
		// Apresenta mensagem "msgAtencao"
		$('.msgAtencao').removeAttr('style');
		$('.msgParabens').attr('style', 'display:none');
		$('.msgErro').attr('style', 'display:none');
	}
	else {
		$('.msgAtencao').attr('style', 'display:none');
		$('.msgParabens').attr('style', 'display:none');
		$('.msgErro').attr('style', 'display:none');

		// Salva a atividade
		var diasSemanaRepetir = [];
		for (var i = 0; i < ATIVIDADE.listaTiposDiaSemana.length; i++) {
			if ($("#dias_semana_" + i).is(":checked") == true) {
				diasSemanaRepetir.push($("#dias_semana_" + i).val());
			}
		}
		
		// todo: testes retirar
		console.log("Índice da atividade: " + null +
					 "\r\nPonto de serviço: " + $("#pontoServicoLabel").val() +
					 "\r\nTipo de Atuação: " + $("#tipoAtuacaoLabel").val() +
					 "\r\nPrivada: " + ($("input:radio[name=infoPrivada]:checked").val() == "Não" ? 0 : 1) +
					 "\r\nTítulo: " + $("#descricao").val() +
					 "\r\nPeriodicidade: " + $("#tipoPeriodicidadeLabel").val() +
					 "\r\nDia inteiro: " + ($("input:radio[name=infoDiaInteiro]:checked").val() == "Não" ? 0 : 1) +
					 "\r\nData de início: " + $('#data_inicio').val() +
					 "\r\nHora de início: " + $('#hora_inicio').val() +
					 "\r\nPermanente: " + ($("input:radio[name=infoPermanente]:checked").val() == "Não" ? 0 : 1) +
					 "\r\nData de término: " + $('#data_termino').val() +
					 "\r\nHora de término: " + $('#hora_termino').val() +
					 "\r\nDias da semana: " + diasSemanaRepetir + 
					 "\r\nDia da semana: " + $("input:radio[name=infoDiasSemanaRadio]:checked").val() + 
					 "\r\nDia do mês repetir: " + $("#dia_mes_repetir").val() +
					 "\r\nDia do ano repetir: " + $('#dia_ano_repetir').val());
		//alert("Ver console");
		// todo: testes retirar
		
		ATIVIDADE.salvaAtividade(ATIVIDADE.editIndexAtividade,													// índice da atividade
								 $("#pontoServicoLabel").val(),													// ponto de serviço (nome)
								 $("#tipoAtuacaoLabel").val(),													// tipo de atuação (nome)
								 $("input:radio[name=infoPrivada]:checked").val() == "Não" ? 0 : 1,				// privada
								 $("#descricao").val(),															// título == descrição
								 $("#tipoPeriodicidadeLabel").val(),											// periodicidade (nome)
								 $("input:radio[name=infoDiaInteiro]:checked").val() == "Não" ? 0 : 1,			// dia inteiro
								 $('#data_inicio').val(),														// data de início
								 $('#hora_inicio').val() == "" ? null : $('#hora_inicio').val(),				// hora de início
								 $("input:radio[name=infoPermanente]:checked").val() == "Não" ? 0 : 1,			// permanente
								 $('#data_termino').val(),														// data de término
								 $('#hora_termino').val() == "" ? null : $('#hora_termino').val(),				// hora de término
								 diasSemanaRepetir,																// repetir nos dias da semana
								 // repetir no dia da semana (mensal)
								 $("input:radio[name=infoRepetir]:checked").val() == "dia do mês" ? null : $("input:radio[name=infoDiasSemanaRadio]:checked").val(),
								 // repetir no dia do mês
								 $("input:radio[name=infoRepetir]:checked").val() == "dia do mês" ? $("#dia_mes_repetir").val() : null,
								 $('#dia_ano_repetir').val() == "" ? null :$('#dia_ano_repetir').val(),			// repetir no dia do ano
								 this.salvaAtividadeSuccess,
								 this.salvaAtividadeFail);
	}
*/
}
