var conf = {
	Fz: 25,
};

// Const Variables
var ms = {
	down : false
};

var CELL = {
	x : 30,
	y : 30
}

var GOALM = {
	x : 40,
	y : 100
}

// Global Variables
var c = eid("canvas");
var cxt = c.getContext("2d");
var ctime;				// arm Go!
var Mission;			// Mission Canvas Object
var ns = eid("ns");		// debug message

// object
var state = new STATE();			// the state of stage
var arm = new ARM();
var cope = new COPE(1);
var missionList = new MISSIONLIST();
var runs = new RUNS();
var toolbar = new TOOLBAR();


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

function eid(x){
	return document.getElementById(x);
}

function ename(x){
	return document.getElementsByName(x)[0];
}

function initVal(v){
	Mission = v;
	state.init(v);
	arm.init();
	runs.init();
	flashMap(1);
	ctime = setInterval('flashMap()',conf.Fz);
}

function flashMap(x){
	//cxt.clearRect(0,0,c.width,c.height);
	state.draw();
	arm.draw();
	if ( x == 1 ){
		drawBg();
		drawGoal();
		runs.draw();
	}
}

function drawBg(){
	cxt.fillStyle = color[3] ;
	cxt.fillRect(0,0,c.width,c.height);
}

function drawGoal(){
	var x = GOALM.x;
	var y = GOALM.y;
	var g = Goal[Mission];
	
	// holder
	cxt.fillStyle = "#5E4925";
	cxt.fillRect(GOALM.x+CELL.x*6,GOALM.y-35,15,500);
	for ( i=1; i<7; i++){
		cxt.fillRect(GOALM.x,GOALM.y+CELL.y*(i*2-1),CELL.x*6,15);
	}
	
	// CELL
	cxt.fillStyle = '#000';
	cxt.font = "30px 'Comic Sans MS'";
	cxt.fillText("GOAL:",x,y-20);
	for ( i=0; i<6; i++ ){
		for ( j=0; j<6; j++){
			cxt.fillStyle = color[g[i][j]];
			cxt.strokeStyle = color[g[i][j]];
			if ( g[i][j] != 0){
				cxt.fillRect(j*CELL.x+x,i*CELL.y*2+y,CELL.x,CELL.y);
			}else {
				cxt.strokeRect(j*CELL.x+x,i*CELL.y*2+y,CELL.x,CELL.y);
			}
		}
	}
}

function drawCell(x,y,v){
	cxt.fillStyle = color[v];
	cxt.fillRect(x,y,CELL.x,CELL.y);
}

function checkAns(){
	if ( state.box.toString() == Goal[Mission].toString()){
		runs.finish();
		alert("WIN");
		missionList.show();
	}
}

function Wmove(e){
	ns.innerHTML = (e.clientX - c.offsetLeft) + "," + (e.clientY - c.offsetTop);
}

function Wdown(e){

}
	
function Wup(e){

}

function Cdown (e) {

}

window.addEventListener('mousemove',Wmove,false);
window.addEventListener('mousedown',Wdown,false);

window.onload = function(){
	//initVal(1);
	(new HELLO).draw();
	c.onclick = function(){	
		missionList.show();
	}
}
