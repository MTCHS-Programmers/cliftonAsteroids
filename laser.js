laserLoop = 0;
laserRecharge = 10;
laserSpeed = 7

function removeLaser(x){
	laser.splice(x, 1)
}

function moveLaser() {
	for (var i = 0; i < laser.length; i++) {
		laser[i].x = laser[i].x + getRun(laser[i].dir, laserSpeed);
		laser[i].y = laser[i].y + getRise(laser[i].dir, laserSpeed);
		laser[i].dis = laser[i].dis + 1;
		
		if(laser[i].x < 0 || laser[i].x > game.width || laser[i].y < 0 || laser[i].y > game.height) {
			//keeps lasser array from getting to large
			removeLaser(i);
		}		
	}
	
	laserLoop = laserLoop + 1;
    
    
	if(laserLoop >= laserRecharge) {
		laserLoop = 0;
		addLaser = true;
	}
}