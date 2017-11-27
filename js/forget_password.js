/**
 * Created by majing on 2017/10/25.
 */
$(document).ready(function() {
    $(".forget-header").load("../../views/common/public.html #forget-header");
})
var forget = new Vue({
    el: "#forget",
    data: {show:true,count:"",phoneNum:"",password:"",rePassword:"",validata:""},
    methods: {
        init: function () {

        },sendValidata:function () {
            var e = /^((1[3|4|5|7|8][0-9]{1})+\d{8})$/;
            if (forget.phoneNum !==null && e.test(forget.phoneNum)) {
                AJAX("post", "sms/forget", {
                    mobile: forget.phoneNum,
                    type: 1
                }, function (o) {
                    // console.log(o.code);
                    // console.log(o.data);
                    // console.log(o.msg);
                    if (o.code == "998"){
                        alert("请您先注册");
                    }else if(o.code == "2000"){
                        forget.show = false;
                        forget.count= 60;
                        $("#validataBtn").attr("disabled","disabled");
                        timer = setInterval(function(){
                            if(forget.count >0 ){
                                forget.count -= 1;
                            }else{
                                clearInterval(timer);
                                forget.show = true;
                                $("#validataBtn").removeAttr("disabled");
                            }
                        },1000);
                    }
                }, function (o) {
                    console.log(o.msg)
                });
            }else{
                alert("手机号码格式错误");
            }
        },submitForm:function () {
            var pw = /^[\@A-Za-z0-9_\!\#\$\%\^\&\*\.\~\+\-\/]{6,20}$/;
            var pn = /^((1[3|4|5|7|8][0-9]{1})+\d{8})$/;
            if(forget.phoneNum.length<1){
                alert("请输入手机号");
            }else if(! pn.test(forget.phoneNum)){
                alert("手机号码格式错误");
            }else if(forget.validata.length<1){
                alert("请输入验证码");
            }else if(forget.password.length<1){
                alert("请输入密码");
            }else if( ! pw.test(forget.password)){
                alert("密码应是6-20个字符");
            }else if(forget.rePassword.length<1){
                alert("请重复密码");
            }else if(forget.password !== forget.rePassword){
                alert("两次输入的密码不一致");
            }else{
                AJAX("post", "user/forget/password", {
                    mobile: forget.phoneNum,
                    password: forget.password,
                    type: 1,
                    verify_code: forget.validata
                }, function (o) {
                    console.log(o.code);
                    console.log(o.data);
                    console.log(o.msg);
                    if (o.code == "2000") {
                        alert("更改密码成功！");
                        window.location.href = "../login/login.html";
                    }else if(o.code == "4317"){
                        alert("短信验证码错误");
                    }
                }, function (o) {
                    console.log(o.msg);
                });
            }
        }
    }
});