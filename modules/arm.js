//
// Class 机械臂
//@Randox
/*  attribute ：
		

	method :
*/
//
function ARM(){
	this.leftz = state.x - conf.cell.x - 12;
	this.topz = state.y;
	this.bottonz = state.y + conf.cell.y * 12;
	this.speed = 6;
	this.running = false;
	this.color = '#00ff00';
	this.init = function(){
		this.running = false;
		this.x = this.leftz;
		this.y = this.topz;
		this.r = 1;
		this.hand = 0;
		this.draw();
	}
	this.draw = function(){
		var x = this.x;
		var y = this.y;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x,y+30);
		cxt.lineTo(x-2,y+30);
		cxt.lineTo(x-6,y+15);
		cxt.lineTo(x-2,y);
		cxt.closePath();
		cxt.fillStyle = this.color;
		cxt.fill();
		cxt.fillRect(240,y+11,x-240,8);
		cxt.fillRect(240,state.y-40,6,400);
		if ( this.hand != 0 ) drawcell(this.x,this.y,this.hand);
	}
	this.halt = function(){
		arm.init();
		state.draw();
	}
	this.done = function(v,i){					// 第(v,i)块指令执行完毕
		log("[Done] " + v + ',' + i);
		if ( v == undefined ) return ;
		if ( runs.tasks[v][i+1] != 0 ) {
			runs.run(v,i+1);				// 执行(v,i+1)
		}else{								// 检查堆栈
			var l = runs.stack.length-1;
			if ( l >= 0 ){
				var x = runs.stack[l][0];
				var y = runs.stack[l][1];
				log("[Back] " + x + ',' + y);
				runs.stack.length--;
				this.done(x,y);
			}else{
				runs.finish();			// finish
			}
		}
	}
	this.died = function(){
		message("Destroyed!<hr>通过下方按钮“重新开始”")
	}
	this.right = function(v,ii){
		if (!this.running) return;
		var i = 6;
		while ( i>0 && state.box[this.r-1][i-1] != 0 ) i--;
		if ( i==0 && this.hand != 0) {
			this.died();
			return;
		}
		this.goRight(state.x+conf.cell.x*i,v,ii);
	}
	this.left = function(v,i){			// 带入参数表示正在执行第(v,i)块指令
		if (!this.running) return;
		this.x -= this.speed ;
		if ( this.x > this.leftz ){
			setTimeout('arm.left('+v+','+i +')',conf.Fz);
		}else {
			this.done(v,i);
		}
	}
	this.up = function(v,i){
		if (!this.running) return;
		if ( this.r == 1 ) {
			this.died();
			return ;
		}
		this.y -= this.speed ;
		if (this.y > (state.y+conf.cell.y*(this.r-2)*2) ) {
			setTimeout('arm.up('+v+','+i+')',conf.Fz);
			//sleep(conf.Fz);this.up();
		}else {
			this.r --;
			this.done(v,i);
		}
	}
	this.down = function(v,i){				
		if (!this.running) return;
		if ( this.r == 6 ) {
			this.died();
			return ;
		}
		this.y += this.speed ;
		if ( this.y < ( state.y+conf.cell.y*(this.r*2))) {
			setTimeout('arm.down('+v+','+i+')',conf.Fz);
			//sleep(conf.Fz);this.down();
		}else {
			this.r ++ ;
			this.done(v,i);
		}
	}
	this.goRight = function(x,v,ii){
		this.x 	+= this.speed ;
		if ( this.x + (this.hand > 0)*conf.cell.x  < x ){
			setTimeout('arm.goRight('+x+','+v+','+ii+')',conf.Fz);
			//sleep(conf.Fz);this.goRight(x);
		}if ( this.x + (this.hand > 0)*conf.cell.x  == x ){
			
			var i = 6;
			while ( i>0 && state.box[this.r-1][i-1] != 0 ) i--;	// i <- first conf.cell	
			
			// fall
			if (i>0 && this.hand>0 ){
				state.box[this.r-1][i-1] = this.hand;
				this.hand = 0;
			}
			else 
			
			// catch
			if (i<6 && this.hand==0 && state.box[this.r-1][i] != 0){
				this.hand = state.box[this.r-1][i];
				state.box[this.r-1][i] = 0;
			}
			
			this.left(v,ii);
			setTimeout('checkAns()',200);
		}
	}

	this.init();
}
