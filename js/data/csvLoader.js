import { SHEET_URLS } from "../config/sheetConfig.js"
import { dataStore } from "./dataStore.js"

function parseCSV(text){

const rows = text.split("\n").map(r => r.split(","))

const headers = rows.shift()

return rows.map(r => {

const obj = {}

headers.forEach((h,i)=>{

obj[h.trim()] = r[i]

})

return obj

})

}



export async function loadAllSheets(updateProgress){

const keys = Object.keys(SHEET_URLS)

for(let i=0;i<keys.length;i++){

const key = keys[i]

const res = await fetch(SHEET_URLS[key])

const txt = await res.text()

dataStore[key] = parseCSV(txt)



const percent = Math.round(((i+1)/keys.length)*100)

updateProgress(percent)

}

}
