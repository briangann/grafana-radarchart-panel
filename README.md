# Grafana D3 Rader Chart Panel

This panel plugin provides a [D3-based](http://www.d3js.org) Radar Chart panel for [Grafana](http://www.grafana.org) 3.x

### Screenshots

##### Example radars

![Default Radar Chart](https://raw.githubusercontent.com/briangann/grafana-radarchart-panel/master/src/screenshots/default-radarchart.png)

##### Options

![Options](https://raw.githubusercontent.com/briangann/grafana-radarchart-panel/master/src/screenshots/options.png)

-------

## Features


## Building

This plugin relies on Grunt/NPM/Bower, typical build sequence:

```
npm install
bower install
grunt
```

For development, you can run:
```
grunt watch
```
The code will be parsed then copied into "dist" if "jslint" passes without errors.


### Docker Support

A docker-compose.yml file is include for easy development and testing, just run
```
docker-compose up
```

Then browse to http://localhost:3000


## External Dependencies

* Grafana 3.x

## Build Dependencies

* npm
* bower
* grunt

#### Acknowledgements

This panel is based on large portions of these excellent D3 examples:
* https://oliverbinns.com/articles/D3js-radar/

#### Changelog


##### v0.0.1
- Initial commit
