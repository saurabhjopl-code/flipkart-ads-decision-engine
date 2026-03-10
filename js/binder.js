import { loadAllSheets } from "./data/csvLoader.js"

async function startApp(){

await loadAllSheets()

console.log("Ads data loaded")

}

startApp()
