window.onload = function() {
	//initialize objects
	var canvas = {
		obj: null,
		ctx: null,
		gameLoop: null
	};
	var color = {
		black: 'rgb(255,255,255)',
		white: 'rgb(0,0,0)'
	};
	var testPill;
	var gameSpeed = 2,
		playerSpeed = .1;
	
	//key events
	var keyPress = {
		left: false,
		right: false,
		up: false,
		down: false,
		a: false,
		s: false
	};
	window.onkeydown = function(e) {
		switch (e.keyCode) {
			case 37:
				keyPress.left = true;
				break;
			case 38:
				keyPress.up = true;
				break;
			case 39:
				keyPress.right = true;
				break;
			case 40:
				keyPress.down = true;
				break;
			case 65:
				keyPress.a = true;
				break;
			case 83:
				keyPress.s = true;
				break;
		}
	}
	
	window.onkeyup = function(e) {
		switch (e.keyCode) {
			case 37:
				keyPress.left = false;
				break;
			case 38:
				keyPress.up = false;
				break;
			case 39:
				keyPress.right = false;
				break;
			case 40:
				keyPress.down = false;
				break;
			case 65:
				keyPress.a = false;
				break;
			case 83:
				keyPress.s = false;
				break;
		}
	}
		
	function init() {
		canvas.obj = document.getElementById("gameCanvas");
		if (canvas.obj && canvas.obj.getContext) {
			canvas.ctx = canvas.obj.getContext("2d");
		
		}
		testPill = new Pill(canvas.ctx,canvas.obj.width/2,canvas.obj.height/2,'blue','yellow');
	}
	
	function run() {
		if (canvas.ctx != null) {
			canvas.gameLoop = setInterval(loop,50);
		}
	}
	
	function update() {
		if (keyPress.left) { testPill.moveLeft(playerSpeed); }
		if (keyPress.right) { testPill.moveRight(playerSpeed); }
	}
	
	function draw() {
		canvas.ctx.clearRect(0,0,canvas.obj.width,canvas.obj.height);
		testPill.draw();
		/*
		canvas.ctx.beginPath();
		canvas.ctx.arc(player.x, player.y, player.r, 0, Math.PI*2, true);
		canvas.ctx.fill();
		canvas.ctx.closePath();
		*/
	}
	
	function loop() {
		update();
		draw();
	}
	
	init();
	run();

};