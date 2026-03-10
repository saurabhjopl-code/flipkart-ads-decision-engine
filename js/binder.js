let decisionData = []
let healthData = []
let keywordOpportunityData = []


import { loadAllSheets } from "./data/csvLoader.js"
import { dataStore } from "./data/dataStore.js"

import { renderTable } from "./renderers/tableRenderer.js"
import { renderDecisions } from "./renderers/decisionRenderer.js"

import { runDecisionEngine } from "./engines/decisions/decisionEngine.js"

import { renderSummary } from "./renderers/summaryRenderer.js"
import { renderSummaryChart } from "./renderers/chartRenderer.js"

import { calculateCampaignHealth } from "./engines/intelligence/campaignHealthEngine.js"
import { renderCampaignHealth } from "./renderers/healthRenderer.js"

import { generateBudgetSuggestions } from "./engines/intelligence/budgetAllocationEngine.js"
import { renderBudgetSuggestions } from "./renderers/budgetRenderer.js"

import { mineKeywords } from "./engines/intelligence/keywordMiningEngine.js"
import { renderKeywordMining } from "./renderers/keywordMiningRenderer.js"

import { getCampaignInsights } from "./engines/intelligence/campaignDrillEngine.js"
import { renderCampaignDrill } from "./renderers/campaignDrillRenderer.js"

import { detectAlerts } from "./engines/intelligence/smartAlertsEngine.js"
import { renderAlerts } from "./renderers/alertsRenderer.js"

import { searchEntities } from "./engines/navigation/globalSearchEngine.js"
import { renderSearchResults } from "./renderers/commandBarRenderer.js"

let filteredCDR = []
let filteredCKR = []
let filteredCFR = []
let filteredPPR = []

let searchTimer = null



async function startApp(){

await loadAllSheets(updateProgress)

hideLoader()

populateACC()
populateMonths()

setDefaultMonth()

applyFilters()

}



/* DATE PARSER */

function parseDate(dateStr){

if(!dateStr) return null

const parts = dateStr.split("/")

if(parts.length !== 3) return null

const day = parseInt(parts[0])
const month = parseInt(parts[1]) - 1
const year = parseInt(parts[2])

return new Date(year, month, day)

}



/* RENDER DASHBOARD */

function renderAll(){

renderSummary(filteredCDR)

renderSummaryChart(filteredCDR)

renderTable("campaign-table", filteredCDR)

renderTable("summary-table", buildMonthlyTable(filteredCDR))

renderTable("keyword-table", filteredCKR)
renderTable("product-table", filteredCFR)
renderTable("placement-table", filteredPPR)

decisionData = runDecisionEngine()
renderTable("decision-table", decisionData)
renderDecisions(decisionData)

healthData = calculateCampaignHealth(filteredCDR)
renderCampaignHealth(healthData)

const budget = generateBudgetSuggestions(filteredCDR)
renderBudgetSuggestions(budget)

keywordOpportunityData = mineKeywords(filteredCKR)
renderKeywordMining(keywordOpportunityData)

const alerts = detectAlerts(filteredCDR)
renderAlerts(alerts)

}



/* MAIN FILTER */

window.applyFilters = function(){

const acc = document.getElementById("acc-filter").value
const month = document.getElementById("month-filter").value
const start = document.getElementById("start-date").value
const end = document.getElementById("end-date").value
const search = document.getElementById("campaign-search").value.toLowerCase()


filteredCDR = dataStore.CDR.filter(r=>filterRow(r,acc,month,start,end,search))
filteredCKR = dataStore.CKR.filter(r=>filterRow(r,acc,month,start,end,search))
filteredCFR = dataStore.CFR.filter(r=>filterRow(r,acc,month,start,end,search))
filteredPPR = dataStore.PPR.filter(r=>filterRow(r,acc,month,start,end,search))

renderAll()

}



/* UNIVERSAL ROW FILTER */

function filterRow(r,acc,month,start,end,search){

if(acc && r["ACC"] !== acc) return false


if(month){

const [m,y] = month.split("-")

const d = parseDate(r["Date"])

if(d && !(d.getMonth()==m && d.getFullYear()==y)) return false

}


if(start){

const d = parseDate(r["Date"])

if(d && d < new Date(start)) return false

}

if(end){

const d = parseDate(r["Date"])

if(d && d > new Date(end)) return false

}


if(search){

const campaignName = (r["Campaign Name"] || "").toLowerCase()
const campaignId = (r["Campaign ID"] || "").toLowerCase()

if(!campaignName.includes(search) && !campaignId.includes(search)){
return false
}

}

return true

}



/* DEBOUNCED SEARCH */

window.searchCampaign = function(){

clearTimeout(searchTimer)

searchTimer = setTimeout(()=>{

applyFilters()

},300)

}



/* ACC DROPDOWN */

function populateACC(){

const set = new Set()

dataStore.CDR.forEach(r=>{
if(r["ACC"]) set.add(r["ACC"])
})

const select = document.getElementById("acc-filter")

set.forEach(acc=>{

const option = document.createElement("option")

option.value = acc
option.textContent = acc

select.appendChild(option)

})

}



/* MONTH DROPDOWN */

function populateMonths(){

const set = new Set()

dataStore.CDR.forEach(r=>{

const d = parseDate(r["Date"])

if(!d) return

const key = `${d.getMonth()}-${d.getFullYear()}`

set.add(key)

})

const select = document.getElementById("month-filter")

set.forEach(key=>{

const [m,y] = key.split("-")

const date = new Date(y,m)

const label = date.toLocaleString("default",{month:"short",year:"numeric"})

const option = document.createElement("option")

option.value = key
option.textContent = label

select.appendChild(option)

})

}



/* DEFAULT MONTH */

function setDefaultMonth(){

const today = new Date()

const key = `${today.getMonth()}-${today.getFullYear()}`

document.getElementById("month-filter").value = key

}



/* MONTHLY TABLE */

function buildMonthlyTable(data){

const map = {}

data.forEach(r=>{

const acc = r["ACC"]
const campaign = r["Campaign Name"]

const d = parseDate(r["Date"])

if(!d) return

const month = d.getMonth()
const year = d.getFullYear()

const key = `${acc}-${campaign}-${month}-${year}`

if(!map[key]){

map[key] = {

ACC:acc,
Campaign:campaign,
Month:`${month+1}/${year}`,

"Ad Spend":0,
Views:0,
Clicks:0,
Units:0,
Revenue:0

}

}

map[key]["Ad Spend"] += Number(r["Ad Spend"]||0)
map[key]["Views"] += Number(r["Views"]||0)
map[key]["Clicks"] += Number(r["Clicks"]||0)
map[key]["Units"] += Number(r["Total converted units"]||0)
map[key]["Revenue"] += Number(r["Total Revenue (Rs.)"]||0)

})

return Object.values(map)

}



/* LOADER */

function updateProgress(percent){

const fill = document.getElementById("progress-fill")
const text = document.getElementById("progress-text")

if(fill) fill.style.width = percent + "%"
if(text) text.innerText = percent + "%"

}

function hideLoader(){

const loader = document.getElementById("loader")

if(loader){
loader.style.display = "none"
}

}



startApp()

window.openCampaignDrill=function(campaign){

const insights=getCampaignInsights(campaign,dataStore)

renderCampaignDrill(insights)

}
window.filterDecisionTable = function(){

const filter = document.getElementById("decision-filter").value.toLowerCase()

if(!filter){
renderTable("decision-table", decisionData)
return
}

const filtered = decisionData.filter(d =>
(d.recommendation || "").toLowerCase().includes(filter)
)

renderTable("decision-table", filtered)

}


window.filterHealthTable = function(){

const filter = document.getElementById("health-filter").value

if(!filter){
renderCampaignHealth(healthData)
return
}

const filtered = healthData.filter(h => h.Status === filter)

renderCampaignHealth(filtered)

}


window.filterKeywordTable = function(){

const filter = document.getElementById("keyword-filter").value

if(!filter){
renderKeywordMining(keywordOpportunityData)
return
}

const filtered = keywordOpportunityData.filter(k =>
k.Action === filter
)

renderKeywordMining(filtered)

}

window.runGlobalSearch = function(){

const query = document.getElementById("global-search").value

if(query.length < 2){
document.getElementById("search-results").innerHTML=""
return
}

const results = searchEntities(query,dataStore)

renderSearchResults(results)

}



window.jumpToEntity = function(type,value){

document.getElementById("search-results").innerHTML=""

if(type === "Campaign"){

showTab("campaign-tab")

document.getElementById("campaign-search").value=value

applyFilters()

}

if(type === "Keyword"){

showTab("keyword-tab")

}

if(type === "Product"){

showTab("product-tab")

}

if(type === "Placement"){

showTab("placement-tab")

}

}

