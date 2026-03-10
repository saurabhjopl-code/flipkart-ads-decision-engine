export function productRules(data){

const decisions = []

data.forEach(r=>{

const product = r["Product Name"]

const clicks = Number(r["Clicks"]||0)
const direct = Number(r["Direct Units Sold"]||0)
const indirect = Number(r["Indirect Units Sold"]||0)

const units = direct + indirect



/* RULE 15 */

if(clicks > 40 && units === 0){

decisions.push({
entity:product,
type:"Product",
issue:"Clicks but no sales",
recommendation:"Improve Listing",
priority:"High"
})

}



/* RULE 16 */

if(clicks > 100 && units < 3){

decisions.push({
entity:product,
type:"Product",
issue:"Low conversion",
recommendation:"Check Price / Images",
priority:"Medium"
})

}



/* RULE 17 */

if(units > 10){

decisions.push({
entity:product,
type:"Product",
issue:"Strong product",
recommendation:"Scale Ads",
priority:"Low"
})

}



/* RULE 18 */

if(indirect > direct){

decisions.push({
entity:product,
type:"Product",
issue:"Indirect driven sales",
recommendation:"Increase Visibility",
priority:"Low"
})

}



/* RULE 19 */

if(clicks < 5){

decisions.push({
entity:product,
type:"Product",
issue:"Low traffic",
recommendation:"Increase Ads",
priority:"Low"
})

}

})

return decisions

}
