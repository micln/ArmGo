// Global Variables
var canvas = $id("canvas");
var cxt = canvas.getContext("2d");
var g_ctime; // arm Go!
var Mission; // Mission Canvas Object
var costime;
var coststep;

var btn_start = $id("btn_start");
var btn_Mission = $id("btn_goMission");
var btn_Refresh = $id("btn_Refresh");
var btn_save = $id("btn_save");
var btn_load = $id("btn_load");
var btns = [btn_start, btn_load, btn_save, btn_Refresh];

var res = {
    img: {}
};

//	全局函数；公共组件

function checkAns() {
    console.log('正在尝试检查答案...')
    // console.log(state.box.toString())
    // console.log(Goal[Mission].toString())
    if (state.box.toString() == Goal[Mission].toString()) {
        var costCope = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++)
                //  不统计跳转指令
                if (runs.tasks[i][j] <= 3) {
                    costCope += (runs.tasks[i][j] != 0) + (runs.ifs[i][j] != 0);
                }
        }

        var score = 1 + (coststep <= grade[Mission][1]) + (costCope <= grade[Mission][0]);
        var scoreTxt = '<span class="score-star">★</span>'
        if (score == 2) scoreTxt += scoreTxt;
        if (score == 3) scoreTxt += scoreTxt + scoreTxt;

        message("WIN<hr>" + costime * conf.Fz / 1000 + "s<br>" + coststep + " steps<br>" + costCope + " instructions<br>" + scoreTxt);

        //	通知游戏结束
        runs.finish();
    }
}

function drawcell(x, y, v) {
    cxt.fillStyle = color[v];
    cxt.fillRect(x, y, conf.cell.x, conf.cell.y);
    cxt.fillStyle = "#7E3902";
    cxt.fillRect(x + conf.cell.x * 0.2, y + conf.cell.y * 0.2, conf.cell.x * 0.6, conf.cell.y * 0.6);
    // cxt.strokeStyle = "#7E3902";
    // cxt.strokeRect(x,y,conf.cell.x,conf.cell.y);
}

function drawBg(x, y, w, h) {
    // cxt.fillStyle = color[0];
    // cxt.fillRect(0, 0, canvas.width, canvas.height);

    //	draw all
    var img = new Image();
    img.src = res.img.bg.src;
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
    var g = Goal[Mission];

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
    cxt.font = "30px 'Comic Sans MS'";
    cxt.fillText("Goal:", x, y - 30);
    cxt.fillText("Yours:", 300, y - 30);
    cxt.fillText("Code:", 530, y - 30);
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 6; j++) {
            cxt.fillStyle = color[g[i][j]];
            cxt.strokeStyle = color[g[i][j]];
            if (g[i][j] != 0) {
                //cxt.fillRect(j*conf.cell.x+x,i*conf.cell.y*2+y,conf.cell.x,conf.cell.y);
                drawcell(j * conf.cell.x + x, i * conf.cell.y * 2 + y, g[i][j]);
            } else {
                // cxt.strokeRect(j * conf.cell.x + x, i * conf.cell.y * 2 + y, conf.cell.x, conf.cell.y);
            }
        }
    }
}

//	刷新图像
function freshMap() {
    if (missionList.has) return;
    costime++;
    state.draw();
}

function clearFlash() {
    clearInterval(g_ctime);
    log('clearFlash.')
}

/**
 * ID of (e.x,e.y) in Map: start(x,y),per(r,canvas), there are m in one line
 * @param e
 * @param x
 * @param y
 * @param r
 * @param c
 * @param m
 * @returns {number}
 */
function getClickId(e, x, y, r, c, m) {

    //alert(e.clientX+","+e.clientY);
    var i = Math.floor((e.clientX - canvas.offsetLeft - x) / r) + 1;
    var j = Math.floor((e.clientY - canvas.offsetTop - y) / c) + 1;
    //alert(i+','+j);

    canvas.style.cursor = 'default';
    var ttt = (j - 1) * m + i;
    //alert(ttt);

    if (ttt > 0 && ttt <= missionList.tot) {

        //	清除因选关卡而设置的点击事件
        canvas.onclick = function () {
            null;
        };

        return ttt;
    } else {
        //	return getClickId(e,missionList.x,missionList.y,missionList.r*2,missionList.canvas*2,5);
    }
}

function log(t) {
    if (conf.Debug == true)
        console.trace(t);
}

function message(t) {
    var m = $id("msgbox");
    m.getElementsByTagName("div")[0].innerHTML = t;
    m.style.display = 'block';
    m.style.left = (document.body.clientWidth - m.offsetWidth) / 2;
}

(function preload() {
    for (var i = 0; i < imgFile.length; i++) {
        var a = new Image();
        a.src = "img/" + imgFile[i];
        res.img[i] = a;
    }

    var list = ['hello', 'bg'];

    for (var id in list) {
        var name = list[id];
        res.img[name] = new Image();
        res.img[name].src = 'img/' + name + '.jpg';
    }
})();

function showHelp() {
    var txt = "";
    //alert(txt);
    message(txt);
}

function $id(x) {
    return document.getElementById(x);
}

var zpp = {
    'includejs': function (filename) {
        document.write("<script type='text/javascript' src='" + filename + "'></script>");
    }
};

function delay(fn) {
    setTimeout(fn, 0);
}


// http://demon.tw/programming/javascript-sprintf.html

function str_repeat(i, m) {
    for (var o = []; m > 0; o[--m] = i);
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