 $(document).ready(function(){

   $('.buscar-cidade').click(function(){
	   
        var nomeCidade = $('#cidade').val();

         if(nomeCidade == ''){

            //$('#poster').html("<h2 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</h2>");

         } else {

           // $('#poster').html("<h2 class='loading'>Your poster is on its way!</h2>");

            $.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + nomeCidade + '&mode=json&units=metric&cnt=7&APPID=42c1148f010111d8cafc7598f3b40baf', function(data){
				
				console.log(data);
				
				// data.list     é o array com o clima dos dias
				
				var day1 = data.list[0];
				var primeiroDia = day1.temp.max;
				var dataPrimeiroDia = new Date(day1.dt * 1000);
				
				console.log(dataPrimeiroDia);
				
				console.log("Vai fazer "+ primeiroDia +" C no primeiro dia.");
				console.log("Referente ao dia "+ dataPrimeiroDia.getDate() + "/" + (dataPrimeiroDia.getMonth() + 1));
				
			});
			 
			 
        }

	});

});