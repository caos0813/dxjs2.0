(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['lodash', 'jquery', 'vue'], function (_, $, vue) {
            factory(root, _, $, vue);
        });
    } else if (typeof module == 'object', typeof module.exports !== 'undefined') {
        var _ = require('lodash'), $ = require('jquery'), vue = require('vue');
        module.exports = factory(root, _, $, vue);

    } else {
        factory(root, util, root._, root.$, root.Vue);
    }
})(this, function (root, _, $, Vue) {
    var _define, _require, Yg = {};
    (function () { var e = {}; function f(j, i, g) { if (!Array.isArray(i)) { g = i; i = [] } var h = { dependencies: a(j, i), factory: g }; if (i.indexOf("exports") !== -1) { h.exports = {} } e[j] = h } function a(i, h) { i = i || ""; var g = i.split("/"); g.pop(); return h.map(function (l) { if (l[0] === ".") { var k = l.split("/"); var j = g.slice(0); k.forEach(function (m) { if (m === "..") { j.pop() } else { if (m !== ".") { j.push(m) } } }); return j.join("/") } else { return l } }) } function d(i, h, g) { return i.map(function (k) { if (k === "exports") { return g } if (k === "require") { return function (m, l) { b(a(h, m), l) } } var j = e[k]; if (!j) { throw new Error("Undefined dependency: " + k) } if (!j.resolved) { j.resolved = c(j.dependencies, j.factory, k, j.exports); if (typeof j.resolved === "undefined") { j.resolved = j.exports } } return j.resolved }) } function c(j, h, i, g) { var k = d(j, i, g); if (h && h.apply) { return h.apply(null, k) } else { return h } } function b(h, g) { if (!Array.isArray(h)) { h = [h] } c(h, g) } _define = f; _require = b })();
    _define('1yyg/exports', Yg);
    _define('1yyg/register', ['./exports'], function (exports) {
        return function (name, options) {
            if (!options) {
                options = name;
                name = '';
            }
            if (name == '') {
                _.extend(exports, options);
            } else {
                exports[name] = options;
            }
        }
    });
    _define('1yyg/core', ['./register'], function (register) {
        var extend = $.extend, noop = $.noop;
        _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
        _.templateSettings.evaluate = /{{([\s\S]+?)}}/g;
        _.templateSettings.escape = /{{-([\s\S]+?)}}/g;
        var core = {
            version: "1.0",
            _: _,
            $: $,
            Vue: Vue,
            extend: extend,
            each: _.each,
            map: _.map,
            create: _.create,
            mixin: function (protos) {
                _.extend(this, protos);
                return this;
            },
            inherits: function (childCtor, parentCtor) {
                childCtor.prototype = _.create(parentCtor.prototype, { 'constructor': childCtor });
            },
            has: _.has,
            hasInstanceof: function (obj, target) {
                return obj instanceof target;
            },
            template: function (template, options) {
                return _.template(template, options);
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
            preventRepeat: function (fn, callback) {
                callback = callback || noop;
                var object = {
                    state: '',
                    resolve: function () {
                        this.state = 'Resolved';
                        callback.apply(context, arguments);
                    }
                }, context = null;
                var resolve = object.resolve.bind(object);
                return function () {
                    if (object.state == "Pending") {
                        return;
                    }
                    object.state = "Pending";
                    fn.apply(context = this, _.concat(resolve, _.toArray(arguments)));
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
            }),
            tailRecursion: function (f) {
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
            recursionArray: function (id, data, IdField, ParentField) {
                var childs = [], currentData = data, recursionData, index = 0, len;
                var recursionFilter = core.tailRecursion(function (id) {
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
                recursionFilter(id, data);
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
            core.inherits(child, parent);
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
        core.Class = Class;
        register(core);
        return core;
    });
    _define('1yyg/events', ['./core'], function (register, core) {

    });
    _define('1yyg/view', ['exports', './register', './core', './events'], function (exports, register, core, Events) {
        var Class = core.Class, View, delegateEventSplitter = /^(\S+)\s*(.*)$/, viewOptions;
        viewOptions = ['Model', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
        View = Class.extend({
            el: 'body',
            tagName: "div",
            __silentInit: false,
            constructor: function (options) {
                this.cid = _.uniqueId('view');
                options || (options = {});
                _.extend(this, _.pick(options, viewOptions));
                if (this.Model && !core.hasInstanceof(this.Model, Vue)) {
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
            }
        });
        View.mixin(Events);
        exports.View = function (extendProto, staticPro, options) {
            var view = View.extend(extendProto, staticPro);
            return new view(options);
        }
        exports.View.extend = function (extendProto, staticPro) {
            return View.extend(extendProto, staticPro);
        }
        register(exports);
    });
    _define('1yyg/ui', ['exports', './register', './core'], function (exports, register, core) {

        exports.ui = {};
        register(exports);
    });
    _define('1yyg/request', ['exports', './register', './core', './ui'], function (exports, register, core, ui) {
        var
             responseStatus, noop = $.noop, globalAjaxSetting = {
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
                withCredentials: false
            }
        });


        $(document).ajaxStart(function (e) {
        });
        $(document).ajaxSend(function (evt, request, settings) {

        });
        $(document).ajaxComplete(function (evt, request, settings) { });
        $(document).ajaxStop(function () {

        });
        function wrapReuqest(options) {
            var ajaxOptions = _.omit(options, 'name');
            return $.ajax(ajaxOptions);
        }
        function getUrl(name) {
            var configs = require('config');
            return configs.getUrl(name);
        }
        function request(name, options) {
            options = options || {};
            if (name != "*") {
                options.url = getUrl(name);
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
        exports.request = request;
        exports.getRequest = getRequest;
        exports.postRequest = postRequest;
        exports.responseStatus = responseStatus;
        register(exports);
    })
    _define('1yyg/base', ['./exports', './core', './events', './view', './ui', './request'], function (exports) {
        return exports;
    });
    _require(['1yyg/base'], function (exports) {
        root.Yg = exports;
    });
    return Yg;
});