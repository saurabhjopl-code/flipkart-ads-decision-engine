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

let filteredData = []



async function startApp(){

await loadAllSheets(updateProgress)

hideLoader()

populateACC()
populateMonths()

setDefaultMonth()

applyFilters()

}



/* ------------------------------
DATE PARSER (DD/MM/YYYY)
------------------------------ */

function parseDate(dateStr){

if(!dateStr) return null

const parts = dateStr.split("/")

if(parts.length !== 3) return null

const day = parseInt(parts[0])
const month = parseInt(parts[1]) - 1
const year = parseInt(parts[2])

return new Date(year, month, day)

}



/* ------------------------------
MAIN RENDER
------------------------------ */

function renderAll(){

renderSummary(filteredData)

renderSummaryChart(filteredData)

renderTable("campaign-table", filteredData)

renderTable("summary-table", buildMonthlyTable(filteredData))

renderTable("keyword-table", dataStore.CKR)
renderTable("product-table", dataStore.CFR)
renderTable("placement-table", dataStore.PPR)

const decisions = runDecisionEngine()

renderTable("decision-table", decisions)

renderDecisions(decisions)

const health = calculateCampaignHealth(filteredData)
renderCampaignHealth(health)

const budget = generateBudgetSuggestions(filteredData)

renderBudgetSuggestions(budget)

  const keywordInsights = mineKeywords(dataStore.CKR)

renderKeywordMining(keywordInsights)

}



/* ------------------------------
DEFAULT MONTH
------------------------------ */

function setDefaultMonth(){

const today = new Date()

const key = `${today.getMonth()}-${today.getFullYear()}`

const select = document.getElementById("month-filter")

if(select){
select.value = key
}

}



/* ------------------------------
FILTER ENGINE
------------------------------ */

window.applyFilters = function(){

let data = [...dataStore.CDR]

const acc = document.getElementById("acc-filter").value
const month = document.getElementById("month-filter").value
const start = document.getElementById("start-date").value
const end = document.getElementById("end-date").value
const search = document.getElementById("campaign-search").value.toLowerCase()



/* ACC FILTER */

if(acc){

data = data.filter(r => r["ACC"] === acc)

}



/* MONTH FILTER */

if(month){

const [m,y] = month.split("-")

data = data.filter(r => {

const d = parseDate(r["Date"])

if(!d) return false

return d.getMonth() == m && d.getFullYear() == y

})

}



/* DATE RANGE FILTER */

if(start){

const s = new Date(start)

data = data.filter(r => {

const d = parseDate(r["Date"])
return d >= s

})

}

if(end){

const e = new Date(end)

data = data.filter(r => {

const d = parseDate(r["Date"])
return d <= e

})

}



/* SEARCH */

if(search){

data = data.filter(r =>

r["Campaign Name"]
.toLowerCase()
.includes(search)

)

}



filteredData = data

renderAll()

}



/* ------------------------------
SEARCH
------------------------------ */

window.searchCampaign = function(){

applyFilters()

}



/* ------------------------------
ACC DROPDOWN
------------------------------ */

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



/* ------------------------------
MONTH DROPDOWN
------------------------------ */

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



/* ------------------------------
MONTHLY TABLE BUILD
------------------------------ */

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



/* ------------------------------
LOADER
------------------------------ */

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
