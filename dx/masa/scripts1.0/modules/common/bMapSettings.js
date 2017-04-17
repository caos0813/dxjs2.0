define(function () {

    var exports = {},modules = [
        function(element)
        {
            var bmap = new BMap.Map(element, {
                enableMapClick: false,
                minZoom: 4
            });
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

    exports.MapType = {
        BLACK:0
    };
    exports.initMap=function(element,MapType)
    {
       return modules[MapType](element);
    }
    return exports;

});