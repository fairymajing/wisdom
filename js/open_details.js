/**
 * Created by majing on 2017/11/8.
 */
var collectType;
var suOop=true;
$(document).ready(function() {
    $(".open-header").load("../../views/common/public.html #home-header");
    open.init();
})
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var open = new Vue({
    el: "#open",
    data: {message:[],recommend:[],chapterList:[],comment:[]},
    methods: {
        init: function () {
            var request_para = GetRequest();
            pids = request_para.pid;
            fids = request_para.fid;
            // console.log(fids)
            // console.log(CONFIG_INFO.token);
            // 公开课详情
            AJAX("get", "stu/ocourse/detail", {
                pid: pids
            }, function (o) {
                open.message = o.data;
                // console.log(o.data);
            }, function (o) {
                console.log(o.msg);
            });
            // 是否收藏
            AJAX("get", "user/collect/ocourse/whether", {
                oid: pids,
                token: CONFIG_INFO.token
            }, function (o) {
                // console.log("是否收藏");
                // console.log(o.code);
                // console.log(o.msg);
                if(o.code == 2000){
                    $(".collect-class").html("已收藏");
                    collectType=0;
                }else{
                    $(".collect-class").html("收藏");
                    collectType=1;
                }
            }, function (o) {
                console.log("是否收藏")
            });
            // 获取公开课章节列表
            AJAX("get", "stu/ocourse/sub", {
                id: pids,
                page: "",
                per_page: "",
            }, function (o) {
                open.chapterList = o.data.data;
                console.log(open.chapterList);
            }, function (o) {
                console.log(o.msg);
            });
            // 获取推荐公开课
            AJAX("get", "stu/ocourse/recommond", {
            }, function (o) {
                open.recommend = o.data;
                console.log(o.data);
            }, function (o) {
                console.log(o.msg);
            });
            // 获取章节评论
            AJAX("get", "stu/ocourse/sub/comment", {
                id: fids,
                page:"",
                per_page:"",
            }, function (o) {
                open.comment = o.data.comments;
                console.log(open.comment);
            }, function (o) {
                console.log(o.msg);
            });
        },reply : function(e){
            $(e.currentTarget).parent().next().show();
        },clearReply: function (e) {
            $(e.currentTarget).parent().parent().hide();
        }, collectClass:function () {
            // 收藏公开课
            AJAX("post", "user/collect/ocourse?token="+CONFIG_INFO.token, {
                action: collectType,
                oid: pids,
            }, function (o) {
                // console.log(o.code);
                // console.log(o.msg);
                // console.log(collectType);
                if(o.msg == "取消收藏成功"){
                    $(".collect-class").html("收藏");
                    collectType = 1;
                }else{
                    $(".collect-class").html("已收藏");
                    collectType = 0;
                }
            }, function (o) {
                console.log("收藏公开课")
            });
        },support :function () {
            // 顶
            if(suOop){
                AJAX("get", "stu/ocourse/sub/up", {
                    id: fids,
                }, function (o) {
                    // console.log(o.code);
                    // console.log(o.data);
                    // console.log(o.msg);
                    if(o.code == 4206){
                        alert("你已经顶过该章节");
                    }
                    suOop = false;
                }, function (o) {
                    console.log("顶")
                });
            }

        },oppose :function () {
            // 踩
            if(suOop){
                AJAX("get", "stu/ocourse/sub/down", {
                    id: fids,
                }, function (o) {
                    console.log(o.code);
                    console.log(o.data);
                    console.log(o.msg);
                    if(o.code == 4206){
                        alert("你已经顶过该章节");
                    }
                    suOop = false;
                }, function (o) {
                    console.log("踩")
                });
            }
        },showChapter: function (e) {
            $(".chapter").show();
            $(".comment").hide();
            console.log(e.currentTarget)
            $(e.currentTarget).addClass("open-tag-active").siblings().removeClass("open-tag-active");
        },showComment: function (e) {
            $(".chapter").hide();
            $(".comment").show();
            $(e.currentTarget).addClass("open-tag-active").siblings().removeClass("open-tag-active");
        }
    }
});