var Tower = (function(){
	function Tower( pImageSrc, pRange,pDamage,pCost){
		this.Image = new Image();
		this.Image.src = pImageSrc;
		this.diameter = 40;
		this.range = pRange;
		this.cost = pCost;
		this.projectiles = new Array();
		this.localTimer=0;
		this.currentTargetX;
		this.currentTargetY;
		this.oldRotation;
	};
	var fireSpeed = 100;//lower = higher
	var deleting=false;

	Tower.prototype.projectiles;
	Tower.prototype.update = function(deltaTime,waveArray){
		deleting=true;
		if(InputManager.mouseDown){
		
		
			if(true){
				//console.log("tower clicked");			
			}		
		}
		
			for(var i=0;i<	this.projectiles.length;i++)
			{
				deleting =false;
				this.projectiles[i].update(deltaTime,waveArray);
				
				if(this.projectiles[i].position.getX()<0||this.projectiles[i].position.getX()>1280)
				{
					
					deleting=true;
				}
				else if(this.projectiles[i].position.getY()<0||this.projectiles[i].position.getY()>720)
				{
					deleting=true;
				}
				
				if(this.projectiles[i].isAlive==false)
				{
					deleting=true;
				}
				
				if(deleting)
				{
					this.projectiles.splice(i,1);
					continue;
				}
			}			
		

			this.targetFound = false;
			for(var i=0;i<waveArray.length;i++)
			{
				if(this.position.distance(waveArray[i].position)<this.range)
				{
						this.currentTargetX =waveArray[i].position.getX();
						this.currentTargetY =waveArray[i].position.getY();
						this.targetFound = true;
						if(this.localTimer>fireSpeed)
						{
							this.projectiles.push(new Projectile(new Vector(this.position.getX(),
							this.position.getY()),new Vector(waveArray[i].position.getX(),
							waveArray[i].position.getY()),100));
							this.localTimer=0;

						}
						break;
				}
				
			}
		
		 this.localTimer++;
		
		
		
	};
	Tower.prototype.setPosition= function(pPosition){
		this.position = pPosition;
	};
	

	
	Tower.prototype.draw = function(context){
		
		for(var i=0;i<this.projectiles.length;i++)
		{
			this.projectiles[i].draw(context);
		}
		
		var targetX =  this.position.getX()-this.currentTargetX ;
		var targetY =  this.position.getY()-this.currentTargetY ;

		rotation = Math.atan2(targetY, targetX);
		if (this.targetFound)
		{
			context.save();
			context.beginPath();
			context.moveTo(this.position.getX(),this.position.getY());
			context.lineTo(this.currentTargetX,this.currentTargetY);
			context.strokeStyle = "#ff0000";
			context.globalAlpha = 0.5;
			context.stroke();
			context.restore();
		}
		context.save();
		
		context.translate(this.position.getX(), this.position.getY());
		context.rotate(rotation)

		

		
		context.strokeStyle = "#ffffff";
		context.fillStyle = "#ffffff";
		
		if(InputManager.pressedKeys[67]){
		
		context.beginPath();
		context.arc(0, 0, this.range, 0, Math.PI * 2, true);
		context.closePath();
		context.globalAlpha = 0.2;
		context.stroke();
		context.fill();
		}
		context.globalAlpha = 1;
		context.drawImage(this.Image, -this.diameter/2, -this.diameter/2, this.diameter, this.diameter);
				
		context.restore();
	};	
	
	Tower.prototype.drawRadius = function(context){
	
		
		context.save();
		
		context.beginPath();
		context.arc(0, 0, this.range, 0, Math.PI * 2, true);
		context.closePath();
		context.globalAlpha = 0.2;
		context.stroke();
		context.fill();
		
		context.globalAlpha = 1;
		context.restore();
	};	


	return Tower;
})();