const createChart = data => {
    const w = 800;
    const h = 500;
    const padding = 40;

    const parseDate = d3.timeParse("%Y-%m-%d");

    const xScale = d3
        .scaleTime()
        .domain([
            d3.min(data, d => parseDate(d[0])),
            d3.max(data, d => parseDate(d[0])),
        ])
        .range([padding, w - padding]);

    const yBaseline = h - padding;

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d[1])])
        .range([yBaseline, padding]);

    const svg = d3
        .select(".chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    const tooltip = d3
        .select(".chart")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden");

    const barWidth = (w - 2 * padding) / data.length;
    console.log("barwidth: ", barWidth);

    svg.append("svg")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .on("mouseover", d => {
            tooltip
                .html("<p>" + d[0] + "<br>" + d[1] + "</p>")
                .transition()
                .duration(200)
                .style("visibility", "visible")
                .style("opacity", 0.9)
                .style("left", d3.event.pageX - 110 + "px")
                .style("top", d3.event.pageY - 50 + "px")
                .attr("data-date", d[0])
                .attr("data-gdp", d[1]);
        })
        .on("mousemove", () => {
            tooltip
                .style("left", d3.event.pageX - 110 + "px")
                .style("top", d3.event.pageY - 50 + "px");
        })
        .on("mouseout", () => {
            tooltip
                .transition()
                .duration(500)
                .style("visibility", "hidden")
                .style("opacity", 0);
        })
        .attr("data-date", d => d[0])
        .attr("data-gdp", d => d[1])
        .attr("class", "bar")
        .attr("width", barWidth + "px")
        .attr("height", d => yBaseline - yScale(d[1]) + "px")
        .attr("y", (d, i) => yScale(d[1]))
        .attr("x", d => xScale(parseDate(d[0])));

    const xAxisGenerator = d3.axisBottom(xScale);
    const yAxisGenerator = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxisGenerator)
        .attr("id", "x-axis");

    svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxisGenerator)
        .attr("id", "y-axis");
};

const dataUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(dataUrl).then(retrievedObject => {
    createChart(retrievedObject.data);
});
