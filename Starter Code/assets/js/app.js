// set the dimensions and margins of the graph
var margin = {top: 20, right: 40, bottom: 60, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  
var chartGroup = svg.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

//Load data from data.csv
d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);

  // Add X axis
  var x = d3.scaleLinear()
    .domain([8, 25])
    .range([0, width]);

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([4, 35])
    .range([height, 0]);


  chartGroup.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  chartGroup.append("g")
      .call(d3.axisLeft(y));

  // Add dots
  chartGroup
    .selectAll("Circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.poverty); } )
      .attr("cy", function (d) { return y(d.healthcare); } )
      .attr("r", 10)
      .style("fill", "#69b3a2")
      .attr("opacity", "0.5");
    
  chartGroup
  .selectAll("Circle")
  .data(data)
  .enter()
  .append("text")
    .attr("x", function(d) { return x(d.poverty); } )
    .attr("y", function(d) { return y(d.healthcare); } )
    .text(function (d) { return d.abbr; } )
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("fill", "black");

  chartGroup
    .append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");

  chartGroup
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "acisText")
      .text("Lacks Healthcare (%)");

});

