/**
 * Created by Ma on 2017/11/8.
 */
$(document).ready(function() {
    $(".analysis-header").load("../../views/common/public.html #analysis-header");
    $(".selection-answer").click(function () {
        $(this).css({"border":"1px solid orange","background":"url(../../img/question_radio.png) no-repeat 24px 18px"}).parent().siblings().find(".selection-answer").css({"border":"0px solid orange","background":"url(../../img/question_radio_no.png) no-repeat 24px 18px"})
    })
    $(".cloze-answer").click(function () {
        $(this).css({"border":"1px solid orange","background":"url(../../img/question_radio.png) no-repeat 24px 18px"}).parent().siblings().find(".cloze-answer").css({"border":"0px solid orange","background":"url(../../img/question_radio_no.png) no-repeat 24px 18px"})
    })
})