//
// Class 关卡
//@Randox
/*  attribute ：


 method :
 */
//
function MISSIONLIST() {
    var that = this;
    this.tot = Goal.length - 1;
    this.x = 90;
    this.y = 150;
    this.r = 80;
    this.c = 80;
    this.has = false;

    this.show = function () {
        this.has = true;
        hideBtns();

        // if ( arm.running ) {
        toolbar.hide();
        runs.hide();
        runs.stop();
        // }

        cxt.fillStyle = '#000';
        cxt.fillRect(0, 0, canvas.width, canvas.height);
        var img = res.img.bg;
        cxt.drawImage(img, 0, 0)
        cxt.fillStyle = '#fff';
        cxt.font = "40px 'Comic Sans MS'"
        cxt.fillText("Level :", this.x, this.y - 50);

        cxt.strokeStyle = '#fff';
        for (i = 1; i <= this.tot; i++) {
            var x = this.x + ((i - 1) % 5) * this.r * 2;
            var y = this.y + Math.floor((i - 1) / 5) * this.c * 2;
            cxt.strokeRect(x, y, this.r, this.c);
            cxt.fillText(i, x + this.r * 1 / 3, y + this.c * 2 / 3);
        }
        canvas.style.cursor = 'hand';
        canvas.onclick = that.selected;
        //setTimeout('missionList.show()',conf.Fz/2);
    }

    this.selected = function (e) {
        that.has = false;
        initLevel(getClickId(e, missionList.x, missionList.y, missionList.r * 2, missionList.c * 2, 5));
    }
}

//	载入关卡
function initLevel(v) {
    Mission = v;

    state.init(v);
    runs.clear();
    drawBg();
    drawGoal();
    delay(function(){
        runs.draw();
    });

    freshMap();
    g_ctime = setInterval(freshMap, conf.Fz);

    placeBtns();
}

function hideBtns() {
    for (var i = 0; i < 4; i++) $(btns[i]).hide();
}

function placeBtns() {
    for (var i = 0; i < 4; i++) $(btns[i]).show();
    $(btn_Mission).show();

    btn_start.style.top = canvas.offsetTop + canvas.offsetHeight - btn_start.offsetHeight - 10;
    btn_start.style.left = canvas.offsetLeft + canvas.offsetWidth - btn_start.offsetWidth - 150;

    btn_Mission.style.top = canvas.offsetTop + 10;
    btn_Mission.style.left = canvas.offsetLeft + canvas.offsetWidth - btn_Mission.offsetWidth - 10;

    btn_Refresh.style.top = canvas.offsetTop + canvas.offsetHeight - btn_Refresh.offsetHeight - 10;
    btn_Refresh.style.left = canvas.offsetLeft + canvas.offsetWidth - btn_Refresh.offsetWidth - 300;

    btn_save.style.top = btn_load.style.top = btn_Refresh.offsetTop;
    btn_save.style.left = btn_start.offsetLeft + btn_start.offsetWidth + 10;
    btn_load.style.left = btn_save.offsetLeft + btn_save.offsetWidth + 10;
}

window.addEventListener('resize', function () {
    placeBtns();
});