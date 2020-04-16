// @TODO: YOUR CODE HERE!
//Chart Parameters

var svgWidth = 960;
var svgHeight = 500;

// Creating SVG element

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

d3.csv("/data/data.csv").then(function (data) {
  console.log(data);
});
