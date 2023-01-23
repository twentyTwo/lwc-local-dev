import { LightningElement, api } from "lwc";
import { getFormattedAmount } from "c/utils";
import * as d3 from "d3";

export default class Atsite_assetClassChart extends LightningElement {
   
  d3Initialized = false;

  color_scheme1 = ["#5288AD", "#7A9A02", "#A12B2A", "#8B5AA3", "#D9CC5D"];
  
  @api tableData;
  @api tableDataSize;
  @api totalAsset;
  @api assetClassValue;
  @api timeNow;

  get hasValue() {
    if(this.tableData)
    {
      this.initializeD3();
      return true;
    }
    return false;
  }
  


  renderedCallback() {
    // if (this.d3Initialized) {
    //   return;
    // }



    



    // this.d3Initialized = true;
  }

  initializeD3() {

    // remove the d3 chart
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

    const donutChartData = this.assetClassValue;

    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(this.assetClassValue))
      .range(this.color_scheme1);

    const pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d) => d[1])
      .padAngle(0.05);

    const data_ready = pie(Object.entries(donutChartData));
    const innerData = pie(Object.entries({ a: 1 }));

    // The arc generator
    const arc = d3
      .arc()
      .innerRadius(radius * 0.75) // This is the size of the donut hole
      .outerRadius(radius * 0.78);

    // const innerRadiusColor = ["#FFFFFF", "#0A294A"];
    // Another arc that won't be drawn. Just for labels positioning
    const innerArc = d3
      .arc()
      .innerRadius(radius * 0.7)
      .outerRadius(0);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
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
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg
      .selectAll("allSlices")
      .data(innerData)
      .join("path")
      .attr("d", innerArc)
      .attr("fill", (d) => {
        return "blue";
      })
      .style("opacity", 1);

    svg
      .append("text")
      .attr("text-anchor", "left")
      .attr("font-size", "2em")
      .attr("y", 0)
      .attr("x", -45)
      .attr("fill", "white")
      .attr("class", "asset-value")
      .text(this.totalAsset);

    svg
      .append("text")
      .attr("text-anchor", "left")
      .attr("font-size", "1em")
      .attr("y", 20)
      .attr("x", -45)
      .attr("fill", "white")
      .attr(
        "class",
        "test-label[c-atsite_assetClassChart_atsite_assetClassChart]"
      )
      .attr("class", "asset-label")
      .text("Total Asset");
  }

  // handleMouseOut(event) {
  //   this.template
  //     .querySelector("svg")
  //     .querySelectorAll(".chart-slice")
  //     .forEach((slice) => {
  //       slice.style.opacity = 1;
  //     });

  //   this.template
  //     .querySelector("svg")
  //     .querySelector(".asset-value").textContent = this.totalAsset;

  //   this.template
  //     .querySelector("svg")
  //     .querySelector(".asset-label").textContent = "Total Asset";
  // }

  // // event listener in table row
  // handleMouseOver(event) {
  //   var parent = event.target.parentElement;
  //   var assetType = parent.getAttribute("data-asset-type");
  //   console.log(assetType);

  //   var assetValue = parent.getAttribute("data-asset-value");
  //   console.log(assetValue);

  //   var chartSlice = "slice-" + assetType;
  //   console.log(chartSlice);

  //   this.template
  //     .querySelector("svg")
  //     .querySelectorAll(".chart-slice")
  //     .forEach((slice) => {
  //       if (slice.classList.contains(chartSlice)) {
  //         slice.style.opacity = 1;
  //       } else {
  //         slice.style.opacity = 0.2;
  //       }
  //     });

  //   this.template
  //     .querySelector("svg")
  //     .querySelector(".asset-value").textContent = assetValue;
  //   this.template
  //     .querySelector("svg")
  //     .querySelector(".asset-label").textContent = assetType;
  // }
}
