	function fluid(grav) {
		var vx = 0;
		var vy = 0;
		for (var i = 0; i < bodies.length; i++) {
			//Set initial acceleration to 0
			bodies[i].ay = grav;
			bodies[i].vx += bodies[i].ax * dt;
			bodies[i].vy += bodies[i].ay * dt;
			bodies[i].x += bodies[i].vx * dt;
            bodies[i].y += bodies[i].vy * dt;
			if (bodies[i].y>height-bodies[i].radius) {
				bodies[i].y=height-bodies[i].radius
				bodies[i].vy=(bodies[i].vy*(restitution))*-1
			};
			if (bodies[i].y<0+bodies[i].radius) {
				bodies[i].y=0+bodies[i].radius
				bodies[i].vy=(bodies[i].vy*(restitution))*-1
			};
			if (bodies[i].x>width-bodies[i].radius) {
				bodies[i].x=width-bodies[i].radius
				bodies[i].vx=(bodies[i].vx*(restitution))*-1
			};
			if (bodies[i].x<0+bodies[i].radius) {
				bodies[i].x=0+bodies[i].radius
				bodies[i].vx=(bodies[i].vx*(restitution))*-1
			};
            for (var j = 0; j < bodies.length; j++) {
				//Check that not testing the same particle twice
                if (i === j) continue;
				var dist = FindDist(bodies[i].x,bodies[i].y,bodies[j].x,bodies[j].y);
				//Check if bodies are colliding
				if ((dist.Total <= ((bodies[i].radius+bodies[j].radius)*2))) {
					//If so, apply particles to collision function
					Collision(i,j);
				};
            };
        };
		//Draw to the screen
		fps=getFramerate();
        draw(true);
	};