//
// Class 工具栏
//@Randox
/*  attribute ：
		

	method :
*/
//
function TOOLBAR(){
	this.r = cope.width * 2;
	this.c = 100;
	this.x = this.r;
	this.y = this.c;
	this.s = 0;
	this.draw = function(){
		if ( this.s == 0 ) return ;
		cxt.fillStyle = '#ff0000';
		cxt.fillRect(this.x,this.y,this.r + 20,this.c+20);
	}
	this.show = function(x,y){
		this.x = x;
		this.y = y;
		this.s = 1;
		this.draw();
	}
}