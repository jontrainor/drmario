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
		p.getGridValue = function(x,y) {
			var ix = x/getGridValue - this._initX - 1,
				iy = y/getGridValue - this._initY - 1;
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
				y = Math.floor(Math.random()*(this._maxY - 3) + 3s);
				console.log(virusIndex,x,y);
				console.log(Grid.virusArray[virusIndex]);

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

	window.Grid = Grid;
	console.log('Grid.js initialized');
}(window));