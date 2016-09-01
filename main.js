	//initiate variables
    var dt = (60*60);         	//In seconds
    var G = 6.67384e-11;    	//Gravitational constant
	var e = 1;					//epsilon, to stop infinite forces
	var bodies = [];			//Particle array
	var forceMultiplier = 1;	//Force multiplier for stability
	var ParticleCount = 1000;	//Generate "x" random particles
	var restitution = .15;		//Particle "bounciness"
	var loopnumber=0;
	var lastLoop = new Date;
	var pause=false;

	var bMouseDown = false;
	//default configs
	var newMass = 1
	var newRadius = 1
	var newGalaxyPMass = .01
	var newGalaxyPRad = .05
	var newGalaxyRad = 100
	var newGalaxyCnt = 100
	var newGalaxyCRadius = 3
	var newGalaxyCMass = 1000
	var newFillMass = 1
	var newFillCnt = 1000
	var mode = -1
	var debug=false
	var debugAction="No Activity"
	
	
	document.addEventListener('mousedown', function (Event) {
	cancel=false
    bMouseDown = true;
	dragDist = {
		'dx':0,
		'dy':0
	};
    PreviousCoords = {
        'x': Event.clientX,
        'y': Event.clientY
    };
	dragToCoords = {
			'x':Event.clientX,
			'y':Event.clientY
		}
	dragFromCoords = {
		'x':Event.clientX,
		'y':Event.clientY
		};
	mode= Event.button
	});

	document.addEventListener('mouseup', function (Event) {
		if (cancel==true) return;
		if (bMouseDown && mode==0) {
			makeParticle(dragFromCoords.x,dragFromCoords.y,newMass,newRadius,(-dragDist.dx)/1000000,(-dragDist.dy)/1000000,"white",true);
		} else if (bMouseDown && mode==2) {
			addGalaxy(dragFromCoords.x,dragFromCoords.y,newGalaxyRad,newGalaxyCnt,(-dragDist.dx)/1000000,(-dragDist.dy)/1000000,"cw",newGalaxyPMass,newGalaxyPRad,newGalaxyCMass,newGalaxyCRadius)
		} else if (bMouseDown && mode==1) {
			fillRandomParticles(newFillMass,0,newFillCnt);
		}
    bMouseDown = false;
	mode=-1;
	});

	document.addEventListener('mousemove', function (Event) {
    if (!bMouseDown) {
        return;
    }
		dragToCoords = {
			'x':Event.clientX,
			'y':Event.clientY
		}
		dragDist = FindDist(PreviousCoords.x,PreviousCoords.y,dragToCoords.x,dragToCoords.y)
	});
	
	document.addEventListener('keydown', function (e) {
		if (bMouseDown && mode==0) {
			if (e.keyCode== '27') {
				cancel=true
			} //esc
			if (e.keyCode== '81') {
				newMass+=5
			} //q
			if (e.keyCode== '65' && newMass!=1) {
				newMass-=5
			} //a
			if (e.keyCode== '87') {
				newRadius++
			} //w
			if (e.keyCode== '83' && newRadius!=1) {
				newRadius--
			} //s
		};
		if (bMouseDown && mode==2) {
			if (e.keyCode== '27') {
				cancel=true
			} //esc
			if (e.keyCode== '81') {
				newGalaxyPMass+=.1
			} //q
			if (e.keyCode== '65' && newGalaxyPMass>.1) {
				newGalaxyPMass-=.1
			} //a
			if (e.keyCode== '87') {
				newGalaxyPRad+=.01
			} //w
			if (e.keyCode== '83' && newGalaxyPRad>.05) {
				newGalaxyPRad-=.01
			} //s
			if (e.keyCode== '69') {
			newGalaxyCnt+=1
			} //e
			if (e.keyCode== '68' && newGalaxyCnt!=1) {
				newGalaxyCnt-=1
			} //d
		};
		if (bMouseDown && mode==1) {
			if (e.keyCode== '81') {
				newFillMass+=1
			} //q
			if (e.keyCode== '65' && newFillMass!=1) {
				newFillMass-=1
			} //a
			if (e.keyCode== '87') {
				newFillCnt+=5
			} //w
			if (e.keyCode== '83' && newFillCnt>1) {
				newFillCnt-=5
			} //s
		};
		if (mode==-1) {
		if (e.keyCode== '8') {
			CleanParticles(height,width);
		} //backspace
		if (e.keyCode== '81' && dt>60) {
			dt-=60
		} //q
		if (e.keyCode== '65') {
			dt+=60
		} //a
		if (e.keyCode== '192') {
			changeDebug()
		} //~
		};
	});
	 function changeDebug() {
		 if (debug==true) {
			 debug = false;
		 } else {
			 debug = true
		 };
	 };


	//nbody example
	//	addGalaxy((width/2),(height/5),100,ParticleCount/2,.0000076,0,"cw",.01,.01,ParticleCount,5);
	//	addGalaxy((width/2),(height/5)*4,100,ParticleCount/2,-.0000076,0,"cw",.01,.01,ParticleCount,5);
	//		addGalaxy((width/2),(height/2),200,2500,0,0,"cw",.01,.001,ParticleCount,5);
	//	fillRandomParticles(10,true,5000);
	//makeParticle(width/2,(height/3)*1.2,(100),10,0,0,"red",true);
	//makeParticle(width/2,height/3,(100),10,0,0,"red",true);

		createInterval(nbody,true,0);
