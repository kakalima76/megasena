var normaliza = function(value){
	if (value < 10) {
		return 0 + "" + value;
	}

	return value;
}

/*var combina = function(value)//adiciono um array com a combinação de quadras
	{
  		return new Promise(function (fulfill, reject)
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
										
										array.push(normaliza(value[i])+""+normaliza(value[j])+""+normaliza(value[k])+""+normaliza(value[l]))
						
										if(i === q){
											fulfill(array);
										}
						}

					}
				
				}
			
			}  
		
		})

	};
*/

	module.exports.combinaSync = function(value)//adiciono um array com a combinação de quadras
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
										
										array.push(normaliza(value[i])+""+normaliza(value[j])+""+normaliza(value[k])+""+normaliza(value[l]))
						
										if(i === q){

											return array;
										}
						}

					}
				
				}
			
			}  

	};


01020405052038