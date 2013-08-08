//
// Class 代码解析运行
//@Randox
/*  attribute ：
		

	method :
*/
//
function RUNS(){
	this.obj = eid("runs");
	this.init = function(xxx){
		this.tasks=[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
		this.ifs=[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
		if (xxx == 1 ){
			for ( i=0; i<4; i++){
				for ( j=1; j<9; j++){
					var newson = document.createElement('div');
					newson.className = "toola";
					var newson2 = document.createElement('div');
					newson2.className = "toolifs";
					newson.appendChild(newson2);
					newson2 = document.createElement('div');
					newson2.className = 'tool';
					newson2.setAttribute("copeid",i*8+j);
					newson2.setAttribute('id', 'cope'+(i*8+j));
					newson2.onclick = function(e){
						runs.settool(e,this.getAttribute('copeid'));
					}
					newson.appendChild(newson2);
					this.obj.appendChild(newson);
					if ( i==3 && j==5 ) break;
				}
			}
			this.obj.style.left = this.x+cope.width + 8;
			this.obj.style.top = this.y - 0.5;
			this.obj.style.width = cope.width * 8;
			this.obj.style.zIndex = -1;
		}
	}
	this.x = STATE.x + CELL.x*8;
	this.y = STATE.y - CELL.y + cope.height * 0.7;
	this.r = cope.width * 9;
	this.c = cope.height * 6.8;
	this.init(1);
	this.settool = function(e,v){
		toolbar.show(e.clientX,e.clientY+10);
		toolbar.settool(v);
	}
	this.draw = function(){
		for ( i=0; i<4; i++){
			for ( j=1; j<9; j++){
				(new COPE).draw(this.x+cope.width*j,this.y+cope.height*i*1.7,this.tasks[i][j-1],cope.width,cope.height);
				if ( i==3 && j==5 ) break;
			}
			(new COPE).draw(this.x,this.y+cope.height*i*1.7,i+4,cope.width,cope.height);
		}
		this.obj.style.zIndex = 5;
	}
	this.hide = function(){
		this.obj.style.zIndex = -1;
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