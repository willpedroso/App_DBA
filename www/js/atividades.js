function preparaListasOpt () {
	console.log("preparaListasOpt");
	
	var edit = false;
	var readonlyAtividade = false;
	if(edit = (ATIVIDADE.editIndexAtividade != null)) {
		if (ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_servico_id == ATIVIDADE.servicoTipoAcolhida || ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].status == 2) {
			// É uma atividade do tipo "Acolhida" ou atividade cancelada/encerrada, não pode ser editada
			readonlyAtividade = true;
		}
		if (readonlyAtividade == false && 
			ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_atuacao_id != ATIVIDADE.listaAtuacao_NomeVersusID["Todas"] &&
			USUARIO.perfil_tecnico == true) {
			// Perfil técnico: obtém as atividades da atuação do técnico (incluindo as acumuladas) e "Todas"
			var i = 0;
			readonlyAtividade = true;
			var perfil = USUARIO.perfil_codigo;
			do {
				switch (perfil) {
				case "TSAU":
					if (ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_atuacao_id == ATIVIDADE.listaAtuacao_NomeVersusID["Saúde"]) {
						readonlyAtividade = false;
					}
					break;
				case "TTRA":
					if (ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_atuacao_id == ATIVIDADE.listaAtuacao_NomeVersusID["Trabalho"]) {
						readonlyAtividade = false;
					}
					break;
				case "TSOC":
					if (ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_atuacao_id == ATIVIDADE.listaAtuacao_NomeVersusID["Social"]) {
						readonlyAtividade = false;
					}
					break;
				}
			} while ((i < USUARIO.perfil_acumulado.length) && (perfil = USUARIO.perfil_acumulado[i++]) != null);
		}		
		var auxVar;
		// Título
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].descricao;
		$("#descricao").val(auxVar == null ? "" : auxVar);
		$("#descricao").prop("readonly", readonlyAtividade);
		
		// Atividade privada
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].privada;
		$("input[name='infoPrivada'][value='Não']").prop("checked", auxVar == null || auxVar == 0 ? true : false);
		$("input[name='infoPrivada'][value='Sim']").prop("checked", auxVar == 1 ? true : false);
		$("input[name='infoPrivada']").prop("disabled", readonlyAtividade);

		// Dia inteiro
		$("input[name='infoDiaInteiro'][value='Não']").prop("checked", ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_inteiro == 0 ? true : false);
		$("input[name='infoDiaInteiro'][value='Sim']").prop("checked", ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_inteiro == 1 ? true : false);
		$("input[name='infoDiaInteiro']").prop("disabled", readonlyAtividade);
		
		// Data de início
		var auxData = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_data_inicio.split("-");
		$("#data_inicio").val(auxData[2] + "/" + auxData[1] + "/" + auxData[0]);
		if (readonlyAtividade) {
			$("#data_inicio").attr("disabled", "disabled");
		}
		else {
			$("#data_inicio").removeAttr("disabled");
		}
		
		// Hora de início
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_hora_inicio;
		$("#hora_inicio").val(auxVar == null ? "" : auxVar);
		$("#hora_inicio").prop("readonly", readonlyAtividade);
		
		// Permanente
		$("input[name='infoPermanente'][value='Não']").prop("checked", ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_permanente == 0 ? true : false);
		$("input[name='infoPermanente'][value='Sim']").prop("checked", ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_permanente == 1 ? true : false);
		$("input[name='infoPermanente']").prop("disabled", readonlyAtividade);
		
		// Data de término
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_data_termino;
		auxData = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_data_termino.split("-");
		$("#data_termino").val(auxVar == null ? "" : auxData[2] + "/" + auxData[1] + "/" + auxData[0]);
		if (readonlyAtividade) {
			$("#data_termino").attr("disabled", "disabled");
		}
		else {
			$("#data_termino").removeAttr("disabled");
		}
		
		// Hora de término
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_hora_termino;
		$("#hora_termino").val(auxVar == null ? "" : auxVar);
		$("#hora_termino").prop("readonly", readonlyAtividade);
		
		// Repetir (dia do mês ou dia da semana para a primeira ocorrência)
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_mes_repetir;
		$("input[name='infoRepetir'][value='dia do mês']").prop("checked", auxVar != null ? true : false);
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_semana_repetir;
		$("input[name='infoRepetir'][value='dia da semana']").prop("checked", auxVar != null ? true : false);
		$("input[name='infoRepetir']").prop("disabled", readonlyAtividade);
		
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_mes_repetir;
		$("#dia_mes_repetir").val(auxVar == null ? "" : auxVar);
		$("#dia_mes_repetir").prop("readonly", readonlyAtividade);
	
		// Repetir no dia (dd/mm para periodicidade anual)
		auxVar = ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].periodicidade_dia_ano_repetir;
		$("#dia_ano_repetir").val(auxVar == null ? "" : auxVar);
		$("#dia_ano_repetir").prop("readonly", readonlyAtividade);
	}
	
	// Lista de pontos de serviço
	var opts = "<select name='pontoServicoLabel' id='pontoServicoLabel' class='selectPersonalizado'" + (readonlyAtividade == true ? " disabled='true'>" : ">") + "<div class='lista-box-scroll'><option value='Selecione' data-id='pontoServicoLabel' for='ponto_servico_id'>Selecione</option>";
	for (var i = 0; i < ATIVIDADE.listaPontosServico.length; i++) {
		if (edit == false && ATIVIDADE.listaPontosServico[i].tipo_servico_id == ATIVIDADE.servicoTipoAcolhida) {
			// Nova atividade, não apresenta pontos de serviço do tipo "Acolhida"
			continue;
		}
		opts += "<option value='" + i + "' data-id='pontoServicoLabel' for='ponto_servico_id'";
		//opts += "<option value='" + ATIVIDADE.listaTiposServico[i].id + "' data-id='pontoServicoLabel' for='ponto_servico_id'";
		opts += ((edit == true && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].ponto_servico_nome == ATIVIDADE.listaPontosServico[i].nome) ? " selected>" : ">") + ATIVIDADE.listaPontosServico[i].nome + "</option>";
	}
	opts += "</div></select>";
	
	$("#listaPontosServicos").empty();
	$("#listaPontosServicos").append(opts);
	
	// ********************** lista de tipos de atuação por perfil de usuário ****************************
	var listaTiposAtuacaoPerfilUsuario = [];
	if (USUARIO.perfil_tecnico == true) {
		var i = 0;
		var perfil = USUARIO.perfil_codigo;
		do {
			switch (perfil) {
			case "TSAU":
				for (var j = 0; j < ATIVIDADE.listaTiposAtuacao.length; j++) {
					if (ATIVIDADE.listaTiposAtuacao[i].nome == "Saúde") {
						listaTiposAtuacaoPerfilUsuario.push (ATIVIDADE.listaTiposAtuacao[i]);
						break;
					}
				}
				break;
			case "TTRA":
				for (var j = 0; j < ATIVIDADE.listaTiposAtuacao.length; j++) {
					if (ATIVIDADE.listaTiposAtuacao[i].nome == "Trabalho") {
						listaTiposAtuacaoPerfilUsuario.push (ATIVIDADE.listaTiposAtuacao[i]);
						break;
					}
				}
				break;
			case "TSOC":
				for (var j = 0; j < ATIVIDADE.listaTiposAtuacao.length; j++) {
					if (ATIVIDADE.listaTiposAtuacao[i].nome == "Social") {
						listaTiposAtuacaoPerfilUsuario.push (ATIVIDADE.listaTiposAtuacao[i]);
						break;
					}
				}
				break;
			}
		} while ((i < USUARIO.perfil_acumulado.length) && (perfil = USUARIO.perfil_acumulado[i++]) != null);
		if (listaTiposAtuacaoPerfilUsuario.length == ATIVIDADE.listaTiposAtuacao.length - 1) {
			// inclui todas
			for (var j = 0; j < ATIVIDADE.listaTiposAtuacao.length; j++) {
				if (ATIVIDADE.listaTiposAtuacao[i].nome == "Todas") {
					listaTiposAtuacaoPerfilUsuario.push (ATIVIDADE.listaTiposAtuacao[i]);
					break;
				}
			}
		}
	}
	else {
		// Disponibiliza todos os tipos de atuação
		listaTiposAtuacaoPerfilUsuario = ATIVIDADE.listaTiposAtuacao;
	}
	// ********************** lista de tipos de atuação por perfil de usuário ****************************
	
	// Lista de tipos de atuação
	opts = "<select name='tipoAtuacaoLabel' id='tipoAtuacaoLabel' class='selectPersonalizado'" + (readonlyAtividade == true ? " disabled='true'>" : ">") + "<div class='lista-box-scroll'><option value='Selecione' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'>Selecione</option>";
//	for (var i = 0; i < ATIVIDADE.listaTiposAtuacao.length; i++) {
	for (var i = 0; i < listaTiposAtuacaoPerfilUsuario.length; i++) {
		opts += "<option value='" + i + "' data-id='tipoAtuacaoLabel' for='tipo_atuacao_id'";
//		opts += ((edit == true && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_atuacao_nome == ATIVIDADE.listaTiposAtuacao[i].nome) ? " selected>" : ">") + ATIVIDADE.listaTiposAtuacao[i].nome + "</option>";
		opts += ((edit == true && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].tipo_atuacao_nome == listaTiposAtuacaoPerfilUsuario[i].nome) ? " selected>" : ">") + listaTiposAtuacaoPerfilUsuario[i].nome + "</option>";
	}
	opts += "</div></select>";
	
	$("#listaTiposAtuacao").empty();
	$("#listaTiposAtuacao").append(opts);
	
	// Lista de tipos de periodicidade
	opts = "<select name='tipoPeriodicidadeLabel' id='tipoPeriodicidadeLabel' onChange='exibePeriodo()' class='selectPersonalizado'" + (readonlyAtividade == true ? " disabled='true'>" : ">") + "<div class='lista-box-scroll'><option value='Selecione' data-id='tipoPeriodicidadeLabel' for='tipo_periodicidade_id'>Selecione</option>";
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
		opts += "<div class='checkbox' disabled='" + readonlyAtividade + "'>";
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
		opts += "<input type='radio' name='infoDiasSemanaRadio' value='" + ATIVIDADE.listaTiposDiaSemana[i].id + "' class='radio' disabled='" + (readonlyAtividade == true ? " disabled='true'" : "");
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
	
	// Botão salvar atividade
	if(readonlyAtividade) {
		$("#salvarAtividade").attr('style','display:none');
		$("#encerrarAtividade").attr('style','display:none');
		$("#excluirAtividade").attr('style','display:none');
	}
	else {
		$("#salvarAtividade").attr('style','display:block');
		$("#encerrarAtividade").attr('style','display:block');
		$("#excluirAtividade").attr('style','display:block');
	}
	
	if (edit == true && ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].status == 2) {
		$('.msgAtividadeEncerrada').attr('style','display:block');
	}
	else {
		$('.msgAtividadeEncerrada').attr('style','display:none');
	}
	
	if (edit == false) {
		// É uma nova atividade (não salva) -> não apresenta os botões de encerramento e exclusão
		$("#encerrarAtividade").attr('style','display:none');
		$("#excluirAtividade").attr('style','display:none');
	}
}

function salvaAtividadeSuccess () {
	console.log("salvaAtividadeSuccess");
}

function salvaAtividadeFail (err) {
	console.log("atividades.salvaAtividadeFail: " + err);
}

function confirmEncerraAtiv() {
	console.log("confirmEncerraAtiv");
	
	alertOptionsCallback("Confirma a operação de encerramento da atividade?", encerraAtiv);
}

function encerraAtiv() {
	console.log("encerraAtiv");
	
	ATIVIDADE.encerraAtividade();
}

function confirmExcluiAtiv() {
	console.log("confirmExcluiAtiv");
	
	alertOptionsCallback("Confirma a operação de exclusão da atividade?", excluiAtiv);
}

function excluiAtiv() {
	console.log("excluiAtiv");

	ATIVIDADE.excluiAtividade(ATIVIDADE.editIndexAtividade);
}

function validaCampos() {
	console.log("validaCampos");

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
		$('.msgAtencao').removeAttr('style').fadeOut(5000);
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
		/*
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
		*/
		// todo: testes retirar
		var auxDataInicio = $('#data_inicio').val().split("/");
		var auxDataTermino = $('#data_termino').val().split("/");
		ATIVIDADE.salvaAtividade(ATIVIDADE.editIndexAtividade,													// índice da atividade
								 $("#pontoServicoLabel").val(),													// ponto de serviço (nome)
								 $("#tipoAtuacaoLabel").val(),													// tipo de atuação (nome)
								 $("input:radio[name=infoPrivada]:checked").val() == "Não" ? 0 : 1,				// privada
								 $("#descricao").val(),															// título == descrição
								 $("#tipoPeriodicidadeLabel").val(),											// periodicidade (nome)
								 $("input:radio[name=infoDiaInteiro]:checked").val() == "Não" ? 0 : 1,			// dia inteiro
								 auxDataInicio[2] + "-" + auxDataInicio[1] + "-" + auxDataInicio[0],			// data de início
								 $('#hora_inicio').val() == "" ? null : $('#hora_inicio').val(),				// hora de início
								 $("input:radio[name=infoPermanente]:checked").val() == "Não" ? 0 : 1,			// permanente
								 auxDataTermino[2] + "-" + auxDataTermino[1] + "-" + auxDataTermino[0],			// data de término
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
}
