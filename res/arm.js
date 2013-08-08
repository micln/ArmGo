//
// Class 机械臂
//@Randox
/*  attribute ：
		

	method :
*/
//
function ARM(){
	this.leftz = STATE.x - CELL.x - 12;
	this.topz = STATE.y;
	this.bottonz = STATE.y + CELL.y * 12;
	this.speed = 6;
	this.color = '#00ff00';
	this.init = function(){
		this.x = this.leftz;
		this.y = this.topz;
		this.r = 1;
		this.hand = 0;
	}
	this.init();
	this.draw = function(){
		var x = arm.x;
		var y = arm.y;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x,y+30);
		cxt.lineTo(x-2,y+30);
		cxt.lineTo(x-6,y+15);
		cxt.lineTo(x-2,y);
		cxt.closePath();
		cxt.fillStyle = arm.color;
		cxt.fill();
		cxt.fillRect(240,y+11,x-240,8);
		cxt.fillRect(240,STATE.y-40,6,400);
		if ( arm.hand != 0 ) drawCell(arm.x,arm.y,arm.hand);
	}
	this.done = function(v,i){
		if ( v == undefined ) return ;
		if ( runs.tasks[v][i+1] != 0 ) {
			runs.run(v,i+1);
		}else{
			var l = runs.stack.length-1;
			var x = runs.stack[l][0];
			var y = runs.stack[l][1];
			runs.stack.length--;
			runs.run(x,y+1);
		}
	}
	this.right = function(v,ii){
		var i = 6;
		while ( i>0 && state[this.r-1][i-1] != 0 ) i--;
		this.goRight(STATE.x+CELL.x*i,v,ii);
	}
	this.left = function(v,i){
		this.x -= this.speed ;
		if ( this.x > this.leftz ){
			setTimeout('arm.left('+v+','+i +')',Fz);
			//sleep(Fz);this.left();
		}else {
			this.done(v,i);
		}
	}
	this.up = function(v,i){
		if ( this.r == 1 ) return ;
		this.y -= this.speed ;
		if (this.y > (STATE.y+CELL.y*(this.r-2)*2) ) {
			setTimeout('arm.up('+v+','+i+')',Fz);
			//sleep(Fz);this.up();
		}else {
			this.r --;
			this.done(v,i);
		}
	}
	this.down = function(v,i){
		if ( this.r == 6 ) return ;
		this.y += this.speed ;
		if ( this.y < ( STATE.y+CELL.y*(this.r*2))) {
			setTimeout('arm.down('+v+','+i+')',Fz);
			//sleep(Fz);this.down();
		}else {
			this.r ++ ;
			this.done(v,i);
		}
	}
	this.goRight = function(x,v,ii){
		this.x 	+= this.speed ;
		if ( this.x + (this.hand > 0)*CELL.x  < x ){
			setTimeout('arm.goRight('+x+','+v+','+ii+')',Fz);
			//sleep(Fz);this.goRight(x);
		}if ( this.x + (this.hand > 0)*CELL.x  == x ){
			
			var i = 6;
			while ( i>0 && state[this.r-1][i-1] != 0 ) i--;	// i <- first CELL	
			
			// fall
			if (i>0 && this.hand>0 ){
				state[this.r-1][i-1] = this.hand;
				this.hand = 0;
			}
			else 
			// catch
			if (i<6 && this.hand==0 && state[this.r-1][i] != 0){
				this.hand = state[this.r-1][i];
				state[this.r-1][i] = 0;
			}
			
			this.left(v,ii);
			setTimeout('checkAns()',200);
		}
	}
}