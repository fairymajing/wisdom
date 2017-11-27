/**
 * Created by majing on 2017/10/24.
 */
$(document).ready(function() {
    $(".login-header").load("../../views/common/public.html #login-header");
})
var login = new Vue({
    el: "#login",
    data: {phoneNum:"",password:""},
    methods: {
        init: function () {

        },submitForm:function () {
            if(login.phoneNum.length<1){
                alert("请输入手机号");
            }else if(login.password.length<1){
                alert("请输入密码");
            }else{
                AJAX("post", "auth/login", {
                    password: login.password,
                    type: 1,
                    user_name:login.phoneNum
                }, function (o) {
                    console.log(o.code);
                    if(o.code == "2000"){
                        localStorage.userInfo = JSON.stringify(o.data);
                        localStorage.userSign = !0;
                        alert("登录成功！");
                        console.log(CONFIG_INFO.token);
                        window.location.href = "../../views/home/home.html";
                    }else{
                        alert("账号或密码错误！")
                    }
                }, function (o) {
                    console.log(o.msg)
                });
            }
        }
    }
});