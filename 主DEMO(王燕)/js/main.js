var wxurl="http://www.isfish.org/p15/mengdian/c/html/weixin.html";
var _w, _h;
var share = new WxMoment.Share();
var wa;

var basePath = "../img/";
var loader = new WxMoment.Loader();
//声明资源文件列表
var fileList = ['loading_bg.jpg','load_wh.png','load_txt.png','call.png', 'page1_pic.jpg', 'wh1.jpg', 'wh2.jpg', 'wh3.jpg','wh4.jpg','wh5.jpg','wh6.jpg', 'ganrao.jpg', 'number.png', 'date.png', 'unlock.png', 'weixin_msg.png', 'unlock_bg.jpg', 'weixin_msg.png','user_headimg.jpg', 'icon_input.png', 'weichat.png', 'jianpan_text.png', 'keyboard.png', 'result_bg.jpg', 'rule.png', 'wh.mp3', 'SentMessage.mp3', 'call.mp3', 'wh_3s.mp3', 'zzs.mp3','weichat_msg.mp3','result_hb_bg.png','result_wh.png','result_title2.png','result_title.png','result_tips.png','download_btn.png','result_bg.png'];
for (var i = 0; i < fileList.length; i++) {
    loader.addImage(basePath + fileList[i]);
}

//进度监听
loader.addProgressListener(function (e) {
    var percent = Math.round((e.completedCount / e.totalCount) * 100);
    //console.log(percent)
    loadingAnimate(percent);
});
//加载完成
loader.addCompletionListener(function () {
    //可以在这里隐藏 Loading 页面开始进入主内容页面
    //onInit();
    //$(".loading").fadeOut();
    //page1Come();
});
loader.start();
var loadtimer;
function loadingAnimate(percent){
    if(percent<100){
        $(".lp_left_wrap").css({"-webkit-transform":"rotate(-"+percent+"deg)"});
        $("#loading_num_txt").text(Math.round(100/3.6));
    }else{
        var i=27;
        loadtimer = setInterval(function(){
            i++;
            //console.log(i);
            if(i>=100){
                clearInterval(loadtimer);
                $(".loading").fadeOut();
                page1Come();
                //weichat();
            }
            if(i>50){
                $(".lp_right_wrap").css({"-webkit-transform":"rotate(-"+(i-50)*3.6+"deg)"})
            }else{
                $(".lp_left_wrap").css({"-webkit-transform":"rotate(-"+i*3.6+"deg)"})
            }
            $("#loading_num_txt").text(i);
        },50);
    }
}

function onInit(){

}

$(document).ready(function(e) {
    _w = $(window).width();
    _h = $(window).height();

    //横屏提示
    new WxMoment.OrientationTip();

    //监测代码
    wa = new WxMoment.Analytics({
        projectName: "20151103mengdian"
    });


});
/*腾讯视频嵌入开始*/

//video = new tvp.VideoInfo();
//video.setVid("g0018a38dar");
//player = new tvp.Player();
//player.create({
//    width:"100%",
//    height:"100%",
//    video:video,
//    modId:"WxMomentVideo",
//    //controls:1,
//    playerid:"videoid",
//    autoplay:false,
//    //pic:"images/vedio_img.jpg",
//    isHtml5UseUI:true,
//    isHtml5ControlAlwaysShow:false,
//    html5LiveUIFeature: false,
//    isHtml5UseFakeFullScreen: false,
//    isiPhoneShowPlaysinline: true,
//    vodFlashExtVars: {
//        share: 0, follow: 0, showlogo: 0, clientbar: 0
//    },
//    plugins: {
//        AppBanner: 0,
//        AppRecommend: 0
//    }
//});
//player.onallended=function(){
//    console.log("onallended");
//}
//player.onplaying=function(vid){
//    console.log("onplaying");
//}
//
///*腾讯视频嵌入结束*/


$(".loading,.pages,.unlock_page,.result_page").bind("touchstart",function(){
    event.preventDefault();
})
var wxAudio=new Audio();
wxAudio.setAttribute('src','../img/weichat_msg.mp3');
wxAudio.loop = false;
wxAudio.volume=1;
wxAudio.pause();
$(function(){
    $(".page1_btn").bind("touchstart",function(){
        wa.sendEvent('click', 'agree01');
        page2Come();
    })
    console.log($(window).height())
    if($(window).height()<880){
        $("#result_mwrap").addClass("result_mwrap");
    }
    resizeInit();
})
$(window).resize(function(){
    resizeInit();
})
function resizeInit(){
    $(".unlock_info").height(($(document).height()));
}
//loaddemo();
/*var loadtimer;
 function loaddemo(){
 var i=0;
 loadtimer = setInterval(function(){
 i++;
 console.log(i);
 if(i>=100){
 clearInterval(loadtimer);
 }
 if(i>50){
 $(".lp_right_wrap").css({"-webkit-transform":"rotate(-"+(i-50)*3.6+"deg)"})
 }else{
 $(".lp_left_wrap").css({"-webkit-transform":"rotate(-"+i*3.6+"deg)"})
 }
 $("#loading_num_txt").text(i);
 },100);
 }*/
var myAudio=document.getElementById("call"),
    myAudio1=document.getElementById("whsay"),
    myAudio2=document.getElementById("zzs");
function page1Come(){
    $("#page1").show();
    callbtn.initPlay();
    myAudio.play();
}
function page2Come(){
    myAudio.pause();
    $("#page1").hide();
    $("#page2").show();
    whsay.initPlay();
}
loadTextAnimate();
function loadTextAnimate(){
    var li=0;
    setInterval(function(){
        //console.log(li);
        var lobj = $(".loading_text span:eq("+li+")");
        lobj.removeClass("loading_text_animate");
        setTimeout(function(){
            lobj.addClass("loading_text_animate");
        },10)
        li++;
        if(li>10){
            li=0;
        }
    },100);
}
var CALLBTN = function(img){
    this.height = 150;
    this.width = 150;
    this.index = 0;
    this.total = 20;
    this.next = 10;
    this.totalindex = 0;
    this.interval;
    this.img = img;
    this.line = 1;
    this.timer = 20;
}
CALLBTN.prototype = {
    initPlay: function(){
        var _self = this;
        clearInterval(this.interval);
        this.interval = setInterval(function(){
            _self.index ++;
            _self.totalindex ++;
            var positionY = 0;
            if(_self.totalindex==_self.next){
                _self.index=0;
            }
            if(_self.totalindex>=_self.next){
                positionY = -_self.height;
            }
            if(_self.totalindex>=_self.total){
                _self.totalindex=0;
                positionY = 0;
                _self.index=0;
            }
            var positionX = -_self.index * _self.width;
            /*			console.log(_self.totalindex+"|"+_self.index+"|"+positionX+"|"+positionY);
             */			_self.img.css({'background-position':positionX+'px ' + positionY + 'px'});

        }, _self.timer);
    },
    stopPlay: function(){
        clearInterval(this.interval);
    }
}
var callbtn = new CALLBTN($('.page1_btn'));


var WH1 = function(obj){
    this.height = 1080;
    this.width = 640;
    this.index = 0;
    this.total = 8;
    this.next = 4;
    this.totalindex = 0;
    this.interval;
    this.obj = obj;
    this.line = 1;
    this.timer = 50;
    this.pictotal=41;
    this.pic=1;
    this.picnum=1;
}
WH1.prototype = {
    initPlay: function(){
        myAudio1.play();
        var _self = this;
        clearInterval(this.interval);
        this.interval = setInterval(function(){
            _self.index ++;
            _self.pic ++;
            _self.totalindex ++;
            var positionY = 0;
            if(_self.totalindex==_self.next*_self.line){
                _self.index=0;
                _self.line++;
            }
            if(_self.totalindex>=_self.total-1){
                _self.index=0;
                _self.line=1;
                _self.totalindex=0;
                positionY = 0;
                _self.picnum++;
                _self.obj.css({'background':'url(../img/wh'+_self.picnum+'.jpg) no-repeat','background-size': '2560px auto'});
            }
            positionY = -1*(_self.height*(_self.line-1));
            if(_self.pic>=_self.pictotal-4){
                _self.stopPlay();
                gr.initPlay();
                _self.obj.hide();
                myAudio1.pause();
            }
            var positionX = -_self.index * _self.width;
            /*console.log(_self.totalindex+"|"+_self.index+"|"+positionX+"|"+positionY);*/
            _self.obj.css({'background-position':positionX+'px ' + positionY + 'px'});
        }, _self.timer);
    },
    stopPlay: function(){
        clearInterval(this.interval);
    }
}
var whsay = new WH1($('.page2_video'));

var Ganrao = function(obj){
    this.height = 1082;
    this.width = 640;
    this.index = 0;
    this.total = 5;
    this.totalindex = 0;
    this.totalnum = 30;
    this.interval;
    this.obj = obj;
    this.timer = 100;
}
Ganrao.prototype = {
    initPlay: function(){
        myAudio2.play();
        var _self = this;
        _self.obj.show();
        clearInterval(this.interval);
        this.interval = setInterval(function(){
            var positionY = 0;
            var positionX = -_self.index * _self.width;
            _self.obj.css({'background-position':positionX+'px ' + positionY + 'px'});
            _self.index ++;
            _self.totalindex ++;
            if(_self.index>=_self.total){
                positionX = 0;
                _self.index=0;
            }
            if(_self.totalindex>=_self.totalnum-1){
                _self.stopPlay();
                myAudio2.pause();
                callUnlockPage();
            }
        }, _self.timer);
    },
    stopPlay: function(){
        clearInterval(this.interval);
    }
}
var gr = new Ganrao($('.page2_ganrao'));

function callUnlockPage(){
    $("#page2,#page1").hide();
    $(".unlock_page").show();
    resizeInit();
    setTimeout(function(){
        $(".weixin_wrap,.weixin_msg").show();
        wxAudio.play();
        var unlocko=$(".unlock_tips_wrap");
        unlocko.bind("touchstart",function(){
            event.preventDefault();
            var touch1 = event.touches[0];
            startX = touch1.pageX;
        });
        unlocko.bind("touchmove",function(){
            event.preventDefault();
            var touch1 = event.touches[0];
            moveX = touch1.pageX;
            var mx = moveX-startX;
            uiobj.css({"left":mx+"px"});
        });
        unlocko.bind("touchend",function(){
            event.preventDefault();
            var mx = moveX-startX;
            if(mx>330){
                wa.sendEvent('Sliding', 'agree04-2');
                weichatPage();
            }else{
                uiobj.animate({"left":"0"},200);
            }
        });
    },300);

    var myDate = new Date();
    ut.initPlay();
    var t1=formatNum(myDate.getHours(),0),
        t2=formatNum(myDate.getHours(),1),
        t3=formatNum(myDate.getMinutes(),0),
        t4=formatNum(myDate.getMinutes(),1);
    $(".unlock_time span:eq(0)").css({"background-position":+(-1*t1*72)+"px 0" });
    $(".unlock_time span:eq(1)").css({"background-position":+(-1*t2*72)+"px 0" });
    $(".unlock_time span:eq(2)").css({"background-position":+(-1*t3*72)+"px 0" });
    $(".unlock_time span:eq(3)").css({"background-position":+(-1*t4*72)+"px 0" });
    var m1=formatNum((myDate.getMonth()+1),0),
        m2=formatNum((myDate.getMonth()+1),1),
        d1=formatNum(myDate.getDate(),0),
        d2=formatNum(myDate.getDate(),1);
    $(".unlock_date span:eq(0)").css({"background-position":+(-1*m1*80)+"px"});
    $(".unlock_date span:eq(1)").css({"background-position":+(-1*m2*80)+"px"});
    $(".unlock_date span:eq(3)").css({"background-position":+(-1*d1*80)+"px"});
    $(".unlock_date span:eq(4)").css({"background-position":+(-1*d2*80)+"px"});
    $(".unlock_date span:eq(6)").css({"background-position":+(-1*((weeks()-1)*80+960))+"px"});
    /*var dateinfo=formatNum2(myDate.getMonth())+'月'+formatNum2(myDate.getDate())+'日 &nbsp; 星期'+ weeks();
     $(".unlock_date").html(dateinfo);*/
}

function weeks(){
    var myDate = new Date();
    var wv = myDate.getDay();
    if(wv==0){
        wv=7;
    }
    return wv;
    /*switch(wv){
     case 1:return "一";break;
     case 2:return "二";break;
     case 3:return "三";break;
     case 4:return "四";break;
     case 5:return "五";break;
     case 6:return "六";break;
     case 0:return "日";break;
     }*/
}
function formatNum(val,p){
    var value=0;
    var val=val.toString();
    if(val<0){
        value=0;
    }else if(val<10){
        if(p==0){
            value=0;
        }else{
            value=val;
        }
    }else{
        if(p==0){
            value=val.substr(0,1);
        }else{
            value=val.substr(1,1);
        }
    }
    return value;
}
function formatNum2(num){
    if(num<10){
        num="0"+num;
    }
    return num;
}

var unlockTips = function(obj){
    this.height = 39;
    this.width = 275;
    this.index = 0;
    this.total = 20;
    this.interval;
    this.obj = obj;
    this.timer = 70;
}
unlockTips.prototype = {
    initPlay: function(){
        var _self = this;
        clearInterval(_self.interval);
        _self.interval = setInterval(function(){
            var positionX = 0;
            var positionY = -_self.index * _self.height;
            _self.obj.css({'background-position':positionX+'px ' + positionY + 'px'});
            _self.index ++;
            if(_self.index>=_self.total){
                _self.index = 0;
            }
        }, _self.timer);
    },
    stopPlay: function(){
        clearInterval(this.interval);
    }
}
var ut=new unlockTips($(".unlock_tips"));
var startX,moveX,endX;
var vmobj = $(".weixin_msg"),uiobj=$(".unlock_info");
var vol=60;
$(".weixin_msg").bind("touchstart",function(){
    event.preventDefault();
    var touch1 = event.touches[0];
    startX = touch1.pageX;
});
$(".weixin_msg").bind("touchmove",function(){
    event.preventDefault();
    var touch1 = event.touches[0];
    moveX = touch1.pageX;
    var mx = moveX-startX+60;
    vmobj.css({"left":mx+"px"});
    //vmobj.css({"-webkit-transform":"translateX("+mx+"px)"});

});
$(".weixin_msg").bind("touchend",function(){
    event.preventDefault();
    var mx = moveX-startX;
    if(mx>330){
        wa.sendEvent('Sliding', 'agree04-1');
        weichatPage();
    }else{
        vmobj.animate({"left":"60px"},200);
    }
});


function weichatPage(){
    $(".weichat").show();
    $(".unlock_info").addClass("page_unlock");
    setTimeout(function(){
        $(".unlock_page").hide();
        weichat();
    },100);
}



var Loadwh = function(obj){
    this.height = 248;
    this.width = 200;
    this.index = 0;
    this.total = 8;
    this.interval;
    this.obj = obj;
    this.timer = 100;
}
Loadwh.prototype = {
    initPlay: function(){
        var _self = this;
        _self.obj.show();
        clearInterval(this.interval);
        this.interval = setInterval(function(){
            var positionY = 0;
            var positionX = -_self.index * _self.width;
            _self.obj.css({'background-position':positionX+'px ' + positionY + 'px'});
            //console.log(_self.index+"|"+positionX+"|"+positionY);
            _self.index ++;
            if(_self.index==_self.total-1){
                _self.index=0;
            }
        }, _self.timer);
    },
    stopPlay: function(){
        clearInterval(this.interval);
    }
}
var loadicon = new Loadwh($('.loading_icon'));
loadicon.initPlay();





//weichat

var wxWh=new Audio();
wxWh.setAttribute('src','../img/wh.mp3');
wxWh.loop = false;
wxWh.volume=1;
wxWh.pause();
var wxNew=new Audio();
wxNew.setAttribute('src','../img/SentMessage.mp3');
wxNew.loop = false;
wxNew.volume=1;
wxNew.pause();

var ustep=1;
var keyboards=false;
function weichat(){
    setTimeout(function(){
        $(this).hide();
        $(".wx_keyboard").addClass("wx_keyboard_show");
        setTimeout(function(){
            $("#kb_text_1").show().addClass("kb_text_1_show");
            setTimeout(function(){
                $(".btn_send").show();
                /*$(".btn_send_disabled").hide();*/
            },1500)
        },600)
    },6500)
    $(".wx_input_bar").addClass("wx_input_bar_show");
    $(".wx_box").height($(document).height()-$(".wx_keyboard").height());
    $(".video_page").height($(document).height());
    $(".weichat").show();
    $(".wx_input_bar").bind("touchstart",function(){

    });
    $(".btn_send").bind("touchstart",function(){
        $(this).hide();
        /*$(".btn_send_disabled").show();*/
        if(ustep==1){
            $(".user_msg_1").addClass("user_msg_show");
            wa.sendEvent('click', 'agree05');
            wxNew.play();
            $("#kb_text_1").hide();
            ustep++;
            callBottom();
            wxmsgShow(".wh_msg_4",2000);
            wxmsgShow(".wh_msg_5",4000);
            setTimeout(function(){
                $("#kb_text_2").show().addClass("kb_text_2_show");
                setTimeout(function(){
                    $(".btn_send").show();
                    /*$(".btn_send_disabled").hide();*/
                },2500);
            },9000);
        }else{
            $(".user_msg_2").addClass("user_msg_show");
            wa.sendEvent('click', 'agree06-2');
            wxNew.play();
            $("#kb_text_2").hide();
            callBottom();
            wxmsgShow(".wh_msg_6",1000);
        }
    })
    $("#wh_msg_item_6").bind("touchstart",function(){
        wxWh.play();
        player.pause();
        $(this).addClass("wh_msg_item_6_play");
    })
    $(".rule_btn").bind("touchstart",function(){
        $(".rule_page").fadeIn();
    })
    $(".rule_close_btn").bind("touchstart",function(){
        $(".rule_page").fadeOut();
    })
    $(".wh_msg_item_5").bind("touchstart",function(){
        $(".video_con").show();
        $(".wh_msg_item_5").hide();
        wa.sendEvent('click', 'agree06-1');
        player.play();
    })
    $(".video_con").bind("touchstart",function(){
        //player.pause();
    })
    setTimeout(function(){
        weixinShow();
    },1500);


}
function callBottom(){
    var h = $(".wx_msg").height()-$(".wx_box").height()+400;
    console.log(h);
    $(".wx_box").scrollTop(h);
}
function weixinShow(){
    wxmsgShow(".wh_msg_1",0);
    wxmsgShow(".wh_msg_2",2000);
    wxmsgShow(".wh_msg_3",4000);
}
function wxmsgShow(o,t,speed){
    speed=(speed==""||speed==undefined)?0:speed;
    $(o).hide();
    setTimeout(function(){
        $(o).fadeIn(speed);
        callBottom();
        wxNew.play();
    },t);
}




function resultAnimate(){
    $(".weichat").hide();
    $("#cube").show();
    window.setTimeout(function(){
        cube.init();
    },200)


}

var $cube = $('#cube');
var $cubeBox = $('#cubeBox');
var $cubeShare = $('#cubeShare');
var $cubeShareMark = $('#cubeShareMark');

var $details = $('#details');
var $detailsList = $('#detailsList');
var $detailsReturn = $('#detailsReturn');

var cube = (function(){
    var $li = $cubeBox.find('li');
    var downX = 0;
    var downY = 0;
    var startX = -45;
    var startY = 45;
    var step = 1/2;
    var x = 0;
    var y = 0;
    var bBtn = true;

    function init(){
        $cubeBox.css('transform','scale(0.7) rotateX('+startX+'deg) rotateY('+startY+'deg)');
        $cubeBox.css('transition','1s');
        $cubeBox.on('transitionEnd webkitTransitionEnd',function(){
            $cubeBox.css('transition','');
        });
        bind();
    }
    function bind(){

        $(document).on('touchstart',function(ev){
            var touch = ev.originalEvent.changedTouches[0];
            downX = touch.pageX;
            downY = touch.pageY;
            bBtn = true;
            $(document).on('touchmove.move',function(ev){
                bBtn = false;
                var touch = ev.originalEvent.changedTouches[0];

                x = (downY - touch.pageY)*step;
                y = (touch.pageX - downX)*step;

                if( startX+x > 70 ){
                    x = -startX + 70;
                }
                else if( startX+x < -70 ){
                    x = -startX - 70;
                }

                $cubeBox.css('transform','scale(0.7) rotateX('+(startX+x)+'deg) rotateY('+(startY+y)+'deg)');

            });
            $(document).on('touchend.move',function(){
                $(document).off('.move');
            });
        });

        $li.on('touchend',function(){
            if(bBtn){  //点击
                $cube.hide();
                $details.show();
                details.init( $(this).index() );
            }
            else{  //拖拽
                startX += x;
                startY += y;
            }
        });


        $cubeShareMark.on('touchstart',function(){
            $(this).hide();
        });
    }
    return {
        init : init
    };
})();


var details = (function(index){
    var $detailsImg = $detailsList.find('.detailsImg');

    function init(index){
        bind(index);
        bindCanvas(index);
        $detailsReturn.on('touchstart',function(){
            $cube.show();
            $details.hide();
		});
    }
    function bind(index){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            initialSlide:index,
            effect:"coverflow",
            pagination: '.swiper-pagination',
            onSlideChangeStart:function(swiper){
                var curIn = swiper.activeIndex;
                bindCanvas(curIn);
            }
        })
    }

    function bindCanvas(index){
        [].forEach.call($detailsImg,function(item){
            var img = item.getElementsByTagName("img")[0];
            img.style.opacity = 0;
        })

        var $img = $detailsImg.eq(index).find('img');
        var oC = $detailsImg.eq(index).find('canvas').get(0);
        var oGC = oC.getContext('2d');
        var objImg = new Image();
        objImg.src = $img.attr('src');
        $img.css('opacity',0);
        objImg.onload = function(){
            oGC.drawImage(objImg,0,0);
            var dataImg = oGC.getImageData(0,0,oC.width,oC.height);
            oGC.clearRect(0,0,oC.width,oC.height);
            var step = 8;
            var arr = [];

            var stepW = parseInt(dataImg.width/step);
            var stepH = parseInt(dataImg.height/step);

            for(var i=0;i<stepH;i++){
                for(var j=0;j<stepW;j++){
                    var color = getColor(dataImg,j*step,i*step);
                    if(color != 0){
                        arr.push({x : j*step , y : i*step , bx : Math.random()*oC.width , by : Math.random()*oC.height});
                    }
                }
            }

            for(var i=0;i<arr.length;i++){
                oGC.beginPath();
                oGC.arc(arr[i].bx,arr[i].by,1,0,360*Math.PI/180);
                oGC.closePath();
                oGC.fill();
            }

            setTimeout(function(){
                move(arr);
            },1000);

        };

        function getColor(dataImg,x,y){
            var w = dataImg.width;
            var h = dataImg.height;
            var d = dataImg.data;
            return d[(y*w+x)*4+3];
        }
        function move(arr){
            var d = 500;
            var startTime = now();
            var timer = setInterval(function(){
                var changeTime = now();
                oGC.clearRect(0,0,oC.width,oC.height);
                var t = Math.min(changeTime - startTime,d);

                for(var i=0;i<arr.length;i++){
                    var nowX = (arr[i].x - arr[i].bx)*t/d + arr[i].bx;
                    var nowY = (arr[i].y - arr[i].by)*t/d + arr[i].by;

                    oGC.beginPath();
                    oGC.arc(nowX,nowY,1,0,360*Math.PI/180);
                    oGC.closePath();
                    oGC.fill();

                }

                if(t == d){
                    clearInterval(timer);
                    setTimeout(function(){
                        oGC.clearRect(0,0,oC.width,oC.height);
                        $img.animate({opacity:1},1000);
                    },500);
                }

            },15);
        }
        function now(){
            return (new Date()).getTime();
        }
    }
    return {
        init : init
    };
})();





//淡入
function objfadeInSlow(o,t,speed){
    speed=(speed==""||speed==undefined)?500:speed;
    $(o).hide();
    setTimeout(function(){
        $(o).fadeIn(speed);
    },t);
}

wxWh.addEventListener('ended', function () {
    $("#wh_msg_item_6").attr("class","wh_msg_item_6p");
    resultAnimate();
}, false);