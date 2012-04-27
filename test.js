window.onload = function() {
	//initialize objects
	var canvas = null;
	var stage = null;
	var screen_width = null;
	var screen_hight = null;
	var blockSpriteSheetAsset = new Image();
	var blockSS = null;
	var testPill = null;
	var gameSpeed = 2,
		playerSpeed = .1;
	
	//key events
	var keyPress = {
		left: false,
		right: false,
		up: false,
		down: false,
		a: false,
		s: false,
		shouldMove: true,
		s: false
	};
	window.onkeydown = function(e) {
		keyPress.shouldMove = true;
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
		canvas = document.getElementById("gameCanvas");

		blockSpriteSheetAsset.onload = handleImageLoad;
		blockSpriteSheetAsset.onerror = handleImageError;
		blockSpriteSheetAsset.src = "assets/block.png";

	}
	
	function handleImageLoad(e) {
		console.log(e.target.src + " loaded")
		startGame();
	}
	
	function handleImageError(e) {
		console.log("Error Loading Image : " + e.target.src);
	}
	
	function startGame() {
		
		stage = new Stage(canvas);
		screen_width = canvas.width;
		screen_height = canvas.height;
		
		blockSS = new SpriteSheet({
			images:[blockSpriteSheetAsset],
			frames: {width:20, height:20, regX:10, regY:10, numFrames:6},
			animations: {
				red: [0],
				yellow: [1],
				blue: [2],
				redVirus: [3],
				yellowVirus: [4],
				blueVirus: [5]
			}
		});
		
		testPill = new Pill(blockSS,300,300,"redVirus","blue");
		stage.addChild(testPill.lBlock, testPill.rBlock);
		stage.update();
		
		
		Ticker.useRAF = true;
		Ticker.setFPS(60);
		Ticker.addListener(window);
	}
	
	function tick() {
		console.log("test");
		if (keyPress.left && keyPress.shouldMove) {
			testPill.moveLeft();
			keyPress.shouldMove = false;
		}
		if (keyPress.right && keyPress.shouldMove) {
			testPill.moveRight();
			keyPress.shouldMove = false;
		}
		stage.update();
	}
	
	window.tick = tick;
	init();

};