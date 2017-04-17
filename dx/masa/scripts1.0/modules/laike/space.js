require(['masa', 'mapv', 'common/bMapSettings'], function (Masa, $mapv, bMapSettings) {

    // 初始化地图
    var bmap = bMapSettings.initMap('map', bMapSettings.MapType.BLACK);

    bmap.centerAndZoom(new BMap.Point(121.473913, 31.238034), 10); // 初始化地图,设置中心点坐标和地图级别

    // 第一步创建mapv示例
    var mapv = new Mapv({
        drawTypeControl: true,
        map: bmap  // 百度地图的map实例
    });

    var layer = new Mapv.Layer({
        mapv: mapv, // 对应的mapv实例
        zIndex: 1, // 图层层级
        dataType: 'point', // 数据类型，点类型
        data:[],
        drawType: 'cluster', // 展示形式
        drawOptions: { // 绘制参数
            size: 60, // 网格大小
            unit: 'px', // 单位
            fillStyle: 'rgb(31,162,136)', // 填充颜色
            strokeStyle: 'rgba(255,255,255,0.3)', // 边框颜色
            label: { // 是否显示文字标签
                show: true,
            }
        }
    });
});