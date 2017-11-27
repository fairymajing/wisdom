/**
 * Created by majing on 2017/10/26.
 */
var urlKey;
$(document).ready(function() {
    $(".search-header").load("../../views/common/public.html #home-header");
    $(".search-tag li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
    search.init();
})
function changeTag() {
    console.log($(this));
    $(this).addClass("active").siblings().removeClass("active");
}
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
var search = new Vue({
    el: "#search",
    data: {isA:true,isB:false,isC:false,words:"",teacherList:[],ocourseList:[]},
    methods: {
        init: function () {
            var request_para = GetRequest();
            keyWord = request_para.word;
            urlKey = decodeURI(keyWord);
            console.log(urlKey);
            AJAX("get", "stu/ocourse/search", {
                word: urlKey
            }, function (o) {
                console.log(urlKey);
                console.log(o.code);
                console.log(o.data);
                console.log(o.msg);
                if(o.code == "2000"){
                    search.teacherList=o.data.teachers;
                    search.ocourseList=o.data.ocourses;
                }else{

                }
            }, function (o) {
                console.log(o.msg)
            });
        },searchBtn:function () {
            AJAX("get", "stu/ocourse/search", {
                word: search.words
            }, function (o) {
                console.log(o.code);
                console.log(o.data);
                console.log(o.msg);
                if(o.code == "2000"){
                    search.teacherList=o.data.teachers;
                    search.ocourseList=o.data.ocourses;
                    console.log(search.teacherList.length);
                    console.log(search.ocourseList.length);
                }else{

                }
            }, function (o) {
                console.log(o.msg)
            });
        },showAll:function () {
            $(".home-class").show();
            $(".search-teacher").show()
        },showTeacher:function () {
            $(".home-class").hide();
            $(".search-teacher").show()
        },showClass:function () {
            $(".home-class").show();
            $(".search-teacher").hide()
        }
    }
});