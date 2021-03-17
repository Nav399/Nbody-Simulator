//shoudl move all of the math functions related to vectors into this function
class _vector {
	constructor(x,y/*,z*/) {
		this.x = x;
		this.y = y;
		//z==undefined?1:this.z=z
	}
}

function chooseFromSet(a) {//wow this was so bad
	Math.random()>0.5?return a.x:return a.y
}

function dot(a,b) {//dot product of two vectors
	return a.x*b.x+a.y*b.y;
};

function mag(a) {//distance funtion but for only one vector AKA, magnitude
	return Math.sqrt(a.x*a.x + a.y*a.y);
};

function add(a,b) {//adds two vectors
	return new _vector(a.x+b.x,a.y+b.y);
};

function subtract(a,b) {//subtracts two vectors duh
	return new _vector(a.x-b.x,a.y-b.y);
};

function multiply(a,s)	{//multiply vector by given scale
	return new _vector(a.x*s,a.y*s)
};

function normalize(set)	{//normalize a vecotr
	var len = mag(set);
	if (len != 0) return new _vector(set.x/len,set.y/len);//if the lenght isnt zero, return mag
	return new _vector(0,0);//otherwise, its 0
};

function isOdd(num) { 
	return ((num % 2) == 1);
};

function gcd(a, b) {
    if (b) {
        return gcd(b, a % b);
    } else {
        return Math.abs(a);
    };
};

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
};

function FindForce(m,m1,r) {
	return (G * (m*m1 / (r*r)));
};

function FindDist(x,y,x1,y1) {
	var dx = x - x1;
	var dy = y - y1;
	var Total = Math.sqrt(dx*dx + dy*dy)
	return {
		dx: dx,
		dy: dy,
		Total: Total
	};
};

function FindOrbitVelocity(mass1,mass2,dist) {
	return Math.sqrt((G*(mass1+mass2))/(dist))
};

function Radians2Cartesian(r,theta) {
	result={};
	result.x=r*Math.cos(theta);
	result.y=r*Math.sin(theta);
	return result
};

function exportToText(variable) {
	var hiddenElement = document.createElement('a');

	hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
	hiddenElement.target = '_blank';
	hiddenElement.download = 'myFile.txt';
	hiddenElement.click();
};

function getFramerate() {
	var thisLoop = new Date;
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
	return Math.round(fps*1000)/1000;
};
