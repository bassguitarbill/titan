function Hitbox(game, parent) {

	this.x = parent.x;
	this.y = parent.y;

}

Hitbox.prototype.contains = function(x, y) {
	throw Error("'Hitbox.contains' not implemented");
}

Hitbox.prototype.draw = function(ctx) {
	throw Error("'Hitbox.draw' not implemented");
}

