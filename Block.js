(function(window) {
	colorDict = {
		white: 'rgb(0,0,0)',
		black: 'rgb(255,255,255)',
		red: 'rgb(255,0,0)',
		blue: 'rgb(0,0,255)',
		yellow: 'rgb(255,255,0)'
	};
	var Block = function() {
		this.initialize();
	}
	
	var p = Block.prototype;
	
	//public properties:
		p.x = 0;
		p.y = 0;
	
	//private properties:
		p._ctx = null;
		p._color = null;
		p._height = 50;
		p._width = 50;
		p._radius = 10;
		
	//constructor:
		p.initalize = function() {
			//do nothing
		}
	
	//public methods
		p.draw = function(ctx, x, y, width, height, radius, color) {
			ctx.strokeStyle = colorDict.black;
			ctx.fillStyle = colorDict.color;
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
}(window));