/**
 * Created by Administrator on 2017/11/6.
 */
$(document).ready(function() {
    $(".personal-header").load("../../views/common/public.html #home-header",function () {
        var navExit = new Vue({
            el: "#home-header",
            data: {},
            methods: {
                init: function () {

                }, exit: function () {
                    AJAX("post", "auth/logout?token=" + CONFIG_INFO.token, {
                        // token: CONFIG_INFO.token
                    }, function (o) {
                        console.log(o.data);
                        console.log(o.code);
                        if (o.code == 2000) {
                            localStorage.removeItem("userInfo"), localStorage.removeItem("userSign");
                            window.location.href = "../../views/home/home.html";
                        }
                    }, function (o) {
                        console.log(o.msg)
                    });
                }
            }
        });
        getUser();
    });
    // $(".personal-nav").load("../../views/common/public.html #personal-nav");
    // $(".grade-list").attr("onclick","gradeSelect()");
    $(".grade-list").click(function () {
        $(this).addClass("grade-list-active").parent().siblings().find(".grade-list").removeClass("grade-list-active");
    });
    $(".nav-exit").click(function () {
       alert("as")
    })
    $(".task-tag li").click(function () {
        $(this).addClass("task-tag-active").siblings().removeClass("task-tag-active");
    })
    personal.init();
        //头像上传
        $.get("http://47.93.60.70:8083/tianyu/condolence/uploadToken", function (e) {
            var qntoken = e.data
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
                uptoken: qntoken, // uptoken是上传凭证，由其他程序生成
                domain: 'http://ouvegnn6u.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
                container: 'container1',             // 上传区域DOM ID，默认是browser_button的父元素
                max_retries: 3,                     // 上传失败最大重试次数
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                            // 文件添加进队列后，处理相关的事情
                        });
                    },
                    'BeforeUpload': function (up, file) {
                        // 每个文件上传前，处理相关的事情
                    },
                    'UploadProgress': function (up, file) {
                        // 每个文件上传时，处理相关的事情
                    },
                    'FileUploaded': function (up, file, info) {
                        // 每个文件上传成功后，处理相关的事情
                        // 其中info是文件上传成功后，服务端返回的json，形式如：
                        var domain = up.getOption('domain');
                        var res = JSON.parse(info.response);
                        sourceLink = domain + "/" + res.key; //获取上传成功后的文件的Url
                        $(".message-photo").attr('src', sourceLink)
                    },
                    'Error': function (up, err, errTip) {
                        //上传出错时，处理相关的事情
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后，处理相关的事情
                        AJAX("post", "user/avatar?token="+CONFIG_INFO.token, {
                            url:sourceLink
                        }, function (o) {
                            console.log(o.code);
                            if(o.code==2000){
                                location.reload();
                                // console.log(o.data.series);
                            }else{
                                // console.log(o.data.series);
                            }

                        }, function (o) {
                            console.log("上传头像")
                        });
                    },
                    'Key': function (up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在unique_names: false，save_key: false时才生效
                        var keys = file.name + Math.ceil(Math.random() * 1000);
                        var key = keys;
                        // do something with key here
                        return key
                    }
                }
            });
        });
})
function requestAjaxName() {
    AJAX("post", "user?token="+CONFIG_INFO.token, {
        user_name: personal.userName,
    }, function (o) {
        console.log(o.code);
        if(o.code==2000){
            location.reload();
            // console.log(o.data.series);
        }else{
            // console.log(o.data.series);
        }

    }, function (o) {
        console.log("修改用户信息")
    });
}
function requestAjax() {
    AJAX("post", "user?token="+CONFIG_INFO.token, {
        brief:"",
        grade_id:personal.gradeId,
        nick_name: personal.nickName,
        sex: personal.sex,
        sid:"",
        stage_id:"",
        subject_id:"",
    }, function (o) {
        console.log(o.data);
        if(o.code==2000){
            location.reload();
            // console.log(o.data.series);
        }else{
            // console.log(o.data.series);
        }

    }, function (o) {
        console.log("修改用户信息")
    });
}
var personal = new Vue({
    el: "#personal",
    data: {message:[],show:"true",count:"",phoneNum:"",validata:"",password:"",grades:"",
        brief:"",gradeId:"",nickName:"",sex:"",sId:"",stageId:"",subjectId:"",userName:"",
        oldPass:"",newPass:"",joinGrade:"",searchResult:""},
    methods: {
        init: function () {
            AJAX("get", "user", {
                token: CONFIG_INFO.token,
                type: 1
            }, function (o) {
                // console.log(o.data);
                personal.message = o.data;
                personal.brief = o.data.brief;
                personal.gradeId = o.data.grade_id;
                personal.nickName = o.data.nick_name;
                personal.sex = o.data.sex;
                personal.sId = o.data.sid;
                personal.userName = o.data.user_name;
            }, function (o) {
                console.log(o.msg)
            });
            // 获取全部年级
            AJAX("get", "grades", {

            }, function (o) {
                // console.log(o.data);
                personal.grades = o.data;
            }, function (o) {
                console.log(o.msg)
            });
            // 获取我的消息列表
            AJAX("get", "stu/message", {

            }, function (o) {
                // console.log(o.data);
                personal.grades = o.data;
            }, function (o) {
                console.log(o.msg)
            });
        },changeColor:function (e) {
            $(e.currentTarget).addClass("personal-nav-active").siblings().removeClass("personal-nav-active");
            select =  $.trim($(e.currentTarget).text());
            if(select == "加入班级"){
                $(e.currentTarget).find(".person1").addClass("person-hide").removeClass("person-show");
                $(e.currentTarget).find(".person2").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person1").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person2").addClass("person-hide").removeClass("person-show");
                // console.log( $(e.currentTarget).siblings().find(".person1"));
                // console.log($("person2"));
                // $(".personal-message").hide();
                $(".personal-grade").show();
                $(".personal-grade").siblings().hide();
                // $(".personal-password").hide();
                // $(".personal-opinion").hide();
                // $(".personal-news").hide();
            } else if(select == "我的消息"){
                $(e.currentTarget).find(".person1").addClass("person-hide").removeClass("person-show");
                $(e.currentTarget).find(".person2").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person1").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person2").addClass("person-hide").removeClass("person-show");
                // $(".personal-message").hide();
                // $(".personal-grade").hide();
                // $(".personal-password").hide();
                // $(".personal-opinion").hide();
                $(".personal-news").show();
                $(".personal-news").siblings().hide();
            } else if(select == "意见反馈"){
                $(e.currentTarget).find(".person1").addClass("person-hide").removeClass("person-show");
                $(e.currentTarget).find(".person2").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person1").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person2").addClass("person-hide").removeClass("person-show");
                // $(".personal-message").hide();
                // $(".personal-grade").hide();
                // $(".personal-password").hide();
                $(".personal-opinion").show();
                $(".personal-opinion").siblings().hide();
                // $(".personal-news").hide();
            } else if(select == "修改密码"){
                $(e.currentTarget).find(".person1").addClass("person-hide").removeClass("person-show");
                $(e.currentTarget).find(".person2").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person1").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person2").addClass("person-hide").removeClass("person-show");
                // $(".personal-message").hide();
                // $(".personal-grade").hide();
                $(".personal-password").show();
                $(".personal-password").siblings().hide();
                // $(".personal-opinion").hide();
                // $(".personal-news").hide();
            } else if(select == "个人资料"){
                $(e.currentTarget).find(".person1").addClass("person-hide").removeClass("person-show");
                $(e.currentTarget).find(".person2").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person1").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person2").addClass("person-hide").removeClass("person-show");
                $(".personal-message").show();
                $(".personal-message").siblings().hide();
                // $(".personal-grade").hide();
                // $(".personal-password").hide();
                // $(".personal-opinion").hide();
                // $(".personal-news").hide();
            } else if(select == "关于我们") {
                $(e.currentTarget).find(".person1").addClass("person-hide").removeClass("person-show");
                $(e.currentTarget).find(".person2").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person1").addClass("person-show").removeClass("person-hide");
                $(e.currentTarget).siblings().find(".person2").addClass("person-hide").removeClass("person-show");
                $(".personal-about").show();
                $(".personal-about").siblings().hide();
            }
        },sexChange : function(){
            $(".message-sex").hide();
            $(".message-sex-none").show();
        },sexSave: function () {
            // $(".message-sex").show();
            // $(".message-sex-none").hide();
            if($("input[type='radio']:checked").val()=="male"){
                personal.sex = 1;
                requestAjax();
            }else{
                personal.sex = 2;
                requestAjax();
            }
        },changeName:function () {
            $(".personal-message").hide();
            $(".personal-message-name").show();
        },submitName :function () {
            personal.userName = $(".name-input").val();
            requestAjaxName();
        },changeNick:function () {
            $(".personal-message").hide();
            $(".personal-message-nickname").show();
        },submitNick :function () {
            personal.nickName = $(".nick-input").val();
            requestAjax();
        },changePhone:function () {
            $(".personal-message").hide();
            $(".personal-message-phone").show();
        },submitPassword :function () {
            // 修改密码
            personal.oldPass = $(".old-password").val();
            personal.newPass = $(".new-password").val();
            var reg = /^[\@A-Za-z0-9_\!\#\$\%\^\&\*\.\~\+\-\/]{6,20}$/;
            if($(".old-password").val().length<1){
                alert("请输入原密码");
            } else if(! reg.test(personal.oldPass)){
                alert("原密码不得少于六位");
            } else if($(".old-password").val().length<1){
                alert("请输入新密码");
            } else if(! reg.test(personal.newPass)){
                alert("新密码应是6-20个字符");
            } else if($(".re-password").val().length<1){
                alert("请输入重复密码");
            } else if($(".new-password").val() !==$(".re-password").val()){
                alert("两次密码不一致")
            } else{
                AJAX("post", "user/password?token="+CONFIG_INFO.token+"&_method=put", {
                    old_password:personal.oldPass,
                    password:personal.newPass,
                    type: 1,
                }, function (o) {
                    console.log(o.code);
                    console.log(o.msg);
                    if(o.code == "4204"){
                        alert("原密码错误")
                    } else if(o.code == "4306"){
                        alert("原密码不得少于六位")
                    } else if(o.code == "2000"){
                        alert("密码重置成功");
                        location.reload();
                    }

                }, function (o) {
                    console.log("修改密码")
                });
            }

        },sendValidata:function () {
            // /^[0-9A-Za-z]{6,20}$/
            var e = /^((1[3|4|5|7|8][0-9]{1})+\d{8})$/;
            if (personal.phoneNum !==null && e.test(personal.phoneNum)) {
                AJAX("post", "sms/change", {
                    mobile: personal.phoneNum,
                    type: 1
                }, function (o) {
                    // console.log(o.code);
                    if(o.code == "4304"){
                        // alert("手机号已注册");
                    } else if (o.code == "2000") {
                        personal.show = false;
                        personal.count= 5;
                        $("#validataBtn").attr("disabled","disabled");
                        timer = setInterval(function(){
                            if(personal.count >0 ){
                                personal.count -= 1;
                            }else{
                                clearInterval(timer);
                                personal.show = true;
                                $("#validataBtn").removeAttr("disabled");
                            }
                        },1000);
                    }
                }, function (o) {
                    console.log(o.msg)
                });
            }else{
                alert("手机号码格式错误");
                return  false;
            }
        },submitPhone:function () {
            if(personal.phoneNum.length<1){
                alert("请输入手机号");
            }else if(personal.validata.length<1){
                alert("请输入验证码");
            }else if(personal.password.length<1){
                alert("请输入密码");
            }else{
                AJAX("post", "user/change/mobile?token="+CONFIG_INFO.token, {
                    mobile: personal.phoneNum,
                    type: 1,
                    verify_code: personal.validata,
                }, function (o) {
                    if (o.code == "2000") {
                        alert("修改成功！");
                        location.reload();
                    }else{
                        alert("请输入正确验证码")
                    }
                }, function (o) {
                    console.log(o.msg);
                });
            }
        },gradeChange:function () {
            $(".personal-message").hide();
            $(".personal-message-grade").show();
        },gradeSelect:function (e,index) {
            $(e.currentTarget).addClass("grade-active").parent().siblings().children().removeClass("grade-active");
            personal.gradeId = personal.grades[index].id;
        },submitGrade :function () {
            requestAjax();
        },submitOpinion:function () {
            opinionPhone = $(".opinion-phone").val();
            opinionQq = $(".opinion-qq").val();
            opinionArea = $(".opinion-area").val();
            AJAX("post", "stu/set/feedback", {
                content:opinionArea,
                mobile: opinionPhone,
                name:personal.userName,
                qq:opinionQq,
                type: 1,
            }, function (o) {
                if (o.code == "2000") {
                    alert("反馈意见提交成功");
                    location.reload();
                }else{
                    alert("请重新输入")
                }
            }, function (o) {
                console.log("反馈意见");
            });
        },submitJoin:function () {
            // 根据邀请码搜索班级
            personal.joinGrade = $(".join-grade").val();
            // console.log(personal.joinGrade);
            AJAX("get", "stu/class/search/code", {
                code: personal.joinGrade,
                token:CONFIG_INFO.token
            }, function (o) {
                // console.log(o.code)
               if(o.code ==2000){
                   personal.searchResult = o.data;
                   $(".personal-grade-search").show();
                   $(".personal-grade").hide();
               } else if(o.code == 930){
                   alert("未找到相关班级")
               }

            }, function (o) {
                console.log("根据邀请码搜索班级");
            });
        },searchClear:function () {
            // 加入班级取消
            $(".personal-grade-search").hide();
            $(".personal-grade").show();
        },searchJoin:function () {
            // 申请加入班级
            AJAX("post", "stu/class/join?token="+CONFIG_INFO.token, {
                invest_code: personal.joinGrade,
                // token:CONFIG_INFO.token
            }, function (o) {
                // console.log(o.data);
                // console.log(o.code);
                if(o.code ==2000){
                    $(".personal-grade-search").hide();
                    $(".personal-grade-result").show();
                } else if(o.code == 930){
                    alert("未找到相关班级");
                }
            }, function (o) {
                console.log("申请加入班级");
            });
        },reload:function () {
            location.reload();
        }
    }
});