var request = require('request');
var combinatoria = require('./combinatoria');
var http = require('http');
var urlQuadras = 'http://localhost:3010/quadras';

var urlSorteados = 'http://localhost:3010/resultados';
var arraySorteados = [];
var sorteados = []; //recebera o arraySorteados em forma de String
var arrayQuadras = [];

//Ao carregar o módulo, carregar inicialmente todas ao resultados

var dt = new Date();

var ordena = function(a,b) {
	return a < b ? -1 : a > b ? 1 : 0;
}


function getRandomInt(min, max) {
  	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min;
}



var achaQuadra = function(){
	return new Promise(function (fulfill, reject){
		request({url: urlQuadras, json: true}, function (error, response, quadras) {
  			if(error){
  				reject(error);
  			}else{  						
  				fulfill(quadras);
  				console.log('quadras carregada!!!')
  			}
		});
	})
 		
}


var inicial = function(){
	return new Promise(function(fulfill, reject){
		request({url: urlSorteados, json: true}, function (error, response, sorteados) {
  			if(error){
  				reject(error)
  			}else{
  				fulfill(sorteados);
  				console.log('sorteados carregado!!!')
  			}
		});
	})
}

var normaliza = function(value){
	if (value < 10) {
		return 0 + "" + value;
	}

	return value;
}


var promisse = inicial();
promisse
.then(function(sorteados){//todas as outras funções dependerão da leitura da coleção de resultados ja sorteados
	var promisse = achaQuadra();
	promisse
	.then(function(quadras){
		console.log(sorteados.length);

		for(var i = 0; i <= quadras.length - 1; i++){
			if(sorteados.indexOf(quadras[i]) === -1){
				console.log(quadras[i]);
				break;
			}
		}


	})//fim da promisse achaQuadras

})//fim da promisse incial











