var width = window.innerWidth;
var height = window.innerHeight;
var scale = 1;
var originx = 0;
var originy = 0;
var visibleWidth = width;
var visibleHeight = height;
var zoomIntensity = .2;
	
function draw(showfps) {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	if (trail.length>0) {
		ctx.beginPath();
		ctx.moveTo((trail[0].x-originx)*scale,(trail[0].y-originy)*scale);
		for (i = 1; i < trail.length; i++) {
		ctx.lineTo((trail[i].x-originx)*scale, (trail[i].y-originy)*scale);
		};
		ctx.strokeStyle="red";
		ctx.stroke();
	};
	for (i = 0; i < bodies.length; i++) {
		ctx.beginPath();
		ctx.arc((bodies[i].x-originx)*scale, (bodies[i].y-originy)*scale, bodies[i].radius*scale, 0, 2 * Math.PI);
		ctx.strokeStyle=bodies[i].color;
		ctx.stroke();
	};
	if (showfps===true) {
		ctx.font = "15px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("FPS: "+fps,1,16);
	};
	if (!bMouseDown) {
		ctx.font = "15px Arial";
		ctx.fillStyle = "green";
		ctx.fillText("Left click/drag for single particle",1,31);
		ctx.fillText("Right click/drag for galaxy",1,46);
	}
	if (bMouseDown && !cancel && mode==0) {
		ctx.beginPath();
		ctx.moveTo(PreviousCoords.x,PreviousCoords.y);
		ctx.lineTo(dragToCoords.x, dragToCoords.y);
		ctx.strokeStyle="red";
		ctx.stroke();
		ctx.font = "15px Arial";
		ctx.fillStyle = "green";
		if (dragDist.Total=='NaN' || dragDist.Total==undefined) {
		ctx.fillText(0,1,31);
		} else {
		ctx.fillText('Velocity: '+Math.round(dragDist.Total*1000)/1000,1,31);
		};
		ctx.fillText('Mass: '+newMass+' (Change with Q/A)',1,46);
		ctx.fillText('Radius: '+newRadius+' (Change with W/S)',1,61);
		ctx.beginPath();
		ctx.arc(PreviousCoords.x, PreviousCoords.y, newRadius, 0, 2 * Math.PI);
		ctx.strokeStyle='blue';
		ctx.stroke();
	}
	if (bMouseDown && !cancel && mode==2) {
		ctx.beginPath();
		ctx.moveTo(PreviousCoords.x,PreviousCoords.y);
		ctx.lineTo(dragToCoords.x, dragToCoords.y);
		ctx.strokeStyle="red";
		ctx.stroke();
		ctx.font = "15px Arial";
		ctx.fillStyle = "green";
		if (dragDist.Total=='NaN' || dragDist.Total==undefined) {
		ctx.fillText(0,1,31);
		} else {
		ctx.fillText('Galaxy velocity: '+Math.round(dragDist.Total*1000)/1000,1,31);
		};
		ctx.fillText('Galaxy particle mass: '+Math.round(newGalaxyPMass*1000)/1000+' (Change with Q/A)',1,46);
		ctx.fillText('Galaxy particle radius: '+Math.round(newGalaxyPRad*1000)/1000+' (Change with W/S)',1,61);
		ctx.fillText('Galaxy radius: '+newGalaxyRad+' (Change with R/F)',1,76);
		ctx.fillText('Galaxy particle amount: '+newGalaxyCnt+' (Change with E/D)',1,91);
		ctx.beginPath();
		ctx.arc(PreviousCoords.x, PreviousCoords.y, newGalaxyRad, 0, 2 * Math.PI);
		ctx.strokeStyle='blue';
		ctx.stroke();
	}
	
};


function createInterval(f,dynamicParameter,interval) { setInterval(function() { f(dynamicParameter); }, interval); }

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}