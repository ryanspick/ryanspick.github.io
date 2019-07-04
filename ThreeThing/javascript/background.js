var Background = (function(){
	function Background(newTileRadius){
	this.tileRadius=newTileRadius;
	this.tileColour = '#000000';
	
	isAlternateColumn=false;
	var ID=0;
	for(var tilesX=this.tileRadius*1.1;tilesX<canvas.width;tilesX+=this.tileRadius*1.68)
	{
		if(!isAlternateColumn)
		{
			startVal=0;
			isAlternateColumn=true;
		}	
		else if (isAlternateColumn)
		{
			startVal=this.tileRadius;
			isAlternateColumn=false;
		}
		for(var tilesY =startVal;tilesY<canvas.height;tilesY+=this.tileRadius*1.9)
		{		
			Background.tileVector.push(new Vector(tilesX,tilesY+this.tileRadius/1.1));
			Background.tileID.push(ID++);
		}
	}
			
	};
	
	
	Background.prototype.setColour = function(pColour,ID){
		
		Background.
		
		this.tileColour=pColour;
	
	}
	
	Background.tileID = new Array();
	Background.tileVector = new Array();
	
	var inititial =true;
	var startVal=0;
	var isAlternateColumn;
	var canvasWidth,canvasHeight;
	
	Background.prototype.draw = function(context){
	
	canvasWidth=canvas.width;
	canvasHeight = canvas.height;
	
    isAlternateColumn=true;
	
	var ID=0;
	for(var tilesX=this.tileRadius*1.1;tilesX<canvasWidth;tilesX+=this.tileRadius*1.68)
	{
		if(!isAlternateColumn)
		{
			startVal=0;
			isAlternateColumn=true;
		}	
		else if (isAlternateColumn)
		{
			startVal=this.tileRadius;
			isAlternateColumn=false;
		}
		
		for(var tilesY =startVal;tilesY<canvasHeight;tilesY+=this.tileRadius*1.9)
		{
			
		context.beginPath();
	    var anglePerSegment = Math.PI * 2 / 6;

	    for (var i = 0; i <= 6; i = i + 1) {
	        var angle = anglePerSegment * i;
	        var x = tilesX + this.tileRadius * Math.cos(angle);
	        var y = tilesY + this.tileRadius * Math.sin(angle);
	        if (i == 0) {
	            context.moveTo(x, y);
	        }
	        else {
	            context.lineTo(x, y);
	        }
	    };
		context.closePath();
	    context.lineWidth = 0;
		context.strokeStyle = '#000000';
		if(createPath(ID))
			context.fillStyle = '#5C246E';//ultramarine violet
		else
			context.fillStyle = '#000000';
		context.fill();
		context.font = "16pt Consolas";
		context.fillStyle = '#ffffff';
		//context.fillText(ID,tilesX-20,tilesY);
	    context.stroke();

			ID++;
		}
			
		
	};
	

	};

	Background.level1Array = new Array(0, 16, 17, 33, 49, 64, 80, 81, 97, 98, 83,  84, 100, 115,
	130, 145, 161, 176, 191, 190, 174, 158, 157, 172, 187, 202, 218, 234, 250, 251, 236,
	221, 222, 223, 224, 209, 194, 195, 211, 212, 197, 182, 183, 199, 215, 230, 245,
	260, 259, 274, 289, 304, 303, 302, 301, 316, 331, 330, 345, 360, 375, 390, 405, 420, 436, 452, 453, 438, 
	 423, 424, 409, 394, 379, 380, 381, 382, 398, 414, 430, 431, 432);
	 function createPath(currentID){
		for(var i=0;i<Background.level1Array.length;i++)
		{	
			if(currentID==Background.level1Array[i])
				return true;
		}
		return false;
	};	


	
	
	return Background;
})();