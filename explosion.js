explosion = []

function removeExplosion(x){
	explosion.splice(x, 1)
}

function addExplosion(x, y) {
	explosion[explosion.length] = {
		"x": x,
		"y": y,
		"rad": 10,
		"function": 1
	}
}

function moveExplosion() {
	for (var i = 0; i < explosion.length; i++) {
		explosion[i].function = explosion[i].function + 1;
		
		explosion[i].rad = Math.sqrt(15 * explosion[i].function);
		if(explosion[i].rad >= 40) {
			removeExplosion(i);
		}
	}
}