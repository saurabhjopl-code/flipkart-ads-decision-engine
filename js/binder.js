import { loadAllSheets } from "./data/csvLoader.js"
import { dataStore } from "./data/dataStore.js"

import { renderTable } from "./renderers/tableRenderer.js"
import { renderDecisions } from "./renderers/decisionRenderer.js"

import { runDecisionEngine } from "./engines/decisions/decisionEngine.js"

import { filterData } from "./core/filterEngine.js"

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



/* FILTERS */

window.applyFilters = function(){

const acc = document.getElementById("acc-filter").value
const month = document.getElementById("month-filter").value
const start = document.getElementById("start-date").value
const end = document.getElementById("end-date").value

filteredData = filterData(dataStore.CDR,{
acc,
month,
startDate:start,
endDate:end
})

renderAll()

}



/* SEARCH */

window.searchCampaign = function(){

const search = document
.getElementById("campaign-search")
.value
.toLowerCase()

filteredData = dataStore.CDR.filter(row =>

row["Campaign Name"]
.toLowerCase()
.includes(search)

)

renderAll()

}



/* DROPDOWNS */

function populateACC(){

const accSet = new Set()

dataStore.CDR.forEach(row=>{
if(row["ACC"]) accSet.add(row["ACC"])
})

const select = document.getElementById("acc-filter")

accSet.forEach(acc=>{

const option = document.createElement("option")

option.value = acc
option.textContent = acc

select.appendChild(option)

})

}



function populateMonths(){

const months = new Set()

dataStore.CDR.forEach(row=>{

const date = new Date(row["Date"])

const month = date.toLocaleString("default",{month:"short",year:"numeric"})

months.add(month)

})

const select = document.getElementById("month-filter")

months.forEach(m=>{

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
