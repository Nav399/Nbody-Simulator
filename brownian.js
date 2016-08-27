function brownian() {
        restitution=1
		for (var i = 0; i < bodies.length; i++) {
			//Set initial acceleration to 0
            bodies[i].ax = 0;
            bodies[i].ay = 0;
			if (bodies[i].y>height-bodies[i].radius) {
				bodies[i].y=height-bodies[i].radius;
				bodies[i].vy=(bodies[i].vy)*-1;
				if (i === (bodies.length-1)) {
					trackparticle(bodies[bodies.length-1].x,bodies[bodies.length-1].y);
					};
			} else if (bodies[i].y<0+bodies[i].radius) {
				bodies[i].y=0+bodies[i].radius;
				bodies[i].vy=(bodies[i].vy)*-1;
				if (i === (bodies.length-1)) {
					trackparticle(bodies[bodies.length-1].x,bodies[bodies.length-1].y);
					};
			} else if (bodies[i].x>width-bodies[i].radius) {
				bodies[i].x=width-bodies[i].radius;
				bodies[i].vx=(bodies[i].vx)*-1;
				if (i === (bodies.length-1)) {
					trackparticle(bodies[bodies.length-1].x,bodies[bodies.length-1].y);
					};
			} else if (bodies[i].x<0+bodies[i].radius) {
				bodies[i].x=0+bodies[i].radius;
				bodies[i].vx=(bodies[i].vx)*-1;
				if (i === (bodies.length-1)) {
					trackparticle(bodies[bodies.length-1].x,bodies[bodies.length-1].y);
					};
			};
			for (var j = 0; j < bodies.length; j++) {
				//Check that not testing the same particle twice
                if (i === j) continue;
				//Calculate the x-y distances between bodies
				//Check if bodies are colliding
				if (Colliding(bodies[i].x,bodies[i].y,bodies[i].radius,bodies[j].x,bodies[j].y,bodies[j].radius)) {
					if (i === (bodies.length-1)||j === (bodies.length-1)) {
					trackparticle(bodies[bodies.length-1].x,bodies[bodies.length-1].y);
					};
					//If so, apply particles to collision function
					Collision(i,j);
				};
            };
			//Update velocity
            bodies[i].vx += bodies[i].ax * dt;
            bodies[i].vy += bodies[i].ay * dt;
			//Update position
            bodies[i].x += bodies[i].vx * dt;
            bodies[i].y += bodies[i].vy * dt;
		};
		
		
		//Draw to the screen
        draw();
		//listen for scroll
		//document.getElementById("myCanvas").addEventListener("wheel", zoom);
    };