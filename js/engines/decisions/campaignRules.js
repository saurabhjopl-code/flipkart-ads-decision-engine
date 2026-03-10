export function campaignRules(data){

const decisions = []

data.forEach(r=>{

const spend = Number(r["Ad Spend"]||0)
const revenue = Number(r["Total Revenue (Rs.)"]||0)
const views = Number(r["Views"]||0)
const clicks = Number(r["Clicks"]||0)
const units = Number(r["Total converted units"]||0)

const roi = spend ? revenue/spend : 0
const ctr = views ? (clicks/views)*100 : 0
const cvr = clicks ? (units/clicks)*100 : 0

const campaign = r["Campaign Name"]



/* RULE 1 */

if(spend > 2000 && units === 0){

decisions.push({
entity:campaign,
type:"Campaign",
issue:"High spend but no sales",
recommendation:"Pause Campaign",
priority:"High"
})

}



/* RULE 2 */

if(spend > 3000 && roi < 1.5){

decisions.push({
entity:campaign,
type:"Campaign",
issue:"Low ROI campaign",
recommendation:"Reduce Budget",
priority:"Medium"
})

}



/* RULE 3 */

if(roi > 4 && units > 10){

decisions.push({
entity:campaign,
type:"Campaign",
issue:"High ROI campaign",
recommendation:"Increase Budget",
priority:"Medium"
})

}



/* RULE 4 */

if(views > 2000 && ctr < 0.5){

decisions.push({
entity:campaign,
type:"Campaign",
issue:"Low CTR",
recommendation:"Improve Creatives",
priority:"Low"
})

}



/* RULE 5 */

if(clicks > 50 && cvr < 0.5){

decisions.push({
entity:campaign,
type:"Campaign",
issue:"Low conversion rate",
recommendation:"Improve Product Listing",
priority:"Medium"
})

}



/* RULE 6 */

if(views < 100){

decisions.push({
entity:campaign,
type:"Campaign",
issue:"Low impressions",
recommendation:"Increase Bid",
priority:"Low"
})

}

})

return decisions

}
