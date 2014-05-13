
// Global Variables
var c = eid("canvas");
var cxt = c.getContext("2d");
var ctime;				// arm Go!
var Mission;			// Mission Canvas Object
var ns = eid("ns");		// debug message

//	全局函数；公共组件

function checkAns(){
	if ( state.box.toString() == Goal[Mission].toString()){
		alert("WIN");
		runs.finish();
	//	missionList.show();
	}
}

function drawcell(x,y,v){
	cxt.fillStyle = color[v];
	cxt.fillRect(x,y,conf.cell.x,conf.cell.y);
}

function drawBg(){
	cxt.fillStyle = color[3] ;
	cxt.fillRect(0,0,c.width,c.height);
}

function drawGoal(){
	var x = conf.goalm.x;
	var y = conf.goalm.y;
	var g = Goal[Mission];
	
	// holder
	cxt.fillStyle = "#5E4925";
	cxt.fillRect(conf.goalm.x+conf.cell.x*6,conf.goalm.y-35,15,500);
	for ( i=1; i<7; i++){
		cxt.fillRect(conf.goalm.x,conf.goalm.y+conf.cell.y*(i*2-1),conf.cell.x*6,15);
	}
	
	// conf.cell
	cxt.fillStyle = '#000';
	cxt.font = "30px 'Comic Sans MS'";
	cxt.fillText("GOAL:",x,y-20);
	for ( i=0; i<6; i++ ){
		for ( j=0; j<6; j++){
			cxt.fillStyle = color[g[i][j]];
			cxt.strokeStyle = color[g[i][j]];
			if ( g[i][j] != 0){
				cxt.fillRect(j*conf.cell.x+x,i*conf.cell.y*2+y,conf.cell.x,conf.cell.y);
			}else {
				cxt.strokeRect(j*conf.cell.x+x,i*conf.cell.y*2+y,conf.cell.x,conf.cell.y);
			}
		}
	}
}

function flashMap(x){
//	console.log(Date());
	state.draw();
	if ( x == 1 ){		// 首次进入游戏，需要绘制静态背景
		drawBg();
		drawGoal();
		runs.draw();
	}
}

function getClickId(e,x,y,r,c,m){	// ID of (e.x,e.y) in Map: start(x,y),per(r,c), there are m in one line 
	var i = Math.floor(( e.clientX - eid("canvas").offsetLeft - x ) / r ) + 1;
	var j = Math.floor(( e.clientY - eid("canvas").offsetTop - y ) / c )+ 1;
	eid("canvas").style.cursor = 'default';
	var ttt = (j-1)*m+i ;
	if ( ttt > 0 && ttt <= missionList.tot ){
		eid("canvas").onclick = function() { null; };
		return ttt;
	}else{
		return getClickId(e,missionList.x,missionList.y,missionList.r*2,missionList.c*2,5);
	}
}

function initLevel(v){
	Mission = v;
	state.init(v);
	arm.init();
	runs.init();
	flashMap(1);
	ctime = setInterval('flashMap()',conf.Fz);
	eid("btn_start").disabled = false;
}

function eid(x){
	return document.getElementById(x);
}

function ename(x){
	return document.getElementsByName(x)[0];
}

var zpp = {
	'includejs':function(filename){
		document.write("<script type='text/javascript' src='"+filename+"'></script>");
	}
}
