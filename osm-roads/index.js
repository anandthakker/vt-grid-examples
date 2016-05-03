var path = require('path')
var vtGrid = require('vt-grid')

var output = process.argv[2]

var bbox = (process.argv.length > 3)
  ? process.argv.slice(3).map(Number)
  : null

var options = [{
  includeBaseData: false,
  basezoom: 12,
  minzoom: 11,
  gridsize: 4096,
  aggregations: path.join(__dirname, 'base.js'),
  postAggregations: path.join(__dirname, 'base.js')
}, {
  basezoom: 11,
  minzoom: 1,
  gridsize: 4096,
  aggregations: { osm: { road_density: 'areaWeightedMean' } }
}]

options.forEach(function (opts) {
  if (bbox) { opts.bbox = bbox }
})

vtGrid(output, path.join(__dirname, '../data/planet.mbtiles'), options)
