/**
 * Created by Administrator on 2017/10/27.
 */
$(document).ready(function() {
    $(".grade-header").load("../../views/common/public.html #home-header",function () {
        var navExit = new Vue({
            el: "#home-header",
            data: {},
            methods: {
                init: function () {

                }, exit: function () {
                    AJAX("post", "auth/logout?token=" + CONFIG_INFO.token, {
                        // token: CONFIG_INFO.token
                    }, function (o) {
                        console.log(o.data);
                        console.log(o.code);
                        if (o.code == 2000) {
                            localStorage.removeItem("userInfo"), localStorage.removeItem("userSign");
                            window.location.href = "../../views/home/home.html";
                        }
                    }, function (o) {
                        console.log(o.msg)
                    });
                }
            }
        });
        getUser();
    });
    grade.init();
})
function requestAjaxGrade() {
    AJAX("get", "stu/class/detail?token="+CONFIG_INFO.token, {
        id: grade.gradeId,
    }, function (o) {
        if(o.code==2000){
            grade.gradeMessage = o.data;
        }else{
            // console.log(o.data.series);
        }
    }, function (o) {
        console.log("获取班级详细信息")
    });
    AJAX("get", "stu/class/join/status", {
        // 获取班级加入状态
        id:grade.gradeId,
        token:CONFIG_INFO.token
    }, function (o) {
        grade.gradeStatus = o.code;
        console.log(grade.gradeStatus);
    }, function (o) {
        console.log("获取班级加入状态");
    });
}
var grade = new Vue({
    el: "#grade",
    data: {grades:"",gradeId:"",gradeMessage:"",gradeStatus:""},
    methods: {
        init: function () {
            // 获取我的班级
            AJAX("get", "stu/class/mine", {
                token:CONFIG_INFO.token
            }, function (o) {
                // console.log(o.data);
                // console.log(o.code);
                if(o.code ==2000){
                    grade.grades = o.data.classes;
                    grade.gradeMessage = o.data.classes[0];
                    // console.log(grade.gradeMessage.id);
                    $(".my-already").show();
                    $(".my-none").hide();
                    AJAX("get", "stu/class/join/status", {
                        // 获取班级加入状态
                        id:grade.gradeMessage.id,
                        token:CONFIG_INFO.token
                    }, function (o) {
                        // console.log(o.data);
                        // console.log(o.code);
                        // console.log(o.msg);
                        grade.gradeStatus = o.code;
                        // console.log(grade.gradeStatus);
                    }, function (o) {
                        console.log("获取班级加入状态");
                    });
                    AJAX("get", "stu/task/mine", {
                        // 获取班级全部任务
                        cid:grade.gradeMessage.id,
                        page:"",
                        per_page:"",
                        platform:ios,
                        token:CONFIG_INFO.token,
                    }, function (o) {
                        console.log(o.data);
                        console.log(o.code);
                        console.log(o.msg);

                    }, function (o) {
                        console.log("获取班级全部任务");
                    });
                } else{
                    $(".my-already").hide();
                    $(".my-none").show();
                }
            }, function (o) {
                console.log("获取我的班级");
            });
        },mySort : function(index){
            $("#mySort").html(grade.grades[index].title);
            grade.gradeId = grade.grades[index].id;
            console.log(grade.gradeId);
            requestAjaxGrade();
        }
    }
});