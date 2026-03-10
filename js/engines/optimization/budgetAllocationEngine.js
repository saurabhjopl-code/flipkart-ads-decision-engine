export function allocateBudget(campaignData){

const suggestions = []

campaignData.forEach(row=>{

const roi = row.revenue / (row.spend || 1)

if(roi > 5){

suggestions.push({

entity: row.campaign,
action: "Increase Budget",
reason: "High ROI campaign"

})

}

if(roi < 1.5){

suggestions.push({

entity: row.campaign,
action: "Reduce Budget",
reason: "Low ROI campaign"

})

}

})

return suggestions

}
