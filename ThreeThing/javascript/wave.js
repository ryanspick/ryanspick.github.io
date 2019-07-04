var Wave = (function(){
	function Wave(waveNumber){		
		
			//this.enemies.push(new Enemy(100, "images/enemies/mine.png"));
			this.pointsForWave=0;
		
	};
	Wave.prototype.enemies = new Array();
	
	Wave.prototype.update = function(deltaTime,test){
		
		// update each of the enemies in the wave
		for(var i = 0; i < this.enemies.length; i++){

			
			this.enemies[i].update(deltaTime);
			
			if(this.enemies[i].hitpoints<=0)
			{
			//get the value of the enemy killed
				//this.pointsForWave +=enemies[i].score;			
				test.add(this.enemies[i].score);
				this.enemies.splice(i,1);
				
				continue;
			}
			
		}
	};
	
	Wave.prototype.draw = function(context){
	
		// draw each of the enemies in the wave
		for(var i = 0; i < this.enemies.length; i++){
			this.enemies[i].draw(context);
		}		
	};

	return Wave;
})();