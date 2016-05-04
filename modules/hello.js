/*
 Class	欢迎界面

 */

function HELLO() {
    this.draw = function () {
        canvas.style.cursor = 'hand';

        setTimeout(function () {
            cxt.drawImage(res.img.hello, 0, 0);
        }, 0);

        $(canvas).bind('click', function () {
            missionList.show();
            $(this).unbind('click');
        });
    }
}