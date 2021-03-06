//
//
/*
 attribute ：{
 (leftz,topz)
 speed
 isRunning

 }

 method : {
 init();
 draw();

 up();
 down();
 left();
 right();
 GoRight()		// Catch();

 Done();
 Halt();
 Died();
 }
 */
//

/**
 *  机械臂
 * @constructor
 */
function ArmClass() {

    var that = this;

    //  边界
    this.leftz     = stage.x - conf.cell.x - 12;
    this.topz      = stage.y;
    //  爪子每次移动的像素点
    this.speed     = 6;
    //  爪子的状态
    this.isRunning = false;

    this.init = function () {
        this.isRunning = false;
        this.x         = this.leftz;
        this.y         = this.topz;
        this.r         = 1;             //  行号

        this.catched = 0;   //  抓到的颜色
    };

    this.draw = function () {
        var x = this.x;
        var y = this.y;
        cxt.beginPath();
        cxt.moveTo(x, y);
        cxt.lineTo(x, y + 30);

        cxt.lineTo(x + 10, y + 30);
        cxt.lineTo(x + 1, y + 30 + 4);
        cxt.lineTo(x - 2, y + 30 + 4);
        cxt.lineTo(x - 4, y + 30);

        cxt.lineTo(x - 3, y + 30);
        cxt.lineTo(x - 6, y + 15);
        cxt.lineTo(x - 3, y);

        cxt.lineTo(x - 4, y);
        cxt.lineTo(x - 2, y - 4);
        cxt.lineTo(x + 1, y - 4);
        cxt.lineTo(x + 10, y);

        cxt.closePath();
        cxt.fillStyle = '#00ff00'; // 连接横杆
        cxt.fill();
        cxt.fillRect(240, y + 12, x - 240, 6);

        // 支撑立柱
        var gradient = cxt.createLinearGradient(240, 0, 246, 0);
        gradient.addColorStop("0", "#ccc");
        gradient.addColorStop("0.7", "#555");
        gradient.addColorStop("1.0", "#999");
        cxt.fillStyle = gradient;
        cxt.fillRect(240, stage.y - 40, 6, 480);

        // 连接点
        cxt.fillStyle = '#00ff00'; // 连接点 + 爪子
        cxt.arc(243, this.y + 15, 5, 0, 2 * Math.PI);
        cxt.fill();

        //  抓到的东西
        if (this.catched != 0) {
            drawCell(this.x, this.y, this.catched);
        }
    };

    this.halt = function () {
        arm.init();
        stage.draw();
    };

    // 第(v,i)块指令执行完毕
    this.done = function (v, i) {
        log("[Done] " + v + ',' + i);

        if (v == undefined) return;

        // 右块正常，执行(v,i+1)
        if (controller.tasks[v][i + 1] != 0) {
            controller.run(v, i + 1);
        } else {
            // 右侧没有正常的指令，检查堆栈有无回溯
            var l = controller.stack.length - 1;
            if (l >= 0) {
                //  回溯
                var x = controller.stack[l][0];
                var y = controller.stack[l][1];
                log("[Back] " + x + ',' + y);
                controller.stack.length--;
                this.done(x, y);
            } else {
                //  堆栈空，结束游戏
                controller.finish(); // finish
            }
        }
    };

    //  撞毁
    this.died = function () {
        controller.stop();
        message("Destroyed!\n通过下方按钮“重新开始”")
    };

    //  向右运动，返回
    //  @ 	a.x, a.y
    //  		表示从 controller.task[a.x][a.y] 过来的，用于判断ifs是否满足条件
    //  	a.canvas
    //  		调用该函数时的条件指令块，不满足时直接return
    this.right = function (a) {
        if (!this.isRunning) return;

        var num = 0;
        var i;

        actor.add(function () {

            if (a && a.c != 0 && a.c != arm.catched) {
                //	告诉下一个actor不要执行了
                //	本次活动取消
                num = -402;
                return;
            }

            //  计算右侧能走到的位置，假定能走到第5格（从0开始计数）
            i = 5;
            //	如果前面那格有东西，就往前
            while (i > 0 && stage.box[that.r - 1][i - 1] != 0) i--;
            console.log('rightest pos: (%d,%d)', that.r, i)
            //  如果右侧满且手里有东西，会撞毁
            if (i == 0 && that.catched != 0) {
                that.died();
                return;
            }

            //	如果手里有东西&要走的那个地方也有东西，再往前一格
            //	因为我不知道能走到i是因为能抓还是能放
            if (that.catched > 0 && stage.box[that.r - 1][i] != 0) i--;

            //  走到最右边
            // var dis = ( stage.x + conf.cell.x * i - (that.leftz + (that.catched>0) * conf.cell.x) )
            var dis = stage.x + conf.cell.x * i - that.leftz
            num     = dis / that.speed;
        });

        actor.add(function () {

            //	本次活动取消
            if (num == -402) return;

            //	根据上一次actor得到num值
            if (actor.anilist[0].count == -401) {
                actor.anilist[0].count = num - 1
            }

            arm.doRight();

        }, -401);

        //  到右边之后执行抓取、放置
        actor.add(function () {

            //	本次活动取消
            if (num == -402) return;

            // 放下箱子
            if (i > 0 && that.catched > 0) {
                stage.box[that.r - 1][i] = arm.catched;
                that.catched             = 0;
            }
            // 抓取箱子
            else if (i < 6 && that.catched == 0 && stage.box[that.r - 1][i] != 0) {
                that.catched             = stage.box[that.r - 1][i];
                stage.box[that.r - 1][i] = 0;
            }
        });

        //  检查答案
        actor.add(function () {
            //	本次活动取消
            if (num == -402) return;
            checkAns();
        });

        //  打道回府
        actor.add(function () {
            //	本次活动取消
            if (num == -402) return;

            //	根据上一次actor得到num值
            if (actor.anilist[0].count == -401) {
                actor.anilist[0].count = num - 1
            }
            arm.doLeft();
        }, -401)

    };

    //  向左运动
    this.left = function () { // 带入参数表示正在执行第(v,i)块指令

        if (!this.isRunning) return;

        actor.add(function () {
            var num = ( that.x - that.leftz ) / that.speed;
            actor.add("arm.doLeft()", num)
        });
    };

    this.up = function (a) {

        if (!this.isRunning) return;

        var cancel = 0;

        actor.add(function () {
            if (a && a.c != 0 && a.c != arm.catched) {
                //	本次活动取消
                cancel = 1;
                return;
            }

            if (that.r == 1) {
                that.died();
            }
        });

        //  计算需要下移的次数
        var num = conf.cell.y * 2 / that.speed;
        actor.add(function () {
            //	本次活动取消
            if (cancel == 1)
                return;

            arm.doUp();
        }, num);

        actor.add(function () {

            //	本次活动取消
            if (cancel == 1)
                return;

            //	修改that.r
            arm.RowUp();
        });

    };

    this.down = function (a) {
        if (!this.isRunning) return;

        var cancel = 0;

        actor.add(function () {

            if (a && a.c != 0 && a.c != arm.catched) {

                //	本次活动取消
                cancel = 1;
                return;
            }

            console.log("isRunning down.");

            if (that.r >= 6) {
                that.died();
            }
        });

        //  计算需要下移的次数
        var num = conf.cell.y * 2 / that.speed;

        actor.add(function () {
            //	本次活动取消
            if (cancel == 1)
                return;
            arm.doDown();
        }, num);

        actor.add(function () {
            //	本次活动取消
            if (cancel == 1)
                return;
            arm.RowDown();
        });
    };

    this.doUp    = function () {
        this.y -= this.speed;
    };
    this.doDown  = function () {
        this.y += this.speed;
    };
    this.doRight = function () {
        this.x += this.speed;
    };
    this.doLeft  = function () {
        this.x -= this.speed;
    };

    this.RowUp   = function () {
        this.r--;
        log('arm is in row[' + this.r + ']')
    };
    this.RowDown = function () {
        this.r++;
        log('arm is in row[' + this.r + ']')
    };

    //  建立对象之后随即初始化
    this.init();
}