var Game = (function(){
	// constructor
	function Game(){
		// game object constructor
		this.fps;
		this.inputManager = new InputManager();
		this.background = new Background(hexRadius);//change for more hex less = more
		//this.testTower = new Tower(Background.tileVector[150], "images/towers/test.png", 400);
		this.testHUD = new HUD(listOfUseableTowers);
		this.testWave = new Wave(1);
		this.towerPlacement = new TowerPlacement();
		this.score = new Score();
	};	
	
	// game variables 
	var hexRadius = 25;
	
	// sounds
	var mainSong; // call mainSong.play() to play.
	
	// images
	
	Game.prototype.initialise = function(){
		// add inititalising logic here (setting variables)
		this.loadContent();
		testHUD = new HUD(listOfUseableTowers);
		Projectile.setImage(listOfUseableTowers[0]);
		
	};
	
	Game.prototype.loadContent = function(){
		// add all sounds and image loading code here
		// add sounds
		mainSong = new Audio();
		mainSong.src = "sounds/main.mp3";
		
		// add images
	};
	var numberOfEnemies=2;
	var loadEnemies=0;
	var waveTimer=250,waveCounter=1;
	Game.prototype.update = function(deltaTime){
		// update game logic here
		keys = this.inputManager.getKeys();
		fps = countFPS();	
		//this.testTower.update(deltaTime);
		this.testHUD.update(deltaTime);
		
		for(var i=0;i<towerArray.length;i++)//draw all towers in list
			towerArray[i].update(deltaTime,this.testWave.enemies);
			
		if(tileToAddTowerTo>0)
			this.towerPlace();
			
		this.testWave.update(deltaTime,this.score);
		if(loadEnemies<numberOfEnemies)
			{
				if(waveTimer>250)
				{
					waveTimer=0;
					loadEnemies++;
					this.testWave.enemies.push(new Enemy(100*waveCounter, "images/enemies/mine.png"));
					
				}
			}
		else
		{
			loadEnemies =0;
			waveCounter++;
		}
		waveTimer++;
		
	};
	var tileToAddTowerTo=-1;
	var towerArray = new Array();
	
	//new Tower(Background.tileVector[tileToAddTowerTo], "images/towers/test.png", 100)
	
	var listOfUseableTowers = new Array("images/towers/Fire Turret.png", "images/towers/Poison Turret.png", "images/towers/basic turret.png", "images/towers/Electric Turret.png");
	var shopOpen= false;
	var isTowerOnTile=false;
	Game.prototype.draw = function(context){
		// draw content to the canvas here
		
		
		context.fillStyle="#6495ED";
		context.fillRect(0,0,1280,720);
		
		this.background.draw(context);
		
		
		tileToAddTowerTo=this.towerPlacement.draw(context);//gets the id of the current tile
		
		//moved tower placemtn update to the actual update function
			
		for(var i=0;i<towerArray.length;i++)//draw all towers in list
			towerArray[i].draw(context);
		
		//draw enemies second last hp bars can be seen over towers
		this.testWave.draw(context);
		
		//draw hud last 
		shopOpen = this.testHUD.draw(context, this.score.getValue());
		
		context.font="16pt Calibri";
		context.fillStyle = "#E0D88D";
		context.fillText(fps.toFixed(0), canvas.width - 35, 30);
		context.fillText("Mouse: " + InputManager.currentMousePosition.getX() + ", " + InputManager.currentMousePosition.getY(), 10, 30);
		// context.fillText("Mouse down: " , 10, 60);
		
		// console.log(Background.tileVector[0].getX(),Background.tileVector[0].getY());
	};
	Game.prototype.towerPlace = function(){
		isTowerOnTile=false;
		for(var i=0;i<towerArray.length;i++)//checks with the current tiles to see if already in use
		{
			
			if(towerArray[i].position ==Background.tileVector[tileToAddTowerTo])
			{
				isTowerOnTile=true;
				break;
			}	
		isTowerOnTile=false;
		}
		
		if(!isTowerOnTile)
			for(var j =0;j<Background.level1Array.length;j++)
			{
				if(tileToAddTowerTo ==Background.level1Array[j])
				{
					isTowerOnTile=true;
					break;
				}	
			isTowerOnTile=false;
			}
		var cost =100;//cost of tower change later
		if(tileToAddTowerTo!=-1&&!isTowerOnTile&&this.score.getValue()>=cost && !shopOpen)//if the tile is free then add a tower
		{
				towerArray.push(new Tower(listOfUseableTowers[0],400,5,cost));
				this.score.subtract(cost);
				towerArray[towerArray.length-1].setPosition(Background.tileVector[tileToAddTowerTo]);
		}	
	}
	
	return Game;
})();

window.countFPS = (function () {
	 var lastLoop = (new Date()).getMilliseconds();
	 var count = 1;
	 var fps = 0;

	return function () {
		var currentLoop = (new Date()).getMilliseconds();
		if (lastLoop > currentLoop) {
		  fps = count;
		  count = 1;
		} else {
		  count += 1;
		}
		lastLoop = currentLoop;
		return fps;
	};
}());
