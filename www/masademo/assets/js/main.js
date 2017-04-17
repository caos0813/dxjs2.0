/***
@desc 资源配置文件
@author fanyonglong
*/
(function () {
    var
        baseUrl = '__MASA_WEBROOT__',
        isLog = true,
        urlArgs = '__MASA_REQUIRE_URLARGS__',
        // 模块依赖配置
        config = {
            baseUrl: '/www/masademo',
            urlArgs: urlArgs,
            deps: [],
            paths: {
                "masa": "assets/js/masa",
                "jquery": "assets/js/jquery.min",
                "config": "scripts/common/config",
                "lodash": "assets/js/lodash.min",
                "datepicker": "assets/js/bootstrap-datepicker.min",
                "datetimepicker": "assets/js/bootstrap-datetimepicker.min",
                "bootstrap": "assets/js/bootstrap.min",
                "echarts": "assets/js/echarts.min",
                "highcharts": "assets/js/highcharts.min",
                "vue": "assets/js/vue.min",
                "common": "scripts/common",
                "ol": "assets/js/ol.min",
                "css": "assets/js/css.min",
                "async": "assets/js/async",
                "styles": "assets/styles/css",
                "components": "scripts/common/components",
                'html2canvas': "assets/js/html2canvas.min"
            },
            shim: {
                bootstrap: ['jquery'],
                datetimepicker: ['bootstrap', 'css!styles/bootstrap-datetimepicker.min.css'],
                datepicker: ['bootstrap', 'css!styles/bootstrap-datepicker.min.css'],
                ol: ['css!styles/ol.min.css'],
                highcharts: {
                    exports: "Highcharts"
                },
                html2canvas: {
                    exports: "html2canvas"
                }
            },
            waitSeconds: 60,
            callback: function () {
               
            }
        };
    window.MASAGOLBALCONFINGS = {
        baseUrl: baseUrl,
        env: "__MASA_ENV__",
        serverPath:"__MASA_SERVERPATH__"
    };
    function loadInitPage() {
        var scripts = $("script[data-init]"), modulePath;
        if (scripts.length > 0 && (modulePath = scripts.attr("data-init"))) {
            require([modulePath], function () { });
        }
    }

    requirejs.config(config);
    requirejs.onError = function (err) {
        console.log(err.message);
        if (err.requireType === 'timeout') {
            console.log('modules: ' + err.requireModules);
        }
        throw err;
    }

}());