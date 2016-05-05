
<!--  main GAME  -->
<div id="game">
<!--    <p><a target='_blank' href="https://www.zybuluo.com/kzzhr/note/144269">帮助手册</a></p>-->
    <div id="msgbox">
        <a id="msgok" onclick="document.getElementById('msgbox').style.display = 'none'">OK</a>
        <div></div>
    </div>
    <div id='helptxt'>
        <p>游戏界面分为三部分：（目标状态）（当前状态）（操作区）<br>你的任务是通过修改右侧的指令来使得机械手把初始状态变换为目标状态</p>
        <h3>操作指南</h3>
        <p>在右侧</p>
    </div>
    <canvas id="canvas" width="900px" height="480px"></canvas>
    <div id="runs"></div>
    <div id="toolslc">
        选择指令
        <hr>
    </div>
    <div id="toolslcifs">条件指令
        <hr>
    </div>
    <div id="controlBar">
        <!--	<input id="" style='display:initial' name="" type="button" onClick="showhelp();" value="查看帮助 (Help)"> -->
        <input id="btn_goMission" name="" type="button" onClick="missionList.show();" value="关卡选择">
        <input id="btn_Refresh" name="" type="button" onClick="runs.restart()" value="重新开始">
        <input id="btn_start" name="" type="button" onClick="runs.start();" value="Go!">
        <input id="btn_save" name="" type="button" onClick="runs.store.save();" value="Save">
        <input id="btn_load" name="" type="button" onClick="runs.store.load();" value="Load">
    </div>

    <div style="position: fixed; right:0px; top: 0px; bottom: 0px;" class='zhide'>
        <span class="x-close-parent" style="float: right;width: 20px;height: 20px;text-align: center;background-color: #F00;color: #fff;cursor: pointer;">X</span>
    </div>

</div>

</body>
</html>
