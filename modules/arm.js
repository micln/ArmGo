//
// Class 机械臂
//@Randox
/*  attribute ：{
		(leftz,topz)
		speed
		running

	}
		

	method : {
		init()
		draw()

		up()
		down()
		left()
		right()
		GoRight()		// Catch()

		Done()
		Halt()
		Died()
	}
*/
//
function ARM() {
    
    var that = this;
	
	//  边界
	this.leftz = state.x - conf.cell.x - 12;
	this.topz = state.y;
	this.bottonz = state.y + conf.cell.y * 12;
	
	//  爪子每次移动的像素点
	this.speed = 6;
	
	/**
	 *  爪子的状态
	 *      
	 *      意外停止时，通过修改running的值来使得arm停止
	 */
	this.running = false;
	
	this.init = function() {
		this.running = false;
		this.x = this.leftz;
		this.y = this.topz;
		this.r = 1;             //  行号
		this.hand = 0;
		// this.draw();
	}
	
	this.draw = function() {
		var x = this.x;
		var y = this.y;
		cxt.beginPath();
		cxt.moveTo(x, y);
		cxt.lineTo(x, y + 30);

		cxt.lineTo(x + 10, y + 30);
		cxt.lineTo(x + 1, y + 30 + 4);
		cxt.lineTo(x - 2, y + 30 + 4);
		cxt.lineTo(x - 4, y + 30);

		cxt.lineTo(x - 3, y + 30);
		cxt.lineTo(x - 6, y + 15);
		cxt.lineTo(x - 3, y);

		cxt.lineTo(x - 4, y);
		cxt.lineTo(x - 2, y - 4);
		cxt.lineTo(x + 1, y - 4);
		cxt.lineTo(x + 10, y);

		cxt.closePath();
		cxt.fillStyle = '#00ff00'; // 连接横杆
		cxt.fill();
		cxt.fillRect(240, y + 12, x - 240, 6);

		// 支撑立柱
		var gradient = cxt.createLinearGradient(240, 0, 246, 0);
		gradient.addColorStop("0", "#ccc");
		gradient.addColorStop("0.7", "#555");
		gradient.addColorStop("1.0", "#999");
		cxt.fillStyle = gradient;
		cxt.fillRect(240, state.y - 40, 6, 480);

		// 连接点
		cxt.fillStyle = '#00ff00'; // 连接点 + 爪子
		cxt.arc(243, this.y + 15, 5, 0, 2 * Math.PI);
		cxt.fill();
		
		//  抓到的东西
		if (this.hand != 0) {
		    drawcell(this.x, this.y, this.hand);
		}
	}
	
	this.halt = function() {
		arm.init();
		state.draw();
	}
	
	// 第(v,i)块指令执行完毕
	this.done = function(v, i) { 
	    
		log("[Done] " + v + ',' + i);
		
		if (v == undefined) return;

		
		
		
		// 右块正常，执行(v,i+1)
		if (runs.tasks[v][i + 1] != 0) {
			runs.run(v, i + 1); 
			
		} else {
		    // 右侧没有正常的指令，检查堆栈有无回溯
			
			var l = runs.stack.length - 1;
			if (l >= 0) {
			    //  回溯
				var x = runs.stack[l][0];
				var y = runs.stack[l][1];
				log("[Back] " + x + ',' + y);
				runs.stack.length--;
				this.done(x, y);
				
			} else {
			    //  堆栈空，结束游戏
				runs.finish(); // finish
			}
		}
	}
	
	//  撞毁
	this.died = function() {
		message("Destroyed!<hr>通过下方按钮“重新开始”")
	}
	
	//  向右运动，返回
	this.right = function() {
	    
		if (!this.running) return;
		
		//  计算右侧能走到的位置，假定能走到第5格（从0开始计数）
		var i = 5;
		while (i > 0 && state.box[this.r - 1][i - 1] != 0) i--;
		console.log('i='+i)
		//  如果右侧满且手里有东西，会撞毁
		if (i == 0 && this.hand != 0) {
			this.died();
			return;
		}
		
		//  走到最右边
		var num = ( state.x + conf.cell.x * i - (this.leftz + (this.hand>0) * conf.cell.x) ) / this.speed;
		actor.add("arm.doRight()", num)

        //  到右边之后执行抓取、放置		
		actor.add(function(){
		    
		    // 放下箱子
    		if (i > 0 && that.hand > 0) {
    			state.box[that.r - 1][i] = arm.hand;
    			that.hand = 0;
    		}
    		// 抓取箱子
    		else if (i < 6 && that.hand == 0 && state.box[that.r - 1][i] != 0) {
    			that.hand = state.box[that.r - 1][i];
    			state.box[that.r - 1][i] = 0;
    		}
		})
		
		//  检查答案
		actor.add("checkAns()")
		
		//  打道回府
		actor.add("arm.doLeft()", num)
		
	}
	
	//  向左运动
	this.left = function() { // 带入参数表示正在执行第(v,i)块指令
	
		if (!this.running) return;
		
		var num = ( this.x - this.leftz ) / this.speed;
		actor.add("arm.doLeft()", num)
	}
	
	this.up = function() {
	    
		if (!this.running) return;
		
		actor.add(function(){
    		if (that.r == 1) {
    			that.died();
    		}
		})
		
		//  计算需要下移的次数
		var num  =  conf.cell.y*2  / this.speed;
		actor.add("arm.doUp()", num)
		actor.add("arm.Rup()")
	}
	
	this.down = function() {
		if (!this.running) return;
		
		actor.add(function(){
		    if ( that.r >= 6 ) {
		        that.died()
		    } 
		})
		
		//  计算需要下移的次数
		var num  =  conf.cell.y*2  / this.speed;
		actor.add("arm.doDown()", num)
		actor.add("arm.Rdown()")

	}
	
	
	this.doUp = function(){
	    this.y -= this.speed;
	}
	this.doDown = function(){
	    this.y += this.speed;
	}
	this.doRight = function(){
	    this.x += this.speed;
	}
	this.doLeft = function(){
	    this.x -= this.speed;
	}
	
	this.Rup = function(){
	    this.r--;
	    log('arm is in row['+this.r+']')
	}
	this.Rdown = function(){
	    this.r++;
	    log('arm is in row['+this.r+']')
	}
	

    //  建立对象之后随即初始化
	this.init();
}