#!/usr/bin/env node

if (!process.argv[2]) return console.error(
  'Usage: npm-me <username>'
)

var columnify = require('columnify')

require('./')(process.argv[2], function(err, downloads) {
  if (err) throw err
  console.log(
    columnify(downloads
    .filter(Boolean)
    .sort(function(a, b) {
      return a.count - b.count
    }))
  )
})
