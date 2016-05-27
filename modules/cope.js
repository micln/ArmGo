//
// Class 代码框
//@Randox
/*  attribute ：


 method :
 */
//
/**
 *
 * @param v
 * @constructor
 */
function CopeClass(v) {
	this.x = 50;
	this.y = 50;
	this.height = this.width = 35;
	this.value = v;

	/**
	 * 绘制指令块
	 * @param left 左上角坐标，相对画布
	 * @param top
	 * @param val 指令信息
	 * @param width 可选。指令块大小，默认为 this.width
	 * @param height
	 */
	this.draw = function (left, top, val, width, height) {
		var img = resources.img[val];
		if (width == undefined) {
			cxt.drawImage(img, left + cope.width * 0.02, top + cope.height * 0.02, cope.width * 0.96, cope.height * 0.96);
		} else {
			cxt.drawImage(img, left, top, width, height);
		}
	}

	/**
	 *  绘制条件指令块
	 *
	 *  参数：
	 *      同上
	 */
	this.drawIfs = function (x, y, v) {
		cxt.fillStyle = color[v];
		cxt.beginPath();
		cxt.moveTo(x, y);
		cxt.lineTo(x + 5, y - 20);
		cxt.lineTo(x + 30, y - 20);
		cxt.lineTo(x + 35, y);
		cxt.closePath();
		cxt.fill();
	};

	/**
	 *  绘制循环的数字
	 *
	 *  参数：
	 *      同上
	 */
	this.drawLoopNum = function (x, y, v) {
		cxt.fillStyle = "#fff";
		cxt.font = "18px 'monospace'";
		cxt.fillText(v, x, y);
	}
}