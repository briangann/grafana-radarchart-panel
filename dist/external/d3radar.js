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

    this.updateRadarChart=function(newVal, newValFormatted, newValRounded) {
        //Set default values if necessary
        if(newVal === undefined) {
          newVal = opt.minVal;
        }
        //Update the current value
        opt.needleVal = newVal;
    };
}

