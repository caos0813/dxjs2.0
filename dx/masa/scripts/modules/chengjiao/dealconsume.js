/**客户成交消费地图
author:fanyonglong
*/
require(['masa', 'async!BMap', 'common/bMapSettings'], function (Masa, $BMap, bMapSettings) {


    var menuView= Masa.View({
        Model: {
            data: {
                list: [],
                listDetail:[]
            },
            methods: {
                showDetail:function(index,e)
                {
                    var item = this.list[index];                 
                        menuView.showDetail(item.id);
                },
                showConsumeDetail:function(index,e)
                {
                    var item = this.listDetail[index], element = $(e.currentTarget);
                    $("#listMenuDetail").find('li .popover').hide().eq(index).show();
                }
            }
        },
        initialize: function () {
            this.myIcon = new BMap.Icon("../../styles/img/marker-pink.png", new BMap.Size(32, 32));
            this.caseId = Masa.business.getCaseId();
            this.showMenu();
            this.initMap();
        },
        onMarkerChange:function(index)
        {
            $("#listMenuDetail").show().find('li .popover').hide().eq(index).show();
        },
        addMarker:function(index,lng,lat)
        {
            var marker = new BMap.Marker(new BMap.Point(lng, lat), { icon: this.myIcon });
            marker.addEventListener("click", Masa._.bind(this.onMarkerChange,this,index));
            this.bmap.addOverlay(marker);
        },
        showMarkers:function(data)
        {
            var i = 0, index = -1, coordinates = Masa._.flatMap(data, function (d) { index++; return _.map(d.coordinates, function (m) { return { lng: m.longitude, lat: m.latitude, index:index } }) }), len = coordinates.length, item, bmap = this.bmap;
            bmap.clearOverlays();
            for (; i < len;i++)
            {
                item = coordinates[i];
                this.addMarker(item.index, item.lng, item.lat);
            }
            if(len>0)
            {
                bmap.setCenter(new BMap.Point(coordinates[0].lng, coordinates[0].lat));
                bmap.setZoom(6);
            }
        },
        initMap:function()
        {
            var bmap = bMapSettings.initMap('map', bMapSettings.MapType.BLACK);
            bmap.centerAndZoom(Masa.business.getCurrentCity());
            this.bmap = bmap;
        },
        showPopover:function(id)
        {
            var target = $("#divMenu").children('[data-id="' + id + '"]'), element = $("#listMenuDetail"), height, width, offset, top, left,width2;
            element.show();
            height = target.height();
            width = target.width();
            offset = target.offset();
            width2=element.width();
            top = offset.top + height;
            left = offset.left + width / 2 - width2/2;        
            $("#listMenuDetail").attr('data-id',id).css({
                top: top,
                left:left
            });
        },
        showMenuDetail:function(id,d)
        {

            var that = this;
            that.Model.listDetail = d;
            that.showMarkers(d);
            if (d.length > 0) {
                that.Model.$nextTick(function () {
                    that.showPopover(id);
                });
               
            }
        },
        showDetail:function(id,callback)
        {

            var that = this, caseId = that.caseId, popover = $("#listMenuDetail"), popid = popover.attr('data-id');
            if (id == popid) {
                if (popover.is(":visible")) {
                    popover.hide();
                } else {
                    popover.show();
                }
            } else {
                popover.attr('data-id','').hide();
                Masa.getRequest("dealclientShop", {
                    data: {
                        consumeId: id,
                        caseId: caseId
                    }
                }).done(function (d) {

                    that.showMenuDetail(id, d);
                });
            }
        },
        showMenu:function()
        {
            var that = this;
            Masa.getRequest("dealconsumeList").done(function (d) {
                that.Model.list = d;
            });
        }


    });

});