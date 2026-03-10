export function generateBudgetSuggestions(data){

const accMap = {}

/* group campaigns by ACC */

data.forEach(r=>{

const acc = r["ACC"]
const campaign = r["Campaign Name"]

if(!accMap[acc]){
accMap[acc] = {}
}

if(!accMap[acc][campaign]){
accMap[acc][campaign] = {
spend:0,
revenue:0,
units:0
}
}

accMap[acc][campaign].spend += Number(r["Ad Spend"]||0)
accMap[acc][campaign].revenue += Number(r["Total Revenue (Rs.)"]||0)
accMap[acc][campaign].units += Number(r["Total converted units"]||0)

})

const suggestions = []

Object.keys(accMap).forEach(acc=>{

const campaigns = accMap[acc]

const lowROI = []
const highROI = []

Object.keys(campaigns).forEach(c=>{

const spend = campaigns[c].spend
const revenue = campaigns[c].revenue
const units = campaigns[c].units

const roi = spend ? revenue/spend : 0

if(spend > 1000 && roi < 1.5){
lowROI.push({campaign:c,spend,roi})
}

if(roi > 4 && units > 5){
highROI.push({campaign:c,spend,roi})
}

})

/* generate reallocation */

lowROI.forEach(l=>{

highROI.forEach(h=>{

const shift = Math.round(l.spend * 0.25)

if(shift > 0){

suggestions.push({

ACC:acc,
FromCampaign:l.campaign,
ToCampaign:h.campaign,
Amount:shift,
Reason:"Shift budget from low ROI to high ROI campaign"

})

}

})

})

})

return suggestions

}
