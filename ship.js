//Use this site as vector reference: http://hyperphysics.phy-astr.gsu.edu/hbase/vect.html
game.width = window.innerWidth;
game.height = window.innerHeight;

ship = {
    "x": game.width / 2,
    "y": game.height / 2,
    "deg": 0,
    "dir": 0,
    "speed": 0,
    "acc": 0,
    "maxSpeed": 5,
    "accSpeed": 0.008,
	"explode": false,
	"explosionState": 10,
	"turnSpeed": 5
}

laser = []
addLaser = true;

inv = false;

key = new Array;

function moveShip() {
	if(ship.explode == false) {
    //key a
    if (key[65]) {
        ship.deg = ship.deg - ship.turnSpeed;
        ship.acc = ship.acc / 1.1
    }
    
    //key d
    if (key[68]) {
        ship.deg = ship.deg + ship.turnSpeed;
        ship.acc = ship.acc / 1.1
    }
	
	//key space
	if(key[32]) {
		if(addLaser == true) {
			fire()
		}
	}

    //limits the deg to 0 - 359
    ship.deg = ship.deg % 360;
    ship.deg = (ship.deg + 360) % 360;


    //key w
    if (key[87]) {
        if (ship.acc <= ship.maxSpeed) {
            ship.acc = ship.acc + ship.accSpeed;
        }
        else {
            ship.acc = ship.maxSpeed;
        }

        addVectors(ship.dir, ship.speed, ship.deg, ship.acc);
	
		ship.speed = r;
		ship.dir = theta;
    }
    else {
        ship.acc = 0;
    }

    //set the speed max
    if (ship.speed > ship.maxSpeed) {
        ship.speed = ship.maxSpeed
    }


    ship.x = ship.x + getRun(ship.dir, ship.speed);
    ship.y = ship.y + getRise(ship.dir, ship.speed);

    //keeps the ship inside the screen
    if (ship.x > window.innerWidth) {
        ship.x = 0;
    }

    if (ship.x < 0) {
        ship.x = window.innerWidth;
    }

    if (ship.y > window.innerHeight) {
        ship.y = 0;
    }

    if (ship.y < 0) {
        ship.y = window.innerHeight;
    }

    //sets the triangle points
    ship.p1 = {
        "x": Math.round(ship.x + getRun(ship.deg, 40)),
        "y": Math.round(ship.y + getRise(ship.deg, 40))
    }

    ship.p2 = {
        "x": Math.round(ship.x + getRun(ship.deg + 170, 35)),
        "y": Math.round(ship.y + getRise(ship.deg + 170, 35))
    }

    ship.p3 = {
        "x": Math.round(ship.x + getRun(ship.deg - 170, 35)),
        "y": Math.round(ship.y + getRise(ship.deg - 170, 35))
    }
	}
	else {
		ship.explosionState = ship.explosionState + 0.5
		if(ship.explosionState >= 30) {
			ship.explosionState = 10;
			ship.explode = false;
			ship.x = game.width / 2;
			ship.y = game.height / 2;
			ship.speed = 0;
			ship.deg = 0;
			ship.dir = 0;
		}
	}
	
	if(inv == true) {
		invTime = invTime + 1;
		if(invTime >= invMax) {
			inv = false;
		}
	}
}

function addVectors(ad, as, bd, bs) {
    ax = getRun(ad, as);
    ay = getRise(ad, as);

    bx = getRun(bd, bs);
    by = getRise(bd, bs);

    rx = ax + bx;
    ry = ay + by;

    r = Math.sqrt(Math.pow(rx, 2) + Math.pow(ry, 2));

    theta = Math.degrees(Math.atan(ry / rx));
    theta = theta % 360;
    theta = (theta + 360) % 360;

    if (rx < 0) {
        theta = theta + 180;
    }
}

function fire() {
		laser[laser.length] = {
			"x": ship.p1.x,
			"y": ship.p1.y,
			"dir": ship.deg,
			"dis": 0
		}
		addLaser = false;
		ship.acc = ship.acc - 0.001;
}

function setInvincibility(x) {
	inv = true
	invTime = 0;
	invMax = x;
}

function getRun(deg, speed) {
    return Math.cos(Math.radians(deg)) * speed;
}

function getRise(deg, speed) {
    return Math.sin(Math.radians(deg)) * speed;
}

Math.degrees = function(rad) {
    return rad * (180 / Math.PI);
}

Math.radians = function(deg) {
    return deg * (Math.PI / 180);
}