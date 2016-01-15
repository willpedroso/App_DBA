function carregaSituacaoDBA () {
	console.log("carregaSituacaoDBA");
	
	// todo: revisar sempre em edição
	var edit = true;
	
	// Situação Cadastral
	if (SITUACAODBA.situacaoCadastral == 1) {
		$("input[name='infoSituacaoDba'][value='Ativo']").prop("checked", true);
	}
	else {
		$("input[name='infoSituacaoDba'][value='Inativo']").prop("checked", true);
	}	
	infoSitDba();
	
	// Motivo da inativação
	opts = "";
	for (var i = 0; i < CIDADAO.listaTipoMotivoInativacao.length; i++) {
		var encontrou = false;
		for (var j = 0; j < SITUACAODBA.listaMotivoInativacao.length; j++) {
			if (SITUACAODBA.listaMotivoInativacao[j] == CIDADAO.listaTipoMotivoInativacao[i].id) {
				encontrou = true;
				break;
			}
		}
		opts += "<div class='checkbox'><input type='checkbox' name='motivoInativacao" + i + "' value='" + i + "' class='checkbox check'" + (encontrou == true ? "checked" : "") + ">";
		opts += "<p>" + CIDADAO.listaTipoMotivoInativacao[i].nome + "</p></div>";
	}
	opts += "<input type='text' class='inputMed' value='' name='motivo_inativacao_outros' id='motivo_inativacao_outros' placeholder='Outros'>";
	opts += "</div>";
	
	$("#listaMotivoInativacao").empty();
	$("#listaMotivoInativacao").append(opts);
	
	// Prioridade
	if (SITUACAODBA.prioridade == 1) {
		$("input[name='infoPrioridade'][value='Sim']").prop("checked", true);
	}
	else if (SITUACAODBA.prioridade == 0) {
		$("input[name='infoPrioridade'][value='Não']").prop("checked", true);
	}
	else {
		$("input[name='infoPrioridade'][value='NãoInformado']").prop("checked", true);
	}
	
	// Autoriza Programa DBA
	if (SITUACAODBA.programaDBA == 1) {
		$("input[name='infoProgramaDba'][value='Sim']").prop("checked", true);
	}
	else {
		$("input[name='infoProgramaDba'][value='Não']").prop("checked", true);
	}
	infoPrDba();
	
	// Local de acolhida
	var opts = "<select name='localAcolhidaLabel' id='localAcolhidaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAO.listaPontosServico.length; i++) {
		opts += "<option value='" + i + "' data-id='localAcolhidaLabel' for='ponto_servico_id'";
		opts += ((edit == true && SITUACAODBA.pontoServicoId == CIDADAO.listaPontosServico[i].id) ? " selected>" : ">") + CIDADAO.listaPontosServico[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaLocalAcolhida").empty();
	$("#listaLocalAcolhida").append(opts);
	
	// Carrega motivo inativação outros
	if (edit == true) {
		$("#motivo_inativacao_outros").val(SITUACAODBA.motivoInativacaoOutros == null ? "" : SITUACAODBA.motivoInativacaoOutros);
	}
}

function salvaSituacaoDBASuccess () {
	console.log("salvaSituacaoDBASuccess");
	// todo: testes retirar
	alert("Situação DBA foi salva com sucesso.");
	// todo: testes retirar
}

function salvaSituacaoDBAFail (err) {
	console.log("salvaSituacaoDBAFail: " + err);
	// todo: testes retirar
	alert("Houve erro no salvamento da situação DBA: " + err);
	// todo: testes retirar
}

function validaCamposSituacaoDBA() {
	console.log("validaCamposSituacaoDBA");

	var erro = false;

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

		var prioridade = null;
		if ($("input:radio[name=infoPrioridade]:checked").val() == "Sim") {
			prioridade = 1;
		}
		else if ($("input:radio[name=infoPrioridade]:checked").val() == "Não") {
			prioridade = 0;
		}

		// Lista de motivos de inativação
		var mi = [];
		for (var i = 0; i < CIDADAO.listaTipoMotivoInativacao.length; i++) {
			if ($("input:checkbox[name=motivoInativacao" + i + "]:checked").val()) {
				// Está marcado
				mi.push(CIDADAO.listaTipoMotivoInativacao[i].id);
			}
		}

		SITUACAODBA.salvaSituacaoDBA(($("input:radio[name=infoSituacaoDba]:checked").val() == "Ativo" ? 1 : 0),
									 $("#motivo_inativacao_outros").val(),
									 prioridade,	
									 ($("input:radio[name=infoProgramaDba]:checked").val() == "Sim" ? 1 : 0),
									 $("#localAcolhidaLabel").val() == "Selecione" ? null : CIDADAO.listaPontosServico[$("#localAcolhidaLabel").val()].id,
									 mi,
									 this.salvaSituacaoDBASuccess,
									 this.salvaSituacaoDBAFail);
	}
}
