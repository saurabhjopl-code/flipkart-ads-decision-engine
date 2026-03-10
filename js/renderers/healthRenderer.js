export function renderCampaignHealth(data){

const container = document.getElementById("campaign-health")

if(!container) return

let html = "<table class='data-table'>"

html += `
<thead>
<tr>
<th>Campaign</th>
<th>Health Score</th>
<th>Status</th>
<th>ROI</th>
<th>CTR</th>
<th>CVR</th>
<th>Spend</th>
<th>Revenue</th>
</tr>
</thead>
<tbody>
`

data.forEach(r=>{

let badge = "badge-medium"

if(r.Status === "Scale") badge = "badge-low"
if(r.Status === "Fix") badge = "badge-high"

html += `
<tr>
<td>${r.Campaign}</td>
<td>${r.Score}</td>
<td><span class="${badge}">${r.Status}</span></td>
<td>${r.ROI}</td>
<td>${r.CTR}</td>
<td>${r.CVR}</td>
<td>${r.Spend}</td>
<td>${r.Revenue}</td>
</tr>
`

})

html += "</tbody></table>"

container.innerHTML = html

}
