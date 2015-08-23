function Titan(game, xpos, ypos) {

	this.game = game;
	this.kb = game.keyboard;
	this.x = xpos || 300;
	this.y = ypos || 400;
	this.direction = {x:1, y:0};
	
	this.game.midground.push(this);
	this.game.titan = this;
	
	this.birthdate;
	
	this.ableToMove = true;
	
	this.hitbox = new Hitbox(this.game, this);
	this.hitbox.radius = this.RADIUS;
	this.hitbox.contains = function(x, y){
		// Circle
		return dist(this.x, this.y, x, y) < this.radius;
	};
	this.hitbox.draw = function(ctx){
		ctx.beginPath();
		ctx.fillStyle = "rgba(99,58,17,0.2)";
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	this.attackHitbox = new Hitbox(this.game, this);
	this.attackHitbox.radius = this.ATTACK_RADIUS;
	this.attackHitbox.distance = this.ATTACK_DISTANCE;
	this.attackHitbox.direction = this.direction;
	this.attackHitbox.contains = function(x, y){
		// Circle
		var center = {x:this.x + (this.direction.x * this.distance), y:this.y + (this.direction.y * this.distance)}
		return dist(center.x, center.y, x, y) < this.radius;
	};
	this.attackHitbox.draw = function(ctx){
		var center = {x:this.x + (this.direction.x * this.distance), y:this.y + (this.direction.y * this.distance)}
		ctx.beginPath();
		ctx.fillStyle = "rgba(158,50,161,0.3)";
		ctx.arc(center.x, center.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
	}

	this.images = {};
	this.images.head = {};
	this.images.head.down = new Image();
	this.images.head.down.src = 'img/titanheadd.png';
	
	
	this.images.body = {};
	this.images.body.down = new Image();
	this.images.body.down.src = 'img/titanbodyd.png';
	
	this.images.leg = {};
	this.images.leg.in = {};
	this.images.leg.in.down = new Image();
	this.images.leg.in.down.src = 'img/titanlegind.png';
	this.images.leg.out = {};
	this.images.leg.out.down = new Image();
	this.images.leg.out.down.src = 'img/titanlegoutd.png';
	
}

Titan.prototype.act = function(timestamp) {
	
	this.birthdate = this.birthdate || timestamp;
	this.move();
	
}

Titan.prototype.move = function() {

	if(this.ableToMove) {
		var direction = {x:0, y:0};
		var isMoving;
		var kb = this.kb;
		if (kb.up() && !kb.down()){
			this.y -= this.SPEED;
			isMoving = true;
			direction.y = -1;
		} else if (kb.down() && !kb.up()){
			this.y += this.SPEED;
			isMoving = true;
			direction.y = 1;
		}
		if (kb.left() && !kb.right()){
			this.x -= this.SPEED;
			isMoving = true;
			direction.x = -1;
		} else if (kb.right() && !kb.left()){
			this.x += this.SPEED;
			isMoving = true;
			direction.x = 1;
		}
	}
	this.hitbox.x = this.x;
	this.hitbox.y = this.y;
	
	if(isMoving)
		this.direction = direction;
	
	if(this.direction.x && this.direction.y){
		this.direction.x *= SQRT_OF_POINT_FIVE;
		this.direction.y *= SQRT_OF_POINT_FIVE;
	}	
	this.attackHitbox.direction = this.direction;
	this.attackHitbox.x = this.x;
	this.attackHitbox.y = this.y;
	
}
	
Titan.prototype.draw = function(ctx) {

	console.log(this.direction);
	this.attackHitbox.draw(ctx);
	this.hitbox.draw(ctx);

	ctx.drawImage(this.images.leg.out.down, this.x - 30, this.y - 25, this.images.leg.out.down.width * 2, this.images.leg.out.down.height * 2);
	ctx.drawImage(this.images.leg.in.down, this.x + 5, this.y - 25, this.images.leg.in.down.width * 2, this.images.leg.in.down.height * 2);
	ctx.drawImage(this.images.body.down, this.x - 50, this.y - 100, this.images.body.down.width * 2, this.images.body.down.height * 2);
	ctx.drawImage(this.images.head.down, this.x - 30, this.y - 130, this.images.head.down.width * 2, this.images.head.down.height * 2);

}

Titan.prototype.RADIUS = 30;
Titan.prototype.SPEED = 0.4;
Titan.prototype.ATTACK_RADIUS = 20;
Titan.prototype.ATTACK_DISTANCE = 60;