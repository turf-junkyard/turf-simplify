var simplify = require('simplify-js');

module.exports = function(feature, tolerance, highQuality){
  if(feature.geometry.type === 'LineString') {
    var line = {
      type: 'LineString',
      coordinates: []
    };
    var pts = feature.geometry.coordinates.map(function(coord) {
      console.log(1)
      return {x: coord[0], y: coord[1]};
    });
    line.coordinates = simplify(pts, tolerance, highQuality).map(function(coords){
      console.log(coords)
      return [coords.x, coords.y];
    });
    
    return simpleFeature(line, feature.properties);
  } else if(feature.geometry.type === 'Polygon') {
    var poly = {
      type: 'Polygon',
      coordinates: []
    };
  } 
}

function simpleFeature (geom, properties) {
  return {
    type: 'Feature',
    geometry: geom,
    properties: properties
  };
}