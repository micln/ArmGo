//
// Class 游戏显示区域
//@Randox
/*  attribute ：
		

	method :
*/
//
function STATE(){
	this.x = conf.goalm.x + conf.cell.x * 8.5;
	this.y = 100;
	this.box  = [];
	this.init = function(v){
		for ( i=0; i<6; i++){
			state.box[i] = [];
			for ( j=0; j<6; j++){
				state.box[i][j] = startM[Mission][i][j];
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
		
		// clear
		cxt.fillStyle = color[3];
		cxt.fillRect(arm.leftz-10,arm.topz,conf.cell.x*7+30,conf.cell.y*12);
		
		// holder
		cxt.fillStyle = "#5E4925";
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

		arm.draw();
	}


}
