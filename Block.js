(function(window) {
	
	var Block = function(ctx, x, y, color) {
		this.initialize(ctx, x, y, color);
	}
	
	var p = Block.prototype;
	
	//public properties:
		p.x = 0;
		p.y = 0;
	
	//private properties:
		p._ctx = null;
		p._color = null;
		p._height = 20;
		p._width = 20;
		p._radius = 8;
		
	//constructor:
		p.initialize = function(ctx, x, y, color) {
			this._ctx = ctx;
			this.x = x;
			this.y = y;
			this._color = color;
		}
	
	//public methods
		p.draw = function() {
			var ctx = this._ctx,
				x = this.x,
				y = this.y,
				width = this._width,
				height = this._height,
				radius = this._radius,
				color = this._color;
			console.log(colorDict[color]);
			
			ctx.strokeStyle = colorDict['black'];
			ctx.fillStyle = colorDict[color];
		   	ctx.beginPath();
		    ctx.moveTo(x + radius, y);
			ctx.lineTo(x + width - radius, y);
		    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		    ctx.lineTo(x + width, y + height - radius);
		    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		    ctx.lineTo(x + radius, y + height);
		    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		    ctx.lineTo(x, y + radius);
		    ctx.quadraticCurveTo(x, y, x + radius, y);
		    ctx.closePath();
			ctx.stroke();
			ctx.fill();     
		}
		window.Block = Block;
		console.log('Block.js initialized');
}(window));