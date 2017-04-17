
/***
@desc 项目数据接口配置文件
@author fanyonglong
*/

    var
        serverPath = "__MASA_SERVERPATH__",
        config = {
            'local': {
                'getHomeSalesInfo': "mockdata/getHomeData.json", // 磁贴 
                'getLandDealRanking': "mockdata/getChengJiaoPHB.json", // 土地成交排行榜
                'getHomeRightMenu': "mockdata/getHomeRightMenu.json", // 首页右边菜单列表
                'getDealRanking': "mockdata/getJiaoyiPHB.json", // 交易排行榜
                'getHomeMapInfo': "mockdata/getHomeMapInfo.json", // 获取地图行政区信息
                'getHomeLiangJiaChar': "mockdata/getHomeLiangJiaChar.json", // 获取首页量价报表数据
                'getQKCCycleChart': "mockdata/getHomeQKCZhouQi.json",//去库存
                'getBEndData': "mockdata/getMarketMapArea.json",
                'getMarketMapPlat': "mockdata/getMarketMapPlat.json",
                'getMarketMapProj': "mockdata/getMarketMapProj.json",
                'district': 'sys/dict/district?cityId=1', //行政区
                'plate': 'sys/dict/plate', //板块
                'property-type': 'sys/dict/list-dict?type=property_type',//物业类型
                'house-type': 'sys/dict/list-dict?type=house_type',//房型
                'getBEndDataRanking': "mda/md/marketableDyncMap/getBEndDataRanking", // B端成交排行榜
                'getWorkplaceRanking': "mockdata/getWorkplaceRanking.json", // 工作地排行榜
                'getDesidenceRanking': "mockdata/getDesidenceRanking.json", // 居住地排行榜
                'getMarketDynamics': "mockdata/getMarketDynamics.json", // 市场动态地图
                'getFamilyStructure': "mockdata/getFamilyStructure.json", // 家庭结构
                'getBenanList': "mockdata/getBenanList.json", // 获取本案列表
                'getWodeJPList': "mockdata/getWodeJPList.json", // 获取我的竟品列表
                'getTuiJingJPList': "mockdata/getTuiJingJPList.json", //推荐竟品
                'deleteWodeJPList': "mockdata/deleteWodeJPList.json",  // 删除
                'addTuiJingJP': "mockdata/deleteWodeJPList.json",
                'cancelTuiJingJP': "mockdata/deleteWodeJPList.json"
            },
            'dev': {
                'login': "login",
                'logout': "logout",
                'stock-cycle': "mda/md/supply/stock-cycle",
                'getHomeRightMenu': "dashboard/initChars",
                'getHomeSalesInfo': "dashboard/initWordStickers",
                'district':'sys/dict/district?cityId=1', //行政区
                'plate':'sys/dict/plate', //板块
                'property-type':'sys/dict/list-dict?type=property_type',//物业类型
                'house-type': 'sys/dict/list-dict?type=house_type',//房型
                'getHomeMapInfo': "dashboard/item",
                'getDealRanking': "dashboard/getDealRanking",// 交易排行榜
                'getLandDealRanking': "dashboard/getLandDealRanking",// 土地成交排行榜
                'getGQJLChart': "dashboard/getGQJLChart",// 供求价
                'getQKCCycleChart': "dashboard/getQKCCycleChart",// 去库存
                'supply-demand-stock': 'mda/md/supply/supply-demand-stock', //供求价
                'getBEndData': "mda/md/marketableDyncMap/getBEndData", // 
                'getBEndDataRanking': "mda/md/marketableDyncMap/getBEndDataRanking",// B端成交排行榜
                'mixmax-area': "mda/md/supply/mixmax-area?cityId=1", // 供应最大面积最小
                'mixmax-info': "mda/md/deal/mixmax-info?cityId=1", //  成交 最大最小面积  最大最小均价 最大最小总价（万）
                'deal-statis-simpl1': "mda/md/deal/deal-statis-simpl", //  项目成交按名称查询1(模糊查询)
                'deal-statis-simpl2': "mda/md/deal/deal-statis-simpl", //  项目成交按名称查询1(精确查询)
                'deal-statis-adv': "mda/md/deal/deal-statis-adv", //  项目成交高级查询
                'dealProjectList': "mda/md/deal/project-list", //  项目成交搜索框模板查询项目信息
                'deal-list-simpl': "mda/md/deal/deal-list-simpl", //  项目成交明细普通查询
                'deal-list-adv': "mda/md/deal/deal-list-adv", //  项目成交明细高级查询
                'deallist-simpl-download': "mda/md/deal/deallist-simpl-download", //  项目成交明细普通查询下载
                'deallist-adv-download': "mda/md/deal/deallist-adv-download", //  项目成交明细高级查询下载
                'struc-analysis-area': "mda/md/supply/struc-analysis-area", //  结构分析面积
                'struc-analysis-price': "mda/md/supply/struc-analysis-price", //  结构分析总价
                'supply-statis-adv': 'mda/md/supply/supply-statis-adv', //项目供应高级查询
                'getBenanList': "settings/cp/localCase", // 获取本案列表
                'getJingPinAutoComplete': "settings/cp/autoCompleter",
                'addJingPinOne': "settings/cp/auto-addcp",// 添加竟品 自动补全添加
                'getTuiJingJPList': "settings/cp/rcplist",// 推荐竟品
                'getWodeJPList': "settings/cp/cplist",// 我的竟品
                'getMarketDynamics': "mda/md/client/client-info",
                'getFamilyStructure': "mda/md/client/laben-info", // 家庭结构
                'deleteWodeJPList': "settings/cp/deletecp",  // 删除
                'addTuiJingJP': "settings/cp/savecp",
                'cancelTuiJingJP': "settings/cp/channelcp",
                'supply-list-adv': "mda/md/supply/supply-list-adv", // 项目供应明细高级查询
                'supply-list-simpl': "mda/md/supply/supply-list-simpl", // 项目供应明细简单查询
                'supplyProjectList': "mda/md/supply/project-list", //项目成交搜索框模板查询项目信息
                'supply-statis-simpl1': "mda/md/supply/supply-statis-simpl", //项目供应按名称查询(模糊查询)
                'supply-statis-simpl2': "mda/md/supply/supply-statis-simpl", //项目供应按名称查询(精确查询)
                'supplylist-simpl-download': "mda/md/supply/supplylist-simpl-download", //项目供应按名称查询下载
                'report-list': "report/report-list", // masa报告列表
                'report-mark': "report/report-mark", // masa报告收藏
                'report-check': "report/report-check", // masa报告状态
                'report-del': "report/report-del", // 删除masa报告
                'reportModuleInfo': "report/module-info",// 组件库
                'reportInfo': "report/report-info",// 我的组件库
                'reportSave': "report/report-save", //  保存报告
                'reportConclusionList': "report/conclusion-list",
                'reportUploadImage': "report/upload-drawing", // 上传报告图片
                'report-log': "report/upd-log", // 查看masa报告修改纪录
                'report-copy': "report/report-copy", // masa报告复制
                'report-share': "report/report-share", // masa报告分享
                'report-visit': "report/share-visit", // 访问报告密码验证
                'report-update-try': "report/report-update-try", // 修改报告
                'report-export': "report/report-export", // 报告导出
                'report-officeuser': "report/office-user", // 获取部门及用户
                'report-permission': "report/report-permission", // 获取报告权限
                'report-savepermission': "report/save-permission",
                'report-conclusion-quote': "report/conclusion-quote", // 引用评论
                'case-user-info': "case/case-user-info"

            }
        };
    function getEnvUrl(env,name)
    {
        var configUrl = config[env][name];
        if (!configUrl)
        {
            throw "config  not found " + name;
        }
        if (configUrl.indexOf('http://')==0)
        {
            return configUrl;
        }
        if (env == 'dev') {
            return configUrl && serverPath + configUrl;
        } else {
            return configUrl && "__MASA_LOCALSERVERPATH__" + configUrl;
        }
    }
    config.getUrl = function (name) {
        var url = getEnvUrl("__MASA_ENV__", name) || getEnvUrl('local', name);
            if (!url) {
                throw "config  not found " + name;
            }
            return url;
    }
    window.configs = config;
