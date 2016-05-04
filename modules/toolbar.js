/**
 *    工具栏-指令选择框
 * @constructor
 */
function TOOLBAR() {
    var that = this;
    this.selectDom = eid("toolslc");
    this.selectIfDom = eid("toolslcifs");
    this.selected = 0;
    this.init = function (p) {
        this.selected = 0;

        //	初始化指令工具栏
        for (var i = 0; i < 8; i++) {
            $('<div>', {class: 'tool'})
                .css('background', "url('img/" + imgFile[i] + "')")
                .css('backgroundSize', "35px 35px")
                .appendTo(this.selectDom);
        }

        //	初始化条件工具栏
        for (i = 0; i < color.length; i++) {
            $('<div>', {
                class: 'toolifs',
                toolId: i
            }).css('backgroundColor', color[i])
                .appendTo(this.selectIfDom);
        }

        //	初始化循环工具栏
        var newson = document.createElement("div");
        newson.className = "toolifs";
        newson.innerHTML = "loop";
        this.selectIfDom.appendChild(newson);

        this.selectDom.style.zIndex = 10;
        this.selectIfDom.style.zIndex = 10;
    }
    this.init();

    this.hide = function (x) {
        this.selectDom.style.display = 'none';
        this.selectIfDom.style.display = 'none';
    }

    this.show = function (x, y) {
        this.hide();
        this.selectDom.style.left = x;
        this.selectDom.style.top = y;
        this.selectDom.style.display = 'block';
    }

    this.show2 = function (x, y) {
        this.hide();
        this.selectIfDom.style.left = x;
        this.selectIfDom.style.top = y;
        this.selectIfDom.style.display = 'block';
    }

    this.settool = function (v) {
        this.selected = v;
        var somes = this.selectDom.getElementsByTagName('div');
        for (i = 0; i < somes.length; i++) {
            somes[i].onclick = function () {
                //eid("cope"+toolbar.selected).style.background = this.style.background;
                //eid("cope"+toolbar.selected).style.backgroundSize = "35px 35px";

                var x = Math.floor(toolbar.selected / 8);
                var y = toolbar.selected % 8;
                if (y == 0) {
                    x--;
                    y = 8;
                }
                runs.tasks[x][y - 1] = Number(this.getAttribute('toolId'));
                runs.draw();

                toolbar.hide();
            }
        }
    }


    /*******************
     *    参数 v = (x-1)*8 + y
     *    换算为数组下标时y -= 1
     *
     */
    this.settool2 = function (v) {

        this.selected = v;

        var x = Math.floor(toolbar.selected / 8);
        var y = toolbar.selected % 8;
        if (y == 0) {
            x--;
            y = 8;
        }

        var somes = this.selectIfDom.getElementsByTagName('div');
        // for (i = 0; i < somes.length; i++) {
        for (i = 0; i < color.length; i++) {
            somes[i].onclick = function () {
                runs.ifs[x][y - 1] = Number(this.getAttribute('toolId'));
                runs.draw();
                toolbar.hide2();
            }
        }

        //	setLoops
        somes[color.length].onclick = function () {

            var lp = prompt('请输入该指令要循环的次数，默认为1', 1);
            lp = Number(lp);
            if (lp < 1) lp = 1;

            runs.loops[x][y - 1] = lp;
            runs.draw();
            toolbar.hide2();
        }
    }

}