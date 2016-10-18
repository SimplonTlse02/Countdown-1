
(function(){
	"use strict";
	
	var app = {
		timeRun: false,
		timerMin: null,
		timerSec: null,
		timerMax: null,
		timer: null,
		timerDefault: 10,
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
		
		stop: function(){
			this.timeRun = false;
			clearInterval(this.intervalID);
		},

		inputValue: function(){
			this.timerMin = $("#min").val() || 0;
			this.timerSec = $("#sec").val() || this.timerDefault;
			this.timer = parseInt(this.timerMin, 10)*60 + parseInt(this.timerSec, 10);
			this.timerMax = this.timer;
		},

		interval: function(){
			this.timeRun = true;
			this.intervalID = setInterval(this.decrement.bind(this), 1000);
		},

		decrement: function(){
			this.timer--;
			this.temps();
			this.progress();
			if(this.timer <= 0){
				this.stop();
				$("#chargement").text("0%");
				$("#compteur").html('<iframe width="560" height="315" src="https://www.youtube.com/embed/Wgwp0waFRxA?autoplay=1" frameborder="0" allowfullscreen></iframe>');
			}
		},

		temps: function(){
			var minutes = parseInt(this.timer/60, 10);
			var secondes = parseInt(this.timer%60, 10);
			$("#compteur").html(minutes + ":" + secondes);
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
			$("#bordure").css("width", width + "%");
			$("#chargement").text(width + "%");
		}
	};

	app.init();

})();