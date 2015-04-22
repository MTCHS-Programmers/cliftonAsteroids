c=document.getElementById("game");
ctx=c.getContext("2d");

function renderShip() {
	if(inv == false) {
		ctx.save()
		var img=document.getElementById("ship");
		ctx.translate(ship.x, ship.y);
		ctx.rotate((ship.deg - 90 + 180) * 0.0174532925199432957);
		ctx.drawImage(img, -10,-40);
		ctx.restore();
	}
	else {
		if(ship.explode == false) {
			if(Math.floor(invTime / 4) % 4 != 0) {
				ctx.save()
				var img=document.getElementById("ship");
				ctx.translate(ship.x, ship.y);
				ctx.rotate((ship.deg - 90 + 180) * 0.0174532925199432957);
				ctx.drawImage(img, -10,-40);
				ctx.restore();
			}
		}
		else {
			ctx.beginPath();
			ctx.fillStyle = "#ffffff"; 
			ctx.arc(ship.x,ship.y , ship.explosionState, 0, 2*Math.PI);
			ctx.fill();
		}
	}
}

function clearScreen() {
    ctx.globalCompositeOperation = "destination-out"

    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.globalCompositeOperation = "source-over"
}

function renderAsteroids() {
	for (var i = 0; i < asteroids.length; i++) {		
		if(asteroids[i].rad == 50) {				
				ctx.save()
				var img=document.getElementById("asteroid1");
				ctx.translate(asteroids[i].x, asteroids[i].y);
				ctx.rotate((asteroids[i].deg + 180) * 0.0174532925199432957);
				ctx.drawImage(img, -50,-60);
				ctx.restore();
		}
		if(asteroids[i].rad == 25) {
				ctx.save()
				var img=document.getElementById("asteroid2");
				ctx.translate(asteroids[i].x, asteroids[i].y);
				ctx.rotate((asteroids[i].deg + 180) * 0.0174532925199432957);
				ctx.drawImage(img, -25,-27.5);
				ctx.restore();
		}
		if(asteroids[i].rad == 12.5) {
				ctx.save()
				var img=document.getElementById("asteroid3");
				ctx.translate(asteroids[i].x, asteroids[i].y);
				ctx.rotate((asteroids[i].deg + 180) * 0.0174532925199432957);
				ctx.drawImage(img, -12.5,-14);
				ctx.restore();
		}
	}
}

function renderLaser() {
	for (var i = 0; i < laser.length; i++) {		
		ctx.save()
		var img=document.getElementById("laser");
		ctx.translate(laser[i].x, laser[i].y);
		ctx.rotate((laser[i].dir + 180) * 0.0174532925199432957);
		ctx.drawImage(img, -15,-10);
		ctx.restore();
	}
}

function renderExplosion() {
	for (var i = 0; i < explosion.length; i++) {
		ctx.beginPath();
		ctx.fillStyle = "#ffffff"; 
		ctx.arc(explosion[i].x, explosion[i].y , explosion[i].rad, 0, 2*Math.PI);
		ctx.fill();
	}
}

function renderStats() {
ctx.font="20px Georgia";
ctx.fillText("Lives: " + lives,10,30);
ctx.fillText("Score: " + score,10,50);
ctx.fillText("Level: " + level,10,70);
ctx.fillText("Clifton Asteroid Count: " + asteroids.length,10,90);

ctx.fillText("Clifton X: " + ship.x,10,130);
ctx.fillText("Clifton Y: " + ship.y,10,150);

ctx.fillText("Clifton Laser Count: " + laser.length,10,190);
}