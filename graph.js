var svg = d3.select("svg");

var g = svg.append("g");
g.attr("transform", "translate(100,50)");

var gx = g.append("g")
gx.attr("transform", "translate(0,400)");

var x = d3.scale.linear()
    .domain([2000, 2012])
    .range([0, 800]);
var y = d3.scale.linear()
    .domain([0, 100])
    .range([400, 0]);

var y_axis = d3.svg.axis().scale(y).orient("left").ticks(4);
g.call(y_axis);

var x_axis = d3.svg.axis().scale(x).orient("bottom").ticks(5).tickFormat(d3.format("d"));
gx.call(x_axis);

d3.csv("data.csv", function(data) {
  g.selectAll("circle")
      .data(data)
    .enter().append("circle")
      .attr("cx", function(d) {return x(d["year"]);} )
      .attr("cy", function(d) {return y(d["accidental_deaths_in_thousands"]);} )
      .attr("r", 10);
});


function changeY() {
  var field = event.target.value;
  d3.csv("data.csv", function(data) {
    join = g.selectAll("circle")
        .data(data)
        .transition().duration(1000)
        .attr("cy", function(d) {return y(d[field]);} );
  });
}
d3.select("#change-y").on("change", changeY);


function changeR() {
  var field = event.target.value;
  var radiusFunction = function(d) {return d[field]/4;}
  if (field==="none") {
    radiusFunction = function(d) {return 10;};
  }
  d3.csv("data.csv", function(data) {
    join = g.selectAll("circle")
        .data(data)
        .transition().duration(1000)
        .attr("r", radiusFunction );
  });
}
d3.select("#change-r").on("change", changeR);


var fillScale = d3.scale.linear()
    .domain([0, 100])
    .range(["hsl(0, 100, 80)", "hsl(120, 100, 80)"])
    .interpolate(d3.interpolateHcl);
var strokeScale = d3.scale.linear()
    .domain([0, 100])
    .range(["hsl(0, 100, 35)", "hsl(120, 100, 35)"])
    .interpolate(d3.interpolateHcl);

function changeColor() {
  var field = event.target.value;
  var fillFunction = function(d) {return fillScale(d[field]);}
  var strokeFunction = function(d) {return strokeScale(d[field]);}
  if (field==="none") {
    fillFunction = function(d) {return "lightblue";};
    strokeFunction = function(d) {return "darkblue";};
  }
  d3.csv("data.csv", function(data) {
    join = g.selectAll("circle")
        .data(data)
        .transition().duration(1000)
        .style("fill", fillFunction )
        .style("stroke", strokeFunction );
  });
}
d3.select("#change-color").on("change", changeColor);
