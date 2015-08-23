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
	
	this.charging = false;
	this.chargeTime = 0;

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
	
	this.rightLegImg = this.images.leg.out.down;
	this.leftLegImg = this.images.leg.out.down;
	this.stepRight = false;
	
	this.eyeColor = 'rgb(0,0,0)';
	
}

Titan.prototype.act = function(timestamp) {
	
	this.birthdate = this.birthdate || timestamp;
	this.move(timestamp);
	this.attack(timestamp);
	
}

Titan.prototype.move = function(timestamp) {

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
	
	if(isMoving && this.direction.x && this.direction.y){
		this.direction.x *= SQRT_OF_POINT_FIVE;
		this.direction.y *= SQRT_OF_POINT_FIVE;
	}	
	this.attackHitbox.direction = this.direction;
	this.attackHitbox.x = this.x;
	this.attackHitbox.y = this.y;
	
	if(isMoving){ // On this frame, holding a move button
		if(this.movingSince == 0){
			this.movingSince = timestamp;
		} else {
			if((timestamp - this.movingSince) > this.TIME_TO_STEP){
				sound.step.play();
				this.movingSince = 0;
				this.stepRight = !this.stepRight;
				this.rightLegImg = this.images.leg.out.down;
				this.leftLegImg = this.images.leg.out.down;
			} else if((timestamp - this.movingSince) > this.TIME_TO_STEP/2) {
				if(this.stepRight){
					this.rightLegImg = this.images.leg.in.down;
				} else {
					this.leftLegImg = this.images.leg.in.down;
				}
			}
		}
	} else {
		this.movingSince = 0;
		this.rightLegImg = this.images.leg.out.down;
		this.leftLegImg = this.images.leg.out.down;
	}
	
}

Titan.prototype.attack = function(timestamp) {
	
	if(this.kb.c()){
		if(this.chargeTime == -1){this.eyeColor = "rgb(255,255,255)"; return};
		if(!this.charging){
			this.chargeTime = timestamp;
			sound.charge.play();
		}
		this.charging = true;
		var percentCharged = (timestamp - this.chargeTime) / this.TIME_TO_CHARGE;
		this.eyeColor = "rgb(" + Math.floor(percentCharged * 255) + ",0," + Math.floor(percentCharged * 255) + ")";
		if((timestamp - this.chargeTime) > this.TIME_TO_CHARGE){
			sound.explod.play();
			var hb = this.attackHitbox;
			this.game.actors
				.filter(function(actor){return actor instanceof Man})
				.filter(function(man){return hb.contains(man.x, man.y)})
				.forEach(function(man){man.kill()});
			this.chargeTime = -1;
		}
		
	} else {
		this.eyeColor = "rgb(0,0,0)";
		this.chargeTime = 0;
		if(this.charging){
			sound.charge.pause();
			sound.charge.currentTime = 0;
		}
		this.charging = false;
	}
	
}
	
Titan.prototype.draw = function(ctx) {

	this.attackHitbox.draw(ctx);
	this.hitbox.draw(ctx);

	ctx.drawImage(this.leftLegImg, this.x - 30, this.y - 25, this.leftLegImg.width * 2, this.leftLegImg.height * 2);
	ctx.drawImage(this.rightLegImg, this.x + 5, this.y - 25, this.rightLegImg.width * 2, this.rightLegImg.height * 2);
	ctx.drawImage(this.images.body.down, this.x - 50, this.y - 100, this.images.body.down.width * 2, this.images.body.down.height * 2);
	ctx.beginPath();
	ctx.fillStyle = this.eyeColor;
	//ctx.arc(this.x, this.y - 100, 20, 0, 2 * Math.PI);
	ctx.fillRect(this.x - 20, this.y - 105, 40, 10);
	ctx.drawImage(this.images.head.down, this.x - 30, this.y - 130, this.images.head.down.width * 2, this.images.head.down.height * 2);

}

Titan.prototype.RADIUS = 30;
Titan.prototype.SPEED = 0.4;
Titan.prototype.ATTACK_RADIUS = 20;
Titan.prototype.ATTACK_DISTANCE = 60;
Titan.prototype.TIME_TO_CHARGE = 800;
Titan.prototype.TIME_TO_STEP = 1000;