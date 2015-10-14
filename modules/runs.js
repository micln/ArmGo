/*  
	Class {游戏操作区 && 运行控制器}

	attribute {
		obj			交互层的div元素

		x,y,r,c		相对画布的坐标，尺寸

		tasks[][]	已上膛的指令块
		ifs[][]		已上膛的if指令块

		stack[]		递归运行中的堆栈
	}

	method {
		settool(e,v)	为第v块选择指令（选择面板放在e位置，下同）
		settoolifs(e,v)	选择if指令块

		draw()		绘制操作区背景
		hide()		隐藏交互层div

		run(v,i)	机器运行引擎（去执行第(v,i)个指令块）

		start()		启动机器
		finish()	机器正常结束
		stop()		强行终止机器
	}
*/
function RUNS() {
	that = this;
	this.obj = eid("runs");
	this.x = state.x + conf.cell.x * 8;
	this.y = state.y - conf.cell.y + cope.height * 0.7;
	this.r = cope.width * 9;
	this.c = cope.height * 6.8;
	
	//  当递归深度超过这个值时，认为是无限递归，直接退出
	this.stackLim = 50;
	
	this.clear = function() {
		this.tasks = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0]
		];
		this.ifs = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0]
		];
		this.loops = [
			[1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1]
		];

		/** 
		 *      Stack
		 *      
		 *          [[x,y,f],...]
		 *				(x,y)	: 	Postion
		 *				f 		: 	Loops
		 * 
		 */
		this.stack = [];
		this.stackLen = 0;
	}
	this.clear();
   
	/** 
	 *      初始化指令区
	 *      参数：
	 *          - xxx   :   可选。为1时表示第一次初始化，需要绘制相关html元素（输入位置的选择框）
	 * 
	 */
	this.init = function(xxx) {
	    
	    
		if ( arm.running ) this.stop();
		
		//  draw toolbar
		if (xxx == 1) {
			this.genHTMLToolbar()
		}
	}

	//	第一次启动游戏时，生成输入位置的选择框。只应该调用一次
	this.genHTMLToolbar = function(){
		for (i = 0; i < 4; i++) {
			for (j = 1; j < 9; j++) {
			    
				// toolifs + tool
				var newson = document.createElement('div');
				newson.className = "toola";
				
				// toolifs
				var newson2 = document.createElement('div');
				newson2.className = "toolifs";
				newson2.setAttribute("copeid", i * 8 + j);
				newson2.onclick = function(e) {
					runs.settoolifs(e, this.getAttribute("copeid"));
				}
				newson.appendChild(newson2);
				
				// tool
				newson2 = document.createElement('div');
				newson2.className = 'tool';
				newson2.setAttribute("copeid", i * 8 + j);
				newson2.setAttribute('id', 'cope' + (i * 8 + j));
				newson2.onclick = function(e) {
					runs.settool(e, this.getAttribute('copeid'));
				}
				newson.appendChild(newson2);
				this.obj.appendChild(newson);
				
				//  第4行只有5个指令
				if (i == 3 && j == 5) break;
			}
		}
		
	    placegrids();
	    
		that.obj.style.display = 'none'; 
		that.obj.style.width = cope.width * 8;
	}
	function placegrids(){
	   	that.obj.style.left = that.x + cope.width + c.offsetLeft + 1;
		that.obj.style.top = that.y + c.offsetTop - cope.height * 0.7;
	}
	window.addEventListener('resize', function(){
	    placegrids(); 
	});
	
	this.settool = function(e, v) {
		toolbar.show(e.clientX, e.clientY + 10);
		toolbar.settool(v);
	}
	
	this.settoolifs = function(e, v) {
		toolbar.show2(e.clientX, e.clientY + 10);
		toolbar.settool2(v);
	}
	
	this.draw = function() {
		console.log('runs.draw')
		for (i = 0; i < 4; i++) {
			for (j = 1; j < 9; j++) {

				//	绘制指令块
				cope.draw(this.x + cope.width * j, this.y + cope.height * i * 1.7, this.tasks[i][j - 1]);
				
				// 绘制条件指令块
				if (this.ifs[i][j - 1] != 0) {
					cope.drawifs(this.x + cope.width * j, this.y + cope.height * i * 1.7, this.ifs[i][j - 1]);
				} else {
					// cope.drawifs(this.x + cope.width * j, this.y + cope.height * i * 1.7, 0);
					drawBg(this.x + cope.width * j, this.y + cope.height * i*1.7 - cope.height*0.7, cope.width, cope.height*0.7)
				}

				// 绘制循环数字
				if ( this.loops[i][j-1] != 1) {
					cope.drawLoopNum(this.x + cope.width * (j+0.3), this.y + cope.height * i * 1.7,this.loops[i][j-1]);
				}

				if (i == 3 && j == 5) break;
			}
			cope.draw(this.x, this.y + cope.height * i * 1.7, i + 4, cope.width, cope.height);
		}

		//	用来选中的格子
		this.obj.style.display = 'block';
	}
	this.hide = function() {
		this.obj.style.display = 'none';
	}
	
	//	运行(v,i)
	this.run = function(pos, condition) { 

		this.run2()
		return
	    
	    //  得到此位置的循环数
		var lpn = this.loops[pos.v][pos.i];

		console.log('[Try ] %d,%d Loop(%d)',pos.v,pos.i,lpn)
		
		while (lpn--){
		    
		    if (!arm.running) return;

		    console.log('[Do  ] %d,%d',pos.v,pos.i)
		
    		//  如果递归超过this.stackLim次，认为是死循环
    		if ( pos.i==0 && ++this.stackLen > this.stackLim ) return;
    		
    		// 此位置没有要执行的指令
    		if (this.tasks[pos.v][pos.i] == 0) { 
    			return;
    		}
    		
    		//	@ 不再runs中判断条件块，而在arm中去判断，如果不满足，则return当前函数
    		//	
    		// //  此位置有条件块但不满足条件
    		// if (this.ifs[v][i] != 0 && this.ifs[v][i] != arm.hand) {
    		// 	arm.done(v, i);
    		// 	return;
    		// }
    		
    		//  执行此位置的代码
    		
    		coststep++;
    		console.log('task=%d',this.tasks[pos.v][pos.i])
    		switch (this.tasks[pos.v][pos.i]) {
    			case 1:
    				arm.right({'c':this.ifs[pos.v][pos.i]});
    				break;
    				
    			case 2:
    				arm.up({'c':this.ifs[pos.v][pos.i]});
    				break;
    				
    			case 3:
    				arm.down({'c':this.ifs[pos.v][pos.i]});
    				break;
    				
    			//  Runer_1
    			case 4:
    				// this.stack.push([v, i, this.loops[v][i]]);
    				this.run( {'v':0, 'i':0} );
    				break;
    			
    			//  Runer_2
    			case 5:
    				// this.stack.push([v, i, this.loops[v][i]]);
    				this.run( {'v':1, 'i':0} );
    				break;
    				
    			//  Runer_3
    			case 6:
    				// this.stack.push([v, i, this.loops[v][i]]);
    				this.run( {'v':2, 'i':0} );
    				break;
    				
    			//  Runer_4
    			case 7:
    				// this.stack.push([v, i, this.loops[v][i]]);
    				this.run( {'v':3, 'i':0} );
    				break;
    		}
    		
    		
    		if ( pos.i==0 ) this.stackLen--;
		    
		}
		
		//  该指令执行完毕
		// 右块正常，执行(v,i+1)
		if (this.tasks[pos.v][pos.i + 1] != 0) {
			this.run( {'v':pos.v, 'i':pos.i + 1} ); 
		}

		// actor.add(function(){
		// 	console.log("%d,%d done.",v,i)
		// })

		
	}

	//	@ 采用递归的方式模拟完整运行一次
	//	
	//	记录一组虚拟的state.box和arm
	//	，独立于界面的记录
	//	
	this.run2  = function(){

		var sg = [ [],[],[],[],[],[] ];
		for (var i=0;i<6;i++){
			for (var j=5;j>=0;j--){
				if (state.box[i][j]==0) break;
				sg[i].push(state.box[i][j])
			}
		}

		var myarm = {
			row : 0,
			hand: 0
		}

		function gohand(){
			if (myarm.hand==0){
				if (sg[myarm.row].length>0){
					myarm.hand = sg[myarm.row].pop();
				}
			}else{
				if (sg[myarm.row].length<6){
					sg[myarm.row].push(myarm.hand)
					myarm.hand=0
				}
			}
		}

		function go(pos){
			var lpn = that.loops[pos.x][pos.y];
			console.log('go %d,%d L(%d)',pos.x,pos.y,lpn)
			while (lpn--){
				if (!arm.running) return;
				console.log('do %d,%d L(%d)',pos.x,pos.y,lpn)

				if (pos.y==0 && ++that.stackLen > that.stackLim) {
					console.log('[Halt] Deap Loops.')
					return 
				};

				if (that.tasks[pos.x][pos.y]==0) {
					console.log('[Halt] No code.')
					return 
				}

				if ( that.ifs[pos.x][pos.y]!=0 && that.ifs[pos.x][pos.y]!=myarm.hand){
					console.log('[Cotn] Bad Condition.' )
					if (that.tasks[pos.x][pos.y+1]){
						go({x:pos.x,y:pos.y+1})
					}
					return
				}

				coststep++;

				switch ( that.tasks[pos.x][pos.y]){
					case 1:
						gohand();
						arm.right();
						break;
					case 2:
						if (myarm.row>0) myarm.row--;
						arm.up();
						break;
					case 3:
						if (myarm.row<4) myarm.row++;
						arm.down();
						break;
					case 4:
						go({x:0,y:0})
						break;
					case 5:
						go({x:1,y:0})
						break;
					case 6:
						go({x:2,y:0})
						break;
					case 7:
						go({x:3,y:0})
						break;
				}

				if (pos.x==0) this.stackLen--;
			}

			if (that.tasks[pos.x][pos.y+1]){
				go({x:pos.x,y:pos.y+1})
			}
		}

		go({x:0,y:0})
		console.log('[Done] go(0,0)')

	}
	
	//  启动机器
	this.start = function() {
		this.store.save();
		initLevel(Mission);
		this.store.load();

		arm.running = true;

		costime = 0;
		coststep = 0;

		actor.stop();

		this.showCode();

		setTimeout(function(){
			actor.start();
			that.run({'v':0,'i':0});
		}, 50)
		
	}

	this.restart = function(){
		this.finish();
		initLevel(Mission);
	}
	
	//  机器运行结束
	//	x 表示由halt得来，为空则表示程序正常结束
	this.finish = function(x) {
		actor.stop();
		clearFlash();
		if (x!=1)
			arm.halt();
	}
	
	//  机器终止运行
	this.stop = function() {
		this.finish(1);
	}
	
	//  持久化组件
	this.store = {
	    
		save: function() {
			localStorage.setItem("armgo_runs_" + Mission, JSON.stringify(that.tasks));
			localStorage.setItem("armgo_runs_ifs_" + Mission, JSON.stringify(that.ifs));
			localStorage.setItem("armgo_runs_loops_" + Mission, JSON.stringify(that.loops));
			
			console.log("Save:");
			console.log(localStorage);
		},
		
		load: function() {
		    
		    //  尝试获取指令
			t = "armgo_runs_" + Mission;
			res = eval("(" + localStorage.getItem(t) + ")");
			if (res != null) {
				that.tasks = res;
				
				//  尝试获取ifs指令
				t = "armgo_runs_ifs_" + Mission;
				res = eval("(" + localStorage.getItem(t) + ")");
				if (res != null) {
					that.ifs = res;
				}

				//	尝试获取loops指令
				t = "armgo_runs_loops_" + Mission;
				res = eval("(" + localStorage.getItem(t) + ")");
				if (res != null) {
					that.loops = res;
				}
			}
		    
		    //  绘制指令区
			runs.draw();
		}
	}

	this.genCodeOne = function(arg){
		var code = {
			x: arg.x,
			y: arg.y
		}

		var x = arg.x;
		var y = arg.y;
		var indent = arg.indent;

		var ret = [];
		var defer = [];

		if ( this.loops[x][y]>1 ) {
			// var idx = sprintf('i%d%d', x,y);
			var idx = 'i';
			ret.push(sprintf('for (int %s=1; %s<=%d; %s++) {', idx, idx, this.loops[x][y], idx));
			defer.push('}');
		}

		if ( that.ifs[x][y] >0 ) {
			ret.push( sprintf('if (condition[%d][%d] == hand ) {', x, y) );
			defer.pish('}');
		}

		var tmp = '';
		var hash = {
			1: 'moveRight();',
			2: 'moveUp();',
			3: 'moveDown();',
			4: 'func1();',
			5: 'func2();',
			6: 'func3();',
			7: 'func4();'
		}

		ret.push( hash[that.tasks[x][y]] );

		var rets = '';

		for ( var i=0; i<ret.length; i++) {
			rets += '\t'.repeat(i+indent) + ret[i] + '\n';
		}
		for ( var i=defer.length-1;i>=0;i--){
			rets += '\t'.repeat(i+indent) + defer[i] + '\n';
		}
		return rets;

	}
	this.genCodePROG = function(idx){

		var rets = sprintf('void func%d() {\n', idx+1);
		for (var i=0; i<that.tasks[idx].length && that.tasks[idx][i]>0; i++){
			rets += that.genCodeOne({x:idx, y:i, indent:1});
		}
		return rets + '}\n\n';
	}

	this.genCode =function(){

		var rets = '';

		for ( var i=0;i<4;i++) {
			rets += that.genCodePROG(i);
		}

		rets += sprintf('int main(){\n\tfunc1();\n\treturn 0;\n}\n');
		return rets;
	}

	this.showCode = function(){

		var cpad = eid('codepad');
		cpad.innerHTML = that.genCode();

		cpad.parentNode.classList.remove('zhide');
	}

	this.init(1);
}