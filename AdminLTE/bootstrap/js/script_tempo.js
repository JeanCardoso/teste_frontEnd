 $(document).ready(function(){		
	
	var climaCidade = function(nomeCidade){
        if(nomeCidade == ''){
            alert('Digite o nome de uma cidade para obter a previão do tempo!');
        } else {
         	$.get('http://api.wunderground.com/api/e58b743d482f0c1b/forecast10day/conditions/forecast/lang:BR/q/Brazil/' + nomeCidade + '.json', function(data){
				
				console.log(data);

				var cont;
				var maiorTemp = 0;
				var menorTemp = 9999;
				var diaMaiorTemp;
				var diaMenorTemp;
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

					if (cont <= 6) {
						diasPrevisao[cont] = (data.forecast.simpleforecast.forecastday[cont].date.day + "/" + data.forecast.simpleforecast.forecastday[cont].date.month);
						tempDias[cont] = data.forecast.simpleforecast.forecastday[cont].high.celsius;
					}

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
    }

    var cidadeAtual = function(nomeCidade){
    	$('#content_cidadeAtual').html("<div id='cidadeAtual'> A cidade atual é: " + nomeCidade);
    }

    $('.buscar-cidade').click(function(){
    	var nomeCidade = $('#cidade').val();
		climaCidade(nomeCidade);
		cidadeAtual(nomeCidade);
	});

	$('.cidade-favorita').click(function(){
		var cidadeFavorita;
		cidadeFavorita = $('#cidade').val();
		Cookies.set('cidadeFavorita', cidadeFavorita, { expires: 1 });
	});

    if (Cookies.get('cidadeFavorita') != ''){
    	climaCidade(Cookies.get('cidadeFavorita'));
    	cidadeAtual(Cookies.get('cidadeFavorita'));
    } else {
    	climaCidade('blumenau');
    	cidadeAtual('blumenau');
    }
});