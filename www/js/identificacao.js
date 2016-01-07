function carregaDadosCidadao () {
	console.log("carregaDadosCidadao");
	
	$("#nome").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome);
	$("#nome_social").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_social);
	$("#nome_mae").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].nome_mae);
	$("#sisrua").val(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].sisrua);
	console.log(CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].dia_nascimento + "/" +
										CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].mes_nascimento + "/" +
										CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].ano_nascimento);
	$("#data_nascimento").attr("value", CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].dia_nascimento + "/" +
										CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].mes_nascimento + "/" +
										CIDADAO.listaCidadaosDadosBusca[CIDADAO.indiceListaCidadao].ano_nascimento);
}	

function salvaCidadaoSuccess () {
	console.log("salvaCidadaoSuccess");
	
}

function salvaCidadaoFail (err) {
	console.log("identificacao.salvaCidadaoFail: " + err);
	
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
