/**
 * Created by majing on 2017/10/26.
 */
$(document).ready(function() {
    $(".teacher-header").load("../../views/common/public.html #home-header");
    teacher.init();
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
var teacher = new Vue({
    el: "#teacher",
    data: {message:[]},
    methods: {
        init: function () {
            var request_para = GetRequest();
            teacherId = request_para.teacherId;
            AJAX("get", "stu/teacher/detail", {
                uid: teacherId
            }, function (o) {
                // console.log(o.code);
                // console.log(o.data);
                // console.log(o.msg);
                if(o.code == "2000"){
                    teacher.message = o.data
                }else{

                }
            }, function (o) {
                console.log(o.msg)
            });
            AJAX("get", "stu/teacher/ocourse/hot", {
                page:"",
                per_page:"",
                uid: teacherId
            }, function (o) {
                // console.log(o.code);
                // console.log(o.data);
                // console.log(o.msg);
                if(o.code == "2000"){
                    teacher.message = o.data.series;
                    // console.log(teacher.message)
                }else{

                }
            }, function (o) {
                console.log(o.msg)
            });
            AJAX("get", "user/collect/teacher/whether", {
                tea_id:teacherId,
                token:CONFIG_INFO.token,
            }, function (o) {
                // console.log(o.code);

                if(o.code == "4502"){
                    $(".teacher-follow-text").html("收藏该教师");
                    collectType = 1;
                }else{
                    $(".teacher-follow-text").html("已收藏");
                    collectType = 0;
                }
            }, function (o) {
                console.log(o.msg)
            });
        },collectTecher:function () {
            AJAX("post", "user/collect/teacher?token="+CONFIG_INFO.token, {
                action: collectType,
                tea_id: teacherId
            }, function (o) {
                // console.log(o.code);
                // console.log(o.data);
                // console.log(o.msg);
                if(o.msg == "收藏教师成功"){
                    $(".teacher-follow-text").html("已收藏");
                    collectType = 0;
                }else{
                    $(".teacher-follow-text").html("收藏该教师");
                    collectType = 1;
                }
            }, function (o) {
                console.log(o.msg)
            });
        },showAll:function () {

        },showTeacher:function () {

        },showClass:function () {

        }
    }
});