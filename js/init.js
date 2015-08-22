var game;

window.onload = function(){

	game = new Game();
	var titan = new Titan(game);
	
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');

	var gameLoop = function(timestamp) {
		game.act();
		game.draw(ctx);
		window.requestAnimationFrame(gameLoop);
	}
	
	window.requestAnimationFrame(gameLoop);
}