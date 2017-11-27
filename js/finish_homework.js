/**
 * Created by Administrator on 2017/11/2.
 */
$(document).ready(function() {
    $(".question-header").load("../../views/common/public.html #questions-header");
})
var finish = new Vue({
    el: "#finish",
    data: {},
    methods: {
        init: function () {

        },showQuestion:function () {
            $(".finish-top-box").show();
        },hiddenQuestion:function () {
            $(".finish-top-box").hide();
        }
    }
});