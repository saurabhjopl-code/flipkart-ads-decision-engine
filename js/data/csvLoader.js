import { dataStore } from "./dataStore.js"
import { SHEET_URLS } from "../config/sheetConfig.js"



async function loadSheet(key, url){

const res = await fetch(url)

const text = await res.text()

const rows = text.split("\n").map(r => r.split(","))

const headers = rows.shift()

const data = rows.map(row=>{

const obj = {}

headers.forEach((h,i)=>{

obj[h.trim()] = row[i]

})

return obj

})

dataStore[key] = data

}



export async function loadAllSheets(updateProgress){

const keys = Object.keys(SHEET_URLS)

let loaded = 0

await Promise.all(

keys.map(async key => {

await loadSheet(key, SHEET_URLS[key])

loaded++

const percent = Math.round((loaded/keys.length)*100)

updateProgress(percent)

})

)

}
