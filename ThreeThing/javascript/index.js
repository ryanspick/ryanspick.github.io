if(window.addEventListener){
	window.addEventListener('load', onLoad, true);
}

function onLoad(){
	var canvas;
	var context;
	var game = new Game();
	
	function initialise() {
		canvas = document.getElementById('canvas');
		if (!canvas) {
			alert('Error: Canvas element not found');
			return;
		}
		
		context = canvas.getContext('2d');
		if (!context) {
			alert('Error: Unable to get canvas context');
			return;
		}		
		game.initialise();
	};
	
	function update(deltaTime){
		game.update(deltaTime);		
	};

	function draw(){
		game.draw(context);
	};
	
	var lastTime = Date.now();
	function animationLoop(){
		// voodoo magic for constant timings
		var thisTime = Date.now();
		var deltaTime = thisTime - lastTime;
		update(deltaTime);
		draw();
		lastTime = thisTime;		
		setTimeout(animationLoop, 1000/100);	// ~100fps if possible	
	};
	
	initialise();
	animationLoop();
	
};