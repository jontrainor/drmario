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
	var testBlock;
		
	function init() {
		canvas.obj = document.getElementById("gameCanvas");
		if (canvas.obj && canvas.obj.getContext) {
			canvas.ctx = canvas.obj.getContext("2d");
		
		}
		testBlock = new Block(canvas.ctx,canvas.obj.width/2,canvas.obj.height/2,'blue');
	}
	
	function run() {
		if (canvas.ctx != null) {
			canvas.gameLoop = setInterval(loop,50);
		}
	}
	
	function update() {
		testBlock.x = testBlock.x + 2;
	}
	
	function draw() {
		canvas.ctx.clearRect(0,0,canvas.obj.width,canvas.obj.height);
		testBlock.draw();
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