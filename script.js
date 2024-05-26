
d3.json("finalworld.geojson").then(function(data) {
    var width = 960;
    var height = 600;
    var svg = d3.select("#map")
                .attr("width", width)
                .attr("height", height);
    var projection = d3.geoMercator()
                       .fitSize([width, height], data);
    var path = d3.geoPath()
                 .projection(projection);
    var colorScaleMap = d3.scaleLinear()
                         .domain([0, d3.max(data.features, function(d) { 
                           return d.properties.male70 + d.properties.female70; 
                         })])
                         .range(["#ffa500", "#8b4513"]) 
                         .interpolate(d3.interpolateHsl); 
    svg.selectAll("path")
       .data(data.features)
       .enter().append("path")
       .attr("d", path)
       .attr("fill", function(d) { 
         var totalMigration = d.properties.male70 + d.properties.female70;
         return totalMigration > 0 ? colorScaleMap(totalMigration) : "#f0f0f0"; 
       })