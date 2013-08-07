// Preferences
var Fz = 20;

// Const Variables
var ms = {
	down : false
};

var CELL = {
	x : 30,
	y : 30
}

var BAG = {
	x : 580,
	y : 300,
	r : 300,
	c : 200
}

var GOALM = {
	x : 40,
	y : 100
}

var STATE = {
	x : GOALM.x + CELL.x * 8.5,
	y : 100
}

// Global Variables
var c = eid("canvas");
var cxt = c.getContext("2d");
var ctime;				// arm Go!
var Mission;			// Mission Canvas Object
var ns = eid("ns");		// debug message
var state = [];			// the state of stage

// object
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
	for ( i=0; i<6; i++){
		state[i] = [];
		for ( j=0; j<6; j++){
			state[i][j] = startM[Mission][i][j];
		}
	}
	arm.init();
	flashMap(1);
	ctime = setInterval('flashMap()',Fz);

	var tlc = eid("toolslc");
	tlc.style.zIndex = 1;
	tlc.onclick = function (e){
	}
}

function flashMap(x){
	//cxt.clearRect(0,0,c.width,c.height);
	drawState();
	drawArm();
	toolbar.show();
	if ( x == 1 ){
		drawBg();
		drawGoal();
		runs.draw();
	}
}

function drawHello(){
	cxt.fillStyle = "#000";
	cxt.fillRect(0,0,c.width,c.height);
	var gradient=cxt.createLinearGradient(0,c.height/2-35,0,c.height/2+35);
	gradient.addColorStop("0","#fff");
	gradient.addColorStop("1.0","#777");
	cxt.fillStyle = gradient;
	cxt.font = "80px Arial Black";
	cxt.fillText("ArmGo",c.width/2-150,c.height/2);
	
	cxt.font = "20px Arial Black";
	cxt.fillText("click here",c.width/2-60,c.height/2+50);
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

function drawState(){
	var x = STATE.x;
	var y = STATE.y;
	var g = state;
	
	// clear
	cxt.fillStyle = color[3];
	cxt.fillRect(arm.leftz-10,arm.topz,CELL.x*7+30,CELL.y*12);
	
	// holder
	cxt.fillStyle = "#5E4925";
	cxt.fillRect(STATE.x+CELL.x*6,STATE.y-35,15,500);
	for ( i=1; i<7; i++){
		cxt.fillRect(STATE.x,STATE.y+CELL.y*(i*2-1),CELL.x*6,15);
	}
	
	// cell
	for ( i=0; i<6; i++ ){
		for ( j=0; j<6; j++){
			cxt.fillStyle = color[g[i][j]];
			cxt.strokeStyle = color[g[i][j]];
			if ( g[i][j] != 0){
				cxt.fillRect(j*CELL.x+x,i*CELL.y*2+y,CELL.x,CELL.y);
			}else {
				//cxt.strokeRect(j*CELL.x+x,i*CELL.y*2+y,CELL.x,CELL.y);
			}
		}
	}
}

function drawArm(){
	var x = arm.x;
	var y = arm.y;
	cxt.beginPath();
	cxt.moveTo(x,y);
	cxt.lineTo(x,y+30);
	cxt.lineTo(x-2,y+30);
	cxt.lineTo(x-6,y+15);
	cxt.lineTo(x-2,y);
	cxt.closePath();
	cxt.fillStyle = arm.color;
	cxt.fill();
	cxt.fillRect(240,y+11,x-240,8);
	cxt.fillRect(240,STATE.y-40,6,400);
	//drawCope(x,y,2);
	if ( arm.hand != 0 ) drawCell(arm.x,arm.y,arm.hand);
}

function drawCope(x,y,v,r,c){
	var img = new Image();
	img.src="img/"+imgfile[v];
	if ( r == undefined ){
		cxt.drawImage(img,x,y,cope.width,cope.height);
	}else {
		cxt.drawImage(img,x,y,r,c);
	}
}

function drawCell(x,y,v){
	cxt.fillStyle = color[v];
	cxt.fillRect(x,y,CELL.x,CELL.y);
}

function checkAns(){
	if ( state.toString() == Goal[Mission].toString()){
		clearTimeout(ctime);
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

window.onload = function(){
	//initVal(1);
	drawHello();
	c.onclick = function(){
		c.onclick = function(){};	
		missionList.show();
	}
}