/**
 * Created by majing on 2017/10/27.
 */
$(document).ready(function() {
    $(".grade-header").load("../../views/common/public.html #home-header");
})
var task = new Vue({
    el: "#task",
    data: {},
    methods: {
        init: function () {

        },reply : function(){
            $(".comment-list-hide").css({"display":"block"});
        },clearReply: function () {
            $(".comment-list-hide").css({"display":"none"});
        }
    }
});