var Game = function() {

	var _canvas = null,
		 _buffer = null,
		 canvas = null,
		 buffer = null,
		 gameLoop = null;
	
	var init = function() {
		//Initialize canvas and buffer
		_canvas = document.getElementById('gameCanvas');
		if (_canvas && _canvas.getContext) {
			canvas = _canvas.getContext('2D');
			
			_buffer = document.createElement('canvas');
			_buffer.width = _canvas.width;
			_buffer.height = _canvas.height;
			buffer = _buffer.getContext('2D');
			
			buffer.strokeStyle = "rgb(255,255,255)";
			buffer.fillStyle = "rgb(255,255,255)";
			buffer.font = "bold 25px sans-serif";
		};
		
		//Initialize player
		var player = {
			x: 0,
			y: height/2,
			r: 10,
			speed: 5
		};
	};
	
	var update = function() {
		player.x += player.speed;
	};
	
	var draw = function() {
		buffer.clearRect(0,0, _buffer.width, _buffer.height);
		canvas.clearRect(0,0, _canvas.width, _canvas.height);
		
		//draw player
		buffer.beginPath();
		buffer.acr(player.x, player.r, 0, Math.PI*2, true);
		buffer.fill();
		buffer.closePath();
		
		canvas.drawImage(_buffer, 0, 0);
	};
	
	var loop = function() {
		update();
		draw();
	};
	
	var run = function() {
		if(canvas != null) {
			gameLoop = setInterval(loop, 30);
		}
	}
};

init();
run();
