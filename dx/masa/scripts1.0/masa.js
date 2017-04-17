/****
masa 框架
author:fanyonglong
**/
(function (root, factory) {
    if (typeof define == "function" && typeof define.amd == "object"&&define.amd)
    {
        define(['jquery', 'lodash','vue'], function ($, _, Vue) {
            return root['Masa'] = factory($, _, Vue);
        });
    }else
    {
        root['Masa'] = factory(root['jQuery'], root['_'], root['Vue']);
    }
        
}(this, function ($,_,Vue) {
        
    return (function (modules) {
        var installedModules = {};
        function __require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {exports: {},id: moduleId,loaded: false};
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
        function (module, exports, __require__)
        {
            var extend = $.extend;
            exports = module.exports = {
                version: "1.0",
                _: _,
                $: $,
                Vue:Vue,
                mixin:function(protos)
                {
                    for(var name in protos)
                    {
                        exports[name] = protos[name];
                    }
                },
                hasInstanceof: function (obj, target)
                {
                    return obj instanceof target;
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
                if (index == 0)
                {
                    return;
                }
                exports.mixin(__require__(index));
            });
        },// 事件
        function (module, exports, __require__)
        {
            exports.Events = {
                on: function (name, handler, one) {
                    if (!this.__events__) {
                        this.__events__ = {};
                    }
                    if (Tc.isPlainObject(name)) {
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
                    var i, len, result, events = this.__events__[name] || [], args = Tc._.slice(arguments, 1), allevents = this.__events__["*"] || [];
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
        },// 视图
        function (module, exports, __require__)
        {
            var m = __require__(0), Class = m.Class, View, delegateEventSplitter = /^(\S+)\s*(.*)$/, viewOptions;
            viewOptions = ['Model', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
            View = Class.extend({
                el: 'body',
                tagName:"div",
                constructor: function (options) {
                    this.cid = _.uniqueId('view');
                    options || (options = {});
                    _.extend(this, _.pick(options, viewOptions));
                    this._ensureElement();
                    if (this.Model && !m.hasInstanceof(this.Model,Vue))
                    {
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
            View.mixin(__require__(1));
            exports.View = function (extendProto, staticPro, options) {
                var view = View.extend(extendProto, staticPro);
                return new view(options);
            }
            exports.View.extend = function (extendProto, staticPro)
            {
                return View.extend(extendProto, staticPro);
            }
        },
        // 网络请求
        function (module, exports, __require__)
        {
            var  configs = require('config'), responseStatus,ui=__require__(4).ui;

            responseStatus = {
                  'ok': "000",// 成功
                  'customerError': "001" // 后台自定义错误
            };
            $.ajaxSetup({
                type: "GET",
                dataType: "json",
                global: false,
                beforeSend: function () {
                },
                error: function (e) {
                },
                complete: function () {

                }
            });
            $(document).ajaxStart(function (e) {
            });
            $(document).ajaxSend(function (evt, request, settings) {
            });
            $(document).ajaxComplete(function (evt, request, settings) {
            });
            $(document).ajaxStop(function () {
            });
            function wrapReuqest(options)
            {
                function wrapSuccess(callback) {
                    callback=_.isFunction(callback)?callback:function(){};
                    return function(d)
                    {
                        var retStatus = d.retStatus, retMsg = d.retMsg || "访问服务器出错";
                        if (retStatus == responseStatus.ok) {
                            return callback.call(this,d.retBody, d);
                        } else if (retStatus == responseStatus.customerError) {
                            !options.isCustomerError &&alert(retMsg);
                            return callback.apply(this, arguments);
                        } else {
                            return callback.apply(this, arguments);
                        }
                    }
                }
                function wrapFail(callback) {
                    callback=_.isFunction(callback)?callback:function(){};
                    return function(d,errortext)
                    {
                        if (d.status == "timeout") {
                            ui.alert('网络请求超时');
                        } else if (errortext == 'parsererror') {
                            ui.alert('系统出错了');
                        }
                        return callback.apply(this, arguments);
                    }
                }
                function retryRequest() {
                    sendRequest(options);
                }
                function sendRequest(options) {
                    var ajax = $.ajax(options),then=ajax.then,done=ajax.done,fail=ajax.fail;
                    return  _.extend(ajax,{
                        then:function(scb,ecb)
                        {
                            var success=wrapSuccess(scb),dthen;
                            dthen =then(function(){
                                var result=success.apply(this,arguments);
                                if(_.isPlainObject(result)&&result.promise)
                                {
                                    result.done(wrapSuccess(function () {
                                        dthen.resolveWith(this,arguments);
                                    })).fail(wrapFail(function(){
                                        dthen.rejectWith(this,arguments)
                                    }));
                                }
                            },wrapFail(ecb));
                            return dthen;
                        },
                        done:function(cb)
                        {
                            done(wrapSuccess(cb));
                            return ajax;
                        },
                        fail:function(cb)
                        {
                            fail(wrapFail(cb));
                            return ajax;
                        }
                    });
                }
                options.isCustomerError = _.has(options, 'isCustomerError') ? options.isCustomerError : false;
                return sendRequest(options);
            } 
            function request(name, options)
            {
                options = options||{};
                if (name != "*") {
                    options.url = configs.getUrl(name);
                }
                return wrapReuqest(options);
            }
            function postRequest(name, options)
            {
                options = options || {};
                options.type = "post";
                return request(name, options);
            }
             function getRequest(name, options)
            {
                 options = options || {};
                 options.type = "get";
                 return request(name, options);
             }
             module.exports = {
                 request:request,
                 getRequest:getRequest,
                 postRequest: postRequest
             };
        },
        function (module, exports, __require__)
        {
            exports.ui = {
                alert:function(content,title)
                {
                    title = title || "温馨提示";
                    alert(content);
                },
                confirm: function (msg)
                {
                    window.confirm(msg);
                }
            };
        }
    ]);
}));