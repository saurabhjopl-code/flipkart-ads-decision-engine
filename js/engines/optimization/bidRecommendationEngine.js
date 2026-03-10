export function recommendBids(keywordData){

const results = []

keywordData.forEach(row=>{

const roi = row.revenue / (row.spend || 1)

if(roi > 6){

results.push({

keyword: row.keyword,
action: "Increase Bid",
reason: "High profitability"

})

}

if(roi < 1.2 && row.clicks > 30){

results.push({

keyword: row.keyword,
action: "Reduce Bid",
reason: "Low ROI keyword"

})

}

})

return results

}
