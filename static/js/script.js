function upload(sourceId, destId, loadingId) {
    $(destId).hide();
    $(loadingId).show();
    if (!window.FileReader) {
        return alert('FileReader not supported');
    }
    var file = document.getElementById('gpxField');
    if (file.files.length) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $.post('/results', {
                user: $("#nameField").val(),
                gpx: reader.result
            }).done(function(up) {
                $(loadingId).hide();
                $(destId).text(up['user'] + up['gpx']);
                $(destId).show();
                graphClient(JSON.parse(up));
            }).fail(function() {
                $(destId).text("{{ _('Error: Could not contact server.') }}");
                $(loadingId).hide();
                $(destId).show();
                // graphClient(up);
            });
        }
        reader.readAsText(file.files[0]);
    }
}

var self_map = undefined;
var L_maps = []

function graphClient(up) {
    // Temporary override of file for testing purposes
    // up = {
    //     0: {
    //         'name': 'Angelou',
    //         'coords': [[40.3, .05], [40.4,.04]]
    //     },
    //     1: {
    //         'name': 'Tommoth',
    //         'coords': [[40.4, .06], [40.2,.03]]
    //     }
    // }
    // console.log("UP: ");

    console.log(up);

    resetMaps();
    // Assumes client is 0 indexed
    for (var client in up) {
        var latlngs = up[client]['coords'];
        var mapid = 'mapid' + (parseInt(client) + 2);

        var mymap = gen_map(mapid);
        var polyline = L.polyline(latlngs, {color: 'red'}).addTo(mymap);
        mymap.fitBounds(polyline.getBounds());
        L_maps.push(mymap);

        $("#" + mapid + "name").html(up[client]['name'])
    }

    self_map.remove();
    self_map = gen_map("mapid");
    var latlngs = up['5']['coords'];
    var polyline = L.polyline(latlngs, {color: 'red'}).addTo(self_map);
    mymap.fitBounds(polyline.getBounds());
}

function resetMaps() {
    L_maps.forEach(function(map) {
        map.remove();
    });
    L_maps.splice(0,L_maps.length);
}

function gen_map(mapid) {
    var mymap = L.map(mapid).setView([51.505, -0.09], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZG91YmxlZGFydCIsImEiOiJjajlrdzM4MmQxcDhuMndwZzV1NjJybzczIn0.CYNCPYhZTYv2WLvuEreM5A'
    }).addTo(mymap);
    return mymap;
}

$(function() {
  // Map instantiation
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);
  self_map = mymap;

  // Map street view render
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZG91YmxlZGFydCIsImEiOiJjajlrdzM4MmQxcDhuMndwZzV1NjJybzczIn0.CYNCPYhZTYv2WLvuEreM5A'
  }).addTo(mymap);

  // Map Marker example
  var marker = L.marker([51.51, -0.1]).addTo(mymap);

  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

  // Popup example
  var popup = L.popup();
  function onMapClick(e) {
      alert("You clicked the map at " + e.latlng);
  }

  mymap.on('click', onMapClick);

  // Draw polyline
  var latlngs = [
    [51.50, -.09],
    [51.501, -.092],
    [51.507, -.096]
  ];
  /*var latlngs = [
    [[45.51, -122.68],
     [37.77, -122.43],
     [34.04, -118.2]],
    [[40.78, -73.91],
     [41.83, -87.62],
     [32.76, -96.72]]
  ];*/
  var polyline = L.polyline(latlngs, {color: 'red'}).addTo(mymap);
  mymap.fitBounds(polyline.getBounds());
/*
  L_maps.push(gen_map('mapid2'));
  L_maps.push(gen_map('mapid3'));
  L_maps.push(gen_map('mapid4'));
  L_maps.push(gen_map('mapid5'));
  L_maps.push(gen_map('mapid6'));
*/
})
