var game;

window.onload = function(){

	game = new Game();
	var titan = new Titan(game);
	
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	
	backdrop();

	var gameLoop = function(timestamp) {
		game.act(timestamp);
		game.draw(ctx);
		window.requestAnimationFrame(gameLoop);
	}
	
	window.requestAnimationFrame(gameLoop);
}

function spawn100Men() {
	for(var i=0; i<100; i++){
		var m = new Man(game, Math.random()*600, Math.random()*800);
		m.task = tasks.moverandom;
	}
}