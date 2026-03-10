import { dataStore } from "./dataStore.js"
import { SHEET_URLS } from "../config/sheetConfig.js"


/* CSV PARSER (handles commas inside quotes) */

function parseCSV(text){

const rows = []
let current = ""
let insideQuotes = false
let row = []

for(let i=0;i<text.length;i++){

const char = text[i]

if(char === '"'){
insideQuotes = !insideQuotes
continue
}

if(char === "," && !insideQuotes){
row.push(current)
current = ""
continue
}

if(char === "\n" && !insideQuotes){
row.push(current)
rows.push(row)
row = []
current = ""
continue
}

current += char

}

row.push(current)
rows.push(row)

const headers = rows.shift()

return rows.map(r=>{

const obj = {}

headers.forEach((h,i)=>{

obj[h.trim()] = r[i]

})

return obj

})

}



async function loadSheet(key,url){

const res = await fetch(url)

const text = await res.text()

dataStore[key] = parseCSV(text)

}



export async function loadAllSheets(updateProgress){

const keys = Object.keys(SHEET_URLS)

let loaded = 0

await Promise.all(

keys.map(async key => {

await loadSheet(key,SHEET_URLS[key])

loaded++

const percent = Math.round((loaded/keys.length)*100)

updateProgress(percent)

})

)

}
