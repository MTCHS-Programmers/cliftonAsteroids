pause = false;
moveShip()

window.onresize = function() {
game.width = window.innerWidth;
game.height = window.innerHeight;
}


window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function(callback) {
              window.setTimeout(callback, 1000 / 30);
          };
})();


// usage:
// instead of setInterval(render, 16) ....

(function animloop() {
    requestAnimFrame(animloop);
    render()
})();

function render() {
if(pause == false) {
    //clears the previus frame
    clearScreen() 

    //moves the frames
    moveShip()
	moveLaser()
	moveAsteroids()
	moveExplosion()

    //renders the game
    renderShip()
	renderAsteroids()
	renderLaser()
	renderExplosion()
	renderStats()
}
else {
	ctx.font="40px Georgia";
	ctx.fillText("Paused",(game.width / 2) - 50,(game.height / 2));
}
}

//gets currently pressed keys
key = new Array();
onkeydown = onkeyup = function(e) {
    e = e || event; // to deal with IE
    key[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
    
    if(key[27]) {
	if(pause == true) {
		pause = false
	}
	else {
		pause = true;
	}
    }
}