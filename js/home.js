/**
 * Created by majing on 2017/10/26.
 */
var sortKind;
var sortName;
$(document).ready(function() {
    $(".home-header").load("../../views/common/public.html #home-header",function () {
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
    home.init();
})

window.onload=function () {

}
function requestAjax() {
    AJAX("get", "stu/ocourse", {
        area_id:home.areaId,
        grade_id:home.gradeId,
        order:home.order,
        page:home.page,
        per_page:home.perPage,
        sort:home.sort,
        subject_id:home.subjectId,
    }, function (o) {
        // console.log(o.code);
        // console.log(o.data);
        // console.log(o.msg);
        if(o.code==2000){
            home.ocoursePage = o.data;
            home.ocourseList = o.data.series;
            $("#noneList").css({"display":"none"});
            // console.log(o.data.series);
        }else if(o.code==2001){
            home.ocoursePage = o.data;
            home.ocourseList = o.data.series;
            $("#noneList").css({"display":"block"});
        }

    }, function (o) {
        console.log(o.msg)
    });
}
var home = new Vue({
    el: "#home",
    data: {search:"",areas:[],subjects:[],ocoursePage:"",ocourseList:[], areaId:"", gradeId:"", order:"", page:"", perPage:"", sort:"", subjectId:""},
    methods: {
        init: function () {
            AJAX("get", "areas", {
            }, function (o) {
                home.areas=o.data;
            }, function (o) {
                console.log(o.msg)
            });
            AJAX("get", "grades", {
            }, function (o) {
                // console.log(o.code);
                // console.log(o.data);
                // console.log(o.msg);
            }, function (o) {
                console.log(o.msg);
            });
            AJAX("get", "subjects", {
            }, function (o) {
                home.subjects=o.data;
            }, function (o) {
                console.log(o.msg)
            });
            AJAX("get", "stu/ocourse", {
                area_id:home.areaId,
                grade_id:home.gradeId,
                order:home.order,
                page:home.page,
                per_page:home.perPage,
                sort:home.sort,
                subject_id:home.subjectId,
            }, function (o) {
                // console.log(o.code);
                // console.log(o.data);
                // console.log(o.msg);
                home.ocoursePage = o.data;
                home.ocourseList = o.data.series;
            }, function (o) {
                console.log(o.msg)
            });
        },searchBtn:function () {
            AJAX("get", "stu/ocourse/search", {
                word: home.search
            }, function (o) {
            }, function (o) {
                console.log(o.msg);
            });
        },selectArea:function (index) {
            $("#nowPosition").html(home.areas[index].name);
            home.areaId=home.areas[index].id;
            requestAjax();
        },selectClass:function (index) {
            $("#nowClass").html(home.subjects[index].name);
            home.subjectId=home.subjects[index].id;
            // console.log(home.subjectId);
            requestAjax();
        },selectAll:function () {
            $("#nowClass").html("全部");
            home.subjectId="";
            requestAjax();
        },homeSort:function (e) {
            sortKind = $(e.currentTarget).attr("kind");
            sortName = $(e.currentTarget).html();
            $("#homeSort").html(sortName);
            home.sort=sortKind;
            requestAjax();
        }
    }
});
