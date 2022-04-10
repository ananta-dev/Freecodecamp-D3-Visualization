const margin = { top: 20, right: 20, bottom: 20, left: 10 };
const width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
const g = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const bodySelection = d3.select("body");
console.log("bodySelection: ", bodySelection);
const pSelection = d3.select("body").selectAll("p");
console.log("pSelection: ", pSelection);

const min_x = 0,
    max_x = 10000;
let xScale = d3.scaleLinear().domain([min_x, max_x]).range([0, width]);

let xAxisGenerator = d3
    .axisBottom(xScale)
    .ticks(3)
    .tickValues([3000, 5000, 9000])
    .tickFormat(d3.format(".2s"));

let xAxis = g.append("g").call(xAxisGenerator);
console.log("Workshop xAxis: ", xAxis);

xAxis.attr("transform", `translate(${0},${height - margin.bottom})`);

xAxis.selectAll(".tick text").attr("class", "test");
