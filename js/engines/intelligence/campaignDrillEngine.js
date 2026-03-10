export function getCampaignInsights(campaign,dataStore){

const cdr = dataStore.CDR.filter(r=>r["Campaign Name"]===campaign)
const ckr = dataStore.CKR.filter(r=>r["Campaign Name"]===campaign)
const cfr = dataStore.CFR.filter(r=>r["Campaign Name"]===campaign)
const ppr = dataStore.PPR.filter(r=>r["Campaign Name"]===campaign)

let spend=0
let revenue=0
let clicks=0
let views=0
let units=0

cdr.forEach(r=>{

spend+=Number(r["Ad Spend"]||0)
revenue+=Number(r["Total Revenue (Rs.)"]||0)
clicks+=Number(r["Clicks"]||0)
views+=Number(r["Views"]||0)
units+=Number(r["Total converted units"]||0)

})

const roi = spend ? (revenue/spend).toFixed(2) : 0
const ctr = views ? ((clicks/views)*100).toFixed(2) : 0
const cvr = clicks ? ((units/clicks)*100).toFixed(2) : 0

const topKeywords = ckr
.sort((a,b)=>Number(b["Direct Units Sold"]||0)-Number(a["Direct Units Sold"]||0))
.slice(0,5)

const topProducts = cfr
.sort((a,b)=>Number(b["Direct Units Sold"]||0)-Number(a["Direct Units Sold"]||0))
.slice(0,5)

const placements = ppr
.sort((a,b)=>Number(b["Direct Units Sold"]||0)-Number(a["Direct Units Sold"]||0))

return{

campaign,
spend,
revenue,
roi,
ctr,
cvr,
topKeywords,
topProducts,
placements

}

}
