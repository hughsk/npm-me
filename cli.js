#!/usr/bin/env node

if (!process.argv[2]) return console.error(
  'Usage: npm-me <username>'
)

var columnify = require('columnify')

require('./')(process.argv[2], function(err, downloads) {
  if (err) throw err
  downloads = downloads
  .filter(Boolean)
  .sort(function(a, b) {
    return a.count - b.count
  })

  console.log(columnify(downloads))

  var total = downloads.reduce(function(total, dl) {
    return total + dl.count
  }, 0)

  var max = downloads.reduce(function(max, dl) {
    return Math.max(max, dl.count)
  }, 0)

  var min = downloads.reduce(function(min, dl) {
    return Math.min(min, dl.count)
  }, 0)

  var avg = Math.round((max - min) / downloads.length)
  var stats = columnify([
      {name: 'Total', value: total}
    , {name: 'Max', value: max}
    , {name: 'Min', value: min}
    , {name: 'Avg', value: avg}
  ], {showHeaders: false})

  console.log()
  console.log('SUMMARY')
  console.log(stats)
})
