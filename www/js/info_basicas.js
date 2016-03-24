/******************************************************************
********** CONTROLE DE APRESENTAÇÃO DA TELA
/******************************************************************/
//abre input orientação sexual
function abreOrientSexual(){
		if ($("input:radio[name=infoOrientacaoSexual]:checked").val() == "Sim") {
			jQuery('#orientacaoSexual').show();
		}
		else {
			jQuery('#orientacaoSexual').hide();
		}
};

//abre input quantos filhos
function abreQtdFilhos(){
		if ($("input:radio[name=temFilho]:checked").val() == "Sim") {
			jQuery('#qtdFilho').show();
		}
		else {
			jQuery('#qtdFilho').hide();
		}
};

//abre input qual familiar
function abreQualFamiliar(){
		if ($("input:radio[name=infoTemContatoFamilia]:checked").val() == "Sim") {
			jQuery('#contatoFamilia').show();	
			jQuery('#qualFamiliar').show();
		}
		else {
			jQuery('#contatoFamilia').hide();
			jQuery('#qualFamiliar').hide();
		}
};

//abre input qual deficiencia
function abreQualDeficiencia(){
		if ($("input:radio[name=possui_deficiencia]:checked").val() == "Sim") {
			jQuery('#quaisDeficiencias').show();	
		}
		else {
			jQuery('#quaisDeficiencias').hide();
		}
};

function btLimpar(){
	document.getElementById('informacoes_complementares').value = "";
};

/******************************************************************
********** CARREGA DADOS DO CIDADÃO
/******************************************************************/
function carregaDadosInfoBasicas() {
	console.log("carregaDadosInfoBasicas");
	
	var auxVar;
	
	// GÊNERO
	if (INFOBASICAS.generoCidadao.info_orientacao_sexual_genero == 1) {
		// Sim
		$("input[name='infoOrientacaoSexual'][value='Sim']").prop("checked", true);
	}
	else if (INFOBASICAS.generoCidadao.info_orientacao_sexual_genero == 0) {
		// Não
		$("input[name='infoOrientacaoSexual'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoOrientacaoSexual'][value='NãoInformado']").prop("checked", true);
	}
	abreOrientSexual();
	
	// INFORMAÇÕES ADICIONAIS
	auxVar = INFOBASICAS.infoAdicionaisCidadao.rg;
	$("#rg_rne").val(auxVar == null ? "" : auxVar);

	auxVar = INFOBASICAS.infoAdicionaisCidadao.cpf;
	$("#cpf").val(auxVar == null ? "" : auxVar);

	auxVar = INFOBASICAS.infoAdicionaisCidadao.nome_pai;
	$("#nome_pai").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.infoAdicionaisCidadao.cidade_nascimento;
	$("#cidade_nascimento").val(auxVar == null ? "" : auxVar);
	
	// SITUAÇÃO DE RUA
	auxVar = INFOBASICAS.situacaoRuaCidadao.outros_situacao_rua;
	$("#outros_situacao_rua").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.situacaoRuaCidadao.local_onde_encontra;
	$("#local_onde_encontra").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.situacaoRuaCidadao.onde_morava_antes_rua;
	$("#onde_morava_antes_rua").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.situacaoRuaCidadao.bairro;
	$("#bairro").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.situacaoRuaCidadao.municipio_procendencia;
	$("#municipio_procendencia").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.situacaoRuaCidadao.acompanhante_rua_outros;
	$("#acompanhante_rua_outros").val(auxVar == null ? "" : auxVar);
	
	if (INFOBASICAS.situacaoRuaCidadao.tem_filhos == 1) {
		// Sim
		$("input[name='temFilho'][value='Sim']").prop("checked", true);
	}
	else if (INFOBASICAS.situacaoRuaCidadao.tem_filhos == 0) {
		// Não
		$("input[name='temFilho'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='temFilho'][value='NãoInformado']").prop("checked", true);
	}
	abreQtdFilhos();
	
	auxVar = INFOBASICAS.situacaoRuaCidadao.qtd_filhos;
	$("#qtd_filhos").val(auxVar == null ? "" : auxVar);
	
	if (INFOBASICAS.situacaoRuaCidadao.contato_familia == 1) {
		// Sim
		$("input[name='infoTemContatoFamilia'][value='Sim']").prop("checked", true);
	}
	else if (INFOBASICAS.situacaoRuaCidadao.contato_familia == 0) {
		// Não
		$("input[name='infoTemContatoFamilia'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTemContatoFamilia'][value='NãoInformado']").prop("checked", true);
	}
	abreQualFamiliar();
	
	if (INFOBASICAS.situacaoRuaCidadao.contato_parente == 1) {
		// Sim
		$("input[name='infoContatoFamilia'][value='Sim']").prop("checked", true);
	}
	else if (INFOBASICAS.situacaoRuaCidadao.contato_parente == 0) {
		// Não
		$("input[name='infoContatoFamilia'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoContatoFamilia'][value='NãoInformado']").prop("checked", true);
	}
	
	auxVar = INFOBASICAS.situacaoRuaCidadao.contato_familia_outros;
	$("#contato_familia_outros").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.situacaoRuaCidadao.referencia_familiar;
	$("#referencia_familiar").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.situacaoRuaCidadao.telefone;
	$("#telefone").val(auxVar == null ? "" : auxVar);
	
	// TRABALHO E EDUCAÇÃO
	if (INFOBASICAS.trabalhoEducacaoCidadao.trabalhando == 1) {
		// Sim
		$("input[name='infoTrabalhando'][value='Sim']").prop("checked", true);
	}
	else if (INFOBASICAS.trabalhoEducacaoCidadao.trabalhando == 0) {
		// Não
		$("input[name='infoTrabalhando'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoTrabalhando'][value='NãoInformado']").prop("checked", true);
	}

	auxVar = INFOBASICAS.trabalhoEducacaoCidadao.profissao_atividade;
	$("#profissao_atividade").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.trabalhoEducacaoCidadao.escolaridades_outros;
	$("#escolaridades_outros").val(auxVar == null ? "" : auxVar);
	
	// SAÚDE
	auxVar = INFOBASICAS.saudeCidadao.condicoes_saude_outros;
	$("#condicao_saude_outros").val(auxVar == null ? "" : auxVar);
	
	if (INFOBASICAS.saudeCidadao.gestante == 1) {
		// Sim
		$("input[name='infoGestante'][value='Sim']").prop("checked", true);
	}
	else if (INFOBASICAS.saudeCidadao.gestante == 0) {
		// Não
		$("input[name='infoGestante'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='infoGestante'][value='NãoInformado']").prop("checked", true);
	}

	if (INFOBASICAS.saudeCidadao.possui_deficiencia == 1) {
		// Sim
		$("input[name='possui_deficiencia'][value='Sim']").prop("checked", true);
	}
	else if (INFOBASICAS.saudeCidadao.possui_deficiencia == 0) {
		// Não
		$("input[name='possui_deficiencia'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='possui_deficiencia'][value='NãoInformado']").prop("checked", true);
	}
	abreQualDeficiencia();
	
	auxVar = INFOBASICAS.saudeCidadao.quais_deficiencias;
	$("#quais_deficiencias").val(auxVar == null ? "" : auxVar);
	
	if (INFOBASICAS.saudeCidadao.alcool_droga == 1) {
		// Sim
		$("input[name='alcool_droga'][value='Sim']").prop("checked", true);
	}
	else if (INFOBASICAS.saudeCidadao.alcool_droga == 0) {
		// Não
		$("input[name='alcool_droga'][value='Não']").prop("checked", true);
	}
	else {
		// null ou vazio
		$("input[name='alcool_droga'][value='NãoInformado']").prop("checked", true);
	}
	
	auxVar = INFOBASICAS.saudeCidadao.nome_drogas;
	$("#nome_drogas").val(auxVar == null ? "" : auxVar);
	
	auxVar = INFOBASICAS.saudeCidadao.frequencia_drogas;
	$("#frequencia_drogas").val(auxVar == null ? "" : auxVar);
	
	// INFORMAÇÕES COMPLEMENTARES
	auxVar = INFOCOMPLE.infoComplementares;
	$("#informacoes_complementares").val(auxVar == null ? "" : auxVar);	
};

/******************************************************************
********** CONTROLE DE LISTAS DE OPÇÕES
/******************************************************************/
function infoBasicasOpcoes() {
	console.log("infoBasicasOpcoes");
	
	var edit = true;		// todo: apenas edição, por enquanto
	
	// GÊNERO
	var opts = "<select id='sexoLabel' class='selectPersonalizado'><option value='Selecione' data-id='sexoLabel' for='sexo_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoSexo.length; i++) {
		opts += "<option value='" + i + "' data-id='sexoLabel' for='sexo_id'";
		opts += ((edit == true && INFOBASICAS.generoCidadao.sexo_id == INFOBASICAS.tipoSexo[i].id) ? " selected>" : ">") + INFOBASICAS.tipoSexo[i].nome + "</option>";
	}
	opts += "</select>";
	console.log(opts + "\r\n");
	
	$("#listaSexos").empty();
	$("#listaSexos").append(opts);

	var opts = "<select id='orientacaoSexualLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='orientacaoSexualLabel' for='orientacao_sexual_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoOrientacaoSexual.length; i++) {
		opts += "<option value='" + i + "' data-id='orientacaoSexualLabel' for='orientacao_sexual_id'";
		opts += ((edit == true && INFOBASICAS.generoCidadao.orientacao_sexual_id == INFOBASICAS.tipoOrientacaoSexual[i].id) ? " selected>" : ">") + INFOBASICAS.tipoOrientacaoSexual[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaOrientacaoSexual").empty();
	$("#listaOrientacaoSexual").append(opts);


	// COR DE PELE
	var opts = "<select id='corLabel' class='selectPersonalizado'><option value='Selecione' data-id='corLabel' for='cor_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoSexo.length; i++) {
		opts += "<option value='" + i + "' data-id='corLabel' for='cor_id'";
		opts += ((edit == true && INFOBASICAS.corCidadao.cor_id == INFOBASICAS.tipoCor[i].id) ? " selected>" : ">") + INFOBASICAS.tipoCor[i].nome + "</option>";
	}
	opts += "</select>";
	console.log(opts + "\r\n");
	
	$("#listaCorpele").empty();
	$("#listaCorpele").append(opts);
	
	// INFORMAÇÕES ADICIONAIS
	// todo: tipos de cutis
	/*
	var opts = "<select id='estadoCivilLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='estadoCivilLabel' for='estado_civil_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoEstadoCivil.length; i++) {
		opts += "<option value='" + i + "' data-id='estadoCivilLabel' for='estado_civil_id'";
		opts += ((edit == true && INFOBASICAS.infoAdicionaisCidadao.tipo_cutis_id == INFOBASICAS.tipoEstadoCivil[i].id) ? " selected>" : ">") + INFOBASICAS.tipoEstadoCivil[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaEstadoCivil").empty();
	$("#listaEstadoCivil").append(opts);
	*/
	// todo: tipos de cutis
	
	var opts = "<select id='estadoCivilLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='estadoCivilLabel' for='estado_civil_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoEstadoCivil.length; i++) {
		opts += "<option value='" + i + "' data-id='estadoCivilLabel' for='estado_civil_id'";
		opts += ((edit == true && INFOBASICAS.infoAdicionaisCidadao.estado_civil_id == INFOBASICAS.tipoEstadoCivil[i].id) ? " selected>" : ">") + INFOBASICAS.tipoEstadoCivil[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaEstadoCivil").empty();
	$("#listaEstadoCivil").append(opts);
	
	var opts = "<select id='nascimentoEstadoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='nascimentoEstadoLabel' for='nascimento_estado_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoEstado.length; i++) {
		opts += "<option value='" + i + "' data-id='nascimentoEstadoLabel' for='nascimento_estado_id'";
		opts += ((edit == true && INFOBASICAS.infoAdicionaisCidadao.nascimento_estado_id == INFOBASICAS.tipoEstado[i].id) ? " selected>" : ">") + INFOBASICAS.tipoEstado[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaEstado").empty();
	$("#listaEstado").append(opts);

	// SITUAÇÃO DE RUA
	var opts = "<select id='diasLabel' class='selectPersonalizado pos-inh w-100-pct'><div class='lista-box-scroll'><option value='Dias' data-id='diasLabel' for='dias_situacao_rua'>Dias</option>";
	for (var i = 1; i < 32; i++) {
		opts += "<option value='" + i + "' data-id='diasLabel' for='nascimento_estado_id'";
		opts += ((edit == true && INFOBASICAS.situacaoRuaCidadao.dias_situaca_rua == i) ? " selected>" : ">") + i + (i == 1 ? " Dia" : " Dias") + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaDias").empty();
	$("#listaDias").append(opts);

	var opts = "<select id='mesesLabel' class='selectPersonalizado pos-inh w-100-pct'><div class='lista-box-scroll'><option value='Meses' data-id='mesesLabel' for='meses_situacao_rua'>Meses</option>";
	for (var i = 1; i < 13; i++) {
		opts += "<option value='" + i + "' data-id='mesesLabel' for='meses_situacao_rua'";
		opts += ((edit == true && INFOBASICAS.situacaoRuaCidadao.meses_situacao_rua == i) ? " selected>" : ">") + i + (i == 1 ? " Mês" : " Meses") + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaMeses").empty();
	$("#listaMeses").append(opts);

	var opts = "<select id='anosLabel' class='selectPersonalizado pos-inh w-100-pct'><div class='lista-box-scroll'><option value='Anos' data-id='anosLabel' for='anos_situacao_rua'>Anos</option>";
	for (var i = 1; i < 51; i++) {
		opts += "<option value='" + i + "' data-id='anosLabel' for='anos_situacao_rua'";
		opts += ((edit == true && INFOBASICAS.situacaoRuaCidadao.anos_situacao_rua == i) ? " selected>" : ">") + i + (i == 1 ? " Ano" : " Anos") + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaAnos").empty();
	$("#listaAnos").append(opts);

	var opts = "<select id='estadoProcedenciaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='estadoProcedenciaLabel' for='nascimento_estado_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoEstado.length; i++) {
		opts += "<option value='" + i + "' data-id='estadoProcedenciaLabel' for='nascimento_estado_id'";
		opts += ((edit == true && INFOBASICAS.situacaoRuaCidadao.procedencia_estado_id == INFOBASICAS.tipoEstado[i].id) ? " selected>" : ">") + INFOBASICAS.tipoEstado[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaEstadoProcedencia").empty();
	$("#listaEstadoProcedencia").append(opts);

	var opts = "<select id='paisProcedenciaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='paisProcedenciaLabel' for='procendencia_pais_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoPais.length; i++) {
		opts += "<option value='" + i + "' data-id='paisProcedenciaLabel' for='procendencia_pais_id'";
		opts += ((edit == true && INFOBASICAS.situacaoRuaCidadao.procedencia_pais_id == INFOBASICAS.tipoPais[i].id) ? " selected>" : ">") + INFOBASICAS.tipoPais[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaPaisProcedencia").empty();
	$("#listaPaisProcedencia").append(opts);
	
	opts = "";
	for (var i = 0; i < INFOBASICAS.tipoAcompanhanteRua.length; i++) {
		var encontrou = false;
		for (var j = 0; j < INFOBASICAS.situacaoRuaCidadao.acompanhante_rua.length; j++) {
			if (INFOBASICAS.situacaoRuaCidadao.acompanhante_rua[j] == INFOBASICAS.tipoAcompanhanteRua[i].id) {
				encontrou = true;
				break;
			}
		}
		opts += "<div class='checkbox'><input type='checkbox' name='tipoAcompanhanteRua" + i + "' value='" + i + "' class='checkbox check'" + (encontrou == true ? "checked" : "") + ">";
		opts += "<p>" + INFOBASICAS.tipoAcompanhanteRua[i].nome + "</p></div>";
	}
	opts += "<input type='text' class='inputMed spacer-h' value='' name='acompanhante_rua_outros' placeholder='Outros' id='acompanhante_rua_outros'>";
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#container_comquem").empty();
	$("#container_comquem").append(opts);
	
	opts = "";
	for (var i = 0; i < INFOBASICAS.tipoParentesco.length; i++) {
		var encontrou = false;
		for (var j = 0; j < INFOBASICAS.situacaoRuaCidadao.quais_familiares.length; j++) {
			if (INFOBASICAS.situacaoRuaCidadao.quais_familiares[j] == INFOBASICAS.tipoParentesco[i].id) {
				encontrou = true;
				break;
			}
		}
		opts += "<div class='checkbox'><input type='checkbox' name='tipoParentesco" + i + "' value='" + i + "' class='checkbox check radio active'" + (encontrou == true ? "checked" : "") + ">";
		opts += "<p>" + INFOBASICAS.tipoParentesco[i].nome + "</p></div>";
	}
	opts += "<input type='text' class='inputMed' value='' name='contato_familia_outros' id='contato_familia_outros' placeholder='Outros'>";
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#container_familiar").empty();
	$("#container_familiar").append(opts);
	
	// TRABALHO E EDUCAÇÃO
	var opts = "<select id='habilidadesLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='habilidadesLabel' for='habilidades_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoHabilidade.length; i++) {
		opts += "<option value='" + i + "' data-id='habilidadesLabel' for='habilidades_id'";
		opts += ((edit == true && INFOBASICAS.trabalhoEducacaoCidadao.habilidades_id == INFOBASICAS.tipoHabilidade[i].id) ? " selected>" : ">") + INFOBASICAS.tipoHabilidade[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaHabilidades").empty();
	$("#listaHabilidades").append(opts);
		
	var opts = "<select id='fonteRendaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='fonteRendaLabel' for='fonte_renda_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoFonteRenda.length; i++) {
		opts += "<option value='" + i + "' data-id='fonteRendaLabel' for='fonte_renda_id'";
		opts += ((edit == true && INFOBASICAS.trabalhoEducacaoCidadao.fonte_renda_id == INFOBASICAS.tipoFonteRenda[i].id) ? " selected>" : ">") + INFOBASICAS.tipoFonteRenda[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaFonteRenda").empty();
	$("#listaFonteRenda").append(opts);
		
	var opts = "<select id='escolaridadeLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='escolaridadeLabel' for='tipo_escolaridade_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoEscolaridade.length; i++) {
		opts += "<option value='" + i + "' data-id='escolaridadeLabel' for='tipo_escolaridade_id'";
		opts += ((edit == true && INFOBASICAS.trabalhoEducacaoCidadao.tipo_escolaridade_id == INFOBASICAS.tipoEscolaridade[i].id) ? " selected>" : ">") + INFOBASICAS.tipoEscolaridade[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaEscolaridade").empty();
	$("#listaEscolaridade").append(opts);
		
	var opts = "<select id='situacaoProfissionalLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='Selecione' data-id='situacaoProfissionalLabel' for='situacao_profissional_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoSituacaoProfissional.length; i++) {
		opts += "<option value='" + i + "' data-id='situacaoProfissionalLabel' for='situacao_profissional_id'";
		opts += ((edit == true && INFOBASICAS.trabalhoEducacaoCidadao.situacao_profissional_id == INFOBASICAS.tipoSituacaoProfissional[i].id) ? " selected>" : ">") + INFOBASICAS.tipoSituacaoProfissional[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaSituacaoProfissional").empty();
	$("#listaSituacaoProfissional").append(opts);
		
	// SAÚDE
	opts = "";
	for (var i = 0; i < INFOBASICAS.tipoCondicaoSaude.length; i++) {
		var encontrou = false;
		for (var j = 0; j < INFOBASICAS.saudeCidadao.condicoes_saude.length; j++) {
			if (INFOBASICAS.saudeCidadao.condicoes_saude[j] == INFOBASICAS.tipoCondicaoSaude[i].id) {
				encontrou = true;
				break;
			}
		}
		opts += "<div class='checkbox'><input type='checkbox' name='tipoCondicaoSaude" + i + "' value='" + i + "' class='checkbox check radio active'" + (encontrou == true ? "checked" : "") + ">";
		opts += "<p>" + INFOBASICAS.tipoCondicaoSaude[i].nome + "</p></div>";
	}
	opts += "<input type='text' class='inputMed' value='' name='condicao_saude_outros' id='condicao_saude_outros' placeholder='Outros'>";
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#container_cond_saude").empty();
	$("#container_cond_saude").append(opts);
	
	if (edit == true) {
		carregaDadosInfoBasicas();
	}	
};

/******************************************************************
********** VALIDAÇÃO DE CAMPOS PARA SALVAMENTO
/******************************************************************/
function infoBasicasSalva() {
	console.log("infoBasicasSalva");
	
	var erro = false;
	
	// GÊNERO
	
	// INFORMAÇÕES ADICIONAIS
		
	// SITUAÇÃO DE RUA
	// Quantidade de filhos
	if ($("input:radio[name=temFilho]:checked").val() == "Sim") {
		// Avalia quantos filhos
		if ($('#qtd_filhos').val() == '' || isNaN($('#qtd_filhos').val()))
		{
			$('#qtd_filhos').addClass('inputFocus');	
			erro = true;
		}
		else $('#qtd_filhos').removeClass('inputFocus');
	}
	
	// todo: idade dos filhos
	
	// TRABALHO E EDUCAÇÃO
	
	// SAÚDE
	// Quais deficiências
	if ($("input:radio[name=possui_deficiencia]:checked").val() == "Sim") {
		if ($('#quais_deficiencias').val() == '')
		{
			$('#quais_deficiencias').addClass('inputFocus');	
			erro = true;
		}
		else $('#quais_deficiencias').removeClass('inputFocus');
	}
	
	// Quais drogas e qual frequência
	if ($("input:radio[name=alcool_droga]:checked").val() == "Sim") {
		if ($('#nome_drogas').val() == '')
		{
			$('#nome_drogas').addClass('inputFocus');	
			erro = true;
		}
		else $('#nome_drogas').removeClass('inputFocus');
		if ($('#frequencia_drogas').val() == '')
		{
			$('#frequencia_drogas').addClass('inputFocus');	
			erro = true;
		}
		else $('#frequencia_drogas').removeClass('inputFocus');
	}	
	// INFORMAÇÕES COMPLEMENTARES
	
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

		// Salva
		// Lista de acompanhante_rua
		var ar = [];
		for (var i = 0; i < INFOBASICAS.tipoAcompanhanteRua.length; i++) {
			if ($("input:checkbox[name=tipoAcompanhanteRua" + i + "]:checked").val()) {
				// Está marcado
				ar.push(INFOBASICAS.tipoAcompanhanteRua[i].id);
			}
		}
		// Lista de familiares
		var qf = [];
		for (var i = 0; i < INFOBASICAS.tipoParentesco.length; i++) {
			if ($("input:checkbox[name=tipoParentesco" + i + "]:checked").val()) {
				// Está marcado
				qf.push(INFOBASICAS.tipoParentesco[i].id);
			}
		}
		// Lista de condições de saúde
		var cs = [];
		for (var i = 0; i < INFOBASICAS.tipoCondicaoSaude.length; i++) {
			if ($("input:checkbox[name=tipoCondicaoSaude" + i + "]:checked").val()) {
				// Está marcado
				cs.push(INFOBASICAS.tipoCondicaoSaude[i].id);
			}
		}
		
		var infoOrientacaoSexual = null;
		if ($("input:radio[name=infoOrientacaoSexual]:checked").val() == "Sim") {
			infoOrientacaoSexual = 1;
		}
		else if ($("input:radio[name=infoOrientacaoSexual]:checked").val() == "Não") {
			infoOrientacaoSexual = 0;
		}
		
		var temFilho = null;
		if ($("input:radio[name=temFilho]:checked").val() == "Sim") {
			temFilho = 1;
		}
		else if ($("input:radio[name=temFilho]:checked").val() == "Não") {
			temFilho = 0;
		}
		
		var infoTemContatoFamilia = null;
		if ($("input:radio[name=infoTemContatoFamilia]:checked").val() == "Sim") {
			infoTemContatoFamilia = 1;
		}
		else if ($("input:radio[name=infoTemContatoFamilia]:checked").val() == "Não") {
			infoTemContatoFamilia = 0;
		}
		
		var infoContatoFamilia = null;
		if ($("input:radio[name=infoContatoFamilia]:checked").val() == "Sim") {
			infoContatoFamilia = 1;
		}
		else if ($("input:radio[name=infoContatoFamilia]:checked").val() == "Não") {
			infoContatoFamilia = 0;
		}
		
		var infoTrabalhando = null;
		if ($("input:radio[name=infoTrabalhando]:checked").val() == "Sim") {
			infoTrabalhando = 1;
		}
		else if ($("input:radio[name=infoTrabalhando]:checked").val() == "Não") {
			infoTrabalhando = 0;
		}
		
		var infoGestante = null;
		if ($("input:radio[name=infoGestante]:checked").val() == "Sim") {
			infoGestante = 1;
		}
		else if ($("input:radio[name=infoGestante]:checked").val() == "Não") {
			infoGestante = 0;
		}
		
		var possui_deficiencia = null;
		if ($("input:radio[name=possui_deficiencia]:checked").val() == "Sim") {
			possui_deficiencia = 1;
		}
		else if ($("input:radio[name=possui_deficiencia]:checked").val() == "Não") {
			possui_deficiencia = 0;
		}
		
		var alcool_droga = null;
		if ($("input:radio[name=alcool_droga]:checked").val() == "Sim") {
			alcool_droga = 1;
		}
		else if ($("input:radio[name=alcool_droga]:checked").val() == "Não") {
			alcool_droga = 0;
		}
		
		INFOBASICAS.salvaCidadao(// info_orientacao_sexual_genero
								 infoOrientacaoSexual,
								 // sexo_id
								 $("#sexoLabel").val() == "Selecione" ? null : INFOBASICAS.tipoSexo[$("#sexoLabel").val()].id,
								 // orientacao_sexual_id
								 $("#orientacaoSexualLabel").val() == "Selecione" ? null : INFOBASICAS.tipoOrientacaoSexual[$("#orientacaoSexualLabel").val()].id,
								 
								 // tipo_cutis_id
								 // todo: tipo_cutis_id
								 /*
								 $("#sexoLabel").val() == "Selecione" ? null : INFOBASICAS.tipoSexo[$("#sexoLabel").val()].id,
								 */
								 // todo: tipo_cutis_id
								 // rg_rne
								 $("#rg_rne").val(),
								 // cpf
								 $("#cpf").val(),
								 // estado_civil_id
								 $("#estadoCivilLabel").val() == "Selecione" ? null : INFOBASICAS.tipoEstadoCivil[$("#estadoCivilLabel").val()].id,
								 // nome_pai
								 $("#nome_pai").val(),
								 // cidade_nascimento
								 $("#cidade_nascimento").val(),
								 // nascimento_estado_id
								 $("#nascimentoEstadoLabel").val() == "Selecione" ? null : INFOBASICAS.tipoEstado[$("#nascimentoEstadoLabel").val()].id,
								 
								 // dias_situaca_rua
								 $("#diasLabel").val() == "Dias" ? "" : $("#diasLabel").val(),
								 // meses_situacao_rua
								 $("#mesesLabel").val() == "Meses" ? "" : $("#mesesLabel").val(),
								 // anos_situacao_rua
								 $("#anosLabel").val() == "Anos" ? "" : $("#anosLabel").val(),
								 // outros_situacao_rua
								 $("#outros_situacao_rua").val(),
								 // local_onde_encontra
								 $("#local_onde_encontra").val(),
								 // onde_morava_antes_rua
								 $("#onde_morava_antes_rua").val(),
								 // bairro
								 $("#bairro").val(),
								 // municipio_procendencia
								 $("#municipio_procendencia").val(),
								 // procedencia_estado_id
								 $("#estadoProcedenciaLabel").val() == "Selecione" ? null : INFOBASICAS.tipoEstado[$("#estadoProcedenciaLabel").val()].id,
								 // procedencia_pais_id
								 $("#paisProcedenciaLabel").val() == "Selecione" ? null : INFOBASICAS.tipoPais[$("#paisProcedenciaLabel").val()].id,
								 // acompanhante_rua_outros
								 $("#acompanhante_rua_outros").val(),
								 // acompanhante_rua []
								 ar,
								 // tem_filhos
 								 temFilho,
								 // qtd_filhos
								 $("#qtd_filhos").val(),
								 // todo: idade dos filhos
								 // contato_familia
 								 infoTemContatoFamilia,
								 // contato_parente
 								 infoContatoFamilia,
								 // quais_familiares []
								 qf,
								 // contato_familia_outros
								 $("#contato_familia_outros").val(),
								 // referencia_familiar
								 $("#referencia_familiar").val(),
								 // telefone
								 $("#telefone").val(),
								 
								 // trabalhando
 								 infoTrabalhando,
								 // profissao_atividade
								 $("#profissao_atividade").val(),
								 // habilidades_id
								 $("#habilidadesLabel").val() == "Selecione" ? null : INFOBASICAS.tipoHabilidade[$("#habilidadesLabel").val()].id,
								 // fonte_renda_id
								 $("#fonteRendaLabel").val() == "Selecione" ? null : INFOBASICAS.tipoFonteRenda[$("#fonteRendaLabel").val()].id,
								 // tipo_escolaridade_id
								 $("#escolaridadeLabel").val() == "Selecione" ? null : INFOBASICAS.tipoEscolaridade[$("#escolaridadeLabel").val()].id,
								 // escolaridades_outros
								 $("#escolaridades_outros").val(),
								 // situacao_profissional_id
								 $("#situacaoProfissionalLabel").val() == "Selecione" ? null : INFOBASICAS.tipoSituacaoProfissional[$("#situacaoProfissionalLabel").val()].id,
								 
								 // condicoes_saude []
								 cs,
								 // condicoes_saude_outros
								 $("#condicao_saude_outros").val(),
								 // gestante
 								 infoGestante,
								 // possui_deficiencia
 								 possui_deficiencia,
								 // quais_deficiencias
								 $("#quais_deficiencias").val(),
								 // alcool_droga
 								 alcool_droga,
								 // nome_drogas
								 $("#nome_drogas").val(),
								 // frequencia_drogas
								 $("#frequencia_drogas").val(),
								 
								 // informacoes_complementares
								 $("#informacoes_complementares").val(),
								 
								 this.salvaDadosBasicosSuccess,
								 this.salvaDadosBasicosFail
								 );
	}
};
	
function salvaDadosBasicosSuccess () {
	console.log("salvaDadosBasicosSuccess");
	// todo: revisar
};

function salvaDadosBasicosFail (err) {
	console.log("salvaDadosBasicosFail: " + err);
	// todo: revisar
};
