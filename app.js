
(function(){
	"use strict";
	
	var app = {
		timeRun: false,
		timerMin: null,
		timerSec: null,
		timerMax: null,
		timerDefault: 180,
		timer: null,
		intervalID: null,
		progressID: null,
		
		init: function(){
			this.listeners();
		},

		listeners: function(){
			$("#start").on("click", this.start.bind(this));
			$("#pause").on("click", this.pause.bind(this));
			$("#reset").on("click", this.reset.bind(this));
		},

		start: function(){
			this.stop();
			this.inputValue();
			this.interval();
		},

		inputValue: function(){
			this.timerMin = $("#min").val();
			this.timerSec = $("#sec").val();
			this.timer = parseInt(this.timerMin, 10)*60 + parseInt(this.timerSec, 10);
			this.timerMax = this.timer;
		},

		interval: function(){
			this.timeRun = true;
			this.intervalID = setInterval(this.decrement.bind(this), 1000);
		},

		decrement: function(){
			var minutes = parseInt(this.timer/60, 10);
			var secondes = parseInt(this.timer%60, 10);
			$("#compteur").html(minutes + ":" + secondes);
			this.progress();
			this.timer--;
			if(this.timer < 0){
				this.stop();
				$("#chargement").text("0%");
			}
		},

		stop: function(){
			this.timeRun = false;
			clearInterval(this.intervalID);
		},

		pause: function(){
			if(this.timeRun){
				this.stop();
			} else{
				this.interval();
			}
		},

		reset: function(){
			this.stop();
			this.start();
		},

		progress: function(){
			var width = parseInt(this.timer*100/this.timerMax, 10);
			$("#chargement").css("width", width + "%");
			$("#chargement").text(width + "%");
		}
	};

	app.init();

})();