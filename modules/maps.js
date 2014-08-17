//the data of game.maps
//@randox
//

// color[0] : background-color
// color[i] : copo[i].color
var color = ['#999966','#00D6FF','#FF5C00','#ffff00','#F80909'];
var imgfile = ['none.jpg','right.jpg','up.jpg','down.jpg','prog1.jpg','prog2.jpg','prog3.jpg','prog4.jpg'];
var grade = [[],	// numbers, steps
			[3,3],
			[5,8],
			[10,23],
			[8,8],
			[13,33],
			[12,34],	// 6th
			[14,50],
			[14,50],
			[13,33],
			[13,33]];

var Goal = [];
 Goal[1] = [[0,0,0,0,0,0],
	    	[0,0,0,0,0,1],
	    	[0,0,0,0,0,0],
	    	[0,0,0,0,0,0],
	    	[0,0,0,0,0,0],
	    	[0,0,0,0,0,0]];
 Goal[2] = [[0,0,0,0,0,0],
		    [0,0,0,0,1,2],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0]];
 Goal[3] = [[0,0,0,0,0,0],
		    [0,0,0,0,1,1],
		    [0,0,0,0,2,2],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0]];
 Goal[4] = [[0,0,0,0,0,1],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,2],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0]];
 Goal[5] = [[0,0,0,1,1,1],
		    [0,0,0,0,0,0],
		    [0,0,0,2,2,2],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0]];
 Goal[6] = [[0,0,0,0,0,0],
		    [0,0,0,1,1,1],
		    [0,0,0,2,2,2],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0]];
 Goal[7] = [[0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,1,2,3,4]];
 Goal[8] = [[0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,4,3,2,1]];
 Goal[9] = [[0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,0,0,0],
		    [0,0,0,1,1,1],
		    [0,0,0,1,1,1],
		    [0,0,0,1,1,1]];
Goal[10]  = [[0,0,0,0,0,0],
			[0,0,4,3,2,1],
	    	[0,0,0,0,0,0],
	    	[0,0,4,3,2,1],
	    	[0,0,0,0,0,0],
	    	[0,0,4,3,2,1]];

var startM = [];
startM[1] = [[0,0,0,0,0,1],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]];
startM[2] = [[0,0,0,0,2,1],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]];
startM[3] = [[0,0,0,0,1,1],
			 [0,0,0,0,2,2],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]];
startM[4] = [[0,0,0,0,0,0],
			 [0,0,0,0,2,1],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]];
startM[5] = [[0,0,0,0,0,0],
			 [2,1,2,1,2,1],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]];
startM[6] = [[1,2,1,2,1,2],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]];
startM[7] = [[0,0,1,2,3,4],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]];
startM[8] = [[0,0,1,2,3,4],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]];
startM[9] = [[0,0,0,1,1,1],
			 [0,0,0,1,1,1],
			 [0,0,0,1,1,1],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0],
			 [0,0,0,0,0,0]];
startM[10] =[[0,0,1,2,3,4],
			 [0,0,0,0,0,0],
			 [0,0,1,2,3,4],
			 [0,0,0,0,0,0],
			 [0,0,1,2,3,4],
			 [0,0,0,0,0,0]];
