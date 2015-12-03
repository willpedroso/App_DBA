//abre input orientação sexual
function abreOrientSexual(){
		if ($( "input:radio[name=infoOrientacaoSexual]:checked" ).val() == "Sim")
		{
		jQuery('#orientacaoSexual').show();

		}
		else{
		jQuery('#orientacaoSexual').hide();

		}

};

	//abre input quantos filhos
function abreQtdFilhos(){
		if ($( "input:radio[name=temFilho]:checked" ).val() == "Sim")
		{
		
		jQuery('#qtdFilho').show();

		}
		else{
		
		jQuery('#qtdFilho').hide();

		}

};

	//abre input qual familiar
function abreQualFamiliar(){
		if ($( "input:radio[name=infoTemContatoFamilia]:checked" ).val() == "Sim")
		{
		jQuery('#contatoFamilia').show();	
		jQuery('#qualFamiliar').show();

		}
		else{
		jQuery('#contatoFamilia').hide();
		jQuery('#qualFamiliar').hide();

		}

};

	//abre input qual deficiencia
function abreQualDeficiencia(){
		if ($( "input:radio[name=possui_deficiencia]:checked" ).val() == "Sim")
		{
		jQuery('#quaisDeficiencias').show();	

		}
		else{
		jQuery('#quaisDeficiencias').hide();

		}

};

function btLimpar(){

document.getElementById('informacoes_complementares').value = "";

};