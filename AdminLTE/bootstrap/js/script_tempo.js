 $(document).ready(function(){

   $('.buscar-cidade').click(function(){
	   
        var nomeCidade = $('#cidade').val();

         if(nomeCidade == ''){

            //$('#poster').html("<h2 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</h2>");

         } else {
            $.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + nomeCidade + '&mode=json&units=metric&cnt=7&APPID=42c1148f010111d8cafc7598f3b40baf', function(data){
				
				console.log(data);
				
				var cont;
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

				console.log("A maior temperatura será "+ maiorTemp +" C.");
				console.log("No dia "+ diaMaiorTemp.getDate() + "/" + (diaMaiorTemp.getMonth() + 1));
				console.log("A menor temperatura será "+ menorTemp +" C.");
				console.log("No dia "+ diaMenorTemp.getDate() + "/" + (diaMenorTemp.getMonth() + 1));

			});
			 
			 
        }

	});

});