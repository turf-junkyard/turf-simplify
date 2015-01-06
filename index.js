var simplify = require('simplify-js');

/**
 * Simplifies a `GeoJSONFeature` containing a `GeoJSONLineString` or
 * `GeoJSONPolygon` geometry. Internally uses [simplify-js](http://mourner.github.io/simplify-js/)
 * to perform simplification.
 *
 * @module turf/simplify
 * @param {GeoJSONFeature} feature - a feature to be simplified
 * @param {number} tolerance - simplification tolerance
 * @param {boolean} highQuality - whether or not to spend more time to create
 * a higher-quality simplification with a different algorithm
 * @return {GeoJSONFeature} output
 * @example
 * var quantization = 50;
 * var minimumArea = 0;
 * var simplified = turf.simplify(polys, quantization, minimumArea);
 */
module.exports = function(feature, tolerance, highQuality){
  if(feature.geometry.type === 'LineString') {
    var line = {
      type: 'LineString',
      coordinates: []
    };
    var pts = feature.geometry.coordinates.map(function(coord) {
      return {x: coord[0], y: coord[1]};
    });
    line.coordinates = simplify(pts, tolerance, highQuality).map(function(coords){
      return [coords.x, coords.y];
    });
    
    return simpleFeature(line, feature.properties);
  } else if(feature.geometry.type === 'Polygon') {
    var poly = {
      type: 'Polygon',
      coordinates: []
    };
    feature.geometry.coordinates.forEach(function(ring){
      var pts = ring.map(function(coord) {
        return {x: coord[0], y: coord[1]};
      });
      var simpleRing = simplify(pts, tolerance, highQuality).map(function(coords){
        return [coords.x, coords.y];
      });
      poly.coordinates.push(simpleRing);
    });
    return simpleFeature(poly, feature.properties)
  }
}

function simpleFeature (geom, properties) {
  return {
    type: 'Feature',
    geometry: geom,
    properties: properties
  };
}
