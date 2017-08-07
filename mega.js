var controller = require('./controller/criar');

//NÃO ESQUECER QUE AUTEREI A LINHA 6 DAS QUADRAS
//ṔRECISA CORRIGIR DEPOIS

	var ordena = function(a,b) {
    return a < b ? -1 : a > b ? 1 : 0;
    }

    var sena = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59', '60']


var promise = controller.carregaResultados();
promise
.then(function(resultados){
	var promise = controller.carregaQuadras();
	promise.then(function(quadras){

	    

	    do
		{
			var pos = controller.getRandomInt(0,quadras.length - 1);
			var primeiraQuadra = quadras[pos];

		}
		while(resultados.indexOf(primeiraQuadra) !== -1);

		sena = controller.tiraDezena(primeiraQuadra.substring(0,2), sena);
		sena = controller.tiraDezena(primeiraQuadra.substring(2,4), sena);
		sena = controller.tiraDezena(primeiraQuadra.substring(4,6), sena);
		sena = controller.tiraDezena(primeiraQuadra.substring(6), sena);
		
		
		//Aqui atualizo o array de quadras, sem as 4 dezenas já sorteadas
		quadras = controller.combina(sena);

		//atesta de a quinta dezena sorteada aleatóriamente serve para 
		//compor o jogo


		do
		{

			var quintaDezenaFlag = true;
		
			var pos = controller.getRandomInt(0,sena.length - 1);
			var quintaDezena = sena[pos];

			//Gero um array para conseguir acomodar a nova dezena
			//Em ordem crescente na segundaQuadra
			primeiraQuadra = controller.geraArray(primeiraQuadra);
			//Insiro a quinta dezena no jogo, criando asim um novo
			//jogo com cinco dezenas
			var segundaQuadra = controller.compoeJogo(primeiraQuadra, quintaDezena);
			
			//Testo para ver se há alguma combinação de quadras
			//nessa quina que ja foi sorteada

			var a = controller.geraString(segundaQuadra);
			

			for(var i = 0; i <= a.length - 1; i++){	
				if(resultados.indexOf(a[i]) > -1){
					
					segundaQuadra = controller.descompoeJogo(segundaQuadra, quintaDezena);
					quintaDezenaFlag = false;
					break;
				}


			}
		}while(!quintaDezenaFlag)

		//Nesse ponto posso afirmar que esse jogo de 05 dezenas(segundaQuadra)
		//utilizado foi aprovada e está pronta para receber uma sexta dezena
		//logo preciso retirar a quintaDezena do espaço amostral da sena

		var indice = sena.indexOf(quintaDezena);
		sena.splice(indice, 1);
		quadras = controller.combina(sena);


		do
		{

			var sextaDezenaFlag = true;
		
			var pos = controller.getRandomInt(0,sena.length - 1);
			var sextaDezena = sena[pos];

			
			//Insiro a sexta dezena no jogo, criando asim um novo
			//jogo com seis dezenas
			var terceiraQuadra = controller.compoeJogo(segundaQuadra, sextaDezena);
			
			//Testo para ver se há alguma combinação de quadras
			//nessa sena que ja foi sorteada

			var a = controller.geraString(terceiraQuadra);
			

			for(var i = 0; i <= a.length - 1; i++){	
				if(resultados.indexOf(a[i]) > -1){
					
					terceiraQuadra = controller.descompoeJogo(terceiraQuadra, sextaDezena);
					sextaDezenaFlag = false;
					break;
				}


			}
		}while(!sextaDezenaFlag)

		//Nesse ponto posso afirmar que esse jogo de 06 dezenas(terceiraQuadra)
		//utilizado foi aprovada e está pronta para receber uma setima dezena
		//logo preciso retirar a sextaDezena do espaço amostral da sena

		var indice = sena.indexOf(sextaDezena);
		sena.splice(indice, 1);
		quadras = controller.combina(sena);


		do
		{

			var setimaDezenaFlag = true;
		
			var pos = controller.getRandomInt(0,sena.length - 1);
			var setimaDezena = sena[pos];

			
			//Insiro a setima dezena no jogo, criando asim um novo
			//jogo com sete dezenas
			var quartaQuadra = controller.compoeJogo(terceiraQuadra, setimaDezena);
			
			//Testo para ver se há alguma combinação de quadras
			//nessa sena que ja foi sorteada

			var a = controller.geraString(quartaQuadra);
			

			for(var i = 0; i <= a.length - 1; i++){	
				if(resultados.indexOf(a[i]) > -1){
					
					quartaQuadra = controller.descompoeJogo(quartaQuadra, setimaDezena);
					setimaDezenaFlag = false;
					break;
				}


			}
		}while(!setimaDezenaFlag)


		//Nesse ponto posso afirmar que esse jogo de 07 dezenas(quartaQuadra)
		//utilizado foi aprovada e está pronta para receber uma oitava dezena
		//logo preciso retirar a setimaDezena do espaço amostral da sena

		var indice = sena.indexOf(setimaDezena);
		sena.splice(indice, 1);
		quadras = controller.combina(sena);


		do
		{

			var oitavaDezenaFlag = true;
		
			var pos = controller.getRandomInt(0,sena.length - 1);
			var oitavaDezena = sena[pos];

			
			//Insiro a oitava dezena no jogo, criando asim um novo
			//jogo com oito dezenas
			var quintaQuadra = controller.compoeJogo(quartaQuadra, oitavaDezena);
			
			//Testo para ver se há alguma combinação de quadras
			//nessa sena que ja foi sorteada

			var a = controller.geraString(quintaQuadra);
			

			for(var i = 0; i <= a.length - 1; i++){	
				if(resultados.indexOf(a[i]) > -1){
					
					quintaQuadra = controller.descompoeJogo(quintaQuadra, oitavaDezena);
					oitavaDezenaFlag = false;
					break;
				}


			}
		}while(!oitavaDezenaFlag)



		console.log(quintaDezena);
		console.log(sextaDezena);
		console.log(setimaDezena);
		console.log(oitavaDezena);

	
	})//fim da promise de quadras
})//fim da promise de resultados


