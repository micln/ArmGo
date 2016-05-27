/**
 *    工具栏-指令选择框
 * @constructor
 */
function ToolbarClass() {
    var that = this;

    this.selectDom    = $id("toolslc");
    this.selectIfDom  = $id("toolslcifs");
    this.selectedCope = 0;
    this.init         = function () {
        this.selectedCope = 0;

        //	初始化指令工具栏
        for (var i = 0; i < 8; i++) {
            $('<div>', {class: 'tool', toolId: i})
                .css('background', "url('" + resources.img[i].src + "')")
                .css('backgroundSize', "35px 35px")
                .click(function () {
                    var x = that.selectedCope.x;
                    var y = that.selectedCope.y;

                    controller.tasks[x][y - 1] = Number(this.getAttribute('toolId'));
                    controller.draw();

                    that.hide();
                })
                .appendTo(this.selectDom);
        }

        //	初始化条件工具栏
        for (i = 0; i < color.length; i++) {
            $('<div>', {
                class : 'toolifs',
                toolId: i
            }).css('backgroundColor', color[i])
                .click(function () {
                    var x = that.selectedCope.x;
                    var y = that.selectedCope.y;

                    controller.ifs[x][y - 1] = Number(this.getAttribute('toolId'));
                    controller.draw();
                    that.hide();
                })
                .appendTo(this.selectIfDom);
        }

        //	初始化循环工具栏
        $('<div>', {
            class: 'toolifs',
            text : 'loop'
        })
            .click(function () {
                var x = that.selectedCope.x;
                var y = that.selectedCope.y;

                //fyh
                swal({
                    title         : "ArmGo!",
                    text          : "Please input a integer:",
                    type          : "input",
                    closeOnConfirm: true
                }, function (inputValue) {
                    var lp = Number(inputValue);
                    if (!lp || lp < 0) lp = 1;
                    controller.loops[x][y - 1] = lp;
                    controller.draw();
                    that.hide();
                    return false;
                });
            })
            .appendTo(this.selectIfDom);

        this.selectDom.style.zIndex   = 10;
        this.selectIfDom.style.zIndex = 10;
    };
    this.init();

    this.hide = function (x) {
        $(this.selectDom).hide();
        $(this.selectIfDom).hide();
    };

    this.show1 = function (x, y) {
        this.hide();
        $(this.selectDom).css('left', x);
        $(this.selectDom).css('top', y);
        $(this.selectDom).show();
    };

    this.show2 = function (x, y) {
        this.hide();
        $(this.selectIfDom).css('left', x);
        $(this.selectIfDom).css('top', y);
        $(this.selectIfDom).show();
    };

    /*******************
     *    参数 v = (x-1)*8 + y
     *    换算为数组下标时y -= 1
     */
    this.setCope = function (v) {

        var x = Math.floor(v / 8);
        var y = v % 8;
        if (y == 0) {
            x--;
            y = 8;
        }

        this.selectedCope = {
            id: v,
            x : x,
            y : y
        };
    }

}