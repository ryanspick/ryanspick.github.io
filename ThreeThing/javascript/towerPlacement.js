var TowerPlacement = (function(){

	function TowerPlacement(){

	};
	
	var tileToDrawOn=0;
	TowerPlacement.prototype.draw = function (context){
		tileToDrawOn = isCollidingWithTile(context);

			return tileToDrawOn;

		
		
	
	}
	
	
	  var radius =25;
	  function  isCollidingWithTile(context){

	  
		for(var i =0;i<Background.tileVector.length;i++)
		{
			var dist = Background.tileVector[i].distance(new Vector(
			InputManager.currentMousePosition.getX(),InputManager.currentMousePosition.getY()));
			

		
		
			if(dist<=radius)
			{	
				context.save();
				context.globalAlpha=(.3);
				context.fillStyle = "#00ff00";
				context.strokeStyle = "#00ff00";
				context.beginPath();
			var anglePerSegment = Math.PI * 2 / 6;

			for (var j = 0; j <= 6; j++) {
					var angle = anglePerSegment * j;
					var x = Background.tileVector[i].getX() + radius * Math.cos(angle);
					var y = Background.tileVector[i].getY() + radius * Math.sin(angle);
					if (j == 0) {
					context.moveTo(x, y);
					}
					else {
						context.lineTo(x, y);
					}
				};
				context.fill();
				context.closePath();
				context.lineWidth = 0;
				context.restore();
				
				if(InputManager.mouseDown){
				return i;
				}
			}
		
		}
		return -1;
	
	
	}
	
	
	
	
	
	
	return TowerPlacement;
})();