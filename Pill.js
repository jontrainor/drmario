(function(window) {	
	var Pill = function(spriteSheet, x, y, lColor, rColor) {
		this.initialize(spriteSheet, x, y, lColor, rColor);
	}
	
	var p = Pill.prototype = new Container();
	
	//public properties
		p.direction = null;
	//private properties
		
	//constructor
		p.initialize = function(spriteSheet, x, y, lColor, rColor) {
			this.x = x;
			this.y = y;
			var lBlock = new BitmapAnimation(spriteSheet);		
			lBlock.gotoAndStop(lColor);
			
			var rBlock = new BitmapAnimation(spriteSheet);
			rBlock.gotoAndStop(rColor);
			rBlock.x = gGridSpace;
			
			this.addChild(lBlock,rBlock);
			this.direction = 'down';
		}

	//public methods
	
		p.turnCW = function() {
			this.rotation += 90;	
			switch (this.direction) {
				case 'down':
					this.x += gGridSpace;
					this.y -= gGridSpace;
					this.direction = 'right';
					break;
				case 'right':
					this.y += gGridSpace;
					this.direction = 'up';
					break;
				case 'up':
					this.direction = 'left';
					break;
				case 'left':
					this.x -= gGridSpace;
					this.direction = 'down';
					break;
			}
		}
		
		p.turnCCW = function() {
			this.rotation -= 90;
			switch (this.direction) {
				case 'down':
					this.direction = 'left';
					break;
				case 'left':
					this.x += gGridSpace;
					this.direction = 'up';
					break;
				case 'up':
					this.x -= gGridSpace;
					this.y -= gGridSpace;
					this.direction = 'right';
					break;
				case 'right':
					this.y += gGridSpace;
					this.direction = 'down';
					break;
			}
		}
		
		p.moveLeft = function() {
			this.x -= gGridSpace;
		}
		
		p.moveRight = function() {
			this.x += gGridSpace;
		}
		
		p.moveDown = function() {
			this.y += gGridSpace;
		}
		
		p.isLeftBorder = function() {
			if ((this.direction != 'up' && this.x <= 230) || (this.direction == 'up' && this.x <= 250)) {
				return true;
			}
			return false;
		}
		
		p.isRightBorder = function() {
			if ((this.direction != 'down' && this.x >= 410) || (this.direction == 'down') && this.x >= 390) {
				return true;
			}
			return false;
		}
		
	window.Pill = Pill;
	console.log('Pill.js initialized');
}(window));