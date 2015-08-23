function Game() {
	
	this.hud = [];
	this.foreground = [];
	this.midground = [];
	this.background = [];
	this.backdrop = [];
	
	this.titan;
	this.actors = [];
	
	this.keyboard = new Keyboard();
	
}

Game.prototype.draw = function(ctx) {

	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); 
	
	this.backdrop.forEach(function(bg){bg.draw(ctx)});
	this.background.forEach(function(bg){bg.draw(ctx)});
	this.midground.forEach(function(bg){bg.draw(ctx)});
	this.foreground.forEach(function(bg){bg.draw(ctx)});
	this.hud.forEach(function(bg){bg.draw(ctx)});
	
}

Game.prototype.act = function(timestamp) {
	this.titan.act(timestamp);
	this.actors.forEach(function(a){a.act(timestamp)});
}