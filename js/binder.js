import { loadAllSheets } from "./data/csvLoader.js"

import { dataStore } from "./data/dataStore.js"

import { renderTable } from "./renderers/tableRenderer.js"

import { renderDecisions } from "./renderers/decisionRenderer.js"

import { runDecisionEngine } from "./engines/decisions/decisionEngine.js"



async function startApp(){

await loadAllSheets(updateProgress)

hideLoader()

console.log("Data Loaded")

showData()

runAssistant()

}



function showData(){

renderTable("data-table", dataStore.CDR)

}



function runAssistant(){

const decisions = runDecisionEngine()

renderTable("decision-table", decisions)

renderDecisions(decisions)

}



startApp()


function updateProgress(percent){

const bar = document.getElementById("progress-fill")
const text = document.getElementById("progress-text")

if(bar){
bar.style.width = percent + "%"
}

if(text){
text.innerText = percent + "%"
}

}
function hideLoader(){

const loader = document.getElementById("loading-screen")

if(loader){
loader.style.display = "none"
}

}
