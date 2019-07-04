var Score = (function(){
	function Score(){
		this.value = 300;
	};
	
	
	
	Score.prototype.add = function(value){
		this.value += value;
	};
	Score.prototype.subtract = function(value){
		this.value -= value;
	};
	
	Score.prototype.getValue = function(){
		return this.value;
	};
	Score.prototype.update = function(deltaTime){
		// add updating code here
		if(this.value < 0)
			this.value = 0;
	};	

	return Score;
})();