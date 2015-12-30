function preparaListasOpt () {
	console.log("preparaListasOpt: edição = " + (ATIVIDADE.editIndexAtividade != null ? "Sim" : "Não"));
	
	var edit = false;
	if(edit = (ATIVIDADE.editIndexAtividade != null)) {
		var auxVar;
		// Título
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].descricao;
		$("#descricao").val(auxVar == null ? "" : auxVar);
		
		// Atividade privada
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].privada;
		$("input[name='infoPrivada'][value='Não']").prop("checked", auxVar == null || auxVar == 0 ? true : false);
		$("input[name='infoPrivada'][value='Sim']").prop("checked", auxVar == 1 ? true : false);

		// Dia inteiro
		$("input[name='infoDiaInteiro'][value='Não']").prop("checked", ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_inteiro == 0 ? true : false);
		$("input[name='infoDiaInteiro'][value='Sim']").prop("checked", ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_inteiro == 1 ? true : false);
		
		// Data de início
		$("#data_inicio").val(ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_data_inicio);
		
		// Hora de início
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_hora_inicio;
		$("#hora_inicio").val(auxVar == null ? "" : auxVar);
		
		// Permanente
		$("input[name='infoPermanente'][value='Não']").prop("checked", ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_permanente == 0 ? true : false);
		$("input[name='infoPermanente'][value='Sim']").prop("checked", ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_permanente == 1 ? true : false);
		
		// Data de término
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_data_termino;
		$("#data_termino").val(auxVar == null ? "" : auxVar);
		
		// Hora de término
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_hora_termino;
		$("#hora_termino").val(auxVar == null ? "" : auxVar);
		
		// Repetir (dia do mês ou dia da semana para a primeira ocorrência)
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_mes_repetir;
		$("input[name='infoRepetir'][value='dia do mês']").prop("checked", auxVar != null ? true : false);
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_semana_repetir;
		$("input[name='infoRepetir'][value='dia da semana']").prop("checked", auxVar != null ? true : false);
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_mes_repetir;
		$("#dia_mes_repetir").val(auxVar == null ? "" : auxVar);
		
		// Repetir no dia (dd/mm para periodicidade anual)
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_ano_repetir;
		$("#dia_ano_repetir").val(auxVar == null ? "" : auxVar);
	}
	
	// Lista de pontos de serviço
	var opts = "<select name='pontoServicoLabel' id='pontoServicoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='pontoServicoLabel' for='ponto_servico_id'>Selecione</option>";
	for (var i = 0; i < ATIVIDADE.listaTiposServico.length; i++) {
	//	opts += "<option value='" + i + "' data-id='pontoServicoLabel' for='ponto_servico_id'>" + ATIVIDADE.listaTiposServico[i].nome + "</option>";
		opts += "<option value='" + i + "' data-id='pontoServicoLabel' for='ponto_servico_id'";
		opts += ((edit == true && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_servico_nome == ATIVIDADE.listaTiposServico[i].nome) ? " selected>" : ">") + ATIVIDADE.listaTiposServico[i].nome + "</option>";
	}
	opts += "</div></select>";
	//console.log(opts + "\r\n");
	
	$("#listaPontosServicos").empty();
	$("#listaPontosServicos").append(opts);
	
	// Lista de tipos de atuação
	opts = "<select name='tipoAtuacaoLabel' id='tipoAtuacaoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'>Selecione</option>";
	for (var i = 0; i < ATIVIDADE.listaTiposAtuacao.length; i++) {
	//	opts += "<option value='" + i + "' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'>" + ATIVIDADE.listaTiposAtuacao[i].nome + "</option>";
		opts += "<option value='" + i + "' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'";
		opts += ((edit == true && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_atuacao_nome == ATIVIDADE.listaTiposAtuacao[i].nome) ? " selected>" : ">") + ATIVIDADE.listaTiposAtuacao[i].nome + "</option>";
	}
	opts += "</div></select>";
	//console.log(opts + "\r\n");
	
	$("#listaTiposAtuacao").empty();
	$("#listaTiposAtuacao").append(opts);
	
	// Lista de tipos de periodicidade
	opts = "<select name='tipoPeriodicidadeLabel' id='tipoPeriodicidadeLabel' onChange='exibePeriodo()' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='tipoPeriodicidadeLabel' for='tipo_periodicidade_id'>Selecione</option>";
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
	infoRep();
	exibePeriodo();
	infoDiaInt();
	infoPerma();
}

function salvaAtividadeSuccess () {
	console.log("salvaAtividadeSuccess");
	
}

function salvaAtividadeFail () {
	console.log("salvaAtividadeFail");
	
}

function validaCampos() {
	console.log("validaCampos");

	var erro = false;
	
	// Avalia ponto de serviço
	if ($("#pontoServicoLabel").val() == "selecione") {
		$("#pontoServicoLabel").addClass("inputFocus");
		erro = true;
	}
	else $("#pontoServicoLabel").removeClass("inputFocus");
	
	// Avalia tipo de atuação
	if ($("#tipoAtuacaoLabel").val() == "selecione") {
		$("#tipoAtuacaoLabel").addClass("inputFocus");
		erro = true;
	}
	else $("#tipoAtuacaoLabel").removeClass("inputFocus");
	
	// Avalia tipo de periodicidade
	if ($("#tipoPeriodicidadeLabel").val() == "selecione") {
		$("#tipoPeriodicidadeLabel").addClass("inputFocus");
		erro = true;
	}
	else $("#tipoPeriodicidadeLabel").removeClass("inputFocus");
	
	// Havendo algum tipo de periodiciade
	if ($("#tipoPeriodicidadeLabel").val() != "selecione") {
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
			if ( $('#hora_inicio').val() == '' || $('#hora_inicio').val().length != 5)
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
				if ($('#hora_termino').val() == '' || $('#hora_termino').val().length != 5)
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
		alert("Ver console");
		// todo: testes retirar
		
		ATIVIDADE.salvaAtividade(ATIVIDADE.editIndexAtividade,													// índice da atividade
								 $("#pontoServicoLabel").val(),													// ponto de serviço (nome)
								 $("#tipoAtuacaoLabel").val(),													// tipo de atuação (nome)
								 $("input:radio[name=infoPrivada]:checked").val() == "Não" ? 0 : 1,				// privada
								 $("#descricao").val(),															// título == descrição
								 $("#tipoPeriodicidadeLabel").val(),											// periodicidade (nome)
								 $("input:radio[name=infoDiaInteiro]:checked").val() == "Não" ? 0 : 1,			// dia inteiro
								 $('#data_inicio').val(),														// data de início
								 $('#hora_inicio').val(),														// hora de início
								 $("input:radio[name=infoPermanente]:checked").val() == "Não" ? 0 : 1,			// permanente
								 $('#data_termino').val(),														// data de término
								 $('#hora_termino').val(),														// hora de término
								 diasSemanaRepetir,																// repetir nos dias da semana
								 $("input:radio[name=infoDiasSemanaRadio]:checked").val(),						// repetir no dia da semana
								 $("#dia_mes_repetir").val(),													// repetir no dia do mês
								 $('#dia_ano_repetir').val(),													// repetir no dia do ano
								 this.salvaAtividadeSuccess,
								 this.salvaAtividadeFail);
	}
}
