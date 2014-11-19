# npm-me
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
![](http://img.shields.io/npm/v/npm-me.svg?style=flat)
![](http://img.shields.io/npm/dm/npm-me.svg?style=flat)
![](http://img.shields.io/npm/l/npm-me.svg?style=flat)

Get a list of download counts over the last month for a particular user's packages.

## Usage

``` bash
npm-me <username>
npm-me -r <package>
```

## API

[![NPM](https://nodei.co/npm/npm-me.png)](https://nodei.co/npm/npm-me/)

### `npmme(username, done(err, packages))`

Given an npm `username`, return an array of `packages`, where each has:

* `name`: the package name.
* `count`: the number of downloads in the last month for that package.

### `npmme.pkg(package, done(err, downloaded))`

Given an npm `package`, return the number of times it's been `downloaded`
this month.

## Abridged Example

```
> npm-me maxogden

NAME                             COUNT
gst                                 10
json2pg                             12
install-nginx-on-ubuntu             12
nextbus-live-feed                   12
dat-json-replicator                 12
dat-google-storage                  13
...
binary-split                     1,207
github-oauth                     1,657
ldjson-stream                    1,696
stenographer                     1,933
cool-ascii-faces                 2,396
dat                              2,503
websocket-stream                 4,369
level-js                         7,687
html                             8,064
component-type                  18,299
browser-request                 61,744
browserify                     600,651
concat-stream                  717,990

Total  1,462,080
```

```
> npm-me -p yo

yo 93,803
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/npm-me/blob/master/LICENSE.md) for details.
