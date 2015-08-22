function Titan(game, xpos, ypos) {

	this.game = game;
	this.kb = game.keyboard;
	this.x = xpos || 300;
	this.y = ypos || 400;
	
	this.game.midground.push(this);
	this.game.titan = this;


	
	
}

Titan.prototype.act = function() {
	
	this.move();
	
}

Titan.prototype.move = function() {
	
	var kb = this.kb;
	if (kb.up() && !kb.down()){
		this.y -= 1;
	} else if (kb.down() && !kb.up()){
		this.y += 1;
	}
	if (kb.left() && !kb.right()){
		this.x -= 1;
	} else if (kb.right() && !kb.left()){
		this.x += 1;
	}
	
}
	
Titan.prototype.draw = function(ctx) {
	
	ctx.fillStyle = "#786546";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.RADIUS, 0, 2 * Math.PI);
	ctx.fill();

}

Titan.prototype.RADIUS = 25;