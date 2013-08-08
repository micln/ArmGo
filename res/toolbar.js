//
// Class 工具栏
//@Randox
/*  attribute ：
		

	method :
*/
//
function TOOLBAR(){
	this.obj = eid("toolslc");
	this.obj2 = eid("toolslcifs");
	this.selrun = 0;
	this.init = function(p){
		this.selrun = 0;
		for ( i=0; i<8; i++){
			var newson = document.createElement('div');
			newson.className = "tool";
			newson.style.background = "url('img/"+imgfile[i]+"')";
			newson.style.backgroundSize = "35px 35px";
			newson.setAttribute('toolid',i);
			this.obj.appendChild(newson);
		}
		for ( i=0; i<3; i++){
			var newson = document.createElement("div");
			newson.className = "toolifs";
			newson.style.backgroundColor = color[i];
			newson.setAttribute('toolid',i);
			this.obj2.appendChild(newson);
		}
	}
	this.init();
	this.hide = function(x){
		this.obj.style.zIndex = -1;
		this.obj.style.left = c.offsetLeft;
	}
	this.hide2 = function(){
		this.obj2.style.zIndex = -1;
		this.obj2.style.left = c.offsetLeft;
	}
	this.show = function(x,y){
		this.hide2();
		this.obj.style.left = x;
		this.obj.style.top = y;
		this.obj.style.zIndex = 10;
	}
	this.show2 = function(x,y){
		this.hide();
		this.obj2.style.left = x;
		this.obj2.style.top = y;
		this.obj2.style.zIndex = 10;
	}
	this.settool = function(v){
		this.selrun = v;
		var somes = this.obj.getElementsByTagName('div');
		for ( i=0; i<somes.length; i++){
			somes[i].onclick = function(){
				//eid("cope"+toolbar.selrun).style.background = this.style.background;
				//eid("cope"+toolbar.selrun).style.backgroundSize = "35px 35px";
				
				var x = Math.floor(toolbar.selrun / 8);
				var y = toolbar.selrun % 8;
				if ( y==0 ) {
					x--;
					y = 8;
				}
				runs.tasks[x][y-1] = Number(this.getAttribute('toolid'));
				runs.draw();
				
				toolbar.hide();
			}
		}
	}
	this.settool2 = function(v){
		this.selrun = v;
		var somes = this.obj2.getElementsByTagName('div');
		for ( i=0; i<somes.length; i++){
			somes[i].onclick = function(){
				var x = Math.floor(toolbar.selrun / 8);
				var y = toolbar.selrun % 8;
				if ( y==0 ) {
					x--;
					y = 8;
				}
				runs.ifs[x][y-1] = Number(this.getAttribute('toolid'));
				runs.draw();
				
				toolbar.hide2();
			}
		}
	}
}
