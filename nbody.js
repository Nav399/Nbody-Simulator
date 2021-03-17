function nbody(collide) {
	if (pause!=true) {
		for (var i = 0; i < bodies.length; i++) {
			if (bodies[i].movable===false) {continue};
			//Set initial acceleration to 0
			bodies[i].acc.x = 0;
			bodies[i].acc.y = 0;	
			for (var j = 0; j < bodies.length; j++) {
				//Check that not testing the same particle twice
				if (i === j) {continue;};
				var minDist = ((bodies[i].radius+bodies[j].radius))
				//Calculate the x-y-Total distances between bodies
				var dist = FindDist(bodies[i].pos.x,bodies[i].pos.y,bodies[j].pos.x,bodies[j].pos.y);
				//make r either the distance or e, whichever is larger
				var r = Math.max(dist.Total,minDist);
				//Calculate force from the distance and masses
				var f = FindForce(bodies[i].m,bodies[j].m,r);
				//Apply force to the acceleration (subtract for attractive force)
				bodies[i].acc.x -= (f * (dist.dx/r))/bodies[i].m;
				bodies[i].acc.y -= (f * (dist.dy/r))/bodies[i].m;
			
				if ((dist.Total <= ((bodies[i].radius+bodies[j].radius))) && collide===true) {
					//Check if bodies are colliding
					//If so, apply particles to collision function
					Collision(i,j);
				};
			};
		};
		//apply movements
		for (var i = 0; i < bodies.length; i++) {
			bodies[i].vel.x += (bodies[i].acc.x * dt);
			bodies[i].vel.y += (bodies[i].acc.y * dt);
			bodies[i].pos.x += bodies[i].vel.x * dt;
			bodies[i].pos.y += bodies[i].vel.y * dt;
		};
		fps=getFramerate();
		draw(true);
	};
};
