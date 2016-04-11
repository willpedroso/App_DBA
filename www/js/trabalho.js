//abre input frente de trabalho
function abreFrentetrabalho(){
	if ($("input:radio[name=infoFrentetrabalho]:checked").val() == "Sim") {
		jQuery('#infoFrentetrabalhoGrupo').show();
	}
	else {
		jQuery('#infoFrentetrabalhoGrupo').hide();
	}
};

function trabalhoOpcoes () {
	console.log("trabalhoOpcoes");
}

function carregaTrabalho () {
	console.log("carregaTrabalho");
	
	// Verifica se é salvamento
	if (CIDADAOTRABALHO.ehSalvamento == true) {
		$('.msgParabens').removeAttr('style').fadeOut(5000);
		$('html, body').animate({scrollTop:0}, 'slow');
		CIDADAOTRABALHO.ehSalvamento = false;
	}
	
	var edit = true;		// todo: sempre em edição

	if (CIDADAOTRABALHO.dadosTrabalho.participa_frente_trabalho === 1) {
		// Sim
		$("input[name='infoFrentetrabalho'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOTRABALHO.dadosTrabalho.participa_frente_trabalho === 0) {
		// Não
		$("input[name='infoFrentetrabalho'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoFrentetrabalho'][value='Não Informado']").prop("checked", true);
	}
	abreFrentetrabalho();
	
	var auxVar;
	// Frente de Trabalho
	auxVar = CIDADAOTRABALHO.dadosTrabalho.frente_trabalho;
	$("#frente_trabalho").val(auxVar === null ? "" : auxVar);
	
	// Grupo
	auxVar = CIDADAOTRABALHO.dadosTrabalho.grupo;
	$("#grupo").val(auxVar === null ? "" : auxVar);
	
	// Orientador
	auxVar = CIDADAOTRABALHO.dadosTrabalho.orientador;
	$("#orientador").val(auxVar === null ? "" : auxVar);
	
	// Hotel
	auxVar = CIDADAOTRABALHO.dadosTrabalho.hotel;
	$("#hotel").val(auxVar === null ? "" : auxVar);

	// Desempregado por quanto tempo
	var opts = "<div class='comboStilo selectInicial' id='diasLabel'><select name='diasLabel' id='diasLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Dias'>Dias</option>";
	for (var i = 1; i < 32; i++) {
		opts += "<option value='" + i + "' data-id='diasLabel' for='dias_empregado'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.dias_empregado == i) ? " selected>" : ">") + i + (i == 1 ? " Dia" : " Dias") + "</option>";
	}
	opts += "</div></select></div>";
	
	opts += "<div class='comboStilo selectInicial' id='mesesLabel'><select name='mesesLabel' id='mesesLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Meses'>Meses</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesLabel' for='meses_empregado'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.meses_empregado == i) ? " selected>" : ">") + i + (i == 1 ? " Mês" : " Meses") + "</option>";
	}
	opts += "</div></select></div>";
	
	opts += "<div class='comboStilo selectInicial' id='anosLabel'><select name='anosLabel' id='anosLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Anos'>Anos</option>";
	for (var i = 1; i < 51; i++) {
		opts += "<option value='" + i + "' data-id='anosLabel' for='anos_empregado'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.anos_empregado == i) ? " selected>" : ">") + i + (i == 1 ? " Ano" : " Anos") + "</option>";
	}
	opts += "</div></select></div>";
	
	$("#listaDiasMesesAnosEmpregado").empty();
	$("#listaDiasMesesAnosEmpregado").append(opts);
	
	// Procurou emprego no último mês
	if (CIDADAOTRABALHO.dadosTrabalho.procurou_emprego === 1) {
		// Sim
		$("input[name='infoProcurouEmprego'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOTRABALHO.dadosTrabalho.procurou_emprego === 0) {
		// Não
		$("input[name='infoProcurouEmprego'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoProcurouEmprego'][value='Não Informado']").prop("checked", true);
	}
	
	// Procurou algum programa da PMSP
	if (CIDADAOTRABALHO.dadosTrabalho.procurou_programa_pmsp === 1) {
		// Sim
		$("input[name='infoProcurouProgramaPmsp'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOTRABALHO.dadosTrabalho.procurou_programa_pmsp === 0) {
		// Não
		$("input[name='infoProcurouProgramaPmsp'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoProcurouProgramaPmsp'][value='Não Informado']").prop("checked", true);
	}
	quaisProcurouProgramaPmspf();
	auxVar = CIDADAOTRABALHO.dadosTrabalho.qual_programa_pmsp;
	$("#qual_programa_pmsp").val(auxVar === null ? "" : auxVar);

	// Ocupação pretendida
	auxVar = CIDADAOTRABALHO.dadosTrabalho.ocupacao_pretendida;
	$("#ocupacao_pretendida").val(auxVar === null ? "" : auxVar);

	// Última ou atual ocupação
	auxVar = CIDADAOTRABALHO.dadosTrabalho.ultima_atual_ocupacao;
	$("#ultima_atual_ocupacao").val(auxVar === null ? "" : auxVar);

	// Neste trabalho teve carteira assinada
	if (CIDADAOTRABALHO.dadosTrabalho.carteira_assinada === 1) {
		// Sim
		$("input[name='infoCarteiraAssinada'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOTRABALHO.dadosTrabalho.carteira_assinada === 0) {
		// Não
		$("input[name='infoCarteiraAssinada'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoCarteiraAssinada'][value='Não Informado']").prop("checked", true);
	}
	
	// Nome da empresa em que trabalha
	auxVar = CIDADAOTRABALHO.dadosTrabalho.nome_empresa;
	$("#nome_empresa").val(auxVar === null ? "" : auxVar);

	// Data de início da última ou atual ocupação
	auxVar = CIDADAOTRABALHO.dadosTrabalho.dia_inicio_ocupacao;
	$("#dia_inicio_ocupacao").val(auxVar === null ? "" : auxVar);
	auxVar = CIDADAOTRABALHO.dadosTrabalho.mes_inicio_ocupacao;
	$("#mes_inicio_ocupacao").val(auxVar === null ? "" : auxVar);
	auxVar = CIDADAOTRABALHO.dadosTrabalho.ano_inicio_ocupacao;
	$("#ano_inicio_ocupacao").val(auxVar === null ? "" : auxVar);
	
	// Data de término da última ocupação
	auxVar = CIDADAOTRABALHO.dadosTrabalho.dia_ternino_ocupacao;
	$("#dia_ternino_ocupacao").val(auxVar === null ? "" : auxVar);
	auxVar = CIDADAOTRABALHO.dadosTrabalho.mes_termino_ocupacao;
	$("#mes_termino_ocupacao").val(auxVar === null ? "" : auxVar);
	auxVar = CIDADAOTRABALHO.dadosTrabalho.ano_termino_ocupacao;
	$("#ano_termino_ocupacao").val(auxVar === null ? "" : auxVar);
	
	// Já teve negócio próprio
	if (CIDADAOTRABALHO.dadosTrabalho.teve_negocio_proprio === 1) {
		// Sim
		$("input[name='infoTeveNegocioProprio'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOTRABALHO.dadosTrabalho.teve_negocio_proprio === 0) {
		// Não
		$("input[name='infoTeveNegocioProprio'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTeveNegocioProprio'][value='Não Informado']").prop("checked", true);
	}
	quaisTeveNegocioPropriof();
	auxVar = CIDADAOTRABALHO.dadosTrabalho.justificativa_teve_negocio_proprio;
	$("#justificativa_teve_negocio_proprio").val(auxVar === null ? "" : auxVar);
	
	// Gostaria de trabalhar por conta própria
	if (CIDADAOTRABALHO.dadosTrabalho.trabalhar_conta_propria_autonomo === 1) {
		// Sim
		$("input[name='infoTrabalharContaPropriaAutonomo'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOTRABALHO.dadosTrabalho.trabalhar_conta_propria_autonomo === 0) {
		// Não
		$("input[name='infoTrabalharContaPropriaAutonomo'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTrabalharContaPropriaAutonomo'][value='Não Informado']").prop("checked", true);
	}
	
	// Tem conhecimento do que precisa para abrir negócio
	if (CIDADAOTRABALHO.dadosTrabalho.conhecimento_negocio_proprio === 1) {
		// Sim
		$("input[name='infoConhecimentoNegocioProprio'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOTRABALHO.dadosTrabalho.conhecimento_negocio_proprio === 0) {
		// Não
		$("input[name='infoConhecimentoNegocioProprio'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoConhecimentoNegocioProprio'][value='Não Informado']").prop("checked", true);
	}
	
	// Já trabalhou coletivamente ...
	var opts = "<div class='comboStilo selectInicial'><select name='tipoTrabalhoColetivoLabel' id='tipoTrabalhoColetivoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOTRABALHO.listaTipoTrabalhoColetivo.length; i++) {
		opts += "<option value='" + CIDADAOTRABALHO.listaTipoTrabalhoColetivo[i].nome + "' data-id='tipoTrabalhoColetivoLabel' for='tipo_trabalho_coletivo_id'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.tipo_trabalho_coletivo_id == CIDADAOTRABALHO.listaTipoTrabalhoColetivo[i].id) ? " selected>" : ">") + CIDADAOTRABALHO.listaTipoTrabalhoColetivo[i].nome + "</option>";
	}
	opts += "</div></select></div>";
	console.log(opts + "\r\n");
	
	$("#listaTipoTrabalhoColetivo").empty();
	$("#listaTipoTrabalhoColetivo").append(opts);
	// Por quanto tempo
	var opts = ""; 
	opts += "<div class='comboStilo selectInicial'><select name='mesesTrabalhColetivoLabel' id='mesesTrabalhColetivoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Meses'>Meses</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesTrabalhColetivoLabel' for='meses_trabalho_coletivo'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.meses_trabalho_coletivo == i) ? " selected>" : ">") + i + (i == 1 ? " Mês" : " Meses") + "</option>";
	}
	opts += "</div></select></div>";
	
	opts += "<div class='comboStilo selectInicial'><select name='anosTrabalhoColetivoLabel' id='anosTrabalhoColetivoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Anos'>Anos</option>";
	for (var i = 1; i < 51; i++) {
		opts += "<option value='" + i + "' data-id='anosTrabalhoColetivoLabel' for='anos_trabalho_coletivo'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.anos_trabalho_coletivo == i) ? " selected>" : ">") + i + (i == 1 ? " Ano" : " Anos") + "</option>";
	}
	opts += "</div></select></div>";
	
	$("#listaMesesAnosTrabalhoColetivo").empty();
	$("#listaMesesAnosTrabalhoColetivo").append(opts);

	// Outra atividade ou bico
	if (CIDADAOTRABALHO.dadosTrabalho.outra_atividade_bico === 1) {
		// Sim
		$("input[name='infoOutraAtividadeBico'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOTRABALHO.dadosTrabalho.outra_atividade_bico === 0) {
		// Não
		$("input[name='infoOutraAtividadeBico'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoOutraAtividadeBico'][value='Não Informado']").prop("checked", true);
	}
	quaisOutraAtividadeBicof();
	auxVar = CIDADAOTRABALHO.dadosTrabalho.qual_outra_atividade_bico;
	$("#qual_outra_atividade_bico").val(auxVar === null ? "" : auxVar);

	// Profissão
	auxVar = CIDADAOTRABALHO.dadosTrabalho.profissao_atividade;
	$("#profissao_atividade").val(auxVar === null ? "" : auxVar);

	// Onde aprendeu a profissão
	var opts = "<div class='comboStilo selectInicial'><select name='tipoOndeAprendeuProfissaoLabel' id='tipoOndeAprendeuProfissaoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao.length; i++) {
		opts += "<option value='" + CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao[i].nome + "' data-id='tipoOndeAprendeuProfissaoLabel' for='tipo_onde_aprendeu_profissao_id'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.tipo_onde_aprendeu_profissao_id == CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao[i].id) ? " selected>" : ">") + CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao[i].nome + "</option>";
	}
	opts += "</div></select></div>";
	console.log(opts + "\r\n");
	
	$("#listaTipoOndeAprendeuProfissao").empty();
	$("#listaTipoOndeAprendeuProfissao").append(opts);
	
	// Como você comprova seu conhecimento profissional
	var opts = "<div class='comboStilo selectInicial'><select name='tipoComprovanteConhecimentoProfissionalLabel' id='tipoComprovanteConhecimentoProfissionalLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional.length; i++) {
		opts += "<option value='" + CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional[i].nome + "' data-id='tipoComprovanteConhecimentoProfissionalLabel' for='tipo_comprovante_conhecimento_profissional_id'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.tipo_comprovante_conhecimento_profissional_id == CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional[i].id) ? " selected>" : ">") + CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional[i].nome + "</option>";
	}
	opts += "</div></select></div>";
	console.log(opts + "\r\n");
	
	$("#listaTipoComprovanteConhecimentoProfissional").empty();
	$("#listaTipoComprovanteConhecimentoProfissional").append(opts);
	
	// Fez algum curso de qualificação profissional
	if (CIDADAOTRABALHO.dadosTrabalho.curso_qualificacao_profissional === 1) {
		// Sim
		$("input[name='infoCursoQualificacaoProfissional'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOTRABALHO.dadosTrabalho.curso_qualificacao_profissional === 0) {
		// Não
		$("input[name='infoCursoQualificacaoProfissional'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoCursoQualificacaoProfissional'][value='Não Informado']").prop("checked", true);
	}
	quaisCursoQualificacaoProfissionalf();
	auxVar = CIDADAOTRABALHO.dadosTrabalho.qual_curso_qualificacao_profissional;
	$("#qual_curso_qualificacao_profissional").val(auxVar === null ? "" : auxVar);
	// A que ramo pertence esse curso
	var opts = "<div class='comboStilo selectInicial'><select name='tipoRamoCursoLabel' id='tipoRamoCursoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOTRABALHO.listaTipoRamoCurso.length; i++) {
		opts += "<option value='" + CIDADAOTRABALHO.listaTipoRamoCurso[i].nome + "' data-id='tipoRamoCursoLabel' for='tipo_ramo_curso_id'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.tipo_ramo_curso_id == CIDADAOTRABALHO.listaTipoRamoCurso[i].id) ? " selected>" : ">") + CIDADAOTRABALHO.listaTipoRamoCurso[i].nome + "</option>";
	}
	opts += "</div></select></div>";
	console.log(opts + "\r\n");
	
	$("#listaTipoRamoCurso").empty();
	$("#listaTipoRamoCurso").append(opts);
	// Outro ramo que o curso pertence
	auxVar = CIDADAOTRABALHO.dadosTrabalho.outros_ramo_curso;
	$("#outros_ramo_curso").val(auxVar === null ? "" : auxVar);
	
	// Você pretende fazer novos cursos...
	var opts = "<div class='comboStilo selectInicial'><select name='tipoPretencaoCursosLabel' id='tipoPretencaoCursosLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 0; i < CIDADAOTRABALHO.listaTipoPretencaoCurso.length; i++) {
		opts += "<option value='" + CIDADAOTRABALHO.listaTipoPretencaoCurso[i].nome + "' data-id='tipoPretencaoCursosLabel' for='tipo_pretencao_cursos_id'";
		opts += ((edit == true && CIDADAOTRABALHO.dadosTrabalho.tipo_pretencao_cursos_id == CIDADAOTRABALHO.listaTipoPretencaoCurso[i].id) ? " selected>" : ">") + CIDADAOTRABALHO.listaTipoPretencaoCurso[i].nome + "</option>";
	}
	opts += "</div></select></div>";
	console.log(opts + "\r\n");
	
	$("#listaTipoPretencaoCursos").empty();
	$("#listaTipoPretencaoCursos").append(opts);
	// Qual curso pretendido
	auxVar = CIDADAOTRABALHO.dadosTrabalho.qual_curso_pretencao;
	$("#qual_curso_pretencao").val(auxVar === null ? "" : auxVar);
	
	// O que gostaria de fazer em seu tempo livre
	var opts = "";
	var atlChecked;
	for (var i = 0; i < CIDADAOTRABALHO.listaTipoAtividadeTempoLivre.length; i++) {
		atlChecked = false;
		for (var j = 0; j < CIDADAOTRABALHO.listaAtividadesTempoLivre.length; j++) {
			if (CIDADAOTRABALHO.listaAtividadesTempoLivre[j].tipo_atividade_tempo_livre_id == CIDADAOTRABALHO.listaTipoAtividadeTempoLivre[i].id) {
				// encontrou na lista, marca checked
				atlChecked = true;
				break;
			}
		}
		opts += "<div class='checkbox'><input type='checkbox' name='tipoatividadetempolivre' value='" + CIDADAOTRABALHO.listaTipoAtividadeTempoLivre[i].id + "' class='checkbox check'" + (atlChecked == true ? " checked>" : ">");
		opts += "<p>" + CIDADAOTRABALHO.listaTipoAtividadeTempoLivre[i].nome + "</p></div>";
	}
	console.log(opts + "\r\n");
	
	$("#container_duasColunas_atividade_tempo_livre").empty();
	$("#container_duasColunas_atividade_tempo_livre").append(opts);
	
	// Dentro da cidade de são paulo quais locais.....
	var opts = "";
	var atlChecked;
	for (var i = 0; i < CIDADAOTRABALHO.listaTipoLocalVisitar.length; i++) {
		atlChecked = false;
		for (var j = 0; j < CIDADAOTRABALHO.listaLocaisVisitar.length; j++) {
			if (CIDADAOTRABALHO.listaLocaisVisitar[j].tipo_local_visitar_id == CIDADAOTRABALHO.listaTipoLocalVisitar[i].id) {
				// encontrou na lista, marca checked
				atlChecked = true;
				break;
			}
		}
		opts += "<div class='checkbox'><input type='checkbox' name='tipolocalvisitar' value='" + CIDADAOTRABALHO.listaTipoLocalVisitar[i].id + "' class='checkbox check'" + (atlChecked == true ? " checked>" : ">");
		opts += "<p>" + CIDADAOTRABALHO.listaTipoLocalVisitar[i].nome + "</p></div>";
	}
	console.log(opts + "\r\n");
	
	$("#container_duasColunas_local_visitar").empty();
	$("#container_duasColunas_local_visitar").append(opts);
	
	// Opções....primeiro lugar
	var opts = "";
	for (var i = 0; i < CIDADAOTRABALHO.listaTipoPrimeiraEscolha.length; i++) {
		opts += "<div class='radio'><input type='radio' name='infoTipoPrimeiraEscolha' value='" + CIDADAOTRABALHO.listaTipoPrimeiraEscolha[i].id + "' class='radio'" + (CIDADAOTRABALHO.listaTipoPrimeiraEscolha[i].id == CIDADAOTRABALHO.dadosTrabalho.tipo_primeira_escolha_id ? " checked>" : ">");
		opts += "<p>" + CIDADAOTRABALHO.listaTipoPrimeiraEscolha[i].nome + "</p></div>";
	}
	opts += "<span class='titLabel'>Outros</span><div class='linhaForm'><input type='text' class='inputGrande' value='' name='outros_primeira_escolha' id='outros_primeira_escolha' placeholder='Outros'></div>";
	console.log(opts + "\r\n");
	
	$("#divInfoTipoPrimeiraEscolha").empty();
	$("#divInfoTipoPrimeiraEscolha").append(opts);
	auxVar = CIDADAOTRABALHO.dadosTrabalho.outros_primeira_escolha;
	$("#outros_primeira_escolha").val(auxVar === null ? "" : auxVar);

	// Observações
	auxVar = CIDADAOTRABALHO.dadosTrabalho.observacoes_gerais;
	$("#observacoes_gerais").val(auxVar === null ? "" : auxVar);
}

function salvaTrabalhoSuccess () {
	console.log("salvaTrabalhoSuccess");
	// todo: revisar
}

function salvaTrabalhoFail (err) {
	console.log("salvaTrabalhoFail: " + err);
	// todo: revisar
}

function trabalhoSalva() {
	console.log("trabalhoSalva");

	var erro = false;

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

		var listaDados = [];
		var auxVar;

		// Participa de Frente de Trabalho
		auxVar = null;
		if ($("input:radio[name=infoFrentetrabalho]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoFrentetrabalho]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// Frente de Trabalho
		listaDados.push($("#frente_trabalho").val());
		
		// Grupo
		listaDados.push($("#grupo").val());
		
		// Orientador
		listaDados.push($("#orientador").val());
		
		// Hotel
		listaDados.push($("#hotel").val());

		// Desempregado por quanto tempo
		listaDados.push($("#diasLabel").val() == "Dias" ? null : $("#diasLabel").val());
		listaDados.push($("#mesesLabel").val() == "Meses" ? null : $("#mesesLabel").val());
		listaDados.push($("#anosLabel").val() == "Anos" ? null : $("#anosLabel").val());
		
		// Procurou emprego no último mês
		auxVar = null;
		if ($("input:radio[name=infoProcurouEmprego]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoProcurouEmprego]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Procurou algum programa da PMSP
		auxVar = null;
		if ($("input:radio[name=infoProcurouProgramaPmsp]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoProcurouProgramaPmsp]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#qual_programa_pmsp").val());

		// Ocupação pretendida
		listaDados.push($("#ocupacao_pretendida").val());

		// Última ou atual ocupação
		listaDados.push($("#ultima_atual_ocupacao").val());

		// Neste trabalho teve carteira assinada
		auxVar = null;
		if ($("input:radio[name=infoCarteiraAssinada]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoCarteiraAssinada]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Nome da empresa em que trabalha
		listaDados.push($("#nome_empresa").val());

		// Data de início da última ou atual ocupação
		listaDados.push($("#dia_inicio_ocupacao").val());
		listaDados.push($("#mes_inicio_ocupacao").val());
		listaDados.push($("#ano_inicio_ocupacao").val());
		
		// Data de término da última ocupação
		listaDados.push($("#dia_ternino_ocupacao").val());
		listaDados.push($("#mes_termino_ocupacao").val());
		listaDados.push($("#ano_termino_ocupacao").val());
		
		// Já teve negócio próprio
		auxVar = null;
		if ($("input:radio[name=infoTeveNegocioProprio]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTeveNegocioProprio]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#justificativa_teve_negocio_proprio").val());
		
		// Gostaria de trabalhar por conta própria
		auxVar = null;
		if ($("input:radio[name=infoTrabalharContaPropriaAutonomo]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTrabalharContaPropriaAutonomo]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Tem conhecimento do que precisa para abrir negócio
		auxVar = null;
		if ($("input:radio[name=infoConhecimentoNegocioProprio]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoConhecimentoNegocioProprio]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Já trabalhou coletivamente ...
		if ($("#tipoTrabalhoColetivoLabel").val() == "Selecione") {
			listaDados.push(null);
		}
		else {
			// Obtém id
			for (var i = 0; i < CIDADAOTRABALHO.listaTipoTrabalhoColetivo.length; i++) {
				if (CIDADAOTRABALHO.listaTipoTrabalhoColetivo[i].nome == $("#tipoTrabalhoColetivoLabel").val()) {
					listaDados.push(CIDADAOTRABALHO.listaTipoTrabalhoColetivo[i].id);
					break;
				}
			}
		}
		// Por quanto tempo
		listaDados.push($("#mesesTrabalhColetivoLabel").val() == "Meses" ? null : $("#mesesTrabalhColetivoLabel").val());
		listaDados.push($("#anosTrabalhoColetivoLabel").val() == "Anos" ? null : $("#anosTrabalhoColetivoLabel").val());

		// Outra atividade ou bico
		auxVar = null;
		if ($("input:radio[name=infoOutraAtividadeBico]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoOutraAtividadeBico]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#qual_outra_atividade_bico").val());

		// Profissão
		listaDados.push($("#profissao_atividade").val());

		// Onde aprendeu a profissão
		if ($("#tipoOndeAprendeuProfissaoLabel").val() == "Selecione") {
			listaDados.push(null);
		}
		else {
			// Obtém id
			for (var i = 0; i < CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao.length; i++) {
				if (CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao[i].nome == $("#tipoOndeAprendeuProfissaoLabel").val()) {
					listaDados.push(CIDADAOTRABALHO.listaTipoOndeAprendeuProfissao[i].id);
					break;
				}
			}
		}
		
		// Como você comprova seu conhecimento profissional
		if ($("#tipoComprovanteConhecimentoProfissionalLabel").val() == "Selecione") {
			listaDados.push(null);
		}
		else {
			// Obtém id
			for (var i = 0; i < CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional.length; i++) {
				if (CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional[i].nome == $("#tipoComprovanteConhecimentoProfissionalLabel").val()) {
					listaDados.push(CIDADAOTRABALHO.listaTipoComprovanteConhecimentoProfissional[i].id);
					break;
				}
			}
		}
		
		// Fez algum curso de qualificação profissional
		auxVar = null;
		if ($("input:radio[name=infoCursoQualificacaoProfissional]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoCursoQualificacaoProfissional]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#qual_curso_qualificacao_profissional").val());
		// A que ramo pertence esse curso
		if ($("#tipoRamoCursoLabel").val() == "Selecione") {
			listaDados.push(null);
		}
		else {
			// Obtém id
			for (var i = 0; i < CIDADAOTRABALHO.listaTipoRamoCurso.length; i++) {
				if (CIDADAOTRABALHO.listaTipoRamoCurso[i].nome == $("#tipoRamoCursoLabel").val()) {
					listaDados.push(CIDADAOTRABALHO.listaTipoRamoCurso[i].id);
					break;
				}
			}
		}
		// Outro ramo que o curso pertence
		listaDados.push($("#outros_ramo_curso").val());
		
		// Você pretende fazer novos cursos...
		if ($("#tipoPretencaoCursosLabel").val() == "Selecione") {
			listaDados.push(null);
		}
		else {
			// Obtém id
			for (var i = 0; i < CIDADAOTRABALHO.listaTipoPretencaoCurso.length; i++) {
				if (CIDADAOTRABALHO.listaTipoPretencaoCurso[i].nome == $("#tipoPretencaoCursosLabel").val()) {
					listaDados.push(CIDADAOTRABALHO.listaTipoPretencaoCurso[i].id);
					break;
				}
			}
		}
		// Qual curso pretendido
		listaDados.push($("#qual_curso_pretencao").val());
		
		// O que gostaria de fazer em seu tempo livre
		var tempoLivre = [];
		$("#container_duasColunas_atividade_tempo_livre").children().each(function () {
			if (this.checked) {
				var v = {
					tempo_livre_id: this.value,
				};
				tempoLivre.push(v);
			}
		});
		// todo: testes retirar
		var Print = "Atividades Tempo Livre\r\n";
		for (var i = 0; i < tempoLivre.length; i++) {
			Print += "tempo_livre_id: " + tempoLivre[i].tempo_livre_id + "\r\n";
		}
		console.log(Print);
		// testes retirar
		CIDADAOTRABALHO.auxlistaAtividadesTempoLivre = tempoLivre;
		
		// Dentro da cidade de são paulo quais locais.....
		var localVisitar = [];
		$("#container_duasColunas_local_visitar").children().each(function () {
			if (this.checked) {
				listaDados.push(this.value)
				var v = {
					tipo_local_visitar_id: this.value,
				};
				localVisitar.push(v);
			}
		});
		// todo: testes retirar
		var Print = "Local Visitar\r\n";
		for (var i = 0; i < localVisitar.length; i++) {
			Print += "tempo_livre_id: " + localVisitar[i].tipo_local_visitar_id + "\r\n";
		}
		console.log(Print);
		// testes retirar	
		CIDADAOTRABALHO.auxlistaLocaisVisitar = localVisitar;
	
		// Opções....primeiro lugar
		var primeiroLugar;
		$("#divInfoTipoPrimeiraEscolha").children().each(function () {
			if (this.checked) {
				primeiroLugar = this.value;
			}
		});
		listaDados.push(primeiroLugar);
		listaDados.push($("#outros_primeira_escolha").val());

		// Observações
		listaDados.push($("#observacoes_gerais").val());

		// todo: testes retirar
		var Print = "Salvar em trabalho: " + listaDados.length + " campos.\r\n";
		for (var i = 0; i < listaDados.length; i++) {
			Print += "Campo " + i + "= " + listaDados[i] + "\r\n";
		}
		console.log(Print);
		// testes retirar
			
		CIDADAOTRABALHO.salvaCidadaoTrabalho(listaDados,
											this.salvaTrabalhoSuccess,
											this.salvaTrabalhoFail);
	}
}
