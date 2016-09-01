function chooseFromSet(set) {
	i = getRandomNum(0,1);
			if (i < .5) {
				result = set[0]
			} else {
				result = set[1]
			};
	return result
}

function dot(set,set2)	{
	return set[0]*set2[0]+set[1]*set2[1];
};

function getLength(set)	{
	return Math.sqrt(set[0]*set[0] + set[1]*set[1]);
};

function add(set,set2)	{
	return [(set[0]+set2[0]),(set[1]+set2[1])];
};

function subtract(set,set2)	{
	return [(set[0]-set2[0]),(set[1]-set2[1])];
};

function multiply(set,scale)	{
	return [(set[0]*scale),(set[1]*scale)]
};

function normalize(set)	{
	var len = getLength(set);
	if (len != 0)	{
		set[0]=set[0]/len;
		set[1]=set[1]/len;
	} else {
		set[0]=0;
		set[1]=0;
	}
	return set;
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
