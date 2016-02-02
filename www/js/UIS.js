 
console.log("iniciou")


  jQuery(document).ready(function(){
  jQuery('#user').focus();
  jQuery('#user').mask('000.000.000-00');
});

function salvarFormLogin()
{
  var flag = true;
  
  if ( jQuery('#user').val() == '' )
  {
    jQuery('#user').addClass('inputFocus');
    flag = false;
  }
    
  if ( jQuery('#pass').val() == '' )
  {
    jQuery('#pass').addClass('inputFocus'); 
    flag = false;
  }
  
  
  if ( flag )
  {
    jQuery('#formLogin').submit();
    return true;
  }
  else
  {
    jQuery('.msgAtencao').removeAttr('style');
    jQuery('.msgParabens').attr('style', 'display:none');
    jQuery('.msgErro').attr('style', 'display:none');
    return false;
  }
}
  $(document).ready(function(){

                   jQuery('#numeroContatoFamiliarLabel').mask('00000000000000000000000');

                   /* INICIO - infoCadastroAcompanhamentoUbs */
                   var valRadio = '';
                   jQuery("#infoCadastroAcompanhamentoUbs .radio").click(function(){
                       jQuery(this).addClass('active');
                       if(jQuery('#infoCadastroAcompanhamentoUbs .radio').hasClass('active')){
                           jQuery('#infoCadastroAcompanhamentoUbs .radio').removeClass('active');
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#cadastro_acompanhamento_ubs').val(valRadio);

                           if ( valRadio == '1' )
                           {
                               jQuery('#ubsAcompanhamentoCadasdtro').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#ubsAcompanhamentoCadasdtro').attr('style','display:none');
                               jQuery('.adicionaInputUbsSaude').html('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#cadastro_acompanhamento_ubs').val('');
                       }
                   });
                   /* FIM - infoCadastroAcompanhamentoUbs */












                   /* INICIO - infoAcompanhamentoCaps */
                   var valRadio = '';
                   jQuery("#infoAcompanhamentoCaps .radio").click(function(){
                       jQuery(this).addClass('active');
                       if(jQuery('#infoAcompanhamentoCaps .radio').hasClass('active')){
                           jQuery('#infoAcompanhamentoCaps .radio').removeClass('active');
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#acompanhamento_caps').val(valRadio);

                           if ( valRadio == '1' )
                           {
                               jQuery('#qualAcompanhamentoCaps').attr('style','display:block');
                               jQuery('#tipoFrequenciaCaps').attr('style','display:block');
                               jQuery('#nomeTecnicoReferenciaCaps').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#qualAcompanhamentoCaps').attr('style','display:none');
                               jQuery('#tipoFrequenciaCaps').attr('style','display:none');
                               jQuery('#nomeTecnicoReferenciaCaps').attr('style','display:none');
                               jQuery('#qual_acompanhamento_caps').val('');
                               jQuery('#tipo_frequencia_caps_id').val('');
                               jQuery('#nome_tecnico_referencia_caps').val('');
                               jQuery('#tipoFrequenciaCapsLabel').html('Selecione');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#acompanhamento_caps').val('');
                       }
                   });
                   /* FIM - infoAcompanhamentoCaps */

                   /* INICIO - infoEsteveInternado */
                   var valRadio = '';
                   jQuery("#infoEsteveInternado .radio").click(function(){
                       jQuery(this).addClass('active');
                       if(jQuery('#infoEsteveInternado .radio').hasClass('active')){
                           jQuery('#infoEsteveInternado .radio').removeClass('active');
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#esteve_internado').val(valRadio);

                           if ( valRadio == '1' )
                           {
                               jQuery('#internacao').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#internacao').attr('style','display:none');
                               jQuery('.adicionaInputInternacao').html('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#esteve_internado').val('');
                       }
                   });
                   /* FIM - infoEsteveInternado */

                   /* INICIO - infoDrogasAntesDepoisSituacaoRua */
                   var valRadio = '';
                   jQuery("#infoDrogasAntesDepoisSituacaoRua .radio").click(function(){
                       jQuery(this).addClass('active');
                       if(jQuery('#infoDrogasAntesDepoisSituacaoRua .radio').hasClass('active')){
                           jQuery('#infoDrogasAntesDepoisSituacaoRua .radio').removeClass('active');
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#drogas_antes_depois_situacao_rua').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#drogas_antes_depois_situacao_rua').val('');
                       }
                   });
                   /* FIM - infoDrogasAntesDepoisSituacaoRua */

                   /* INICIO - infoTemAmigos */
                   var valRadio = '';
                   jQuery("#infoTemAmigos .radio").click(function(){
                       jQuery(this).addClass('active');
                       if(jQuery('#infoTemAmigos .radio').hasClass('active')){
                           jQuery('#infoTemAmigos .radio').removeClass('active');
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#tem_amigos').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#tem_amigos').val('');
                       }
                   });
                   /* FIM - infoTemAmigos */

                   /* INICIO - infoTemCompanheiro */
                   var valRadio = '';
                   jQuery("#infoTemCompanheiro .radio").click(function(){
                       jQuery(this).addClass('active');
                       if(jQuery('#infoTemCompanheiro .radio').hasClass('active')){
                           jQuery('#infoTemCompanheiro .radio').removeClass('active');
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#tem_companheiro').val(valRadio);

                           if ( valRadio == '1' )
                           {
                               jQuery('#companheiroInseridoPrograma').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#companheiroInseridoPrograma').attr('style','display:none');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#tem_companheiro').val('');
                       }
                   });
                   /* FIM - infoTemCompanheiro */

                   /* INICIO - infoTemCompanheiroPrograma */
                   var valRadio = '';
                   jQuery("#infoTemCompanheiroPrograma .radio").click(function(){
                       jQuery(this).addClass('active');
                       if(jQuery('#infoTemCompanheiroPrograma .radio').hasClass('active')){
                           jQuery('#infoTemCompanheiroPrograma .radio').removeClass('active');
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#companheiro_programa').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#companheiro_programa').val('');
                       }
                   });
                   /* FIM - infoTemCompanheiroPrograma */

                   /* INICIO - infoTemFamilia */
                   var valRadio = '';
                   jQuery("#infoTemFamilia .radio").click(function(){
                       jQuery(this).addClass('active');
                       if(jQuery('#infoTemFamilia .radio').hasClass('active')){
                           jQuery('#infoTemFamilia .radio').removeClass('active');
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#tem_familia').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#tem_familia').val('');
                       }
                   });
                   /* FIM - infoTemFamilia */

                   /* INICIO - infoTemContatoFamilia */
                   var valRadio = '';
                   jQuery("#infoTemContatoFamilia .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoTemContatoFamilia .radio').hasClass('active')){
                           jQuery('#infoTemContatoFamilia .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#tem_contato_familia').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#tem_contato_familia').val('');
                       }
                   });
                   /* FIM - infoTemContatoFamilia */
                   
                   /* INICIO - infoDrogasAlemCrack */
                   var valRadio = '';
                   jQuery("#infoDrogasAlemCrack .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoDrogasAlemCrack .radio').hasClass('active')){
                           jQuery('#infoDrogasAlemCrack .radio').removeClass('active');    
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#drogas_alem_crack').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#drogasAlemCrack').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#drogasAlemCrack').attr('style','display:none');
                               jQuery('.adicionaInputQuaisDrogasAlem').html('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#drogas_alem_crack').val('');
                       }
                   });
                   /* FIM - infoDrogasAlemCrack */
                   
                   /* INICIO - infoUsoDrogasInjetaveis */
                   var valRadio = '';
                   jQuery("#infoUsoDrogasInjetaveis .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoUsoDrogasInjetaveis .radio').hasClass('active')){
                           jQuery('#infoUsoDrogasInjetaveis .radio').removeClass('active');    
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#uso_drogas_injetaveis').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#usoDrogasInjetaveis').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#usoDrogasInjetaveis').attr('style','display:none');
                               jQuery('#dias_uso_drogas_injetaveis').val('');
                               jQuery('#meses_uso_drogas_injetaveis').val('');
                               jQuery('#anos_uso_drogas_injetaveis').val('');
                               jQuery('#diasUsoDrogasInjetaveisLabel').html('Dias');
                               jQuery('#mesesUsoDrogasInjetaveisLabel').html('Meses');
                               jQuery('#anosUsoDrogasInjetaveisLabel').html('Anos');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#uso_drogas_injetaveis').val('');
                       }
                   });
                   /* FIM - infoUsoDrogasInjetaveis */
                   
                   /* INICIO - infoAbstinenciaAposPrograma */
                   var valRadio = '';
                   jQuery("#infoAbstinenciaAposPrograma .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoAbstinenciaAposPrograma .radio').hasClass('active')){
                           jQuery('#infoAbstinenciaAposPrograma .radio').removeClass('active');    
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#abstinencia_apos_programa').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#abstinenciaAposPrograma').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#abstinenciaAposPrograma').attr('style','display:none');
                               jQuery('#dias_abstinencia_apos_programa').val('');
                               jQuery('#meses_abstinencia_apos_programa').val('');
                               jQuery('#anos_abstinencia_apos_programa').val('');
                               jQuery('#diasAbstinenciaAposProgramaLabel').html('Dias');
                               jQuery('#mesesAbstinenciaAposProgramaLabel').html('Meses');
                               jQuery('#anosAbstinenciaAposProgramaLabel').html('Anos');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#abstinencia_apos_programa').val('');
                       }
                   });
                   /* FIM - infoAbstinenciaAposPrograma */
                   
                   /* INICIO - infoTesteRapidoDstAids */
                   var valRadio = '';
                   jQuery("#infoTesteRapidoDstAids .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoTesteRapidoDstAids .radio').hasClass('active')){
                           jQuery('#infoTesteRapidoDstAids .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#teste_rapido_dst_aids').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#testeRapidoDstAids').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#testeRapidoDstAids').attr('style','display:none');
                               jQuery('#local_teste_rapido_dst_aids').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#teste_rapido_dst_aids').val('');
                       }
                   });
                   /* FIM - infoTesteRapidoDstAids */
                   
                   /* INICIO - infoAcompanhamentoDst */
                   var valRadio = '';
                   jQuery("#infoAcompanhamentoDst .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoAcompanhamentoDst .radio').hasClass('active')){
                           jQuery('#infoAcompanhamentoDst .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#acompanhamento_dst').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#acompanhamentoDst').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#acompanhamentoDst').attr('style','display:none');
                               jQuery('#local_acompanhamento_dst').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#acompanhamento_dst').val('');
                       }
                   });
                   /* FIM - infoTesteRapidoDstAids */
                   
                   /* INICIO - infoDiagnosticoHivAids */
                   var valRadio = '';
                   jQuery("#infoDiagnosticoHivAids .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoDiagnosticoHivAids .radio').hasClass('active')){
                           jQuery('#infoDiagnosticoHivAids .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#diagnostico_hiv_aids').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#diagnosticoHivAids').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#diagnosticoHivAids').attr('style','display:none');
                               jQuery('#local_tratamento_hiv_aids').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#diagnostico_hiv_aids').val('');
                       }
                   });
                   /* FIM - infoDiagnosticoHivAids */
                   
                   /* INICIO - infoTratamentoHivAids */
                   var valRadio = '';
                   jQuery("#infoTratamentoHivAids .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoTratamentoHivAids .radio').hasClass('active')){
                           jQuery('#infoTratamentoHivAids .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#tratamento_hiv_aids').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#tratamentoHivAids').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#tratamentoHivAids').attr('style','display:none');
                               jQuery('#local_tratamento_hiv_aids').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#tratamento_hiv_aids').val('');
                       }
                   });
                   /* FIM - infoTratamentoHivAids */
                   
                   /* INICIO - infoDiagnosticoSifilis */
                   var valRadio = '';
                   jQuery("#infoDiagnosticoSifilis .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoDiagnosticoSifilis .radio').hasClass('active')){
                           jQuery('#infoDiagnosticoSifilis .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#diagnostico_sifilis').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#diagnosticoSifilis').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#diagnosticoSifilis').attr('style','display:none');
                               jQuery('#tratamentoSifilis').attr('style','display:none');
                               jQuery('#local_tratamento_sifilis').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#diagnostico_sifilis').val('');
                       }
                   });
                   /* FIM - infoDiagnosticoSifilis */
                   
                   /* INICIO - infoTratamentoSifilis */
                   var valRadio = '';
                   jQuery("#infoTratamentoSifilis .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoTratamentoSifilis .radio').hasClass('active')){
                           jQuery('#infoTratamentoSifilis .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#tratamento_sifilis').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#tratamentoSifilis').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#tratamentoSifilis').attr('style','display:none');
                               jQuery('#local_tratamento_sifilis').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#tratamento_sifilis').val('');
                       }
                   });
                   /* FIM - infoTratamentoSifilis */
                   
                   /* INICIO - infoAltaTratamentoSifilis */
                   var valRadio = '';
                   jQuery("#infoAltaTratamentoSifilis .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoAltaTratamentoSifilis .radio').hasClass('active')){
                           jQuery('#infoAltaTratamentoSifilis .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#alta_tratamento_sifilis').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#alta_tratamento_sifilis').val('');
                       }
                   });
                   /* FIM - infoAltaTratamentoSifilis */
                   
                   /* INICIO - infoPassouAvaliacaoOdontologica */
                   var valRadio = '';
                   jQuery("#infoPassouAvaliacaoOdontologica .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoPassouAvaliacaoOdontologica .radio').hasClass('active')){
                           jQuery('#infoPassouAvaliacaoOdontologica .radio').removeClass('active');    
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#passou_avaliacao_odontologica').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#passouAvaliacaoOdontologica').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#passouAvaliacaoOdontologica').attr('style','display:none');
                               jQuery('#local_passou_avaliacao_odontologica').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#passou_avaliacao_odontologica').val('');
                       }
                   });
                   /* FIM - infoPassouAvaliacaoOdontologica */
                   
                   /* INICIO - infoAltaTratamentoOdontologico */
                   var valRadio = '';
                   jQuery("#infoAltaTratamentoOdontologico .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoAltaTratamentoOdontologico .radio').hasClass('active')){
                           jQuery('#infoAltaTratamentoOdontologico .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#tratamento_odontologico').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#tratamento_odontologico').val('');
                       }
                   });
                   /* FIM - infoAltaTratamentoOdontologico */
                   
                   /* INICIO - infoSintomasRespiratorios */
                   var valRadio = '';
                   jQuery("#infoSintomasRespiratorios .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoSintomasRespiratorios .radio').hasClass('active')){
                           jQuery('#infoSintomasRespiratorios .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#sintomas_respiratorios').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#sintomasRespiratorios').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#sintomasRespiratorios').attr('style','display:none');
                               jQuery('#tratamentoSintomasRespiratorios').attr('style','display:none');
                               jQuery('#local_tratamento_sintomas_respiratorios').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#sintomas_respiratorios').val('');
                       }
                   });
                   /* FIM - infoSintomasRespiratorios */
                   
                   /* INICIO - infoTratamentoSintomasRespiratorios */
                   var valRadio = '';
                   jQuery("#infoTratamentoSintomasRespiratorios .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoTratamentoSintomasRespiratorios .radio').hasClass('active')){
                           jQuery('#infoTratamentoSintomasRespiratorios .radio').removeClass('active');    
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#tratamento_sintomas_respiratorios').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#tratamentoSintomasRespiratorios').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#tratamentoSintomasRespiratorios').attr('style','display:none');
                               jQuery('#local_tratamento_sintomas_respiratorios').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#tratamento_sintomas_respiratorios').val('');
                       }
                   });
                   /* FIM - infoTratamentoSintomasRespiratorios */
                   
                   /* INICIO - infoRealizouTesteTuberculose */
                   var valRadio = '';
                   jQuery("#infoRealizouTesteTuberculose .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoRealizouTesteTuberculose .radio').hasClass('active')){
                           jQuery('#infoRealizouTesteTuberculose .radio').removeClass('active');   
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#realizou_teste_tuberculose').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#realizouTesteTuberculose').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#realizouTesteTuberculose').attr('style','display:none');
                               jQuery('#diagnosticoTuberculose').attr('style','display:none');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#realizou_teste_tuberculose').val('');
                       }
                   });
                   /* FIM - infoRealizouTesteTuberculose */
                   
                   /* INICIO - infoDiagnosticoTuberculose */
                   var valRadio = '';
                   jQuery("#infoDiagnosticoTuberculose .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoDiagnosticoTuberculose .radio').hasClass('active')){
                           jQuery('#infoDiagnosticoTuberculose .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#diagnostico_tuberculose').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#diagnosticoTuberculose').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#diagnosticoTuberculose').attr('style','display:none');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#diagnostico_tuberculose').val('');
                       }
                   });
                   /* FIM - infoDiagnosticoTuberculose */
                   
                   /* INICIO - infoEmTratamentoTuberculose */
                   var valRadio = '';
                   jQuery("#infoEmTratamentoTuberculose .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoEmTratamentoTuberculose .radio').hasClass('active')){
                           jQuery('#infoEmTratamentoTuberculose .radio').removeClass('active');    
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#em_tratamento_tuberculose').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#em_tratamento_tuberculose').val('');
                       }
                   });
                   /* FIM - infoEmTratamentoTuberculose */
                   
                   /* INICIO - infoTeveTuberculose */
                   var valRadio = '';
                   jQuery("#infoTeveTuberculose .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoTeveTuberculose .radio').hasClass('active')){
                           jQuery('#infoTeveTuberculose .radio').removeClass('active');    
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#teve_tuberculose').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#teveTuberculose').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#teveTuberculose').attr('style','display:none');
                               jQuery('#fezTratamentoTuberculose').attr('style','display:none');
                               jQuery('#local_fez_tratamento_tuberculose').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#teve_tuberculose').val('');
                       }
                   });
                   /* FIM - infoTeveTuberculose */
                   
                   /* INICIO - infoFezTratamentoTuberculose */
                   var valRadio = '';
                   jQuery("#infoFezTratamentoTuberculose .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoFezTratamentoTuberculose .radio').hasClass('active')){
                           jQuery('#infoFezTratamentoTuberculose .radio').removeClass('active');   
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#fez_tratamento_tuberculose').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#fezTratamentoTuberculose').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#fezTratamentoTuberculose').attr('style','display:none');
                               jQuery('#local_fez_tratamento_tuberculose').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#fez_tratamento_tuberculose').val('');
                       }
                   });
                   /* FIM - infoFezTratamentoTuberculose */
                   
                   /* INICIO - infoTeveAltaTratamentoTuberculose */
                   var valRadio = '';
                   jQuery("#infoTeveAltaTratamentoTuberculose .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoTeveAltaTratamentoTuberculose .radio').hasClass('active')){
                           jQuery('#infoTeveAltaTratamentoTuberculose .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#teve_alta_tratamento_tuberculose').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#teve_alta_tratamento_tuberculose').val('');
                       }
                   });
                   /* FIM - infoTeveAltaTratamentoTuberculose */
                   
                   /* INICIO - infoLesoesPele */
                   var valRadio = '';
                   jQuery("#infoLesoesPele .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoLesoesPele .radio').hasClass('active')){
                           jQuery('#infoLesoesPele .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#lesoes_pele').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#lesoes_pele').val('');
                       }
                   });
                   /* FIM - infoLesoesPele */
                   
                   /* INICIO - infoVacinacaoEmDia */
                   var valRadio = '';
                   jQuery("#infoVacinacaoEmDia .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoVacinacaoEmDia .radio').hasClass('active')){
                           jQuery('#infoVacinacaoEmDia .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#vacinacao_em_dia').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#vacinacao_em_dia').val('');
                       }
                   });
                   /* FIM - infoVacinacaoEmDia */
                   
                   /* INICIO - infoAvaliacaoGinecologica */
                   var valRadio = '';
                   jQuery("#infoAvaliacaoGinecologica .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoAvaliacaoGinecologica .radio').hasClass('active')){
                           jQuery('#infoAvaliacaoGinecologica .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#avaliacao_ginecologica').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#avaliacaoGinecologica').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#avaliacaoGinecologica').attr('style','display:none');
                               jQuery('#local_avaliacao_ginecologica').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#avaliacao_ginecologica').val('');
                       }
                   });
                   /* FIM - infoAvaliacaoGinecologica */
                   
                   /* INICIO - infoMetodoAnticoncepcional */
                   var valRadio = '';
                   jQuery("#infoMetodoAnticoncepcional .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoMetodoAnticoncepcional .radio').hasClass('active')){
                           jQuery('#infoMetodoAnticoncepcional .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#metodo_anticoncepcional').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#metodoAnticoncepcional').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#metodoAnticoncepcional').attr('style','display:none');
                               jQuery('#qual_metodo_anticoncepcional').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#metodo_anticoncepcional').val('');
                       }
                   });
                   /* FIM - infoMetodoAnticoncepcional */
                   
                   /* INICIO - infoTeveAborto */
                   var valRadio = '';
                   jQuery("#infoTeveAborto .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoTeveAborto .radio').hasClass('active')){
                           jQuery('#infoTeveAborto .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#teve_aborto').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#teve_aborto').val('');
                       }
                   });
                   /* FIM - infoTeveAborto */
                   
                   /* INICIO - infoPlanejamentoFamiliar */
                   var valRadio = '';
                   jQuery("#infoPlanejamentoFamiliar .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoPlanejamentoFamiliar .radio').hasClass('active')){
                           jQuery('#infoPlanejamentoFamiliar .radio').removeClass('active');   
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#planejamento_familiar').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#planejamentoFamiliar').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#planejamentoFamiliar').attr('style','display:none');
                               jQuery('#local_planejamento_familiar').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#planejamento_familiar').val('');
                       }
                   });
                   /* FIM - infoPlanejamentoFamiliar */
                   
                   /* INICIO - infoGestante */
                   var valRadio = '';
                   jQuery("#infoGestante .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoGestante .radio').hasClass('active')){
                           jQuery('#infoGestante .radio').removeClass('active');   
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#gestante').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#gestante').val('');
                       }
                   });
                   /* FIM - infoGestante */
                   
                   /* INICIO - infoPreNatal */
                   var valRadio = '';
                   jQuery("#infoPreNatal .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoPreNatal .radio').hasClass('active')){
                           jQuery('#infoPreNatal .radio').removeClass('active');   
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#pre_natal').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#preNatal').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#preNatal').attr('style','display:none');
                               jQuery('#local_pre_natal').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#pre_natal').val('');
                       }
                   });
                   /* FIM - infoPreNatal */
                   
                   /* INICIO - infoAmparoMaternal */
                   var valRadio = '';
                   jQuery("#infoAmparoMaternal .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoAmparoMaternal .radio').hasClass('active')){
                           jQuery('#infoAmparoMaternal .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#amparo_maternal').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#amparo_maternal').val('');
                       }
                   });
                   /* FIM - infoAmparoMaternal */
                   
                   /* INICIO - infoAmamentando */
                   var valRadio = '';
                   jQuery("#infoAmamentando .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoAmamentando .radio').hasClass('active')){
                           jQuery('#infoAmamentando .radio').removeClass('active');    
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#amamentando').val(valRadio);
                       }
                       else{
                           jQuery(this).parent().find('#amamentando').val('');
                       }
                   });
                   /* FIM - infoAmamentando */
                   
                   /* INICIO - infoConsultaSaudeHoje */
                   var valRadio = '';
                   jQuery("#infoConsultaSaudeHoje .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoConsultaSaudeHoje .radio').hasClass('active')){
                           jQuery('#infoConsultaSaudeHoje .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#consulta_saude_hoje').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#consultaSaudeHoje').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#consultaSaudeHoje').attr('style','display:none');
                               jQuery('#adicionaInputEspecialidadeConsulta').html('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#consulta_saude_hoje').val('');
                       }
                   });
                   /* FIM - infoConsultaSaudeHoje */
                   
                   /* INICIO - infoCompareceuTrabalhoHoje */
                   var valRadio = '';
                   jQuery("#infoCompareceuTrabalhoHoje .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoCompareceuTrabalhoHoje .radio').hasClass('active')){
                           jQuery('#infoCompareceuTrabalhoHoje .radio').removeClass('active'); 
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#compareceu_trabalho_hoje').val(valRadio);
                           
                           if ( valRadio == '0' )
                           {
                               jQuery('#compareceuTrabalhoHoje').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#compareceuTrabalhoHoje').attr('style','display:none');
                               jQuery('#motivo_falta_trabalho').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#compareceu_trabalho_hoje').val('');
                       }
                   });
                   /* FIM - infoCompareceuTrabalhoHoje */
                   
                   /* INICIO - infoParticipouOficinaHoje */
                   var valRadio = '';
                   jQuery("#infoParticipouOficinaHoje .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoParticipouOficinaHoje .radio').hasClass('active')){
                           jQuery('#infoParticipouOficinaHoje .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#participou_oficina_hoje').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#participouOficinaHoje').attr('style','display:block');
                               jQuery('#naoParticipouOficinaHoje').attr('style','display:none');
                               jQuery('.adicionaInputOficinasParticipou').html('');
                               jQuery('#motivo_nao_particiou_oficina_hoje').val('');
                           }
                           else if ( valRadio == '0' )
                           {
                               jQuery('#participouOficinaHoje').attr('style','display:none');
                               jQuery('#naoParticipouOficinaHoje').attr('style','display:block');
                               jQuery('.adicionaInputOficinasParticipou').html('');
                               jQuery('#motivo_nao_particiou_oficina_hoje').val('');
                           }
                           else
                           {
                               jQuery('#naoParticipouOficinaHoje').attr('style','display:none');
                               jQuery('#participouOficinaHoje').attr('style','display:none');
                               jQuery('.adicionaInputOficinasParticipou').html('');
                               jQuery('#motivo_nao_particiou_oficina_hoje').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#participou_oficina_hoje').val('');
                       }
                   });
                   /* FIM - infoParticipouOficinaHoje */
                   
                   /* INICIO - infoParticipouAtividadeHoje */
                   var valRadio = '';
                   jQuery("#infoParticipouAtividadeHoje .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoParticipouAtividadeHoje .radio').hasClass('active')){
                           jQuery('#infoParticipouAtividadeHoje .radio').removeClass('active');    
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#atividade_recreativa_externa').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#atividadeRecreativaExterna').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#atividadeRecreativaExterna').attr('style','display:none');
                               jQuery('.adicionaInputAtividadesParticipou').html('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#atividade_recreativa_externa').val('');
                       }
                   });
                   /* FIM - infoParticipouAtividadeHoje */
                   
                   /* INICIO - infoUsouDrogaHoje */
                   var valRadio = '';
                   jQuery("#infoUsouDrogaHoje .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoUsouDrogaHoje .radio').hasClass('active')){
                           jQuery('#infoUsouDrogaHoje .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#usou_droga_hoje').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#usouDrogaHoje').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#usouDrogaHoje').attr('style','display:none');
                               jQuery('.adicionaInputDrogaHoje').html('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#usou_droga_hoje').val('');
                       }
                   });
                   /* FIM - infoUsouDrogaHoje */
                   
                   /* INICIO - infoUsouCrackHoje */
                   var valRadio = '';
                   jQuery("#infoUsouCrackHoje .radio").click(function(){
                       jQuery(this).addClass('active');        
                       if(jQuery('#infoUsouCrackHoje .radio').hasClass('active')){
                           jQuery('#infoUsouCrackHoje .radio').removeClass('active');  
                           jQuery(this).addClass('active');
                           valRadio = jQuery(this).attr('title');
                           jQuery(this).parent().find('#usou_crack_hoje').val(valRadio);
                           
                           if ( valRadio == '1' )
                           {
                               jQuery('#usouCrackHoje').attr('style','display:block');
                           }
                           else
                           {
                               jQuery('#usouCrackHoje').attr('style','display:none');
                               jQuery('#quantas_pedras').val('');
                           }
                       }
                       else{
                           jQuery(this).parent().find('#usou_crack_hoje').val('');
                       }
                   });
                   /* FIM - infoUsouCrackHoje */
                   
               });

  jQuery(document).ready(function() {
             setInterval(function(){     
                 jQuery( "#ouvindo" ).load( "includes/ouvindo.php", function( response ) {
                     if ( response == "error" )
                         window.location = 'index.php?m=login&r=expirou';
                 });
             }, 10000);
         });

