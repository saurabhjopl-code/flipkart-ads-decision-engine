import { SHEET_URLS } from "../config/sheetConfig.js"
import { dataStore } from "./dataStore.js"

function parseCSV(text){

const rows = text.split("\n").map(r => r.split(","))

const headers = rows.shift()

return rows.map(r => {

let obj = {}

headers.forEach((h,i)=>{

obj[h.trim()] = r[i]

})

return obj

})

}

export async function loadAllSheets(){

for(const key in SHEET_URLS){

const res = await fetch(SHEET_URLS[key])

const txt = await res.text()

dataStore[key] = parseCSV(txt)

}

}
