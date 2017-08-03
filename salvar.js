//algoritmo que pega jogos, combina em quadras e salva no mongo

var request = require("request")
var readline = require('linebyline'),
rl = readline('./teste.csv');
var count = 0;
function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
}

	var salvar = function(obj){
		var url = 'http://localhost:3010/resultados';
					
					request.post({'url': url, 'form': obj}, function(err,httpResponse,body){
					
						if(err){
							console.log(err);
						}else{
							console.log(body);
						}
					
					})
	};


	var combina = function(array){
		var obj = {};
		
		for(var i = 0; i<3; i++){
		
			for(var j = i + 1; j<4; j++){
			if(j === i) {continue;};
			
				for(var k = j + 1; k<5; k++){
				if(k === j) {continue;};
				
					for(var l = k + 1; l<6; l++){
					if(l === k) {continue;};
					obj['d1'] = array[i];
					obj['d2'] = array[j];
					obj['d3'] = array[k];
					obj['d4'] = array[l];
					count += 1;
					console.log(count);
					salvar(obj);

					}

				}

			}

		}
	
	};


  	
  	rl.on('line', function(line, lineCount, byteCount) {   
  		var array = [];
  		var array = line.split(',');

  		var ord = []

  		array.forEach(function(value){
  			ord.push(parseFloat(value));
  		})

  		array = ord.sort(function(a,b) {
    		return a < b ? -1 : a > b ? 1 : 0;
		});

		combina(array);

	rl.on('end', function(){
		
	})


  })
  .on('error', function(e) {
    console.log('Erro do tipo: ' + e);
  });




