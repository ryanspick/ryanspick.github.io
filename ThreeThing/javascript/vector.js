var Vector = (function(){
	// vector class constructor
	function Vector(pX, pY){
		this.setX(pX);
		this.setY(pY);
	};
	// getter method for X
	Vector.prototype.getX = function(){
		return this.mX;
	};
	// setter method for X
	Vector.prototype.setX = function(pX){
		this.mX = pX;
	};
	// getter method for Y
	Vector.prototype.getY = function(){
		return this.mY;
	};
	// setter method for Y
	Vector.prototype.setY = function(pY){
		this.mY = pY;
	};
	// adds a vector to current object
	Vector.prototype.add = function(pVector){
		this.setX(this.getX() + pVector.getX());
		this.setY(this.getY() + pVector.getY());
	};
	// adds an x value to the current object
	Vector.prototype.addX = function(pValue){
		this.setX(this.getX() + pValue);
	};
	// adds a y value to the current object
	Vector.prototype.addY = function(pValue){
		this.setY(this.getY() + pValue);
	};
	// subtracts a vector from current object
	Vector.prototype.subtract = function(pVector){
		var x=(this.getX() - pVector.getX());
		var y=(this.getY() - pVector.getY());	
		return new Vector(x,y);
	};
	// multiplies a vector with current object
	Vector.prototype.multiply = function(pScalar){
		var x=(this.getX() * pScalar);
		var y =(this.getY() * pScalar);
		return new Vector(x,y);
	};
	// divides current vector by a value
	Vector.prototype.divide = function(pScalar){
		var x=(this.getX() / pScalar);
		var y =(this.getY() / pScalar);	
		return new Vector(x,y);
	};
	// returns the magnitude of the current vector
	Vector.prototype.magnitude = function(){
		return Math.sqrt(this.getX()*this.getX() + this.getY() * this.getY());
	};
	// modifies the current vector to a unit vector
	Vector.prototype.normalise = function(){
		var norm = this.divide(this.magnitude());
		return norm;
	};
	// limits current vector to another vector
	Vector.prototype.limitTo = function(pLimit){
		var magnitude = this.magnitude();
		if(magnitude > pLimit){
			this.multiply(pLimit/magnitude);
		}
	};	
	// returns the dot product of the current vector and another vector
	Vector.prototype.dotProduct = function(pVector){
		return (thisgetX() * pVector.getX() + this.getY() * pVector.getY());
	};	
	Vector.prototype.distance = function(pVector){
		var dist= Math.sqrt(((pVector.getX()-this.mX)*(pVector.getX()-this.mX))+
		((pVector.getY()-this.mY)*(pVector.getY()-this.mY)));
		
		return dist;
	};	
	return Vector;
})();