function House(game, x, y) {
	
	this.x = x;
	this.y = y;
	
	this.game = game;
	this.game.foreground.push(this);
	
	this.img = new Image();
	this.img.src = 'img/house1.png';
	
}

House.prototype.draw = function(ctx) {
	
	if(this.img.complete){
		ctx.drawImage(this.img, this.x, this.y);
	}
	
}