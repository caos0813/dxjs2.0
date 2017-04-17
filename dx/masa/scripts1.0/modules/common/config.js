/***
@desc 项目数据接口配置文件
@author fanyonglong
*/
define(function (require, exports, module) {
    var globalConfigs = window.sysGlobalConfig,
        serverConfig = globalConfigs.serverConfig,
        config = {
            'local': {
            },
            'dev': {
                'login': "login", // 登录接口
                'dealclientStatis': 'dealclient/lable-statis', // 成交画像菜单
                'dealclientList': 'dealclient/lable-list',// 成交画像报图
            }
        };
    function getEnvUrl(env,name)
    {
        var configUrl = config[env][name];
        return configUrl && serverConfig[env] + configUrl;
    }
    config.getUrl = function (name) {
        var url = getEnvUrl('dev', name) || getEnvUrl('local', name);
         if (!url)
         {
            throw "config  not found " + name;
         }
        return url;
    }
    module.exports = config;
});