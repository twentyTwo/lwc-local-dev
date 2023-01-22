import { map } from "d3";

const COLOR_SCHEME1 = ["#5288AD", "#7A9A02", "#A12B2A", "#8B5AA3", "#D9CC5D"];
const COLOR_SCHEME2 = ["#8088AD", "#7A9A02", "#A12B2A", "#8B5AA3", "#D9CC5D"];


function restructureData(morningStarObj) {

    let allPlanDetails = [ {
        planId: 'all_plans',
        planName: 'All Plans',
        totalAssetValue: morningStarObj.assetClassSummary.totalAssetValue,
        assetClasses: morningStarObj.assetClassSummary.assetClasses
    }, ...morningStarObj.planDetails];

    return allPlanDetails;
  }


//   function mapColorToAssetClass(assetClassTableData)
//   {
//     // let uniqClasses = [];
    
//     let assetClassTableData = 
//     [
//         { 
//             planId: 'all_plans', planName: 'All Plans', assetClasses: 
//             [ 
//                 { class: 'Stocks', assetValue: 1000, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: 'iconUpArrow' },
//                 { class: 'Bonds', assetValue: 2000, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: 'iconUpArrow' },
//                 { class: 'Balanced', assetValue: 3000, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: 'iconUpArrow' },
//                 { class: 'Cash', assetValue: 4000, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: 'iconUpArrow' },
//                 { class: 'Other', assetValue: 6000, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: 'iconUpArrow' }
//             ] 
//         },
//         {
//             planId: '2', planName: 'Acme Marketing', totalAssetValue: '1600', assetClasses:
//             [
//                 { class: 'Stocks', assetValue: 100, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: '' },
//                 { class: 'Bonds', assetValue: 200, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: 'iconUpArrow' },
//                 { class: 'Balanced', assetValue: 300, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: 'iconUpArrow' },
//                 { class: 'Cash', assetValue: 400, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: 'iconUpArrow' },
//                 { class: 'Other', assetValue: 600, assetValueChangePercentage: 0.5, changeReference: 'Month', color : 'red', iconName: 'iconUpArrow' }
//             ]
//         }, 
//         {
//             planId: '3', planName: 'ISP Marketing'
//         }
//     ];
// }

  function getUniqueAssetClass(assetClassTableData) {
    
    let uniqClasses = [];

    assetClassTableData?.forEach((item, index) => {
            item.assetClasses?.forEach((item1, index1) => {
                if (uniqClasses.indexOf(item1.class) === -1) {
                    uniqClasses.push(item1.class);
                }
            });
    });
  }

  function mapColorToAssetClass(uniqueClasses, color_scheme)
  {
    let colorScheme = color_scheme ? color_scheme : COLOR_SCHEME1;

    let colorMap = {};
    let colorIndex = 0;

    uniqueClasses.forEach((item, index) => {
        colorMap[item] = colorScheme[colorIndex];
        colorIndex = (colorIndex + 1) % colorScheme.length;
    });

    return colorMap;
  }

  function addColorAndIconToAssetClass(restructureData, colorAssetMap) {
        
        restructureData?.forEach((item, index) => {
            item.assetClasses?.forEach((item1, index1) => {
                item1.color = colorAssetMap[item1.class];
                item1.iconName = getIconName(item1.assetValueChangePercentage);
            });
        });
    }

    function getIconName(assetValueChangePercentage) {
        let iconName = '';
        if (assetValueChangePercentage > 0) {
            iconName = 'iconUpArrow';
        } else if (assetValueChangePercentage < 0) {
            iconName = 'iconDownArrow';
        } else {
            iconName = '';
        }
        return iconName;
    }

//   export function getAssetClassAndValueData(assetClassTableData, selectedPlan) {
    
//     let assetClassData = [];
//     let assetValueData = {};

//     let totalAssetValue = 0;

//         assetClassTableData.forEach((item, index) => {
//             if(selectedPlan === item.planName){
//                 assetClassData = item.assetClasses;
//                 totalAssetValue = item.totalAssetValue;
                
//                 // constract a object of class and assetValue
//                 if (item.assetClasses) {
//                     item.assetClasses.forEach((item1, index1) => {
//                         assetValueData[item1.class] = item1.assetValue;
//                     });
//                 }
//             }
//         });


//     return { assetClassData, assetValueData, totalAssetValue };
//   }

  export function getDataForSelectedPlan(structuredData, selectedPlan) {
    let data = {};
    structuredData?.forEach((item, index) => {
        if (item.planName === selectedPlan) {
            data = item;
        }
    });

    let assetClassAndValue = {};
    data?.forEach((item, index) => {            
            item.assetClasses?.forEach((item1, index1) => {
                assetClassAndValue[item1.class] = item1.assetValue;
            });
    });
    
    let assetClassList =  Object.keys(assetClassAndValue);

    return {data, assetClassAndValue, assetClassList};
  }

  export function processMorningStarData(morningstarData) {    
    let assetClassDataRaw = JSON.parse(JSON.stringify(morningstarData));
    let restructuredData = restructureData(assetClassDataRaw); 
    
    let uniqueClasses = getUniqueAssetClass(restructuredData);
    let colorAssetMap = mapColorToAssetClass(uniqueClasses, COLOR_SCHEME1);

    // Apply color to restructuredData
    let finalData = addColorAndIconToAssetClass(restructuredData, colorAssetMap);
    
    // Donut chart data needs the below structured data
    /*assetValueData = {
        Stocks: 0,
        Bonds: 0,
        Balanced: 0,
        Cash: 0,
        Other: 0,
      };*/

      // Get the above structure data from finalData
        // let assetClassAndValue = {};
        // finalData?.forEach((item, index) => {            
        //         item.assetClasses?.forEach((item1, index1) => {
        //             assetClassAndValue[item1.class] = item1.assetValue;
        //         });
        // });                    

        // assetClassList = Object.keys(assetClassAndValue);

        return { colorAssetMap, finalData };

    }
        






  
