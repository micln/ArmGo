//
// Class 代码框
//@Randox
/*  attribute ：
		

	method :
*/
//
function COPE(v){
	this.x = 50;
	this.y = 50;
	this.width = 35;
	this.height = this.width;
	this.value = v;
	this.draw = function(x,y,v,r,c){
		var img = new Image();
		img.src="img/"+imgfile[v];
		if ( r == undefined ){
			cxt.drawImage(img,x,y,cope.width,cope.height);
		}else {
			cxt.drawImage(img,x,y,r,c);
		}
	}
	this.drawifs = function(x,y,v){
		cxt.fillStyle = color[v];
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x+5,y-20);
		cxt.lineTo(x+30,y-20);
		cxt.lineTo(x+35,y);
		cxt.closePath();
		cxt.fill();
	}
}