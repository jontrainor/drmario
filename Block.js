(function(window) {
	
	var Block = function(spriteSheet, x, y, color) {
		this.initialize(spriteSheet, x, y, color);
	}
	
	var p = Block.prototype;
	
	//public properties:
	//none
		
	//constructor:
		p.initialize = function(spriteSheet, x, y, color) {
			this = new BitmapAnimation(spriteSheet);
			this.x = x;
			this.y = y;
			this.gotoAndStop(color);
		}
	//public methods

		window.Block = Block;
		console.log('Block.js initialized');
}(window));