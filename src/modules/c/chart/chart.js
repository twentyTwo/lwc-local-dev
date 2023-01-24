import { LightningElement } from "lwc";
import { processMorningStarData, getDataForSelectedPlan } from "./dataUtil";

export default class Chart extends LightningElement {
  tableData;
  tableDataSize;
  assetValueObj;
  totalAssetValue;
  timeNow;

  morningstarData;

  getMorningStarData() {
    setTimeout(() => {
      fetch("https://twentytwo.github.io/mock-api/morningstar.json")
        .then((response) => response.json())
        .then((response_data) => {
          this.morningstarData = response_data;
          let structuredData = processMorningStarData(response_data);

          let { data, assetClassAndValue } = getDataForSelectedPlan(
            structuredData,
            "all_plans"
          );

          this.totalAssetValue = data.totalAssetValue;
          this.timeNow = new Date().getTime();
          this.tableData = data.assetClasses;
          this.tableDataSize = this.tableData ? this.tableData.length : 0;

          this.assetValueObj = assetClassAndValue;
          // this.template.querySelector('c-d3chart').initializeD3(this.assetValueObj);
        });
    }, 500);
  }

  connectedCallback() {
    this.getMorningStarData();
  }

  loadAllData() {
    let structuredData = processMorningStarData(this.morningstarData);

    let { data, assetClassAndValue } = getDataForSelectedPlan(
      structuredData,
      "all_plans"
    );

    this.totalAssetValue = data.totalAssetValue;
    this.timeNow = new Date().getTime();
    this.tableData = data.assetClasses;
    this.tableDataSize = this.tableData ? this.tableData.length : 0;

    this.assetValueObj = assetClassAndValue;
  }

  loadPlanData() {
    let structuredData = processMorningStarData(this.morningstarData);

    let { data, assetClassAndValue } = getDataForSelectedPlan(
      structuredData,
      "DEMO12"
    );

    this.totalAssetValue = data.totalAssetValue;
    this.timeNow = new Date().getTime();
    this.tableData = data.assetClasses;
    this.tableDataSize = this.tableData ? this.tableData.length : 0;

    this.assetValueObj = assetClassAndValue;
  }
}
