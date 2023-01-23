import { LightningElement } from 'lwc';
import { processMorningStarData, getDataForSelectedPlan } from './dataUtil';

export default class Chart extends LightningElement {

  tableData;
  tableDataSize;
  assetValueObj;
  totalAssetValue;
  timeNow;

    morningstarData;/* = {
        id: "123",
        tpaId: "tpa_123",
        tpaFirstname: "William",
        tpaLastname: "Scott",
        lastDataUpdatedDate: "07/04/22",
        assetClassSummary: {
          totalAssetValue: "8000",
          assetClasses: [
            {
              class: "Stocks",
              valuePercentage: "10",
              assetValue: "1000",
              assetValueChangePercentage: "0.4",
              changeReference: "Month",
            },
            {
              class: "Bonds",
              valuePercentage: "20",
              assetValue: "2000",
              assetValueChangePercentage: "0.4",
              changeReference: "Month",
            },
            {
              class: "Balanced",
              valuePercentage: "35",
              assetValue: "3500",
              assetValueChangePercentage: "0.4",
              changeReference: "Month",
            },
            {
              class: "Cash",
              valuePercentage: "12",
              assetValue: "1200",
              assetValueChangePercentage: "0.4",
              changeReference: "Month",
            },
            {
              class: "Other",
              valuePercentage: "3",
              assetValue: "300",
              assetValueChangePercentage: "0.4",
              changeReference: "Month",
            },
          ],
        },
        planDetails: [
          {
            planId: "DEMO12",
            planName: "Acme Marketing",
            totalAssetValue: "600",
            assetClasses: [
              {
                class: "Stocks",
                valuePercentage: "10",
                assetValue: "100",
                assetValueChangePercentage: "0.4",
                changeReference: "Month",
              },
              {
                class: "Bonds",
                valuePercentage: "20",
                assetValue: "200",
                assetValueChangePercentage: "-0.4",
                changeReference: "Month",
              },
              {
                class: "Balanced",
                valuePercentage: "30",
                assetValue: "300",
                assetValueChangePercentage: "0.4",
                changeReference: "Month",
              },
            ],
          }
          ,
          {
            planId: "DEMO22",
            planName: "Butterfly Marketing",
          }
        ]
      };
      */

      getMorningStarData() {
        setTimeout(() => {
          fetch('https://twentytwo.github.io/mock-api/morningstar.json')
          .then(response => response.json())
          .then(response_data => {
            this.morningstarData = response_data;
            let structuredData  = processMorningStarData(this.morningstarData);  
            console.log('----StructuredData------');
            console.log(structuredData);

            let {data, assetClassAndValue} = getDataForSelectedPlan(structuredData, 'all_plans');
            console.log('----data------');
            console.log(data);

            console.log('----tableData------');
            console.log(data.assetClasses);

            console.log('----assetClassAndValue------');
            console.log(assetClassAndValue);
          
          this.totalAssetValue = data.totalAssetValue;
          this.timeNow = new Date().getTime();
          this.tableData = data.assetClasses;
          this.tableDataSize = this.tableData ? this.tableData.length : 0;

          this.assetValueObj = assetClassAndValue;
        });
  
        }, 5000);
      }

      connectedCallback() {

        this.getMorningStarData();
      }

      loadAllData() {
        let structuredData  = processMorningStarData(this.morningstarData);  
        console.log('----StructuredData------');
        console.log(structuredData);

        let {data, assetClassAndValue} = getDataForSelectedPlan(structuredData, 'all_plans');
        console.log('----data------');
        console.log(data);

        console.log('----tableData------');
        console.log(data.assetClasses);

        console.log('----assetClassAndValue------');
        console.log(assetClassAndValue);
          
          this.totalAssetValue = data.totalAssetValue;
          this.timeNow = new Date().getTime();
          this.tableData = data.assetClasses;
          this.tableDataSize = this.tableData ? this.tableData.length : 0;

          this.assetValueObj = assetClassAndValue;
      }

      loadPlanData() {
        let structuredData  = processMorningStarData(this.morningstarData);  
        console.log('----StructuredData------');
        console.log(structuredData);

        let {data, assetClassAndValue} = getDataForSelectedPlan(structuredData, 'DEMO12');
        console.log('----data------');
        console.log(data);

        console.log('----tableData------');
        console.log(data.assetClasses);

        console.log('----assetClassAndValue------');
        console.log(assetClassAndValue);
          
          this.totalAssetValue = data.totalAssetValue;
          this.timeNow = new Date().getTime();
          this.tableData = data.assetClasses;
          this.tableDataSize = this.tableData ? this.tableData.length : 0;

          this.assetValueObj = assetClassAndValue;
      }
}
