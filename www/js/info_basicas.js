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
********** CONTROLE DE LISTAS DE OPÇÕES
/******************************************************************/
function infoBasicasOpcoes() {
	console.log("infoBasicasOpcoes");
	
	var edit = false;		// todo: implementar edição
	
	// GÊNERO
	var opts = "<select id='listaSexo' class='selectPersonalizado'><option value='selecione' data-id='sexoLabel' for='sexo_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoSexo.length; i++) {
		opts += "<option value='" + INFOBASICAS.tipoSexo[i].id + "' data-id='sexoLabel' for='sexo_id'";
		opts += ((edit == true /*&& ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].ponto_servico_nome == ATIVIDADE.listaPontosServico[i].nome*/) ? " selected>" : ">") + INFOBASICAS.tipoSexo[i].nome + "</option>";
	}
	opts += "</select>";
	console.log(opts + "\r\n");
	
	$("#listaSexos").empty();
	$("#listaSexos").append(opts);

	var opts = "<select id='orientacaoSexualLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='orientacaoSexualLabel' for='orientacao_sexual_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoOrientacaoSexual.length; i++) {
		opts += "<option value='" + INFOBASICAS.tipoOrientacaoSexual[i].id + "' data-id='orientacaoSexualLabel' for='orientacao_sexual_id'";
		opts += ((edit == true /*&& ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].ponto_servico_nome == ATIVIDADE.listaPontosServico[i].nome*/) ? " selected>" : ">") + INFOBASICAS.tipoOrientacaoSexual[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaOrientacaoSexual").empty();
	$("#listaOrientacaoSexual").append(opts);
	
	// INFORMAÇÕES ADICIONAIS
	var opts = "<select id='estadoCivilLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='estadoCivilLabel' for='estado_civil_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoEstadoCivil.length; i++) {
		opts += "<option value='" + INFOBASICAS.tipoEstadoCivil[i].id + "' data-id='estadoCivilLabel' for='estado_civil_id'";
		opts += ((edit == true /*&& ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].ponto_servico_nome == ATIVIDADE.listaPontosServico[i].nome*/) ? " selected>" : ">") + INFOBASICAS.tipoEstadoCivil[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaEstadoCivil").empty();
	$("#listaEstadoCivil").append(opts);
	
	var opts = "<select id='nascimentoEstadoLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='nascimentoEstadoLabel' for='nascimento_estado_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoEstado.length; i++) {
		opts += "<option value='" + INFOBASICAS.tipoEstado[i].id + "' data-id='nascimentoEstadoLabel' for='nascimento_estado_id'";
		opts += ((edit == true /*&& ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].ponto_servico_nome == ATIVIDADE.listaPontosServico[i].nome*/) ? " selected>" : ">") + INFOBASICAS.tipoEstado[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaEstado").empty();
	$("#listaEstado").append(opts);

	// SITUAÇÃO DE RUA
	var opts = "<select id='estadoProcedenciaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='estadoProcedenciaLabel' for='nascimento_estado_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoEstado.length; i++) {
		opts += "<option value='" + INFOBASICAS.tipoEstado[i].id + "' data-id='estadoProcedenciaLabel' for='nascimento_estado_id'";
		opts += ((edit == true /*&& ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].ponto_servico_nome == ATIVIDADE.listaPontosServico[i].nome*/) ? " selected>" : ">") + INFOBASICAS.tipoEstado[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaEstadoProcedencia").empty();
	$("#listaEstadoProcedencia").append(opts);

	var opts = "<select id='paisProcedenciaLabel' class='selectPersonalizado'><div class='lista-box-scroll'><option value='selecione' data-id='paisProcedenciaLabel' for='procendencia_pais_id'>Selecione</option>";
	for (var i = 0; i < INFOBASICAS.tipoPais.length; i++) {
		opts += "<option value='" + INFOBASICAS.tipoPais[i].id + "' data-id='paisProcedenciaLabel' for='procendencia_pais_id'";
		opts += ((edit == true /*&& ATIVIDADE.listaAtividades[ATIVIDADE.editIndexAtividade].ponto_servico_nome == ATIVIDADE.listaPontosServico[i].nome*/) ? " selected>" : ">") + INFOBASICAS.tipoPais[i].nome + "</option>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#listaPaisProcedencia").empty();
	$("#listaPaisProcedencia").append(opts);
	
	opts = "";
	for (var i = 0; i < INFOBASICAS.tipoAcompanhanteRua.length; i++) {
		opts += "<div class='checkbox'><input type='checkbox' value='" + INFOBASICAS.tipoAcompanhanteRua[i].id + "' class='checkbox check'>";
		opts += "<p>" + INFOBASICAS.tipoAcompanhanteRua[i].nome + "</p></div>";
	}
	opts += "</div></select>";
	console.log(opts + "\r\n");
	
	$("#container_comquem").empty();
	$("#container_comquem").append(opts);
	
	// TRABALHO E EDUCAÇÃO
	
	// SAÚDE
};