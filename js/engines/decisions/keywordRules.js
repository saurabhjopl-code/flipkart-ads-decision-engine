export function keywordRules(data){

const decisions = []

data.forEach(r=>{

const keyword = r["attributed_keyword"]

const clicks = Number(r["Clicks"]||0)
const units = Number(r["Direct Units Sold"]||0)
const spend = Number(r["SUM(cost)"]||0)
const revenue = Number(r["Direct Revenue"]||0)

const roi = spend ? revenue/spend : 0



/* RULE 7 */

if(clicks > 30 && units === 0){

decisions.push({
entity:keyword,
type:"Keyword",
issue:"Clicks but no sales",
recommendation:"Pause Keyword",
priority:"High"
})

}



/* RULE 8 */

if(roi > 6){

decisions.push({
entity:keyword,
type:"Keyword",
issue:"Very high ROI",
recommendation:"Increase Bid",
priority:"Medium"
})

}



/* RULE 9 */

if(roi < 1){

decisions.push({
entity:keyword,
type:"Keyword",
issue:"Unprofitable keyword",
recommendation:"Reduce Bid",
priority:"Medium"
})

}



/* RULE 10 */

if(clicks > 50 && units < 2){

decisions.push({
entity:keyword,
type:"Keyword",
issue:"Low conversion keyword",
recommendation:"Review Targeting",
priority:"Low"
})

}



/* RULE 11 */

if(spend > 2000 && revenue === 0){

decisions.push({
entity:keyword,
type:"Keyword",
issue:"Wasting ad spend",
recommendation:"Pause Keyword",
priority:"High"
})

}



/* RULE 12 */

if(spend > 1000 && roi < 1){

decisions.push({
entity:keyword,
type:"Keyword",
issue:"High CPC low ROI",
recommendation:"Lower Bid",
priority:"Medium"
})

}



/* RULE 13 */

if(clicks > 10 && roi > 5){

decisions.push({
entity:keyword,
type:"Keyword",
issue:"Strong keyword",
recommendation:"Scale Keyword",
priority:"Low"
})

}



/* RULE 14 */

if(units > 5 && roi > 3){

decisions.push({
entity:keyword,
type:"Keyword",
issue:"Driving sales",
recommendation:"Increase Visibility",
priority:"Low"
})

}

})

return decisions

}
