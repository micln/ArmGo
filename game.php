
<!--  main GAME  -->
<div id="game">
    <div id="msgbox">
        <a id="msgok" onclick="document.getElementById('msgbox').style.display = 'none'">OK</a>
        <div></div>
    </div>
    <canvas id="canvas" width="900px" height="480px"></canvas>
    <div id="controller"></div>
    <div id="toolslc">
        选择指令
        <hr>
    </div>
    <div id="toolslcifs">条件指令
        <hr>
    </div>
    <div id="controlBar">
        <button id="btn_goMission" class='btn btn-default' onClick="levelUI.show();">关卡选择</button>
        <button id="btn_Refresh" class='btn btn-default' onClick="controller.restart()">重新开始</button>
        <button id="btn_start" class='btn btn-danger btn-lg' onClick="controller.start();">Go!</button>
        <button id="btn_save" class='btn btn-default' onClick="controller.store.save();">Save</button>
        <button id="btn_load" class='btn btn-default' onClick="controller.store.load();">Load</button>
    </div>

    <div style="position: fixed; right:0px; top: 0px; bottom: 0px;" class='zhide'>
        <span class="x-close-parent" style="float: right;width: 20px;height: 20px;text-align: center;background-color: #F00;color: #fff;cursor: pointer;">X</span>
    </div>

</div>

</body>
</html>
