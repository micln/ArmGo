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
function COPE(v) {
    this.x = 50;
    this.y = 50;
    this.width = 35;
    this.height = this.width;
    this.value = v;

    /**
     * 绘制指令块
     * @param x 坐标，相对画布
     * @param y
     * @param v 指令信息
     * @param r 可选。指令块大小，默认为 this.width
     * @param c
     */
    this.draw = function (x, y, v, r, c) {
        var img = new Image();
        img.src = "img/" + imgFile[v];
        if (r == undefined) {
            // cxt.drawImage(img,x,y,cope.width,cope.height);
            cxt.drawImage(img, x + cope.width * 0.02, y + cope.height * 0.02, cope.width * 0.96, cope.height * 0.96);
        } else {
            cxt.drawImage(img, x, y, r, c);
        }
    }

    /**
     *  绘制条件指令块
     *
     *  参数：
     *      同上
     */
    this.drawifs = function (x, y, v) {
        cxt.fillStyle = color[v];
        cxt.beginPath();
        cxt.moveTo(x, y);
        cxt.lineTo(x + 5, y - 20);
        cxt.lineTo(x + 30, y - 20);
        cxt.lineTo(x + 35, y);
        cxt.closePath();
        cxt.fill();
    }

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