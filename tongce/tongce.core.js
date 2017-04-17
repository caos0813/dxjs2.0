/**
@author:fanyonglonng
@desc 核心类
*/
(function (root, factory) {
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(['jquery', 'lodash'], function ($, _) {
            return factory(root, $, _);
        });
    } else {
        root.Tc = factory(root, $, _);
    }
}(this, function (window, $, _) {
    var Tc = window.Tc= {
        $: $,
        _: _,
        extend:$.extend
    }, extend = $.extend, Class = function () { }, View, Events, ARRAY_CORE = [];
    extend(Tc, _.pick(_, ['create', 'has', 'template', 'uniqueId', 'hasIn', 'forEach', 'isFunction', 'bind', 'bindAll', 'isPlainObject']));
    Tc.hasInstanceof=function(obj,target)
    {
        return obj instanceof target;
    }
    Events = {
        on: function (name, handler, one) {
            if (!this._events) {
                this._events = {};
            }
            if (Tc.isPlainObject(name)) {
                for (var n in name) {
                    this.on(n, name[n], one);
                }
                return this;
            }
            var events = this._events[name] = this._events[name] || [];
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
            if (!this._events) return this;
            if (!name) {
                this._events = {};
            }
            else if (name && !handler) {
                this._events[name] = [];
            } else {
                var events = this._events[name] || [], newEvents;
                for (var i = events.length - 1; i >= 0; i--) {
                    if (events[i] == handler) {
                        events.splice(i, 1);
                    }
                }
            }
            return this;
        },
        trigger: function (name) {
            if (!this._events) return this;
            if (!name) {
                for (var name in this._events) {
                    this.trigger(name);
                }
                return this;
            }
            var i, len, result, events = this._events[name] || [], args = Tc._.slice(arguments, 1), allevents = this._events["*"] || [];
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
    function EventEmitter() { }
    extend(EventEmitter.prototype, Events);
    Tc.define = function (name, module) {
        if (Tc.isPlainObject(name)) {
            for (var n in name) {
                Tc.define(n, name[n]);
            }
            return;
        }
        if (Tc.has(name)) {
            throw name + " already exist";
        }
        return Tc[name] = module;
    }
    Tc.EventEmitter = EventEmitter;
    Tc.GlobalEventEmitter = new EventEmitter();
    Tc.Events = Events;
    Tc.Class = Class;
    Class.extend = function (protoProps, staticProps) {
        var parent = this, member, name, child;
        if (protoProps && Tc._.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () { return parent.apply(this, arguments); };
        }
        extend(child, parent, staticProps);
        child.prototype = Tc._.create(parent.prototype, {'constructor':child});
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
            }else if(argCount==1)
            {
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
    View = Class.extend({
        el: null,
        constructor: function (options) {
            if (!Tc.hasInstanceof(this, View))
            {
                return new View(options);
            }
            this.el = this.el || 'body';
            this.$el = Tc.$(this.el);
            this.viewid = Tc.uniqueId("view_");
            this.events = this.events || {};
            this.initialize.apply(this, arguments);
            this.initEvents(this.events);
        },
        getEl: function (selector) {
            return $(selector, this.$el);
        },
        delegateEvent: function (name, selector, handler) {
            this.$el.on(name + "." + this.viewid, selector, handler);
        },
        initEvents: function (events) {
            var that = this, name, eventname;
            Tc.forEach(events, function (callback, seletor) {
                seletor = seletor.split(/\s+/);
                eventname = seletor.pop();
                name = seletor.join(" ");
                callback = Tc.isFunction(callback) ? callback : that[callback];
                callback = Tc.bind(callback, that);
                that.delegateEvent(eventname, name, callback);
            });
        },
        initialize: function () { },
        destroy:function()
        {
            this.$el.off("." + this.viewid);
        }
    });
    View.mixin(Events);
    Tc.geHtmlTemplate=function(url)
    {
        var html = '';
        $.ajax({ type: "get", dataType: "html", async: false ,url:url}).done(function (d) { html = d; });
        return html;
    }
    Tc.View = function (options,staticPro,args) {
        var view = View.extend(options, staticPro);
        return new view(args);
    };
    Tc.View.extend = function (options, staticPro) {
        return View.extend(options, staticPro);
    }
    Tc.View.fn = View.prototype;
    Tc.browser = {
        getScrollSize: function () {
            var h = document.documentElement.scrollHeight || document.body.scrollHeight,
                w = document.documentElement.scrollWidth || document.body.scrollWidth,
             t = document.documentElement.scrollTop || document.body.scrollTop;
            return { h: h, w: w, t: t };
        },
        getWindowSize: function () {
            var h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
            var w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
            return { h: h, w: w };
        }
    };
    Tc.requestAnimationFrame = (function () {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            setTimeout(callback, 1000 / 60);
        };
        return function (callback) {
            requestAnimationFrame(callback);
        }
    }());
    return Tc;
}));