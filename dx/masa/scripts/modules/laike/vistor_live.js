/**客户居住地图
author:fanyonglong
*/
require(['masa', 'mapv', 'common/bMapSettings'], function (Masa, $mapv, bMapSettings) {

    Masa.View({
        initialize: function () {
            this.markerIcon = new BMap.Icon('../../styles/img/marker-self.png',new BMap.Size(32,32));
            this.initMap();
            this.showMap();//businessData.getCaseId()
        },
        showMap: function () {
            var that = this;
            Masa.getRequest("vistor_live_list").done(function (d) {
                var marker = new bMapSettings.IconOverlay(new BMap.Point(d.caseLocate[0], d.caseLocate[1]), that.markerIcon);
                that.bmap.addOverlay(marker);
                that.bmap.setCenter(new BMap.Point(d.caseLocate[0], d.caseLocate[1]), 10); // 初始化地图,设置中心点坐标和地图级别
                that.bmap.setZoom(10);
                that.mapv.setData(that.parseData(d.customerLiveLocateList));
            });
        },
        parseData: function (d) {
            var data = [];
            data = Masa._.map(d, function (m) {
                return {
                    lng: m[0],
                    lat: m[1],
                    count:1
                };
            });
            return data;
        },
        initMap: function () {
            // 初始化地图
            var bmap = bMapSettings.initMap('map', bMapSettings.MapType.BLACK);
            bmap.centerAndZoom(new BMap.Point(121.473913, 31.238034), 15); // 初始化地图,设置中心点坐标和地图级别
            // 第一步创建mapv示例
            var mapv = new Mapv({
                drawTypeControl: true,
                map: bmap  // 百度地图的map实例
            });
            var layer = new Mapv.Layer({
                mapv: mapv, // 对应的mapv实例
                zIndex: 1, // 图层层级
                dataType: 'point', // 数据类型，点类型
                data: [],
                drawType: 'cluster', // 展示形式
                drawOptions: { // 绘制参数
                    size: 60, // 网格大小
                    unit: 'px', // 单位
                    fillStyle: 'rgb(31,162,136)', // 填充颜色
                    strokeStyle: 'rgba(255,255,255,0.3)', // 边框颜色
                    label: { // 是否显示文字标签
                        show: true,
                    },
                    data: []
                }
            });
            this.bmap = bmap;
            this.mapv = layer;



        }
    });
});