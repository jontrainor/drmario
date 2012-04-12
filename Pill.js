(function(window) {
	var Pill = function(ctx, x, y, lColor, rColor) {
		this.initialize(ctx, x, y, lColor, rColor);
	}
	
	var p = Pill.prototype;
	
	//public properties
		p.x = 0;
		p.y = 0;
		p.lBlock = null;
		p.rBlock = null;
		
	//private properties
		p._ctx = null;
		
	//constructor
		p.initialize = function(ctx, x, y, lColor, rColor) {
			this._ctx = ctx;
			this.x = x;
			this.y = y;
			this.lBlock = new Block(ctx, x, y, lColor);
			this.rBlock = new Block(ctx, x+20, y, rColor);
		}

	//public methods
<<<<<<< HEAD
		p.moveLeft = function() {
			this.lBlock.x = this.lBlock.x - 20;
			this.rBlock.x = this.rBlock.x - 20;
		}
		
		p.moveRight = function() {
			this.rBlock.x = this.rBlock.x + 20;
			this.lBlock.x = this.lBlock.x + 20;	
=======
		p.moveLeft = function(playerSpeed) {
			var _loops = 20/playerSpeed;
			for (var i=0;i < _loops;i++) {
				this.lBlock.x = this.lBlock.x - playerSpeed;
				this.rBlock.x = this.rBlock.x - playerSpeed;
			}
		}
		
		p.moveRight = function(playerSpeed) {
			var _loops = 20/playerSpeed;
			for (var i=0;i < _loops;i++) {
				this.rBlock.x = this.rBlock.x + playerSpeed;
				this.lBlock.x = this.lBlock.x + playerSpeed;
			}	
>>>>>>> aafa1be43247b9e577a3ba838d7f703e65449094
		}
		
		p.draw = function() {
			this.lBlock.draw();
			this.rBlock.draw();
		}
		
	window.Pill = Pill;
	console.log('Pill.js initialized');
}(window));