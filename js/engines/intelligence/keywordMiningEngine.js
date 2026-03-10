export function mineKeywords(data){

const insights = []

data.forEach(r=>{

const acc = r["ACC"]
const keyword = r["attributed_keyword"]

const clicks = Number(r["Clicks"]||0)
const directUnits = Number(r["Direct Units Sold"]||0)
const indirectUnits = Number(r["Indirect Units Sold"]||0)

const spend = Number(r["SUM(cost)"]||0)
const revenue = Number(r["Direct Revenue"]||0)

const roi = spend ? revenue/spend : 0



/* HIGH CONVERTING KEYWORDS */

if(directUnits >= 5 && roi > 3){

insights.push({

ACC:acc,
Keyword:keyword,
Type:"High Converter",
Action:"Promote to Exact Match",
Reason:"Strong conversions with good ROI"

})

}



/* INDIRECT SALES KEYWORDS */

if(indirectUnits > directUnits){

insights.push({

ACC:acc,
Keyword:keyword,
Type:"Indirect Sales Driver",
Action:"Increase Visibility",
Reason:"Drives indirect conversions"

})

}



/* WASTING KEYWORDS */

if(clicks > 30 && directUnits === 0){

insights.push({

ACC:acc,
Keyword:keyword,
Type:"Waste Keyword",
Action:"Add Negative / Pause",
Reason:"Clicks but no sales"

})

}



/* HIGH ROI LOW TRAFFIC */

if(roi > 5 && clicks < 10){

insights.push({

ACC:acc,
Keyword:keyword,
Type:"Hidden Winner",
Action:"Increase Bid",
Reason:"High ROI but low traffic"

})

}

})

return insights

}
