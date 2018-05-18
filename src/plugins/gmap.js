/*
routing_options = {
    enabled,
    input_id,
    output_id
}
*/
window.usedGAPI = window.usedGAPI ? window.usedGAPI : [];
var gmap = function(api_key, map_id, locs, zoom_rate, routing_options, disableUI, disableScroll)
{
    var self            =   this,
        map             =   null,
        center_point    =   null,
        dir_service     =   null,
        dir_display     =   null,
        markers         =   [];

    this.init = function()
    {
        if (locs && locs.length > 0) {
            if (locs.length > 1) {
                var bound = new google.maps.LatLngBounds();

                for (i = 0; i < locs.length; i++) {
                    bound.extend( new google.maps.LatLng(locs[i].lat, locs[i].lng) );
                }

                center_point = bound.getCenter();

            } else {
                center_point = locs[0];
            }

            map = new google.maps.Map(document.getElementById(map_id), {
              zoom: zoom_rate ? zoom_rate : 18,
              center: center_point,
              styles: [
                        {
                            "featureType": "all",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.country",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#e5c163"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.locality",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#c4c4c4"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.neighborhood",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#e5c163"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 21
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "poi.business",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#e5c163"
                                },
                                {
                                    "lightness": "0"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#e5c163"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#575757"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#2c2c2c"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#999999"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        }
                    ],
              disableDefaultUI: (disableUI === undefined || disableUI === null) ? false : disableUI
            });

            if (disableUI) {
                var noPoi = [
                    {
                        featureType: "poi",
                        stylers: [
                          { visibility: "off" }
                        ]
                    }
                ];

                map.setOptions({styles: noPoi});
            }

            if (disableUI) {
                map.setOptions({scrollwheel: false});
            }


            for (var i = 0; i < locs.length; i++) {
                var marker = new google.maps.Marker({
                    position    :   locs[i],
                    map         :   map,
                    url         :   locs[i].url
                });

                if (locs[i].cbf) {
                    marker.addListener('click', locs[i].cbf);
                } else {
                    marker.addListener('click', function()
                    {
                        window.open(this.url, '_blank');
                    });
                }

                markers.push(marker);
            }

            if (routing_options && routing_options.enabled) {
                dir_service = new google.maps.DirectionsService();
                dir_display = new google.maps.DirectionsRenderer();
                dir_display.setMap(map);
                if (routing_options.output_id) {
                    dir_display.setPanel(document.getElementById(routing_options.output_id));
                }

                var autoComplete = new google.maps.places.Autocomplete(
                    /** @type {!HTMLInputElement} */(document.getElementById(routing_options.input_id)),
                    {types: ['geocode']});
                autoComplete.addListener('place_changed', function()
                {
                    var place = autoComplete.getPlace();
                    $('#' + routing_options.input_id).data('lat', place.geometry.location.lat());
                    $('#' + routing_options.input_id).data('lng', place.geometry.location.lng());
                });
            }
        }
    };

    this.update = function(lat, lng)
    {
        self.clearMarkers();
        lat = typeof(lat) == 'string' ? lat.toFloat() : lat;
        lng = typeof(lng) == 'string' ? lng.toFloat() : lng;
        var marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map
        });

        markers.push(marker);
        map.setCenter({lat: lat, lng: lng});
    };

    this.clearMarkers = function()
    {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

        markers = [];
    };

    this.route = function(origin, destination, travel_mode)
    {
        var request = {
            origin:         origin,
            destination:    destination,
            travelMode:     travel_mode ? travel_mode : 'DRIVING'
        };

        dir_service.route(request, function(response, status) {
            if (status == 'OK') {
                dir_display.setDirections(response);
            }
        });
    };

    if (!window.google) {
        if (!window.usedGAPI[api_key]) {
            window.usedGAPI[api_key] = true;
            $.when(
                $.getScript( "https://maps.googleapis.com/maps/api/js?key=" + api_key + "&libraries=places"),
                $.Deferred(function( deferred ){
                    $( deferred.resolve );
                })
            ).done(self.init);
        } else {
            var watching = setInterval(function(){
                if (window.google) {
                    clearInterval(watching);
                    watching = null;
                    self.init();
                }
            }, 50);
        }
    } else {
        self.init();
    }
    return this;
};

(function($)
{
    $.fn.gmap = function(cbf)
    {
        var self        =   $(this),
            url         =   self.data('url'),
            callback    =   cbf,
            lat         =   self.data('lat').toFloat(),
            lng         =   self.data('lng').toFloat(),
            zoom        =   Math.round(self.data('zoom').toFloat()),
            api         =   self.data('api'),
            input       =   self.data('input'),
            output      =   self.data('output'),
            map         =   new gmap(api, self.attr('id'), [{lat: lat, lng: lng, url: url, cbf: callback}], zoom, {enabled: (input !== undefined ? true : false), input_id: input, output_id: output});

        return map;
    };
 })(jQuery);
