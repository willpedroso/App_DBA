var CIDADAOSAUDE = {
    // Funções de retorno
    cbSuccess_f: null,
    cbFail_f: null,
	
	cidadao_id: null,
	dadosSaude: null,
	
	// Tipo de frequência CAPS
	listaTipoFrequenciaCaps: null,
	
	// Carrega dados básicos
	dadosBasicos: function () {
		console.log("dadosBasicos");
		
		BD_DTO.tipo_motivo_inativacao_carrega(CIDADAOSAUDE.dadosBasicosSuccess, CIDADAOSAUDE.dadosBasicosFail);
	},
	
	dadosBasicosSuccess: function (trans, res) {
		console.log("dadosBasicosSuccess");
		
		CIDADAOSAUDE.listaTipoFrequenciaCaps = BD_DTO.tipo_motivo_inativacao_data;
	
		// todo: testes retirar
		var Print = "Tipos de Frequência CAPS:\r\n";
		for (var i = 0; i < CIDADAOSAUDE.listaTipoFrequenciaCaps.length; i++) {
			Print += "\tID: " + CIDADAOSAUDE.listaTipoFrequenciaCaps[i].id + "\r\n";
			Print += "\tNome: " + CIDADAOSAUDE.listaTipoFrequenciaCaps[i].nome + "\r\n";			
		}
		console.log(Print);
		// testes retirar

		CIDADAOSAUDE.cbSuccess_f();
	},
	
	dadosBasicosFail: function (err) {
		console.log("dadosBasicosFail: " + err);
		
		CIDADAOSAUDE.cbFail_f(err);
	},
	
    // ****************** Obtém os dados de entrada *********************
	// 	
    // ******************************************************************
    dadosEntrada: function(cidadao, cbSuccess, cbFail) {
	    console.log("dadosEntrada");
		
		// Salva funções de retorno
		CIDADAOSAUDE.cbSuccess_f = cbSuccess;
		CIDADAOSAUDE.cbFail_f = cbFail;
		
		// Salva identificação do cidadão
		CIDADAOSAUDE.cidadao_id = cidadao;
		
		// Utiliza sempre o registro mais novo, por meio da data de criação
		BANCODADOS.sqlCmdDB("SELECT id " +
							", numero_sus " +
							", cadastro_acompanhamento_ubs " +
							", acompanhamento_caps " +
							", qual_acompanhamento_caps " +
							", tipo_frequencia_caps_id " +
							", nome_tecnico_referencia_caps " +
							", esteve_internado " +
							", como_chegou_situacao_rua " +
							", dias_situacao_rua " +
							", meses_situacao_rua " +
							", anos_situacao_rua " +
							", drogas_antes_depois_situacao_rua " +
							", sono_antes_programa " +
							", sono_depois_programa " +
							", tem_amigos " +
							", tem_companheiro " +
							", companheiro_programa " +
							", tem_familia " +
							", tem_contato_familia " +
							", tipo_estado_id " +
							", descricao_reside_familia " +
							", dias_faz_uso_crack " +
							", meses_faz_uso_crack " +
							", anos_faz_uso_crack " +
							", numero_pedras_antes_programa " +
							", numero_pedras_atualmente " +
							", drogas_alem_crack " +
							", uso_drogas_injetaveis " +
							", dias_uso_drogas_injetaveis " +
							", meses_uso_drogas_injetaveis " +
							", anos_uso_drogas_injetaveis " +
							", abstinencia_apos_programa " +
							", dias_abstinencia_apos_programa " +
							", meses_abstinencia_apos_programa " +
							", anos_abstinencia_apos_programa " +
							", controle_glicemia " +
							", controle_pressao_arterial " +
							", controle_peso " +
							", teste_rapido_dst_aids " +
							", local_teste_rapido_dst_aids " +
							", acompanhamento_dst " +
							", local_acompanhamento_dst " +
							", diagnostico_hiv_aids " +
							", tratamento_hiv_aids " +
							", local_tratamento_hiv_aids " +
							", diagnostico_sifilis " +
							", tratamento_sifilis " +
							", local_tratamento_sifilis " +
							", alta_tratamento_sifilis " +
							", passou_avaliacao_odontologica " +
							", local_passou_avaliacao_odontologica " +
							", tratamento_odontologico " +
							", sintomas_respiratorios " +
							", tratamento_sintomas_respiratorios " +
							", local_tratamento_sintomas_respiratorios " +
							", realizou_teste_tuberculose " +
							", diagnostico_tuberculose " +
							", em_tratamento_tuberculose " +
							", teve_tuberculose " +
							", fez_tratamento_tuberculose " +
							", local_fez_tratamento_tuberculose " +
							", teve_alta_tratamento_tuberculose " +
							", lesoes_pele " +
							", vacinacao_em_dia " +
							", outros_sinais_sintomas_criticos " +
							", avaliacao_ginecologica " +
							", local_avaliacao_ginecologica " +
							", metodo_anticoncepcional " +
							", qual_metodo_anticoncepcional " +
							", teve_aborto " +
							", planejamento_familiar " +
							", local_planejamento_familiar " +
							", gestante " +
							", pre_natal " +
							", local_pre_natal " +
							", amparo_maternal " +
							", amamentando " +
							", consulta_saude_hoje " +
							", compareceu_trabalho_hoje " +
							", motivo_falta_trabalho " +
							", participou_oficina_hoje " +
							", motivo_nao_particiou_oficina_hoje " +
							", atividade_recreativa_externa " +
							", dias_mantido_abstinencia " +
							", meses_mantido_abstinencia " +
							", anos_mantido_abstinencia " +
							", usou_droga_hoje " +
							", usou_crack_hoje " +
							", quantas_pedras " +
							", observacoes_importantes " +
							", observacoes_gerais " +
							", MAX(dt_criacao) as dt_criacao " +
							", status " +
							"FROM saude WHERE cidadao_id = ? and status = ?", [CIDADAOSAUDE.cidadao_id, 1], CIDADAOSAUDE.dadosEntradaSuccess, CIDADAOSAUDE.dadosEntradaFail);
	},
	
	dadosEntradaSuccess: function(trans, res) {
		console.log("dadosEntradaSuccess");
		
		if (res.rows.length != 1) {
			// todo: há mais de um registro de saúde para o cidadão
		}
		
		var ds = {
			id: res.rows.item(0).id,
			numero_sus: res.rows.item(0).numero_sus,
			cadastro_acompanhamento_ubs: res.rows.item(0).cadastro_acompanhamento_ubs,
			acompanhamento_caps: res.rows.item(0).acompanhamento_caps,
			qual_acompanhamento_caps: res.rows.item(0).qual_acompanhamento_caps,
			tipo_frequencia_caps_id: res.rows.item(0).tipo_frequencia_caps_id,
			nome_tecnico_referencia_caps: res.rows.item(0).nome_tecnico_referencia_caps,
			esteve_internado: res.rows.item(0).esteve_internado,
			como_chegou_situacao_rua: res.rows.item(0).como_chegou_situacao_rua,
			dias_situacao_rua: res.rows.item(0).dias_situacao_rua,
			meses_situacao_rua: res.rows.item(0).meses_situacao_rua,
			anos_situacao_rua: res.rows.item(0).anos_situacao_rua,
			drogas_antes_depois_situacao_rua: res.rows.item(0).drogas_antes_depois_situacao_rua,
			sono_antes_programa: res.rows.item(0).sono_antes_programa,
			sono_depois_programa: res.rows.item(0).sono_depois_programa,
			tem_amigos: res.rows.item(0).tem_amigos,
			tem_companheiro: res.rows.item(0).tem_companheiro,
			companheiro_programa: res.rows.item(0).companheiro_programa,
			tem_familia: res.rows.item(0).tem_familia,
			tem_contato_familia: res.rows.item(0).tem_contato_familia,
			tipo_estado_id: res.rows.item(0).tipo_estado_id,
			descricao_reside_familia: res.rows.item(0).descricao_reside_familia,
			dias_faz_uso_crack: res.rows.item(0).dias_faz_uso_crack,
			meses_faz_uso_crack: res.rows.item(0).meses_faz_uso_crack,
			anos_faz_uso_crack: res.rows.item(0).anos_faz_uso_crack,
			numero_pedras_antes_programa: res.rows.item(0).numero_pedras_antes_programa,
			numero_pedras_atualmente: res.rows.item(0).numero_pedras_atualmente,
			drogas_alem_crack: res.rows.item(0).drogas_alem_crack,
			uso_drogas_injetaveis: res.rows.item(0).uso_drogas_injetaveis,
			dias_uso_drogas_injetaveis: res.rows.item(0).dias_uso_drogas_injetaveis,
			meses_uso_drogas_injetaveis: res.rows.item(0).meses_uso_drogas_injetaveis,
			anos_uso_drogas_injetaveis: res.rows.item(0).anos_uso_drogas_injetaveis,
			abstinencia_apos_programa: res.rows.item(0).abstinencia_apos_programa,
			dias_abstinencia_apos_programa: res.rows.item(0).dias_abstinencia_apos_programa,
			meses_abstinencia_apos_programa: res.rows.item(0).meses_abstinencia_apos_programa,
			anos_abstinencia_apos_programa: res.rows.item(0).anos_abstinencia_apos_programa,
			controle_glicemia: res.rows.item(0).controle_glicemia,
			controle_pressao_arterial: res.rows.item(0).controle_pressao_arterial,
			controle_peso: res.rows.item(0).controle_peso,
			teste_rapido_dst_aids: res.rows.item(0).teste_rapido_dst_aids,
			local_teste_rapido_dst_aids: res.rows.item(0).local_teste_rapido_dst_aids,
			acompanhamento_dst: res.rows.item(0).acompanhamento_dst,
			local_acompanhamento_dst: res.rows.item(0).local_acompanhamento_dst,
			diagnostico_hiv_aids: res.rows.item(0).diagnostico_hiv_aids,
			tratamento_hiv_aids: res.rows.item(0).tratamento_hiv_aids,
			local_tratamento_hiv_aids: res.rows.item(0).local_tratamento_hiv_aids,
			diagnostico_sifilis: res.rows.item(0).diagnostico_sifilis,
			tratamento_sifilis: res.rows.item(0).tratamento_sifilis,
			local_tratamento_sifilis: res.rows.item(0).local_tratamento_sifilis,
			alta_tratamento_sifilis: res.rows.item(0).alta_tratamento_sifilis,
			passou_avaliacao_odontologica: res.rows.item(0).passou_avaliacao_odontologica,
			local_passou_avaliacao_odontologica: res.rows.item(0).local_passou_avaliacao_odontologica,
			tratamento_odontologico: res.rows.item(0).tratamento_odontologico,
			sintomas_respiratorios: res.rows.item(0).sintomas_respiratorios,
			tratamento_sintomas_respiratorios: res.rows.item(0).tratamento_sintomas_respiratorios,
			local_tratamento_sintomas_respiratorios: res.rows.item(0).local_tratamento_sintomas_respiratorios,
			realizou_teste_tuberculose: res.rows.item(0).realizou_teste_tuberculose,
			diagnostico_tuberculose: res.rows.item(0).diagnostico_tuberculose,
			em_tratamento_tuberculose: res.rows.item(0).em_tratamento_tuberculose,
			teve_tuberculose: res.rows.item(0).teve_tuberculose,
			fez_tratamento_tuberculose: res.rows.item(0).fez_tratamento_tuberculose,
			local_fez_tratamento_tuberculose: res.rows.item(0).local_fez_tratamento_tuberculose,
			teve_alta_tratamento_tuberculose: res.rows.item(0).teve_alta_tratamento_tuberculose,
			lesoes_pele: res.rows.item(0).lesoes_pele,
			vacinacao_em_dia: res.rows.item(0).vacinacao_em_dia,
			outros_sinais_sintomas_criticos: res.rows.item(0).outros_sinais_sintomas_criticos,
			avaliacao_ginecologica: res.rows.item(0).avaliacao_ginecologica,
			local_avaliacao_ginecologica: res.rows.item(0).local_avaliacao_ginecologica,
			metodo_anticoncepcional: res.rows.item(0).metodo_anticoncepcional,
			qual_metodo_anticoncepcional: res.rows.item(0).qual_metodo_anticoncepcional,
			teve_aborto: res.rows.item(0).teve_aborto,
			planejamento_familiar: res.rows.item(0).planejamento_familiar,
			local_planejamento_familiar: res.rows.item(0).local_planejamento_familiar,
			gestante: res.rows.item(0).gestante,
			pre_natal: res.rows.item(0).pre_natal,
			local_pre_natal: res.rows.item(0).local_pre_natal,
			amparo_maternal: res.rows.item(0).amparo_maternal,
			amamentando: res.rows.item(0).amamentando,
			consulta_saude_hoje: res.rows.item(0).consulta_saude_hoje,
			compareceu_trabalho_hoje: res.rows.item(0).compareceu_trabalho_hoje,
			motivo_falta_trabalho: res.rows.item(0).motivo_falta_trabalho,
			participou_oficina_hoje: res.rows.item(0).participou_oficina_hoje,
			motivo_nao_participou_oficina_hoje: res.rows.item(0).motivo_nao_particiou_oficina_hoje,
			atividade_recreativa_externa: res.rows.item(0).atividade_recreativa_externa,
			dias_mantido_abstinencia: res.rows.item(0).dias_mantido_abstinencia,
			meses_mantido_abstinencia: res.rows.item(0).meses_mantido_abstinencia,
			anos_mantido_abstinencia: res.rows.item(0).anos_mantido_abstinencia,
			usou_droga_hoje: res.rows.item(0).usou_droga_hoje,
			usou_crack_hoje: res.rows.item(0).usou_crack_hoje,
			quantas_pedras: res.rows.item(0).quantas_pedras,
			observacoes_importantes: res.rows.item(0).observacoes_importantes,
			observacoes_gerais: res.rows.item(0).observacoes_gerais,
			dt_criacao: res.rows.item(0).dt_criacao,
			status: res.rows.item(0).status,
		};
		CIDADAOSAUDE.dadosSaude = ds;
		
		// todo: testes retirar
		var Print = "Dados de saúde:\r\n";
		Print += "id: " + CIDADAOSAUDE.dadosSaude.id + "\r\n";
		Print += "numero_sus: " + CIDADAOSAUDE.dadosSaude.numero_sus + "\r\n";
		Print += "cadastro_acompanhamento_ubs: " + CIDADAOSAUDE.dadosSaude.cadastro_acompanhamento_ubs + "\r\n";
		Print += "acompanhamento_caps: " + CIDADAOSAUDE.dadosSaude.acompanhamento_caps + "\r\n";
		Print += "qual_acompanhamento_caps: " + CIDADAOSAUDE.dadosSaude.qual_acompanhamento_caps + "\r\n";
		Print += "tipo_frequencia_caps_id: " + CIDADAOSAUDE.dadosSaude.tipo_frequencia_caps_id + "\r\n";
		Print += "nome_tecnico_referencia_caps: " + CIDADAOSAUDE.dadosSaude.nome_tecnico_referencia_caps + "\r\n";
		Print += "esteve_internado: " + CIDADAOSAUDE.dadosSaude.esteve_internado + "\r\n";
		Print += "como_chegou_situacao_rua: " + CIDADAOSAUDE.dadosSaude.como_chegou_situacao_rua + "\r\n";
		Print += "dias_situacao_rua: " + CIDADAOSAUDE.dadosSaude.dias_situacao_rua + "\r\n";
		Print += "meses_situacao_rua: " + CIDADAOSAUDE.dadosSaude.meses_situacao_rua + "\r\n";
		Print += "anos_situacao_rua: " + CIDADAOSAUDE.dadosSaude.anos_situacao_rua + "\r\n";
		Print += "drogas_antes_depois_situacao_rua: " + CIDADAOSAUDE.dadosSaude.drogas_antes_depois_situacao_rua + "\r\n";
		Print += "sono_antes_programa: " + CIDADAOSAUDE.dadosSaude.sono_antes_programa + "\r\n";
		Print += "sono_depois_programa: " + CIDADAOSAUDE.dadosSaude.sono_depois_programa + "\r\n";
		Print += "tem_amigos: " + CIDADAOSAUDE.dadosSaude.tem_amigos + "\r\n";
		Print += "tem_companheiro: " + CIDADAOSAUDE.dadosSaude.tem_companheiro + "\r\n";
		Print += "companheiro_programa: " + CIDADAOSAUDE.dadosSaude.companheiro_programa + "\r\n";
		Print += "tem_familia: " + CIDADAOSAUDE.dadosSaude.tem_familia + "\r\n";
		Print += "tem_contato_familia: " + CIDADAOSAUDE.dadosSaude.tem_contato_familia + "\r\n";
		Print += "tipo_estado_id: " + CIDADAOSAUDE.dadosSaude.tipo_estado_id + "\r\n";
		Print += "descricao_reside_familia: " + CIDADAOSAUDE.dadosSaude.descricao_reside_familia + "\r\n";
		Print += "dias_faz_uso_crack: " + CIDADAOSAUDE.dadosSaude.dias_faz_uso_crack + "\r\n";
		Print += "meses_faz_uso_crack: " + CIDADAOSAUDE.dadosSaude.meses_faz_uso_crack + "\r\n";
		Print += "anos_faz_uso_crack: " + CIDADAOSAUDE.dadosSaude.anos_faz_uso_crack + "\r\n";
		Print += "numero_pedras_antes_programa: " + CIDADAOSAUDE.dadosSaude.numero_pedras_antes_programa + "\r\n";
		Print += "numero_pedras_atualmente: " + CIDADAOSAUDE.dadosSaude.numero_pedras_atualmente + "\r\n";
		Print += "drogas_alem_crack: " + CIDADAOSAUDE.dadosSaude.drogas_alem_crack + "\r\n";
		Print += "uso_drogas_injetaveis: " + CIDADAOSAUDE.dadosSaude.uso_drogas_injetaveis + "\r\n";
		Print += "dias_uso_drogas_injetaveis: " + CIDADAOSAUDE.dadosSaude.dias_uso_drogas_injetaveis + "\r\n";
		Print += "meses_uso_drogas_injetaveis: " + CIDADAOSAUDE.dadosSaude.meses_uso_drogas_injetaveis + "\r\n";
		Print += "anos_uso_drogas_injetaveis: " + CIDADAOSAUDE.dadosSaude.anos_uso_drogas_injetaveis + "\r\n";
		Print += "abstinencia_apos_programa: " + CIDADAOSAUDE.dadosSaude.abstinencia_apos_programa + "\r\n";
		Print += "dias_abstinencia_apos_programa: " + CIDADAOSAUDE.dadosSaude.dias_abstinencia_apos_programa + "\r\n";
		Print += "meses_abstinencia_apos_programa: " + CIDADAOSAUDE.dadosSaude.meses_abstinencia_apos_programa + "\r\n";
		Print += "anos_abstinencia_apos_programa: " + CIDADAOSAUDE.dadosSaude.anos_abstinencia_apos_programa + "\r\n";
		Print += "controle_glicemia: " + CIDADAOSAUDE.dadosSaude.controle_glicemia + "\r\n";
		Print += "controle_pressao_arterial: " + CIDADAOSAUDE.dadosSaude.controle_pressao_arterial + "\r\n";
		Print += "controle_peso: " + CIDADAOSAUDE.dadosSaude.controle_peso + "\r\n";
		Print += "teste_rapido_dst_aids: " + CIDADAOSAUDE.dadosSaude.teste_rapido_dst_aids + "\r\n";
		Print += "local_teste_rapido_dst_aids: " + CIDADAOSAUDE.dadosSaude.local_teste_rapido_dst_aids + "\r\n";
		Print += "acompanhamento_dst: " + CIDADAOSAUDE.dadosSaude.acompanhamento_dst + "\r\n";
		Print += "local_acompanhamento_dst: " + CIDADAOSAUDE.dadosSaude.local_acompanhamento_dst + "\r\n";
		Print += "diagnostico_hiv_aids: " + CIDADAOSAUDE.dadosSaude.diagnostico_hiv_aids + "\r\n";
		Print += "tratamento_hiv_aids: " + CIDADAOSAUDE.dadosSaude.tratamento_hiv_aids + "\r\n";
		Print += "local_tratamento_hiv_aids: " + CIDADAOSAUDE.dadosSaude.local_tratamento_hiv_aids + "\r\n";
		Print += "diagnostico_sifilis: " + CIDADAOSAUDE.dadosSaude.diagnostico_sifilis + "\r\n";
		Print += "tratamento_sifilis: " + CIDADAOSAUDE.dadosSaude.tratamento_sifilis + "\r\n";
		Print += "local_tratamento_sifilis: " + CIDADAOSAUDE.dadosSaude.local_tratamento_sifilis + "\r\n";
		Print += "alta_tratamento_sifilis: " + CIDADAOSAUDE.dadosSaude.alta_tratamento_sifilis + "\r\n";
		Print += "passou_avaliacao_odontologica: " + CIDADAOSAUDE.dadosSaude.passou_avaliacao_odontologica + "\r\n";
		Print += "local_passou_avaliacao_odontologica: " + CIDADAOSAUDE.dadosSaude.local_passou_avaliacao_odontologica + "\r\n";
		Print += "tratamento_odontologico: " + CIDADAOSAUDE.dadosSaude.tratamento_odontologico + "\r\n";
		Print += "sintomas_respiratorios: " + CIDADAOSAUDE.dadosSaude.sintomas_respiratorios + "\r\n";
		Print += "tratamento_sintomas_respiratorios: " + CIDADAOSAUDE.dadosSaude.tratamento_sintomas_respiratorios + "\r\n";
		Print += "local_tratamento_sintomas_respiratorios: " + CIDADAOSAUDE.dadosSaude.local_tratamento_sintomas_respiratorios + "\r\n";
		Print += "realizou_teste_tuberculose: " + CIDADAOSAUDE.dadosSaude.realizou_teste_tuberculose + "\r\n";
		Print += "diagnostico_tuberculose: " + CIDADAOSAUDE.dadosSaude.diagnostico_tuberculose + "\r\n";
		Print += "em_tratamento_tuberculose: " + CIDADAOSAUDE.dadosSaude.em_tratamento_tuberculose + "\r\n";
		Print += "teve_tuberculose: " + CIDADAOSAUDE.dadosSaude.teve_tuberculose + "\r\n";
		Print += "fez_tratamento_tuberculose: " + CIDADAOSAUDE.dadosSaude.fez_tratamento_tuberculose + "\r\n";
		Print += "local_fez_tratamento_tuberculose: " + CIDADAOSAUDE.dadosSaude.local_fez_tratamento_tuberculose + "\r\n";
		Print += "teve_alta_tratamento_tuberculose: " + CIDADAOSAUDE.dadosSaude.teve_alta_tratamento_tuberculose + "\r\n";
		Print += "lesoes_pele: " + CIDADAOSAUDE.dadosSaude.lesoes_pele + "\r\n";
		Print += "vacinacao_em_dia: " + CIDADAOSAUDE.dadosSaude.vacinacao_em_dia + "\r\n";
		Print += "outros_sinais_sintomas_criticos: "  + CIDADAOSAUDE.dadosSaude.outros_sinais_sintomas_criticos + "\r\n";
		Print += "avaliacao_ginecologica: " + CIDADAOSAUDE.dadosSaude.avaliacao_ginecologica + "\r\n";
		Print += "local_avaliacao_ginecologica: " + CIDADAOSAUDE.dadosSaude.local_avaliacao_ginecologica + "\r\n";
		Print += "metodo_anticoncepcional: " + CIDADAOSAUDE.dadosSaude.metodo_anticoncepcional + "\r\n";
		Print += "qual_metodo_anticoncepcional: " + CIDADAOSAUDE.dadosSaude.qual_metodo_anticoncepcional + "\r\n";
		Print += "teve_aborto: " + CIDADAOSAUDE.dadosSaude.teve_aborto + "\r\n";
		Print += "planejamento_familiar: " + CIDADAOSAUDE.dadosSaude.planejamento_familiar + "\r\n";
		Print += "local_planejamento_familiar: " + CIDADAOSAUDE.dadosSaude.local_planejamento_familiar + "\r\n";
		Print += "gestante: " + CIDADAOSAUDE.dadosSaude.gestante + "\r\n";
		Print += "pre_natal: " + CIDADAOSAUDE.dadosSaude.pre_natal + "\r\n";
		Print += "local_pre_natal: " + CIDADAOSAUDE.dadosSaude.local_pre_natal + "\r\n";
		Print += "amparo_maternal: " + CIDADAOSAUDE.dadosSaude.amparo_maternal + "\r\n";
		Print += "amamentando: " + CIDADAOSAUDE.dadosSaude.amamentando + "\r\n";
		Print += "consulta_saude_hoje: " + CIDADAOSAUDE.dadosSaude.consulta_saude_hoje + "\r\n";
		Print += "compareceu_trabalho_hoje: " + CIDADAOSAUDE.dadosSaude.compareceu_trabalho_hoje + "\r\n";
		Print += "motivo_falta_trabalho: " + CIDADAOSAUDE.dadosSaude.motivo_falta_trabalho + "\r\n";
		Print += "participou_oficina_hoje: " + CIDADAOSAUDE.dadosSaude.participou_oficina_hoje + "\r\n";
		Print += "motivo_nao_participou_oficina_hoje: " + CIDADAOSAUDE.dadosSaude.motivo_nao_participou_oficina_hoje + "\r\n";
		Print += "atividade_recreativa_externa: " + CIDADAOSAUDE.dadosSaude.atividade_recreativa_externa + "\r\n";
		Print += "dias_mantido_abstinencia: " + CIDADAOSAUDE.dadosSaude.dias_mantido_abstinencia + "\r\n";
		Print += "meses_mantido_abstinencia: " + CIDADAOSAUDE.dadosSaude.meses_mantido_abstinencia + "\r\n";
		Print += "anos_mantido_abstinencia: " + CIDADAOSAUDE.dadosSaude.anos_mantido_abstinencia + "\r\n";
		Print += "usou_droga_hoje: " + CIDADAOSAUDE.dadosSaude.usou_droga_hoje + "\r\n";
		Print += "usou_crack_hoje: " + CIDADAOSAUDE.dadosSaude.usou_crack_hoje + "\r\n";
		Print += "quantas_pedras: " + CIDADAOSAUDE.dadosSaude.quantas_pedras + "\r\n";
		Print += "observacoes_importantes: " + CIDADAOSAUDE.dadosSaude.observacoes_importantes + "\r\n";
		Print += "observacoes_gerais: " + CIDADAOSAUDE.dadosSaude.observacoes_gerais + "\r\n";
		Print += "dt_criacao: " + CIDADAOSAUDE.dadosSaude.dt_criacao + "\r\n";
		Print += "status: " + CIDADAOSAUDE.dadosSaude.status + "\r\n";
		
		console.log(Print);
		// testes retirar
		
		// carrega dados básicos
		CIDADAOSAUDE.dadosBasicos();
	},
	
	dadosEntradaFail: function(err) {
		console.log("");

		CIDADAOSAUDE.cbFail_f (err);
	},
	
    // ****************** Salva os dados  *********************
	// Salva no banco e atualiza memória
	salvaCidadaoSaude: function(dadosLista, cbSuccess, cbFail) {
		console.log("salvaCidadao");
		
		// Salva funções de retorno
		CIDADAOSAUDE.cbSuccess_f = cbSuccess;
		CIDADAOSAUDE.cbFail_f = cbFail;

		// Salva no banco de dados
		var hoje = new Date();
		BANCODADOS.sqlCmdDB("INSERT INTO saude " +
							"(numero_sus " +
							", cadastro_acompanhamento_ubs " +
							", acompanhamento_caps " +
							", qual_acompanhamento_caps " +
							", tipo_frequencia_caps_id " +
							", nome_tecnico_referencia_caps " +
							", esteve_internado " +
							", como_chegou_situacao_rua " +
							", dias_situacao_rua " +
							", meses_situacao_rua " +
							", anos_situacao_rua " +
							", drogas_antes_depois_situacao_rua " +
							", sono_antes_programa " +
							", sono_depois_programa " +
							", tem_amigos " +
							", tem_companheiro " +
							", companheiro_programa " +
							", tem_familia " +
							", tem_contato_familia " +
							", tipo_estado_id " +
							", descricao_reside_familia " +
							", dias_faz_uso_crack " +
							", meses_faz_uso_crack " +
							", anos_faz_uso_crack " +
							", numero_pedras_antes_programa " +
							", numero_pedras_atualmente " +
							", drogas_alem_crack " +
							", uso_drogas_injetaveis " +
							", dias_uso_drogas_injetaveis " +
							", meses_uso_drogas_injetaveis " +
							", anos_uso_drogas_injetaveis " +
							", abstinencia_apos_programa " +
							", dias_abstinencia_apos_programa " +
							", meses_abstinencia_apos_programa " +
							", anos_abstinencia_apos_programa " +
							", controle_glicemia " +
							", controle_pressao_arterial " +
							", controle_peso " +
							", teste_rapido_dst_aids " +
							", local_teste_rapido_dst_aids " +
							", acompanhamento_dst " +
							", local_acompanhamento_dst " +
							", diagnostico_hiv_aids " +
							", tratamento_hiv_aids " +
							", local_tratamento_hiv_aids " +
							", diagnostico_sifilis " +
							", tratamento_sifilis " +
							", local_tratamento_sifilis " +
							", alta_tratamento_sifilis " +
							", passou_avaliacao_odontologica " +
							", local_passou_avaliacao_odontologica " +
							", tratamento_odontologico " +
							", sintomas_respiratorios " +
							", tratamento_sintomas_respiratorios " +
							", local_tratamento_sintomas_respiratorios " +
							", realizou_teste_tuberculose " +
							", diagnostico_tuberculose " +
							", em_tratamento_tuberculose " +
							", teve_tuberculose " +
							", fez_tratamento_tuberculose " +
							", local_fez_tratamento_tuberculose " +
							", teve_alta_tratamento_tuberculose " +
							", lesoes_pele " +
							", vacinacao_em_dia " +
							", outros_sinais_sintomas_criticos " +
							", avaliacao_ginecologica " +
							", local_avaliacao_ginecologica " +
							", metodo_anticoncepcional " +
							", qual_metodo_anticoncepcional " +
							", teve_aborto " +
							", planejamento_familiar " +
							", local_planejamento_familiar " +
							", gestante " +
							", pre_natal " +
							", local_pre_natal " +
							", amparo_maternal " +
							", amamentando " +
							", consulta_saude_hoje " +
							", compareceu_trabalho_hoje " +
							", motivo_falta_trabalho " +
							", participou_oficina_hoje " +
							", motivo_nao_particiou_oficina_hoje " +
							", atividade_recreativa_externa " +
							", dias_mantido_abstinencia " +
							", meses_mantido_abstinencia " +
							", anos_mantido_abstinencia " +
							", usou_droga_hoje " +
							", usou_crack_hoje " +
							", quantas_pedras " +
							", observacoes_importantes " +
							", observacoes_gerais " +
							", dt_criacao " +
							", status) " +
							"VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
							[
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							dadosLista.shift(),
							(hoje.getFullYear() + "-" + (hoje.getMonth()+1) + "-" + hoje.getDate() + " " + hoje.getHours() + ":" + hoje.getMinutes() + ":" + hoje.getSeconds()),
							1
							], 
							CIDADAOSAUDE.salvaCidadaoSaudeSuccess, CIDADAOSAUDE.salvaCidadaoSaudeFail);
	},
	
	salvaCidadaoSaudeSuccess: function (trans, res) {
		console.log("salvaCidadaoSaudeSuccess");
		
		// Atualiza dados na memória
		CIDADAOSAUDE.dadosEntrada(CIDADAOSAUDE.cidadao_id, CIDADAOSAUDE.cbSuccess_f, CIDADAOSAUDE.cbFail_f);
	},
	
	salvaCidadaoSaudeFail: function (err) {
		console.log("salvaCidadaoSaudeFail");
		
		// Retorna
		CIDADAOSAUDE.cbFail_f(err);
	},
}
