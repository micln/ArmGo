//
// Class 工具栏
//@Randox
/*  attribute ：
		

	method :
*/
//
function TOOLBAR(){
	this.obj = eid("toolslc");
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
	}
	this.init();
	this.hide = function(){
		this.obj.style.zIndex = -1;
		this.obj.style.left = c.offsetLeft;
	}
	this.show = function(x,y){
		this.obj.style.left = x;
		this.obj.style.top = y;
		this.obj.style.zIndex = 10;
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
}
