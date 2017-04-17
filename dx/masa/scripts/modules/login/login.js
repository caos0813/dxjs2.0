/***
登录
author:fanyonglong
*/
require(['masa', 'validate'], function (Masa) {
    var loginView = Masa.View({
        el: "#formlogin",
        Model: {
            data: {
                city: "深圳",
                username: "",
                password: ""
            }
        },
        initialize:function()
        {
            Masa._.bindAll(this, 'onSubmit');
            this.formValidate = this.$el.validate({
                errorClass: "login-error",
                errorElement:"div",
                rules: {
                    username: "required",
                    password: "required"
                },
                messages: {
                    username:'请输入用户名',
                    password:'请输入登录密码'
                },
                submitHandler: this.onSubmit
            });

        },
        onSubmit:function(e)
        {
            var that = this,city=that.Model.$data.city;
            that.$el.addClass('logining');
            var config = require('config');
            Masa.postRequest('login', { data: that.Model.$data, inShowLoading: false, isWrapAjax: false }).done(function (d) {
                if (d.success) {
                    Masa.sessionStorage.setItem('UserLoginInfo', Masa._.defaults(d.body, { city: city }));
                    window.location = "../sys/sysHome.jsp";
                }else
                {
                    Masa.ui.alert(d.msg);
                }
            }).always(function () {
                that.$el.removeClass('logining');
            });       
        }

    });

});