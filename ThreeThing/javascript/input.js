var InputManager = (function(){
	function InputManager(){		
		for(var i = 0; i < 250; i++){
			InputManager.pressedKeys[i] = false;
		}
		// if a window exists, add event listeners to the inputs
		if(window.addEventListener){
			window.addEventListener('keydown', onKeyDown, true);
			window.addEventListener('keyup', onKeyUp, true);
			window.addEventListener('mousedown', onMouseDown, true);
			window.addEventListener('mouseup', onMouseUp, true);
			window.addEventListener('mousemove', onMouseMove, true);
		}
		var canvasElement = document.getElementById("canvas");
		var style = window.getComputedStyle(canvasElement);
		InputManager.marginSize = 310;		
	};
	InputManager.currentMousePosition = new Vector(0,0);
	InputManager.previousMousePosition = new Vector(0,0);
	InputManager.mouseDown = false;
	InputManager.pressedKeys = new Array();
	InputManager.marginSize;
	
	function onKeyDown(event){
		if(InputManager.pressedKeys[event.keyCode] === false){
			InputManager.pressedKeys[event.keyCode] = true;	
			console.log(event.keyCode);
		}
	};
	function onKeyUp(event){
		InputManager.pressedKeys[event.keyCode] = false;
		
	};
	function onMouseDown(event){
		event.preventDefault();
		// set the position of the mouse when last clicked
		this.previousMousePosition = new Vector(event.x, event.y);
		InputManager.mouseDown = true;
	};
	function onMouseUp(event){
		// mouse button is no longer compressed
		InputManager.mouseDown = false;
		console.log("mouse released");
	};
	function onMouseMove(event){
		// update the mouse position every time it moves
		InputManager.currentMousePosition = new Vector(event.x - InputManager.marginSize, event.y - 30);
	};
	InputManager.prototype.getKeys = function(){
		return InputManager.pressedKeys;
	};

	return InputManager;
})();
