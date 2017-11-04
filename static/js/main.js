$(function() {
  console.log("Hello world from the console");

  $.get("doubledart.com/", function(data) {
    console.log("Get request data: ");
    console.log(data);
  });

  $.get("html/testpartial.html", function(data) {
    console.log("Get request data: ");
    console.log(data);
  });

  // Map instantiation
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);
  
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


  function gen_map(mapid) {
    var mymap = L.map(mapid).setView([51.505, -0.09], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZG91YmxlZGFydCIsImEiOiJjajlrdzM4MmQxcDhuMndwZzV1NjJybzczIn0.CYNCPYhZTYv2WLvuEreM5A'
    }).addTo(mymap);
  }

  gen_map('mapid2');
  gen_map('mapid3');
  gen_map('mapid4');
  gen_map('mapid5');
});