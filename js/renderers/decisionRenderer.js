export function renderDecisions(decisions){

const urgent = []
const optimize = []
const growth = []


decisions.forEach(d=>{

if(d.priority === "High"){

urgent.push(d)

}
else if(
d.recommendation.includes("Increase") ||
d.recommendation.includes("Scale")
){

growth.push(d)

}
else{

optimize.push(d)

}

})


renderDecisionGroup("urgent-decisions",urgent)
renderDecisionGroup("optimize-decisions",optimize)
renderDecisionGroup("growth-decisions",growth)


/* update KPI cards */

document.getElementById("urgent-count").innerText = urgent.length
document.getElementById("optimize-count").innerText = optimize.length
document.getElementById("growth-count").innerText = growth.length

}



function renderDecisionGroup(containerId,data){

const container = document.getElementById(containerId)

if(!container) return

if(data.length === 0){

container.innerHTML = "<p>No actions required</p>"
return

}

let html = "<table class='data-table'>"

html += `
<thead>
<tr>
<th>Entity</th>
<th>Type</th>
<th>Issue</th>
<th>Action</th>
<th>Priority</th>
</tr>
</thead>
<tbody>
`

data.forEach(r=>{

let badge = "badge-low"

if(r.priority === "High") badge = "badge-high"
if(r.priority === "Medium") badge = "badge-medium"

html += `
<tr>
<td>${r.entity}</td>
<td>${r.type}</td>
<td>${r.issue}</td>
<td><span class="badge-action">${r.recommendation}</span></td>
<td><span class="${badge}">${r.priority}</span></td>
</tr>
`

})

html += "</tbody></table>"

container.innerHTML = html

}
