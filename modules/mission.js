//
// Class 关卡
//@Randox
/*  attribute ：
		

	method :
*/
//
function MISSIONLIST() {
	this.tot = Goal.length - 1;
	this.x = 90;
	this.y = 150;
	this.r = 80;
	this.c = 80;
	this.has = true;
	
	this.show = function() {
		this.has = true;
		
		for (i = 0; i < 4; i++) 
			btns[i].style.display = 'none';

		// if ( arm.running ) {
			toolbar.hide();
			runs.hide();
			runs.stop();
		// }
		
		cxt.fillStyle = '#000';
		cxt.fillRect(0, 0, c.width, c.height);
		var img = new Image();
		img.src='img/bg.jpg'
		cxt.drawImage(img,0,0)
		cxt.fillStyle = '#fff';
		cxt.font = "40px 'Comic Sans MS'"
		cxt.fillText("Level :", this.x, this.y - 50);

		cxt.strokeStyle = '#fff';
		for (i = 1; i <= this.tot; i++) {
			var x = this.x + ((i - 1) % 5) * this.r * 2;
			var y = this.y + Math.floor((i - 1) / 5) * this.c * 2;
			cxt.strokeRect(x, y, this.r, this.c);	
			cxt.fillText(i, x + this.r * 1 / 3, y + this.c * 2 / 3);
		}
		c.style.cursor = 'hand';
		c.onclick = function(e) {
			missionList.has = false;
			missionList.selected(e)
		}
		//setTimeout('missionList.show()',conf.Fz/2);
	}
	
	this.selected = function(e) {
		initLevel(getClickId(e, missionList.x, missionList.y, missionList.r * 2, missionList.c * 2, 5));
	}
}

//	载入关卡
function initLevel(v) {
	for (i = 0; i < 4; i++) 
		btns[i].style.display = 'block';
	Mission = v;
	
	state.init(v);
	runs.clear();
	flashMap(1);
	g_ctime = setInterval(flashMap, conf.Fz);

    placebtns();

	//	eid("controlBar").style.display = 'initial';
}

function placebtns(){

	btn_start.style.top = c.offsetTop + c.offsetHeight - btn_start.offsetHeight - 10;
	btn_start.style.left = c.offsetLeft + c.offsetWidth - btn_start.offsetWidth - 150;

	btn_Mission.style.top = c.offsetTop + 10;
	btn_Mission.style.left = c.offsetLeft + c.offsetWidth - btn_Mission.offsetWidth - 10;

	btn_Refresh.style.top = c.offsetTop + c.offsetHeight - btn_Refresh.offsetHeight - 10;
	btn_Refresh.style.left = c.offsetLeft + c.offsetWidth - btn_Refresh.offsetWidth - 300;

	btn_save.style.top = btn_load.style.top = btn_Refresh.offsetTop;
	btn_save.style.left = btn_start.offsetLeft + btn_start.offsetWidth + 10;
	btn_load.style.left = btn_save.offsetLeft + btn_save.offsetWidth + 10;
	
}

window.addEventListener('resize', function(){
    placebtns();
});