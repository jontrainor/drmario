(function(window) {
	var Pill = function(spriteSheet, x, y, lColor, rColor, n) {
		this.initialize(spriteSheet, x, y, lColor, rColor, n);
	}
	
	var p = Pill.prototype = new Container();
	
	//public properties
		
	//private properties
		p._ctx = null;
		
	//constructor
		p.initialize = function(spriteSheet, x, y, lColor, rColor, n) {
			var 
			this.lBlock = new BitmapAnimation(spriteSheet);
			this.lBlock.gotoAndStop(lColor);
			this.lBlock.x = x;
			this.lBlock.y = y;
			
			this.rBlock = new BitmapAnimation(spriteSheet);
			this.rBlock.gotoAndStop(rColor);
			this.rBlock.x = x + 20;
			this.rBlock.y = y;
		}

	//public methods
		
		p.moveLeft = function() {
			this.lBlock.x = this.lBlock.x - 20;
			this.rBlock.x = this.rBlock.x - 20;
		}
		
		p.moveRight = function() {
			this.rBlock.x = this.rBlock.x + 20;
			this.lBlock.x = this.lBlock.x + 20;
		}
		
	window.Pill = Pill;
	console.log('Pill.js initialized');
}(window));