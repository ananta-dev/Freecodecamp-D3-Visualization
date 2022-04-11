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

    const barWidth = (w - 2 * padding) / data.length;
    console.log("barwidth: ", barWidth);

    svg.append("svg")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
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

    d3.select("body")
        .append("div")
        .attr("id", "tooltop")
        .attr("style", "position: absolute; opacity: 0;");
};

const dataUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(dataUrl).then(retrievedObject => {
    createChart(retrievedObject.data);
});
