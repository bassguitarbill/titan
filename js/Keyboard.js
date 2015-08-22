function Keyboard(){
	
	this.keyMapping = {
		37: false,
		38: false,
		39: false,
		40: false,
		67: false,
		86: false
	}
	
	this.KEYS = {
		/*
				38	c = 67
				||
		37======||======39
				||
				40	v = 86
		*/
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		c: 67,
		v: 86
	}
	
	var keyup = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if(key in this.keyMapping)
			this.keyMapping[key] = false;
	}
	var keydown = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if(key in this.keyMapping)
			this.keyMapping[key] = true;
	}
	
	window.onkeydown = keydown.bind(this);
	
	window.onkeyup = keyup.bind(this);
	
}

Keyboard.prototype.left = function(){return this.keyMapping[this.KEYS.left]};
Keyboard.prototype.up = function(){return this.keyMapping[this.KEYS.up]};
Keyboard.prototype.right = function(){return this.keyMapping[this.KEYS.right]};
Keyboard.prototype.down = function(){return this.keyMapping[this.KEYS.down]};
Keyboard.prototype.c = function(){return this.keyMapping[this.KEYS.c]};
Keyboard.prototype.v = function(){return this.keyMapping[this.KEYS.v]};