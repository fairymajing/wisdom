/**
 * Created by Administrator on 2017/10/30.
 */
$(document).ready(function() {
    $(".question-header").load("../../views/common/public.html #questions-header");
    $(".cloze-answer").click(function () {
        $(this).css({"border":"1px solid orange","background":"url(../../img/question_radio.png) no-repeat 24px 18px"}).parent().siblings().find(".cloze-answer").css({"border":"0px solid orange","background":"url(../../img/question_radio_no.png) no-repeat 24px 18px"})
    })
    $(".multiselect-answers").click(function () {
        if($(this).parent().hasClass("multiselect-answer-on")){
            $(this).parent().removeClass("multiselect-answer-on");
        }else {
            $(this).parent().addClass("multiselect-answer-on");
        }
    })
    $(".indefinite-answers").click(function () {
        if($(this).parent().hasClass("indefinite-answer-on")){
            $(this).parent().removeClass("indefinite-answer-on");
        }else {
            $(this).parent().addClass("indefinite-answer-on");
        }
    })
})
var question = new Vue({
    el: "#question",
    data: {},
    methods: {
        init: function () {

        }
    }
});