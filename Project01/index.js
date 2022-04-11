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
        .style("visibility", "hidden")
        .text("tooltip ready")
        .attr("width", 100)
        .attr("height", 100)
        .attr("background-color", "cyan");

    const barWidth = (w - 2 * padding) / data.length;
    console.log("barwidth: ", barWidth);

    svg.append("svg")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .on("mouseover", d => {
            console.log("I am in the mouseover function!");
            console.log("d: ", d);
            console.log("typeof d: ", typeof d);
            return tooltip
                .style("visibility", "visible")
                .style("opacity", 1)
                .text(d[1]);
            // d3.select("#tooltip").style("opacity", 1).text(d[1]);
        })
        .on("mousemove", () => {
            return tooltip.style("top", 400 + "px").style("left", 800 + "px");
        })
        .on("mouseout", () => {
            return tooltip.style("visibility", "hidden");
        })
        .attr("data-date", d => d[0])
        .attr("data-gdp", d => d[1])
        .attr("class", "bar")
        .attr("width", barWidth + "px")
        .attr("height", d => yBaseline - yScale(d[1]) + "px")
        .attr("fill", "darkcyan")
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
