/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		console.log("onDeviceReady1");
        app.receivedEvent('deviceready');
		console.log("onDeviceReady2");
		BANCODADOS.openDB(app.openDBSuccess, app.openDBFail);
    },
	
	openDBSuccess: function () {
		// Verifica se o banco já existe e contém dados
		BANCODADOS.sqlCmdDB("SELECT id FROM cidadao", [], app.bancoOK, app.bancoFail);
	},
	
	bancoOK: function (trans, res) {
		console.log("bancoOK");
		
		if (res.rows.length == 0) {
			// Banco vazio, inicia sincronismo automático
			BANCODADOS.initSincronismo();			
		} 
	},
	
	bancoFail: function (err) {
		console.log("bancoFail");
		// Cria tabelas e dados
		BANCODADOS.cbSuccess_f = app.createDBSuccess;
		BANCODADOS.cbFail_f = app.createDBFail;
		BANCODADOS.createDB();
	},
	
	createDBSuccess: function () {
		// Banco criado com sucesso
		console.log("Banco criado com sucesso.");
	},
	
	createDBFail: function (err) {
		// todo: definir o comportamento do app neste caso de erro
		alertMessage("Houve falha na criação do banco de dados. Erro: " + err);
	},
	
	openDBFail: function (err) {
		// todo: definir o comportamento do app neste caso de erro
		alertMessage("Houve falha na abertura do banco de dados. Erro: " + err);
	},
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');

//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();