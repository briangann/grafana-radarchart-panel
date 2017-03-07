'use strict';

System.register(['app/plugins/sdk', 'lodash', 'jquery', 'app/core/utils/kbn', 'app/core/config', 'app/core/time_series2', './external/d3.v3.min', './css/panel.css!', './external/d3radar'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, _, $, kbn, config, TimeSeries, d3, _createClass, panelDefaults, D3RadarChartPanelCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function getColorForValue(data, value) {
    for (var i = data.thresholds.length; i > 0; i--) {
      if (value >= data.thresholds[i - 1]) {
        return data.colorMap[i];
      }
    }
    return _.first(data.colorMap);
  }

  return {
    setters: [function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_appCoreConfig) {
      config = _appCoreConfig.default;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_externalD3V3Min) {
      d3 = _externalD3V3Min;
    }, function (_cssPanelCss) {}, function (_externalD3radar) {}],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
        fontSizes: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70],
        fontTypes: ['Arial', 'Avant Garde', 'Bookman', 'Consolas', 'Courier', 'Courier New', 'Garamond', 'Helvetica', 'Open Sans', 'Palatino', 'Times', 'Times New Roman', 'Verdana'],
        unitFormats: kbn.getUnitFormats(),
        operatorNameOptions: ['min', 'max', 'avg', 'current', 'total', 'name'],
        valueMaps: [{ value: 'null', op: '=', text: 'N/A' }],
        mappingTypes: [{ name: 'value to text', value: 1 }, { name: 'range to text', value: 2 }],
        rangeMaps: [{ from: 'null', to: 'null', text: 'N/A' }],
        mappingType: 1,
        thresholds: '',
        colors: ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"],
        decimals: 2, // decimal precision
        format: 'none', // unit format
        operatorName: 'avg', // operator applied to time series
        radar: {
          w: 600, //Width of the circle
          h: 600, //Height of the circle
          margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
          levels: 3, //How many levels or inner circles should be drawn
          maxValue: 0, //What is the value that the biggest circle will represent
          labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
          wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
          opacityArea: 0.35, //The opacity of the area of the blob
          dotRadius: 4, //The size of the colored circles of each blog
          opacityCircles: 0.1, //The opacity of the circles of each blob
          strokeWidth: 2, //The width of the stroke around each blob
          roundStrokes: false }
      };

      _export('MetricsPanelCtrl', _export('D3RadarChartPanelCtrl', D3RadarChartPanelCtrl = function (_MetricsPanelCtrl) {
        _inherits(D3RadarChartPanelCtrl, _MetricsPanelCtrl);

        function D3RadarChartPanelCtrl($scope, $injector, alertSrv) {
          _classCallCheck(this, D3RadarChartPanelCtrl);

          var _this = _possibleConstructorReturn(this, (D3RadarChartPanelCtrl.__proto__ || Object.getPrototypeOf(D3RadarChartPanelCtrl)).call(this, $scope, $injector));

          // merge existing settings with our defaults
          _.defaults(_this.panel, panelDefaults);
          _this.panel.radarDivId = 'd3radar_svg_' + _this.panel.id;
          _this.containerDivId = 'container_' + _this.panel.radarDivId;
          _this.scoperef = $scope;
          _this.alertSrvRef = alertSrv;
          _this.initialized = false;
          _this.panelContainer = null;
          _this.panel.svgContainer = null;
          _this.svg = null;
          _this.panelWidth = null;
          _this.panelHeight = null;
          _this.radarObject = null;
          _this.data = {
            value: 0,
            valueFormatted: 0,
            valueRounded: 0
          };
          _this.series = [];
          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('data-error', _this.onDataError.bind(_this));
          _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
          return _this;
        }

        _createClass(D3RadarChartPanelCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            // determine the path to this plugin
            var panels = grafanaBootData.settings.panels;
            var thisPanel = panels[this.pluginId];
            var thisPanelPath = thisPanel.baseUrl + '/';
            // add the relative path to the partial
            var optionsPath = thisPanelPath + 'partials/editor.options.html';
            this.addEditorTab('Options', optionsPath, 2);
          }
        }, {
          key: 'setContainer',
          value: function setContainer(container) {
            this.panelContainer = container;
            this.panel.svgContainer = container;
          }
        }, {
          key: 'getPanelWidthBySpan',
          value: function getPanelWidthBySpan() {
            var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            // get the pixels of a span
            var pixelsPerSpan = viewPortWidth / 12;
            // multiply num spans by pixelsPerSpan
            var trueWidth = Math.round(this.panel.span * pixelsPerSpan);
            return trueWidth;
          }
        }, {
          key: 'getPanelHeight',
          value: function getPanelHeight() {
            // panel can have a fixed height via options
            var tmpPanelHeight = this.panel.height;
            // if that is blank, try to get it from our row
            if (typeof tmpPanelHeight === 'undefined') {
              // get from the row instead
              tmpPanelHeight = this.row.height;
              // default to 250px if that was undefined also
              if (typeof tmpPanelHeight === 'undefined') {
                tmpPanelHeight = 250;
              }
            } else {
              // convert to numeric value
              tmpPanelHeight = tmpPanelHeight.replace("px", "");
            }
            var actualHeight = parseInt(tmpPanelHeight);
            return actualHeight;
          }
        }, {
          key: 'clearSVG',
          value: function clearSVG() {
            if ($('#' + this.panel.radarDivId).length) {
              //console.log("Clearing SVG id: " + this.panel.radarDivId);
              $('#' + this.panel.radarDivId).remove();
            }
          }
        }, {
          key: 'renderRadar',
          value: function renderRadar() {
            // update the values to be sent to the radar constructor
            this.setValues(this.data);
            //this.clearSVG();
            //console.log("Looking for: #"+this.panel.radarDivId);
            if ($('#' + this.panel.radarDivId).length) {
              //console.log("Clearing SVG id: " + this.panel.radarDivId);
              $('#' + this.panel.radarDivId).remove();
            } else {}
            //console.log("not found...");

            // use jQuery to get the height on our container
            // TODO: Check if there is a "title" and offset size of radar accordingly
            var panelTitleOffset = 0;
            if (this.panel.title !== "") {
              panelTitleOffset = 25;
            }
            this.panelWidth = this.getPanelWidthBySpan();
            this.panelHeight = this.getPanelHeight() - panelTitleOffset;
            var margin = { top: 0, right: 0, bottom: 0, left: 10 };
            var width = this.panelWidth;
            var height = this.panelHeight;

            //console.log("Creating SVG id: " + this.panel.radarDivId);

            // check which is smaller, the height or the width and set the radius to be half of the lesser
            var tmpradarRadius = parseFloat(this.panel.radar.radarRadius);
            // autosize if radius is set to zero
            if (this.panel.radar.radarRadius === 0) {
              tmpradarRadius = this.panelHeight / 2;
              if (this.panelWidth < this.panelHeight) {
                tmpradarRadius = this.panelWidth / 2;
              }
              tmpradarRadius -= 10;
            }

            // set the width and height to be double the radius
            var svg = d3.select(this.panel.svgContainer).append("svg").attr("width", Math.round(tmpradarRadius * 2) + "px").attr("height", Math.round(tmpradarRadius * 2) + "px").attr("id", this.panel.radarDivId).classed("svg-content-responsive", true).append("g");

            var opt = {
              w: this.panel.radar.w, //Width of the circle
              h: this.panel.radar.h, //Height of the circle
              margin: this.panel.radar.margin, //The margins of the SVG
              levels: this.panel.radar.levels, //How many levels or inner circles should be drawn
              maxValue: this.panel.radar.maxValue, //What is the value that the biggest circle will represent
              labelFactor: this.panel.radar.labelFactor, //How much farther than the radius of the outer circle should the labels be placed
              wrapWidth: this.panel.radar.wrapWidth, //The number of pixels after which a label needs to be given a new line
              opacityArea: this.panel.radar.opacityArea, //The opacity of the area of the blob
              dotRadius: this.panel.radar.dotRadius, //The size of the colored circles of each blog
              opacityCircles: this.panel.radar.opacityCircles, //The opacity of the circles of each blob
              strokeWidth: this.panel.radar.strokeWidth, //The width of the stroke around each blob
              roundStrokes: this.panel.radar.roundStrokes, //If true the area and stroke will follow a round path (cardinal-closed)
              color: d3.scale.category10() //Color function
            };
            this.radarObject = new drawRadarChart(svg, opt);
            this.svg = svg;
          }
        }, {
          key: 'removeValueMap',
          value: function removeValueMap(map) {
            var index = _.indexOf(this.panel.valueMaps, map);
            this.panel.valueMaps.splice(index, 1);
            this.render();
          }
        }, {
          key: 'addValueMap',
          value: function addValueMap() {
            this.panel.valueMaps.push({ value: '', op: '=', text: '' });
          }
        }, {
          key: 'removeRangeMap',
          value: function removeRangeMap(rangeMap) {
            var index = _.indexOf(this.panel.rangeMaps, rangeMap);
            this.panel.rangeMaps.splice(index, 1);
            this.render();
          }
        }, {
          key: 'addRangeMap',
          value: function addRangeMap() {
            this.panel.rangeMaps.push({ from: '', to: '', text: '' });
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            //console.log("d3radar inside link");
            var radarByClass = elem.find('.grafana-d3-radarchart');
            //radarByClass.append('<center><div id="'+ctrl.containerDivId+'"></div></center>');
            radarByClass.append('<div id="' + ctrl.containerDivId + '"></div>');
            var container = radarByClass[0].childNodes[0];
            ctrl.setContainer(container);
            function render() {
              ctrl.renderRadar();
            }
            this.events.on('render', function () {
              render();
              ctrl.renderingCompleted();
            });
          }
        }, {
          key: 'getDecimalsForValue',
          value: function getDecimalsForValue(value) {
            if (_.isNumber(this.panel.decimals)) {
              return { decimals: this.panel.decimals, scaledDecimals: null };
            }

            var delta = value / 2;
            var dec = -Math.floor(Math.log(delta) / Math.LN10);

            var magn = Math.pow(10, -dec),
                norm = delta / magn,
                // norm is between 1.0 and 10.0
            size;

            if (norm < 1.5) {
              size = 1;
            } else if (norm < 3) {
              size = 2;
              // special case for 2.5, requires an extra decimal
              if (norm > 2.25) {
                size = 2.5;
                ++dec;
              }
            } else if (norm < 7.5) {
              size = 5;
            } else {
              size = 10;
            }

            size *= magn;

            // reduce starting decimals if not needed
            if (Math.floor(value) === value) {
              dec = 0;
            }

            var result = {};
            result.decimals = Math.max(0, dec);
            result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;
            return result;
          }
        }, {
          key: 'setValues',
          value: function setValues(data) {
            data.flotpairs = [];
            if (this.series.length > 1) {
              var error = new Error();
              error.message = 'Multiple Series Error';
              error.data = 'Metric query returns ' + this.series.length + ' series. Single Stat Panel expects a single series.\n\nResponse:\n' + JSON.stringify(this.series);
              throw error;
            }

            if (this.series && this.series.length > 0) {
              var lastPoint = _.last(this.series[0].datapoints);
              var lastValue = _.isArray(lastPoint) ? lastPoint[0] : null;

              if (this.panel.operatorName === 'name') {
                data.value = 0;
                data.valueRounded = 0;
                data.valueFormatted = this.series[0].alias;
              } else if (_.isString(lastValue)) {
                data.value = 0;
                data.valueFormatted = _.escape(lastValue);
                data.valueRounded = 0;
              } else {
                data.value = this.series[0].stats[this.panel.operatorName];
                data.flotpairs = this.series[0].flotpairs;
                var decimalInfo = this.getDecimalsForValue(data.value);
                var formatFunc = kbn.valueFormats[this.panel.format];
                data.valueFormatted = formatFunc(data.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                data.valueRounded = kbn.roundValue(data.value, decimalInfo.decimals);
              }

              // Add $__name variable for using in prefix or postfix
              data.scopedVars = {
                __name: {
                  value: this.series[0].label
                }
              };
            }

            // check value to text mappings if its enabled
            if (this.panel.mappingType === 1) {
              for (var i = 0; i < this.panel.valueMaps.length; i++) {
                var map = this.panel.valueMaps[i];
                // special null case
                if (map.value === 'null') {
                  if (data.value === null || data.value === void 0) {
                    data.valueFormatted = map.text;
                    return;
                  }
                  continue;
                }

                // value/number to text mapping
                var value = parseFloat(map.value);
                if (value === data.valueRounded) {
                  data.valueFormatted = map.text;
                  return;
                }
              }
            } else if (this.panel.mappingType === 2) {
              for (var j = 0; j < this.panel.rangeMaps.length; j++) {
                var rangeMap = this.panel.rangeMaps[j];
                // special null case
                if (rangeMap.from === 'null' && rangeMap.to === 'null') {
                  if (data.value === null || data.value === void 0) {
                    data.valueFormatted = rangeMap.text;
                    return;
                  }
                  continue;
                }

                // value/number to range mapping
                var from = parseFloat(rangeMap.from);
                var to = parseFloat(rangeMap.to);
                if (to >= data.valueRounded && from <= data.valueRounded) {
                  data.valueFormatted = rangeMap.text;
                  return;
                }
              }
            }

            if (data.value === null || data.value === void 0) {
              data.valueFormatted = "no value";
            }
          }
        }, {
          key: 'getValueText',
          value: function getValueText() {
            return this.data.valueFormatted;
          }
        }, {
          key: 'getValueRounded',
          value: function getValueRounded() {
            return this.data.valueRounded;
          }
        }, {
          key: 'setUnitFormat',
          value: function setUnitFormat(subItem) {
            this.panel.format = subItem.value;
            this.render();
          }
        }, {
          key: 'onDataError',
          value: function onDataError(err) {
            this.onDataReceived([]);
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            this.series = dataList.map(this.seriesHandler.bind(this));
            var data = {};
            this.setValues(data);
            this.data = data;
            if (this.radarObject !== null) {
              this.radarObject.updateRadar(data.value, data.valueFormatted, data.valueRounded);
            } else {
              // render radar
              this.render();
            }
          }
        }, {
          key: 'seriesHandler',
          value: function seriesHandler(seriesData) {
            var series = new TimeSeries({
              datapoints: seriesData.datapoints,
              alias: seriesData.target
            });
            series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
            return series;
          }
        }, {
          key: 'invertColorOrder',
          value: function invertColorOrder() {
            var tmp = this.panel.colors[0];
            this.panel.colors[0] = this.panel.colors[2];
            this.panel.colors[2] = tmp;
            this.render();
          }
        }]);

        return D3RadarChartPanelCtrl;
      }(MetricsPanelCtrl)));

      D3RadarChartPanelCtrl.templateUrl = 'partials/template.html';

      _export('D3RadarChartPanelCtrl', D3RadarChartPanelCtrl);

      _export('MetricsPanelCtrl', D3RadarChartPanelCtrl);
    }
  };
});
//# sourceMappingURL=ctrl.js.map
