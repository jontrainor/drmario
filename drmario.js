$(function() {
	//set focus to canvas
	$('.gameCanvas').focus();

	//initialize objects
	var canvas = null;
	var stage = null;
	var screen_width = null;
	var screen_hight = null;
	var blockSpriteSheetAsset = new Image();
	var blockSS = null;
	var testPill = null;
	var testGrid = null;
	var tempBorder = null;
	var gameSpeed = 1000;
	var continueLoop = true;
	var level = 0;

	var currentTime = null;
	var checkTime = null;


	//key events
	var keyPress = {
		left: false,
		right: false,
		up: false,
		down: false,
		a: false,
		s: false,
		shouldMove: true,
		shouldTurn: true,
		s: false,
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
				keyPress.shouldTurn = true;
				keyPress.a = true;
				break;
			case 83:
				keyPress.shouldTurn = true;
				keyPress.s = true;
				break;
			//keypress 'p'
			case 80:
				pause();
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

	//start button
	$('.startButton').click(start);

	//pause button
	$('.pauseButton').click(pause);

	function start() {
		$('.startButton').unbind('click');
		$('.startButton p').html('GAME STARTED');
		startGame();
	}

	function pause() {
		if (!Ticker.getPaused()) {
			Ticker.setPaused(true);
			$('.pauseButton p').html('PAUSED');
		}
		else {
			Ticker.setPaused(false);
			$('.pauseButton p').html('PAUSE');
		}
	}

	function init() {
		//retrieves an array of all elements with this class
		canvas = $('.gameCanvas')[0];

		blockSpriteSheetAsset.onload = handleImageLoad;
		blockSpriteSheetAsset.onerror = handleImageError;
		blockSpriteSheetAsset.src = "assets/block.png";

	}

	function handleImageLoad(e) {
		console.log(e.target.src + " loaded");
		generateGame();
	}

	function handleImageError(e) {
		console.log("Error Loading Image : " + e.target.src);
	}

	function generateGame() {
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
				red_virus: [3],
				yellow_virus: [4],
				blue_virus: [5]
			}
		});
		//create temp game border
		var g = new Graphics();
		g.beginStroke(Graphics.getRGB(0,0,0)).drawRect(0,0,160,320);
		tempBorder = new Shape(g);
		tempBorder.x = 220;
		tempBorder.y = 140;
		stage.addChild(tempBorder);
		stage.update();
	}

	function startGame() {
		//get level
		level = parseInt($('.levelSelect option:selected').val());
		console.log('level is ' + $('.levelSelect option:selected').val());

		//create grid
		testGrid = new Grid(230,150);
		testGrid.initViruses(level,blockSS);

		//create test pill
		testPill = new Pill(blockSS,290,130,Grid.randomColor(),Grid.randomColor());
		stage.addChild(testGrid, testPill);
		stage.update();
		testGrid.print();

		Ticker.useRAF = true;
		Ticker.setFPS(60);
		Ticker.addListener(window);

		//start pill falling
		checkTime = Date.now();
		//window.setTimeout(movePill, gameSpeed);
	}

	function movePill() {
		if (continueLoop) {
			if (testPill.canMoveDown(testGrid)) {
				testPill.moveDown();
			}
			else {
				//check if the pill is above the top of the container
				if( testPill.y == 130 || (testPill.direction == 'left' && testPill.y == 150) ) {
					gameOver();
				}
				else {
					//write pill to grid
					testPill.writeToGrid(testGrid, stage);
					stage.update();
					testGrid.print();

					//create new pill
					testPill = new Pill(blockSS, 290, 130, Grid.randomColor(), Grid.randomColor());
					stage.addChild(testPill);
					var blocksToDestroy = testGrid.checkBlocks();
					if ( blocksToDestroy.length > 0 ) {
						continueLoop = false;
						window.setTimeout(destroyBlocks(blocksToDestroy), gameSpeed);
						return;
					}
				}
			}
			checkTime = Date.now();
			//window.setTimeout(movePill, gameSpeed);
		}
	}

	function destroyBlocks(blocksToDestroy) {
		testGrid.destroyBlocks( blocksToDestroy );
		testGrid.print();
		stage.update();

		//check if there are still viruses
		if ( testGrid.countViruses() <= 0 ) {
			gameOver();
			return;
		}

		window.setTimeout(mainDropBlocks, gameSpeed * 0.8);
	}

	function mainDropBlocks() {

		var checkAgain = testGrid.dropBlocks();
		testGrid.print();
		stage.update();
		var blocksToDestroy = testGrid.checkBlocks();
		if ( blocksToDestroy.length > 0 ) {
			testGrid.destroyBlocks( blocksToDestroy );
			testGrid.print();
			stage.update();

			//check if there are still viruses
		if ( testGrid.countViruses() <= 0 ) {
			gameOver();
			return;
		}

		}
		if (checkAgain) {
			window.setTimeout(mainDropBlocks, gameSpeed * 0.8);
		}
		else {
			continueLoop = true;
			checkTime = Date.now();
		}
	}

	function gameOver() {
		Ticker.setPaused(true);
		var gameOverText = new Text("GAME OVER", "36px bold Helvetica", "#000");
		gameOverText.x = screen_width/3;
		gameOverText.y = screen_height/2;
		stage.addChild(gameOverText);
		stage.update();
	}

	function tick() {
		//check pill should be forced down
		currentTime = Date.now();
		if ( currentTime - checkTime >= gameSpeed ) {
			movePill();
			return;
		}

		//pill moving/turning logic
		if (continueLoop) {
			if (keyPress.shouldMove) {
				if (testPill.canMoveDown(testGrid) && keyPress.down) {
					testPill.moveDown();
					checkTime = Date.now();
					keyPress.shouldMove = false;
				}
				if (keyPress.left && testPill.canMoveLeft(testGrid)) {
					testPill.moveLeft();
					keyPress.shouldMove = false;
				}
				if (keyPress.right && testPill.canMoveRight(testGrid)) {
					testPill.moveRight();
					keyPress.shouldMove = false;
				}
				if (keyPress.shouldTurn) {
					if (keyPress.s && testPill.canTurnCW(testGrid)) {
						testPill.turnCW(testGrid);
						keyPress.shouldTurn = false;
					}
					if (keyPress.a && testPill.canTurnCCW(testGrid)) {
						testPill.turnCCW(testGrid);
						keyPress.shouldTurn = false;
					}
				}
			}
		}
		stage.update();
		//console.log(testPill.x + ', ' + testPill.y);
	}

	window.tick = tick;
	init();

});