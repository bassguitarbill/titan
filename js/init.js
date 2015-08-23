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