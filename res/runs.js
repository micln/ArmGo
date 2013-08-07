//
// Class 代码解析运行
//@Randox
/*  attribute ：
		

	method :
*/
//
function RUNS(){
	this.init = function(){
		this.tasks=[[1,5,1,0,0,0,0,0],[3,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
		this.ifs=[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
	}
	this.init();
	this.x = STATE.x + CELL.x*8;
	this.y = STATE.y - CELL.y + cope.height * 0.7;
	this.r = cope.width * 9;
	this.c = cope.height * 6.8;
	this.draw = function(){
		for ( i=0; i<4; i++){
			for ( j=1; j<9; j++){
				(new COPE).draw(this.x+cope.width*j,this.y+cope.height*i*1.7,this.tasks[i][j-1],cope.width,cope.height);
				if ( i==3 && j==5 ) break;
			}
			(new COPE).draw(this.x,this.y+cope.height*i*1.7,i+4,cope.width,cope.height);
		}
		c.onclick = function(e){
			var x = e.clientX - c.offsetLeft;
			var y = e.clientY - c.offsetTop;
			if ( x>runs.x && x<runs.x+runs.r && y>runs.y && y<runs.y+runs.c){
				toolbar.show(e.clientX+10,e.clientY+10);
			}
		}
	}
	this.run = function(v,i){
		ns.innerHTML = v + ',' + i ;
			switch( this.tasks[v][i] ){
				case 1 :
					arm.right(v,i);
					break;
				case 2 :
					arm.up(v,i);
					break;
				case 3 :
					arm.down(v,i);
					break;
				case 4 :
					this.run(0,0);
					break;
				case 5 :
					this.run(1,0);
					break;
				case 6 :
					this.run(2,0);
					break;
				case 7 :
					this.run(3,0);
					break;
			}
	}
}