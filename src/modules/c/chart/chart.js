import { LightningElement } from 'lwc';

export default class Chart extends LightningElement {
    morningstarData = {
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
          },
          {
            planId: "DEMO22",
            planName: "Butterfly Marketing",
          },
        ],
      };
}
