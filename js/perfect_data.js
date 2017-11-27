/**
 * Created by majing on 2017/10/25.
 */
var startTime;
var lastTime ;
$(document).ready(function() {
    $(".perfect-header").load("../../views/common/public.html #perfect-header");
    perfect.init();
})
var perfect = new Vue({
    el: "#perfect",
    data: {school:"",schoolList:[],gradeList:[]},
    methods: {
        init: function () {
            // $(".perfect-grade-tag").click(function () {
            //     $(this).addClass("perfect-grade-active").siblings().removeClass("perfect-grade-active");
            // })
        },changeMan : function(){
                $(".perfect-radio").css({"background":"url(../../img/radio.png) no-repeat 0px 15px"});
                $(".perfect-radio-no").css({"background":"url(../../img/radio_no.png) no-repeat 0px 15px"});
        },changeWoman : function(){
            $(".perfect-radio").css({"background":"url(../../img/radio_no.png) no-repeat 0px 15px"});
            $(".perfect-radio-no").css({"background":"url(../../img/radio.png) no-repeat 0px 15px"});
        },perfect_school:function () {
            $(".perfect-form-fill").hide();
            $(".perfect-form-school").show();
        },searchSchools:function () {
            AJAX("get", "organizes", {
                name: perfect.school
            }, function (o) {
                console.log(o.data);

                if(o.code==2000){
                    perfect.schoolList=o.data;
                    // console.log(perfect.schoolList.length)
                }else if(o.code==2001){
                    // console.log(perfect.schoolList.length)
                }
            }, function (o) {
                console.log(o.msg);
            });
        },selectSchool:function (index) {
            perfect.school=perfect.schoolList[index].name;
            $(".perfect-sarch").children().remove();
        },completeSchool:function(){
            $("#perfect_school").val(perfect.school);
            $(".perfect-form-fill").show();
            $(".perfect-form-school").hide();
        },perfect_grade:function () {
            $(".perfect-form-fill").hide();
            $(".perfect-form-grade").show();
            AJAX("get", "grades", {
            }, function (o) {
                // console.log(o.code);
                // console.log(o.data);
                // console.log(o.msg);
                if(o.code==2000){
                    perfect.gradeList=o.data;
                }else if(o.code==2001){

                }
            }, function (o) {
                console.log(o.msg);
            });
        },closeSchool:function () {
            $(".perfect-form-fill").show();
            $(".perfect-form-school").hide();
        },selectGrade:function (index) {
            $(".perfect-grade-tag").removeClass("perfect-grade-active");
            $(".perfect-grade-tag").eq(index).addClass("perfect-grade-active");
        },closeGrade:function () {
            $(".perfect-form-fill").show();
            $(".perfect-form-grade").hide();
        },completeGrade:function(){
            $(".perfect-form-fill").show();
            $(".perfect-form-grade").hide();
            $("#perfect_grade").val($(".perfect-grade-active").html());
        },submitForm:function () {

        }
    }
});