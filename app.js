
(function(){
	"use strict";
	
	var app = {
		timeRun: false,
		timerMin: null,
		timerSec: null,
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

		inputValue: function(){
			this.timerMin = $("#min").val();
			this.timerSec = $("#sec").val();
			this.timer = parseInt(this.timerMin, 10)*60 + parseInt(this.timerSec, 10);
		},

		start: function(){
			this.stop();
			this.inputValue();
			this.interval();
		},

		interval: function(){
			this.timeRun = true;
			this.intervalID = setInterval(this.decrement.bind(this), 1000);
			this.progressID = setInterval(this.progress.bind(this), 1000);
		},

		decrement: function(){
			var minutes = parseInt(this.timer/60, 10);
			var secondes = parseInt(this.timer%60, 10);
			$("#compteur").html(minutes + ":" + secondes);
			this.timer--;
			if(this.timer <= 0){
				this.stop();
			}
		},

		stop: function(){
			this.timeRun = false;
			clearInterval(this.intervalID);
			clearInterval(this.progressID);
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
			var largeur = $("#chargement").css("width", "100%");
			var width = 100;
			
			if(width <= 0){
				this.stop();
			} else{
				width--;
				largeur = (1 - largeur)/1 * width;
			}
		}
	};

	app.init();

})();