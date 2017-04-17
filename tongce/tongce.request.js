/**
@author:fanyonglonng
@desc 网络请求
*/
define(["tongcecore", "common/config"], function (Tc, configs) {

    var
        responseStatus = {
            'ok': "000",// 成功
            'customerError': "001" // 后台自定义错误
        };

    $.ajaxSetup({
        type: "GET",
        dataType: "json",
        global: true,
        beforeSend: function () {
        },
        error: function (e) {
        },
        complete: function () {

        }
    });
    $(document).ajaxStart(function (e) {
        Tc.GlobalEventEmitter.trigger("ajaxStart");
    });
    $(document).ajaxSend(function (evt, request, settings) {
        Tc.GlobalEventEmitter.trigger("ajaxSend", evt, request, settings);
    });
    $(document).ajaxComplete(function (evt, request, settings) {
        Tc.GlobalEventEmitter.trigger("ajaxComplete", evt, request, settings);
    });
    $(document).ajaxStop(function () {
        Tc.GlobalEventEmitter.trigger("ajaxStop");
    });


    function PostRequest(name, options, donecallback, failcallback) {
        options.type = "post";
        return Request(name, options, donecallback, failcallback);
    }
    function GetRequest(name, options, donecallback, failcallback) {
        options.type = "get";
        return Request(name, options, donecallback, failcallback);
    }
    function Request(name, options, donecallback, failcallback) {
        if (typeof options == "function") {
            failcallback = donecallback;
            donecallback = options;
            options = {};
        }
        if (name != "*") {
            options.url = configs.getUrl(name);
        }
        var ajax = $.ajax(options), wrapAjax = WrapAjax(donecallback, failcallback);
        wrapAjax.name = name;
        wrapAjax.options = options;
        ajax.done(wrapAjax.success).fail(wrapAjax.fail);
        return ajax;
    }
    function thenRequest(name, options) {
        options = options || {};
        if (name != "*") {
            options.url = configs.getUrl(name);
        }
        var ajax = $.ajax(options), wrapAjax, then = ajax.then, lastPromise;
        var resultPromise = {
            then: function (donecallback, failcallback) {
                var
                    wrapAjax2 = WrapAjax(donecallback, failcallback);
                wrapAjax2.type = "thenRequest";
                lastPromise = lastPromise.then(wrapAjax2.success, wrapAjax2.fail);
                return resultPromise;
            }
        };
        ajax.then = function (donecallback, failcallback) {
            wrapAjax = WrapAjax(donecallback, failcallback)
            wrapAjax.type = "thenRequest";
            wrapAjax.name = name;
            wrapAjax.options = options;
            lastPromise = then(wrapAjax.success, wrapAjax.fail);
            return resultPromise;
        }
        return ajax;
    }
    function WrapAjax(donecallback, failcallback) {
        donecallback = typeof donecallback == "function" ? donecallback : function () { };
        failcallback = typeof failcallback == "function" ? failcallback : function (d, errortext) {

        };
        function wrapSuccess(d) {
            var retStatus = d.retStatus, retMsg = d.retMsg || "";
            if (retStatus == responseStatus.ok) {
                return donecallback(d.retBody,d);
            } else if (retStatus == responseStatus.customerError) {
                Tc.dialog.alert(retMsg);
                return failcallback.apply(this, arguments);
            } else {
                return failcallback.apply(this, arguments);
            }
        }
        function wrapFail(d, errortext) {
            if (d.status == "timeout") {
                Tc.dialog.alert("服务器请求超时，请您稍后重新再试!");
            }
            console.log("ajax:" + errortext);
            return failcallback.apply(this, arguments);
        }
        function retryRequest() {
            if (result.type == "Request") {
                Request(result.name, result.options, donecallback, failcallback);
            }
        }

        var result = {
            type: "Request",
            success: wrapSuccess,
            fail: wrapFail
        };
        return result;
    }
    ; (function () {
        var isFormData = typeof FormData == "undefined" ? false : true;
        function FormUpload(upload) {
            var that = this;
            that.upload = upload;
            that.iframeid = Tc._.uniqueId('iframeuploadid');
            that.form = $(upload.options.formElement);
            that.iframe = $('<iframe class="dx_upload_delindex" id="' + that.iframeid + '" name="' + that.iframeid + '" style="display:none"></iframe>');
            that.iframe.prop("name", that.iframeid);
            that.form.attr({
                action: upload.options.url,
                target: that.iframeid,
                method: "POST",
                enctype: "multipart/form-data"
            });
            that.iframe.appendTo(that.form);
            that.iframe.on("load", function () {
                that.isSubmiting = false;
                var response, data;
                try {
                    response = that.iframe.contents();
                    if (!response.length || !response[0].firstChild) {
                        throw new Error();
                    }
                } catch (e) {
                    response = undefined;
                }
                if (response) {
                    data = $.parseJSON($(response[0].body).text());
                    that.upload.success(data)
                } else {
                    that.upload.error();
                }
                that.destroy();
            });
            that.bindFormData(that.upload.options.data);
        }
        function XMLRequestUpload(upload) {
            this.upload = upload;
            this.formData = new FormData();
            this.bindFormData(upload.options.data);
            this.bindFormData(upload.options.formData);
            if (upload.options.formSerialize) {
                this.serializeFormData();
            }
        }
        function Upload(options) {
            this.options = $.extend({
                formElement: null,
                data: {},
                url: "",
                formData: null,
                formSerialize: true
            }, Tc._.pick(options, "url", "data", "formElement", "formData", "formSerialize"));
            this.uploadModule = isFormData ? new XMLRequestUpload(this) : new FormUpload(this);
        }
        $.extend(FormUpload.prototype, {
            destroy: function () {
                this.form.find('.dx_upload_delindex').remove();
                this.isSubmiting = false;
            },
            bindFormData: function (formdata) {
                var form = this.form;
                if (typeof formdata == "object") {
                    for (var name in formdata) {
                        form.append('<input type="hidden" class="dx_upload_delindex" name="' + name + '" value="' + formdata[name] + '"/>');
                    }
                }
            },
            submit: function () {
                if (this.isSubmiting) {
                    return;
                }
                this.isSubmiting = true;
                this.form.submit();
            },
            abort: function () {
                this.iframe.off('load').prop('src', "javascript:false");
                this.destroy();
            }
        });
        $.extend(XMLRequestUpload.prototype, {
            serializeFormData: function () {
                var formElement = this.upload.options.formElement, that = this;
                if (formElement) {
                    formElement = $(formElement);
                    formElement.find(':input:not(:file,:button,:submit,:image)').each(function (i, element) {
                        element = $(element);
                        var name = element.prop("name");
                        if (name) {
                            that.formData.append(name, element.val());
                        }
                    });
                }
            },
            bindFormData: function (formdata) {
                if (typeof formdata == "object") {
                    for (var name in formdata) {
                        this.formData.append(name, formdata[name]);
                    }
                }
            },
            submit: function () {
                var that = this, options = that.upload.options, formData = that.formData;
                that.ajax = $.ajax({
                    url: options.url,
                    data: formData,
                    contentType: false,
                    dataType: "json",
                    processData: false
                }).done(function (d) {
                    that.upload.success(d);
                }).fail(function (e) {
                    that.upload.error(e);
                });
            },
            abort: function () {
                this.ajax.abort();
            }

        });
        $.extend(Upload.prototype, Tc.Events, {
            submit: function () {
                this.uploadModule.submit();
            },
            success: function (data) {
                this.trigger("onSuccess", data);
            },
            error: function (data) {
                this.trigger("onError", data);
            },
            abort: function () {
                this.uploadModule.abort();
            }
        });
        $.ajaxTransport("aysncform", function (options, originalOptions, jqXHR) {
            var upload;
            return {
                send: function (headers, completeCallback) {
                    upload = new Upload(originalOptions);
                    upload.on("onSuccess", function (data) {
                        completeCallback(200, "success", { aysncform: data });
                    });
                    upload.on("onError", function () {
                        completeCallback(500, "error", { aysncform: '' });
                    });
                    upload.submit();
                },
                abort: function () {
                    upload.abort();
                }
            };
        });
    }());
    Tc.define({
        request: Request,
        thenRequest: thenRequest,
        postRequest: PostRequest,
        getRequest:GetRequest
    })

});