//will change to actually take the bodies in instead of just their indexes
//shoudl probably seperate the distance checking from this function
//might replace with a completely new function for the speed improvements that it would bring, this is accurate and cool, but so slow
//this was just a copy and paste function initially, i tweaked it over the years but i still dont completely understamd it
function Collision(i,j)	{
	//a slightly faster version of finding distance
	//i probably thought it was smart to do this when i was younger
	var delta = subtract(bodies[i].pos,bodies[j].pos);//coordinate offset of bodies
	var r = (bodies[i].radius)+(bodies[j].radius);//impact distance
	var dist2 = dot(delta,delta);//dot product of delta
	if (dist2 > r*r) return;//if the bodies havent hit yet, bail out
	//now that were sure the bodies shoiudl be colliding, we resolve the collision
	var d = mag(delta);//actual distance (couldve just done this from the start...)
	if (d != 0) {//check if the bodies are completely overlapped
		//"minimum translation distance" vecotor
		var mtd = multiply(delta,(((bodies[i].radius+bodies[j].radius)-d)/d));
	} else {
		//just basically tells the program to shift the bodies apart on the x axis
		//could just set mtd to 0,0 as i think it always leaves this block as 0,0 anyway
		d = bodies[i].radius+bodies[j].radius;
		delta = new _vector(bodies[i].radius+bodies[j].radius,0);
		var mtd = multiply(delta,(((bodies[i].radius+bodies[j].radius)-d)/d));
	}
	//impluses of the bodies
	var im1 = 1/bodies[i].m;
	var im2 = 1/bodies[j].m;
	//i think this is the positional shift to be applied to the body due to it being moved apart
	var temp = multiply(mtd,im1/(im1+im2));
	var temp2 = multiply(mtd,im2/(im1+im2));
	//shift the bodies by the above amount
	bodies[i].x+=temp.x;
	bodies[i].y+=temp.y;
	bodies[j].x-=temp2.x;//think about flipping the sign on temp2 so this can be an adding function
	bodies[j].y-=temp2.y;
	//total velocity invloved in the collision
	var v = subtract(bodies[i].vel,bodies[j].vel);
	//the normalized velocity i think
	var vn = dot(v,normalize(mtd));
	//i guess thjat cant be less than 0?..
	if (vn > 0) return;
	//i really dont get this one... it must be applying the restitution of the bodies to something to 
	//giving up on decyphering this for now, ill come back to it
	var ii = (-(1 + restitution) * vn) / (im1 + im2);
	var impulse = multiply(mtd,ii);
	temp = multiply(impulse,im1);
	temp2 = multiply(impulse,im2);
	bodies[i].vx+=temp.x;
	bodies[i].vy+=temp.y;
	bodies[j].vx-=temp2.x;
	bodies[j].vy-=temp2.y;
};	
    
