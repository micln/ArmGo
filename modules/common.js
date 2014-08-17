
// Global Variables
var c = eid("canvas");
var cxt = c.getContext("2d");
var ctime;				// arm Go!
var Mission;			// Mission Canvas Object
var costime;
var coststep;

var btn_start = eid("btn_start");
var btn_Mission = eid("btn_goMission");
var btn_Refresh = eid("btn_Refresh");
var btn_save = eid("btn_save");
var btn_load = eid("btn_load");
var btns = [btn_start,btn_load,btn_save,btn_Refresh,btn_Refresh];

//	全局函数；公共组件

function checkAns(){
	if ( state.box.toString() == Goal[Mission].toString()){
		var costcope = 0;
		for ( i=0;i<4;i++){
			for (j=0;j<8;j++){
				costcope += ( runs.tasks[i][j] != 0 ) + (runs.ifs[i][j] != 0);
			}
		}
		score = 1 + ( coststep <= grade[Mission][1] ) + (costcope <= grade[Mission][0]);
		message("WIN<hr>"+costime*conf.Fz/1000+"s<br>"+coststep+" steps<br>"+costcope+" instructions<br>Score: " + score);
		runs.finish();
	}
}

function drawcell(x,y,v){
	cxt.fillStyle = color[v];
	cxt.fillRect(x,y,conf.cell.x,conf.cell.y);
	cxt.fillStyle = "#7E3902";
	cxt.fillRect(x+conf.cell.x*0.2,y+conf.cell.y*0.2,conf.cell.x*0.6,conf.cell.y*0.6);
	// cxt.strokeStyle = "#7E3902";
	// cxt.strokeRect(x,y,conf.cell.x,conf.cell.y);
}

function drawBg(){
	cxt.fillStyle = color[0] ;
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
				//cxt.fillRect(j*conf.cell.x+x,i*conf.cell.y*2+y,conf.cell.x,conf.cell.y);
				drawcell(j*conf.cell.x+x,i*conf.cell.y*2+y,g[i][j]);
			}else {
				cxt.strokeRect(j*conf.cell.x+x,i*conf.cell.y*2+y,conf.cell.x,conf.cell.y);
			}
		}
	}
}

function flashMap(x){		//	渲染图像
	if ( missionList.has ) return;
	costime ++;
	state.draw();
	if ( x == 1 ){		// 首次进入游戏，需要绘制静态背景
		drawBg();
		drawGoal();
		runs.draw();
	}
}

function clearFlash(){
//	log(ctime);
	clearInterval(ctime);
}

function getClickId(e,x,y,r,c,m){	// ID of (e.x,e.y) in Map: start(x,y),per(r,c), there are m in one line 
	//alert(e.clientX+","+e.clientY);
	var i = Math.floor(( e.clientX - eid("canvas").offsetLeft - x ) / r ) + 1;
	var j = Math.floor(( e.clientY - eid("canvas").offsetTop - y ) / c )+ 1;
	//alert(i+','+j);
	eid("canvas").style.cursor = 'default';
	var ttt = (j-1)*m+i ;
	//alert(ttt);
	if ( ttt > 0 && ttt <= missionList.tot ){
		eid("canvas").onclick = function() { null; };
		return ttt;
	}else{
	//	return getClickId(e,missionList.x,missionList.y,missionList.r*2,missionList.c*2,5);
	}
}

function log(t){
	if ( conf.Debug == true ) console.log(t);
}

function message(t){
	m = eid("msgbox");
	m.getElementsByTagName("div")[0].innerHTML = t;
	m.style.display = 'block';
	m.style.left = ( document.body.clientWidth - m.offsetWidth ) / 2 ;
}

function initLevel(v){
	for ( i=0;i<4;i++) btns[i].style.display='block';
	Mission = v;
	costime = 0;
	state.init(v);
	arm.halt();
	runs.clear();
	flashMap(1);
	ctime = setInterval(flashMap,conf.Fz);

	btn_start.style.top = c.offsetTop + c.offsetHeight - btn_start.offsetHeight - 10;
	btn_start.style.left = c.offsetLeft + c.offsetWidth - btn_start.offsetWidth - 150;

	btn_Mission.style.top = c.offsetTop + 10;
	btn_Mission.style.left = c.offsetLeft + c.offsetWidth - btn_Mission.offsetWidth - 10;

	btn_Refresh.style.top = c.offsetTop + c.offsetHeight - btn_Refresh.offsetHeight - 10;
	btn_Refresh.style.left = c.offsetLeft + c.offsetWidth - btn_Refresh.offsetWidth - 300;

	btn_save.style.top = btn_load.style.top =  btn_Refresh.offsetTop;
	btn_save.style.left = btn_start.offsetLeft + btn_start.offsetWidth + 10;
	btn_load.style.left = btn_save.offsetLeft + btn_save.offsetWidth + 10;

//	eid("controlBar").style.display = 'initial';
}

function preload(){
	for ( i=0; i<imgfile.length; i++){
		var a = new Image();
		a.src = "img/" + imgfile[i] ;
	}
}
preload();
		
function showhelp(){
	txt = "";
	//alert(txt);
	message(txt);
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
