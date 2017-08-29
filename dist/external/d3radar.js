function drawRadarChart(opt) {
  // Set defaults if not supplied
  if (typeof opt.svgWidth === 'undefined') {
    opt.svgWidth = 200;
  }
  if (typeof opt.svgHeight === 'undefined') {
    opt.svgHeight = 250;
  }

  //Add the svg content holder to the visualisation box element in the document (vizbox)
  this.svgWidth = opt.svgWidth
  this.svgHeight = opt.svgHeight;
  this.svgContainer = opt.containerDivId;

  data = [{
      "key": "Nokia Smartphone",
      "values": [{
          "axis": "Battery Life",
          "value": 0.26
        }, {
          "axis": "Brand",
          "value": 0.10
        },
        {
          "axis": "Contract Cost",
          "value": 0.30
        }, {
          "axis": "Design And Quality",
          "value": 0.14
        },
        {
          "axis": "Have Internet Connectivity",
          "value": 0.22
        }, {
          "axis": "Large Screen",
          "value": 0.04
        },
        {
          "axis": "Price Of Device",
          "value": 0.41
        }, {
          "axis": "To Be A Smartphone",
          "value": 0.30
        }
      ]
    },
    {
      "key": "Samsung",
      "values": [{
          "axis": "Battery Life",
          "value": 0.27
        }, {
          "axis": "Brand",
          "value": 0.16
        },
        {
          "axis": "Contract Cost",
          "value": 0.35
        }, {
          "axis": "Design And Quality",
          "value": 0.13
        },
        {
          "axis": "Have Internet Connectivity",
          "value": 0.20
        }, {
          "axis": "Large Screen",
          "value": 0.13
        },
        {
          "axis": "Price Of Device",
          "value": 0.35
        }, {
          "axis": "To Be A Smartphone",
          "value": 0.38
        }
      ]
    },
    {
      "key": "iPhone",
      "values": [{
          "axis": "Battery Life",
          "value": 0.22
        }, {
          "axis": "Brand",
          "value": 0.28
        },
        {
          "axis": "Contract Cost",
          "value": 0.29
        }, {
          "axis": "Design And Quality",
          "value": 0.17
        },
        {
          "axis": "Have Internet Connectivity",
          "value": 0.22
        }, {
          "axis": "Large Screen",
          "value": 0.02
        },
        {
          "axis": "Price Of Device",
          "value": 0.21
        }, {
          "axis": "To Be A Smartphone",
          "value": 0.50
        }
      ]
    }
  ];
  this.radarChart = RadarChart(this.svgContainer, data, opt);
  d3.select('#' + this.svgContainer)
    .call(this.radarChart);
  this.radarChart.options(opt).update();
  this.radarChart.options({
    'legend': {
      display: true
    }
  });
  this.radarChart.options({
    axes: {
      lineColor: "lightyellow"
    }
  });
  this.radarChart.options({
    circles: {
      fill: 'violet',
      color: '#FF99CC'
    }
  });
  this.radarChart.height(this.svgHeight).width(this.svgWidth).options({
    'areas': {
      'dotRadius': 2
    }
  }).update();
  this.radarChart.options({
    margins: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });

  this.radarChart.data(data).update();
  this.clearRadarChart = function() {
    if ($('#' + this.svgContainer).length) {
      $('#' + this.svgContainer).empty();
    }
  }
  this.updateRadarChart = function(newVal, newValFormatted, newValRounded) {
    //Set default values if necessary
    if (newVal === undefined) {
      newVal = opt.minVal;
    }
    //Update the current value
    opt.needleVal = newVal;
  };
}

