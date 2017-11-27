/**
 * Created by majing on 2017/10/30.
 */
(function($){
    var bvd = function(dom) {
        var that = this;
        $.ready(function(){

            //获取视频元素
            that.video = document.querySelector(dom || 'video');

            //获取视频父元素
            that.vRoom = that.video.parentNode;

            //元素初始化
            that.initEm();

            //事件初始化
            that.initEvent();
        })
    }
    var pro = bvd.prototype;
    pro.initEm = function(){

        //先添加播放按钮
        this.vimg = document.createElement("img");
        this.vimg.src = '../../img/video_play.png';
        this.vimg.className = 'grade-video-play';
        this.vRoom.appendChild(this.vimg);

        //添加控制条
        this.vC = document.createElement("div");
        this.vC.classList.add('controls');
        this.vC.innerHTML = '<div><div class="progressBar"><div class="timeBar"></div></div></div><div><span class="current">00:00</span>/<span class="duration">00:00</span></div><div><span class="fill">全屏</span></div>';
        this.vRoom.appendChild(this.vC);
    }

    pro.initEvent = function(){
        var that = this;

        //给播放按钮图片添加事件
        this.vimg.addEventListener('tap',function(){
            this.style.display = 'none';
            that.video.play();
        })

        //获取到元数据
        this.video.addEventListener('loadedmetadata',function(){
            that.vC.querySelector('.duration').innerHTML = stom(this.duration);
        });
    }


    function stom(t) {
        var m = Math.floor(t / 60);
        m < 10 && (m = '0' + m);
        return m + ":" + (t % 60 / 100).toFixed(2).slice(-2);
    }

    var nv = null;
    $.bvd = function(dom) {
        return nv || (nv = new bvd(dom));
    }
}(mui))
