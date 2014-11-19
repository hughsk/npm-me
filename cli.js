#!/usr/bin/env node

var addCommas = require('add-commas')
var columnify = require('columnify')
var minimist  = require('minimist')
var npmme     = require('./')

var argv = minimist(process.argv.slice(2), { boolean: 'p' })
if (!argv._[0]) return console.error([
    'Usage:'
  , '  npm-me <username>'
  , '  npm-me -p <package>'
].join('\n'))

// Individal package download counts
if (argv.p) return npmme.pkg(argv._[0], function(err, count) {
  console.log()
  console.log(argv._[0] + ' ' + addCommas(count))
  console.log()
})

// Username package download counts
npmme(argv._[0], function(err, downloads) {
  if (err) throw err
  downloads = downloads
  .filter(Boolean)
  .map(function(dl) {
    dl.count = Number(dl.count)
    return dl
  })
  .sort(function(a, b) {
    return a.count - b.count
  })
  console.log()
  console.log(columnify(downloads.map(function(dl) {
    return {
      name: dl.name
     , count: addCommas(dl.count)
    }
  }), {config: {count: {align: 'right'}}}))

  var total = downloads.reduce(function(total, dl) {
    return total + dl.count
  }, 0)

  console.log()
  console.log('Total ', addCommas(total))
})
