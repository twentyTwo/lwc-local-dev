import { LightningElement, api } from "lwc";
import { getFormattedAmount } from "c/utils";
import * as d3 from "d3";

export default class Atsite_assetClassChart extends LightningElement {
   
  d3Initialized = false;

  color_scheme1 = ["#5288AD", "#7A9A02", "#A12B2A", "#8B5AA3", "#D9CC5D"];
  
  chartData = {
    Stocks: 100,
    Bonds: 250,
    Balanced: 50,
    Cash: 20,
    Other: 300
  };


  renderedCallback() {
        this.initializeD3(this.chartData); 
        this.createBarChart(this.chartData);

  }


  initializeD3(data) {
    d3.select(this.template.querySelector(".donut_chart")).selectAll("*").remove();

    const width = 325,
      height = 325,
      margin = 0;

    const radius = Math.min(width, height) / 1.75 - margin;

    const svg = d3
      .select(this.template.querySelector(".donut_chart"))
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr(
        "viewBox",
        -width / 2 + " " + -height / 2 + " " + width + " " + height
      )
      .attr("preserveAspectRatio", "xMinYMin");

    /* data structure
      assetValueData = {
        Stocks: 0,
        Bonds: 0,
        Balanced: 0,
        Cash: 0,
        Other: 0,
      };
      */

    const donutChartData = data;

    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(data))
      .range(this.color_scheme1);

    const pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d) => d[1])
      .padAngle(0.05);

    const data_ready = pie(Object.entries(donutChartData));

    // // The arc generator
    const arc = d3
      .arc()
      .innerRadius(radius * 0.75) // This is the size of the donut hole
      .outerRadius(radius * 0.78);


    svg
      .selectAll("allSlices")
      .data(data_ready)
      .join("path")
      .attr("d", arc)
      .attr("class", function (d) {
        return "slice-" + d.data[0] + " chart-slice";
      })
      .attr("fill", (d) => color(d.data[1]))
      .attr("stroke", "transparent")
      .style("stroke-width", "2px");


      var labels = d3.select(this.template.querySelector(".chart-labels")).selectAll("div")
      .data(data_ready)
      .join("div")
      .attr("class", function (d) {
        return "label-" + d.data[0] + " chart-label";
      })
      .text((d) => d.data[0])
      .style("color", (d) => color(d.data[1]))
      .style("font-size", 12);

  }

  // Create a bar chart with the chartData 
  createBarChart(chartData) {
    d3.select(this.template.querySelector(".bar_chart")).selectAll("*").remove();
    
    // Create a bar chhart with the chartData. There will be no scale for the y axis. Bar colors are from the color scheme.
    const width = 325,
      height = 325,
      margin = 20;

    const svg = d3
      .select(this.template.querySelector(".bar_chart"))
      .append("svg");

    // make the svg responsive
    svg
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMin");

    const barChartData = chartData;

    // Create bars for the chartData
    const barChart = svg
      .selectAll("rect")
      .data(Object.entries(barChartData))
      .enter()
      .append("rect")
      .attr("class", function (d) {
        return "bar-" + d[0] + " chart-bar";
      })
      .attr("x", function (d, i) { return i * 60; })
      .attr("y", function (d) { return height - d[1]; })
      .attr("width", function (d) { return 20; })
      .attr("height", function (d) { return d[1]; })
      .attr("fill", (d, i) => { return this.color_scheme1[i]; });

  }



}
