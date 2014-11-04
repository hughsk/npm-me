# npm-me
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
![](http://img.shields.io/npm/v/npm-me.svg?style=flat)
![](http://img.shields.io/npm/dm/npm-me.svg?style=flat)
![](http://img.shields.io/npm/l/npm-me.svg?style=flat)

Get a list of download counts over the last month for a particular user's dependencies.

## Usage

``` bash
npm-me <username>
```

## API

[![NPM](https://nodei.co/npm/npm-me.png)](https://nodei.co/npm/npm-me/)

### `npmme(username, done(err, packages))`

Given an npm `username`, return an array of `packages`, where each has:

* `name`: the package name.
* `count`: the number of downloads in the last month for that package.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/npm-me/blob/master/LICENSE.md) for details.
