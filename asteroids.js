asteroids = []
blow = false;

function addAsteroid(params) {
	if(Math.floor((Math.random() * 2) + 1) == 1) {
		var direction = 1;
	}
	else {
		var direction = -1;
	}
	asteroids[asteroids.length] = {
		"x": Math.floor((Math.random() * window.innerWidth) + 1),
		"y": Math.floor((Math.random() * window.innerHeight) + 1),
		"rad": 50,
		"dir": Math.floor((Math.random() * 360) + 1),
		"speed": (Math.random() * 3),
		"deg": Math.floor((Math.random() * 360) + 1),
		"direction": direction
	}
}

function removeAsteroid(x){
	asteroids.splice(x, 1);
}


function breakAsteroid(i) {
	addExplosion(asteroids[i].x, asteroids[i].y);
	
	if(asteroids[i].rad < 25) {
		removeAsteroid(i)
	}
	else {
	if(Math.floor((Math.random() * 2) + 1) == 1) {
		var direction = 1;
	}
	else {
		var direction = -1;
	}
	asteroids[asteroids.length] = {
		"x": asteroids[i].x,
		"y": asteroids[i].y,
		"rad": asteroids[i].rad / 2,
		"dir": Math.floor((Math.random() * 360) + 1),
		"speed":(Math.random() * 3),
		"deg": Math.floor((Math.random() * 360) + 1),
		"direction": direction
	}
	
	if(Math.floor((Math.random() * 2) + 1) == 1) {
		var direction = 1;
	}
	else {
		var direction = -1;
	}
	asteroids[i] = {
		"x": asteroids[i].x,
		"y": asteroids[i].y,
		"rad": asteroids[i].rad / 2,
		"dir": Math.floor((Math.random() * 360) + 1),
		"speed": (Math.random() * 3),
		"deg": Math.floor((Math.random() * 360) + 1),
		"direction": direction
	}
	}
}

function moveAsteroids() {
	for (var i = 0; i < asteroids.length; i++) {
		asteroids[i].x = asteroids[i].x + getRun(asteroids[i].dir, asteroids[i].speed);
		asteroids[i].y = asteroids[i].y + getRise(asteroids[i].dir, asteroids[i].speed);
		asteroids[i].deg = asteroids[i].deg + (asteroids[i].speed * asteroids[i].direction);
		
		    //keeps the ship inside the screen
		if (asteroids[i].x > window.innerWidth) {
			asteroids[i].x = 0;
		}

		if (asteroids[i].x < 0) {
			asteroids[i].x = window.innerWidth;
		}

		if (asteroids[i].y > window.innerHeight) {
			asteroids[i].y = 0;
		}

		if (asteroids[i].y < 0) {
			asteroids[i].y = window.innerHeight;
		}
		
		if(getDistance(ship.p1.x, ship.p1.y, asteroids[i].x, asteroids[i].y) <= asteroids[i].rad || getDistance(ship.p2.x, ship.p2.y, asteroids[i].x, asteroids[i].y) <= asteroids[i].rad || getDistance(ship.p3.x, ship.p3.y, asteroids[i].x, asteroids[i].y) <= asteroids[i].rad) {
			if(ship.explode == false && inv == false) {
				//checks for ship collision
				ship.explode = true;
				blow = true;
				lives = lives - 1;
				setInvincibility(200);
			}
		}
		
		for (var j = 0; j < laser.length; j++) {
			if(getDistance(laser[j].x, laser[j].y, asteroids[i].x, asteroids[i].y) <= asteroids[i].rad) {
				blow = true;
				removeLaser(j);
				score = score + 1;
			}
		}
		
		if(blow == true) {
			breakAsteroid(i);
			blow = false
		}
	}
	
	if(asteroids.length == 0) {
		level = level + 1;
		
		for (var i = 0; i < level * 2; i++) {
			addAsteroid()
		}
		setInvincibility(200);
	}
}

//finds the distance between two points.
function getDistance(ax, ay, bx, by) {
    rx = ax - bx;
    ry = ay - by;

    r = Math.sqrt(Math.pow(rx, 2) + Math.pow(ry, 2));
    
    return r
}