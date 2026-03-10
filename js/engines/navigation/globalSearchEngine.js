export function searchEntities(query,dataStore){

query = query.toLowerCase()

const results = []

dataStore.CDR.forEach(r=>{

if((r["Campaign Name"]||"").toLowerCase().includes(query)){

results.push({
type:"Campaign",
value:r["Campaign Name"]
})

}

})

dataStore.CKR.forEach(r=>{

if((r["attributed_keyword"]||"").toLowerCase().includes(query)){

results.push({
type:"Keyword",
value:r["attributed_keyword"]
})

}

})

dataStore.CFR.forEach(r=>{

if((r["Product Name"]||"").toLowerCase().includes(query)){

results.push({
type:"Product",
value:r["Product Name"]
})

}

})

dataStore.PPR.forEach(r=>{

if((r["Placement Type"]||"").toLowerCase().includes(query)){

results.push({
type:"Placement",
value:r["Placement Type"]
})

}

})

return results.slice(0,15)

}
