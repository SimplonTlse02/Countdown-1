(function(){
	var app = {
		timeRun: false,
		timerMin: null,
		timerSec: null,
		intervalID: null,
		timer: null,
		
		init: function(){
			app.listeners();
		},

		listeners: function(){
			$("#start").on("click", app.start);
			$("#pause").on("click", app.pause);
			$("#reset").on("click", app.reset);
		},

		start: function(){
			app.timerMin = $("#min").val();
			app.timerSec = $("#sec").val();
			app.timer = app.timerMin *60 + app.timerSec,
			app.intervalID = setInterval(app.decrement, 1000);
		},

		decrement: function(){
			app.timer--;
			app.updateView();
		},

		updateView: function(){
			var minutes = parseInt(app.timer/60, 10);
			var secondes = parseInt(app.timer%60, 10);
			$("h1").html(minutes + ":" + secondes);

			if(secondes === 0){
				app.stop();
			}
		},

		stop: function(){
			clearInterval(app.intervalID);
		},

		pause: function(){
			if(!app.timeRun){
				app.stop();
			} else{
				app.start();
			}

			app.timeRun = !app.timeRun;
		},

		reset: function(){
			$("h1").html("0:00");
			app.stop();
			app.timerMin;
			app.timerSec;
		}
	};

	app.init();

})();