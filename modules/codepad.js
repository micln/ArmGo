var codepad = new function () {
    var that = this;

    var dom = $id('codepad');

    var editor = CodeMirror.fromTextArea(dom, {
        lineNumbers: true,
        mode: "text/x-c++src",
        theme: "monokai"
    });
    editor.setSize('100%', '480px');

    this.editor = editor;


    this.showCode = function (code) {
        this.editor.setValue(code);
        $(dom).parent().show();
    };

    

    (function init() {
    })();
}