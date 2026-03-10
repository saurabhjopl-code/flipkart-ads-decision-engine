import { dataStore } from "../../data/dataStore.js"

export function analyzeKeywords(){

const data = dataStore.CKR

const results = []

data.forEach(row=>{

const clicks = Number(row["Clicks"])
const units = Number(row["Direct Units Sold"])
const spend = Number(row["SUM(cost)"])
const revenue = Number(row["Direct Revenue"])

results.push({

keyword: row["attributed_keyword"],
clicks,
units,
spend,
revenue

})

})

return results

}
