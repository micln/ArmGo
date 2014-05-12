//
// Class 箱子状态栏
//@Randox
/*  attribute ：
		

	method :
*/
//
function STATE(){
	this.x = GOALM.x + CELL.x * 8.5;
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
		cxt.fillRect(arm.leftz-10,arm.topz,CELL.x*7+30,CELL.y*12);
		
		// holder
		cxt.fillStyle = "#5E4925";
		cxt.fillRect(this.x+CELL.x*6,this.y-35,15,500);
		for ( i=1; i<7; i++){
			cxt.fillRect(this.x,this.y+CELL.y*(i*2-1),CELL.x*6,15);
		}
	
		// cell
		for ( i=0; i<6; i++ ){
			for ( j=0; j<6; j++){
				cxt.fillStyle = color[g[i][j]];
				cxt.strokeStyle = color[g[i][j]];
				if ( g[i][j] != 0){
					cxt.fillRect(j*CELL.x+x,i*CELL.y*2+y,CELL.x,CELL.y);
				}else {
					//cxt.strokeRect(j*CELL.x+x,i*CELL.y*2+y,CELL.x,CELL.y);
				}
			}
		}
	}
}
