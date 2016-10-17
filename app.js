(function(){
	var app = {
		timeRun: false,
		timerMin: null,
		timerSec: null,
		timer: null,
		defaultTimer: 90,
		intervalID: null,
		
		init: function(){
			app.listeners();
		},

		listeners: function(){
			$("#start").on("click", app.start);
			$("#pause").on("click", app.pause);
			$("#reset").on("click", app.reset);
		},

		time: function(){
			app.timerMin = $("#min").val();
			app.timerSec = $("#sec").val();
		},

		start: function(){
			app.time();
			app.timer = parseInt(app.timerMin, 10)*60 + parseInt(app.timerSec, 10);
			app.interval();
		},

		interval: function(){
			app.intervalID = setInterval(app.decrement, 1000);
		},

		decrement: function(){
			app.timer--;
			
			if(app.timer === 0){
				app.stop();
			}

			app.updateView();
		},

		updateView: function(){
			var minutes = parseInt(app.timer/60, 10);
			var secondes = parseInt(app.timer%60, 10);
			$("h1").html(minutes + ":" + secondes);
		},

		stop: function(){
			clearInterval(app.intervalID);
		},

		pause: function(){
			if(!app.timeRun){
				app.stop();
			} else{
				app.interval();
			}

			app.timeRun = !app.timeRun;
		},

		reset: function(){
			app.stop();
			app.defaultTimer = app.start();
		}
	};

	app.init();

})();