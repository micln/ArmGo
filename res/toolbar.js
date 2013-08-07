//
// Class 工具栏
//@Randox
/*  attribute ：
		

	method :
*/
//
function TOOLBAR(){
	this.obj = eid("toolslc");
	this.init = function(p){
		for ( i=0; i<8; i++){
			var newson = document.createElement('div');
			newson.className = "tool";
			newson.style.background = "url('img/"+imgfile[i]+"')";
			newson.style.backgroundSize = "35px 35px";
			this.obj.appendChild(newson);
		}
	}
	this.init();
	this.hide = function(){
		this.obj.style.zIndex = -1;
	}
	this.show = function(x,y){
		this.obj.style.left = x;
		this.obj.style.top = y;
		this.obj.style.zIndex = 1;
	}
}
