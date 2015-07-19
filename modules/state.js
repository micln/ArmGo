//
// Class 游戏中心，箱子显示区域
//@Randox
/*  attribute ：
		

	method :
*/
//
function STATE(){
	
	this.x = conf.goalm.x + conf.cell.x * 8.5;
	this.y = 100;
	
	//  .box    表示当前游戏中箱子的状态
	this.box  = [];
	for ( i=0; i<6; i++){ this.box[i] = [];	}
	
	//  初始化箱子显示区的状态
	this.init = function(v){
		for ( i=0; i<6; i++){
			this.box[i] = [];
			for ( j=0; j<6; j++){
				this.box[i][j] = startM[Mission][i][j];
			}
		}
		arm.init();
		this.draw();
	}
	
	this.clear = function(){
		
	}

	this.draw =function(){
		var x = this.x;
		var y = this.y;
		var g = state.box;
		
		// clear    清空舞台
		cxt.fillStyle = color[0];
		cxt.fillRect(arm.leftz-15,arm.topz-10,conf.cell.x*7+30,conf.cell.y*12);
		
		// cxt.fillStyle = '#000';
		// cxt.font = "normal normal 100 30px 'Comic Sans MS'";
		// cxt.fillText("Yours:", this.x, this.y - 20);

		// holder   支架
		// var gradient = cxt.createLinearGradient(this.x, this.y-35, this.x+conf.cell.x*6+15, this.y+500);
		var gradient = cxt.createLinearGradient(300, 50,  330 ,500);
		// gradient.addColorStop(0, "#fff");
		// gradient.addColorStop(0.5, "#000");
		// gradient.addColorStop(1.0, "#fff");
		for (var i=0; i<0.9; i+=0.05){
			gradient.addColorStop(i, "#987335");
			gradient.addColorStop(i+0.025, "#5E4925");
		}
		cxt.fillStyle = gradient;
		// cxt.fillStyle = "#5E4925";
		cxt.fillRect(this.x+conf.cell.x*6,this.y-35,15,500);
		for ( i=1; i<7; i++){
			cxt.fillRect(this.x,this.y+conf.cell.y*(i*2-1),conf.cell.x*6,15);
		}
	
		//	cell
		for ( i=0; i<6; i++ ){
			for ( j=0; j<6; j++){
				
				cxt.fillStyle = color[g[i][j]];
				cxt.strokeStyle = color[g[i][j]];
				
				if ( g[i][j] != 0){
					// cxt.fillRect(j*conf.cell.x+x,i*conf.cell.y*2+y,conf.cell.x,conf.cell.y);
					// cxt.fillStyle = "#7E3902";
					// cxt.fillRect(j*conf.cell.x+x+conf.cell.x*0.2,i*conf.cell.y*2+y+conf.cell.y*0.2,conf.cell.x*0.6,conf.cell.y*0.6);
					drawcell(j*conf.cell.x+x,i*conf.cell.y*2+y,g[i][j]);
				}else {
					//cxt.strokeRect(j*conf.cell.x+x,i*conf.cell.y*2+y,conf.cell.x,conf.cell.y);
				}
			}
		}
		
		//  绘制机械臂
		arm.draw();
	}

}
