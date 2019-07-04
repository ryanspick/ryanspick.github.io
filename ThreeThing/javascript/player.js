var Player = (function(){
	function Player(){
		this.position = new Vector(30, 600); // spawn point
		this.velocity = new Vector(0,0); // velocity is x and y
		this.hitpoints = 100; // spawn health
		this.width = 50;
		this.height = 64;
		
		this.onGround = true; // is the player touching the ground
		this.canJump = true; // is the player able to jump
		
		this.debugging = true;
	};
	var charImg // holds the image object for the player
	
	Player.prototype.loadContent = function(){
		// load images here
		charImg = new Image();
		charImg.src = "images/player/player.png";
	};
	
	Player.prototype.update = function(deltaTime, keys){
		// update player physics
		// apply gravity to the player
		this.velocity.addY(0.3);
			
		// jumping code using spacebar and two conditions
		if(keys[32] === true){
			if(this.canJump && this.onGround){
				this.velocity.setY(-10);	
				console.log(this.velocity.getY());	
				this.canJump = false;
				this.onGround = false;
			}
		}else{
			this.canJump = true;
		}
		
		// walking left and right code...
		if(keys[68] === true){
			this.velocity.setX(3);
		}else if(keys[65] === true){
			this.velocity.setX(-3);
		}else{
			this.velocity.setX(0);
		}
				
		// apply all velocity changes by updating position
		//this.velocity.multiply(deltaTime);
		this.position.add(this.velocity);
		// update the player's position using their velocity
		if(this.position.getY() > 600){
			this.onGround = true;
			this.position.setY(600);
		}
	};
	
	Player.prototype.draw = function(context){
		// draw anything related to the player
		context.save();
		context.drawImage(charImg, this.position.getX() - this.width/2, this.position.getY() - this.height/2, this.width, this.height);
		context.font = "16pt Consolas";
		var textWidth = context.measureText(this.hitpoints).width;
		context.fillText(this.hitpoints, this.position.getX() - textWidth/2, this.position.getY() - this.height/2);
		context.fillStyle = "#000000";
		context.lineWidth = 1;
		context.beginPath();
		context.rect(this.position.getX() - this.width/2, this.position.getY() - this.height/2, this.width, this.height);
		context.closePath();
		context.stroke();
		context.restore();
		
		if(this.debugging){
			context.beginPath();
			context.fillStyle = "#ffffff";
			context.lineWidth = 4;
			context.moveTo(this.position.getX() + 5, this.position.getY() - 27);
			context.lineTo(InputManager.currentMousePosition.getX(), InputManager.currentMousePosition.getY());
			context.closePath();
			context.stroke();
		}
		
	};

	return Player;
})();