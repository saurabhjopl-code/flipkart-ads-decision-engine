import { dataStore } from "../../data/dataStore.js"



export function runDecisionEngine(){

const decisions = []



/* ----------------------------
CAMPAIGN RULES (CDR)
-----------------------------*/

dataStore.CDR.forEach(row => {

const spend = Number(row["Ad Spend"] || 0)
const revenue = Number(row["Total Revenue (Rs.)"] || 0)
const units = Number(row["Total converted units"] || 0)

const roi = revenue / (spend || 1)



// Pause campaign

if(spend > 2000 && units < 2){

decisions.push({

entity: row["Campaign Name"],
type: "Campaign",
issue: "High spend but low sales",
recommendation: "Pause Campaign",
priority: "High"

})

}



// Scale campaign

if(roi > 4 && units > 10){

decisions.push({

entity: row["Campaign Name"],
type: "Campaign",
issue: "High ROI campaign",
recommendation: "Increase Budget",
priority: "Medium"

})

}

})



/* ----------------------------
KEYWORD RULES (CKR)
-----------------------------*/

dataStore.CKR.forEach(row => {

const clicks = Number(row["Clicks"] || 0)
const units = Number(row["Direct Units Sold"] || 0)
const cost = Number(row["SUM(cost)"] || 0)
const revenue = Number(row["Direct Revenue"] || 0)

const roi = revenue / (cost || 1)


// Pause keyword

if(clicks > 30 && units === 0){

decisions.push({

entity: row["attributed_keyword"],
type: "Keyword",
issue: "Many clicks but zero conversions",
recommendation: "Pause Keyword",
priority: "High"

})

}



// Increase bid

if(roi > 5 && units > 5){

decisions.push({

entity: row["attributed_keyword"],
type: "Keyword",
issue: "High ROI keyword",
recommendation: "Increase Bid",
priority: "Medium"

})

}

})



/* ----------------------------
PRODUCT RULES (CFR)
-----------------------------*/

dataStore.CFR.forEach(row => {

const clicks = Number(row["Clicks"] || 0)
const directUnits = Number(row["Direct Units Sold"] || 0)
const indirectUnits = Number(row["Indirect Units Sold"] || 0)

const totalUnits = directUnits + indirectUnits



// Listing issue

if(clicks > 40 && totalUnits < 2){

decisions.push({

entity: row["Product Name"],
type: "Product",
issue: "High clicks but low sales",
recommendation: "Improve Product Listing",
priority: "Medium"

})

}

})



/* ----------------------------
PLACEMENT RULES (PPR)
-----------------------------*/

dataStore.PPR.forEach(row => {

const spend = Number(row["Ad Spend"] || 0)
const units =
Number(row["Direct Units Sold"] || 0) +
Number(row["Indirect Units Sold"] || 0)



// Disable placement

if(spend > 3000 && units < 3){

decisions.push({

entity: row["Placement Type"],
type: "Placement",
issue: "High spend low conversion",
recommendation: "Disable Placement",
priority: "High"

})

}

})



return decisions

}
