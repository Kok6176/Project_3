// Function for plotting charts
d3.json(data).then(function(sample){
  var coord = sample.map(s=>s.coordinates);
  var loc=sample.map(s=>s.location);
  var ttl=sample.map(s=>s.total_laid_off);
  var l = coord.length;


  // An array that will store the created cityMarkers
var cityMarkers = [];

for (var i = 0; i < l; i++) {
  // loop through the cities array, create a new marker, and push it to the cityMarkers array
  cityMarkers.push(
    L.marker(coord[i]).bindPopup("<strong>City:"+loc[i]+"</strong><br>Total Layoffs:"+ttl[i])
  );
}

// Add all the cityMarkers to a new layer group.
// Now, we can handle them as one group instead of referencing each one individually.
var cityLayer = L.layerGroup(cityMarkers);

  // {s}, {z}, {x} and {y} are placeholders for map tiles
  // {x} and {y} are the x/y of where you are on the map
  // {z} is the zoom level
  // {s} is the subdomain of cartodb
  var layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  });
  // Define tile layers
var satelliteMap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>",
  maxZoom: 18,
  id: "mapbox.satellite"
  
});

var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10"
  
});

var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11"
  
});

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
  id: "dark-v10"
  
});
// Define a baseMaps object to hold the base layers
var baseMaps = {
  "Satellite Map": satelliteMap,
  "Grayscale Map": Esri_WorldGrayCanvas,
  "Outdoors Map": Stadia_Outdoors,
  "Dark Map": Stadia_AlidadeSmoothDark
};

// Overlays that can be toggled on or off
var overlayMaps = {
  Cities: cityLayer
};

  // The first parameter are the coordinates of the center of the map
  // The second parameter is the zoom level
  var map = L.map('map',{
    center:[14.71964754, -17.45690089],
    zoom:3,
    layers: [layer, cityLayer]
  });

  // Now add the layer onto the map
  L.control.layers(baseMaps, overlayMaps).addTo(map);

});

