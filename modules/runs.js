/*  
 Class {游戏操作区 && 运行控制器}

 attribute {
 obj			交互层的div元素

 x,y,r,c		相对画布的坐标，尺寸

 tasks[][]	已上膛的指令块
 ifs[][]		已上膛的if指令块

 stack[]		递归运行中的堆栈
 }

 method {
 settool(e,v)	为第v块选择指令（选择面板放在e位置，下同）
 settoolifs(e,v)	选择if指令块

 draw()		绘制操作区背景
 hide()		隐藏交互层div

 run(v,i)	机器运行引擎（去执行第(v,i)个指令块）

 start()		启动机器
 finish()	机器正常结束
 stop()		强行终止机器
 }
 */
function CodeCenterClass() {
    var o    = this;
    this.dom = $id("controller");
    this.x   = stage.x + conf.cell.x * 8;
    this.y   = stage.y - conf.cell.y + cope.height * 0.7;
    this.r   = cope.width * 9;
    this.c   = cope.height * 6.8;

    //  当递归深度超过这个值时，认为是无限递归，直接退出
    this.stackLim = 20;

    this.clear = function () {
        this.tasks = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.ifs   = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.loops = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ];

        /**
         *      Stack
         *
         *          [[x,y,f],...]
         *                (x,y)    :    Position
         *                f        :    Loops
         *
         */
        this.stack = [];
        this.stackLen = 0;
    };
    this.clear();

    /**
     *      初始化指令区
     *      参数：
     *          - xxx   :   可选。为1时表示第一次初始化，需要绘制相关html元素（输入位置的选择框）
     *
     */
    this.init = function (xxx) {
        if (arm.isRunning) this.stop();

        //  draw toolbar
        if (xxx == 1) {
            this.genHTMLToolbar()
        }
    };

    //	第一次启动游戏时，生成输入位置的选择框。只应该调用一次
    this.genHTMLToolbar = function () {
        // alert(3);
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 9; j++) {

                // toolifs + tool
                var toolAll = $('<div>', {class: 'toola'});

                // toolIfs
                $('<div>', {
                    class : 'toolifs',
                    copeId: i * 8 + j
                }).click(function (e) {
                    o.showToolIfs(e, this.getAttribute("copeId"));
                }).appendTo(toolAll);

                // tool
                $('<div>', {
                    class : 'tool',
                    copeId: i * 8 + j,
                    id    : 'cope' + (i * 8 + j)
                }).click(function (e) {
                    o.showTools1(e, this.getAttribute('copeId'));
                }).appendTo(toolAll);

                $(this.dom).append(toolAll);

                //  第4行只有5个指令
                if (i == 3 && j == 5) break;
            }
        }

        placeGrids();

        $(o.dom).hide();
    };

    function placeGrids() {
        $(o.dom).css('left', o.x + cope.width + canvas.offsetLeft + 1)
            .css('top', o.y + canvas.offsetTop - cope.height * 0.7)
            .width(cope.width * 8);
    }

    window.addEventListener('resize', function () {
        placeGrids();
    });

    this.showTools1 = function (e, v) {
        toolbar.show1(e.clientX, e.clientY + 10 - $(canvas).top());
        toolbar.setCope(v);
    };

    this.showToolIfs = function (e, v) {
        toolbar.show2(e.clientX, e.clientY + 10 - $(canvas).top());
        toolbar.setCope(v);
    };

    this.draw = function () {
        console.trace('controller.draw');
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 9; j++) {

                //	绘制指令块
                cope.draw(this.x + cope.width * j, this.y + cope.height * i * 1.7, this.tasks[i][j - 1]);

                // 绘制条件指令块
                if (this.ifs[i][j - 1] != 0) {
                    cope.drawIfs(this.x + cope.width * j, this.y + cope.height * i * 1.7, this.ifs[i][j - 1]);
                } else {
                    drawBg(this.x + cope.width * j, this.y + cope.height * i * 1.7 - cope.height * 0.7, cope.width, cope.height * 0.7)
                }

                // 绘制循环数字
                if (this.loops[i][j - 1] != 1) {
                    cope.drawLoopNum(this.x + cope.width * (j + 0.3), this.y + cope.height * i * 1.7, this.loops[i][j - 1]);
                }

                if (i == 3 && j == 5) break;
            }

            // 最坐标的数字图标
            cope.draw(this.x, this.y + cope.height * i * 1.7, i + 4, cope.width, cope.height);
        }

        //	用来选中的格子
        $(this.dom).show();
    };
    this.hide = function () {
        this.dom.style.display = 'none';
    };

    //	运行(v,i)
    this.run = function (pos, condition) {

        this.run2();
        return;

        //  得到此位置的循环数
        var lpn = this.loops[pos.v][pos.i];

        console.log('[Try ] %d,%d Loop(%d)', pos.v, pos.i, lpn);

        while (lpn--) {

            if (!arm.isRunning) return;

            console.log('[Do  ] %d,%d', pos.v, pos.i);

            //  如果递归超过this.stackLim次，认为是死循环
            if (pos.i == 0 && ++this.stackLen > this.stackLim) return;

            // 此位置没有要执行的指令
            if (this.tasks[pos.v][pos.i] == 0) {
                return;
            }

            //	@ 不再runs中判断条件块，而在arm中去判断，如果不满足，则return当前函数
            //
            // //  此位置有条件块但不满足条件
            // if (this.ifs[v][i] != 0 && this.ifs[v][i] != arm.catched) {
            // 	arm.done(v, i);
            // 	return;
            // }

            //  执行此位置的代码

            currentCostStep++;
            console.log('task=%d', this.tasks[pos.v][pos.i]);
            switch (this.tasks[pos.v][pos.i]) {
                case 1:
                    arm.right({'c': this.ifs[pos.v][pos.i]});
                    break;

                case 2:
                    arm.up({'c': this.ifs[pos.v][pos.i]});
                    break;

                case 3:
                    arm.down({'c': this.ifs[pos.v][pos.i]});
                    break;

                //  Runer_1
                case 4:
                    // this.stack.push([v, i, this.loops[v][i]]);
                    this.run({'v': 0, 'i': 0});
                    break;

                //  Runer_2
                case 5:
                    // this.stack.push([v, i, this.loops[v][i]]);
                    this.run({'v': 1, 'i': 0});
                    break;

                //  Runer_3
                case 6:
                    // this.stack.push([v, i, this.loops[v][i]]);
                    this.run({'v': 2, 'i': 0});
                    break;

                //  Runer_4
                case 7:
                    // this.stack.push([v, i, this.loops[v][i]]);
                    this.run({'v': 3, 'i': 0});
                    break;
            }

            if (pos.i == 0) this.stackLen--;

        }

        //  该指令执行完毕
        // 右块正常，执行(v,i+1)
        if (this.tasks[pos.v][pos.i + 1] != 0) {
            this.run({'v': pos.v, 'i': pos.i + 1});
        }

        // actor.add(function(){
        // 	console.log("%d,%d done.",v,i)
        // })

    };

    //	@ 采用递归的方式模拟完整运行一次
    //
    //	记录一组虚拟的state.box和arm
    //	，独立于界面的记录
    //
    this.run2 = function () {

        var sg = [[], [], [], [], [], []];
        for (var i = 0; i < 6; i++) {
            for (var j = 5; j >= 0; j--) {
                if (stage.box[i][j] == 0) break;
                sg[i].push(stage.box[i][j])
            }
        }

        var myarm = {
            row : 0,
            hand: 0
        };

        function gohand() {
            if (myarm.catched == 0) {
                if (sg[myarm.row].length > 0) {
                    myarm.catched = sg[myarm.row].pop();
                }
            } else {
                if (sg[myarm.row].length < 6) {
                    sg[myarm.row].push(myarm.catched);
                    myarm.catched = 0
                }
            }
        }

        function go(pos) {
            var lpn = o.loops[pos.x][pos.y];
            console.log('go %d,%d L(%d)', pos.x, pos.y, lpn);
            while (lpn--) {
                if (!arm.isRunning) return;
                console.log('do %d,%d L(%d)', pos.x, pos.y, lpn);

                if (pos.y == 0 && ++o.stackLen > o.stackLim) {
                    console.log('[Halt] Deap Loops.');
                    return
                }
                ;

                if (o.tasks[pos.x][pos.y] == 0) {
                    console.log('[Halt] No code.');
                    return
                }

                if (o.ifs[pos.x][pos.y] != 0 && o.ifs[pos.x][pos.y] != myarm.catched) {
                    console.log('[Cotn] Bad Condition.');
                    if (o.tasks[pos.x][pos.y + 1]) {
                        go({x: pos.x, y: pos.y + 1})
                    }
                    return
                }

                currentCostStep++;

                switch (o.tasks[pos.x][pos.y]) {
                    case 1:
                        gohand();
                        arm.right();
                        break;
                    case 2:
                        if (myarm.row > 0) myarm.row--;
                        arm.up();
                        break;
                    case 3:
                        if (myarm.row < 4) myarm.row++;
                        arm.down();
                        break;
                    case 4:
                        go({x: 0, y: 0});
                        break;
                    case 5:
                        go({x: 1, y: 0});
                        break;
                    case 6:
                        go({x: 2, y: 0});
                        break;
                    case 7:
                        go({x: 3, y: 0});
                        break;
                }

                if (pos.x == 0) this.stackLen--;
            }

            if (o.tasks[pos.x][pos.y + 1]) {
                go({x: pos.x, y: pos.y + 1})
            }
        }

        go({x: 0, y: 0});
        console.log('[Done] go(0,0)')

    };

    //  启动机器
    this.start = function () {
        this.store.save();
        initLevel(currentLevel);
        this.store.load();

        arm.isRunning = true;

        currentCostTime = 0;
        currentCostStep = 0;

        actor.stop();

        this.showCode();

        setTimeout(function () {
            actor.start();
            o.run({'v': 0, 'i': 0});
        }, 50)

    };

    this.restart = function () {
        this.finish();
        initLevel(currentLevel);
    };

    //  机器运行结束
    //	x 表示由halt得来，为空则表示程序正常结束
    this.finish = function (x) {
        actor.stop();
        clearFresh();
        if (x != 1)
            arm.halt();
    };

    //  机器终止运行
    this.stop = function () {
        this.finish(1);
    };

    //  持久化组件
    this.store = {

        save: function () {
            localStorage.setItem("armgo_runs_" + currentLevel, JSON.stringify(o.tasks));
            localStorage.setItem("armgo_runs_ifs_" + currentLevel, JSON.stringify(o.ifs));
            localStorage.setItem("armgo_runs_loops_" + currentLevel, JSON.stringify(o.loops));

            console.log("Saved.");
            // console.log(localStorage);
        },

        load: function () {

            //  尝试获取指令
            var t   = "armgo_runs_" + currentLevel;
            var res = eval("(" + localStorage.getItem(t) + ")");
            if (res != null) {
                o.tasks = res;

                //  尝试获取ifs指令
                t   = "armgo_runs_ifs_" + currentLevel;
                res = eval("(" + localStorage.getItem(t) + ")");
                if (res != null) {
                    o.ifs = res;
                }

                //	尝试获取loops指令
                t   = "armgo_runs_loops_" + currentLevel;
                res = eval("(" + localStorage.getItem(t) + ")");
                if (res != null) {
                    o.loops = res;
                }
            }

            //  绘制指令区
            o.draw();
        }
    };

    this.genCodeOne  = function (arg) {
        var code = {
            x: arg.x,
            y: arg.y
        };

        var x      = arg.x;
        var y      = arg.y;
        var indent = arg.indent;

        var ret   = [];
        var defer = [];

        if (this.loops[x][y] > 1) {
            // var idx = sprintf('i%d%d', x,y);
            var idx = 'i';
            ret.push(sprintf('for (int %s=1; %s<=%d; %s++) {', idx, idx, this.loops[x][y], idx));
            defer.push('}');
        }

        if (o.ifs[x][y] > 0) {
            ret.push(sprintf('if (condition[%d][%d] == "%s") {', x, y, color[o.ifs[x][y]]));
            defer.push('}');
        }

        var hash = {
            1: 'moveRight();',
            2: 'moveUp();',
            3: 'moveDown();',
            4: 'prog1();',
            5: 'prog2();',
            6: 'prog3();',
            7: 'prog4();'
        };

        ret.push(hash[o.tasks[x][y]]);

        var rets = '';

        for (var i = 0; i < ret.length; i++) {
            rets += strRepeat('\t', i + indent) + ret[i] + '\n';

        }
        for (var i = defer.length - 1; i >= 0; i--) {
            rets += strRepeat('\t', i + indent) + defer[i] + '\n';
        }
        return rets;

    };
    this.genCodePROG = function (idx) {
        var rets = '';
        for (var i = 0; i < o.tasks[idx].length; i++) if (o.tasks[idx][i] > 0) {
            rets += o.genCodeOne({x: idx, y: i, indent: 1});
        }
        if (rets)
            rets = sprintf('void prog%d() {\n', idx + 1) + rets + '}\n\n';
        return rets;
    };

    this.genCode = function () {

        var rets = '#inlcude "armgo.h"\n\n';

        for (var i = 0; i < 4; i++) {
            rets += o.genCodePROG(i);
        }

        rets += sprintf('int main(){\n\tprog1();\n\treturn 0;\n}\n');
        return rets;
    };

    this.showCode = function () {
        codepad.showCode(this.genCode());
    };

    this.init(1);
}

function strRepeat(a, num) {
    var ret = '';
    for (var i = 0; i < num; i++)
        ret += a;
    return ret;
}