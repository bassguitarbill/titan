function Man(game,x,y) {
	
	this.x = x;
	this.y = y;
	
	this.game = game;
	this.game.background.push(this);
	
	this.game.actors.push(this);
	
	this.images = [new Image(), new Image(), new Image()];
	this.images[0].src = 'img/bluman1.png';
	this.images[1].src = 'img/bluman2.png';
	this.images[2].src = 'img/blumandead.png';
	this.onImage = 0;
	
	this.task = tasks.idle;

	this.ableToMove = true;
	
	this.SPEED = 1;
	
	this.dead = false;

}

Man.prototype.kill = function() {
	this.dead = true;
}

Man.prototype.draw = function(ctx) {
	ctx.drawImage(this.images[this.whichImage()], this.x, this.y);
}

Man.prototype.whichImage = function() {
	return this.dead ? 2 : this.onImage++ % 20 > 10 ? 0 : 1;
}

Man.prototype.act = function(timestamp) {
	this.task(this);
}

Man.prototype.moveUp = function() {
	this.move(0,-this.SPEED);
}

Man.prototype.moveDown = function() {
	this.move(0,this.SPEED);
}

Man.prototype.moveLeft = function() {
	this.move(-this.SPEED, 0);
}

Man.prototype.moveRight = function() {
	this.move(this.SPEED, 0);
}

Man.prototype.move = function(x, y) {
	if(this.ableToMove && !this.dead){
		this.x += x;
		this.y += y;
	}
	//console.log("x = %s, y = %s", this.x, this.y);
}