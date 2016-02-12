function saudeOpcoes () {
	console.log("saudeOpcoes");
}

function carregaSaude () {
	console.log("carregaSaude");
	
	// Verifica se é salvamento
	if (CIDADAOSAUDE.ehSalvamento == true) {
		$('.msgParabens').removeAttr('style');
		$('html, body').animate({scrollTop:0}, 'slow');
		CIDADAOSAUDE.ehSalvamento = false;
	}
	
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
			   "<select name='diasLabel' id='diasLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Dias'>Dias</option>";
	for (var i = 1; i < 32; i++) {
		opts += "<option value='" + i + "' data-id='diasLabel' for='dias_situacao_rua'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.dias_situacao_rua == i) ? " selected>" : ">") + i + (i == 1 ? " Dia" : " Dias") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='mesesLabel' id='mesesLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Meses'>Meses</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesLabel' for='meses_situacao_rua'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.meses_situacao_rua == i) ? " selected>" : ">") + i + (i == 1 ? " Mês" : " Meses") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='anosLabel' id='anosLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Anos'>Anos</option>";
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
	
	// Uso de drogas
	var opts = "<span class='titSang'>Há quanto tempo?</span>" + 
			   "<select name='diaDrogasFazUsoLabel' id='diaDrogasFazUsoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Dias'>Dias</option>";
	for (var i = 1; i < 32; i++) {
		opts += "<option value='" + i + "' data-id='diaDrogasFazUsoLabel' for='dias_dorgas_faz_uso'>";
		opts += i + (i == 1 ? " dia" : " dias") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='mesesDrogasFazUsoLabel' id='mesesDrogasFazUsoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Meses'>Meses</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesDrogasFazUsoLabel' for='meses_dorgas_faz_uso'>";
		opts += i + (i == 1 ? " mês" : " meses") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='anosDrogasFazUsoLabel' id='anosDrogasFazUsoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Anos'>Anos</option>";
	for (var i = 1; i < 51; i++) {
		opts += "<option value='" + i + "' data-id='anosDrogasFazUsoLabel' for='anos_dorgas_faz_uso'>";
		opts += i + (i == 1 ? " ano" : " anos") + "</option>";
	}
	opts += "</div></select>";
	
	$("#listaDiasMesesAnosUsoDrogas").empty();
	$("#listaDiasMesesAnosUsoDrogas").append(opts);
	
	for (var i = 0; i < CIDADAOSAUDE.listaDrogasFazUso.length; i++) {
		// filtra as drogas para o tipo de pergunta = 1
		if (CIDADAOSAUDE.listaDrogasFazUso[i].tipo_pergunta != 1) {
			continue;
		}
		auxVar = CIDADAOSAUDE.listaDrogasFazUso[i].nome_droga;
		$('.adicionaDrogas').val(auxVar == null ? "" : auxVar);
		adicionaDrogas(CIDADAOSAUDE.listaDrogasFazUso[i].dias_frequencia, CIDADAOSAUDE.listaDrogasFazUso[i].meses_frequencia, CIDADAOSAUDE.listaDrogasFazUso[i].anos_frequencia);
	}
	
	// Está em tratamento de saúde
	if (CIDADAOSAUDE.dadosSaude.tratamento_saude == 1) {
		// Sim
		$("input[name='infoTratamentoSaude'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tratamento_saude == 0) {
		// Não
		$("input[name='infoTratamentoSaude'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTratamentoSaude'][value='Não Informado']").prop("checked", true);
	}
	
	if (CIDADAOSAUDE.dadosSaude.reducao_drogas_depois_programa == 1) {
		// Sim
		$("input[name='infoReducaoDrogasDepoisPrograma'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.reducao_drogas_depois_programa == 0) {
		// Não
		$("input[name='infoReducaoDrogasDepoisPrograma'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoReducaoDrogasDepoisPrograma'][value='Não Informado']").prop("checked", true);
	}
	
	if (CIDADAOSAUDE.dadosSaude.tempo_efeito_droga_antes_programa == 1) {
		// Sim
		$("input[name='infoTempoEfeitoDrogaAntesPrograma'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tempo_efeito_droga_antes_programa == 0) {
		// Não
		$("input[name='infoTempoEfeitoDrogaAntesPrograma'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTempoEfeitoDrogaAntesPrograma'][value='Não Informado']").prop("checked", true);
	}
	
	if (CIDADAOSAUDE.dadosSaude.tempo_efeito_droga_depois_programa == 1) {
		// Sim
		$("input[name='infoTempoEfeitoDrogaDepoisPrograma'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tempo_efeito_droga_depois_programa == 0) {
		// Não
		$("input[name='infoTempoEfeitoDrogaDepoisPrograma'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTempoEfeitoDrogaDepoisPrograma'][value='Não Informado']").prop("checked", true);
	}
		
	// Há quanto tempo usa crack
	var opts = "<span class='titSang'>Há quanto tempo usa crack:</span>" + 
			   "<select name='diasFazUsoCrackLabel' id='diasFazUsoCrackLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Dias'>Dias</option>";
	for (var i = 1; i < 32; i++) {
		opts += "<option value='" + i + "' data-id='diasFazUsoCrackLabel' for='dias_faz_uso_crack'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.dias_faz_uso_crack == i) ? " selected>" : ">") + i + (i == 1 ? " Dia" : " Dias") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='mesesFazUsoCrackLabel' id='mesesFazUsoCrackLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Meses'>Meses</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesFazUsoCrackLabel' for='meses_faz_uso_crack'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.meses_faz_uso_crack == i) ? " selected>" : ">") + i + (i == 1 ? " Mês" : " Meses") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='anosFazUsoCrackLabel' id='anosFazUsoCrackLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Anos'>Anos</option>";
	for (var i = 1; i < 51; i++) {
		opts += "<option value='" + i + "' data-id='anosFazUsoCrackLabel' for='anos_faz_uso_crack'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.anos_faz_uso_crack == i) ? " selected>" : ">") + i + (i == 1 ? " Ano" : " Anos") + "</option>";
	}
	opts += "</div></select>";
	
	$("#listaDiasMesesAnosFazUsoCrack").empty();
	$("#listaDiasMesesAnosFazUsoCrack").append(opts);
	
	// Quantas pedras antes
	var opts = "<select name='numeroPedrasAntesProgramaLabel' id='numeroPedrasAntesProgramaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 1; i < 101; i++) {
		opts += "<option value='" + i + "' data-id='numeroPedrasAntesProgramaLabel' for='numero_pedras_antes_programa'";
		var label = "";
		if (i < 100)
			label = i + " por semana";
		else label = "Mais de " + i + " por semana";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.numero_pedras_antes_programa == i) ? " selected>" : ">") + label + "</option>";
	}
	opts += "</div></select>";	
	
	$("#listaNumeroPedrasAntesPrograma").empty();
	$("#listaNumeroPedrasAntesPrograma").append(opts);

	// Quantas pedras atualmente
	var opts = "<select name='numeroPedrasAtualmenteLabel' id='numeroPedrasAtualmenteLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione'>Selecione</option>";
	for (var i = 1; i < 101; i++) {
		opts += "<option value='" + i + "' data-id='numeroPedrasAtualmenteLabel' for='numero_pedras_atualmente'";
		var label = "";
		if (i < 100)
			label = i + " por semana";
		else label = "Mais de " + i + " por semana";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.numero_pedras_atualmente == i) ? " selected>" : ">") + label + "</option>";
	}
	opts += "</div></select>";	
	
	$("#listaNumeroPedrasAtualmentePrograma").empty();
	$("#listaNumeroPedrasAtualmentePrograma").append(opts);
	
	// Faz uso de outras drogas
	if (CIDADAOSAUDE.dadosSaude.drogas_alem_crack == 1) {
		// Sim
		$("input[name='infoDrogasAlemCrack'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.drogas_alem_crack == 0) {
		// Não
		$("input[name='infoDrogasAlemCrack'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoDrogasAlemCrack'][value='Não Informado']").prop("checked", true);
	}
	drogasAlemCrackf();
	
	for (var i = 0; i < CIDADAOSAUDE.listaDrogasFazUso.length; i++) {
		// filtra as drogas para o tipo de pergunta = 2
		if (CIDADAOSAUDE.listaDrogasFazUso[i].tipo_pergunta != 2) {
			continue;
		}
		auxVar = CIDADAOSAUDE.listaDrogasFazUso[i].nome_droga;
		$('input.adicionaDrogasAlemCrack').val(auxVar == null ? "" : auxVar);
		adicionaDrogasAlemCrack();
	}
	
	// Já fez uso de droga injetável
	if (CIDADAOSAUDE.dadosSaude.uso_drogas_injetaveis == 1) {
		// Sim
		$("input[name='infoUsoDrogasInjetaveis'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.uso_drogas_injetaveis == 0) {
		// Não
		$("input[name='infoUsoDrogasInjetaveis'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoUsoDrogasInjetaveis'][value='Não Informado']").prop("checked", true);
	}
	drogasAlemCrackf();
	var opts = "<span class='titSang'>Quanto tempo:</span>" + 
			   "<select name='diasUsoDrogasInjetaveisLabel' id='diasUsoDrogasInjetaveisLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Dias'>Dias</option>";
	for (var i = 1; i < 32; i++) {
		opts += "<option value='" + i + "' data-id='diasUsoDrogasInjetaveisLabel' for='dias_uso_drogas_injetaveis'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.dias_uso_drogas_injetaveis == i) ? " selected>" : ">") + i + (i == 1 ? " Dia" : " Dias") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='mesesUsoDrogasInjetaveisLabel' id='mesesUsoDrogasInjetaveisLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Meses'>Meses</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesUsoDrogasInjetaveisLabel' for='meses_uso_drogas_injetaveis'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.meses_uso_drogas_injetaveis == i) ? " selected>" : ">") + i + (i == 1 ? " Mês" : " Meses") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='anosUsoDrogasInjetaveisLabel' id='anosUsoDrogasInjetaveisLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Anos'>Anos</option>";
	for (var i = 1; i < 51; i++) {
		opts += "<option value='" + i + "' data-id='anosUsoDrogasInjetaveisLabel' for='anos_uso_drogas_injetaveis'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.anos_uso_drogas_injetaveis == i) ? " selected>" : ">") + i + (i == 1 ? " Ano" : " Anos") + "</option>";
	}
	opts += "</div></select>";
	
	$("#listaDiasMesesAnosDrogasInjetaveis").empty();
	$("#listaDiasMesesAnosDrogasInjetaveis").append(opts);
	
	// Abstinente
	if (CIDADAOSAUDE.dadosSaude.abstinencia_apos_programa == 1) {
		// Sim
		$("input[name='infoAbstinenciaAposPrograma'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.abstinencia_apos_programa == 0) {
		// Não
		$("input[name='infoAbstinenciaAposPrograma'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoAbstinenciaAposPrograma'][value='Não Informado']").prop("checked", true);
	}
	abstinenciaAposPrograma();
	var opts = "<span class='titSang'>Quanto tempo:</span>" + 
			   "<select name='diasAbstinenciaAposProgramaLabel' id='diasAbstinenciaAposProgramaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Dias'>Dias</option>";
	for (var i = 1; i < 32; i++) {
		opts += "<option value='" + i + "' data-id='diasAbstinenciaAposProgramaLabel' for='dias_abstinencia_apos_programa'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.dias_abstinencia_apos_programa == i) ? " selected>" : ">") + i + (i == 1 ? " Dia" : " Dias") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='mesesAbstinenciaAposProgramaLabel' id='mesesAbstinenciaAposProgramaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Meses'>Meses</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesAbstinenciaAposProgramaLabel' for='meses_abstinencia_apos_programa'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.meses_abstinencia_apos_programa == i) ? " selected>" : ">") + i + (i == 1 ? " Mês" : " Meses") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='anosAbstinenciaAposProgramaLabel' id='anosAbstinenciaAposProgramaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Anos'>Anos</option>";
	for (var i = 1; i < 51; i++) {
		opts += "<option value='" + i + "' data-id='anosAbstinenciaAposProgramaLabel' for='anos_abstinencia_apos_programa'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.anos_abstinencia_apos_programa == i) ? " selected>" : ">") + i + (i == 1 ? " Ano" : " Anos") + "</option>";
	}
	opts += "</div></select>";
	
	$("#listaDiasMesesAnosAbstinente").empty();
	$("#listaDiasMesesAnosAbstinente").append(opts);
	
	// Glicemia, pressão arterial e peso
	auxVar = CIDADAOSAUDE.dadosSaude.controle_glicemia;
	$("#controle_glicemia").val(auxVar == null ? "" : auxVar);
	auxVar = CIDADAOSAUDE.dadosSaude.controle_pressao_arterial;
	$("#controle_pressao_arterial").val(auxVar == null ? "" : auxVar);
	auxVar = CIDADAOSAUDE.dadosSaude.controle_peso;
	$("#controle_peso").val(auxVar == null ? "" : auxVar);
	
	// Fez teste rápido de DST
	if (CIDADAOSAUDE.dadosSaude.teste_rapido_dst_aids == 1) {
		// Sim
		$("input[name='infoTesteRapidoDstAids'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.teste_rapido_dst_aids == 0) {
		// Não
		$("input[name='infoTesteRapidoDstAids'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTesteRapidoDstAids'][value='Não Informado']").prop("checked", true);
	}
	testeRapidoDstAids();
	auxVar = CIDADAOSAUDE.dadosSaude.local_teste_rapido_dst_aids;
	$("#local_teste_rapido_dst_aids").val(auxVar == null ? "" : auxVar);
	
	// Acompanhamento DST
	if (CIDADAOSAUDE.dadosSaude.acompanhamento_dst == 1) {
		// Sim
		$("input[name='infoAcompanhamentoDst'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.acompanhamento_dst == 0) {
		// Não
		$("input[name='infoAcompanhamentoDst'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoAcompanhamentoDst'][value='Não Informado']").prop("checked", true);
	}
	acompanhamentoDst();
	auxVar = CIDADAOSAUDE.dadosSaude.local_acompanhamento_dst;
	$("#local_acompanhamento_dst").val(auxVar == null ? "" : auxVar);
	
	// Tem diagnóstico HIV
	if (CIDADAOSAUDE.dadosSaude.diagnostico_hiv_aids == 1) {
		// Sim
		$("input[name='infoDiagnosticoHivAids'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.diagnostico_hiv_aids == 0) {
		// Não
		$("input[name='infoDiagnosticoHivAids'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoDiagnosticoHivAids'][value='Não Informado']").prop("checked", true);
	}
	diagnosticoHivAids();
	// Em tratamento
	if (CIDADAOSAUDE.dadosSaude.tratamento_hiv_aids == 1) {
		// Sim
		$("input[name='infoTratamentoHivAids'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tratamento_hiv_aids == 0) {
		// Não
		$("input[name='infoTratamentoHivAids'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTratamentoHivAids'][value='Não Informado']").prop("checked", true);
	}
	tratamentoHivAids();
	auxVar = CIDADAOSAUDE.dadosSaude.local_tratamento_hiv_aids;
	$("#local_tratamento_hiv_aids").val(auxVar == null ? "" : auxVar);
	
	// Diagnóstico de Sífilis
	if (CIDADAOSAUDE.dadosSaude.diagnostico_sifilis == 1) {
		// Sim
		$("input[name='infoDiagnosticoSifilis'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.diagnostico_sifilis == 0) {
		// Não
		$("input[name='infoDiagnosticoSifilis'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoDiagnosticoSifilis'][value='Não Informado']").prop("checked", true);
	}
	diagnosticoSifilis();
	// Em tratamento
	if (CIDADAOSAUDE.dadosSaude.tratamento_sifilis == 1) {
		// Sim
		$("input[name='infoTratamentoSifilis'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tratamento_sifilis == 0) {
		// Não
		$("input[name='infoTratamentoSifilis'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTratamentoSifilis'][value='Não Informado']").prop("checked", true);
	}
	tratamentoSifilis();
	auxVar = CIDADAOSAUDE.dadosSaude.local_tratamento_sifilis;
	$("#local_tratamento_sifilis").val(auxVar == null ? "" : auxVar);
	if (CIDADAOSAUDE.dadosSaude.alta_tratamento_sifilis == 1) {
		// Sim
		$("input[name='infoAltaTratamentoSifilis'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.alta_tratamento_sifilis == 0) {
		// Não
		$("input[name='infoAltaTratamentoSifilis'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoAltaTratamentoSifilis'][value='Não Informado']").prop("checked", true);
	}
	
	// Avaliação Odontológica
	if (CIDADAOSAUDE.dadosSaude.passou_avaliacao_odontologica == 1) {
		// Sim
		$("input[name='infoPassouAvaliacaoOdontologica'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.passou_avaliacao_odontologica == 0) {
		// Não
		$("input[name='infoPassouAvaliacaoOdontologica'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoPassouAvaliacaoOdontologica'][value='Não Informado']").prop("checked", true);
	}
	passouAvaliacaoOdontologica();
	auxVar = CIDADAOSAUDE.dadosSaude.local_passou_avaliacao_odontologica;
	$("#local_passou_avaliacao_odontologica").val(auxVar == null ? "" : auxVar);
	if (CIDADAOSAUDE.dadosSaude.tratamento_odontologico == 1) {
		// Sim
		$("input[name='infoAltaTratamentoOdontologico'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tratamento_odontologico == 0) {
		// Não
		$("input[name='infoAltaTratamentoOdontologico'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoAltaTratamentoOdontologico'][value='Não Informado']").prop("checked", true);
	}
	
	// Sintomas respiratórios
	if (CIDADAOSAUDE.dadosSaude.sintomas_respiratorios == 1) {
		// Sim
		$("input[name='infoSintomasRespiratorios'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.sintomas_respiratorios == 0) {
		// Não
		$("input[name='infoSintomasRespiratorios'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoSintomasRespiratorios'][value='Não Informado']").prop("checked", true);
	}
	sintomasRespiratorios();
	if (CIDADAOSAUDE.dadosSaude.tratamento_sintomas_respiratorios == 1) {
		// Sim
		$("input[name='infoTratamentoSintomasRespiratorios'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.tratamento_sintomas_respiratorios == 0) {
		// Não
		$("input[name='infoTratamentoSintomasRespiratorios'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTratamentoSintomasRespiratorios'][value='Não Informado']").prop("checked", true);
	}
	tratamentoSintomasRespiratorios();
	auxVar = CIDADAOSAUDE.dadosSaude.local_tratamento_sintomas_respiratorios;
	$("#local_tratamento_sintomas_respiratorios").val(auxVar == null ? "" : auxVar);
	
	// Teste de tuberculose
	if (CIDADAOSAUDE.dadosSaude.realizou_teste_tuberculose == 1) {
		// Sim
		$("input[name='infoRealizouTesteTuberculose'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.realizou_teste_tuberculose == 0) {
		// Não
		$("input[name='infoRealizouTesteTuberculose'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoRealizouTesteTuberculose'][value='Não Informado']").prop("checked", true);
	}
	realizouTesteTuberculose();
	if (CIDADAOSAUDE.dadosSaude.diagnostico_tuberculose == 1) {
		// Sim
		$("input[name='infoDiagnosticoTuberculose'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.diagnostico_tuberculose == 0) {
		// Não
		$("input[name='infoDiagnosticoTuberculose'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoDiagnosticoTuberculose'][value='Não Informado']").prop("checked", true);
	}
	diagnosticoTuberculose();
	if (CIDADAOSAUDE.dadosSaude.em_tratamento_tuberculose == 1) {
		// Sim
		$("input[name='infoEmTratamentoTuberculose'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.em_tratamento_tuberculose == 0) {
		// Não
		$("input[name='infoEmTratamentoTuberculose'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoEmTratamentoTuberculose'][value='Não Informado']").prop("checked", true);
	}
	
	// Já teve tuberculose
	if (CIDADAOSAUDE.dadosSaude.teve_tuberculose == 1) {
		// Sim
		$("input[name='infoTeveTuberculose'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.teve_tuberculose == 0) {
		// Não
		$("input[name='infoTeveTuberculose'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTeveTuberculose'][value='Não Informado']").prop("checked", true);
	}
	teveTuberculose();
	if (CIDADAOSAUDE.dadosSaude.fez_tratamento_tuberculose == 1) {
		// Sim
		$("input[name='infoFezTratamentoTuberculose'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.fez_tratamento_tuberculose == 0) {
		// Não
		$("input[name='infoFezTratamentoTuberculose'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoFezTratamentoTuberculose'][value='Não Informado']").prop("checked", true);
	}
	fezTratamentoTuberculose();
	auxVar = CIDADAOSAUDE.dadosSaude.local_fez_tratamento_tuberculose;
	$("#local_fez_tratamento_tuberculose").val(auxVar == null ? "" : auxVar);
	if (CIDADAOSAUDE.dadosSaude.teve_alta_tratamento_tuberculose == 1) {
		// Sim
		$("input[name='infoTeveAltaTratamentoTuberculose'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.teve_alta_tratamento_tuberculose == 0) {
		// Não
		$("input[name='infoTeveAltaTratamentoTuberculose'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTeveAltaTratamentoTuberculose'][value='Não Informado']").prop("checked", true);
	}
	
	// Lesões na pele
	if (CIDADAOSAUDE.dadosSaude.lesoes_pele == 1) {
		// Sim
		$("input[name='infoLesoesPele'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.lesoes_pele == 0) {
		// Não
		$("input[name='infoLesoesPele'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoLesoesPele'][value='Não Informado']").prop("checked", true);
	}

	// Vacinação em dia
	if (CIDADAOSAUDE.dadosSaude.vacinacao_em_dia == 1) {
		// Sim
		$("input[name='infoVacinacaoEmDia'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.vacinacao_em_dia == 0) {
		// Não
		$("input[name='infoVacinacaoEmDia'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoVacinacaoEmDia'][value='Não Informado']").prop("checked", true);
	}
	
	// Outros sinais e sintomas clínicos
	auxVar = CIDADAOSAUDE.dadosSaude.outros_sinais_sintomas_criticos;
	$("#outros_sinais_sintomas_criticos").val(auxVar == null ? "" : auxVar);
	
	// Avaliação ginecológica
	if (CIDADAOSAUDE.dadosSaude.avaliacao_ginecologica == 1) {
		// Sim
		$("input[name='infoAvaliacaoGinecologica'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.avaliacao_ginecologica == 0) {
		// Não
		$("input[name='infoAvaliacaoGinecologica'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoAvaliacaoGinecologica'][value='Não Informado']").prop("checked", true);
	}
	avaliacaoGinecologica();
	auxVar = CIDADAOSAUDE.dadosSaude.local_avaliacao_ginecologica;
	$("#local_avaliacao_ginecologica").val(auxVar == null ? "" : auxVar);

	// Método anticoncepcional
	if (CIDADAOSAUDE.dadosSaude.metodo_anticoncepcional == 1) {
		// Sim
		$("input[name='infoMetodoAnticoncepcional'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.metodo_anticoncepcional == 0) {
		// Não
		$("input[name='infoMetodoAnticoncepcional'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoMetodoAnticoncepcional'][value='Não Informado']").prop("checked", true);
	}
	metodoAnticoncepcional();
	auxVar = CIDADAOSAUDE.dadosSaude.qual_metodo_anticoncepcional;
	$("#qual_metodo_anticoncepcional").val(auxVar == null ? "" : auxVar);

	// Teve algum aborto
	if (CIDADAOSAUDE.dadosSaude.teve_aborto == 1) {
		// Sim
		$("input[name='infoTeveAborto'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.teve_aborto == 0) {
		// Não
		$("input[name='infoTeveAborto'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTeveAborto'][value='Não Informado']").prop("checked", true);
	}
	
	// Planejamento familiar
	if (CIDADAOSAUDE.dadosSaude.planejamento_familiar == 1) {
		// Sim
		$("input[name='infoPlanejamentoFamiliar'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.planejamento_familiar == 0) {
		// Não
		$("input[name='infoPlanejamentoFamiliar'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoPlanejamentoFamiliar'][value='Não Informado']").prop("checked", true);
	}
	planejamentoFamiliar();
	auxVar = CIDADAOSAUDE.dadosSaude.local_planejamento_familiar;
	$("#local_planejamento_familiar").val(auxVar == null ? "" : auxVar);

	// Está grávida
	if (CIDADAOSAUDE.dadosSaude.gestante == 1) {
		// Sim
		$("input[name='infoGestante'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.gestante == 0) {
		// Não
		$("input[name='infoGestante'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoGestante'][value='Não Informado']").prop("checked", true);
	}
	
	// Está fazendo pré-natal
	if (CIDADAOSAUDE.dadosSaude.pre_natal == 1) {
		// Sim
		$("input[name='infoPreNatal'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.pre_natal == 0) {
		// Não
		$("input[name='infoPreNatal'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoPreNatal'][value='Não Informado']").prop("checked", true);
	}
	preNatal();
	auxVar = CIDADAOSAUDE.dadosSaude.local_pre_natal;
	$("#local_pre_natal").val(auxVar == null ? "" : auxVar);

	// Amparo maternal
	if (CIDADAOSAUDE.dadosSaude.amparo_maternal == 1) {
		// Sim
		$("input[name='infoAmparoMaternal'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.amparo_maternal == 0) {
		// Não
		$("input[name='infoAmparoMaternal'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoAmparoMaternal'][value='Não Informado']").prop("checked", true);
	}

	// Está amamentando
	if (CIDADAOSAUDE.dadosSaude.amamentando == 1) {
		// Sim
		$("input[name='infoAmamentando'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.amamentando == 0) {
		// Não
		$("input[name='infoAmamentando'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoAmamentando'][value='Não Informado']").prop("checked", true);
	}

	// Consulta na data de hoje
	if (CIDADAOSAUDE.dadosSaude.consulta_saude_hoje == 1) {
		// Sim
		$("input[name='infoConsultaSaudeHoje'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.consulta_saude_hoje == 0) {
		// Não
		$("input[name='infoConsultaSaudeHoje'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoConsultaSaudeHoje'][value='Não Informado']").prop("checked", true);
	}
	consultaSaudeHoje();
	for (var i = 0; i < CIDADAOSAUDE.listaEspecialidadesConsultaHoje.length; i++) {
		auxVar = CIDADAOSAUDE.listaEspecialidadesConsultaHoje[i].especialidade;
		$('.adicionaEspecialidade').val(auxVar == null ? "" : auxVar);
		adicionaEspecialidadeConsultaHoje();
	}
	
	// Compareceu ao trabalho hoje
	if (CIDADAOSAUDE.dadosSaude.compareceu_trabalho_hoje == 1) {
		// Sim
		$("input[name='infoCompareceuTrabalhoHoje'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.compareceu_trabalho_hoje == 0) {
		// Não
		$("input[name='infoCompareceuTrabalhoHoje'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoCompareceuTrabalhoHoje'][value='Não Informado']").prop("checked", true);
	}
	compareceuTrabalhoHoje();
	auxVar = CIDADAOSAUDE.dadosSaude.motivo_falta_trabalho;
	$("#motivo_falta_trabalho").val(auxVar == null ? "" : auxVar);

	// Participou oficina hoje
	if (CIDADAOSAUDE.dadosSaude.participou_oficina_hoje == 1) {
		// Sim
		$("input[name='infoParticipouOficinaHoje'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.participou_oficina_hoje == 0) {
		// Não
		$("input[name='infoParticipouOficinaHoje'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoParticipouOficinaHoje'][value='Não Informado']").prop("checked", true);
	}
	infoParticipouOficinaHojef();
	for (var i = 0; i < CIDADAOSAUDE.listaOficinasParticipou.length; i++) {
		auxVar = CIDADAOSAUDE.listaOficinasParticipou[i].nome;
		$('.adicionaQualOficina').val(auxVar == null ? "" : auxVar);
		auxVar = CIDADAOSAUDE.listaOficinasParticipou[i].local;
		$('.adicionaLocalOficina').val(auxVar == null ? "" : auxVar);
		adicionaOficinaParticipou();
	}
	auxVar = CIDADAOSAUDE.dadosSaude.motivo_nao_participou_oficina_hoje;
	$("#motivo_nao_particiou_oficina_hoje").val(auxVar == null ? "" : auxVar);	

	// Atividade recreativa externa
	if (CIDADAOSAUDE.dadosSaude.atividade_recreativa_externa == 1) {
		// Sim
		$("input[name='infoParticipouAtividadeHoje'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.atividade_recreativa_externa == 0) {
		// Não
		$("input[name='infoParticipouAtividadeHoje'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoParticipouAtividadeHoje'][value='Não Informado']").prop("checked", true);
	}
	atividadeRecreativaExterna();
	for (var i = 0; i < CIDADAOSAUDE.listaAtividadeRecreativaExterna.length; i++) {
		auxVar = CIDADAOSAUDE.listaAtividadeRecreativaExterna[i].nome;
		$('.adicionaQualAtividade').val(auxVar == null ? "" : auxVar);
		auxVar = CIDADAOSAUDE.listaAtividadeRecreativaExterna[i].local;
		$('.adicionaLocalAtividade').val(auxVar == null ? "" : auxVar);
		adicionaAtividadeRecreativa();
	}
	
	// Tempo de abstinência
	var opts = "<span class='titSang'>Há quanto tempo tem se mantido abstinente:</span>" + 
			   "<select name='diasMantidoAbstinenciaLabel' id='diasMantidoAbstinenciaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Dias'>Dias</option>";
	for (var i = 1; i < 32; i++) {
		opts += "<option value='" + i + "' data-id='diasMantidoAbstinenciaLabel' for='dias_mantido_abstinencia'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.dias_mantido_abstinencia == i) ? " selected>" : ">") + i + (i == 1 ? " dia" : " dias") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='mesesMantidoAbstinenciaLabel' id='mesesMantidoAbstinenciaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Meses'>Meses</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesMantidoAbstinenciaLabel' for='meses_mantido_abstinencia'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.meses_mantido_abstinencia == i) ? " selected>" : ">") + i + (i == 1 ? " mês" : " meses") + "</option>";
	}
	opts += "</div></select>";
	
	opts += "<select name='anosMantidoAbstinenciaLabel' id='anosMantidoAbstinenciaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Anos'>Anos</option>";
	for (var i = 1; i < 51; i++) {
		opts += "<option value='" + i + "' data-id='anosMantidoAbstinenciaLabel' for='anos_mantido_abstinencia'";
		opts += ((edit == true && CIDADAOSAUDE.dadosSaude.anos_mantido_abstinencia == i) ? " selected>" : ">") + i + (i == 1 ? " ano" : " anos") + "</option>";
	}
	opts += "</div></select>";
	
	$("#listaDiasMesesAnosAbstinencia").empty();
	$("#listaDiasMesesAnosAbstinencia").append(opts);
	
	if (CIDADAOSAUDE.dadosSaude.usou_droga_hoje == 1) {
		// Sim
		$("input[name='infoUsouDrogaHoje'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.usou_droga_hoje == 0) {
		// Não
		$("input[name='infoUsouDrogaHoje'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoUsouDrogaHoje'][value='Não Informado']").prop("checked", true);
	}
	usouDrogaHoje();
	for (var i = 0; i < CIDADAOSAUDE.listaDrogasFazUso.length; i++) {
		// filtra as drogas para o tipo de pergunta = 3
		if (CIDADAOSAUDE.listaDrogasFazUso[i].tipo_pergunta != 3) {
			continue;
		}
		auxVar = CIDADAOSAUDE.listaDrogasFazUso[i].nome_droga;
		$('.adicionaDrogaHoje').val(auxVar == null ? "" : auxVar);
		adicionaDrogaHoje();
	}
	if (CIDADAOSAUDE.dadosSaude.usou_crack_hoje == 1) {
		// Sim
		$("input[name='infoUsouCrackHoje'][value='Sim']").prop("checked", true);
	}
	else if (CIDADAOSAUDE.dadosSaude.usou_crack_hoje == 0) {
		// Não
		$("input[name='infoUsouCrackHoje'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoUsouCrackHoje'][value='Não Informado']").prop("checked", true);
	}
	usouCrackHoje();
	auxVar = CIDADAOSAUDE.dadosSaude.quantas_pedras;
	$("#quantas_pedras").val(auxVar == null ? "" : auxVar);	
	
	// Observações Importantes
	auxVar = CIDADAOSAUDE.dadosSaude.observacoes_importantes;
	$("#observacoes_importantes").val(auxVar == null ? "" : auxVar);	

	// Observações
	auxVar = CIDADAOSAUDE.dadosSaude.observacoes_gerais;
	$("#observacoes_gerais").val(auxVar == null ? "" : auxVar);	
}

function salvaSaudeSuccess () {
	console.log("salvaSaudeSuccess");
	// todo: revisar
}

function salvaSaudeFail (err) {
	console.log("salvaSaudeFail: " + err);
	// todo: revisar
}

function saudeSalva() {
	console.log("saudeSalva");

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

		var listaDados = [];
		var auxVar;
		
		// Número do SUS (numero_sus)
		listaDados.push($("#numero_sus").val());
		
		// Cadastro UBS (cadastro_acompanhamento_ubs)
		auxVar = null;
		if ($("input:radio[name=infoCadastroAcompanhamentoUbs]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoCadastroAcompanhamentoUbs]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Acompanhamento CAPS (acompanhamento_caps, qual_acompanhamento_caps, tipo_frequencia_caps_id, nome_tecnico_referencia_caps)
		auxVar = null;
		if ($("input:radio[name=infoAcompanhamentoCaps]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoAcompanhamentoCaps]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("input[name='qual_acompanhamento_caps']").val());
		listaDados.push($("#tipoFrequenciaCapsLabel").val() == "Selecione" ? null : CIDADAOSAUDE.listaTipoFrequenciaCaps[$("#tipoFrequenciaCapsLabel").val()].id);
		listaDados.push($("input[name='nome_tecnico_referencia_caps']").val());
		
		// Internação (esteve_internado)
		auxVar = null;
		if ($("input:radio[name=infoEsteveInternado]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoEsteveInternado]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Como chegou à situação de rua (como_chegou_situacao_rua, dias_situacao_rua, meses_situacao_rua, , anos_situacao_rua)
		listaDados.push($("#como_chegou_situacao_rua").val());
		listaDados.push($("#diasLabel").val() == "Dias" ? null : $("#diasLabel").val());
		listaDados.push($("#mesesLabel").val() == "Meses" ? null : $("#mesesLabel").val());
		listaDados.push($("#anosLabel").val() == "Anos" ? null : $("#anosLabel").val());
		
		// Iniciou o uso de drogras (drogas_antes_depois_situacao_rua)
		auxVar = null;
		if ($("input:radio[name=infoDrogasAntesDepoisSituacaoRua]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoDrogasAntesDepoisSituacaoRua]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Horas de Sono (sono_antes_programa, sono_depois_programa)
		listaDados.push($("#sono_antes_programa").val());
		listaDados.push($("#sono_depois_programa").val());

		// Tem amigos (tem_amigos)
		auxVar = null;
		if ($("input:radio[name=infoTemAmigos]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTemAmigos]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// Tem companheiro (tem_companheiro)
		auxVar = null;
		if ($("input:radio[name=infoTemCompanheiro]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTemCompanheiro]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// Companheiro inserido no programa (companheiro_programa)
		auxVar = null;
		if ($("input:radio[name=infoTemCompanheiroPrograma]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTemCompanheiroPrograma]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// Tem família (tem_familia)
		auxVar = null;
		if ($("input:radio[name=infoTemFamilia]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTemFamilia]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// Tem contato com a família (tem_contato_familia)
		auxVar = null;
		if ($("input:radio[name=infoTemContatoFamilia]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTemContatoFamilia]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// UF onde reside a família (tipo_estado_id)
		listaDados.push($("#estadoNomeLabel").val() == "Selecione" ? null : CIDADAOSAUDE.listaEstados[$("#estadoNomeLabel").val()].id);
		
		// Descrição de onde reside sua família (descricao_reside_familia)
		listaDados.push($("#descricao_reside_familia").val());
		
		// Há quanto tempo usa crack (dias_faz_uso_crack, meses_faz_uso_crack, anos_faz_uso_crack)
		listaDados.push($("#diasFazUsoCrackLabel").val() == "Dias" ? null : $("#diasFazUsoCrackLabel").val());
		listaDados.push($("#mesesFazUsoCrackLabel").val() == "Meses" ? null : $("#mesesFazUsoCrackLabel").val());
		listaDados.push($("#anosFazUsoCrackLabel").val() == "Anos" ? null : $("#anosFazUsoCrackLabel").val());
		
		// Quantas pedras antes (numero_pedras_antes_programa)
		listaDados.push($("#numeroPedrasAntesProgramaLabel").val() == "Selecione" ? null : $("#numeroPedrasAntesProgramaLabel").val());

		// Quantas pedras atualmente (numero_pedras_atualmente)
		listaDados.push($("#numeroPedrasAtualmenteLabel").val() == "Selecione" ? null : $("#numeroPedrasAtualmenteLabel").val());
		
		// Faz uso de outras drogas (drogas_alem_crack)
		auxVar = null;
		if ($("input:radio[name=infoDrogasAlemCrack]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoDrogasAlemCrack]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Já fez uso de droga injetável (uso_drogas_injetaveis, dias_uso_drogas_injetaveis, meses_uso_drogas_injetaveis, anos_uso_drogas_injetaveis)
		auxVar = null;
		if ($("input:radio[name=infoUsoDrogasInjetaveis]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoUsoDrogasInjetaveis]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#diasUsoDrogasInjetaveisLabel").val() == "Dias" ? null : $("#diasUsoDrogasInjetaveisLabel").val());
		listaDados.push($("#mesesUsoDrogasInjetaveisLabel").val() == "Meses" ? null : $("#mesesUsoDrogasInjetaveisLabel").val());
		listaDados.push($("#anosUsoDrogasInjetaveisLabel").val() == "Anos" ? null : $("#anosUsoDrogasInjetaveisLabel").val());
		
		// Abstinente (abstinencia_apos_programa, dias_abstinencia_apos_programa, meses_abstinencia_apos_programa, anos_abstinencia_apos_programa)
		auxVar = null;
		if ($("input:radio[name=infoAbstinenciaAposPrograma]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoAbstinenciaAposPrograma]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#diasAbstinenciaAposProgramaLabel").val() == "Dias" ? null : $("#diasAbstinenciaAposProgramaLabel").val());
		listaDados.push($("#mesesAbstinenciaAposProgramaLabel").val() == "Meses" ? null : $("#mesesAbstinenciaAposProgramaLabel").val());
		listaDados.push($("#anosAbstinenciaAposProgramaLabel").val() == "Anos" ? null : $("#anosAbstinenciaAposProgramaLabel").val());
		
		// Glicemia, pressão arterial e peso (controle_glicemia, controle_pressao_arterial, controle_peso)
		listaDados.push($("#controle_glicemia").val());
		listaDados.push($("#controle_pressao_arterial").val());
		listaDados.push($("#controle_peso").val());
		
		// Fez teste rápido de DST (teste_rapido_dst_aids, local_teste_rapido_dst_aids)
		auxVar = null;
		if ($("input:radio[name=infoTesteRapidoDstAids]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTesteRapidoDstAids]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_teste_rapido_dst_aids").val());
		
		// Acompanhamento DST (acompanhamento_dst, local_acompanhamento_dst)
		auxVar = null;
		if ($("input:radio[name=infoAcompanhamentoDst]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoAcompanhamentoDst]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_acompanhamento_dst").val());
		
		// Tem diagnóstico HIV (diagnostico_hiv_aids, tratamento_hiv_aids, local_tratamento_hiv_aids)
		auxVar = null;
		if ($("input:radio[name=infoDiagnosticoHivAids]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoDiagnosticoHivAids]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		auxVar = null;
		if ($("input:radio[name=infoTratamentoHivAids]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTratamentoHivAids]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_tratamento_hiv_aids").val());
		
		// Diagnóstico de Sífilis (diagnostico_sifilis, tratamento_sifilis, local_tratamento_sifilis, alta_tratamento_sifilis)
		auxVar = null;
		if ($("input:radio[name=infoDiagnosticoSifilis]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoDiagnosticoSifilis]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		auxVar = null;
		if ($("input:radio[name=infoTratamentoSifilis]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTratamentoSifilis]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_tratamento_sifilis").val());
		auxVar = null;
		if ($("input:radio[name=infoAltaTratamentoSifilis]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoAltaTratamentoSifilis]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Avaliação Odontológica (passou_avaliacao_odontologica, local_passou_avaliacao_odontologica, tratamento_odontologico)
		auxVar = null;
		if ($("input:radio[name=infoPassouAvaliacaoOdontologica]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoPassouAvaliacaoOdontologica]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_passou_avaliacao_odontologica").val());
		auxVar = null;
		if ($("input:radio[name=infoAltaTratamentoOdontologico]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoAltaTratamentoOdontologico]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Sintomas respiratórios (sintomas_respiratorios, tratamento_sintomas_respiratorios, local_tratamento_sintomas_respiratorios)
		auxVar = null;
		if ($("input:radio[name=infoSintomasRespiratorios]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoSintomasRespiratorios]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		auxVar = null;
		if ($("input:radio[name=infoTratamentoSintomasRespiratorios]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTratamentoSintomasRespiratorios]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_tratamento_sintomas_respiratorios").val());
		
		// Teste de tuberculose (realizou_teste_tuberculose, diagnostico_tuberculose, em_tratamento_tuberculose)
		auxVar = null;
		if ($("input:radio[name=infoRealizouTesteTuberculose]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoRealizouTesteTuberculose]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		auxVar = null;
		if ($("input:radio[name=infoDiagnosticoTuberculose]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoDiagnosticoTuberculose]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		auxVar = null;
		if ($("input:radio[name=infoEmTratamentoTuberculose]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoEmTratamentoTuberculose]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Já teve tuberculose (teve_tuberculose, fez_tratamento_tuberculose, local_fez_tratamento_tuberculose, teve_alta_tratamento_tuberculose)
		auxVar = null;
		if ($("input:radio[name=infoTeveTuberculose]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTeveTuberculose]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		auxVar = null;
		if ($("input:radio[name=infoFezTratamentoTuberculose]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoFezTratamentoTuberculose]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_fez_tratamento_tuberculose").val());
		auxVar = null;
		if ($("input:radio[name=infoTeveAltaTratamentoTuberculose]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTeveAltaTratamentoTuberculose]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Lesões na pele (lesoes_pele)
		auxVar = null;
		if ($("input:radio[name=infoLesoesPele]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoLesoesPele]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// Vacinação em dia (vacinacao_em_dia)
		auxVar = null;
		if ($("input:radio[name=infoVacinacaoEmDia]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoVacinacaoEmDia]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Outros sinais e sintomas críticos (outros_sinais_sintomas_criticos)
		listaDados.push($("#outros_sinais_sintomas_criticos").val());
		
		// Avaliação ginecológica (avaliacao_ginecologica,local_avaliacao_ginecologica)
		auxVar = null;
		if ($("input:radio[name=infoAvaliacaoGinecologica]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoAvaliacaoGinecologica]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_avaliacao_ginecologica").val());

		// Método anticoncepcional (metodo_anticoncepcional, qual_metodo_anticoncepcional)
		auxVar = null;
		if ($("input:radio[name=infoMetodoAnticoncepcional]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoMetodoAnticoncepcional]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#qual_metodo_anticoncepcional").val());

		// Teve algum aborto (teve_aborto)
		auxVar = null;
		if ($("input:radio[name=infoTeveAborto]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTeveAborto]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Planejamento familiar (planejamento_familiar, local_planejamento_familiar)
		auxVar = null;
		if ($("input:radio[name=infoPlanejamentoFamiliar]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoPlanejamentoFamiliar]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_planejamento_familiar").val());

		// Está grávida (gestante)
		auxVar = null;
		if ($("input:radio[name=infoGestante]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoGestante]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Está fazendo pré-natal (pre_natal, local_pre_natal)
		auxVar = null;
		if ($("input:radio[name=infoPreNatal]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoPreNatal]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#local_pre_natal").val());

		// Amparo maternal (amparo_maternal)
		auxVar = null;
		if ($("input:radio[name=infoAmparoMaternal]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoAmparoMaternal]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// Está amamentando (amamentando)
		auxVar = null;
		if ($("input:radio[name=infoAmamentando]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoAmamentando]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);

		// Consulta na data de hoje (consulta_saude_hoje)
		auxVar = null;
		if ($("input:radio[name=infoConsultaSaudeHoje]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoConsultaSaudeHoje]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Compareceu ao trabalho hoje (compareceu_trabalho_hoje, motivo_falta_trabalho)
		auxVar = null;
		if ($("input:radio[name=infoCompareceuTrabalhoHoje]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoCompareceuTrabalhoHoje]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#motivo_falta_trabalho").val());

		// Participou oficina hoje (participou_oficina_hoje, motivo_nao_particiou_oficina_hoje)
		auxVar = null;
		if ($("input:radio[name=infoParticipouOficinaHoje]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoParticipouOficinaHoje]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#motivo_nao_particiou_oficina_hoje").val());

		// Atividade recreativa externa (atividade_recreativa_externa, )
		auxVar = null;
		if ($("input:radio[name=infoParticipouAtividadeHoje]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoParticipouAtividadeHoje]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Tempo de abstinência (dias_mantido_abstinencia, meses_mantido_abstinencia, anos_mantido_abstinencia, usou_droga_hoje, usou_crack_hoje, quantas_pedras)
		listaDados.push($("#diasMantidoAbstinenciaLabel").val() == "Dias" ? null : $("#diasMantidoAbstinenciaLabel").val());
		listaDados.push($("#mesesMantidoAbstinenciaLabel").val() == "Meses" ? null : $("#mesesMantidoAbstinenciaLabel").val());
		listaDados.push($("#anosMantidoAbstinenciaLabel").val() == "Anos" ? null : $("#anosMantidoAbstinenciaLabel").val());
		auxVar = null;
		if ($("input:radio[name=infoUsouDrogaHoje]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoUsouDrogaHoje]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		auxVar = null;
		if ($("input:radio[name=infoUsouCrackHoje]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoUsouCrackHoje]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		listaDados.push($("#quantas_pedras").val());
		
		// Observações Importantes (observacoes_importantes)
		listaDados.push($("#observacoes_importantes").val());

		// Observações Gerais (observacoes_gerais)
		listaDados.push($("#observacoes_gerais").val());

		// Uso de drogas (reducao_drogas_depois_programa, tempo_efeito_droga_antes_programa, tempo_efeito_droga_depois_programa)
		auxVar = null;
		if ($("input:radio[name=infoReducaoDrogasDepoisPrograma]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoReducaoDrogasDepoisPrograma]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		auxVar = null;
		if ($("input:radio[name=infoTempoEfeitoDrogaAntesPrograma]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTempoEfeitoDrogaAntesPrograma]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		auxVar = null;
		if ($("input:radio[name=infoTempoEfeitoDrogaDepoisPrograma]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTempoEfeitoDrogaDepoisPrograma]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// Está em tratamento de saúde (tratamento_saude)
		auxVar = null;
		if ($("input:radio[name=infoTratamentoSaude]:checked").val() == "Sim") {
			auxVar = 1;
		}
		else if ($("input:radio[name=infoTratamentoSaude]:checked").val() == "Não") {
			auxVar = 0;
		}
		listaDados.push(auxVar);
		
		// todo: testes retirar
		var Print = "Salvar em saude: " + listaDados.length + " campos.\r\n";
		for (var i = 0; i < listaDados.length; i++) {
			Print += "Campo " + i + "= " + listaDados[i] + "\r\n";
		}
		console.log(Print);
		// testes retirar
			
		// ********************* LISTAS	
		// listaCadastroAcompanhamentoUBS (nome_ubs, especialidade, nome_tecnico_referencia)
		var cadastroAcompanhamentoUBS = [];
		$(".adicionaInputUbsSaude").children().each(function () {
			var v = {
				nome_ubs: this.children[0].value,
				nome_tecnico_referencia: this.children[1].value,
				especialidade: this.children[2].value,
			};
			cadastroAcompanhamentoUBS.push(v);
		});
		// todo: testes retirar
		var Print = "Cadastro acompanhamento UBS\r\n";
		for (var i = 0; i < cadastroAcompanhamentoUBS.length; i++) {
			Print += "Nome UBS: " + cadastroAcompanhamentoUBS[i].nome_ubs + " - Técnico: " + cadastroAcompanhamentoUBS[i].nome_tecnico_referencia + " - Especialidade: " + cadastroAcompanhamentoUBS[i].especialidade + "\r\n";
		}
		console.log(Print);
		// testes retirar

		// listaInternacao (quantas_vezes, local, motivo)
		var internacao = [];
		$(".adicionaInputInternacao").children().each(function () {
			var v = {
				quantas_vezes: this.children[0].value,
				local: this.children[1].value,
				motivo: this.children[2].value,
			};
			internacao.push(v);
		});
		// todo: testes retirar
		var Print = "Internação\r\n";
		for (var i = 0; i < internacao.length; i++) {
			Print += "Quantas vezes: " + internacao[i].quantas_vezes + " - Local: " + internacao[i].local + " - Motivo: " + internacao[i].motivo + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		// listaTelefoneFamiliar (tipo_parentesco_id, numero)
		var telefoneFamiliar = [];
		$(".adicionaInputContatoFamiliar").children().each(function () {
			var v = {
				tipo_parentesco_nome: this.children[0].value,
				//tipo_parentesco_id: this.children[1].value,
				numero: this.children[2].value,
			};
			telefoneFamiliar.push(v);
		});
		// todo: testes retirar
		var Print = "Telefone Familiar\r\n";
		for (var i = 0; i < telefoneFamiliar.length; i++) {
			Print += /*"Tipo Parentesco ID: " + telefoneFamiliar[i].tipo_parentesco_id + */"Tipo Parentesco Nome: " + telefoneFamiliar[i].tipo_parentesco_nome + " - Número: " + telefoneFamiliar[i].numero + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		// listaDrogasFazUso para tipo_pergunta 1, 2 e 3 (tipo_pergunta, nome_droga, dias_frequencia, meses_frequencia, anos_frequencia)
		// ********************************** TIPO 1: Quais drogras faz uso
		var drogasTipo1 = [];
		$(".adicionaInputDrogas").children().each(function () {
			var v = {
				nome_droga: this.children[0].value,
				dias_frequencia: this.children[1].children[0].value,
				meses_frequencia: this.children[1].children[1].value,
				anos_frequencia: this.children[1].children[2].value,
			};
			drogasTipo1.push(v);
		});
		// todo: testes retirar
		var Print = "Quais drogas faz uso\r\n";
		for (var i = 0; i < drogasTipo1.length; i++) {
			Print += "Droga: " + drogasTipo1[i].nome_droga + " - Dias: " + drogasTipo1[i].dias_frequencia + " - Meses: " + drogasTipo1[i].meses_frequencia + " - Anos: " + drogasTipo1[i].anos_frequencia + "\r\n";
		}
		console.log(Print);
		// testes retirar
		// ********************************** TIPO 1: Quais drogras faz uso
		// ********************************** TIPO 2: Drogas além do crack
		var drogasTipo2 = [];
		$(".adicionaInputDrogasAlemCrack").children().each(function () {
			var v = {
				nome_droga: this.children[0].value,
			};
			drogasTipo2.push(v);
		});
		// todo: testes retirar
		var Print = "Drogas além do crack\r\n";
		for (var i = 0; i < drogasTipo2.length; i++) {
			Print += "Droga: " + drogasTipo2[i].nome_droga + "\r\n";
		}
		console.log(Print);
		// testes retirar
		// ********************************** TIPO 2: Drogas além do crack
		// ********************************** TIPO 3: Alguma droga neste dia
		var drogasTipo3 = [];
		$(".adicionaInputDrogaHoje").children().each(function () {
			var v = {
				nome_droga: this.children[0].value,
			};
			drogasTipo3.push(v);
		});
		// todo: testes retirar
		var Print = "Alguma droga neste dia\r\n";
		for (var i = 0; i < drogasTipo3.length; i++) {
			Print += "Droga: " + drogasTipo3[i].nome_droga + "\r\n";
		}
		console.log(Print);
		// testes retirar
		// ********************************** TIPO 3: Alguma droga neste dia
		
		// listaEspecialidadesConsultaHoje (especialidade, local)
		var especialidadesConsultaHoje = [];
		$(".adicionaInputEspecialidadeConsulta").children().each(function () {
			var v = {
				especialidade: this.children[0].value,
				//local: this.children[1].value,
			};
			especialidadesConsultaHoje.push(v);
		});
		// todo: testes retirar
		var Print = "Especialidades Consulta Hoje\r\n";
		for (var i = 0; i < especialidadesConsultaHoje.length; i++) {
			Print += "Especialidade: " + especialidadesConsultaHoje[i].especialidade/* + " - Local: " + especialidadesConsultaHoje[i].local*/ + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		// listaOficinasParticipou (nome, local)
		var oficinasParticipou = [];
		$(".adicionaInputOficinasParticipou").children().each(function () {
			var v = {
				nome: this.children[0].value,
				local: this.children[1].value,
			};
			oficinasParticipou.push(v);
		});
		// todo: testes retirar
		var Print = "Oficinas Participou\r\n";
		for (var i = 0; i < oficinasParticipou.length; i++) {
			Print += "Nome: " + oficinasParticipou[i].nome + " - Local: " + oficinasParticipou[i].local + "\r\n";
		}
		console.log(Print);
		// testes retirar
		
		// listaAtividadeRecreativaExterna (nome, local)
		var atividadeRecreativaExterna = [];
		$(".adicionaInputAtividadesParticipou").children().each(function () {
			var v = {
				nome: this.children[0].value,
				local: this.children[1].value,
			};
			atividadeRecreativaExterna.push(v);
		});
		// todo: testes retirar
		var Print = "Atividades Recreativas Externas\r\n";
		for (var i = 0; i < atividadeRecreativaExterna.length; i++) {
			Print += "Nome: " + atividadeRecreativaExterna[i].nome + " - Local: " + atividadeRecreativaExterna[i].local + "\r\n";
		}
		console.log(Print);
		// testes retirar

		CIDADAOSAUDE.auxcadastroAcompanhamentoUBS = cadastroAcompanhamentoUBS;
		CIDADAOSAUDE.auxinternacao = internacao;
		CIDADAOSAUDE.auxtelefoneFamiliar = telefoneFamiliar;
		CIDADAOSAUDE.auxdrogasTipo1 = drogasTipo1;
		CIDADAOSAUDE.auxdrogasTipo2 = drogasTipo2;
		CIDADAOSAUDE.auxdrogasTipo3 = drogasTipo3;
		CIDADAOSAUDE.auxespecialidadesConsultaHoje = especialidadesConsultaHoje;
		CIDADAOSAUDE.auxoficinasParticipou = oficinasParticipou;
		CIDADAOSAUDE.auxatividadeRecreativaExterna = atividadeRecreativaExterna;

		CIDADAOSAUDE.salvaCidadaoSaude(listaDados,
										this.salvaSaudeSuccess,
										this.salvaSaudeFail);
	}
}
