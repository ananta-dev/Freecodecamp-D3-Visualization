// Setup
req = new XMLHttpRequest();
req.open(
    "GET",
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
    true
);
req.send();
let data = {};

req.onload = function () {
    // Fetch data
    json = JSON.parse(req.responseText);
    let html = "";
    data = json.data;

    // D3
    const h = 800;
    const w = 1000;
    const padding = 40;
    const barWidth = "4px";

    const minDate = d3.min(data, d => new Date(d[0]));
    const maxDate = d3.max(data, d => new Date(d[0]));

    data.forEach(item => item.push(new Date(item[0]).getTime() / 1000));

    console.log("data[0][2]: ", data[0][2]);

    const svg = d3.select(".chart").attr("width", w).attr("height", h);

    const xScale = d3
        .scaleTime()
        .domain([minDate, maxDate])
        .range([padding, w - padding]);

    console.log("xScale.domain(): ", xScale.domain());
    console.log("xScale.range(): ", xScale.range());

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d[1])])
        .range([h - padding, padding]);

    console.log("yScale.domain(): ", yScale.domain());
    console.log("yScale.range(): ", yScale.range());
    console.log("yScale(18064.7): ", yScale(18064.7));

    const unixScale = d3
        .scaleLinear()
        .domain([d3.min(data, d => d[2]), d3.max(data, d => d[2])])
        .range([padding, w - padding]);

    console.log("unixScale.domain(): ", unixScale.domain());
    console.log("unixScale.range(): ", unixScale.range());

    // Create Tooltips
    let tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltip")
        .style("opacity", 100);

    // Create the Bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", "green")
        .attr("x", function (d, i) {
            return unixScale(d[2]);
        }) // need to fix
        .attr("y", function (d, i) {
            return yScale(d[1]);
        })
        .attr("width", barWidth)
        .attr("height", function (d) {
            return d[1] / 25 + "px";
        })
        .attr("data-date", d => d[0])
        .attr("data-gdp", d => d[1])
        .on("mouseover", function (d) {
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip
                .html("Date:" + d[0] + "<br>$" + d[1] + " Billion")
                .style("left", d3.event.pageX + 20 + "px")
                .style("top", d3.event.pageY + 20 + "px");
            tooltip.attr("data-date", d[0]);
        })
        .on("mouseout", function (d) {
            tooltip.transition().duration(400).style("opacity", 0);
        });

    // Create bottom axis
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("transform", "translate( 0, " + (h - padding) + ")")
        .attr("id", "x-axis")
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("transform", `translate( ${padding}, 0)`)
        .attr("id", "y-axis")
        .call(yAxis);
};
