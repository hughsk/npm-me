#!/usr/bin/env node

if (!process.argv[2]) return console.error(
  'Usage: npm-me <username>'
)

require('./')(process.argv[2], function(err, downloads) {
  if (err) throw err
  console.log(downloads
    .filter(Boolean)
    .sort(function(a, b) {
      return a.count - b.count
    })
    .map(function(d) {
      return d.name + ' ' + d.count
    })
  .join('\n'))
})
