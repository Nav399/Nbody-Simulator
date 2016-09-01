function Collision(i,j)	{
	set=[bodies[i].x,bodies[i].y];
	set2=[bodies[j].x,bodies[j].y];
	delta = subtract(set,set2);
	r=(bodies[i].radius)+(bodies[j].radius);
	dist2=dot(delta,delta);
	if (dist2 > r*r) return;
	d = getLength(delta);
	if (d != 0) {
		mtd = multiply(delta,(((bodies[i].radius+bodies[j].radius)-d)/d));
	} else {
		d = bodies[i].radius+bodies[j].radius-1;
		delta = [bodies[i].radius+bodies[j].radius,0];
		mtd = multiply(delta,(((bodies[i].radius+bodies[j].radius)-d)/d));
	}
	im1 = 1/bodies[i].m;
	im2 = 1/bodies[j].m;
	temp = multiply(mtd,im1/(im1+im2));
	temp2 = multiply(mtd,im2/(im1+im2));
	bodies[i].x+=temp[0];
	bodies[i].y+=temp[1];
	bodies[j].x-=temp2[0];
	bodies[j].y-=temp2[1];
	set=[bodies[i].vx,bodies[i].vy];
	set2=[bodies[j].vx,bodies[j].vy];
	v=subtract(set,set2);
	vn=dot(v,normalize(mtd));
	if (vn > 0)	return;
	ii = (-(1 + restitution) * vn) / (im1 + im2);
	impulse=multiply(mtd,ii);
	temp=multiply(impulse,im1);
	temp2=multiply(impulse,im2);
	bodies[i].vx+=temp[0];
	bodies[i].vy+=temp[1];
	bodies[j].vx-=temp2[0];
	bodies[j].vy-=temp2[1];
	};	
    