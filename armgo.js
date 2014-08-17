// init object	初始化对象
var state = new STATE();			// the state of stage
var arm = new ARM();
var cope = new COPE(1);
var missionList = new MISSIONLIST();
var runs = new RUNS();
var toolbar = new TOOLBAR();

window.onload = function(){

	(new HELLO).draw();

	c.onclick = function(){	
		missionList.show();
	}

}
