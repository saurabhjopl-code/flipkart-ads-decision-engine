export function renderTable(containerId,data){

const container = document.getElementById(containerId)

if(!container) return

if(!data || data.length === 0){

container.innerHTML = "<p>No data available</p>"
return

}

const headers = Object.keys(data[0])

let html = "<table class='data-table'>"

html += "<thead><tr>"

headers.forEach(h=>{
html += `<th>${h}</th>`
})

html += "</tr></thead>"

html += "<tbody>"

data.forEach(row=>{

html += "<tr>"

headers.forEach(h=>{

let value = row[h]


/* priority styling */

if(h === "priority"){

let cls = "badge-low"

if(value === "High") cls = "badge-high"
if(value === "Medium") cls = "badge-medium"

value = `<span class="${cls}">${value}</span>`

}


/* recommendation styling */

if(h === "recommendation"){

value = `<span class="badge-action">${value}</span>`

}

html += `<td>${value ?? ""}</td>`

})

html += "</tr>"

})

html += "</tbody></table>"

container.innerHTML = html

}
