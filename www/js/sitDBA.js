function carregaSituacaoDBA () {
	console.log("carregaSituacaoDBA");
	
	// todo: revisar sempre em edição
	var edit = true;
	
	// Situação Cadastral
	if (SITUACAODBA.situacaoCadastral === 1) {
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
	if (USUARIO.perfil_tecnico != true) {
		opts += "<input type='text' class='inputMed' value='' name='motivo_inativacao_outros' id='motivo_inativacao_outros' placeholder='Outros'>";
		opts += "</div>";
	}
	
	$("#listaMotivoInativacao").empty();
	$("#listaMotivoInativacao").append(opts);
	
	// Prioridade
	if (SITUACAODBA.prioridade === 0) {
		$("input[name='infoPrioridade'][value='0']").prop("checked", true);
	}
	else if (SITUACAODBA.prioridade === 1) {
		$("input[name='infoPrioridade'][value='1']").prop("checked", true);
	}
	else if (SITUACAODBA.prioridade === 2) {
		$("input[name='infoPrioridade'][value='2']").prop("checked", true);
	}
	else {
		$("input[name='infoPrioridade'][value='3']").prop("checked", true);
	}
	
	// Autoriza Programa DBA
	if (SITUACAODBA.programaDBA === 1) {
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
		$("#motivo_inativacao_outros").val(SITUACAODBA.motivoInativacaoOutros === null ? "" : SITUACAODBA.motivoInativacaoOutros);
	}
	
	// Data de inclusão no DBA
	$("#data_inc_dba").val(SITUACAODBA.dt_inclusao_dba != null ? SITUACAODBA.dt_inclusao_dba.substr(0, 10) : "");
	
	// Data de exclusão no DBA
	$("#data_exc_dba").val(SITUACAODBA.dt_exclusao_dba != null ? SITUACAODBA.dt_exclusao_dba.substr(0, 10) : "");
	
	// Ajusta campos apresentados para usuário
	if (USUARIO.perfil_tecnico == true) {
		ajustaCamposTecnico();
	}
}

function ajustaCamposTecnico () {
	console.log("ajustaCamposTecnico");

	// Texto indicador de campos obrigatórios
	jQuery('#indicaCamposObrigatorios').attr('style','display:none');

	// Situação Cadastral - Apenas leitura
	$("input[name='infoSituacaoDba']").prop("disabled", true);
	
	// Motivo da inativação - Não apresentado
	jQuery('#motivoInativacao').attr('style','display:none');
	
	// Prioridade
	jQuery('#divPrioridade').attr('style','display:none');
	
	// Autoriza Programa DBA
	jQuery('#autorizaDba').attr('style','display:none');
	
	// Local de acolhida
	jQuery('#localDba').attr('style','display:none');
	
	// Data de inclusão no DBA
	jQuery('#dataInclusaoDBA').attr('style','display:none');
	
	// Data de exclusão no DBA
	jQuery('#dataExclusaoDBA').attr('style','display:none');

	// Botão Salvar
	jQuery('#botaoSalvar').attr('style','display:none');
}

function salvaSituacaoDBASuccess () {
	console.log("salvaSituacaoDBASuccess");
}

function salvaSituacaoDBAFail (err) {
	console.log("salvaSituacaoDBAFail: " + err);
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
		if ($("input:radio[name=infoPrioridade]:checked").val() === "Sim") {
			prioridade = 1;
		}
		else if ($("input:radio[name=infoPrioridade]:checked").val() === "Não") {
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
		
		// prepara data de inclusão e exclusão
		var dinclusao_Text = "";
		var dinclusao;
		if ($('#data_inc_dba').val() != "") {
			dinclusao = new Date($('#data_inc_dba').val());
			dinclusao_Text = dinclusao.getFullYear() + "-" + ((dinclusao.getMonth()+1) < 10 ? "0" + (dinclusao.getMonth()+1) : (dinclusao.getMonth()+1)) + "-" + (dinclusao.getDate() < 10 ? "0" + dinclusao.getDate() : dinclusao.getDate());
		}

		var dexclusao_Text = "";
		var dexclusao;
		if ($('#data_exc_dba').val() != "") {
			dexclusao = new Date($('#data_exc_dba').val());
			dexclusao_Text = dexclusao.getFullYear() + "-" + ((dexclusao.getMonth()+1) < 10 ? "0" + (dexclusao.getMonth()+1) : (dexclusao.getMonth()+1)) + "-" + (dexclusao.getDate() < 10 ? "0" + dexclusao.getDate() : dexclusao.getDate());
		}
		
		// todo: testes retirar
		console.log("Data de inclusão: " + dinclusao_Text);
		console.log("Data de exclusão: " + dexclusao_Text);
		// testes retirar
		
		SITUACAODBA.salvaSituacaoDBA(($("input:radio[name=infoSituacaoDba]:checked").val() == "Ativo" ? 1 : 0),
									 $("#motivo_inativacao_outros").val(),
									 prioridade,	
									 ($("input:radio[name=infoProgramaDba]:checked").val() == "Sim" ? 1 : 0),
									 $("#localAcolhidaLabel").val() == "Selecione" ? null : CIDADAO.listaPontosServico[$("#localAcolhidaLabel").val()].id,
									 mi,
									 dinclusao_Text,
									 dexclusao_Text,
									 this.salvaSituacaoDBASuccess,
									 this.salvaSituacaoDBAFail);
	}
}
