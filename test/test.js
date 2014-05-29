var simplify = require('../'),
  test = require('tape'),
  glob = require('glob'),
  fs = require('fs')

var REGEN = false;

test('simplify', function(t){
  glob.sync(__dirname + '/fixtures/in/*.geojson').forEach(function(input) {
      var output = simplify(JSON.parse(fs.readFileSync(input)), 50, 0);
      if (REGEN) fs.writeFileSync(input.replace('/in/', '/out/'), JSON.stringify(output));
      t.deepEqual(output, JSON.parse(fs.readFileSync(input.replace('/in/', '/out/'))), input);
  });
  t.end();
})
