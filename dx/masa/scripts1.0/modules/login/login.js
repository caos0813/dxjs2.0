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
            var that = this;
            that.$el.addClass('logining');
            var config = require('config');
            Masa.postRequest('login', { data: this.Model.$data }).done(function () {
                window.location = "../sys/sysHome.jsp";
            }).always(function () {
                that.$el.removeClass('logining');
            });       
        }

    });

});