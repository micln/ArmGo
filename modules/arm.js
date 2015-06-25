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
		this.r = 1;
		this.hand = 0;
		this.draw();
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
		cxt.fillStyle = '#00ff00'; // 连接杆
		cxt.fill();
		cxt.fillRect(240, y + 12, x - 240, 6);

		// 柱子
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
	
	this.right = function(v, ii) {
	    
		if (!this.running) return;
		
		//  计算右侧能走到的位置
		var i = 6;
		while (i > 0 && state.box[this.r - 1][i - 1] != 0) i--;
		
		//  如果右侧满且手里有东西，会撞毁
		if (i == 0 && this.hand != 0) {
			this.died();
			return;
		}
		
		//  送到
		this.goRight(state.x + conf.cell.x * i, v, ii);
	}
	
	this.left = function(v, i) { // 带入参数表示正在执行第(v,i)块指令
	
		if (!this.running) return;
		
		this.x -= this.speed;
		if (this.x > this.leftz) {
			setTimeout('arm.left(' + v + ',' + i + ')', conf.Fz);
		} else {
			this.done(v, i);
		}
	}
	
	this.up = function(v, i) {
	    
		if (!this.running) return;
		
		if (this.r == 1) {
			this.died();
			return;
		}
		this.y -= this.speed;
		if (this.y > (state.y + conf.cell.y * (this.r - 2) * 2)) {
			setTimeout('arm.up(' + v + ',' + i + ')', conf.Fz);
			//sleep(conf.Fz);this.up();
		} else {
			this.r--;
			this.done(v, i);
		}
	}
	
	this.down = function(v, i) {
		if (!this.running) return;
		if (this.r == 6) {
			this.died();
			return;
		}
		this.y += this.speed;
		if (this.y < (state.y + conf.cell.y * (this.r * 2))) {
			setTimeout('arm.down(' + v + ',' + i + ')', conf.Fz);
			//sleep(conf.Fz);this.down();
		} else {
			this.r++;
			this.done(v, i);
		}
	}
	
	this.goRight = function(x, v, ii) {
	    
		if (!this.running) return;
		
		this.x += this.speed;
		
		//  还没走到就继续走
		if (this.x + (this.hand > 0) * conf.cell.x < x) {
			setTimeout('arm.goRight(' + x + ',' + v + ',' + ii + ')', conf.Fz);
			
			
		//  走到最右边了
		} else if (this.x + (this.hand > 0) * conf.cell.x == x) {       

            // i <- first conf.cell	
			var i = 6;
			while (i > 0 && state.box[this.r - 1][i - 1] != 0) i--; 

			// fall
			if (i > 0 && this.hand > 0) {
				state.box[this.r - 1][i - 1] = this.hand;
				this.hand = 0;
			} else

			// catch
			if (i < 6 && this.hand == 0 && state.box[this.r - 1][i] != 0) {
				this.hand = state.box[this.r - 1][i];
				state.box[this.r - 1][i] = 0;
			}
			
		    //  打道回府
		    //  此过程为异步操作，不影响下面的代码
			this.left(v, ii);
			
			//  同时检查答案，延时200ms只是为了避免突兀
			setTimeout(checkAns, 200);
		}
	}

    //  建立对象之后随即初始化
	this.init();
}