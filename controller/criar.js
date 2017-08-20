var rlp = require('readline-promise');
var fs  = require('fs');
var count = 0;
function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
}

var ordena = function(a,b) {
    return a < b ? -1 : a > b ? 1 : 0;
    }

var normaliza = function(value){
    if (value < 10) {
        return 0 + "" + value;
    }

    return value;

}

    exports.geraArray = function(string){
        var array = []

        if(typeof string === 'object'){


            for(var i = 0; i <= string.length - 1; i++){

                array.push(string[i]);
            }
        

        }else{

            for(var i = 0; i <= string.length - 1; i++){
                if(i % 2 === 1){
                    continue;
                }

                array.push(string.substring(i, i + 2));
            }
        }

        

        return array;
    }


    exports.compoeJogo = function(array, dezena){
        array.push(dezena);
        array.sort(ordena);

        return array;
    }

    exports.descompoeJogo = function(array, dezena){
        var indice = array.indexOf(dezena)
        array.splice(indice, 1);
        array.sort(ordena);

        return array;
    }


    exports.combina = function(value)//adiciono um array com a combinação de quadras
    {
        
            var q = value.length - 4;
            var array = [];

            for(var i = 0; i <= q; i++)
            {
                    for(var j = i + 1; j <= q + 1; j++)
                {
                        if(j === i){continue;}
                            for(var k = j + 1; k <= q + 2; k++)
                    {
                                if(k === j){continue;}
                                    for(var l = k + 1; l <= q + 3; l++)
                        {
                                        if(l === k){continue;}
                                        
                                        array.push(value[i]+""+value[j]+""+value[k]+""+value[l])
                                        

                                        if(i === q){

                                            return array;
                                        }
                        }

                    }
                
                }
            
            }  

    };
	
  	var quadras = [];
    var resultados = [];
    var sena = [];


 
    exports.carregaResultados = function(){
        return new Promise(function(fulfill, reject){
            
            rlp.createInterface({
                    terminal: false,
                    input: fs.createReadStream('./model/resultados.csv')
                })
                .each(function(line) {
                    resultados.push(line);
                })
                .then(function(count) {
                    fulfill(resultados);
                })
                .caught(function(err) {
                    reject(err);
                }); 

      })
    }//fim da function


    exports.carregaQuadras = function(){
        return new Promise(function(fulfill, reject){
            
           rlp.createInterface({
                    terminal: false,
                    input: fs.createReadStream('./model/quadras.csv')
                })
                .each(function(line) {
                    quadras.push(line);
                })
                .then(function(count) {
                    fulfill(quadras);
                })
                .caught(function(err) {
                    reject(err);
                });
      })
    }//fim da function

    


    var getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }


    exports.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }


    exports.positionSubstring = function(){
    var array = [0,2,4,6];
    var indice = 0;
    
        var pos = getRandomInt(0,4);
        var indice =  array[pos]
        array.splice(pos, 1);
        array.push(indice);

    
    return array;
    }   



    exports.tiraDezena = function(dezena, sena){
           var indice = sena.indexOf(dezena);


            if(indice > -1){
                sena.splice(indice, 1);
            }
            

        return sena;
    }



   exports.geraString = function(aux)//adiciono um array com a combinação de quadras
    {

        //console.log('geraString linha 196 ' + aux.length);
        //console.log('geraString linha 197 ' +aux);
           
            var q = aux.length - 4;
            var array = [];

            for(var i = 0; i <= q; i++)
            {
                    for(var j = i + 1; j <= q + 1; j++)
                {
                        if(j === i){continue;}
                            for(var k = j + 1; k <= q + 2; k++)
                    {
                                if(k === j){continue;}
                                    for(var l = k + 1; l <= q + 3; l++)
                        {
                                        if(l === k){continue;}
                                        
                                        array.push(aux[i]+""+aux[j]+""+aux[k]+""+aux[l]);
                                        //console.log(aux[i]+""+aux[j]+""+aux[k]+""+aux[l])
                        

                                        if(i === q){

                                            return array;
                                        }
                        }

                    }
                
                }
            
            }  

    };



    exports.geraDuplas = function(aux)//adiciono um array com a combinação de quadras
    {

        //console.log('geraString linha 196 ' + aux.length);
        //console.log('geraString linha 197 ' +aux);
           
            var q = aux.length - 2;
            var array = [];

            for(var i = 0; i <= q; i++)
            {
                    for(var j = i + 1; j <= q + 1; j++)
                {
                        if(j === i){continue;}
                                                                   
                            array.push(aux[i]+""+aux[j]);
                            //console.log(aux[i]+""+aux[j])
                        
                                if(i === q){
                                    return array;
                                }
                }
            }  

    };


   