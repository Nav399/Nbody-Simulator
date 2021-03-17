function makeParticle(x,y,mass,radius,vx,vy,color,move) {
	//Create body as an object
	var body = {pos:{},vel:{},acc:{}};
		//Set coordinates of the body
		body.pos.x = x;
		body.pos.y = y;
		//Set the mass of the body
		body.m = mass;
		//Set the radius to either auto-size or specified radius
		if (radius === true) {
			body.radius = (width*0.00036764)*mass;	//Body size proportional to screen pixel width and body mass(1 kg = 1 pixel)
		} else {
			body.radius = radius;					//Body size is what was specified
		};
		//Set the initial velocity components of the body
		body.vel.x = vx;
		body.vel.y = vy;
		//Set the initial acceleration components to zero
		body.acc.x = 0;
		body.acc.y = 0;
		//Set body color
		body.color = color;
		//Declare that the body is movable
		body.movable = move;
	//Add the body object to the array of bodies
	bodies.push(body);
};

function fillRandomParticles(m,velocity,count) {
	//Loop for however many particles were specified
	for (var i = 0; i < count; i++) {
		//Set the initial velocity components of the particle based on input
		if (velocity === false) {
			vx = 0;
			vy = 0;
		} else if (velocity === true) {
			vx = getRandomNum(-.000025,.000025);
			vy = getRandomNum(-.000025,.000025);
		} else {
			vx = chooseFromSet([velocity,-velocity]);
			vy = chooseFromSet([velocity,-velocity]);
		};
		//Set the mass of the particle based on input
		if (m === true) {
			mass = getRandomNum(1,10);
		} else {
			mass = m;
		};
		//Apply all variables to the 'makeParticle' function
		makeParticle(Math.random() * width,Math.random() * height,mass,true,vx,vy,"white",true);
	};
};

function addGalaxy(x,y,radius,count,vx,vy,direction,mass,radii,centerM,centerR) {
	//Make the center particle (usually the largest to hold the whole galaxy together)
	makeParticle(x,y,centerM,centerR,vx,vy,"red",true);
	//Loop for however many particles were specified
	for (var i = 0; i < count; i++) {
		//Make the body object
		var body = {};
		//Set angle relative to the center of the galaxy to place body
		var angle = Math.random() * Math.PI * 2;
		//Set distance from center to place it
		var rad = getRandomNum((centerR+centerR)+(radii*2), radius);
		//	var rad = Math.sqrt(rad);
		//Convert radians to cartesian for input into 'makeParticle' function
		var offset = Radians2Cartesian(rad,angle);
		//Find the orbital velocity of the particle
		var r = FindOrbitVelocity(centerM,mass,rad);
		//Make rotation either clockwise or counter-clockwise
		if (direction === "ccw") {
			theta = ((3*(Math.PI/2))+(Math.atan2(offset.y ,offset.x)));
		} else {
			theta = ((Math.PI/2)+(Math.atan2(offset.y ,offset.x)));
		};
		//Convert to cartesian again
		var velocity = Radians2Cartesian(r,theta);
		//Apply to function
		makeParticle(offset.x+x,offset.y+y,mass,radii,velocity.x+vx,velocity.y+vy,"white",true);
	};
};

function CleanParticles(Xoffset,Yoffset) {
	for (i = 0; i < bodies.length; i++) {
		if (bodies[i].x<(0) || bodies[i].x>(width) || bodies[i].y<(0) || bodies[i].y>(height)) {
			bodies.splice(i, 1);
		};
	};
};
