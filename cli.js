#!/usr/bin/env node

if (!process.argv[2]) return console.error(
  'Usage: npm-me <username> or npm-me -p <package_name>'
)

var columnify = require('columnify')
var addCommas = require('add-commas');

if (process.argv[2] !== "-p") {
	require('./')({'user':process.argv[2]}, function(err, downloads) {
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
} else if(process.argv[2] === "-p" && process.argv.length > 3) {
	console.log()
	require('./')({'module':process.argv[3]}, function(err, count) {
		if(err) throw err;
		console.log(process.argv[3] + " was downloaded " + count + " times, last month.");
	})
}

