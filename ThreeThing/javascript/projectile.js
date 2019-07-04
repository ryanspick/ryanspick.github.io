var Projectile = (function(){
	function Projectile(pPosition,pEndPosition,pDamage){
		this.img = Projectile.setImage();
		this.position=pPosition;
		this.endPosition = pEndPosition;
		this.damage = pDamage;
		this.directionalVector =this.endPosition.subtract(this.position);
		this.directionalVector=this.directionalVector.normalise();
		this.directionalVector = this.directionalVector.multiply(5);
		this.size = 5
		this.isAlive = true;
		
	};
	var localTimer=0;
	var fireSpeed=5;
	Projectile.prototype.update = function(deltaTime,waveArray){

		this.position.add(this.directionalVector);
		for(var i=0;i<waveArray.length;i++)
		{
			if(isColliding(waveArray[i].position,this.position,this.size/2,waveArray[i].size/2))
			{
				waveArray[i].hitpoints-=this.damage
				this.isAlive = false;
			}
		}

		
	};
	
	function isColliding(p2,p1,bulletRadius,enemyRadius)
	{
		dist = Math.sqrt((p1.getX()-p2.getX())*(p1.getX()-p2.getX()) + (p1.getY()-p2.getY())*(p1.getY()-p2.getY()))
		
		if(dist < bulletRadius+enemyRadius)
			return true;
		return false;
		
	};
	
	function isColliding1(p2,p1,w1,w2,h1,h2)
	{
		if(p1.getX()+w1>=p2.getX())
			if(p2.getX()+w2>=p1.getX())
				if(p2.getY()<=p1.getY()+h1)
					if(p2.getY()+h1>=p1.getY())
					{
						return true;
					}
					
		return false;
		
	};
	Projectile.prototype.draw= function(context){
		context.drawImage(Projectile.thisImage,this.position.getX(),this.position.getY(),this.size,this.size);
		
	};
	Projectile.thisImage;
	Projectile.setImage = function(){
		Projectile.thisImage = new Image();
		Projectile.thisImage.src = "images/towers/test.png";		
	};
	
	
	
	return Projectile;
})();