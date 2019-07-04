var HUD = (function(){
	function HUD(pTowerImages){
		this.heartImage = new Image();
		this.heartImage.src = "images/store/heart.png";
		this.coinsImage = new Image();
		this.coinsImage.src = "images/store/coin icon.png";
		this.inShop = false; // debug
		this.isPaused = false;
		this.towersArray = new Array();
		this.towersArray = pTowerImages
		this.fireturret = new Image();	
		this.fireturret.src = this.towersArray[0];
		this.poisonturret = new Image();	
		this.poisonturret.src = this.towersArray[1];
		this.basicturret = new Image();	
		this.basicturret.src = this.towersArray[2];
		this.electricturret = new Image();	
		this.electricturret.src = this.towersArray[3];
	};
	
	
	
	HUD.prototype.update = function(deltaTime){
		if(InputManager.pressedKeys[83]){
			this.inShop = true;
		}else{
			this.inShop = false;
		}
		if(InputManager.pressedKeys[80]){
			this.isPaused = !this.isPaused;
		}
		
	};
	
	HUD.prototype.draw = function(context, pScore){
		context.save();
		
		context.lineWidth = 15;
		context.fillStyle = "#000000";
		context.strokeStyle = "#0000ff";
		context.beginPath();
		context.moveTo(0,0);
		context.rect(0,0,1280,720);
		context.closePath();
		context.stroke();
				
		if(!this.inShop){
			context.drawImage(this.coinsImage, 15, 675, 25, 25);
			context.font = "20pt Consolas";
			context.fillStyle = "#E0D88D";
			context.fillText(pScore, 43, 695);
		}
		
		if(this.inShop){
			context.fillStyle = "#000000";
			context.beginPath();
			context.moveTo(240, 100);
			context.lineTo(1040, 100);
			context.arc(1040, 120, 20, 1.5 * Math.PI, 0);
			context.lineTo(1060, 600);
			context.arc(1040, 600, 20, 0, 0.5 * Math.PI);
			context.lineTo(240, 620)
			context.arc(240, 600, 20, 0.5 * Math.PI, Math.PI);
			context.lineTo(220, 120);
			context.arc(240, 120, 20, Math.PI, 1.5 * Math.PI);
			context.closePath();
			context.stroke();
			context.fill();
			
			context.save();
			context.beginPath();
			context.strokeStyle = "#E0D88D";
			context.lineWidth = 5;
			context.translate(300, -50);
			context.moveTo(240, 170);
			context.lineTo(540, 170);
			context.moveTo(240, 180);
			context.lineTo(440, 180);
			context.moveTo(240, 190);
			context.lineTo(340, 190);
			context.closePath();
			context.stroke();
			context.restore();
			
			context.font = "20pt Consolas";
			context.fillStyle = "#E0D88D";
			context.fillText("Clockwork Munitions", 240, 140);	
			
			context.fillRect(870, 200, 150, 50);
			context.fillRect(870, 300, 150, 50);
			context.fillRect(870, 400, 150, 50);
			context.fillRect(870, 500, 150, 50);
			
			context.fillStyle="#ff0000";
			context.fillText("Buy", 920, 235);
			context.fillText("Buy", 920, 335);
			context.fillText("Buy", 920, 435);
			context.fillText("Buy", 920, 535);
			
			if(pScore >= 100){
				context.fillStyle="#00ff00";
				context.fillText("Buy", 920, 235);
			
			}
			if(pScore >= 200){			
				context.fillStyle="#00ff00";
				context.fillText("Buy", 920, 335);
			}
			if(pScore >= 400){
				context.fillStyle="#00ff00";
				context.fillText("Buy", 920, 435);
			
			}
			if(pScore >= 600){
				context.fillStyle="#00ff00";
				context.fillText("Buy", 920, 535);
			
			}
			
			
			
			context.drawImage(this.coinsImage, 240, 580, 25, 25);			
			context.font = "20pt Consolas";
			context.fillStyle = "#E0D88D";
			context.fillText(pScore, 270, 601);
			context.fillText("Gattling Gun (100)", 325, 230);
			context.fillText("Flamethrower (200)", 325, 330);
			context.fillText("Gas Pump (400)", 325, 430);
			context.fillText("Tesla Coil (600)", 325, 530);
			
			context.drawImage(this.fireturret, 250, 180, 75, 75);
			context.drawImage(this.poisonturret, 250, 280, 75, 75);
			context.drawImage(this.basicturret, 250, 380, 75, 75);
			context.drawImage(this.electricturret, 250, 480, 75, 75);
		}
		
		if(this.isPaused){
			context.beginPath();
			context.moveTo(0,0);
		}
		
		
		//context.fillText(this.inShop, 30, 200);
		
		//context.drawImage(this.heartImage, 980, 270, 30, 30);
		
		context.restore();
		if(this.inShop)
			return true;		
		else
			return false
	};
	
	return HUD;
})();