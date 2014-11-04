var debug = require('debug')('npm-me')
var stats = require('npm-stats')()
var map   = require('map-limit')
var got   = require('got')

module.exports = function(user, done) {
  stats.user(user).list(function(err, list) {
    if (err) return done(err)

    map(list, 25, function(pkg, next) {
      stats.module(pkg).info(function(err, data) {
        if (err) return next(err)

        var versions = Object.keys(data.versions)
        var latest   = versions.sort(function(a, b) {
          return (
              (+new Date(data.time[b]))
            - (+new Date(data.time[a]))
          )
        }).shift()

        if (!latest) return next()
        var lastPublisher = (
             data.versions[latest]._npmUser
          && data.versions[latest]._npmUser.name
          && data.versions[latest]._npmUser.name === user
        )

        var firstPublisher = data.maintainers.shift()
        firstPublisher = firstPublisher && firstPublisher.name

        if (!lastPublisher && !firstPublisher) return next()

        debug(pkg)
        got('http://api.npmjs.org/downloads/point/last-month/' + pkg, function(err, body) {
          if (err) return next(err)

          next(null, {
              name: pkg
            , count: JSON.parse(body).downloads
          })
        })
      })
    }, done)
  })
}
