(function() {
	
	function Game() {
		this.gameLoop = null;
		var self = this;
		var canvasWidth = null;
		var canvasHeight = null;
		var player = {
			x: null,
			y: null,
			r: null,
			speed: null
		};
		var _canvas = null;
		var canvas = null;
		
		this.init = function() {
			_canvas = document.getElementById('gameCanvas');
			canvas = _canvas.getContext('2d');
			canvasWidth = _canvas.width;
			canvasHight = _canvas.height;
			
			player.x = canvasWidth/2;
			player.y = canvasHeight/2;
			player.r = 10;
			player.speed = 2;
			
			self.clear();
			
		}
		
		this.clear = function() {
			canvas.fillStyle = 'rgb(255,255,255)';
			canvas.fillRect(0, 0, canvasWidth, canvasHeight);
		}
		
		this.run = function() {
			self.gameLoop = setInterval(self.loop, 30);
		}
		
		this.update = function() {
			player.x = player.x + player.speed;
		}
		
		this.draw = function() {
			canvas.fillStyle = 'rgb(0, 0, 0)';
			canvas.beginPath();
			canvas.car(player.x, player.y, player.r, 0, Math.PI*2, true);
			canvas.fill();
			canvas.closePath();
		}
		
		this.loop = function() {
			self.update();
			self.draw();
		}
	}

}());