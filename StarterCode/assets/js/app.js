// @TODO: YOUR CODE HERE!
//Chart Parameters

var svgWidth = 690;
var svgHeight = 400;

var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60,
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;
var padding = 50;

// Creating SVG element

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Importing Data
d3.csv("assets/data/data.csv").then(function (censusdata) {
  console.log(censusdata);

  // Parsing Data

  censusdata.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.income = +data.income;
    data.obesity = + data.obesity;
    data.age = +data.age;
    data.smokes = +data.smokes;
    

  })

    //Creating Scales

    var x_scale = d3.scaleLinear()
      .domain([8, d3.max(censusdata, d => d.poverty) + 2])
      .range([0, chartWidth])

    var y_scale = d3.scaleLinear()
      .domain([4, d3.max(censusdata, d => d.healthcare) + 2])
      .range([chartHeight, 0]);

    // 

  
    // Creating Axis

    var bottomaxis = d3.axisBottom(x_scale)
    .tickFormat(function(d){
      return d + '%'
    })
    
    var leftaxis = d3.axisLeft(y_scale)
    .tickFormat(function(d){
      return d + '%'
    })

    // Appending The axes to The Chart Group

    chartGroup.append('g')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(bottomaxis);

    chartGroup.append('g')
    .call(leftaxis);

    // Creating Cirlces for Scatter Plot

     var circlesGroup = chartGroup.selectAll('circle')
      .data(censusdata)
      .enter()
      .append('circle')
      .attr('cx', d => x_scale(d.poverty))
      .attr('cy', d => y_scale(d.healthcare))
      .attr('r', '10')
      .attr('fill', 'green')
      
    
      
      
    var textGroup = chartGroup.selectAll('text')
      .exit()
      .data(censusdata)
      .enter()
      .append('text')
      .text(function(d){
        return `${d.abbr}`
      })
      .attr('x', d => x_scale(d.poverty))
      .attr('y', d => y_scale(d.healthcare))
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', 'white');
    
    


// Creating A tooltip in chartGroup


// Creating Axes Labels

chartGroup.append('text')
.attr('transform', 'rotate(-90)')
.attr('y', 0 - margin.left )
.attr('x', 0 -(chartHeight/1.5))
.attr('dy', '1em')
.attr('class', 'axisText')
.text("Lacks Healthcare (%)")

chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top - 10 })`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "Black")
    .text("Poverty (%)");

}).catch(function(error) {
  console.log(error);
});