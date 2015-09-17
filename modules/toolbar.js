//
// Class 工具栏
//@Randox
/*  attribute ：
		

	method :
*/
//
function TOOLBAR() {
	this.obj = eid("toolslc");
	this.obj2 = eid("toolslcifs");
	this.selrun = 0;
	this.init = function(p) {
		this.selrun = 0;

		//	初始化指令工具栏
		for (i = 0; i < 8; i++) {
			var newson = document.createElement('div');
			newson.className = "tool";
			newson.style.background = "url('img/" + imgfile[i] + "')";
			newson.style.backgroundSize = "35px 35px";
			newson.setAttribute('toolid', i);
			this.obj.appendChild(newson);
		}

		//	初始化条件工具栏
		for (i = 0; i < color.length; i++) {
			var newson = document.createElement("div");
			newson.className = "toolifs";
			newson.style.backgroundColor = color[i];
			newson.setAttribute('toolid', i);
			this.obj2.appendChild(newson);
		}

		//	初始化循环工具栏
		var newson = document.createElement("div");
		newson.className = "toolifs";
		newson.innerHTML = "loop";
		newson.onclick = function(){
			toolbar.setloops();
		}
		this.obj2.appendChild(newson);

		this.obj.style.zIndex = 10;
		this.obj2.style.zIndex = 10;
	}
	this.init();

	this.hide = function(x) {
		this.obj.style.display = 'none';
	}

	this.hide2 = function() {
		this.obj2.style.display = 'none';
	}

	this.show = function(x, y) {
		this.hide2();
		this.obj.style.left = x;
		this.obj.style.top = y;
		this.obj.style.display = 'block';
	}

	this.show2 = function(x, y) {
		this.hide();
		this.obj2.style.left = x;
		this.obj2.style.top = y;
		this.obj2.style.display = 'block';
	}

	this.settool = function(v) {
		this.selrun = v;
		var somes = this.obj.getElementsByTagName('div');
		for (i = 0; i < somes.length; i++) {
			somes[i].onclick = function() {
				//eid("cope"+toolbar.selrun).style.background = this.style.background;
				//eid("cope"+toolbar.selrun).style.backgroundSize = "35px 35px";

				var x = Math.floor(toolbar.selrun / 8);
				var y = toolbar.selrun % 8;
				if (y == 0) {
					x--;
					y = 8;
				}
				runs.tasks[x][y - 1] = Number(this.getAttribute('toolid'));
				runs.draw();

				toolbar.hide();
			}
		}
	}

	
	/*******************
	 *	参数 v = (x-1)*8 + y
	 *	换算为数组下标时y -= 1
	 *	
	 */
	this.settool2 = function(v) {

		this.selrun = v;

		var x = Math.floor(toolbar.selrun / 8);
		var y = toolbar.selrun % 8;
		if (y == 0) {
			x--;
			y = 8;
		}

		var somes = this.obj2.getElementsByTagName('div');
		// for (i = 0; i < somes.length; i++) {
		for (i = 0; i < color.length; i++) {
			somes[i].onclick = function() {
				runs.ifs[x][y - 1] = Number(this.getAttribute('toolid'));
				runs.draw();
				toolbar.hide2();
			}
		}

		//	setLoops
		somes[color.length].onclick = function(){

			var lp = prompt('请输入该指令要循环的次数，默认为1',1);
			lp = Number(lp);
			if (lp<1) lp = 1;

			runs.loops[x][y - 1] = lp;
			runs.draw();
			toolbar.hide2();
		}
	}

}