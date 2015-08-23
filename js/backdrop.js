var backdrop = function(){

	var img = new Image();
	img.src = 'img/snow2.png';
	img.onload = function() {
		window.game.backdrop.push({
			draw: function(ctx){
				
				  var pattern = ctx.createPattern(img, 'repeat');
				  ctx.fillStyle = pattern;
				  ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
				
			}
		})
	}

};