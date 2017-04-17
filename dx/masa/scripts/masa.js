/****
masa 框架
author:fanyonglong
**/
(function (root, factory) {
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        define(['jquery', 'lodash', 'vue'], function ($, _, Vue) {
            return root['Masa'] = factory($, _, Vue);
        });
    } else {
        root['Masa'] = factory(root['jQuery'], root['_'], root['Vue']);
    }

}(this, function ($, _, Vue) {

    return (function (modules) {
        var installedModules = {};
        function __require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = { exports: {}, id: moduleId, loaded: false };
            modules[moduleId].call(module.exports, module, module.exports, __require__);
            module.loaded = true;
            return module.exports;
        }
        __require__.m = modules;
        __require__.c = installedModules;
        __require__.p = "";
        return __require__(0);
    })([
        // 核心
        function (module, exports, __require__) {
            var extend = $.extend;
            exports = module.exports = {
                version: "1.0",
                _: _,
                $: $,
                Vue: Vue,
                mixin: function (protos) {
                    for (var name in protos) {
                        exports[name] = protos[name];
                    }
                },
                hasInstanceof: function (obj, target) {
                    return obj instanceof target;
                },
                template: function (template) {
                    return _.template(template, {
                        interpolate: /{{=([\s\S]+?)}}/g,
                        escape: /{{-([\s\S]+?)}}/g,
                        evaluate: /{{([\s\S]+?)}}/g
                    });
                }
            };
            function Class() { }
            Class.extend = function (protoProps, staticProps) {
                var parent = this, member, name, child;
                if (protoProps && _.has(protoProps, 'constructor')) {
                    child = protoProps.constructor;
                } else {
                    child = function () { return parent.apply(this, arguments); };
                }
                extend(child, parent, staticProps);
                child.prototype = _.create(parent.prototype, { 'constructor': child });
                if (protoProps) {
                    extend(child.prototype, protoProps);
                }
                child.__super__ = parent.prototype;
                return child;
            }
            Class.mixin = function () {
                extend.apply(this.prototype, arguments);
            }
            Class.getInstance = function () {
                var argCount = arguments.length, instanceClass = this._instance_;
                if (!instanceClass) {
                    if (argCount == 0) {
                        instanceClass = new this();
                    } else if (argCount == 1) {
                        instanceClass = new this(arguments[0]);
                    } else if (argCount == 2) {
                        instanceClass = new this(arguments[0], arguments[1]);
                    } else if (argCount == 3) {
                        instanceClass = new this(arguments[0], arguments[1], arguments[2]);
                    }
                    this._instance_ = instanceClass;
                }
                return instanceClass;
            }
            exports.Class = Class;
            _.forEach(__require__.m, function (v, index) {
                if (index == 0) {
                    return;
                }
                exports.mixin(__require__(index));
            });
        },
        // 事件
        function (module, exports, __require__) {
            exports.Events = {
                on: function (name, handler, one) {
                    if (!this.__events__) {
                        this.__events__ = {};
                    }
                    if ($.isPlainObject(name)) {
                        for (var n in name) {
                            this.on(n, name[n], one);
                        }
                        return this;
                    }
                    var events = this.__events__[name] = this.__events__[name] || [];
                    if (one) {
                        handler = (function (name, handler) {
                            return function onehandler() {
                                handler.apply(this, arguments);
                                this.off(name, onehandler);
                            }
                        }(name, handler));
                    }
                    events.push(handler);
                    return this;
                },
                one: function (name, handler) {
                    this.on(name, handler, true);
                    return this;
                },
                off: function (name, handler) {
                    if (!this.__events__) return this;
                    if (!name) {
                        this.__events__ = {};
                    }
                    else if (name && !handler) {
                        this.__events__[name] = [];
                    } else {
                        var events = this.__events__[name] || [], newEvents;
                        for (var i = events.length - 1; i >= 0; i--) {
                            if (events[i] == handler) {
                                events.splice(i, 1);
                            }
                        }
                    }
                    return this;
                },
                trigger: function (name) {
                    if (!this.__events__) return this;
                    if (!name) {
                        for (var name in this.__events__) {
                            this.trigger(name);
                        }
                        return this;
                    }
                    var i, len, result, events = this.__events__[name] || [], args = _.slice(arguments, 1), allevents = this.__events__["*"] || [];
                    events = events.slice();
                    allevents = allevents.slice();
                    for (i = 0, len = events.length; i < len; i++) {
                        if (typeof events[i] == "function") {
                            result = events[i].apply(this, args);
                            if (result === true) {
                                return true;
                            }
                        }
                    }
                    args = [name].concat(args);
                    for (i = 0, len = allevents.length; i < len; i++) {
                        if (typeof allevents[i] == "function") {
                            allevents[i].apply(this, args);
                        }
                    }
                    return this;
                }
            };
        },
        // 视图
        function (module, exports, __require__) {
            var m = __require__(0), Class = m.Class, View, delegateEventSplitter = /^(\S+)\s*(.*)$/, viewOptions;
            viewOptions = ['Model', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
            View = Class.extend({
                el: 'body',
                tagName: "div",
                constructor: function (options) {
                    this.cid = _.uniqueId('view');
                    options || (options = {});
                    _.extend(this, _.pick(options, viewOptions));
                    this._ensureElement();
                    if (this.Model && !m.hasInstanceof(this.Model, Vue)) {
                        this.Model.el = this.el;
                        this.Model = new Vue(this.Model);
                    }
                    this.initialize.apply(this, arguments);
                },
                $: function (selector) {
                    return this.$el.find(selector);
                },
                initialize: function () { },
                render: function () {
                    return this;
                },
                remove: function () {
                    this._removeElement();
                    this.stopListening();
                    return this;
                },
                _removeElement: function () {
                    this.$el.remove();
                },
                setElement: function (element) {
                    this.undelegateEvents();
                    this._setElement(element);
                    this.delegateEvents();
                    return this;
                },
                _setElement: function (el) {
                    this.$el = el instanceof $ ? el : $(el);
                    this.el = this.$el[0];
                },
                delegateEvents: function (events) {
                    if (!(events || (events = _.result(this, 'events')))) return this;
                    this.undelegateEvents();
                    for (var key in events) {
                        var method = events[key];
                        if (!_.isFunction(method)) method = this[events[key]];
                        if (!method) continue;
                        var match = key.match(delegateEventSplitter);
                        this.delegate(match[1], match[2], _.bind(method, this));
                    }
                    return this;
                },
                delegate: function (eventName, selector, listener) {
                    this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
                },
                undelegateEvents: function () {
                    if (this.$el) this.$el.off('.delegateEvents' + this.cid);
                    return this;
                },
                undelegate: function (eventName, selector, listener) {
                    this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
                },
                _createElement: function (tagName) {
                    return document.createElement(tagName);
                },
                _ensureElement: function () {
                    if (!this.el) {
                        var attrs = _.extend({}, _.result(this, 'attributes'));
                        if (this.id) attrs.id = _.result(this, 'id');
                        if (this.className) attrs['class'] = _.result(this, 'className');
                        this.setElement(this._createElement(_.result(this, 'tagName')));
                        this._setAttributes(attrs);
                    } else {
                        this.setElement(_.result(this, 'el'));
                    }
                },
                _setAttributes: function (attributes) {
                    this.$el.attr(attributes);
                }
            });
            View.mixin(__require__(1).Events);
            exports.View = function (extendProto, staticPro, options) {
                var view = View.extend(extendProto, staticPro);
                return new view(options);
            }
            exports.View.extend = function (extendProto, staticPro) {
                return View.extend(extendProto, staticPro);
            }
        },
        // 网络请求
        function (module, exports, __require__) {
            var configs = require('config'), responseStatus, ui = __require__(4).ui, noop = $.noop, globalAjaxSetting = {
                inShowLoading: false,
                isAutoCloseLoading: true,
                isShowLoading: false
            };

            responseStatus = {
                'ok': "000",// 成功
                'customerError': "001", // 后台自定义错误
                'requestError': "999" // 请求错误

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
                if (globalAjaxSetting.inShowLoading) {
                    globalAjaxSetting.isShowLoading = true;
                    ui.showLoading();
                }
            });
            $(document).ajaxSend(function (evt, request, settings) {
            });
            $(document).ajaxComplete(function (evt, request, settings) {
            });
            $(document).ajaxStop(function () {
                if (globalAjaxSetting.isShowLoading && globalAjaxSetting.isAutoCloseLoading) {
                    globalAjaxSetting.isShowLoading = false;
                    ui.hideLoading();
                }
            });
            function wrapReuqest(options) {
                var fialCallback = noop, successCallback = noop;
                function wrapSuccess(callback) {
                    successCallback = _.isFunction(callback) ? callback : noop;
                    return options.isWrapAjax ? function (d) {
                        var retStatus = d.retStatus, retMsg = d.retMsg || "访问服务器出错";
                        if (retStatus == responseStatus.ok) {
                            return successCallback.call(this, d.retBody, d);
                        } else {
                            !options.isCustomerError && ui.alert(retMsg);
                            return fialCallback.call(this, retStatus, d);
                        }
                    } : successCallback;
                }
                function wrapFail(callback) {
                    fialCallback = _.isFunction(callback) ? callback : noop;
                    return function (e, errortext) {
                        if (d.status == "timeout") {
                            ui.alert('网络请求超时');
                        } else if (errortext == 'parsererror') {
                            ui.alert('系统出错了');
                        }
                        return fialCallback.call(this, responseStatus.requestError, e, errortext);
                    }
                }
                function retryRequest() {
                    sendRequest(options);
                }
                function sendRequest(options) {
                    var ajax = $.ajax(options), then = ajax.then, done = ajax.done, fail = ajax.fail;
                    return _.extend(ajax, {
                        then: function (scb, ecb) {
                            var success = wrapSuccess(scb), dthen;
                            dthen = then(function () {
                                var result = success.apply(this, arguments);
                                if (_.isPlainObject(result) && result.promise) {
                                    result.done(wrapSuccess(function () {
                                        dthen.resolveWith(this, arguments);
                                    })).fail(wrapFail(function () {
                                        dthen.rejectWith(this, arguments)
                                    }));
                                }
                            }, wrapFail(ecb));
                            return dthen;
                        },
                        done: function (cb) {
                            done(wrapSuccess(cb));
                            return ajax;
                        },
                        fail: function (cb) {
                            fail(wrapFail(cb));
                            return ajax;
                        }
                    });
                }
                options.data = options.data || {};
                options.data.caseId = Masa.business.getCaseId();
                options.isCustomerError = _.has(options, 'isCustomerError') ? options.isCustomerError : false;
                options.isWrapAjax = _.has(options, 'isWrapAjax') ? options.isWrapAjax : true;
                globalAjaxSetting.inShowLoading = options.inShowLoading = _.has(options, 'inShowLoading') ? options.inShowLoading : true;
                globalAjaxSetting.isAutoCloseLoading = options.isAutoCloseLoading = _.has(options, 'isAutoCloseLoading') ? options.isAutoCloseLoading : true;
                return sendRequest(_.omit(options, ['isCustomerError', 'inShowLoading', 'isAutoCloseLoading', 'isWrapAjax']));
            }
            function request(name, options) {
                options = options || {};
                if (name != "*") {
                    options.url = configs.getUrl(name);
                }
                return wrapReuqest(options);
            }
            function postRequest(name, options) {
                options = options || {};
                options.type = "post";
                return request(name, options);
            }
            function getRequest(name, options) {
                options = options || {};
                options.type = "get";
                return request(name, options);
            }
            module.exports = {
                request: request,
                getRequest: getRequest,
                postRequest: postRequest
            };
        },
        // 页面UI组件
        function (module, exports, __require__) {
            var m = __require__(0), Class = m.Class, Widget, widgets = {}, browser = __require__(7);
            Widget = Class.extend({
                constructor: function () {
                    this.widgetid = _.uniqueId('widget');
                    this.__self__ = this.constructor;
                    this.__super__ = this.__self__.__super__;
                    this.initialize.apply(this, arguments);
                },
                events: [],
                initialize: function (options) {
                    this.setOptions(options);
                    this.setEvents(this.options);
                    return this.options;
                },
                setOptions: function (options) {
                    this.options = $.extend(true, {}, this.options, options);
                },
                setEvents: function (options) {
                    this.on(_.pick(options, this.events));
                }
            });
            Widget.mixin(__require__(1).Events);
            function extendWidget(name, proto, staticProto, parent) {
                if (widgets[name]) {
                    throw "already exist";
                }
                var prentWidget = _.isString(parent) ? widgets[name] || Widget : Widget;
                var widget = prentWidget.extend(proto, staticProto);
                widget.prototype.widgetType = name;
                widgets[name] = widget;
                return widget;
            }
            function getWidget(name) {
                var widget = widgets[name];
                if (!widget) {
                    throw "not found widget :" + name;
                }
                return widget;
            }
            function createWidget(name, arg, arg2, arg3, arg4, arg5, arg6) {
                var widget = getWidget(name), len = arguments.length;
                if (len <= 1) {
                    return new widget();
                }
                return new widget(arg, arg2, arg3, arg4, arg5, arg6);
            }
            extendWidget("Scrollbar", function () {
                function setContentScroll(y, isWheel) {
                    var that = this, wheelstep = 20, delta, cTop, top = parseInt(this.scrollbar.css('top')), maxTop = that.height - that.barHeight, maxScrollHeight = that.scrollHeight - that.height;
                    if (isWheel) {
                        delta = top + y * wheelstep / 100 * that.barHeight;
                        delta = Math.min(Math.max(delta, 0), maxTop);
                        y = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
                    }
                    y = Math.max(y, 0);
                    y = Math.min(y, maxTop);

                    cTop = y / maxTop * maxScrollHeight;
                    this.scrollbar.css("top", y);
                    this.element.scrollTop(cTop);
                }

                function wheelscroll(e) {
                    if (this.disabledScroll) {
                        return;
                    }
                    if (!this.isHoverWrapper) {
                        return;
                    }
                    var event = e.originalEvent, delta = 0;

                    if (event.wheelDelta) {
                        delta = -event.wheelDelta / 120;
                    }
                    if (event.detail) {
                        delta = event.detail / 3;
                    }
                    var currentTarget = $(e.target);
                    if (currentTarget.closest('.dx-scrollcontainer').is(this.wrapper)) {
                        setContentScroll.call(this, delta, true);
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }
                function scrollbarmousedown(e) {
                    this.downbartop = parseFloat(this.scrollbar.css('top'));
                    this.pageY = e.pageY;
                    this.delegateEvents(this.doc, 'mousemove', scrollbarmousemove);
                    this.delegateEvents(this.doc, 'mouseup', scrollbarmouseup);
                    e.preventDefault();
                }
                function scrollbarmousemove(e) {
                    var top = this.downbartop + e.pageY - this.pageY;
                    setContentScroll.call(this, top);
                }
                function scrollbarmouseup(e) {
                    this.removeEvents();
                }
                return {
                    options: {
                        height: '200px',
                        width: 'auto',
                        alwaysScrollbar: true,
                        barColor: '#398ddc',
                        barWidth: '6px',
                        visibleRail: true,
                        disabledWheel: false,
                        disabledWheelSelector: null
                    },
                    initialize: function (element, options) {
                        options = this.__super__.initialize.call(this, options);
                        var tagElement = '<div></div>';
                        var element = this.element = $(element);
                        var wrapper = this.wrapper = $(tagElement).addClass('dx-scrollcontainer');
                        var scrollbar = this.scrollbar = $(tagElement).addClass('dx-scrollbar');
                        var scrollrail = this.scrollrail = $(tagElement).addClass('dx-scrollrail');

                        wrapper.css({
                            position: 'relative',
                            width: options.width,
                            height: options.height,
                            overflow: 'hidden'
                        });
                        element.css({
                            width: options.width,
                            height: options.height,
                            overflow: 'hidden'
                        });
                        scrollbar.css({
                            "position": "absolute",
                            "top": "0px",
                            "right": "0px",
                            "width": options.barWidth,
                            "border-radius": "3px",
                            "z-index": "99",
                            "background-color": options.barColor
                        });
                        scrollrail.css({
                            "position": "absolute",
                            "top": "0px",
                            "right": "0px",
                            "width": options.barWidth,
                            "height": "100%",
                            "border-radius": "3px",
                            "z-index": "98",
                            "opacity": 0.1,
                            "background-color": options.barColor
                        });
                        this.render();
                        this.initEvents();

                    },
                    render: function () {
                        this.doc = $(window.document);
                        this.element.wrap(this.wrapper);
                        this.wrapper = this.element.parent('.dx-scrollcontainer');
                        this.scrollbar.appendTo(this.wrapper);
                        this.scrollrail.appendTo(this.wrapper);

                        this.setBarHeight();
                        if (!this.options.visibleRail) {
                            this.scrollrail.hide();
                        }
                        this.disabledWheelSelector = [];
                        if (this.options.disabledWheelSelector) {
                            this.disabledWheelSelector = this.options.disabledWheelSelector.split(',')
                            this.setDisabledWheel();
                        }
                    },
                    setBarHeight: function () {
                        var height = this.element.outerHeight(), scrollHeight = this.element[0].scrollHeight, barHeight;
                        this.height = height;
                        this.scrollHeight = scrollHeight;
                        this.barHeight = barHeight = Math.max(height / scrollHeight * height, 30);
                        if (scrollHeight > height) {
                            this.scrollbar.height(barHeight);
                            this.showBar();
                        } else {
                            this.hideBar();
                        }
                    },
                    showBar: function () {
                        this.scrollbar.show();
                        if (this.options.visibleRail) {
                            this.scrollrail.show();
                        }
                        this.disabledScroll = false;
                    },
                    hideBar: function () {
                        this.disabledScroll = true;
                        this.scrollbar.hide();
                        this.scrollrail.hide();
                    },
                    setDisabledWheel: function () {
                        var that = this;
                        _.forEach(this.disabledWheelSelector, function (name) {
                            $(name).hover(function () {
                                that.isHoverWrapper = false;
                            }, function () {
                                that.isHoverWrapper = true;
                            });
                        });

                    },
                    initEvents: function () {
                        var that = this;
                        that.isHoverWrapper = true;
                        that.delegateEvents(that.scrollbar, 'mousedown', scrollbarmousedown);
                        that.delegateEvents(that.scrollbar, 'selectstart', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        });
                        that.wrapper.hover(function (e) {
                            that.isHoverWrapper = true;
                            that.setBarHeight();
                        }, function () {
                            that.isHoverWrapper = false;
                            ;
                        });
                        if (!that.options.disabledWheel) {
                            that.doc.on('mousewheel DOMMouseScroll', $.proxy(wheelscroll, that));
                        }

                    },
                    removeEvents: function () {
                        this.doc.off('.' + this.widgetid);
                    },
                    scrollTop: function (top) {
                        setContentScroll.call(this, top);
                    }


                };
            }());
            extendWidget("Dialog", function () {
                var
                    isregHtml = /<([a-zA-Z]+?).*?>[\s\S]*<\/\1>/,
                    Dialog = Widget.extend({
                        options: {
                            title: "",
                            content: "",
                            confirmText: "确定",
                            cancelText: "取消",
                            customScrollbar: null,
                            keyboard: false,
                            backdrop: 'static',
                            show: false,
                            styles: {},
                            hiddenFooter: false,
                            position: 'top',
                            offsetTop: 200,
                            zIndex: 100000
                        },
                        events: ['onConfirm', 'onClose', 'onShown', 'onShow'],
                        initialize: function (dialogTemplate, options) {
                            var that = this;
                            that.__super__.initialize.call(that, options);
                            that.dialogTemplate = dialogTemplate;
                            that.init();
                        },
                        setPosition: function () {
                            var that = this, options = that.options, position = options.position, h = options.offsetTop
                                , doc, w, pt;
                            if (position == 'center') {
                                w = browser.getWindowSize();
                                pt = (w.h / 2) - h;
                            }
                            if (position == 'top') {
                                pt = h;
                            }
                            that.element.css('top', Math.max(pt, 0));
                        },
                        init: function () {
                            var that = this, options = that.options;
                            that.on('onShow', that.setPosition);
                            var element = that.element = $(that.dialogTemplate(options)).hide().appendTo('body');
                            element.css('zIndex', options.zIndex);
                            element.on("click", "[data-command]", function (e) {
                                var currentElement = e.currentTarget, command = currentElement.getAttribute("data-command");
                                that._execCommand(command, e);
                                e.preventDefault();
                                e.stopPropagation();
                            });

                            if (options.dialogType == "windows") {
                                that.on("onShown", function (e) {
                                    if (this.options.customScrollbar && this.scrollbar) {
                                        this.scrollbar.setBarHeight();
                                        this.scrollbar.scrollTop(0);
                                    }
                                });
                                element.find('.modal-body').css(options.styles);

                                that.content = $(options.content);
                                that.content.hide();
                                that.setContent(that.content);
                                that.content.show();
                            } else if (options.dialogType == "alert") {
                                that.on("onClose", function (e) {
                                    that.remove();
                                });

                            } else if (options.dialogType == "confirm") {
                                that.on("onClose", function (e) {
                                    this.remove();
                                });
                                that.on("onConfirm", function () {
                                    that.off("onClose");
                                    that._close();
                                });
                            }
                            if (options.hiddenFooter) {
                                this.hideFooter();
                            }
                            element.on("hidden.bs.modal", function (e) {
                                that.trigger('onClose');
                            });
                            element.on("shown.bs.modal", function (e) {
                                that.trigger('onShown');
                            });
                            element.on("show.bs.modal", function (e) {
                                that.trigger('onShow');
                            });
                            that.element.modal(_.pick(options, "keyboard", "backdrop", "show"));
                        },
                        addEventListener: function (method, handler) {
                            this.element.on(method, handler);
                        },
                        remove: function () {
                            this.element.remove();
                            return this;
                        },
                        _execCommand: function (name, e) {
                            if (this.submitingState) {
                                return;
                            }
                            name = "_" + name;
                            this[name] && this[name](e);
                        },
                        _confirm: function (e) {
                            this.trigger('onConfirm', e);
                        },
                        _close: function () {
                            this.hide();
                        },
                        submiting: function (text) {
                            this.submitingState = true;
                            this.element.find('button[data-command="confirm"]').text(text);
                            return this;
                        },
                        resetSubmit: function () {
                            this.submitingState = false;
                            this.element.find('button[data-command="confirm"]').text(this.options.confirmText);
                            return this;
                        },
                        show: function () {
                            this.element.modal('show');
                            return this;
                        },
                        hide: function () {
                            this.element.modal('hide');
                            return this;
                        },
                        setContent: function (content) {
                            var that = this;
                            this.element.find('.modal-body').html(content);
                            if (this.options.customScrollbar) {
                                that.scrollbar = createWidget('Scrollbar', content, that.options.customScrollbar);
                            }
                            return this;
                        },
                        showFooter: function () {
                            this.element.find('.modal-footer').show();
                        },
                        hideFooter: function () {
                            this.element.find('.modal-footer').hide();
                        },
                        setFooter: function (content) {
                            this.element.find('.modal-footer').html(content);
                            return this;
                        },
                        setTitle: function (title) {
                            this.element.find('.modal-title').html(title);
                            return this;
                        }
                    });
                return {
                    initialize: function () {
                        var that = this;
                        that.dialogTemplate = '<%if(dialogType=="alert"){%><div class="modal fade bs-example-modal-sm"  ><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close"  data-command="close" ><span >&times;</span></button><h4 class="modal-title" ><%-title%></h4></div><div class="modal-body"><%-content%></div><div class="modal-footer btn_1"><button type="button" class="btn btn-primary" data-command="close"><%-confirmText%></button></div></div></div></div><%}else if(dialogType=="confirm"){%><div class="modal fade bs-example-modal-sm" ><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-command="close"><span>&times;</span></button><h4 class="modal-title"><%-title%></h4></div><div class="modal-body"><%-content%></div><div class="modal-footer btn_1"><button type="button" class="btn btn-danger" data-command="close"><%-cancelText%></button><button type="button" class="btn btn-primary" data-command="confirm"><%-confirmText%></button></div></div></div></div><%}else if(dialogType=="windows"){%><div class="modal fade" ><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-command="close"><span>&times;</span></button><h4 class="modal-title"><%-title%></h4></div><div class="modal-body"></div><div class="modal-footer btn_1"><button type="button" data-command="close" class="btn btn-danger" style="min-width:120px" ><%-cancelText%></button><button type="button"   data-command="confirm" class="btn btn-primary" style="min-width:120px"><%-confirmText%></button></div></div></div></div><%}%>';
                        that.dialogTemplate = _.template(that.dialogTemplate);

                    },
                    alert: function (title, content, callback) {
                        if (typeof content == "function") {
                            callback = content;
                            content = title;
                            title = "";
                        }
                        if (!content) {
                            content = title;
                            title = "";
                        }
                        title = title || "温馨提示";
                        var that = this, options = { title: title, content: content };
                        if ($.isPlainObject(content)) {
                            options = content;
                        }
                        options.dialogType = "alert";
                        options.show = true;
                        callback = callback || function () { };
                        return new Dialog(this.dialogTemplate, options).on('onClose', callback);
                    },
                    confirm: function (title, content, confirmcallback, cancelcallback) {
                        if (typeof content == "function") {
                            cancelcallback = confirmcallback;
                            confirmcallback = content;
                            content = title;
                            title = "";
                        }
                        if (!content) {
                            content = title;
                            title = "";
                        }
                        title = title || "温馨提示";
                        var that = this, options = { title: title, content: content };
                        if ($.isPlainObject(content)) {
                            options = content;
                        }
                        options.dialogType = "confirm";
                        options.show = true;
                        confirmcallback = confirmcallback || function () { };
                        cancelcallback = cancelcallback || function () { };

                        return new Dialog(this.dialogTemplate, options).on('onClose', cancelcallback).on("onConfirm", confirmcallback);
                    },
                    windows: function (title, content, confirmcallback, cancelcallback) {
                        if (typeof content == "function") {
                            cancelcallback = confirmcallback;
                            confirmcallback = content;
                            content = title;
                            title = "";
                        }
                        if (!content) {
                            content = title;
                            title = "";
                        }
                        title = title || "温馨提示";
                        var that = this, options = { title: title, content: content, confirmCallback: confirmcallback, cancalCallback: cancelcallback };
                        if ($.isPlainObject(content)) {
                            options = content;
                        }
                        options.dialogType = "windows";
                        return new Dialog(this.dialogTemplate, options);
                    }

                };
            }());
            var dialog = createWidget("Dialog");
            var loading = (function () {
                var Loading = Widget.extend({
                    template: '<div style="position:fixed;background-color: rgba(0, 0, 0, 0.1);z-index:9999;top:0px;bottom:0px;right:0px;left:0px;"><div class="loading-sp3" ></div></div>',
                    initialize: function () {
                        var element = $(this.template);
                        this.element = element;
                    },
                    showLoading: function () {
                        this.element.appendTo(document.body)
                    },
                    hideLoading: function () {
                        this.element.remove();
                    }
                });
                return new Loading();
            }());

            exports.ui = {
                alert: _.bind(dialog.alert, dialog),
                confirm: _.bind(dialog.confirm, dialog),
                windows: _.bind(dialog.windows, dialog),
                showLoading: function () {
                    loading.showLoading();
                },
                hideLoading: function () {
                    loading.hideLoading();
                }
            };
        },
        // 数据持久存储
        function (module, exports, __require__) {
            var Storage = function (storage) {
                this.storage = storage
            }
            Storage.prototype = {
                constructor: Storage,
                setItem: function (name, data) {
                    var valuetype = Object.prototype.toString.call(data);
                    if (_.isObject(data) && !_.isFunction(data)) {
                        data = JSON.stringify(data);
                    }
                    this.storage.setItem("_" + name + "_type", valuetype)
                    this.storage.setItem(name, data);
                },
                getItem: function (name) {
                    var value, valuetype;
                    if (this.has(name)) {
                        value = this.storage.getItem(name)
                        valuetype = this.storage.getItem("_" + name + "_type");
                        if (valuetype == '[object Object]' || valuetype == '[object Array]') {
                            value = JSON.parse(value);
                        }
                    }
                    return value;
                },
                has: function (name) {
                    return this.storage.hasOwnProperty(name);
                },
                removeItem: function (name) {
                    if (this.has(name)) {
                        this.storage.removeItem(name);
                        this.storage.removeItem("_" + name + "_type");
                    }
                }
            };
            exports.sessionStorage = new Storage(window.sessionStorage);
            exports.localStorage = new Storage(window.localStorage)
        },
        //业务数据
        function (module, exports, __require__) {
            var storage = __require__(5), sessionStorage = storage.sessionStorage;
            exports.business = {
                getUserLoginInfo: function () {
                    return sessionStorage.getItem("UserLoginInfo");
                },
                getCurrentCity: function () {
                    var userLoginInfo = this.getUserLoginInfo();
                    return userLoginInfo && userLoginInfo.city || "上海";
                },
                getCaseId: function () {
                    var userinfo = this.getUserLoginInfo();
                    return userinfo&&userinfo.caseId;
                }
            };
        },
        //浏览器通用方法
        function (module, exports, __require__) {
            exports.browser = {
                getWindowSize: function () {
                    var h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                    var w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
                    return { h: h, w: w };
                }
            }
        }
    ]);
}));