var controller = require('./controller/criar');

//NÃO ESQUECER QUE AUTEREI A LINHA 6 DAS QUADRAS
//ṔRECISA CORRIGIR DEPOIS

	var ordena = function(a,b) {
    return a < b ? -1 : a > b ? 1 : 0;
    }

    //se retornar true os numeros sã0 um par e um ímpar
	//senão retorna false
	var testaNumeros = function(a, b){
		a = parseInt(a);
		b = parseInt(b);

		if((a * b) % 2 === 1){
			return false;
		}else if((a + b) % 2 === 1){
			if((a - b === 1) || a - b === -1){
				return false;
			}else{
				return true;
			}
			
		}else{
			return false;
		}
	};

	var redutora = function(array){
		var response = []

		array.forEach(function(str, index){
			var a = str.substr(0,2);
			var b = str.substr(2);
	
			if(testaNumeros(a, b)){
				response.push(str);
			}

		})

		return response;
	}

	//função que recebe uma dupla do 1º e 2º quadrantes
	//para formar uma quadra

	var compoeQuatro = function(str1, str2){
		var array = []
		array.push(str1.substr(0,2));
		array.push(str1.substr(2));
		array.push(str2.substr(0,2));
		array.push(str2.substr(2));
		array =  array.sort(ordena);
		var str = array[0] + array[1] + array[2] + array[3]

		return str;
	}


	var compoeSeis = function(str, array){
		var aux = array;
		aux.push(str.substr(0,2));
		aux.push(str.substr(2));
		
		aux =  aux.sort(ordena);
		
		var response = controller.combina(aux);
		aux = [];

		return response;
		
	}


	//contará as ocorrências das dezenas dentro de cada quadrante
	
	var q1 = ['01','02','03','04','05','11','12','13','14','15','21','22','23','24','25'];
	var q2 = ['06','07','08','09','10','16','17','18','19','20','26','27','28','29','30'];
	var q3 = ['31','32','33','34','35','41','42','43','44','45','51','52','53','54','55'];
	var q4 = ['36','37','38','39','40','46','47','48','49','50','56','57','58','59','60'];
	var extremos = ['01','02','03','04','05','06','07','08','09','10','20','30','40','50','60','11','21','31','41','51','52','53','54','55','56','57','58','59']

	var contarExtremos = function(array){
		var count = 0;
		array.forEach(function(dezena){
			if(extremos.indexOf(dezena) > -1)
			{
				count++;
			}
		})

		return count;
	}

       
var promise = controller.carregaResultados();
promise
.then(function(resultados){
	//amostral das quadras de q1
	var aQ1 = redutora(controller.geraDuplas(q1));
	var aQ2 = redutora(controller.geraDuplas(q2));
	var aQ3 = redutora(controller.geraDuplas(q3));
	var aQ4 = redutora(controller.geraDuplas(q4));

	var flag = true;
	var count = 0;
	var primeiraQuadra = [];
	

		for(var i = 0; i <= aQ1.length - 1; i++){

			//estou usando o count para parar o primeiro for...loop
			if(count === 42){
				primeiraQuadra = resp;
				break;
			}

			for(var j = 0; j <= aQ2.length - 1; j++){


				var resp = compoeQuatro(aQ1[i], aQ2[j]);

			
				if(resp === '01222730' || resp === '02052730' || resp === '03122730' || resp === '11222730'){
					continue;
					}
				

				if(resultados.indexOf(resp) > -1){
					count = 0;
					break;
				}else{
					count++;
				}
			}
		}

		console.log(primeiraQuadra);

		primeiraQuadra = controller.geraArray(primeiraQuadra);
		var count = 0;
		

		for(var l = 0; l <= primeiraQuadra.length - 1; l++){
			if(count === 15){
				pos = m;
				break;
			}

			for(var m = 0; m <= aQ3.length - 1; m++){
				if(count === 15){
				break;
				}


				var segundaQuadra = controller.compoeJogo(primeiraQuadra, aQ3[m].substr(0,2));
				segundaQuadra = controller.compoeJogo(segundaQuadra, aQ3[m].substr(2));

				var quadras = controller.combina(segundaQuadra);

				for (var n = 0; n <= quadras.length - 1; n++){
					if(resultados.indexOf(quadras[n]) > -1){
						count = 0;
						//retornando a primeiraQuadra inicial
						segundaQuadra = controller.descompoeJogo(segundaQuadra, aQ3[m].substr(0,2));
						segundaQuadra = controller.descompoeJogo(segundaQuadra, aQ3[m].substr(2));
						break;
					}else{
						count++;
					}
				}
			}
		}

		//construo o array com as quadras possíveis formadas pelo array segundaQuadra
		
		var count = 0;
		
		for(var p = 0; p <= aQ4.length - 1; p++){
			console.log(count);

			var terceiraQuadra = controller.compoeJogo(segundaQuadra, aQ4[p].substr(0,2));
				terceiraQuadra = controller.compoeJogo(terceiraQuadra, aQ4[p].substr(2));
		
				var contar = contarExtremos(terceiraQuadra);
				//se os resultados nos extremos forem menores que 3
				//então devo continuar apenas com esses jogos para interar
				//o array de comparação com os resultados já sorteados

				var quadras = controller.combina(terceiraQuadra);

				if(contar < 3){
						for(var q = 0; q <= quadras.length - 1; q++){
							console.log('quadras[q] ' + quadras[q])

							if(quadras[q] === '32353639'){
								continue;
							}

							if(resultados.indexOf(quadras[q]) > -1){
								count = 0;
							}else{
							count++;
							}
						}
				}

			

				if(count === 70){
					console.log(terceiraQuadra);
					break;
				}else{
					terceiraQuadra = controller.descompoeJogo(terceiraQuadra, aQ4[p].substr(0,2));
					terceiraQuadra = controller.descompoeJogo(terceiraQuadra, aQ4[p].substr(2));
				}
		}


		
		

})//fim da promise de resultados


