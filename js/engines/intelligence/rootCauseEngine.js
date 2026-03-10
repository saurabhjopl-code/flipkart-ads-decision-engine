export function findRootCause(row){

if(row.clicks > 40 && row.units === 0){

return "Listing issue"

}

if(row.views > 1000 && row.clicks < 5){

return "Poor keyword targeting"

}

return "Normal"

}
