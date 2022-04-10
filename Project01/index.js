fetchData = async url => {
    const response = await fetch(url);
    const dataPromise = await response.json();
    return dataPromise;
};

const createChart = dataset => {
    const w = 800;
    const h = 500;
    const padding = 60;

    console.log(dataset);

    const xScale = d3
        .scaleLinear()
        // .domain([0, d3.max(dataset, d => d)])
        .domain([padding, w - padding])
        .range([padding, w - padding]);

    const yBaseline = h - padding;

    const yScale = d3.scaleLinear().domain([0, h]).range([yBaseline, padding]);

    const svg = d3
        .select(".chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    const xAxisGenerator = d3.axisBottom(xScale);
    // xAxis.selectAll(".tick text").attr("class", "test");
    const yAxisGenerator = d3.axisLeft(yScale);

    // xAxis.selectAll(".tick text").attr("class", "ticktext");
    //const yAxis = d3.axis.scale(yScale);

    let xAxis = svg
        .append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxisGenerator)
        .attr("id", "x-axis");

    console.log("project01 xAxis: ", xAxis);

    let yAxis = svg
        .append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxisGenerator)
        .attr("id", "y-axis");

    xAxis.selectAll(".tick text").attr("class", "tick");
    yAxis.selectAll(".tick text").attr("class", "tick");

    console.log("yScale(411): ", yScale(411));

    svg.append("svg")
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("width", "4")
        .attr("height", d => `${yBaseline - yScale(d)}`)
        .attr("fill", "lightblue")
        .attr("y", (d, i) => `${yScale(d)}`)
        .attr("x", (d, i) => `${padding + 1 + i * 4.2}`);

    // attr("data-date", function (d, i) {
    //     return datas[i][0];
    // }).attr("data-gdp", function (d, i) {
    //     return datas[i][1];
    // });

    // .selectAll("div")
    // .data(dataset)
    // .enter()
    // .append("div")
    // .attr("class", "bar")
    // .style("height", d => d / 2 + "px");

    // svg.selectAll(".bar")
    //     .data(dataset)
    //     .enter()
    //     .append("rect")
    //     .attr("backgroun-color", "blue");
};

const dataUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetchData(dataUrl).then(retrievedObject => {
    createChart(retrievedObject);
});

// -----------------------------------
//          Older code
// -----------------------------------

// svg.selectAll("circle")
//     .data(dataset)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xScale(d[0]))
//     .attr("cy", d => yScale(d[1]))
//     .attr("r", d => 5);

// svg.selectAll("text")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .text(d => d[0] + "," + d[1])
//     .attr("x", d => xScale(d[0] + 10))
//     .attr("y", d => yScale(d[1]));

// const dataset = [
//     [34, 78],
//     [109, 280],
//     [310, 120],
//     [79, 411],
//     [420, 220],
//     [233, 145],
//     [333, 96],
//     [222, 333],
//     [78, 320],
//     [21, 123],
// ];

// const dataset = [
//     78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145,
//     96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280,
//     120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333,
//     320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411,
//     220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123,
//     78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145,
//     96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280,
//     120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333,
//     320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411,
//     220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123,
//     78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145,
//     96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280,
//     120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333,
//     320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411,
//     220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123,
//     78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280, 120, 411, 220, 145,
//     96, 333, 320, 123, 78, 280, 120, 411, 220, 145, 96, 333, 320, 123, 78, 280,
//     120, 411, 220,
// ];
