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

bar.style.width = percent + "%"

text.innerText = percent + "%"

}



function hideLoader(){

document.getElementById("loading-screen").style.display = "none"

}
