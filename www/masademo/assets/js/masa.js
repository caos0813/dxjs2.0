/****
masa 框架
author:fanyonglong
核心文件：忽乱动
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
        return __require__(0).mixin(_.reduce(_.map(_.drop(modules), function (v, i) { return __require__(i + 1); }), function (a, b) { return _.defaults(a, b) }, {}));
    })([
        // 核心 0
        function (module, exports, __require__) {
            var extend = $.extend;
            exports = module.exports = {
                version: "1.0",
                _: _,
                $: $,
                Vue: Vue,
                mixin: function (protos) {
                    _.extend(this, protos);
                    return this;
                },
                hasInstanceof: function (obj, target) {
                    return obj instanceof target;
                },
                template: function (template) {
                    return _.template(template);
                },
                getUrlParams: function (name, url) {
                    url = url || location.search;
                    var sname = name + "=", len = sname.length, index = url.indexOf(sname), result, lastIndex;
                    if (index != -1) {
                        index += len;
                        lastIndex = url.indexOf("&", index);
                        result = lastIndex == -1 ? url.substring(index) : url.substring(index, lastIndex);
                    }
                    return result;
                },
                preventRepeat: function (fn) {
                    var object = {
                        state: '',
                        resolve: function () {
                            this.state = 'Resolved';
                        }
                    };
                    var resolve = object.resolve.bind(object);
                    return function () {
                        if (object.state == "Pending") {
                            return;
                        }
                        object.state = "Pending";
                        fn.apply(this, _.concat(resolve, _.toArray(arguments)));
                    }
                },
                osType: (function () {
                    var ua = window.navigator.userAgent.toLowerCase(),
                    android = ua.indexOf('android') != -1,
                    ios = ua.indexOf('iphone os') != -1,
                   ipad = ua.indexOf('ipad') != -1;

                    return {
                        isMobile: android || ios || ipad,
                        android: android,
                        ios: ios,
                        ipad: ipad
                    };
                }()),
                tailRecursion:function(f) {
                    var value;
                    var active = false;
                    var accumulated = [];
                    return function accumulator() {
                        accumulated.push(arguments);
                        if (!active) {
                            active = true;
                            while (accumulated.length) {
                                value = f.apply(this, accumulated.shift());
                            }
                            active = false;
                            return value;
                        }
                    };
                },
                recursionArray:function(id,data,IdField,ParentField) {
                        var childs = [], currentData=data, recursionData, index = 0, len;
                        var recursionFilter = exports.tailRecursion(function (id) {
                            recursionData = currentData.slice();
                            currentData = [];
                            recursionData.forEach(function (d, i) {
                                if (d[IdField] == id) {
                                    index++;
                                    childs.push(d);
                                } else if (d[ParentField] == id) {
                                    childs.push(d);
                                } else {
                                    currentData.push(d);
                                }
                            });
                            len = childs.length;
                            for (; index < len; index++) {
                                recursionFilter(childs[index][IdField]);
                            }    
                        });
                        recursionFilter(id,data);
                        return {
                            relationList: childs,
                            remainingList: currentData
                        };
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
        },
        // 事件 1
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
                            if (_.isBoolean(result)) {
                                return result;
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
                },
                triggerAll: function () {
                    if (!this.__events__) return this;
                    var i, len, keys = _.keys(this.__events__), args = _.slice(arguments, 0);
                    for (i = keys.length - 1; i >= 0; i--) {
                        this.trigger.apply(this, [keys[i]].concat(args));
                    }
                    return this;
                }
            };

        },
        // 视图 2
        function (module, exports, __require__) {
            var core_module0 = __require__(0), Class = core_module0.Class, View, delegateEventSplitter = /^(\S+)\s*(.*)$/, viewOptions;
            viewOptions = ['Model', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
            View = Class.extend({
                el: 'body',
                tagName: "div",
                __silentInit: false,
                constructor: function (options) {
                    this.cid = _.uniqueId('view');
                    options || (options = {});
                    _.extend(this, _.pick(options, viewOptions));
                    if (this.Model && !core_module0.hasInstanceof(this.Model, Vue)) {
                        if (!_.has(this.Model, "el")) {
                            this.Model.el = this.el;
                        }
                        this.Model = new Vue(this.Model);
                    }
                    this._ensureElement();
                    if (!this.__silentInit) {
                        this.initialize.apply(this, arguments);
                    }
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
                },
                showEmptyData: function () {
                    var elpagenodate = $("#pagenodate");
                    if (elpagenodate.length <= 0) {
                        $('body').append('<div class="no-data" id="pagenodate"><i class="iconfont icon-wushuju"></i></div>');
                    } else {
                        elpagenodate.show();
                    }
                },
                removeEmptyData: function () {
                    $("#pagenodate").remove();
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
        // 网络请求 3
        function (module, exports, __require__) {
            var configs = window.configs,
                responseStatus, core_module4 = __require__(4), core_module0 = __require__(0), noop = $.noop, globalAjaxSetting = {
                    inShowLoading: false,
                    isAutoCloseLoading: true,
                    loading: false
                };

            responseStatus = {
                'ok': "000",// 成功
                'customerError': "001", // 后台自定义错误
                'sessiontimeout': "002", // 登录失效
                'requestError': "999" // 请求错误

            };
            $.ajaxSetup({
                type: "GET",
                dataType: "json",
                global: true,
                timeout: 60000,
                beforeSend: function () {
                },
                error: function (e) {
                },
                complete: function () {

                },
                xhrFields: {
                    withCredentials: MASAGOLBALCONFINGS.env != 'production'
                }
            });

   
            var loginSessionTimeOut = _.once(function () {
                core_module4.ui.alert("登录超时！请重新登录", function () {
                    if (window.top !== window.self) {
                        __require__(6).business.goLoginPage(window.top);
                    } else {
                        __require__(6).business.goLoginPage();
                    }
                });
            });
            $(document).ajaxStart(function (e) {
                if (globalAjaxSetting.inShowLoading && !globalAjaxSetting.loading) {
                    globalAjaxSetting.loading = true;
                    core_module4.ui.showLoading();
                }
                
            });
            $(document).ajaxSend(function (evt, request, settings) {
            });
            $(document).ajaxComplete(function (evt, request, settings) {
            });
            $(document).ajaxStop(function () {
                if (globalAjaxSetting.loading && globalAjaxSetting.isAutoCloseLoading) {
                    globalAjaxSetting.loading = false;
                    core_module4.ui.hideLoading();
                }
            });
            function wrapReuqest(options) {
                var fialCallback = noop, successCallback = noop, failCallbacks = $.Callbacks('once memory');
                function wrapSuccess(callback) {
                    successCallback = _.isFunction(callback) ? callback : noop;
                    return options.isWrapAjax ? function (d) {
                        var retStatus = d.retStatus, retMsg = d.retMsg || "访问服务器出错";
                        if (retStatus == responseStatus.ok) {
                            return successCallback.call(this, d.retBody, d);
                        } else if (retStatus == responseStatus.sessiontimeout) {
                            loginSessionTimeOut();
                            return;
                        } else {
                            !options.isCustomerError && core_module4.ui.alert(retMsg);
                            return fialCallback.call(this, retStatus, retMsg, d);
                        }
                    } : successCallback;
                }
                function wrapFail(callback) {
                    fialCallback = _.isFunction(callback) ? callback : noop;
                    return function (e, errortext) {
                        if (!options.isCustomerError) {
                            if (errortext == "timeout") {
                                core_module4.ui.alert('网络请求超时');
                            } else if (errortext == 'parsererror') {
                                core_module4.ui.alert('系统出错了');
                            }
                        }
                        return fialCallback.call(this, responseStatus.requestError, errortext, e);
                    }
                }
                function retryRequest() {
                    sendRequest(options);
                }
                function sendRequest(options) {
                    var ajax = $.ajax(options), then = ajax.then, done = ajax.done;
                    return _.extend(ajax, {
                        then: function (scb, ecb) {
                            var success = wrapSuccess(scb), dthen;
                            var deferred = $.Deferred();
                            then(function () {
                                var result = success.apply(this, arguments);
                                if (_.isPlainObject(result) && result.promise) {
                                    result.done(function () {
                                        deferred.resolveWith(this, arguments);
                                    }).fail(function () {
                                        deferred.rejectWith(this, arguments)
                                    });
                                }
                            }, wrapFail(ecb));
                            return deferred;
                        },
                        done: function (cb) {
                            done(wrapSuccess(cb));
                            return ajax;
                        },
                        fail: function (cb) {
                            failCallbacks.add(cb);
                            return ajax;
                        }
                    });
                }
                if (typeof options.data == "function") {
                    options.data = options.data();
                }
                options.data = options.data || {};
                options.error = wrapFail(function () {
                    failCallbacks.fireWith(this, arguments);
                });             
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
            module.exports.request = request;
            module.exports.getRequest = getRequest;
            module.exports.postRequest = postRequest;
            module.exports.responseStatus = responseStatus
        },
        // UI组件 4
        function (module, exports, __require__) {
            var core_module0 = __require__(0), Class = core_module0.Class, Widget, widgets = {}, browser = __require__(7).browser, core_module9 = __require__(9);
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
                parseDataSource: function (dataSource) {
                    return core_module0.hasInstanceof(dataSource, core_module9.DataSource) ? dataSource : core_module9.DataSource(dataSource);
                },
                delegateEvents: function (element, name, selector, handler) {
                    var that = this;
                    if (typeof selector == "function") {
                        handler = selector;
                        selector = null;
                    }
                    name = name.split(' ');
                    name = _.map(name, function (n) {
                        if (n.indexOf('.') == -1) {
                            return n + "." + that.widgetid;
                        }
                        return n;
                    });
                    element.on(name.join(' '), selector, handler);
                },
                undelegateEvents: function (element, name) {
                    name = name || this.widgetid;
                    element.off("." + name);
                },
                setOptions: function (options) {
                    this.options = $.extend({}, this.options, options);
                },
                setEvents: function (options) {
                    this.on(_.pick(options, this.events));
                },
                getElementBoundary: function (element) {
                    element = $(element);
                    var offset = element.offset(), h = element.outerHeight(), w = element.outerWidth(), l = offset.left, t = offset.top;
                    return [l, t, l + w, t + h];
                },
                containsBoundaryByElement: function (element, x, y) {
                    var boundarys = this.getElementBoundary(element);
                    return boundarys[0] <= x && boundarys[2] >= x && boundarys[1] <= y && boundarys[3] >= y;
                },
                destroy: function () {
                }
            });
            Widget.mixin(__require__(1).Events);
            function extendWidget(name, proto, staticProto, parent) {
                if (widgets[name]) {
                    throw "already exist";
                }
                var prentWidget = _.isString(parent) ? widgets[parent] || Widget : Widget;
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
                var widget = getWidget(name);
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
                    zIndex = 10001,
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
                            offsetLeft: 0
                        },
                        events: ['onConfirm', 'onClose', 'onShown', 'onShow'],
                        initialize: function (dialogTemplate, options) {
                            zIndex++;
                            var that = this;
                            that.__super__.initialize.call(that, options);
                            that.dialogTemplate = dialogTemplate;
                            that.init();
                        },
                        setPosition: function () {
                            if (this.options.position == 'none') {
                                return;
                            }
                            var that = this, element = that.dialogWrapper, options = that.options, position = options.position, h = options.offsetTop, oL = options.offsetLeft
                                , doc, w, pt, pl, width = element.outerWidth(), height = element.outerHeight();
                            if (position == 'center') {
                                w = browser.getWindowSize();
                                pt = (w.h - height) / 2 - h;
                            }
                            else if (position == 'top') {
                                pt = h;
                            } else if (position == 'middle') {
                                w = browser.getWindowSize();
                                pt = (w.h - height) / 2 - h;
                                pl = (w.w - width) / 2 - oL;
                                element.css('left', Math.max(pl, 0));
                            }
                            element.css('top', Math.max(pt, 0));
                        },
                        init: function () {
                            var that = this, options = that.options;
                            that.on('onShow', that.setPosition);
                            var element = that.element = $(that.dialogTemplate(options)).hide().appendTo('body');
                            that.dialogWrapper = element.find('.modal-dialog');
                            element.css('zIndex', zIndex);
                            element.find('.modal-dialog').css(options.styles);
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
                                that.on("onConfirmEnd", function () {
                                    this.off('onClose');
                                    this.remove();
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
                            zIndex--;
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
                            if (this.trigger('onConfirm', e) !== false) {
                                this.trigger('onConfirmEnd', e);
                            }
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
                        that.dialogTemplate = '<%if(dialogType=="alert"){%><div class="modal fade bs-example-modal-sm"  ><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close"  data-command="close" ><span >&times;</span></button><h4 class="modal-title" ><%-title%></h4></div><div class="modal-body"><p><%=content%></p></div><div class="modal-footer btn_1"><button type="button" class="btn btn-primary" data-command="close"><%-confirmText%></button></div></div></div></div><%}else if(dialogType=="confirm"){%><div class="modal fade bs-example-modal-sm" ><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-command="close"><span>&times;</span></button><h4 class="modal-title"><%-title%></h4></div><div class="modal-body"><p><%=content%></p></div><div class="modal-footer btn_1"><button type="button" class="btn btn-danger" data-command="close"><%-cancelText%></button><button type="button" class="btn btn-primary" data-command="confirm"><%-confirmText%></button></div></div></div></div><%}else if(dialogType=="windows"){%><div class="modal fade" ><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-command="close"><span>&times;</span></button><h4 class="modal-title"><%-title%></h4></div><div class="modal-body"></div><div class="modal-footer btn_1"><button type="button" data-command="close" class="btn btn-danger" style="min-width:120px" ><%-cancelText%></button><button type="button"   data-command="confirm" class="btn btn-primary" style="min-width:120px"><%-confirmText%></button></div></div></div></div><%}%>';
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
            extendWidget("RangeSlider", function () {
                var defaultOptions = {
                    lineHeight: 5,
                    splitWidth: 18,
                    lineTop: '1px',
                    step: 1,
                    width: 400,
                    splits: [],  // 分割线数据集 
                    lineFillStyle: "#0094ff",
                    lineFillStyleGray: "#cac7c7"
                };
                return {
                    initialize: function (element, options) {
                        element = $(element);
                        var that = this;
                        that.wrapper = element;
                        that.options = options = $.extend({}, defaultOptions, options);
                        that.init();
                        that._initEvents();
                        that._render();
                    },
                    init: function () {
                        var that = this, wrapper = that.wrapper, header = $('<div class="range-header"></div>').appendTo(wrapper), container = $('<div class="range-container"></div>').appendTo(wrapper), blueProcess, grayProcess;
                        that.wrapper.addClass('range-wrapper');
                        blueProcess = $('<div class="range-process range-blue">  <div class="range-lines"></div><div class="range-btns"></div></div>').appendTo(container);
                        grayProcess = $('<div class="range-process range-gray"><div class="range-lines"></div> <div class="range-btns"></div></div>').appendTo(container);
                        that._onRangeChange = that.options.onRangeChange || $.noop;
                        that._onRangeMove = that.options.onRangeMove || $.noop;
                        that._blueProcess = blueProcess;
                        that._grayProcess = grayProcess;
                    },
                    _createText: function (text, left, options) {
                        var text = $(' <span class="range-text"></span>').text(text), top = 0, width = options.width || 'auto';
                        if (options.offset) {
                            left = left + options.offset[0];
                            top = options.offset[1];
                        }
                        text.css({ left: left + "px", top: top + "px", width: width });
                        return text;
                    },
                    _createSplit: function (index, x, options) {
                        var text = $('<span class="range-btn"> </span>');
                        text.attr('data-value', options.value).attr('data-position', x).attr('data-index', index);
                        text.css({ left: x + "px" });
                        return text;
                    },
                    _initEvents: function () {
                        this._blueProcess.on('mousedown.dxrange', '.range-btn', $.proxy(this._onDown, this));
                    },
                    _getDefaultData: function (element) {
                        if (element.length <= 0) {
                            return null;
                        }
                        var value = Number(element.attr('data-value')),
                            position = Number(element.attr('data-position')),
                            left = parseFloat(element.css('left')),
                                index = Number(element.attr('data-index'));
                        return {
                            element: element,
                            value: value,
                            position: position,
                            left: left,
                            index: index
                        };
                    },
                    _onDown: function (e) {
                        var that = this, element = $(e.currentTarget), value = element.attr('data-value');
                        if (e.button != 0) {
                            return;
                        }
                        that._eventData = {
                            prev: that._getDefaultData(element.prev('.range-btn')),
                            current: that._getDefaultData(element),
                            next: that._getDefaultData(element.next('.range-btn')),
                            x: e.pageX,
                            y: e.pageY
                        };
                        $(window).on('mousemove.docdxrange', $.proxy(this._onMove, this));
                        $(window).on('mouseup.docdxrange', $.proxy(this._onUp, this));
                        e.preventDefault();
                    },
                    _onUp: function (e) {
                        if (e.button != 0) {
                            return;
                        }
                        $(window).off('.docdxrange');
                        if (this._eventData) {
                            this._onRangeChange(this._eventData.current);
                        }
                    },
                    _onMove: function (e) {
                        var that = this, pageX = e.pageX,
                            eventData = that._eventData,
                            current = eventData.current,
                            maxCount = that._maxCount,
                            splitW = that._splitW,
                            maxWidth = that._width,
                            minWidth = 0,
                            splitBtnWidth = that.options.splitWidth,
                            left,
                            startX = eventData.x,
                            w = that._width / 100,
                            step = that.options.step,
                            next = eventData.next,
                            prev = eventData.prev,
                            minOffset = 0,
                            maxOffset = 0,
                            moveStatus = parseInt(current.element.css('left')) < current.position ? -1 : pageX == startX ? 0 : 1;
                        if (current.element && moveStatus != 0) {
                            var selectValue, value = current.value, maxValue, offset = pageX - startX, mstep, maxOffset2 = splitW - splitBtnWidth, stepX, maxStep, left = current.left + offset;

                            if (moveStatus == -1 && prev) {
                                maxValue = current.value - prev.value;
                            } else if (moveStatus == 1 && next) {
                                maxValue = next.value - current.value;
                            } else if (moveStatus == 1) {
                                maxValue = current.value - prev.value;

                            } else if (moveStatus == -1) {
                                maxValue = next.value - current.value;
                            }
                            maxValue = maxValue;
                            maxStep = parseInt(maxValue / step);
                            stepX = parseFloat(maxOffset2 / maxStep);

                            minOffset = prev == null ? current.position : (prev.left < prev.position ? prev.position : prev.left) + splitBtnWidth;
                            maxOffset = next == null ? current.position : (next.left > next.position ? next.position : next.left) - splitBtnWidth;
                            left = Math.min(Math.max(left, minOffset), maxOffset);
                            if (Math.abs(left - current.position) < 2) {
                                left = current.position;
                            }
                            var currentStep = parseInt((current.position - left) / stepX), nvalueStep = currentStep * step, selectValue = value - nvalueStep;
                            if (left >= minOffset && left <= maxOffset) {

                                current.element.css({ left: left + 'px' });
                                eventData.current.selectValue = selectValue;
                                if (eventData._oldValue != selectValue) {
                                    that._onRangeMove(current);
                                }
                                eventData._oldValue = selectValue;
                            }
                            that.drawLine();
                        }
                    },
                    drawLine: function () {
                        var that = this, ctx = that.ctx, blues = this._blues, i = 0, len = blues.length, element, value, position, left, height = that.options.lineHeight, splitWidth = that.options.splitWidth;
                        that.drawLines();
                        ctx.fillStyle = that.options.lineFillStyleGray;
                        for (; i < len; i++) {
                            element = blues[i];
                            value = Number(element.attr('data-value'));
                            position = Number(element.attr('data-position'));
                            left = parseFloat(element.css('left'));
                            if (left == position) {
                                continue;
                            }
                            if (left > position) {
                                ctx.fillRect(position + splitWidth, 0, left - position, height);
                            } else {
                                ctx.fillRect(position, 0, left - position, height);
                            }
                        }
                    },
                    drawLines: function () {
                        var that = this, ctx = that.ctx, lines = that._lines, i = 0, len = lines.length, line, width = that._width, height = that.options.lineHeight;
                        ctx.clearRect(0, 0, width, height);
                        ctx.fillStyle = that.options.lineFillStyle;
                        for (; i < len; i++) {
                            line = lines[i];
                            ctx.fillRect(line.x, 0, line.w, height);
                        }
                    },
                    _initLines: function () {
                        var that = this, width = that._width, height = that.options.lineHeight;
                        var cvs = document.createElement('canvas');
                        cvs.width = width;
                        cvs.height = height;
                        cvs.style.position = "absolute";
                        cvs.style.top = that.options.lineTop;
                        var ctx = cvs.getContext('2d');
                        that.ctx = ctx;
                        that._blueProcess.children('.range-lines').append(cvs)
                        that.drawLines();
                    },
                    _render: function (text) {
                        var that = this,
                            offsetX = that.options.splitWidth,
                            width = that.wrapper.width(),
                            texts = [],
                            lines = [],
                            grays = [],
                            blues = [],
                            lines = that.lines = [],
                            options = that.options,
                            text,
                            line,
                            sbtn,
                            splits = options.splits,
                            i = 0,
                            splitsLen = splits.length,
                            len = splitsLen - 1,
                            splitValue, left, top, splitW = parseInt(width / len);
                        for (; i <= len; i++) {
                            splitValue = splits[i];
                            left = i * splitW;
                            text = that._createText(splitValue.title, left, splitValue);
                            texts.push(text);
                            sbtn = that._createSplit(i, left, splitValue);
                            blues.push(sbtn);
                            grays.push(sbtn.clone());
                            if (i < len) {
                                lines.push({
                                    x: i * splitW + offsetX,
                                    w: splitW - offsetX
                                });
                            }
                        }
                        that._lines = lines;
                        that._blues = blues;
                        that._width = width;
                        that._maxCount = splitsLen
                        that._splitW = splitW;
                        that.wrapper.children('.range-header').append(texts);
                        that._blueProcess.children('.range-btns').append(blues);
                        that._grayProcess.children('.range-btns').append(grays);
                        that._initLines();
                    }
                };
            }());
            extendWidget('AutoComplete', function () {
                var KEYS = {
                    ENTER: 13,
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                };
                return {
                    options: {
                        template: '<div class="auto-complete-container" style="z-index:9"></div>',  // 默认模板，可自定义模板，可扩展
                        container: "<ul>",   // 容易 ,可自定义扩展
                        content: "",  // 容器选择器 ,默认为空 ，使用container 作为容器。可扩展
                        itemTemplate: '<li><%=obj[$field]%><li>', // 数据项模板，可自定义 可扩展，
                        errorMessage: '', // 当搜索请求错误显示信息
                        emptyMessage: '', // 当数据为空显示信息
                        serverFilter: true, // 是否开启 服务器过滤模式，如果为false ，可配合静态数据集过滤
                        offset: [0, 0], // 自动补全层，偏离位置 ，width*height
                        dataValueField: "value", // 服务器请求过滤字段
                        dataTextField: "text", // 
                        isKey: false,
                        enterClass: "current",
                        debounce: 500,
                        inputLen: 0,
                        source: null // 数据源 详情查看 masa.DataSource 数据源对象
                    },
                    events: ['onRender'],
                    initialize: function (element, options) {
                        _.bindAll(this, "_onInputChange", "_dataHandler", "_errorHandler", "_onContentHandler", "_onFocus", '_command', '_keydown');
                        Widget.prototype.initialize.call(this, options);
                        this.source = this.parseDataSource(this.options.source);
                        this.element = $(element).attr({
                            autocomplete: 'off'
                        });
                        this.render();
                        this.source.then(this._dataHandler, this._errorHandler);
                        this.initEvents();
                        this.currentIndex = -1;
                    },
                    initEvents: function () {
                        var that = this;
                        that._onDbInputChange = _.debounce(that._onInputChange, that.options.debounce);
                        that.delegateEvents(that.element, "keydown", that._keydown);
                        that.delegateEvents(that.element, "focus", that._onFocus);
                        that.delegateEvents(that.wrapper, "click", '[data-command]', that._command);
                    },
                    _keydown: function (e) {
                        var key = e.keyCode, that = this;
                        if (that.options.isKey) {
                            if (key == KEYS.UP) {
                                that._move(that.currentIndex - 1);
                                e.preventDefault();
                                return;
                            } else if (key == KEYS.DOWN) {
                                that._move(that.currentIndex + 1);
                                e.preventDefault();
                                return;
                            } else if (key == KEYS.ENTER) {
                                if (that.trigger('onKeyEnter', that.getItemData(that.currentIndex)) !== false) {
                                    that.hide();
                                }
                                e.preventDefault();
                                return;
                            }
                        }
                        that._onDbInputChange();
                    },
                    _move: function (index) {
                        var that = this, children = that.container.children(), len = children.length, enterClass = that.options.enterClass;
                        if (index < 0) {
                            index = len - 1;
                        } else if (index >= len) {
                            index = 0;
                        }
                        that.currentIndex = index;
                        that.container.children().eq(index).addClass(enterClass).siblings().removeClass(enterClass);
                    },
                    _onFocus: function () {
                        if (!this.isOpen)
                        {
                            this._onInputChange();
                        }
                        this.undelegateEvents($(document));
                        this.delegateEvents($(document), "mousedown", this._onContentHandler);
                    },
                    _onContentHandler: function (e) {
                        var element = $(e.target);
                        if (e.button != 0) {
                            return;
                        }
                        if (element.is(this.element) || element.is(this.wrapper) || this.wrapper.has(element).length) {
                            return;
                        }
                        this.undelegateEvents($(document));
                        this.hide();
                    },
                    _command: function (e) {
                        var element = e.currentTarget, command = element.getAttribute('data-command');
                        this.trigger('on' + _.upperFirst(command), e);
                    },
                    getItemData: function (index) {
                        return this.source.getItemData(index);
                    },
                    _onInputChange: function (e) {
                        var that = this, element = that.element, value = _.trim(element.val()), data = {}, inputLen = that.options.inputLen;
                        that.isContent = false;
                        data[that.options.dataValueField] = value;
                        if (value.length > inputLen) {
                            that.show();
                            that.source.read(data);
                        } else {
                            that.hide();
                        }
                    },
                    setPosition: function () {
                        var that = this, element = that.element, wrapper = that.wrapper, options = that.options, offset = options.offset, left, top, orgOffset = element.offset();
                        left = orgOffset.left + offset[0];
                        top = orgOffset.top + element.outerHeight() + offset[1];
                        wrapper.css({
                            left: left,
                            top: top
                        });
                    },
                    show: function () {
                        var that = this;
                        that.isOpen=true;
                        that.currentIndex = -1;
                        that.setPosition();
                        that.wrapper.show();
                    },
                    hide: function () {
                        var that = this;
                        that.isOpen=false;
                        that.wrapper.hide();
                    },
                    _errorHandler: function () {
                        this.wrapper.html(this.options.emptyMessage);
                    },
                    _filterHandler: function (d) {
                        var that = this, options = that.options, dataValueField = options.dataValueField, value = _.trim(that.element.val());
                        return _.filter(d, function (item) {
                            return _.startsWith(item[dataValueField], value);
                        });
                    },
                    _dataHandler: function (d) {
                        if (!this.options.serverFilter) {
                            d = this._filterHandler(d);
                        }
                        this._template(d);
                    },
                    _initTempalte: function () {
                        var that = this, options = that.options, dataTextField = options.dataTextField, container = $(options.container), content = options.content, itemTemplate = options.itemTemplate, emptyMessage = options.emptyMessage;
                        if (typeof itemTemplate != "function") {
                            itemTemplate = _.template(itemTemplate)
                        }
                        if (content != "") {
                            container = container.find(content);
                        }
                        that.container = container;
                        that._template = function (d) {
                            var result, len = d.length;
                            if (len) {
                                result = _.map(d, function (item, index) {
                                    item = _.extend({}, item);
                                    item.$index = index;
                                    item.$prent = d;
                                    item.$field = dataTextField;
                                    return itemTemplate(item);
                                })
                                result = container.html(result);
                            } else {
                                result = emptyMessage;
                            }
                            if (result) {
                                that.wrapper.html(result)
                                that.show();
                            } else {
                                that.hide();
                            }

                        }

                    },
                    render: function () {
                        var that = this;
                        var wrapper = $(that.options.template).hide();
                        wrapper.appendTo(document.body);
                        that.wrapper = wrapper;
                        that._initTempalte();
                        that.trigger('onRender');
                    },
                    destroy: function () {
                        this.undelegateEvents(this.element);
                    }
                };

            }());
            extendWidget('AutoCompleteBox', {
                options: {
                    template: '<div class="people-box"></div>',  // 默认模板，可自定义模板，可扩展
                    itemTemplate: '<li data-command="addItem"><%=obj[$field]%></li>', // 数据项模板，可自定义 可扩展，
                    contentContainer: "<ul>",   // 容易 ,可自定义扩展
                    content: "",  // 容器选择器 ,默认为空 ，使用container 作为容器。可扩展
                    inputTemplate: '<div class="people-item" data-command="removeItem"><%=obj[$field]%></div>',
                    popupTemplate: '<div class="people-placeholder" style="z-index:9;display:none"></div>',
                    emptyMessage: '', // 当数据为空显示信息
                    offset: [0, 0], // 自动补全层，偏离位置 ，width*height
                    serverFilter: true,
                    isKey: false,
                    dataValueField: "name",
                    dataTextField: "name",
                    primaryKey: "id",
                    parentId: "parentId",
                    enterClass: "current",
                    inputLen: 0,
                    debounce: 500,
                    source: null // 数据源 详情查看 masa.DataSource 数据源对象
                },
                events: ['onRender', 'onAddValue', 'onEmptyData'],
                initialize: function (element, options) {
                    this.__super__.initialize.call(this, element, options);
                    this.inputValues = [];
                    this.on('onRemoveItem', _.bind(this.onRemoveItem, this));
                    this.on('onAddItem', _.bind(this.onAddItem, this));
                },
                initTemplate: function () {
                    var that = this, options = that.options, content = options.content, itemTemplate = options.itemTemplate, inputTemplate = options.inputTemplate, contentContainer = $(options.contentContainer), dataValueField = options.dataValueField, dataTextField = options.dataTextField;

                    if (content != "") {
                        contentContainer = contentContainer.find(content);
                    }
                    that.contentContainer = contentContainer;
                    if (typeof itemTemplate != "function") {
                        itemTemplate = _.template(itemTemplate, {
                            imports: {
                                '$field': dataTextField
                            }
                        });
                    }

                    if (typeof inputTemplate != "function") {
                        that.inputTemplate = _.template(inputTemplate, {
                            imports: {
                                '$field': dataTextField
                            }
                        });
                    }
                    this._template = function (d) {
                        var result, len = d.length;
                        if (len) {
                            result = _.map(d, function (item, index) {
                                item = _.extend({}, item);
                                item.$index = index;
                                item.$prent = d;
                                item.$field = dataTextField;
                                return itemTemplate(item);
                            })
                            result = contentContainer.html(result);
                        } else {
                            result = emptyMessage;
                        }
                        if (result) {
                            that.wrapper.html(result)
                            that.show();
                        } else {
                            that.hide();
                        }
                    }
                },
                _move: function (index) {
                    var that = this, children = that.contentContainer.children(), len = children.length, enterClass = that.options.enterClass;
                    if (index < 0) {
                        index = len - 1;
                    } else if (index >= len) {
                        index = 0;
                    }
                    that.currentIndex = index;
                    that.contentContainer.children().eq(index).addClass(enterClass).siblings().removeClass(enterClass);
                },
                initEvents: function () {
                    var that = this;
                    that._onDbInputChange = _.debounce(that._onInputChange, that.options.debounce);
                    that.delegateEvents(that.element, "keydown", that._keydown);
                    that.delegateEvents(that.element, "focus", that._onFocus);
                    that.delegateEvents(that.container, "click", '[data-command]', that._command);
                },
                onAddItem: function (e) {
                    var index = $(e.currentTarget).index();
                    this.addValue(this.source.data[index]);
                },
                onRemoveItem: function (e) {
                    this.removeValue($(e.currentTarget).index());
                },
                removeValue: function (index) {
                    this.container.find('.people-item').eq(index).remove();
                    this.inputValues.splice(index, 1);
                },
                isEixstValue: function (data) {
                    var that = this, primaryKey = that.options.primaryKey;
                    return _.some(this.inputValues, function (d) {
                        return data[primaryKey] == d[primaryKey];
                    });
                },
                setPosition: function () {
                    var that = this, element = that.element, wrapper = that.wrapper, options = that.options, offset = options.offset, left, top, orgOffset = element.position();
                    left = orgOffset.left + offset[0];
                    top = orgOffset.top + element.outerHeight() + offset[1];
                    wrapper.css({
                        left: left,
                        top: top
                    });
                },
                addValue: function (data) {
                    if (this.isEixstValue(data)) {
                        return;
                    }
                    var itemdata = _.clone(data);
                    this.inputValues.push(itemdata);
                    this.element.before(this.inputTemplate(itemdata));
                    this.trigger('onAddValue');
                },
                render: function () {
                    var that = this;
                    var container = $(that.options.template), wrapper = $(that.options.popupTemplate);
                    that.element.wrap(container);
                    that.element.after(wrapper);
                    that.container = that.element.parent();
                    that.wrapper = wrapper;
                    that.initTemplate();
                    that.trigger('onRender');

                },
                _emptyHandler: function () {
                    this.trigger('onEmptyData');
                }

            }, null, "AutoComplete");
            extendWidget('Grid', function () {

                function Colgroups(columns) {
                    this.colgroups = [];
                    this.addColgroups(columns);
                }
                Colgroups.prototype.addColgroups = function (columns) {
                    var i = 0, len = columns.length, column, col, colgroups = this.colgroups;
                    for (; i < len; i++) {
                        column = columns[i];
                        col = $('<col />');
                        if (column.width) {
                            col.css("width", column.width)
                        }
                        colgroups.push(col);
                    }
                }
                Colgroups.prototype.render = function (element) {
                    element.append(this.colgroups);
                }
                function GridColumn(parent, options) {
                    var tagName = options.tagName || "td";
                    this.parent = parent;
                    this.element = document.createElement(tagName);
                    this.field = options.field;
                    this.styles = options.styles;
                    this.format = options.format;
                    this.commands = options.commands;
                    this.innerHTML = options.innerHTML || '';
                    this.isCompile = !!options.isCompile;
                    this._initTemplate();
                    this.render();
                }
                GridColumn.prototype._initTemplate = function () {
                    var template = this.format;
                    if (!this.isCompile) {
                        return;
                    }
                    if (!this.format) {
                        template = '<%-' + this.field + '%>';
                    }
                    if (this.commands && _.isArray(this.commands)) {
                        template = _.map(this.commands, function (d) {
                            if (d.format) {
                                return d.format;
                            }
                            return GridColumn.settings.temlate[d.name] || '';
                        }).join("");
                    }
                    if (typeof template == "string") {
                        this._template = _.template(template);
                    } else {
                        this._template = template;
                    }
                }
                GridColumn.prototype._trigger = function (name, e) {
                    var that = this, c = _.find(that.commands, { name: name });
                    c && typeof c.command == "function" && c.command.call(that, that.parent.data, e);
                }

                GridColumn.prototype.render = function () {
                    var innerHTML = this.innerHTML;
                    if (this.isCompile) {
                        innerHTML = this._template(this.parent.data);
                    }
                    if (this.styles) {
                        $(this.element).css(this.styles);
                    }
                    this.innerHTML = innerHTML;
                    this.element.innerHTML = innerHTML;
                }
                GridColumn.settings = {
                    titles: {
                        detail: "查看",
                        del: "删除",
                        edit: "编辑"
                    },
                    temlate: {
                        detail: '<a href="#"  data-command="detail" title="查看">查看</a>',
                        del: '<a href="#"  data-command="del" title="删除">删除</a>',
                        edit: '<a href="#"  data-command="edit" title="编辑">编辑</a>',

                    }
                };
                function GridRow(parent, data) {
                    this.parent = parent;
                    this.rowid = _.uniqueId('g_r_uid');
                    var container = $('<tr>').attr('data-uid', this.rowid);
                    this.data = data;
                    this.columns = [];
                    container.on('click.' + this.rowid, '[data-command]', _.bind(this._cellHandler, this));
                    this.container = container[0];
                }

                GridRow.prototype.addColumn = function (options) {
                    var that = this, column = new GridColumn(that, options);
                    that.columns.push(column);
                }
                GridRow.prototype.addColumns = function (columns) {
                    var i = 0, len = columns.length;
                    for (; i < len; i++) {
                        this.addColumn(columns[i]);
                    }
                }
                GridRow.prototype.remove = function () {
                    $(this.container).remove();
                }
                GridRow.prototype._cellHandler = function (e) {
                    var element = $(e.currentTarget), name = element.attr('data-command'), parent = element.closest('td,th'), cloumn;
                    if (parent.length) {
                        cloumn = _.find(this.columns, function (c) { return c.element === parent[0]; });
                        if (cloumn) {
                            cloumn._trigger(name, e);
                            e.preventDefault();
                        }
                    }

                }
                GridRow.prototype.render = function () {
                    $(this.container).append(_.map(this.columns, "element"));
                }
                function GridRows(grid) {
                    this.grid = grid;
                    this.headerRows = [];
                    this.rows = [];
                    this.grid.on('_readData', _.bind(this._readData, this));
                    this.initColgroups();
                    this.initHeader();
                }
                GridRows.prototype.initColgroups = function () {
                    var that = this, cols = new Colgroups(that.grid._columns);
                    cols.render(that.grid.container.children('colgroup'));
                }
                GridRows.prototype.initHeader = function () {
                    var that = this, columns = this.grid._columns, headRow = new GridRow(that);
                    var headerColumns = _.map(columns, function (c) {
                        return {
                            tagName: "th",
                            styles: c.headStyles,
                            innerHTML: c.title
                        };
                    });

                    headRow.addColumns(headerColumns);
                    headRow.render();
                    that.grid.container.children("thead").append(headRow.container);
                    this.headerRows.push(headRow);
                }
                GridRows.prototype._readData = function (data) {
                    this.removeRows();
                    this.addRows(data);
                    this.renderRows();
                }
                GridRows.prototype.renderRows = function (data) {
                    var that = this, rows = this.rows;
                    that.grid.container.children("tbody").html(_.map(rows, "container"));
                }
                GridRows.prototype.addRow = function (rowdata, columns) {
                    var that = this, row = new GridRow(that, rowdata);
                    row.addColumns(columns);
                    row.render();
                    that.rows.push(row);
                    that.grid.trigger('onItemBound', rowdata, columns);
                }
                GridRows.prototype.addRows = function (data) {
                    var that = this, columns = this.grid._columns;
                    var rowColumns = _.map(columns, function (c) {
                        return {
                            styles: c.styles,
                            isCompile: true,
                            field: c.field,
                            format: c.format,
                            commands: c.commands
                        };
                    });
                    _.each(data, function (rowData) {
                        that.addRow(rowData, rowColumns);
                    });

                }
                GridRows.prototype.removeRows = function () {
                    var that = this, rows = this.rows, i = 0, len = rows.length;
                    for (; i < len; i++) {
                        rows[i].remove();
                    }
                    this.rows = [];
                }
                return {
                    options: {
                        dataSource: null,
                        columns: null,
                        pager: null,
                        tableClass: "table",
                        emptyMsg: "没有任何记录",
                        errorMsg: "请求数据失败",
                        autoBind: true
                    },
                    events: ['onItemBound', 'onDataBound'],
                    initialize: function (element, options) {
                        this.__super__.initialize.call(this, options);
                        options = this.options;
                        _.bindAll(this, '_success', '_fail');
                        var that = this, wrapper = $(element);
                        that._columns = that.options.columns;
                        that.dataSource = that.parseDataSource(this.options.dataSource);
                        that.dataSource.then(that._success, that._fail);
                        that.wrapper = wrapper;
                        that.render();
                        that._initPager();
                        that.gridRows = new GridRows(that);
                        that.layerLoading = new LayerLoading(that.wrapper)
                        if (that.options.autoBind) {
                            that.read();
                        }

                    },
                    render: function () {
                        var that = this, container;
                        container = $('<table>');
                        container.html('<colgroup></<colgroup><thead></thead><tbody></tbody>').addClass(that.options.tableClass);
                        that.container = container;
                        that.wrapper.html(container);

                    },
                    _initPager: function () {
                        var that = this, options = that.options, pager = options.pager, element;
                        if (pager) {
                            if (_.isBoolean(pager)) {
                                pager = {};
                            }
                            if (!(pager instanceof getWidget('Pager'))) {
                                element = pager.element;
                                if (!element) {
                                    element = $('<div>').appendTo(that.wrapper);
                                }
                                if (!pager.dataSource) {
                                    pager.dataSource = that.dataSource;
                                }
                                pager = createWidget("Pager", element, options.pager);
                            }
                            that.pager = pager;
                            that.pager.on("onPageChange", _.bind(this._pageChange, this))
                        }
                    },
                    _pageChange: function (curerntIndex) {
                        this.trigger("onPageChange", curerntIndex);
                    },
                    _onCellHandler: function (e) {
                        this.trigger('_cellHandler', e);
                    },
                    refresh: function (data) {
                        this.dataSource.refresh(data);
                    },
                    read: function (data) {
                        this.layerLoading.showLoading();
                        if (this.pager) {
                            this.pager.read(data);
                        } else {
                            this.dataSource.read(data);
                        }
                    },
                    _success: function (d) {
                        this.layerLoading.hideLoading();
                        this._removeMsg();
                        if (d.length <= 0) {
                            this._showEmptyMsg();
                        } else {
                            this.trigger('_readData', d);
                        }
                        this.trigger('onDataBound', d);
                    },
                    _showEmptyMsg: function () {
                        this.wrapper.children('table').after('<div class="emptyMsg" style="text-align:center">' + this.options.emptyMsg + '</div>');
                    },
                    _removeMsg: function () {
                        this.wrapper.children('.errorMsg').remove();
                        this.wrapper.children('.emptyMsg').remove();
                    },
                    _fail: function (status, msg) {
                        var mess = msg || this.options.errorMsg;
                        this.layerLoading.hideLoading();
                        this.wrapper.children('table').after('<div class="errorMsg" style="text-align:center">' + mess + '</div>');
                    }
                }
            }());
            extendWidget("Pager", {
                options: {
                    dataSource: null,
                    pageSize: 10,
                    parseTotal: function (d) {
                        return d.totalCount;
                    },
                    pageIndexField: "pageIndex",
                    pageSizeField: "pageSize",
                    pagerClass: "pagination",
                    isSkip: false,
                    template: '<ul><li class="btn-first-page"><a href="javascript:void(0)" data-id="home">首页</a></li><li><a href="javascript:void(0)" class="disabled" data-id="previous">上一页</a></li><li><span data-id="total"></span></li><li><a href="javascript:void(0)" data-id="next">下一页</a></li><li class="btn-last-page"><a href="javascript:void(0)" data-id="last">末页</a></li><li><input type="text" style="width:40px;min-width:40px;background-color: #fff;display:none;"><a style="display:none" href="javascript:void(0)" data-id="skip">跳转</a></li></ul>',
                    autoBind: false
                },
                events: ["onPageChange", 'onComplete'],
                initialize: function (element, options) {
                    this.__super__.initialize.call(this, options);
                    var that = this;
                    options = that.options;
                    that.wrapper = $(element).addClass(options.pagerClass).append(that.options.template);
                    that.pageSize = options.pageSize;
                    that.curerntIndex = 1;
                    that.setTotalCount(0);
                    that.bindevents();
                    that.dataSource = that.parseDataSource(that.options.dataSource);
                    that.dataSource.on('data', _.bind(that._datahandler, that));
                    that.dataSource.on('fail', _.bind(that._failhandler, that));
                    if (that.options.isSkip) {
                        that.wrapper.find('a[data-id="skip"],:text').show();
                    }
                    that.render();
                    if (that.options.autoBind) {
                        that.read();
                    }
                },
                bindevents: function () {
                    this.delegateEvents(this.wrapper, "click", "a[data-id]:not(.disabled)", _.bind(this._onPageChange, this));
                },
                _datahandler: function (d, d2) {
                    var that = this, totalCount = that.options.parseTotal(d2);
                    that.setTotalCount(totalCount);
                    that.render();
                    this.trigger("onPageChange", this.curerntIndex);
                    this.trigger('onComplete');
                },
                _failhandler: function () {
                    this.trigger('onComplete');
                },
                setTotalCount: function (totalCount) {
                    var that = this, options = that.options;
                    that.totalCount = totalCount;
                    that.pageCount = Math.ceil(that.totalCount / options.pageSize);
                },
                next: function () {
                    this.curerntIndex++;
                    this._pageChange();
                },
                previous: function () {
                    this.curerntIndex--;
                    this._pageChange();
                },
                skip: function (index) {
                    this.curerntIndex = index;
                    this._pageChange();
                },
                read: function (data) {
                    var that = this, options = that.options;
                    data = _.extend({}, data);
                    data[options.pageIndexField] = that.curerntIndex;
                    data[options.pageSizeField] = that.pageSize;
                    that.dataSource.read(data);
                },
                _pageChange: function () {
                    if (this.curerntIndex > this.pageCount) {
                        this.curerntIndex = this.pageCount;
                    }
                    if (this.curerntIndex <= 0) {
                        this.curerntIndex = 1;
                    }
                    this.read();
                },
                _onPageChange: function (e) {
                    var that = this, element = $(e.currentTarget), id = element.attr("data-id"), value;
                    if (id == "skip") {
                        value = that.wrapper.find('input').val();
                        if (value == "" || /[^\d]/.test(value)) {
                            dialog.alert("不能输入无效值");
                            return;
                        }
                        if (Number(value) > that.pageCount) {
                            dialog.alert("不能大于总页数");
                            return;
                        }
                        that.skip(Number(value));
                    } else if (id == "home") {
                        that.skip(1);
                    } else if (id == "last") {
                        that.skip(that.pageCount);
                    } else {
                        that[id]();
                    }
                },
                render: function () {
                    var
                        that = this, curerntIndex = that.curerntIndex;
                    that.wrapper.find('a[data-id]').removeClass();
                    if (curerntIndex <= 1 || that.pageCount <= 1) {
                        that.wrapper.find('a[data-id="home"],a[data-id="previous"]').addClass("disabled");
                    }
                    if (curerntIndex >= that.pageCount || that.pageCount <= 1) {
                        that.wrapper.find('a[data-id="next"],a[data-id="last"]').addClass("disabled");
                    }
                    if (that.pageCount <= 1) {
                        that.wrapper.find('a[data-id="skip"]').addClass("disabled");
                    }
                    if (!that.options.isSkip) {
                        that.wrapper.find('span[data-id="total"]').html('第<b>' + that.curerntIndex + '/' + that.pageCount + '</b>页');
                    } else {
                        that.wrapper.find('span[data-id="total"]').html(that.curerntIndex + '/' + that.pageCount);
                    }
                }

            });
            extendWidget("TreeView", function () {
                var expandCALSS = 'treeview-expand', collapseCLASS = 'treeview-collapse';
                return {
                    options: {
                        dataSource: null,
                        emptyMsg: "没有数据",
                        template: '<%=text%>',
                        rowTemplate: '<span class="treeview-texts">{0}</span>',
                        enabledExpand: true,
                        enabledOver: false,
                        overClass: "treeview-over",
                        selectedClass: "treeview-selected",
                        enabledSelect: false,
                        autoBind: true
                    },
                    events: ['onSelect', 'onExpand', 'onOver', 'onOut', 'onRender'],
                    initialize: function (element, options) {

                        this.__super__.initialize.call(this, options);
                        var that = this, wrapper = $(element).addClass('treeview');
                        that.dataSource = that.options.dataSource instanceof core_module9.TreeDataSource ? that.options.dataSource : new core_module9.TreeDataSource(that.options.dataSource);
                        that.dataSource.then(_.bind(that._successHandler, that), _.bind(that._errorHandler, that));
                        that.wrapper = wrapper;
                        that._initTemplate();
                        that._initEvents();
                        that._layerLoading = new LayerLoading(wrapper);
                        that.dataSource.on('reading', _.bind(that._readingHandler, that));
                        if (that.options.autoBind) {
                            that.dataSource.read();
                        }

                    },
                    _initEvents: function () {
                        this.delegateEvents(this.wrapper, "click", ".treeview-icons-status", _.bind(this._toggleNodeHandler, this));
                        this.delegateEvents(this.wrapper, "click", ".treeview-texts", _.bind(this._selectNodeHandler, this));
                        if (this.options.enabledOver) {
                            this.delegateEvents(this.wrapper, "mouseenter", ".treeview-texts", _.bind(this._enterNodeHandler, this));
                            this.delegateEvents(this.wrapper, "mouseleave", ".treeview-texts", _.bind(this._leaveNodeHandler, this));
                        }
                    },
                    _toggleNodeHandler: function (e) {
                        var element = $(e.currentTarget), parent = element.closest('li.treeview-item'), itemdata = this.getItemDataByElement(parent), ieExpand = false;
                        if (parent.hasClass(expandCALSS)) {
                            parent.removeClass(expandCALSS).addClass(collapseCLASS);
                        } else {
                            ieExpand = true;
                            parent.removeClass(collapseCLASS).addClass(expandCALSS);
                        }
                        this.trigger("onExpand", e, {
                            ieExpand: ieExpand,
                            data: itemdata
                        });

                    },
                    getItemDataByUid: function (uid) {
                        return this.dataSource.getItemDataByUid(uid);
                    },
                    getItemDataById: function (id) {
                        return this.dataSource.getItemDataById(id);
                    },
                    getItemUid: function (element) {
                        return element.attr('data-treeid');
                    },
                    getItemDataByElement: function (element) {
                        return this.getItemDataByUid(this.getItemUid(element));
                    },
                    findItemDataByElement: function (element) {
                        var uid = this.getItemUid($(element).closest('li.treeview-item'));
                        return this.getItemDataByUid(uid);
                    },
                    hasChildById: function (id) {
                        return this.dataSource.hasChild(id);
                    },
                    _enterNodeHandler: function (e) {
                        var element = $(e.currentTarget);
                        element.addClass(this.options.overClass);
                        this.trigger('onOver', e);
                    },
                    _leaveNodeHandler: function (e) {
                        var element = $(e.currentTarget);
                        element.removeClass(this.options.overClass);
                        this.trigger('onOut', e);
                    },
                    _selectNodeHandler: function (e) {
                        var element = $(e.currentTarget), selectedClass = this.options.selectedClass;
                        if (this.options.enabledSelect) {
                            if (element.hasClass(selectedClass)) {
                                return;
                            }
                            this.wrapper.find('.' + selectedClass).removeClass(selectedClass);
                            element.addClass(selectedClass);
                        }
                        var parent = element.closest('li.treeview-item'), itemdata = this.getItemDataByElement(parent);
                        this.trigger("onSelect", e, itemdata);
                    },
                    _initTemplate: function () {
                        var that = this, options = that.options, itemTemplate = options.template
                        if (typeof itemTemplate == 'string') {
                            itemTemplate = _.template(itemTemplate);
                        }
                        that.templates = {
                            rowTemplate: options.rowTemplate,
                            itemTemplate: itemTemplate,
                            expandTemplate: '<span class="treeview-icons treeview-icons-status"></span>'
                        };
                    },
                    _showEmptyMsg: function () {
                        this.wrapper.html(this.options.emptyMsg);
                    },
                    getNodeByTreeId: function (id) {
                        return this.wrapper.find('.treeview-item[data-treeid="' + id + '"]');
                    },
                    updateNodeTexts: function (id) {
                        var node = this.getNodeByTreeId(id), item = this.dataSource.getItemTreeDataByUid(id);
                        if (node && item) {
                            node.find('>.treeview-line>.treeview-texts').html(this.templates.itemTemplate(item));
                        }
                    },
                    expandById: function (id) {
                        var data = this.getItemDataById(id);
                        if (!data) {
                            return;
                        }
                        var _collapseCLASS = expand ? collapseCLASS : expandCALSS, _expandCALSS = expand ? expandCALSS : collapseCLASS;
                        this.wrapper.find('.treeview-item[data-treeid="' + data._uid + '"]').removeClass(_collapseCLASS).addClass(_expandCALSS);
                    },
                    expandAll: function (expand) {
                        var _collapseCLASS = expand ? collapseCLASS : expandCALSS, _expandCALSS = expand ? expandCALSS : collapseCLASS;
                        this.wrapper.find('.treeview-item').removeClass(_collapseCLASS).addClass(_expandCALSS);
                    },
                    addRootNodeByData: function (data) {
                        var that = this, dataSource = that.dataSource;
                        result = dataSource.addRootData(data);
                        dataSource._updateTreeData();

                    },
                    insertNodeByData: function (element, data, position, slient) {
                        element = $(element);
                        var that = this, result = false, dataSource = that.dataSource, treeNode = element.closest('.treeview-item'), uid = that.getItemUid(treeNode), newNode, treeData, child;

                        result = dataSource.insertData(uid, data, position);
                        if (!result) {
                            return;
                        }
                        dataSource._updateTreeData(slient);
                        if (slient) {
                            treeData = dataSource.getItemTreeDataByUid(result._uid);
                            if (position == 'after') {
                                newNode = that._buildTreeDom([treeData], false);
                                treeNode.after(newNode);
                            } else if (position == 'before') {
                                newNode = that._buildTreeDom([treeData], false)
                                treeNode.before(newNode);
                            } else if (position == 'append') {
                                child = treeNode.children('.treeview-group');
                                if (child.length <= 0) {
                                    child = treeNode;
                                    treeNode.children('treeview-line').prepend(that.templates.expandTemplate);
                                    newNode = that._buildTreeDom([treeData], true)
                                }
                                child.append(newNode);
                            }
                        }
                    },
                    _buildTreeDom: function (data, isParent) {
                        var that = this, i = 0, len = data.length, strList = [], hasChild = false, item, uid, templates = that.templates, enabledExpand = that.options.enabledExpand, expandClass;
                        if (isParent) {
                            strList.push('<ul class="treeview-group">');
                        }
                        for (; i < len; i++) {
                            item = data[i];
                            uid = item._uid;
                            hasChild = item.childs.length > 0;
                            expandClass = item.expand === false ? collapseCLASS : expandCALSS;
                            strList.push('<li class="treeview-item ' + expandClass + '" data-treeid="' + uid + '">');
                            strList.push('<div class="treeview-line">');
                            if (hasChild && enabledExpand) {
                                strList.push(templates.expandTemplate);
                            }
                            strList.push(templates.rowTemplate.replace('{0}', templates.itemTemplate(item)));
                            strList.push('</div>');
                            if (hasChild) {
                                strList.push(that._buildTreeDom(item.childs, true));
                            }
                            strList.push('</li>');

                        }
                        if (isParent) {
                            strList.push('</ul>');
                        }
                        return strList.join('');
                    },
                    _successHandler: function (d) {
                        if (d.length > 0) {
                            this.render();
                        } else {
                            this._showEmptyMsg();
                        }
                        this._layerLoading.hideLoading();
                    },
                    _readingHandler: function () {
                        this._layerLoading.showLoading();
                    },
                    _errorHandler: function () {
                        this._showEmptyMsg();
                        this._layerLoading.hideLoading();
                    },
                    render: function () {
                        var that = this, container = $('<ul class="treeview-lines treeview-group">');
                        that.wrapper.html(container.html(that._buildTreeDom(that.dataSource._treeData)));
                        that.trigger('onRender');
                    }

                };
            }());
            extendWidget('Drag', {
                options: {
                    dropTarget: null,
                    dropFilter: null,
                    dragFilter: null,
                    appendOffset: 0.6
                },
                events: ['onDragStart', 'onDragEnd', 'onDragOver', 'onDrag', 'onDrop', 'onDragEnter', 'onDragLeave'],
                initialize: function (element, options) {
                    _.bindAll(this, '_handlerEvents');
                    this.__super__.initialize.call(this, options);
                    var that = this;
                    options = that.options;
                    that.dragTarget = $(element);
                    that.dropTarget = options.dropTarget ? $(options.dropTarget) : null;
                    that.enabledDrag(true);
                    that._initEvents();
                },
                _initEvents: function () {
                    this.delegateEvents(this.dragTarget, "mousedown", this.options.dragFilter, this._handlerEvents);
                    this.delegateEvents(this.dragTarget, "dragstart", this.options.dragFilter, this._handlerEvents);
                    this.delegateEvents(this.dragTarget, "dragend", this.options.dragFilter, this._handlerEvents);
                    this.delegateEvents(this.dragTarget, "drag", this.options.dragFilter, this._handlerEvents);
                    if (this.dropTarget) {
                        this.delegateEvents(this.dropTarget, "dragenter", this.options.dropFilter, this._handlerEvents);
                        this.delegateEvents(this.dropTarget, "dragleave", this.options.dropFilter, this._handlerEvents);
                        this.delegateEvents(this.dropTarget, "dragover", this.options.dropFilter, this._handlerEvents);
                        this.delegateEvents(this.dropTarget, "drop", this.options.dropFilter, this._handlerEvents);
                    }
                },
                enabledDrag: function (enabled) {
                    this.isEnabledDrag = enabled;
                },
                _mousedownHandler: function (e) {
                    var element = e.currentTarget;
                    if (element.draggable !== true) {
                        element.draggable = true;
                    }
                },
                _dragstartHandler: function (e) {
                    var that = this;
                    that._eventData = {
                        dragTarget: e.currentTarget
                    };
                    if (that.trigger('onDragStart', e, that._eventData) === false) {
                        e.preventDefault();
                    }
                },
                _dragendHandler: function (e) {
                    var that = this;
                    that.trigger('onDragEnd', e, that._eventData);
                    that._eventData = null;
                },
                _dragHandler: function (e) {
                    var that = this;
                    that.trigger('onDrag', e, that._eventData);
                },
                _dragenterHandler: function (e) {
                    var that = this;
                    that.trigger('onDragEnter', e, {
                        dragTarget: that._eventData.dragTarget,
                        dropTarget: e.currentTarget
                    });
                },
                _getCurrentDropTarget: function (e) {
                    if (!this.options.dropFilter) {
                        return e.target;
                    } else {
                        return e.currentTarget;
                    }
                },
                _dragleaveHandler: function (e) {
                    var that = this, dropTarget;
                    that.trigger('onDragLeave', e, {
                        dragTarget: that._eventData.dragTarget,
                        dropTarget: that._getCurrentDropTarget(e)
                    });
                },
                _dragoverHandler: function (e) {
                    e.preventDefault();
                    var that = this, element = that._getCurrentDropTarget(e), position = that.getPosition(element, e);
                    if (position == '' || that.preElement == element && that.prePosition == position) {
                        return;
                    }

                    that.preElement = element;
                    that.prePosition = position;
                    this.trigger('onDragOver', e, {
                        dragTarget: that._eventData.dragTarget,
                        dropTarget: element,
                        position: position
                    });

                },
                _dropHandler: function (e) {
                    var that = this;
                    that.trigger('onDrop', e, {
                        dragTarget: that._eventData.dragTarget,
                        dropTarget: that._getCurrentDropTarget(e),
                        position: that.prePosition
                    });
                },
                _handlerEvents: function (e) {
                    var type = e.type, handler = '_' + type + "Handler";
                    if (!this.isEnabledDrag) {
                        e.preventDefault();
                        return;
                    }
                    if (this[handler]) {
                        this[handler](e);
                    }
                },
                getPosition: function (element, e) {
                    element = $(element);
                    var that = this, height = element.outerHeight(), width = element.outerWidth(), appendOffset = that.options.appendOffset,
                        offset = element.offset(), oX = offset.left, oY = offset.top, position = '', x = e.pageX, y = e.pageY;
                    var maxY = height / 2 + oY;
                    var maxX = width * appendOffset + oX;
                    if (x > (maxX + 10)) {
                        position = 'append';
                    }
                    else if (y < maxY && x < maxX) {
                        position = 'before';
                    } else if (y > maxY && x < maxX) {
                        position = 'after';
                    }
                    return position;
                }

            });
            var Loading = Widget.extend({
                template: '<div style="position:fixed;background-color: rgba(0, 0, 0, 0.1);z-index:9999;top:0px;bottom:0px;right:0px;left:0px;"><div class="loading-p1" ></div></div>',
                initialize: function () {
                    var element = $(this.template);
                    this.element = element;
                },
                setStyles: function (styles) {
                    this.element.css(styles);
                },
                showLoading: function () {
                    this.element.appendTo(document.body)
                },
                hideLoading: function () {
                    this.element.remove();
                }
            });
            var LayerLoading = Loading.extend({
                template: '<div style="position:absolute;background-color: rgba(0, 0, 0, 0.1);z-index:9998;top:0px;bottom:0px;right:0px;left:0px;"><div class="loading-p1" ></div></div>',
                initialize: function (target) {
                    this.target = $(target);
                    this.__super__.initialize.call(this);
                },
                showLoading: function () {
                    var target = this.target, offset = target.offset(), left = offset.left, top = offset.top;
                    this.element.css({
                        left: left,
                        top: top,
                        width: target.outerWidth(),
                        height: target.outerHeight()
                    });
                    this.__super__.showLoading.call(this);
                }
            });

            var dialog = createWidget("Dialog");
            var loading = new Loading();

            var Select = Vue.extend({
                data: function () {
                    return { list: [], textFieldName: "text", search: "", valueFieldName: 'value', isShow: false, selectedValue: "", selectedText: "" };
                },
                methods: {
                    onSelect: function (item) {
                        this.selectedValue = item[this.valueFieldName];
                        this.selectedText = item[this.textFieldName];
                        this.isShow = false;
                        this.$emit('onSelect', this.selectedValue);
                    },
                    getValue: function () {
                        return this.selectedValue;
                    }
                },
                created: function () {
                    this.selectedText = this.defaultLabel;
                },
                watch: {
                    isShow: function (val) {
                        if (val) {
                            this.search = '';
                        }
                    },
                    list: function (val) {
                        if (val.length == 0) {
                            this.selectedText = this.defaultLabel;
                            this.selectedValue = '';
                        }
                    }
                },
                props: ['defaultLabel'],
                replace: true,
                template: '<div class="dx-selectbox"  :class="{\'dx-open\':isShow}"><div class="dx-select-input" @click="isShow=!isShow"><span class="dx-select-text">{{selectedText}}</span><i class="dx-select-arrow"></i></div><div class="dx-select"><div class="dx-select-search"><input  type="text" placeholder="请输入关键字" v-model="search" /></div><ul class="dx-select-ul" v-cloak><li data-value="{{item[valueFieldName]}}" @click="onSelect(item)" v-for="item in list | filterBy search in textFieldName">{{item[textFieldName]}}</li></ul></div></div>'
            });

            exports.ui = {
                extendWidget: extendWidget,
                getWidget: getWidget,
                createWidget: createWidget,
                alert: _.bind(dialog.alert, dialog),
                confirm: _.bind(dialog.confirm, dialog),
                windows: _.bind(dialog.windows, dialog),
                showLoading: function () {
                    loading.showLoading();
                },
                select: Select,
                inlineSelect: function () {

                },
                LayerLoading: LayerLoading,
                hideLoading: function () {
                    loading.hideLoading();
                }
            };
        },
        // 数据持久存储 5
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
        //业务数据 6
        function (module, exports, __require__) {
            exports.business = {
                getUserInfo: function () {
                    return Masa.sessionStorage.getItem('USERLOGININFO');
                },
                getCurrentLoginName: function () {
                    var userinfo = this.getUserInfo();
                    return userinfo ? userinfo.username : '';
                },
                getCurrentUserName: function () {
                    var userinfo = this.getUserInfo();
                    return userinfo ? userinfo.name : '';
                },
                saveUserLoginInfo:function(data)
                {
                    Masa.sessionStorage.setItem('USERLOGININFO',data);
                },
                goIndexPage: function (top) {
                    var win = top || window;
                    win.location = MASAGOLBALCONFINGS.baseUrl + '/index.html';
                },
                goLoginPage:function(top)
                {
                    var win = top || window;
                    win.location = MASAGOLBALCONFINGS.baseUrl + '/modules/login/login.html';
                },
                logout: function () {
                    Masa.getRequest('logout');
                    this.goLoginPage();
                }
            };
        },
        //浏览器通用方法 7
        function (module, exports, __require__) {
            exports.browser = {
                getWindowSize: function () {
                    var h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                    var w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
                    return { h: h, w: w };
                },
                addUrlParam: function (url, name, value) {
                    return url + (url.indexOf('?') != -1 ? "&" : "?") + name + "=" + value;
                },
                copyTextClipboard: function (text) {
                    try {
                        var textarea = document.createElement('textarea');
                        textarea.value = text;
                        textarea.style.width = '0px';
                        textarea.style.height = '0px';
                        textarea.style.opacity = 0;
                        textarea.style.top = '-100px';
                        textarea.style.left = '-100px';
                        textarea.style.position = 'absolute';
                        document.body.appendChild(textarea);
                        textarea.focus();
                        textarea.select();
                        var resuslt = document.execCommand('copy');
                        document.body.removeChild(textarea);
                        return resuslt;
                    } catch (e) {
                        return false;
                    }
                },
                setCookie: function (name, value, expires, path, domain,source) {
                    var date;
                    var cookies = [name + '=' + encodeURIComponent(value)];
                    if (expires) {
                        date = new Date();
                        date.setMinutes(date.getMinutes() + expires);
                        cookies.push('expires=' + date.toUTCString());
                    }
                    cookies.push('path=' + (path||'/'));
                    if (domain) {
                        cookies.push('domain=' + domain);
                    }
                    if (source) {
                        cookies.push('source');
                    }
                    document.cookie = cookies.join(';');
                },
                getCookie: function (name) {
                    var cookie = document.cookie.match(new RegExp('' + name + '=([^;]+)'));
                    return cookie ? decodeURIComponent(cookie[1]) : null;
                },
                removeCookie: function (name) {
                    var  value=this.getCookie(name);
                    if(value!=null)
                    {
                        this.setCookie(name, '', -60);
                    }
                }
            }
        },
        // 通用方法 8
        function (module, exports, __require__) {
            exports.dates = {
                compare: function (date, target) {
                    var c = this.getTime(this.format(date)), t = this.getTime(this.format(target));
                    return c > t ? 1 : c < t ? -1 : 0;
                },
                getTime: function (date) {
                    return this.parse(date).getTime();
                },
                parse: function (date) {
                    try {
                        var result, str, len;
                        if (_.isDate(date)) {
                            result = date;
                        } else {
                            str = date.split(/[^\d]/g);
                            len = str.length;
                            switch (len) {
                                case 1:
                                    result = new Date(parseInt(str[0]));
                                    break;
                                case 2:
                                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1);
                                    break;
                                case 3:
                                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]));
                                    break;
                                case 4:
                                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]), parseInt(str[3]));
                                    break;
                                case 5:
                                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]), parseInt(str[3]), parseInt(str[4]));
                                    break;
                                case 6:
                                    result = new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]), parseInt(str[3]), parseInt(str[4]), parseInt(str[5]));
                                    break;
                            }
                        }
                        if (!result) {
                            throw 'parse date error';
                        }
                        return result;
                    } catch (e) {
                        throw 'parse date error';
                    }
                },
                format: function (date, format) {
                    var dates, result;
                    if (_.isDate(date)) {
                        dates = {
                            'y': String(date.getFullYear()),
                            'M': date.getMonth() + 1,
                            'd': date.getDate(),
                            'MM': _.padStart(date.getMonth() + 1, 2, "0"),
                            'dd': _.padStart(date.getDate(), 2, "0"),
                            'h': date.getHours(),
                            'm': date.getMinutes(),
                            's': date.getSeconds()
                        };
                        format = format || "yyyy-MM-dd";
                        result = format.replace(/y+/, function (str) {
                            return dates.y.substr(-str.length);
                        }).replace(/M+/, function (str) {
                            return dates[str];
                        }).replace(/d+/, function (str) {
                            return dates[str];
                        }).replace(/h+/i, function (str) {
                            return dates.h;
                        }).replace(/m+/, function (str) {
                            return dates.m;
                        }).replace(/s+/, function (str) {
                            return dates.s;
                        });

                    } else {
                        result = date;
                    }
                    return result;
                }
            };
            exports.strings = {
                format: function (str) {
                    var arr_params = _.drop(arguments);
                    return str.replace(/\{(\d+)\}/g, function (s, i) {
                        return arr_params[i];
                    });
                }
            };
        },
        // 数据集和数据对象 9
        function (module, exports, __require__) {

            var Events = __require__(1).Events, Core = __require__(0), Class = Core.Class, core_module3 = __require__(3);
            var Model = Class.extend({
                constructor: function (opt_values, opt_silent) {
                    this.uid = _.uniqueId('model');
                    this._values = {};
                    if (opt_values !== undefined) {
                        this.setProperties(opt_values, opt_silent);
                    }
                },
                getProperties: function () {
                    return _.assign({}, this._values);
                },
                setProperties: function (values, opt_silent) {
                    var key, keys = _.keys(values), i = 0, len = keys.length;
                    for (; i < len; i++) {
                        key = keys[i];
                        this.set(key, values[key], opt_silent);
                    }
                },
                get: function (key) {
                    var value;
                    if (this.has(key)) {
                        value = _.result(this._values, key);
                    }
                    return value;
                },
                getKeys: function () {
                    return _.keys(this._values);
                },
                getValues: function () {
                    return _.values(this._values);
                },
                changed: function () {
                    this.trigger(Model.EVENTS.CHANGE);
                },
                notify: function (type, key, value, oldvalue) {
                    this.trigger(Model.EVENTS.CHANGE, key, value, oldvalue);
                    this.trigger(type + ":" + key, key, value, oldvalue);
                },
                set: function (key, nvalue, opt_silent) {
                    var hasKey = this.has(key), oldValue;
                    if (hasKey) {
                        oldValue == this.get(key);
                        _.set(this._values, key, nvalue);
                        if (!opt_silent) {
                            this.notify(Model.EVENTS.SET, key, nvalue, oldValue);
                        }
                    } else {
                        this.add(key, nvalue);
                    }
                },
                add: function (key, value) {
                    if (!this.has(key)) {
                        _.set(this._values, key, value);
                        this.notify(Model.EVENTS.ADD, key, value);
                    }
                },
                has: function (key) {
                    return _.has(this._values, key);
                },
                remove: function (key) {
                    if (this.has(key)) {
                        _.unset(this._values, key);
                        this.notify(Model.EVENTS.REMOVE, key);
                    }
                }
            }, {
                geEventKey: function (type, key) {
                    return type + ":" + key;
                },
                EVENTS: {
                    ADD: "add",
                    REMOVE: "remove",
                    CHANGE: "change",
                    SET: "set"
                }
            });
            Model.mixin(Events);
            var Collection = Class.extend({
                constructor: function (models, defaultModel) {
                    this.defaultModel = defaultModel || {};
                    this.list = [];
                    if (_.isArray(models)) {
                        this._initModels(models);
                    }
                    this.initailize.apply(this, arguments);
                },
                initailize: function () {
                    var that = this;
                    that._modelHandler = function () {
                        var eventObj = {
                            target: this,
                            eventName: 'model',
                            lastIndex: -1,
                            result: _.toArray(arguments)
                        };
                        that.trigger('model', eventObj);
                        that.change(eventObj);
                    }
                },
                _parseModel: function (model) {
                    if (!(model instanceof Masa.Model)) {
                        model = new Masa.Model(_.defaultsDeep(model, this.defaultModel), true);
                    }
                    model.set('_modelId', _.uniqueId('moduleid'), true);
                    model.off('change', this._modelHandler);
                    model.on('change', this._modelHandler);
                    return model;
                },
                find: function (callback) {
                    return _.find(this.getArray(), callback);
                },
                findByModelId: function (modelId) {
                    return this.find(function (d) { return d._modelId == modelId; });
                },
                change: function (e) {
                    this.trigger('change',e);
                },
                _parseModels: function (values) {
                    var result = [], i = 0, len = values.length;
                    for (; i < len; i++) {
                        result.push(this._parseModel(values[i]));
                    }
                    return result;
                },
                _initModels: function (models) {
                    models.forEach(function (m) {
                        this.push(m);
                    }, this);
                },
                _parseValues: function (name, values) {
                    var that = this;
                    switch (name) {
                        case "push":
                        case "unshift":
                            values = that._parseModels(values);
                            break;
                        case "splice":
                            values = _.toArray(values);
                            values = _.concat(values[0], values[1], this._parseModels(values.slice(2)));
                            break;
                    }
                    return values;
                },
                getArray: function () {
                    return this.list;
                },
                forEach: function (callback) {
                    return _.each(this.getArray(), callback);
                },
                _set: function (name, args, eventName) {
                    eventName = eventName || name;
                    var values = this._parseValues(name, args), lastIndex= this.getSize();
                    var result = this.list[name].apply(this.list, values);
                    var eventObj={
                        eventName: eventName,
                        lastIndex: lastIndex,
                        result: result
                    };
                    this.trigger(eventName, eventObj);
                    this.change(eventObj);
                    return result;
                },
                removeAt:function(index)
                {
                    return this._set('splice',[index,1],'remove');
                },
                getSize:function()
                {
                    return this.list.length;
                },
                item: function (index) {
                    return this.list[index];
                },
                push: function () {
                    return this._set('push', arguments);
                },
                shift: function () {
                    return this._set('shift', arguments);
                },
                unshift: function () {
                    return this._set('unshift', arguments);
                },
                splice: function () {
                    return this._set('splice', arguments);
                },
                sort: function () {
                    return this._set('sort', arguments);
                },
                pop: function () {
                    return this._set('pop', arguments);
                },
                reverse: function () {
                    return this._set('reverse', arguments);
                }
            });
            Collection.mixin(Events);

            function DataSource(options) {
                if (!(this instanceof DataSource)) {
                    return new DataSource(options);
                }
                this.data = null;
                this.options = options = $.extend({}, DataSource.settings.defaulOptions, options);
                if (options.transport) {
                    this.setTransport(options.transport);
                }
            }
            DataSource.prototype = {
                constructor: DataSource,
                setTransport: function (transport) {
                    this.transport = Core.hasInstanceof(transport, RemoteTransport) ? transport : RemoteTransport(transport);
                    this.transport.then(_.bind(this.done, this), _.bind(this.fail, this));
                },
                refresh: function (data) {
                    this.trigger('reading', data);
                    if (this.transport) {
                        this.transport.refresh(data);
                    } else {
                        this.done(this.options.data, this.options.data);
                    }
                },
                read: function (data) {
                    this.trigger('reading', data);
                    if (this.transport) {
                        this.transport.read(data);
                    } else {
                        this.done(this.options.data, this.options.data);
                    }
                },
                getData: function () {
                    return this.data;
                },
                getItemData: function (index) {
                    return this.data[index];
                },
                findItemIndex: function (callback) {
                    return _.findIndex(this.data, callback);
                },
                findItemData: function (callback) {
                    return _.find(this.data, callback);
                },
                done: function (d, datasource) {
                    var that = this;
                    that.data = d;
                    that._source = datasource;
                    that.trigger('data', d, datasource);
                },
                fail: function (e, m, ts) {
                    var that = this;
                    that.data = null;
                    that._source = null;
                    that.trigger('fail', e, m, ts);
                },
                then: function (done, fail) {
                    this.on('data', done);
                    if (_.isFunction(fail)) {
                        this.on('fail', fail);
                    }
                    return this;
                }
            };
            _.extend(DataSource.prototype, Events);
            DataSource.settings = {
                defaulOptions: {
                    data: [],
                    transport: null
                }
            };
            DataSource.extend = Core.Class.extend;
            function RemoteTransport(options) {
                if (!(this instanceof RemoteTransport)) {
                    return new RemoteTransport(options);
                }
                this.options = options = $.extend({}, RemoteTransport.settings.defaultOptions, options);
                this.requestOption = Core._.omit(this.options, RemoteTransport.settings.ajaxOptions);
            }
            RemoteTransport.prototype = {
                constructor: RemoteTransport,
                refresh: function (data) {
                    var name = this.options.name, options = Core._.clone(this.requestOption);
                    if (data) {
                        options.data = data;
                    }
                    core_module3.request(name, options).done(this.done).fail(this.fail);
                },
                parseAjaxData: function (data) {
                    if (_.isFunction(data)) {
                        return data();
                    }
                    return data;
                },
                read: function (data) {
                    var name = this.options.name, options = Core._.clone(this.requestOption);
                    if (data) {
                        options.data = $.extend({}, this.parseAjaxData(options.data), data);
                    }
                    core_module3.request(name, options).done(this.done).fail(this.fail);
                },
                then: function (done, fail) {
                    var options = this.options, that = this;
                    this.done = function (d) {
                        done(options.parseData.call(that, d), d);
                    };
                    this.fail = fail;
                    return this;
                }
            };
            RemoteTransport.settings = {
                ajaxOptions: ["parseData", "name"],
                defaultOptions: {
                    type: "post",
                    name: "",
                    data: null,
                    inShowLoading: false,
                    isCustomerError: true,
                    parseData: function (d) { return d; }
                }
            };

            var TreeDataSource = DataSource.extend({
                constructor: function (options) {
                    _.bindAll(this, '_filterChilds');
                    DataSource.call(this, options);
                    var that = this, options = this.options, primaryKey = options.primaryKey || 'id', parentId = options.parentId || 'parentId';
                    that._primaryKey = primaryKey;
                    that._parentId = parentId;
                    that._textField = options.textField || 'text';
                    that.uid = 0;
                },
                _treeDataHandler: function () {
                    return this._parseTreeData(this.data.slice());
                },
                _parseTreeData: function (data) {
                    var that = this, parentId = that._parentId;
                    return that._recursionTree(data, null, 1, -1, function (id, item) {
                        return item[parentId] == null || item[parentId] == id || !that.checkExistById(item[parentId]);
                    });
                },
                _filterChilds: function (id, item) {
                    return item[this._parentId] == id;
                },
                _getUid: function () {
                    return Math.random().toString(36).substring(16) + (this.uid++);
                },
                getIndex: function (uid) {
                    return this.findItemIndex(function (d) { return d._uid == uid; });
                },
                getItemDataByUid: function (uid) {
                    return this.findItemData(function (d) { return d._uid == uid; });
                },
                getItemDataById: function (id) {
                    var primaryKey = this._primaryKey;
                    return this.findItemData(function (d) { return d[primaryKey] == id; });
                },
                flatMapTree: function (data) {
                    var that = this;
                    return _.flatMapDeep(data, function (d) {
                        if (d.childs.length) {
                            return [d, that.flatMapTree(d.childs)];
                        }
                        return [d];
                    });
                },
                getFlatMapTreeData: function () {
                    return this.flatMapTree(this._treeData);
                },
                getItemTreeDataByUid: function (uid) {
                    var data = this.getFlatMapTreeData();
                    return _.find(data, function (d) { return d._uid == uid; });
                },
                checkExistById: function (id) {
                    var _primaryKey = this._primaryKey;
                    if (typeof id == "object") {
                        id = id[_primaryKey];
                    }
                    return _.some(this.data, function (d) { return d[_primaryKey] == id; });
                },
                removeDataByUid: function (uid) {
                    return _.remove(this.data, function (d) { return d._uid == uid; });
                },
                _getDataDeepByUid: function (id) {
                    var that = this, data = that.data, len = data.length, i = 0, _parentId = that._parentId, _primaryKey = that._primaryKey, result=[];                    
                    for (; i < len; i++) {
                        if (data[i][_parentId] == id) {
                            result.push(data[i]._uid);
                            result = result.concat(that._getDataDeepByUid(data[i][_primaryKey]));
                        }
                    }
                    return result;
                },
                removeDataDeepByUid: function (uid) {
                    var that=this,data=this.data,itemData = this.getItemDataByUid(uid), _primaryKey = this._primaryKey, _parentId = this._parentId, id,removeIds=[uid];
                    if (itemData) {
                        id = itemData[_primaryKey];
                        this.data = Core.recursionArray(id, data, _primaryKey, _parentId).remainingList;
                    }
                },
                addRootData: function (data) {
                    data = this.cloneData(data);
                    this.data.push(data);
                },
                addData: function (data) {
                    this.data.push(this.cloneData(data));
                },
                insertData: function (uid, data, position) {
                    var that = this, index = that.getIndex(uid), itemdata, clonedata = that.cloneData(data);
                    if (index != -1) {
                        itemdata = that.getItemData(index);
                        if (position == "after") {
                            clonedata[that._parentId] = itemdata[that._parentId];
                            that.data.splice(index + 1, 0, clonedata);
                        } else if (position == "before") {
                            clonedata[that._parentId] = itemdata[that._parentId];
                            that.data.splice(index, 0, clonedata);
                        }
                        else if (position == "append") {
                            clonedata[that._parentId] = itemdata[that._primaryKey];
                            that.data.push(clonedata);
                        }
                        return clonedata;
                    }
                    return false;
                },
                cloneData: function (data) {
                    var clonedata = _.clone(data);
                    if (!_.has(clonedata, "_uid")) {
                        clonedata._uid = this._getUid();
                    }
                    clonedata._cloneId = clonedata[this._primaryKey];
                    clonedata._cloneParentId = clonedata[this._parentId];
                    clonedata[this._parentId] = null;
                    clonedata[this._primaryKey] = this._getUid();
                    return clonedata;
                },
                hasChild: function (id) {
                    if (typeof id == "object") {
                        id = id[this._primaryKey];
                    }
                    var _parentId = this._parentId;
                    return _.some(this.data, function (d) { return d[_parentId] == id; });
                },
                getChilds: function (id) {
                    if (typeof id == "object") {
                        id = id[this._primaryKey];
                    }
                    var _parentId = this._parentId;
                    return _.filter(this.data, function (d) { return d[_parentId] == id; });
                },
                _createTreeItem: function (data, level, index, parent, item, isFindChild) {
                    var that = this, id = item[that._primaryKey], childs = [], treeItem;
                    treeItem = {
                        _uid: item._uid,
                        text: item[that._textField],
                        expand: item.expand,
                        childs: childs,
                        parent: parent,
                        level: level,
                        index: index,
                        source: item
                    }
                    if (isFindChild) {
                        treeItem.childs = that._recursionTree(data, treeItem, level + 1, id, this._filterChilds)
                    }
                    return treeItem;
                },
                _recursionTree: function (data, parent, level, id, filter) {
                    var that = this, result = [], index = 0, _primaryKey = that._primaryKey, id, _parentId = that._parentId, _textField = that._textField, i = 0, item;
                    for (; i < data.length; i++) {
                        item = data[i];
                        if (filter(id, item)) {
                            data.splice(i, 1);
                            i--;
                            result.push(that._createTreeItem(data, level, index, parent, item, true));
                            index++;
                        }
                    }
                    return result;
                },

                _updateTreeData: function (silent) {
                    this._treeData = this._treeDataHandler();
                    if (!silent) {
                        this.trigger('data', this._treeData, this._source);
                    }
                },
                done: function (d, datasource) {
                    var that = this;
                    that.data = _.map(d, function (item) {
                        item._uid = that._getUid();
                        return item;
                    });
                    that._source = datasource;
                    that._treeData = that._treeDataHandler();
                    that.trigger('data', that._treeData, datasource);

                }
            });

            exports.TreeDataSource = TreeDataSource;
            exports.DataSource = DataSource;
            exports.RemoteTransport = RemoteTransport;
            exports.Model = Model;
            exports.Collection = Collection;

        }
    ]);
}));