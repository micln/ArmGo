$.fn.left = function () {
    var now = this[0];
    var sum = 0;
    while (now !== document.body) {
        sum += now.offsetLeft;
        now = now.parentNode;
    }
    return sum;
};

$.fn.top = function () {
    var now = this[0];
    var sum = 0;
    while (now !== document.body) {
        sum += now.offsetTop;
        now = now.parentNode;
    }
    return sum;
};