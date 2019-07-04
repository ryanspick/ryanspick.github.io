var Enemy = (function(){
	function Enemy(pHitpoints, pImg){
		this.maxHitpoints = pHitpoints;
		this.hitpoints = pHitpoints;
		this.score = pHitpoints*.1;//change to speed parameter later
		this.position = Background.tileVector[Background.level1Array[0]];
		this.Image = new Image();
		this.Image.src = pImg;
		this.size = 40;
		this.currentTargetNode = 1;
		this.rotation = 0;
		this.targetPosition;
		this.direction = new Vector(0,0);
		this.moveSpeed =.1;
	};

	Enemy.prototype.move = function(){
		// get the target position as a vector
		this.targetPosition = Background.tileVector[Background.level1Array[this.currentTargetNode]];
				
		// position = position + ((target - position) * constant)
		this.direction.setX(this.targetPosition.getX() - this.position.getX());
		this.direction.setY(this.targetPosition.getY() - this.position.getY());		
		
		this.position = new Vector((this.position.getX() + (this.direction.getX() * this.moveSpeed)),
						(this.position.getY() + (this.direction.getY() * this.moveSpeed)));
		
		if(this.targetPosition.distance(this.position) <= 0.1){
			this.currentTargetNode = this.currentTargetNode + 1;
			if(this.currentTargetNode === Background.level1Array.length){
				this.currentTargetNode = 0;
			}
		}		
	};
	
	Enemy.prototype.update = function(deltaTime){	
		this.rotation += 0.1;
		

		
		this.move();
	};	
	var showHP = true;
	Enemy.prototype.draw = function(context){
		
		if(InputManager.pressedKeys[72]){
			if (!showHP)
				showHP = true;
			else
				showHP = false;

		}
		if(this.hitpoints > 0 && showHP){
			context.save();
			context.fillStyle = '#00ff00';
			context.fillRect(this.position.getX()-40,this.position.getY()-40,80*(this.hitpoints/this.maxHitpoints),2);
			context.fillStyle = '#ff0000';
			context.fillRect(this.position.getX()-40+ 80*(this.hitpoints/this.maxHitpoints) ,this.position.getY()-40, 80*(1-(this.hitpoints/this.maxHitpoints)),2);
			
			//context.fillText(this.hitpoints+"/"+this.maxHitpoints,this.position.getX()-60,this.position.getY()-50);
			context.restore();
			}
		if(this.hitpoints > 0){
		context.save();
		context.globalAlpha = 0.8;
		context.translate(this.position.getX(), this.position.getY());
		context.rotate(this.rotation);
		context.drawImage(this.Image, -this.size/2, -this.size/2, this.size, this.size);
		
		context.restore();
		

		}
	};	

	return Enemy;
})();