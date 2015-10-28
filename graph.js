svg = d3.select("svg");
g = svg.append("g");
g.attr("transform", "translate(100,50)");

x = d3.scale.linear()
    .domain([2000, 2012])
    .range([0, 800]);
y = d3.scale.linear()
    .domain([0, 100])
    .range([400, 0]);

x_axis = d3.svg.axis().scale(x).orient("bottom").ticks(5).tickFormat(d3.format("d"));
y_axis = d3.svg.axis().scale(y).orient("left").ticks(4);

g.call(y_axis);

gx = g.append("g")
gx.call(x_axis);
gx.attr("transform", "translate(0,400)");

d3.csv("data.csv", function(data) {
  g.selectAll("circle")
      .data(data)
    .enter().append("circle")
      .attr("cx", function(d) {return x(d["year"]);} )
      .attr("cy", function(d) {return y(d["important_discoveries"]);} )
      .attr("r", 10);
});

function updateDiscoveries(event) {
  var targetColumn = this.value;
  d3.csv("data.csv", function(data) {
    join = g.selectAll("circle")
        .data(data);

    join.transition().duration(1000).attr("cx", function(d) {return x(d["year"]);} )
        .attr("cy", function(d) {return y(d[targetColumn]);} )
        .attr('r', function(d) {return d[targetColumn];});

    join.enter().append("circle")
        .attr("cx", function(d) {return x(d["year"]);} )
        .attr("cy", function(d) {return y(d[targetColumn]);} );

    join.exit().remove();
  });
}

// d3.select("#update_button").on("click", updateDiscoveries);

d3.select('#data_choice').on('change', updateDiscoveries);
