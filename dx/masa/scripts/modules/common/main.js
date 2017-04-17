(function () {
    var
        baseUrl = '/masa/webpage/',
        // 系统全局配置
        sysGlobalConfig = window.sysGlobalConfig = {
            serverConfig: {
                'local': baseUrl,// 本地环境
                'dev': '/masa/a/', // jsp 开发环境
            },// 服务器地址配置
            isLog: true // 是否打印日志
        },
        // 模块依赖配置
        config = {
            baseUrl: baseUrl,
            //    urlArgs: "" + (new Date().getDate()),
            deps: ['jquery', 'config'],
            paths: {
                'jquery': "scripts/jquery-3.1.min",
                'validate':"scripts/jquery.validate.min",
                'modules': "scripts/modules",
                'common': "scripts/modules/common",
                'config': "scripts/modules/common/config",
                'plugins': "scripts/plugins",
                'echarts': "scripts/echarts.min",
                'async':"scripts/async",
                'BMap': 'http://api.map.baidu.com/api?v=2.0&ak=1XjLLEhZhQNUzd93EjU5nOGQ',
                'mapv': "scripts/Mapv",
                'masa':"scripts/masa"
            },
            shim: {
                'BMap': {
                    exports: 'BMap'
                },
                'mapv': {
                    exports: "Mapv",
                    deps: ['async!BMap']
                }
            },
            waitSeconds: 60,
            callback: function () {
                $().ready(function () {
                    var loadModules = ['masa'];
                    require(loadModules, function () {
                        if (window.tc_ready) {
                            window.tc_ready();
                        }
                        loadInitPage();
                    });
                });
            }
        };
    function loadInitPage() {
        var scripts = $("script[data-init]"), modulePath;
        if (scripts.length > 0 && (modulePath = scripts.attr("data-init"))) {
            require([modulePath], function () { });
        }
    }
    if (!sysGlobalConfig.isLog) {
        window.console = function () { };
    }
    function loadLink(path) {
        var head = document.getElementsByTagName("head");
        var script = document.createElement('link');
        script.href = path;
        script.rel = "stylesheet";
        head = head.length > 0 ? head[0] : document.body;
        head.appendChild(script);
    }
    function loadScripts(path, async, callback) {
        var script = document.createElement('script');
        script.src = path;
        script.async = async;
        var head = document.getElementsByTagName("head");
        if ('onload' in script) {
            script.onload = onload
            script.onerror = function () {
                onload(true);
            }
        } else {
            script.onreadystatechange = function () {
                if (/loaded|complete/.test(script.readyState)) {
                    onload();
                }
            }
        }
        function onload() {
            script.onerror = script.onload = null;
            callback();
            script.parentNode.removeChild(script);
        }
        head = head.length > 0 ? head[0] : document.body;
        head.appendChild(script);
    }
    requirejs.config(config);
    requirejs.onError = function (err) {
        console.log(err.message);
        if (err.requireType === 'timeout') {
            console.log('modules: ' + err.requireModules);
        }
        throw err;
    }
    // loadLink(config.baseUrl + "styles/css/pace/blue/pace-theme-barber-shop.css");
    // loadScripts(config.baseUrl + "scripts/pace.min.js", false, function () { });
    //loadScripts(config.baseUrl + "scripts/require.min.js", false, function () {
    //    requirejs.config(config);
    //    requirejs.onError = function (err) {
    //        console.log(err.message);
    //        if (err.requireType === 'timeout') {
    //            console.log('modules: ' + err.requireModules);
    //        }
    //        throw err;
    //    }
    //});
}());