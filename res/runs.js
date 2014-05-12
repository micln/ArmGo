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
		this.stack = [];
		if (xxx == 1 ){
			for ( i=0; i<4; i++){
				for ( j=1; j<9; j++){
					// toolifs + tool
					var newson = document.createElement('div');
					newson.className = "toola";
					// toolifs
					var newson2 = document.createElement('div');
					newson2.className = "toolifs";
					newson2.setAttribute("copeid",i*8+j);
					newson2.onclick = function(e){
						runs.settoolifs(e,this.getAttribute("copeid"));
					}
					newson.appendChild(newson2);
					// tool
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
			this.obj.style.display = 'none';
		}
	}
	this.x = state.x + CELL.x*8;
	this.y = state.y - CELL.y + cope.height * 0.7;
	this.r = cope.width * 9;
	this.c = cope.height * 6.8;
	this.stack = [];
	this.init(1);
	this.settool = function(e,v){
		toolbar.show(e.clientX,e.clientY+10);
		toolbar.settool(v);
	}
	this.settoolifs = function(e,v){
		toolbar.show2(e.clientX,e.clientY+10);
		toolbar.settool2(v);
	}
	this.draw = function(){
		for ( i=0; i<4; i++){
			for ( j=1; j<9; j++){
				cope.draw(this.x+cope.width*j,this.y+cope.height*i*1.7,this.tasks[i][j-1],cope.width,cope.height);
				if (this.ifs[i][j-1] != 0){
					cope.drawifs(this.x+cope.width*j,this.y+cope.height*i*1.7,this.ifs[i][j-1]);
				}else {
					cope.drawifs(this.x+cope.width*j,this.y+cope.height*i*1.7,0);
				}
				if ( i==3 && j==5 ) break;
			}
			cope.draw(this.x,this.y+cope.height*i*1.7,i+4,cope.width,cope.height);
		}
		this.obj.style.display = 'block';
	}
	this.hide = function(){
		this.obj.style.display = 'none';
	}
	this.run = function(v,i){
		if (this.tasks[v][i] == 0 ){
			runs.finish();
		}
		ns.innerHTML = v + ',' + i ;
		if ( this.ifs[v][i] != 0 && this.ifs[v][i]!=arm.hand ){
			arm.done(v,i);
			return;
		}
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
					this.stack.push([v,i]);
					this.run(0,0);
					break;
				case 5 :
					this.stack.push([v,i]);
					this.run(1,0);
					break;
				case 6 :
					this.stack.push([v,i]);
					this.run(2,0);
					break;
				case 7 :
					this.stack.push([v,i]);
					this.run(3,0);
					break;
			}
	}
	this.readygo = function(){
		eid("goit").disabled = true;
		state.init(Mission);
		this.run(0,0);
	}
	this.finish = function(){
		eid("goit").disabled = false;
		clearTimeout(ctime);
	}
}