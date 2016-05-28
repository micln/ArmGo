/**
 * 关卡
 * @constructor
 */
function LevelUI() {
    var that = this;
    this.tot = levelData.totLevel;
    this.x   = 90;
    this.y   = 150;
    this.r   = 80;
    this.c   = 80;
    
    this.isShowing = false;

    this.show = function () {
        this.isShowing = true;
        hideBtns();

        // if ( arm.isRunning ) {
        toolbar.hide();
        controller.hide();
        controller.stop();
        // }

        cxt.fillStyle = '#000';
        cxt.fillRect(0, 0, canvas.width, canvas.height);
        var img = resources.img.bg;
        cxt.drawImage(img, 0, 0);
        cxt.fillStyle = '#fff';
        cxt.font      = "40px 'Comic Sans MS'";
        cxt.fillText("Level :", this.x, this.y - 50);

        cxt.strokeStyle = '#fff';
        for (i = 1; i <= this.tot; i++) {
            var x = this.x + ((i - 1) % 5) * this.r * 2;
            var y = this.y + Math.floor((i - 1) / 5) * this.c * 2;
            cxt.strokeRect(x, y, this.r, this.c);
            cxt.fillText(i, x + this.r / 3, y + this.c * 2 / 3);
        }
        canvas.style.cursor = 'hand';
        canvas.onclick      = that.selected;
        //setTimeout('levelUI.show()',conf.Fz/2);
    };

    this.selected = function (e) {
        that.isShowing = false;
        initLevel(getClickId(e, levelUI.x, levelUI.y, levelUI.r * 2, levelUI.c * 2, 5));
    }
}

//	载入关卡
function initLevel(v) {
    currentLevel = v;
    currentGame  = levelData[v];

    stage.init(v);
    controller.clear();
    drawBg();
    drawGoal();
    delay(function () {
        controller.draw();
    });

    freshMap();
    currentTimer = setInterval(freshMap, conf.Fz);

    placeBtns();
}

function hideBtns() {
    for (var i = 0; i < 4; i++) $(btns[i]).hide();
}

function placeBtns() {
    for (var i = 0; i < 4; i++) $(btns[i]).show();
    $(btnLevelUI).show();

    btnStart.style.top  = canvas.offsetTop + canvas.offsetHeight - btnStart.offsetHeight - 10;
    btnStart.style.left = canvas.offsetLeft + canvas.offsetWidth - btnStart.offsetWidth - 180;

    btnLevelUI.style.top  = canvas.offsetTop + 10;
    btnLevelUI.style.left = canvas.offsetLeft + canvas.offsetWidth - btnLevelUI.offsetWidth - 10;

    btnRefresh.style.top  = canvas.offsetTop + canvas.offsetHeight - btnRefresh.offsetHeight - 10;
    btnRefresh.style.left = canvas.offsetLeft + canvas.offsetWidth - btnRefresh.offsetWidth - 300;

    btnSave.style.top = btnLoad.style.top = btnRefresh.offsetTop;
    btnSave.style.left = btnStart.offsetLeft + btnStart.offsetWidth + 10;
    btnLoad.style.left = btnSave.offsetLeft + btnSave.offsetWidth + 10;
}

window.addEventListener('resize', function () {
    placeBtns();
});