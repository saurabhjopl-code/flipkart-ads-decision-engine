export function filterData(data, filters){

return data.filter(row =>{

if(filters.acc && row["ACC"] !== filters.acc){
return false
}

if(filters.month){

const date = new Date(row["Date"])

const month = date.toLocaleString("default",{month:"short",year:"numeric"})

if(month !== filters.month){
return false
}

}

if(filters.startDate){

const date = new Date(row["Date"])

if(date < new Date(filters.startDate)){
return false
}

}

if(filters.endDate){

const date = new Date(row["Date"])

if(date > new Date(filters.endDate)){
return false
}

}

return true

})

}
