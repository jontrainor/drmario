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
		p.initialize(ctx, x, y, lColor, rColor) {
/*			this._ctx = ctx;
			this.x = x;
			this.y = y;
			this.lBlock = new Block(ctx, x, y, lColor);
			this.rBlock = new Block(ctx, x+20, y+20, rColor);
*/		}

	//public methods
		p.draw() {
			this.lBlock.draw();
			this.rBlock.draw();
		}
		
	window.Pill = Pill;
	console.log('Pill.js initialized');
}(window));