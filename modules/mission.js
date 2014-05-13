//
// Class 关卡
//@Randox
/*  attribute ：
		

	method :
*/
//
function MISSIONLIST(){
	this.tot = Goal.length-1;
	this.x = 90;
	this.y = 150;
	this.r = 80;
	this.c = 80;
	this.show = function(){
		clearTimeout(ctime);
		toolbar.hide();
		runs.hide();
		cxt.fillStyle = '#000';
		cxt.fillRect(0,0,c.width,c.height);
		cxt.fillStyle = '#fff';
		cxt.font = "40px Arial";
		cxt.fillText("Level :",this.x,this.y-50);
		for ( i=1; i<=this.tot; i++){
			var x = this.x + ((i-1)%5)*this.r*2;
			var y = this.y + Math.floor((i-1)/5)*this.c*2;
		//	cope.draw(x,y,i+3,this.r,this.c);
			cxt.strokeStyle = '#ffffff';
			cxt.strokeRect(x,y,this.r,this.c);
			cxt.fillText(i,x+this.r*1/3,y+this.c * 2 / 3);
		}
		c.style.cursor= 'hand';
		c.onclick = function(e){
			missionList.selectMission(e)
		}
	}
	this.selectMission = function(e){
		initLevel(getClickId(e,missionList.x,missionList.y,missionList.r*2,missionList.c*2,5));
	}
}