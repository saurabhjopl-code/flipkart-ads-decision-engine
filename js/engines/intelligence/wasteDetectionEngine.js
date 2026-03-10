export function detectWaste(keywordData){

const results = []

keywordData.forEach(row=>{

if(row.clicks > 30 && row.units === 0){

results.push({

entity: row.keyword,
type: "Keyword",
issue: "Clicks but no sales",
recommendation: "Pause Keyword"

})

}

})

return results

}
