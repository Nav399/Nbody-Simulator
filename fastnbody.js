function fastnbody() {
        for (var i = 0; i < bodies.length; i++) {
			//Set initial acceleration to 0
            bodies[i].ax = 0;
            bodies[i].ay = 0;
            for (var j = 0; j < bodies.length; j++) {
				//Check that not testing the same particle twice
                if (i === j) continue;
				//Calculate the x-y distances between bodies
                var dx = bodies[i].x - bodies[j].x;
                var dy = bodies[i].y - bodies[j].y;
				//Calculate total distance between bodies
                var r = Math.max(Math.sqrt(dx*dx + dy*dy),e);
				//Calculate force from the distance
                var f = (G * 1 / (r*r))*forceMultiplier;
				//Apply force to the acceleration
                bodies[i].ax -= f * (dx/r);
                bodies[i].ay -= f * (dy/r);
			};
        };
        for (var i = 0; i < bodies.length; i++) {
			//Update velocity
            bodies[i].vx += bodies[i].ax * dt;
            bodies[i].vy += bodies[i].ay * dt;
			//Update position
            bodies[i].x += bodies[i].vx * dt;
            bodies[i].y += bodies[i].vy * dt;
        };
		
		//Draw to the screen
		if (loopnumber===0) {
        draw();
		loopnumber=-1
		};
		loopnumber=loopnumber+1;
    };