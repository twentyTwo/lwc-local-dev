import { LightningElement, api } from "lwc";
import { getFormattedAmount } from "c/atsite_utils";
import * as d3 from "d3";

export default class Atsite_assetClassChart extends LightningElement {
  
  @api assetChartData;
  
  d3Initialized = false;
  selectedPlan;

  color_scheme1 = ["#5288AD", "#7A9A02", "#A12B2A", "#8B5AA3", "#D9CC5D"];
  color_scheme2 = ["#8088AD", "#7A9A02", "#A12B2A", "#8B5AA3", "#D9CC5D"];

  assetClassDataRaw;
  assetClassTableData;
  assetClassList;
  assetValueData;
  totalAsset;

  loadData1() {
    this.selectedPlan = "All Plans";
    this.processData();
    this.initializeD3();

  }

  loadData2() {
    this.selectedPlan = "DEMO12";
    this.processData();
    this.initializeD3();
  }


  

  addColorProperty(assetClassDataRaw) {
    try {
      console.log("applyColor");
      console.log(assetClassDataRaw);

      var assetClassSummaryData =
        assetClassDataRaw.assetClassSummary.assetClasses;
      var assetClassPlanData = assetClassDataRaw.planDetails;

      if (assetClassSummaryData) {
        assetClassSummaryData.forEach((item, index) => {
          item.color = this.color_scheme1[index];
        });
      }

      if (assetClassPlanData) {
        assetClassPlanData.forEach((item, index) => {
          if (item.assetClasses) {
            item.assetClasses.forEach((item1, index1) => {
              item1.color = this.color_scheme2[index1];
            });
          }
        });
      }
      return assetClassDataRaw;
    } catch (e) {
      console.error("error");
      console.error(e);
    }
  }

  constructAssetClassTableData() {
    let assetClassTableData = [];
    if(this.selectedPlan !== "All Plans"){
    this.assetClassDataRaw.planDetails.forEach((item, index) => {
      if(this.selectedPlan === item.planId){
        if (item.assetClasses) {
          item.assetClasses.forEach((item1, index1) => {
            assetClassTableData.push({
              class: item1.class,
              assetValue: getFormattedAmount(item1.assetValue),
              assetValueChangePercentage: item1.assetValueChangePercentage,
              color: item1.color,
              changeReference: item1.changeReference,
              iconName: item1.assetValueChangePercentage.indexOf('-') > -1 ? 'iconDownArrow' : 'iconUpArrow'
            });
          });
        }
      }
    });
  }else{
    this.assetClassDataRaw.assetClassSummary.assetClasses.forEach(
      (item, index) => {
        assetClassTableData.push({
              class: item.class,
              assetValue: getFormattedAmount(item.assetValue),
              assetValueChangePercentage: item.assetValueChangePercentage,
              color: item.color,
              changeReference: item.changeReference,
              iconName: item.assetValueChangePercentage.indexOf('-') > -1 ? 'iconDownArrow' : 'iconUpArrow'
        });
      }
    );
  }
    return assetClassTableData;
  }

  constructAssetValueObject() {
    let assetValueData = {
      Stocks: 0,
      Bonds: 0,
      Balanced: 0,
      Cash: 0,
      Other: 0,
    };


    if(this.selectedPlan != "All Plans"){
    this.assetClassDataRaw.planDetails.forEach((item, index) => {
      if(this.selectedPlan === item.planId){
        if (item.assetClasses) {
          item.assetClasses.forEach((item1, index1) => {
            assetValueData[item1.class] = item1.assetValue;
          });
        }
        
      }
    });
    }else{
      this.assetClassDataRaw.assetClassSummary.assetClasses.forEach(
        (item, index) => {
          assetValueData[item.class] = item.assetValue;
        }
      );     
  }
    return assetValueData;
  }

  constructAssetClassArray() {
    let assetClassArray = [];

    // get plan details from assetClassDataRaw and construct assetClassArray
    


    if(this.selectedPlan !== "All Plans"){
    this.assetClassDataRaw.planDetails.forEach((item, index) => {
      if(this.selectedPlan === item.planId){
        if (item.assetClasses) {
          item.assetClasses.forEach((item1, index1) => {
            if (!assetClassArray.includes(item1.class)) {
              assetClassArray.push(item1.class);
            }
          });
        }  
      }     
    });
  }

  else{
    this.assetClassDataRaw.assetClassSummary.assetClasses.forEach(
      (item, index) => {
        if (!assetClassArray.includes(item.class)) {
          assetClassArray.push(item.class);
        }
      }
    );
  }
    return assetClassArray;
  }

  processData() {
    // this.selectedPlan = "DEMO12"; 
    // this.selectedPlan = "All Plans";
    var assetClassDataRaw = JSON.parse(JSON.stringify(this.assetChartData));
    this.assetClassDataRaw = this.addColorProperty(assetClassDataRaw);

    this.assetClassTableData = this.constructAssetClassTableData();
    console.log('this.assetClassTableData');
    console.log(this.assetClassTableData);

    this.assetClassList = this.constructAssetClassArray();
    console.log('this.assetClassList');
    console.log(this.assetClassList);
    this.assetValueData = this.constructAssetValueObject();
    console.log('this.assetValueData');
    console.log(this.assetValueData);
    
    this.totalAsset = this.assetClassDataRaw.assetClassSummary.totalAssetValue;
  }


  renderedCallback() {
    if (this.d3Initialized) {
      return;
    }
    this.processData();
    this.initializeD3();
    this.d3Initialized = true;
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

    const donutChartData = this.assetValueData;
    console.log("donutChartData");
    console.log(donutChartData);

    const color = d3
      .scaleOrdinal()
      .domain(this.assetClassList)
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

  handleMouseOut(event) {
    this.template
      .querySelector("svg")
      .querySelectorAll(".chart-slice")
      .forEach((slice) => {
        slice.style.opacity = 1;
      });

    this.template
      .querySelector("svg")
      .querySelector(".asset-value").textContent = this.totalAsset;

    this.template
      .querySelector("svg")
      .querySelector(".asset-label").textContent = "Total Asset";
  }

  // event listener in table row
  handleMouseOver(event) {
    var parent = event.target.parentElement;
    var assetType = parent.getAttribute("data-asset-type");
    console.log(assetType);

    var assetValue = parent.getAttribute("data-asset-value");
    console.log(assetValue);

    var chartSlice = "slice-" + assetType;
    console.log(chartSlice);

    this.template
      .querySelector("svg")
      .querySelectorAll(".chart-slice")
      .forEach((slice) => {
        if (slice.classList.contains(chartSlice)) {
          slice.style.opacity = 1;
        } else {
          slice.style.opacity = 0.2;
        }
      });

    this.template
      .querySelector("svg")
      .querySelector(".asset-value").textContent = assetValue;
    this.template
      .querySelector("svg")
      .querySelector(".asset-label").textContent = assetType;
  }
}
