
function drawRadarChart(svg,opt) {
    // Set defaults if not supplied
    //if(typeof opt === 'undefined')                  {var opt={}}
    if(typeof opt.svgWidth === 'undefined')      {opt.svgWidth=200;}
    if(typeof opt.svgHeight === 'undefined')      {opt.svgHeight=250;}

    //Add the svg content holder to the visualisation box element in the document (vizbox)
    var svgWidth=opt.svgWidth
    var svgHeight=opt.svgHeight;

    //var circleGroup = svg.append("svg:g")
    //        .attr("id","circles");
    // Function to update the radar value

    data =
      [
        {
          "key":"Nokia Smartphone",
          "values":[
            {  "axis":"Battery Life", "value":0.26 }, {  "axis":"Brand", "value":0.10 },
            {  "axis":"Contract Cost", "value":0.30 }, {  "axis":"Design And Quality", "value":0.14 },
            {  "axis":"Have Internet Connectivity", "value":0.22 }, {  "axis":"Large Screen", "value":0.04 },
            {  "axis":"Price Of Device", "value":0.41 }, {  "axis":"To Be A Smartphone", "value":0.30 }
          ]
        },
        {
          "key":"Samsung",
          "values":[
            {  "axis":"Battery Life", "value":0.27 }, {  "axis":"Brand", "value":0.16 },
            {  "axis":"Contract Cost", "value":0.35 }, {  "axis":"Design And Quality", "value":0.13 },
            {  "axis":"Have Internet Connectivity", "value":0.20 }, {  "axis":"Large Screen", "value":0.13 },
            {  "axis":"Price Of Device", "value":0.35 }, {  "axis":"To Be A Smartphone", "value":0.38 }
          ]
        },
        {
          "key":"iPhone",
          "values":[
            {  "axis":"Battery Life", "value":0.22 }, {  "axis":"Brand", "value":0.28 },
            {  "axis":"Contract Cost", "value":0.29 }, {  "axis":"Design And Quality", "value":0.17 },
            {  "axis":"Have Internet Connectivity", "value":0.22 }, {  "axis":"Large Screen", "value":0.02 },
            {  "axis":"Price Of Device", "value":0.21 }, {  "axis":"To Be A Smartphone", "value":0.50 }
          ]
        }
      ];
    //debugger;
    //var meh = displayRADAR(opt.svgID, data, opt)
    var radarChart = RadarChart(opt.containerDivId, data, opt);
    d3.select('#' + opt.containerDivId)
           .call(radarChart);
    radarChart.options(opt).update();
    radarChart.options({'legend': {display: true}});
    var radarChartOptions = {
           width: svgWidth,
           height: svgHeight
			};
    radarChart.options({axes: {lineColor: "lightyellow"}});
    //radarChart.options({circles: {fill: '#CDCDCD', color: '#CDCDCD'}});
    radarChart.options({circles: {fill: 'violet', color: '#FF99CC'}});
    radarChart.height(600).width(600).options({'areas': {'dotRadius': 2}}).update();
    radarChart.options({margins: {
             top: 0,
             right: 0,
             bottom: 0,
             left: 0
          }
        });
    //radarChart.options({filter: 'rc_glow'});

    //radarChart.options(radarChartOptions).update();
    radarChart.data(data).update();

    this.updateRadarChart=function(newVal, newValFormatted, newValRounded) {
        //Set default values if necessary
        if(newVal === undefined) {
          newVal = opt.minVal;
        }
        //Update the current value
        opt.needleVal = newVal;
    };
}

