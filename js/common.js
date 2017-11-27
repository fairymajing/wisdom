/**
 * Created by majing on 2017/11/9.
 */
var CONFIG_INFO = {
        key: "4z9CP2xmqwjFkDFrztGyPF5JYbdIAWZb",
        baseUrl: "https://api.edu-smart.cc/api/web/v1.1/",
        token: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : "",
    },
    // USER_INFO = sessionStorage.userInfo ? JSON.parse(sessionStorage.userInfo) : "",
    AJAX = function (e, n, t, r, o) {
        var d = (new Date).getTime(), i = {token: CONFIG_INFO.token};
        $.extend(i, t), $.ajax({
            type: e || "get",
            url: CONFIG_INFO.baseUrl + n,
            dataType: "json",
            data: i,
            success: r,
            error: o
        })
    };
var logIn;
$(document).ready(function() {
    // $(".nav-exit").click(function () {
//         // AJAX("post", "auth/logout?token="+CONFIG_INFO.token, {
//         //     // token: CONFIG_INFO.token
//         // }, function (o) {
//         //     console.log(o.data);
//         // }, function (o) {
//         //     console.log(o.msg)
//         // });
//         alert("Aaa")
//     })
// })
});

// console.log(CONFIG_INFO.token);
// setTimeout(function(){
//     var navExit = new Vue({
//         el: "#headersss",
//         data: {},
//         methods: {
//             init: function () {
//
//             }, exit: function () {
//                 AJAX("post", "auth/logout?token=" + CONFIG_INFO.token, {
//                     // token: CONFIG_INFO.token
//                 }, function (o) {
//                     console.log(o.data);
//                     console.log(o.code);
//                     if (o.code == 2000) {
//                         localStorage.removeItem("userInfo"), localStorage.removeItem("userSign")
//                         console.log(CONFIG_INFO.token);
//                         window.location.href = "../../views/home/home.html";
//                         getUser();
//
//                     }
//
//                 }, function (o) {
//                     console.log(o.msg)
//                 });
//             }
//         }
//     });
//     getUser();
// },500);
window.onload=function () {

    // var navExit = new Vue({
    //     el: "#headersss",
    //     data: {},
    //     methods: {
    //         init: function () {
    //
    //         }, exit: function () {
    //             AJAX("post", "auth/logout?token=" + CONFIG_INFO.token, {
    //                 // token: CONFIG_INFO.token
    //             }, function (o) {
    //                 console.log(o.data);
    //                 console.log(o.code);
    //                 if (o.code == 2000) {
    //                     localStorage.removeItem("userInfo"), localStorage.removeItem("userSign")
    //                     console.log(CONFIG_INFO.token);
    //                     location.reload();
    //                     // window.location.href = "../../views/home/home.html";
    //                 }
    //
    //             }, function (o) {
    //                 console.log(o.msg)
    //             });
    //         }
    //     }
    // })
    //     $("#navExit").click(function () {
    //         AJAX("post", "auth/logout?token="+CONFIG_INFO.token, {
    //             // token: CONFIG_INFO.token
    //         }, function (o) {
    //             console.log(o.data);
    //             console.log(o.code);
    //             if(o.code==2000){
    //                 localStorage.removeItem("userInfo"), localStorage.removeItem("userSign");
    //                 console.log(CONFIG_INFO.token);
    //                 location.reload();
    //             }
    //         }, function (o) {
    //             console.log(o.msg)
    //         });
    //
    //     })
}

function getUser() {
    console.log(CONFIG_INFO.token);
    if(CONFIG_INFO.token !== ""){
        logIn=1;
        AJAX("get", "user", {
            token: CONFIG_INFO.token,
            type: 1
        },function (o) {
            if(o.code = 2000){
                // console.log(o.data);
                $(".nav-photo").attr("src",o.data.avatar);
                $(".nav-name").html(o.data.user_name);
            }
        })
        $(".navbar-nav-right").show();
        console.log(logIn);
    }else{
        logIn=0;
        console.log(logIn);
        $(".navbar-nav-right").hide();
    }
}
