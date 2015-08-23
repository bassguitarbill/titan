var tasks = {

	idle: function() {
		//console.log("%s is idle!", this.toString());
	},
	
	moveto: function(x, y) {
	
		return function(){
			var leftRightness = Math.abs(this.x - x);
			var upDownitude = Math.abs(this.y - y);
			var farness = leftRightness + upDownitude;
			if(farness < 3) {this.task = tasks.idle; return;}
			var goingLeftRight = (Math.random() * farness) < leftRightness;
			
			if(goingLeftRight){
				if(this.x > x){
					this.moveLeft();
				}else if(this.x < x){
					this.moveRight();
				}
			} else {
				if(this.y > y){
					this.moveUp();
				}else if(this.y < y){
					this.moveDown();
				}
			}
		}
	},
	
	moverandom: function() {
		
		
		switch(Math.floor(Math.random() * 4)){
			case 0:
				this.moveUp();
				break;
			case 1:
				this.moveDown();
				break;
			case 2:
				this.moveLeft();
				break;
			case 3:
				this.moveRight();
				break;
				
		}
		
	}
}