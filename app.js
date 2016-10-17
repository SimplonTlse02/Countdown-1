(function(){
	var app = {
		timeRun: false,
		timerMin: null,
		timerSec: null,
		timer: null,
		intervalID: null,
		progressID: null,
		
		init: function(){
			app.listeners();
		},

		listeners: function(){
			$("#start").on("click", app.start);
			$("#pause").on("click", app.pause);
			$("#reset").on("click", app.reset);
		},

		inputValue: function(){
			app.timerMin = $("#min").val();
			app.timerSec = $("#sec").val();
			app.timer = parseInt(app.timerMin, 10)*60 + parseInt(app.timerSec, 10);
		},

		start: function(){
			app.inputValue();
			app.interval();
		},

		interval: function(){
			app.timeRun = true;
			app.intervalID = setInterval(app.decrement, 1000);
			app.progressID = setInterval(app.progress, 1000);
		},

		decrement: function(){
			app.timer--;
			
			if(app.timer <= 0){
				app.stop();
			}

			app.updateView();
		},

		updateView: function(){
			var minutes = parseInt(app.timer/60, 10);
			var secondes = parseInt(app.timer%60, 10);
			$("span").html(minutes + ":" + secondes);
		},

		stop: function(){
			app.timeRun = false;
			clearInterval(app.intervalID);
			clearInterval(app.progressID);
		},

		pause: function(){
			if(app.timeRun){
				app.stop();
			} else{
				app.interval();
			}
		},

		reset: function(){
			app.stop();
			app.start();
		},

		progress: function(){
			var largeur = $("#chargement").css("width");
			var width = 100;
			
			if(width <= 0){
				app.stop();
			} else{
				width--;
				largeur = width - "%";
			}

		}
	};

	app.init();

})();