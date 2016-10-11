// Global Variables
var canvas = $id("canvas");
var cxt    = canvas.getContext("2d");
var currentGame;
var currentTimer; // arm Go!
var currentLevel; // currentLevel Canvas Object
var currentCostTime;
var currentCostStep;

var btnStart   = $id("btn_start");
var btnLevelUI = $id("btn_goMission");
var btnRefresh = $id("btn_Refresh");
var btnSave    = $id("btn_save");
var btnLoad    = $id("btn_load");
var btns       = [btnStart, btnLoad, btnSave, btnRefresh];

var resources = {
    img: {}
};

//	全局函数；公共组件

function checkAns() {
    console.log('正在尝试检查答案...');
    // console.log(stage.box.toString())
    // console.log(Goal[currentLevel].toString())
    //if (stage.box.toString() == Goal[currentLevel].toString()) {
    if (stage.box.toString() == currentGame.mapGoal.toString()) {
        var costCope = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++)
                //  不统计跳转指令
                if (controller.tasks[i][j] <= 3) {
                    costCope += (controller.tasks[i][j] != 0) + (controller.ifs[i][j] != 0);
                }
        }

        var score    = 1 + (currentCostStep <= currentGame.scope.step) + (costCope <= currentGame.scope.number);
        var scoreTxt = '<span class="score-star">★</span>';
        if (score == 2) scoreTxt += scoreTxt;
        if (score == 3) scoreTxt += scoreTxt + scoreTxt;

        swal({
            title: 'win!',
            text : currentCostTime * conf.Fz / 1000 + "s<br>"
            + currentCostStep + " steps<br>"
            + costCope + " instructions<br>"
            + scoreTxt,
            html : true
        });

        //	通知游戏结束
        controller.finish();
    }
}

function drawCell(x, y, v) {
    cxt.fillStyle = color[v];
    cxt.fillRect(x, y, conf.cell.x, conf.cell.y);
    cxt.fillStyle = "#7E3902";
    cxt.fillRect(x + conf.cell.x * 0.2, y + conf.cell.y * 0.2, conf.cell.x * 0.6, conf.cell.y * 0.6);
}

function drawBg(x, y, w, h) {

    //	draw all
    var img = new Image();
    img.src = resources.img.bg.src;
    if (x == undefined) {
        cxt.drawImage(img, 0, 0)
    } else {
        //	draw(x,y,w,h)
        cxt.drawImage(img, x, y, w, h, x, y, w, h)
    }

}

function drawGoal() {
    var x = conf.goalm.x;
    var y = conf.goalm.y;
    //var g = Goal[currentLevel];
    var g = currentGame.mapGoal;

    // holder
    var gradient = cxt.createLinearGradient(50, 50, 330, 500);
    for (var i = 0; i < 0.9; i += 0.05) {
        gradient.addColorStop(i, "#987335");
        gradient.addColorStop(i + 0.025, "#5E4925");
    }
    // cxt.fillStyle = "#5E4925";
    cxt.fillStyle = gradient;
    cxt.fillRect(conf.goalm.x + conf.cell.x * 6, conf.goalm.y - 35, 15, 500);
    for (i = 1; i < 7; i++) {
        cxt.fillRect(conf.goalm.x, conf.goalm.y + conf.cell.y * (i * 2 - 1), conf.cell.x * 6, 15);
    }

    // conf.cell
    cxt.fillStyle = '#000';
    cxt.font      = "30px 'Comic Sans MS'";
    cxt.fillText("Goal:", x, y - 30);
    cxt.fillText("Yours:", 300, y - 30);
    cxt.fillText("Code:", 530, y - 30);
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 6; j++) {
            cxt.fillStyle   = color[g[i][j]];
            cxt.strokeStyle = color[g[i][j]];
            if (g[i][j] != 0) {
                //cxt.fillRect(j*conf.cell.x+x,i*conf.cell.y*2+y,conf.cell.x,conf.cell.y);
                drawCell(j * conf.cell.x + x, i * conf.cell.y * 2 + y, g[i][j]);
            } else {
                // cxt.strokeRect(j * conf.cell.x + x, i * conf.cell.y * 2 + y, conf.cell.x, conf.cell.y);
            }
        }
    }
}

//	刷新图像
function freshMap() {
    if (levelUI.isShowing) return;
    currentCostTime++;
    stage.draw();
}

function clearFresh() {
    clearInterval(currentTimer);
    log('clearFresh.')
}

/**
 * ID of (e.x,e.y) in Map: start(x,y),per(r,canvas), there are m in one line
 * @param e
 * @param left    左上角
 * @param top
 * @param sizeR 每一块尺寸
 * @param sizeC
 * @param eachRow 每行的数量
 * @returns {number}
 */
function getClickId(e, left, top, sizeR, sizeC, eachRow) {

    //alert(e.clientX+","+e.clientY);
    var i = Math.floor((e.clientX - canvas.offsetLeft - left) / sizeR) + 1;
    var j = Math.floor((e.clientY - canvas.offsetTop - top) / sizeC) + 1;

    var selected = (j - 1) * eachRow + i;

    if (selected > 0 && selected <= levelUI.tot) {
        //	清除因选关卡而设置的点击事件
        canvas.style.cursor = 'default';
        canvas.onclick      = function () {
        };
        return selected;
    } else {
        alert('retry');
        //	return getClickId(e,levelUI.x,levelUI.y,levelUI.r*2,levelUI.canvas*2,5);
    }
}

function log(t) {
    if (conf.Debug == true)
        console.trace(t);
}

function message(t) {
    swal({title: t, type: 'warning'});
}

(function preload() {
    for (var i = 0; i < imgFile.length; i++) {
        var a            = new Image();
        a.src            = "img/" + imgFile[i];
        resources.img[i] = a;
    }

    var list = ['hello', 'bg'];

    for (var id in list) {
        var name                = list[id];
        resources.img[name]     = new Image();
        resources.img[name].src = 'img/' + name + '.jpg';
    }
})();

function $id(x) {
    return document.getElementById(x);
}

function delay(fn) {
    setTimeout(fn, 0);
}

// http://demon.tw/programming/javascript-sprintf.html
function str_repeat(i, m) {
    for (var o = []; m > 0;)o[--m] = i;
    return o.join('');
}
function sprintf() {
    var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
    while (f) {
        if (m = /^[^\x25]+/.exec(f)) {
            o.push(m[0]);
        }
        else if (m = /^\x25{2}/.exec(f)) {
            o.push('%');
        }
        else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
            if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
                throw('Too few arguments.');
            }
            if (/[^s]/.test(m[7]) && (typeof(a) != 'number')) {
                throw('Expecting number but found ' + typeof(a));
            }
            switch (m[7]) {
                case 'b':
                    a = a.toString(2);
                    break;
                case 'c':
                    a = String.fromCharCode(a);
                    break;
                case 'd':
                    a = parseInt(a);
                    break;
                case 'e':
                    a = m[6] ? a.toExponential(m[6]) : a.toExponential();
                    break;
                case 'f':
                    a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a);
                    break;
                case 'o':
                    a = a.toString(8);
                    break;
                case 's':
                    a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a);
                    break;
                case 'u':
                    a = Math.abs(a);
                    break;
                case 'x':
                    a = a.toString(16);
                    break;
                case 'X':
                    a = a.toString(16).toUpperCase();
                    break;
            }
            a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+' + a : a);
            c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
            x = m[5] - String(a).length - s.length;
            p = m[5] ? str_repeat(c, x) : '';
            o.push(s + (m[4] ? a + p : p + a));
        }
        else {
            throw('Huh ?!');
        }
        f = f.substring(m[0].length);
    }
    return o.join('');
}

$(document).ready(function () {
    $('.x-close-parent').click(function () {
        $(this).parent().hide();
    });
});