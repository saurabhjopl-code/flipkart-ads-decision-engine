export function renderTable(containerId, data){

const container = document.getElementById(containerId)

if(!data || data.length === 0){

container.innerHTML = "No data available"

return

}

let html = "<table border='1'>"

html += "<thead><tr>"

Object.keys(data[0]).forEach(key=>{

html += `<th>${key}</th>`

})

html += "</tr></thead>"

html += "<tbody>"

data.forEach(row=>{

html += "<tr>"

Object.values(row).forEach(val=>{

html += `<td>${val}</td>`

})

html += "</tr>"

})

html += "</tbody></table>"

container.innerHTML = html

}
