function ActorClass() {
    
    var that = this;
    
    /*
     * 表示动画运行状态
     * -x : 暂停
     * 	0 : 停机
     *  1 : 运行
     *  2 : 多倍速度运行
     */
    var running = 0;
    
    
    var Fz = 25;
    var nowfz = Fz;
    
    this.anilist = [];
    
    
    /*
     * 向动画管理器内添加一个函数
     * 参数：
     * 		*fn	：	
     * 			动画主体，会依次执行；函数或字符串
     * 				- 函数体内不能出现setTimeout和setInterval,如有需要，请添加子actor
     * 		num	：	
     * 			动画执行次数；数字
     * 				- 默认为1
     * 				- -1表示无限次，不推荐（ 1<<30 )
     * 		die	:	
     * 			动画终止条件；字符串
     * 				会使用eval(str)来判断终止
     * 				
     */
    this.add = function(fn, num, die){
        
        //	添加另一个actor
        if ( ActorClass.prototype.isPrototypeOf(fn) ) {
            this.addActor(fn, num)
            return
        }
        
        //	不合法的终止条件
        if ( !(die==undefined || typeof(eval(die)) == 'boolean') ){
            console.error('die is not a boolean.')
            return
        }
        
        if ( num == -1 )
            num = 1<<30
    
        this.anilist.push({
            'fn'		: fn,
            'count'	: num || 1,
            'die'	: die
        })
    },
    
    /*
     * 添加另一个actor
     */
    this.addActor = function(act, num) {
        
        if ( !ActorClass.prototype.isPrototypeOf(act) ){
            console.error("actor is not a ActorClass")
            return
        }
        
        num = num || 1
        
        for (var i=0;i<num;i++) {
            for (var j=0;j<act.anilist.length;j++){
                this.anilist.push(act.anilist[j])
            }
        }
    }
    
    
    /*
     * 让actor启动监听
     * 只应该启动一次
     */
    var started = 0;
    this.start = function(){
        
        if ( started ) {
            alert("Actor Error: start in started.")
            this.stop()
        };

        console.log("Actor Starting...")
        started = 1;
        
        //	默认以正常速率启动
        running = 1;
        go()
        
    }
    
    /*
     * 停机，清空队列
     */
    this.stop = function(){
        running = 0;
        started = 0;
        this.anilist = [];
        console.log("Actor Stoped.")
    }
    
    /*
     * 当前函数执行完暂停动画
     */
    this.pause = function(){
        if (running > 0)
            running = -running;
    }
    
    /*
     * 继续暂停的动画
     */
    this.continue = function(){
        //	不在暂停状态
        if (running >= 0) {
            return 
        }
        running = -running;
        go();
    }
    
    /*
     * 动画调度体
     * 	- 可通过pause暂停，须经continue恢复
     * 	- 当队列为空时并不停止，有新动画加入时继续执行
     */
    function go(){
        //	被暂停 或 停机
        if ( running <= 0 ) {
            //console.log('stop'+1)
            return
        }
        nowfz = (Fz/running) || Fz;
        
        //	如果队列为空满足，忽视本次执行
        if (that.anilist.length == 0) {
            setTimeout(function(){go()}, nowfz)
            return
        }
        
        //	console.log(that.anilist[0])		
        
        //	如果终止条件满足，忽视本次执行，并删除此函数
        if ( eval(that.anilist[0].die)==true ){
            that.anilist.shift()
            setTimeout(function(){go()}, nowfz)
            return
        }
        //	执行函数
        var fn = that.anilist[0].fn;
        setTimeout(function(){
            doit(fn)

            //  次数够了，删除此函数
            if ( --that.anilist[0].count <= 0  ){
                that.anilist.shift()
            }

        },0)
        
        //	正常执行下一次
        setTimeout(function(){go()}, nowfz)
            
    }
    
    /*
     * 执行fn或eval(str)
     */
    function doit(fn){
        
        if ( typeof(fn) == 'function' ) 
            fn()
        else if ( typeof(fn) == 'string' ) 
            eval(fn)
        
    }
    
    
    var MaxSpeed = 4;
    var MinSpeed = 1;
    /*
     * 设置速度
     * 参数
     * 	1 : 正常速度 Fz
     *  2 : 两倍速度 Fz/2
     */
    this.speed = function(x) {
        if ( MinSpeed<=x && x<=MaxSpeed) {
            
            running = x; 
            
        }
        else if ( x== undefined ) 
            return running;
    }
    
    /*
     * 加速，最大为 MaxSpeed
     */
    this.speedUp = function(){
        if ( MinSpeed<=running && running<MaxSpeed ) 
            running += 1;
    }
    /*
     * 减速，最小为 MinSpeed
     */
    this.speedDown = function(){
        if ( MinSpeed<running && running<=MaxSpeed)
            running -= 1;
    }
}
//	DefaultActor
var actor = new ActorClass()