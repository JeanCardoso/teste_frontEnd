 $(document).ready(function(){

    //$.get('http://api.wunderground.com/api/e58b743d482f0c1b/forecast/q/CA/San_Francisco.json', function(data){
		
	//	console.log(data);
		
		/*var cont;
		var maiorTemp = 0;
		var menorTemp = 9999;
		var diaMaiorTemp = new Date();
		var diaMenorTemp = new Date();
		// data.list     é o array com o clima dos dias
		for (cont = 0; cont < (data.list).length; cont++){
			if (data.list[cont].temp.max > maiorTemp) {
				maiorTemp = data.list[cont].temp.max;
				diaMaiorTemp = new Date(data.list[cont].dt * 1000);
			} else if (data.list[cont].temp.min < menorTemp){
				menorTemp = data.list[cont].temp.min;
				diaMenorTemp = new Date(data.list[cont].dt * 1000);
			}
		}
		
		$('#box1').html("<div='content_box1'> A maior temperatura será de "+ maiorTemp +"ºC, no dia "+ diaMaiorTemp.getDate() +"/"+ (diaMaiorTemp.getMonth() + 1) +"</p> <p>E a menor temperatura será de "+ menorTemp +"ºC, no dia "+ diaMenorTemp.getDate() +"/"+ (diaMenorTemp.getMonth() + 1) +"</p>");
		*/
	//});	 	 

   $('.buscar-cidade').click(function(){
	   
        var nomeCidade = $('#cidade').val();

        if(nomeCidade == ''){

            //$('#poster').html("<h2 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</h2>");
        } else {
         	$.get('http://api.wunderground.com/api/e58b743d482f0c1b/forecast10day/conditions/forecast/lang:BR/q/Brazil/' + nomeCidade + '.json', function(data){
				
				console.log(data);

				var cont;
				var maiorTemp = 0;
				var menorTemp = 9999;
				var diaMaiorTemp;
				var diaMenorTemp = new Date();
				var recomendPraia = true;
				var diasPrevisao = [];
				var tempDias = [];

				for (cont = 0; cont < (data.forecast.simpleforecast.forecastday).length; cont++){
					if (data.forecast.simpleforecast.forecastday[cont].high.celsius > maiorTemp) {
						maiorTemp = data.forecast.simpleforecast.forecastday[cont].high.celsius;
						diaMaiorTemp = (data.forecast.simpleforecast.forecastday[cont].date.day + " de " + data.forecast.simpleforecast.forecastday[cont].date.monthname);
					} else if (data.forecast.simpleforecast.forecastday[cont].low.celsius < menorTemp){
						menorTemp = data.forecast.simpleforecast.forecastday[cont].low.celsius;
						diaMenorTemp = (data.forecast.simpleforecast.forecastday[cont].date.day + " de " + data.forecast.simpleforecast.forecastday[cont].date.monthname);
					}

					if ((data.forecast.simpleforecast.forecastday[cont].date.weekday = "Sábado") || (data.forecast.simpleforecast.forecastday[cont].date.weekday = "Domingo")){
						if ((data.forecast.simpleforecast.forecastday[cont].conditions != "Céu Limpo") || (data.forecast.simpleforecast.forecastday[cont].high.celsius < "25")){
							recomendPraia = false;
						}
					}

					/*if (cont <= 6) {
						diasPrevisao[cont] = (data.forecast.simpleforecast.forecastday[cont].date.day + "/" + data.forecast.simpleforecast.forecastday[cont].date.month);
						tempDias[cont] = data.forecast.simpleforecast.forecastday[cont].high.celsius;
					}

					var graficoTemp = {
    					labels: diasPrevisao,
    					datasets: [
	        				{
					            label: "My First dataset",
					            fill: false,
					            lineTension: 0.1,
					            backgroundColor: "rgba(75,192,192,0.4)",
					            borderColor: "rgba(75,192,192,1)",
					            borderCapStyle: 'butt',
					            borderDash: [],
					            borderDashOffset: 0.0,
					            borderJoinStyle: 'miter',
					            pointBorderColor: "rgba(75,192,192,1)",
					            pointBackgroundColor: "#fff",
					            pointBorderWidth: 1,
					            pointHoverRadius: 5,
					            pointHoverBackgroundColor: "rgba(75,192,192,1)",
					            pointHoverBorderColor: "rgba(220,220,220,1)",
					            pointHoverBorderWidth: 2,
					            pointRadius: 1,
					            pointHitRadius: 10,
					            data: tempDias[],
					            spanGaps: false,
					        }
				    	]
					};*/

					$('#box1').html("<div id='content_box1'> A maior temperatura será de "+ maiorTemp +"ºC, no dia "+ diaMaiorTemp +"</p> <p>E a menor temperatura será de "+ menorTemp +"ºC, no dia "+ diaMenorTemp +"</p>");
					
					if (recomendPraia == true){
						$('#box2').html("<div id='content_box2'> O tempo estará com céu limpo e a temperatura acima de 25ºC no final de semana! Então, a praia é uma boa opção de passeio! ");
					} else {
						$('#box2').html("<div id='content_box2'> O final de semana não terá tempo limpo e nem temperatura muito agradável para ir à praia! Que tal um outro passeio? ");	
					}

					//$('#box3').html("<div id='content_box3'><div class='chart'><canvas id='graficoTemp' style='height:250px'></canvas></div>");
				}	
			});	 	 
        }
	});
});