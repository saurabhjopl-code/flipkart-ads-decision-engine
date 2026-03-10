export function detectScaling(keywordData){

const results = []

keywordData.forEach(row=>{

const roi = row.revenue / (row.spend || 1)

if(roi > 5 && row.units > 5){

results.push({

entity: row.keyword,
type: "Keyword",
issue: "High ROI keyword",
recommendation: "Increase Bid"

})

}

})

return results

}
