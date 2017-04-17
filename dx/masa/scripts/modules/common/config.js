/***
@desc 项目数据接口配置文件
@author fanyonglong
*/
define(function (require, exports, module) {
    var globalConfigs = window.sysGlobalConfig,
        serverConfig = globalConfigs.serverConfig,
        config = {
            'local': {
                'dealconsumeList': 'data/dealconsumeList.js', // 成交消费
            },
            'dev': {
                'logout':"out",// 退出接口
                'login': "login", // 登录接口
                'dealclientStatis': 'dealclient/lable-statis', // 成交画像菜单
                'dealclientList': 'dealclient/lable-list',// 成交画像报图
                'vistor_live_list': 'customermap/vistor_live_list',// 居住地图
                'vistor_work_list': 'customermap/vistor_work_list', // 工作地图
                'dealclientShop': 'dealclient/shop-top3', // 客户成交消费地图
                'retvisitdashboard': 'market/retvisitdashboard', // 回访统计
                'retvisitorcount': 'market/retvisitorcount',     // 回访客户数趋势
                'marketdashboard': 'market/marketdashboard',     // 到访监测
                'visitcounts': 'market/visitcounts',             // 到访走势
                'resvisitdashboard': 'market/resvisitdashboard', // 驻留监测
                'resvisitavgtime': 'market/resvisitavgtime'      // 驻留时长走势
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