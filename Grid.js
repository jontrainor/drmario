(function(window) {
	var Grid = function(initX,initY) {
		this.initialize(initX,initY);
	}
	
	var p = Grid.prototype = new Container();
	//static properties
		Grid.virusArray = ['redVirus','yellowVirus','blueVirus'];
		Grid.blockArray = ['red','yellow','blue'];
	
	//public properties
		p.gameArray = [];
		p.coorDict = {};
		p.viruses = {};

	//private properties
		p._initX = null;
		p._initY = null;
		p._maxX = null;
		p._maxY = null;
		
	//constructor
		p.initialize = function(initX,initY) {
			this.x = 0;
			this.y = 0;
			this._initX = initX;
			this._initY = initY;
			this._maxX = 8;
			this._maxY = 16;

			for ( var i = 0 ; i < this._maxX; i++ ) {
				this.gameArray[i] = [];
				for ( var j = 0; j < this._maxY; j++ ) {
					//initialize the gameArray
					this.gameArray[i][j] = ' ';
				}
			}
		}

	//public methods
		p.getInitX = function() {
			return this._initX;
		}

		p.getInitY = function() {
			return this._initY;
		}

		p.getMaxX = function() {
			return this._maxX;
		}

		p.getMaxY = function() {
			return this._maxY;
		}

		p.getGridValue = function(x,y) {
			var ix = (x - this._initX)/gGridSpace;
			var	iy = (y - this._initY)/gGridSpace;
			//console.log(ix + ', ' + iy)
			return this.gameArray[ix][iy];
		}

		p.setGridValue = function(x,y,value) {
			var ix = x/this._initX,
				iy = y/this._initY;
			this.gameArray[ix][iy] = value;
		}

		p.getX = function(ix) {
			return this._initX + ix*gGridSpace;
		}

		p.getY = function(iy) {
			return this._initY + iy*gGridSpace;
		}

		p.initViruses = function(level, ss) {
			var numOfViruses = level*4 + 4,
				virusIndex,
				i,
				x,
				y;
			for ( i = 0; i < numOfViruses; i++ ) {
				virusIndex = Math.floor(Math.random()*Grid.virusArray.length);
				x = Math.floor(Math.random()*this._maxX);
				y = Math.floor(Math.random()*(this._maxY - 3) + 3);
//				console.log(virusIndex,x,y);
//				console.log(Grid.virusArray[virusIndex]);

				var varName = 'virus' + i;
				var emptyGridSpace = false;
				while ( !emptyGridSpace ) {
					if ( this.gameArray[x][y] != ' ' ) {
						if ( x == 7 ) {
							x = 0;
							y == 15 ? y = 3 : y++;
							console.log('right wall');
						}

						else {
							console.log('x++');
							x++;
						}
					}

					else {
						emptyGridSpace = true;
					}
				}

				this.gameArray[x][y] = Grid.virusArray[virusIndex];
				this.viruses.varName = new BitmapAnimation(ss);
				this.viruses.varName.x = this.getX(x);
				this.viruses.varName.y = this.getY(y);
				this.viruses.varName.gotoAndStop(Grid.virusArray[virusIndex]);
				this.addChild(this.viruses.varName);
			}
		}

		//for testing
		p.print = function() {
			for ( var y = 0; y < this._maxY; y++ ) {
				var str = ( this.gameArray[0][y] == ' ' ? 'empty' : this.gameArray[0][y] ) + ' ';
				for ( var x = 1; x < this._maxX; x++ ) {
					str = str.concat( ( this.gameArray[x][y] == ' ' ? 'empty' : this.gameArray[x][y] ) + ' ' );
				}
				console.log(str);
			}
		}
	window.Grid = Grid;
	console.log('Grid.js initialized');
}(window));