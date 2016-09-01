var width = window.innerWidth;
var height = window.innerHeight;
var visibleWidth = width;
var visibleHeight = height;

	
function draw() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	for (i = 0; i < bodies.length; i++) {
		ctx.beginPath();
		ctx.arc(bodies[i].x,bodies[i].y, bodies[i].radius, 0, 2 * Math.PI);
		ctx.strokeStyle=bodies[i].color;
		ctx.stroke();
	};
		ctx.font = "15px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("FPS: "+fps,1,16);
		ctx.fillText("By: Evan Morschhauser",width-160,16);
		ctx.fillText("Version 1.2",width-76,31);
		ctx.fillText('Press "~" button for debug mode',width-212,46);
	if (debug==true) {
		ctx.fillText(debugAction,1,height-46);
		ctx.fillText(bodies.length + " Bodies",1,height-16);
		ctx.fillText("Accuracy = "+(3600/dt)*100,1,height-31);
		for (i = 0; i < bodies.length; i++) {
		ctx.beginPath();
		ctx.moveTo(bodies[i].x,bodies[i].y);
		ctx.lineTo(bodies[i].x+((bodies[i].vx*1000000)),bodies[i].y+(bodies[i].vy*1000000));
		ctx.strokeStyle="green";
		ctx.stroke();
		};
	}
	if (!bMouseDown) {
		ctx.font = "15px Arial";
		ctx.fillStyle = "green";
		ctx.fillText("Left click/hold for single particle",1,31);
		ctx.fillText("Right click/hold for galaxy",1,46);
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
		ctx.fillText("Let go of button to create body",1,91);
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
		ctx.fillText("Let go of button to create bodies",1,121);
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