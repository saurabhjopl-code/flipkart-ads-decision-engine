import { loadAllSheets } from "./data/csvLoader.js"
import { dataStore } from "./data/dataStore.js"

import { renderTable } from "./renderers/tableRenderer.js"
import { renderDecisions } from "./renderers/decisionRenderer.js"

import { runDecisionEngine } from "./engines/decisions/decisionEngine.js"

import { renderSummary } from "./renderers/summaryRenderer.js"
import { renderSummaryChart } from "./renderers/chartRenderer.js"



let filteredData = []



async function startApp(){

await loadAllSheets(updateProgress)

hideLoader()

populateACC()
populateMonths()

filteredData = dataStore.CDR

renderAll()

}



function renderAll(){

renderSummary(filteredData)

renderSummaryChart(filteredData)

renderTable("campaign-table", filteredData)

renderTable("summary-table", filteredData)

renderTable("keyword-table", dataStore.CKR)
renderTable("product-table", dataStore.CFR)
renderTable("placement-table", dataStore.PPR)

const decisions = runDecisionEngine()

renderTable("decision-table", decisions)

renderDecisions(decisions)

}



/* FILTER LOGIC */

window.applyFilters = function(){

let data = [...dataStore.CDR]

const acc = document.getElementById("acc-filter").value
const month = document.getElementById("month-filter").value
const start = document.getElementById("start-date").value
const end = document.getElementById("end-date").value
const search = document.getElementById("campaign-search").value.toLowerCase()



/* reset month if date used */

if(start || end){

document.getElementById("month-filter").value = ""

}



/* reset date if month used */

if(month){

document.getElementById("start-date").value = ""
document.getElementById("end-date").value = ""

}



/* ACC filter */

if(acc){

data = data.filter(r => r["ACC"] === acc)

}



/* MONTH filter */

if(month){

data = data.filter(r => {

const date = new Date(r["Date"])

const m = date.toLocaleString("default",{month:"short",year:"numeric"})

return m === month

})

}



/* DATE RANGE */

if(start){

data = data.filter(r => new Date(r["Date"]) >= new Date(start))

}

if(end){

data = data.filter(r => new Date(r["Date"]) <= new Date(end))

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



/* SEARCH LIVE */

window.searchCampaign = function(){

applyFilters()

}



/* DROPDOWNS */

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



function populateMonths(){

const set = new Set()

dataStore.CDR.forEach(r=>{

const d = new Date(r["Date"])

const m = d.toLocaleString("default",{month:"short",year:"numeric"})

set.add(m)

})

const select = document.getElementById("month-filter")

set.forEach(m=>{

const option = document.createElement("option")

option.value = m
option.textContent = m

select.appendChild(option)

})

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
