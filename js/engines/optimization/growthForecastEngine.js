export function forecastGrowth(campaignData){

const predictions = []

campaignData.forEach(row=>{

const roi = row.revenue / (row.spend || 1)

if(roi > 4){

const projectedRevenue = row.revenue * 1.5

predictions.push({

campaign: row.campaign,
potentialRevenue: projectedRevenue,
recommendation: "Scale campaign"

})

}

})

return predictions

}
