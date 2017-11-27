/**
 * Created by majing on 2017/10/24.
 */
var a=0;
$(document).ready(function() {
    $(".register-header").load("../../views/common/public.html #register-header");
})
var register = new Vue({
    el: "#register",
    data: {phoneNum:"",show:"true",count:"",password:"",rePassword:"",validata:""},
    methods: {
        init: function () {

        },changeBgi : function(){
            if(a%2==0){
                $(".register-check").css({"background":"url(../../img/no_check.png) no-repeat -8px -8px"});
            }else{
                $(".register-check").css({"background":"url(../../img/checked.png) no-repeat -8px -8px"});
            }
            a++;
        },sendValidata:function () {
            // /^[0-9A-Za-z]{6,20}$/
            var e = /^((1[3|4|5|7|8][0-9]{1})+\d{8})$/;
            if (register.phoneNum !==null && e.test(register.phoneNum)) {
                AJAX("post", "sms/register", {
                    mobile: register.phoneNum,
                    type: 1
                }, function (o) {
                    console.log(o.code);
                    if(o.code == "4304"){
                        alert("手机号已注册");
                    } else if (o.code == "2000") {
                        register.show = false;
                        register.count= 60;
                        $("#validataBtn").attr("disabled","disabled");
                        timer = setInterval(function(){
                            if(register.count >0 ){
                                register.count -= 1;
                            }else{
                                clearInterval(timer);
                                register.show = true;
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
            var reg = /^[\@A-Za-z0-9_\!\#\$\%\^\&\*\.\~\+\-\/]{6,20}$/;
            if(register.phoneNum.length<1){
                alert("请输入手机号");
            }else if($(".register-check-box").is(':checked')){
                alert("请您阅读并同意注册协议");
            }else if(register.validata.length<1){
                alert("请输入验证码");
            }else if(register.password.length<1){
                alert("请输入密码");
            }else if( ! reg.test(register.password)){
                alert("密码应是6-20个字符");
            }else if(register.rePassword.length<1){
                alert("请重复密码");
            }else if(register.password !== register.rePassword){
                alert("两次输入的密码不一致");
            }else{
                AJAX("post", "auth/register", {
                    mobile: register.phoneNum,
                    password: register.password,
                    type: 1,
                    verify_code: register.validata
                }, function (o) {
                    console.log(o.code);
                    console.log(o.data);
                    console.log(o.msg);
                    if (o.code == "2000") {
                        alert("注册成功！");
                        window.location.href = "../login/login.html";
                    }else{
                        alert("请输入正确验证码")
                    }
                }, function (o) {
                    console.log(o.msg);
                });
            }
        }
    }
});