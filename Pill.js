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
			lBlock.name = 'lBlock';
			lBlock.gotoAndStop(lColor);
			
			var rBlock = new BitmapAnimation(spriteSheet);
			rBlock.name = 'rBlock';
			rBlock.gotoAndStop(rColor);
			rBlock.x = gGridSpace;
			
			this.addChild(lBlock,rBlock);
			this.direction = 'down';
		}
	//private methods
		p._isLeftBorder = function(grid) {
			var initX = grid.getInitX();
			if ((this.direction != 'up' && this.x <= initX) || (this.direction == 'up' && this.x <= initX + gGridSpace)) {
				return true;
			}
			return false;
		}
		
		p._isRightBorder = function(grid) {
			var initX = grid.getInitX();
			if ((this.direction != 'down' && this.x >= initX + 7*gGridSpace) || (this.direction == 'down') && this.x >= initX + 6*gGridSpace) {
				return true;
			}
			return false;
		}


	//public methods
	
		p.turnCW = function(grid) {
			var initX = grid.getInitX();
			this.rotation += 90;	

			switch (this.direction) {
				case 'down':
					this.y -= gGridSpace;
					this.direction = 'right';
					break;
				case 'right':
					if (this.x != initX + 7*gGridSpace) {
						this.x += gGridSpace;
					}
					this.y += gGridSpace;
					this.direction = 'up';
					break;
				case 'up':
					this.x -= gGridSpace;
					this.direction = 'left';
					break;
				case 'left':
					if (this.x == initX + 7*gGridSpace) {
						this.x -= gGridSpace;
					}
					this.direction = 'down';
					break;
			}
		}
		
		p.turnCCW = function(grid) {
			var initX = grid.getInitX();
			this.rotation -= 90;

			switch (this.direction) {
				case 'down':
					this.direction = 'left';
					break;
				case 'left':
					if (this.x != initX + 7*gGridSpace) {
						this.x += gGridSpace;
					}
					this.direction = 'up';
					break;
				case 'up':
					this.x -= gGridSpace;
					this.y -= gGridSpace;
					this.direction = 'right';
					break;
				case 'right':
					if (this.x == initX + 7*gGridSpace) {
						this.x -= gGridSpace;
					}
					this.y += gGridSpace;
					this.direction = 'down';
					break;
			}
		}

		p.canTurnCW = function(grid) {
			var x = this.x;
			var y = this.y;

			switch (this.direction) {
				case 'down':
					return (grid.getGridValue( x, y - gGridSpace ) == ' ') ? true : false;
				case 'right':
					return (grid.getGridValue( x + gGridSpace, y + gGridSpace ) == ' ') ? true : false;
				case 'up':
					return (grid.getGridValue( x - gGridSpace, y - gGridSpace ) == ' ') ? true : false;
				case 'left':
					return (grid.getGridValue( x + gGridSpace, y ) == ' ') ? true : false;
			}
		}

		p.canTurnCCW = function(grid) {
			var x = this.x;
			var y = this.y;
			
			switch (this.direction) {
				case 'down':
					return (grid.getGridValue( x, y - gGridSpace ) == ' ') ? true : false;
				case 'left':
					return (grid.getGridValue( x + gGridSpace, y ) == ' ') ? true : false;
				case 'up':
					return (grid.getGridValue( x - gGridSpace, y - gGridSpace ) == ' ') ? true : false;
				case 'right':
					return (grid.getGridValue( x + gGridSpace, y + gGridSpace) == ' ') ? true : false;
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
		
		p.canMoveDown = function(grid) {
			var x = this.x;
			var y = this.y + gGridSpace;
			var maxY = grid.getInitY() * grid.getMaxY();

			if ( y > maxY ) {
				return false;
			}

			switch (this.direction) {
				case 'down':
					if (grid.getGridValue( x, y ) == ' ' && grid.getGridValue( x + gGridSpace, y ) == ' ') {
						return true;
					} 
					else {
						return false;
					}
				case 'left':
					if (grid.getGridValue( x, y ) == ' ') {
						return true;
					}
					else {
						return false;
					}
				case 'up':
					if (grid.getGridValue( x, y ) == ' ' && grid.getGridValue( x - gGridSpace, y ) == ' ') {
						return true;
					}
					else {
						return false;
					}
				case 'right':
					if ( y == maxY ) {
						return false;
					}

					if (grid.getGridValue( x, y + gGridSpace ) == ' ') {
						return true;
					}
					else {
						return false;
					}
			}
		}

		p.canMoveLeft = function(grid) {
			var x = this.x;
			var y = this.y;

			if ( this._isLeftBorder(grid) ) {
				return false;
			}

			switch ( this.direction ) {
				case 'down':
					return (grid.getGridValue( x - gGridSpace, y ) == ' ') ? true : false;
				case 'left':
					if (grid.getGridValue( x - gGridSpace, y) == ' ' && grid.getGridValue( x - gGridSpace, y - gGridSpace) == ' ') {
						return true;
					}
					else {
						return false;
					}
				case 'up':
					return (grid.getGridValue( x - 2*gGridSpace, y ) == ' ') ? true : false;
				case 'right':
					if (grid.getGridValue( x - gGridSpace, y) == ' ' && grid.getGridValue( x - gGridSpace, y + gGridSpace) == ' ') {
						return true;
					}
					else {
						return false;
					}
			}

		}

		p.canMoveRight = function(grid) {
			var x = this.x;
			var y = this.y;

			if ( this._isRightBorder(grid) ) {
				return false;
			}

			switch ( this.direction ) {
				case 'down':
					return (grid.getGridValue( x + 2*gGridSpace, y ) == ' ') ? true : false;
				case 'left':
					if (grid.getGridValue( x + gGridSpace, y) == ' ' && grid.getGridValue( x + gGridSpace, y - gGridSpace) == ' ') {
						return true;
					}
					else {
						return false;
					}
				case 'up':
					return (grid.getGridValue( x + gGridSpace, y ) == ' ') ? true : false;
				case 'right':
					if (grid.getGridValue( x + gGridSpace, y) == ' ' && grid.getGridValue( x + gGridSpace, y + gGridSpace) == ' ') {
						return true;
					}
					else {
						return false;
					}
			}
		}

		p.writeToGrid = function(grid) {
			var x = this.x;
			var y = this.y;
			/*
			var lBlockIndex = this.getChildIndex( 'lBlock' );
			var rBlockIndex = this.getChildIndex( 'rBlock' );
			console.log(lBlockIndex)
			console.log(rBlockIndex)
			*/
			var lColorStr = this.getChildAt(0).currentAnimation + '_' + 'Pill' + grid.numOfPills;
			var rColorStr = this.getChildAt(1).currentAnimation + '_' + 'Pill' + grid.numOfPills;

			switch (this.direction) {
				case 'down':
					grid.setGridValue( x, y, lColorStr );
					grid.setGridValue( x + gGridSpace, y, rColorStr );
					break;
				case 'left':
					grid.setGridValue( x, y, lColorStr );
					grid.setGridValue( x, y - gGridSpace, rColorStr );
					break;
				case 'up':
					grid.setGridValue( x, y, lColorStr );
					grid.setGridValue( x - gGridSpace, y, rColorStr );
					break;
				case 'right':
					grid.setGridValue( x, y, lColorStr );
					grid.setGridValue( x, y + gGridSpace, rColorStr );
					break;
			}
			grid.numOfPills++;
			grid.print();
			return this.clone(true);
		}
		
	window.Pill = Pill;
	console.log('Pill.js initialized');
}(window));