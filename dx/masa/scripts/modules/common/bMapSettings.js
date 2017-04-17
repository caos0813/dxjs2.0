define(['async!BMap'], function () {

    var exports = {},modules = [
        function(element)
        {
            var bmap = new BMap.Map(element, {
                enableMapClick: false,
                minZoom: 4
            });

            var zoomControl = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM }); //右上角
            bmap.addControl(zoomControl);
            bmap.enableScrollWheelZoom(); // 启用滚轮放大缩小
            bmap.setMapStyle({
                styleJson: [{
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                              {
                                  "featureType": "poi",
                                  "elementType": "labels",
                                  "stylers": {
                                      "visibility": "off"
                                  }
                              },
                              {
                                  "featureType": "road",
                                  "elementType": "geometry",
                                  "stylers": {
                                      "color": "#000000",
                                      "weight": "0.1",
                                      "visibility": "on"
                                  }
                              },
                              {
                                  "featureType": "water",
                                  "elementType": "geometry",
                                  "stylers": {
                                      "color": "#000000",
                                      "visibility": "on"
                                  }
                              },
                              {
                                  "featureType": "label",
                                  "elementType": "labels",
                                  "stylers": {
                                      "visibility": "off"
                                  }
                              },
                              {
                                  "featureType": "local",
                                  "elementType": "geometry",
                                  "stylers": {
                                      "visibility": "off"
                                  }
                              },
                              {
                                  "featureType": "arterial",
                                  "elementType": "geometry",
                                  "stylers": {
                                      "visibility": "off"
                                  }
                              }]
            });
            return bmap;
        }
    ];

    function IconOverlay(point, icon) {
        this._icon = icon;
        this._point = point;
    }

    IconOverlay.prototype = new BMap.Overlay();
    IconOverlay.prototype.initialize = function (map) {
        this._map = map;
        var img = document.createElement("img");
        img.style.position = "absolute";
        img.style.width = this._icon.size.width + "px";
        img.style.height = this._icon.size.height + "px";
        img.src = this._icon.imageUrl;
        img.style.zIndex = 19999;
        map.getPanes().labelPane.appendChild(img);
        this._img = img;
        return img;
    }
    IconOverlay.prototype.draw = function () {
        var position = this._map.pointToOverlayPixel(this._point);
        this._img.style.left = position.x - this._icon.size.width / 2 + "px";
        this._img.style.top = position.y - this._icon.size.height / 2 + "px";
    }
    exports.IconOverlay = IconOverlay;
    exports.MapType = {
        BLACK:0
    };
    exports.initMap=function(element,MapType)
    {
       return modules[MapType](element);
    }
    return exports;

});