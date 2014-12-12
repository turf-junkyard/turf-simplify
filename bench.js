var simplify = require('./');
var Benchmark = require('benchmark');
var fs = require('fs');

//console.log(JSON.parse(fs.readFileSync(__dirname+'/test/fixtures/in/complexLine.geojson')))
var line = JSON.parse(fs.readFileSync(__dirname+'/test/fixtures/in/complexLine.geojson'));
var poly = JSON.parse(fs.readFileSync(__dirname+'/test/fixtures/in/complexPolygon.geojson'));
var suite = new Benchmark.Suite('turf-simplify');
suite
  .add('turf-simplify#LineString',function () {
    simplify(line, 50, 0);
  })
  .add('turf-simplify#Polygon',function () {
    simplify(poly.features, 50, 0);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    
  })
  .run();