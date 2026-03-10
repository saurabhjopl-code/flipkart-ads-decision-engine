export function placementRules(data){

const decisions = []

data.forEach(r=>{

const placement = r["Placement Type"]

const spend = Number(r["Ad Spend"]||0)
const units =
Number(r["Direct Units Sold"]||0) +
Number(r["Indirect Units Sold"]||0)



/* RULE 20 */

if(spend > 3000 && units < 2){

decisions.push({
entity:placement,
type:"Placement",
issue:"High spend low sales",
recommendation:"Disable Placement",
priority:"High"
})

}



/* RULE 21 */

if(units > 10){

decisions.push({
entity:placement,
type:"Placement",
issue:"High performing placement",
recommendation:"Increase Allocation",
priority:"Medium"
})

}



/* RULE 22 */

if(spend > 1000 && units < 1){

decisions.push({
entity:placement,
type:"Placement",
issue:"Poor performance",
recommendation:"Reduce Budget",
priority:"Medium"
})

}



/* RULE 23 */

if(units > 5){

decisions.push({
entity:placement,
type:"Placement",
issue:"Good conversion",
recommendation:"Boost Placement",
priority:"Low"
})

}

})

return decisions

}
