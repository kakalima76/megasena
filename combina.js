var request = require('request');
var combinatoria = require('./combinatoria');
var http = require('http');
var urlQuadras = 'http://localhost:3010/quadras';
var urlAtualizar = 'http://localhost:3010/quadras/atualizar';
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
  				
  			var filtroQuadras = function(value){
			return value.sorteado === 0;
			}	

			quadrasFiltradas = quadras.filter(filtroQuadras);
  				fulfill(quadrasFiltradas);
  			}
		});
	})
 		
}


var atualizaQuadras = function(id){
	var obj = {}
	obj['id'] = id;
	request.post({'url': urlAtualizar, 'form': obj}, function(error, response, body){
		console.log(response.statusCode);
		console.log(error);
	})
};


var incorporaArrayDe7Combinatoria = function(arrayIncorporado, objIncorporador){
	arrayIncorporador = [];
	arrayIncorporador[0] = objIncorporador.d1;
	arrayIncorporador[1] = objIncorporador.d2;
	arrayIncorporador[2] = objIncorporador.d3;
	arrayIncorporador[3] = objIncorporador.d4;

	arrayIncorporado.forEach(function(value){
		arrayIncorporador.push(value);
	})


	arrayIncorporador.sort(ordena);

	return combinatoria.combinaSync(arrayIncorporador);
	
}

var incorporaArrayDe7 = function(arrayIncorporado, objIncorporador){
	arrayIncorporador = [];
	arrayIncorporador[0] = objIncorporador.d1;
	arrayIncorporador[1] = objIncorporador.d2;
	arrayIncorporador[2] = objIncorporador.d3;
	arrayIncorporador[3] = objIncorporador.d4;

	arrayIncorporado.forEach(function(value){
		arrayIncorporador.push(value);
	})


	return arrayIncorporador.sort(ordena);
	
}

var inicial = function(){
	return new Promise(function(fulfill, reject){
		request({url: urlSorteados, json: true}, function (error, response, sorteados) {
  			if(error){
  				reject(error)
  			}else{
  				fulfill(sorteados);
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
promisse.then(function(arraySorteados){//todas as outras funções dependerão da leitura da coleção de resultados ja sorteados

	arraySorteados.forEach(function(value){
		sorteados.push(normaliza(value.d1.toString()) + normaliza(value.d2.toString()) + normaliza(value.d3.toString()) + normaliza(value.d4.toString()));
	})



	var promisse = achaQuadra();
	promisse
	.then(function(quadras){

		var aleatorio = getRandomInt(0,(487635-26204))
		
		var obj = quadras[aleatorio];

		var posicaoIgual;

		var seleciona = function(){
		//joga o numero sorteado pra última posição do array
			var inicial = getRandomInt(1,4);
			posicaoIgual = inicial - 1;
			var posicoes = [1,2,3,4];
			var extrai = posicoes.indexOf(inicial);
			posicoes.splice(extrai, 1);
			posicoes.push(inicial);
			return posicoes;
		};

		var posicoes = seleciona();

		var filtroSeleciona = function(value){
			//retorna um objeto onde apenas uma dezena é igual ao da quadra inicial
			return (
						(obj['d' + posicoes[0]] !== value['d' + posicoes[0]]) &&
						(obj['d' + posicoes[1]] !== value['d' + posicoes[1]]) &&
						(obj['d' + posicoes[2]] !== value['d' + posicoes[2]]) &&
						(obj['d' + posicoes[3]] === value['d' + posicoes[3]]) 
					) 
		}

		
		//array com quadras pretendentes a serem a segunda quadra do processo;
		var pretendentes = quadras.filter(filtroSeleciona);


		//retiro a dezena semelhante nas duas quadras
		var arrayObj = []
		arrayObj[0] = obj.d1;
		arrayObj[1] = obj.d2;
		arrayObj[2] = obj.d3;
		arrayObj[3] = obj.d4;
		arrayObj.splice(posicaoIgual, 1);

		var flag = true;


		//variavel que armazenará o valor do array com sete elementos
		var seteElementos = [];

		for(var i = 0; i <= pretendentes.length - 1; i++){

			if(!flag){
				seteElementos = incorporaArrayDe7(arrayObj, pretendentes[i - 1]);
				break;
			}

			var res = incorporaArrayDe7Combinatoria(arrayObj, pretendentes[i]);
			for (var j = 0; j <= res.length - 1; j++){
				for(k = 0; k <= arraySorteados.length - 1; k++){
					var a = parseInt(res[j].substring(0,2));
					var b = parseInt(res[j].substring(2,4));
					var c = parseInt(res[j].substring(4,6));
					var d = parseInt(res[j].substring(6));

					if((d-c-b-a) !== (-1)*(2*a)){
						flag = 
						(
							(res[j].substring(0,2) === arraySorteados[k].d1)
							&&
							(res[j].substring(2,4) === arraySorteados[k].d2)
							&&
							(res[j].substring(4,6) === arraySorteados[k].d3)
							&&
							(res[j].substring(6)   === arraySorteados[k].d4)
						)

					}else{
						flag = true;
					}
				} 
			}
		}

		//Nesse ponto eu já tenho um jogo com 7 dezenas
		//Salvo no array seteElementos
		//Agora é construir um novo jogo com 11 dezenas

		//Primeiramente deve-se retirar qualquer quadra
		//que possua algum elemento no array seteElementos


			do
			{

						var soma = 0;
						var soma2 = 0;


				for(var i = 0; i <= quadras.length - 1; i++){

							var a = quadras[i].d1;
							var b = quadras[i].d2;
							var c = quadras[i].d3;
							var d = quadras[i].d4;

							soma = 
							seteElementos.indexOf(quadras[i].d1) +
							seteElementos.indexOf(quadras[i].d2) + 
							seteElementos.indexOf(quadras[i].d3) + 
							seteElementos.indexOf(quadras[i].d4)
					

							if(soma === -4 && (d-c-b-a) !== (-1)*(2*a)){


								//assim eu descubro uma quadra que não tem semelhanças
								//dentro do grupo de 7 dezenas
								//e verifico se alguma combinação dele com o grupo de sete
								//ja foi sorteado em algum momento
								var res = incorporaArrayDe7Combinatoria(seteElementos, quadras[i]);

								for(var j = 0; j<= res.length - 1; j++){
									soma2 += sorteados.indexOf(res[j])
								}

								if(soma2 > -330){
									console.log('rejeitado');
									console.log(quadras[i]);
									console.log(soma2 + '\n');
									quadras.splice(i, 1);
								}else{
									console.log('eleito');
									console.log(quadras[i]);
								}

							}

						}

					console.log(soma2);

			}while(soma2 > -330)

console.log('Tempo: ' + (new Date() - dt) + ' milissegundos');

	

	})//fim da promisse

})//fim da promisse incial











