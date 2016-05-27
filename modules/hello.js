/*
 Class	欢迎界面

 */

function HelloUI() {
    this.draw = function () {
        canvas.style.cursor = 'catched';

        delay(function () {
            cxt.drawImage(resources.img.hello, 0, 0);
        });

        $(canvas).bind('click', function () {
            levelUI.show();
            $(this).unbind('click');
        });
    }
}