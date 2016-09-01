function nbody(collide) {
	if (pause!=true) {
		for (var i = 0; i < bodies.length; i++) {
			if (bodies[i].movable===false) {continue};
			//Set initial acceleration to 0
			bodies[i].ax = 0;
			bodies[i].ay = 0;	
			for (var j = 0; j < bodies.length; j++) {
				//Check that not testing the same particle twice
				if (i === j) {continue;};
				var minDist = ((bodies[i].radius+bodies[j].radius))
				//Calculate the x-y-Total distances between bodies
				var dist = FindDist(bodies[i].x,bodies[i].y,bodies[j].x,bodies[j].y);
				//make r either the distance or e, whichever is larger
				var r = Math.max(dist.Total,minDist);
				//Calculate force from the distance and masses
				var f = FindForce(bodies[i].m,bodies[j].m,r);
				//Apply force to the acceleration (subtract for attractive force)
				bodies[i].ax -= (f * (dist.dx/r))/bodies[i].m;
				bodies[i].ay -= (f * (dist.dy/r))/bodies[i].m;
			
				if ((dist.Total <= ((bodies[i].radius+bodies[j].radius))) && collide===true) {
					//Check if bodies are colliding
					//If so, apply particles to collision function
					Collision(i,j);
				};
			};
		};
		for (var i = 0; i < bodies.length; i++) {
			bodies[i].vx += (bodies[i].ax * dt);
			bodies[i].vy += (bodies[i].ay * dt);
			bodies[i].x += bodies[i].vx * dt;
			bodies[i].y += bodies[i].vy * dt;
		};
		fps=getFramerate();
		draw(true);
	};
};