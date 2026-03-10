export function renderAlerts(alerts){

const container = document.getElementById("alerts-panel")

if(!container) return

if(alerts.length===0){
container.innerHTML="<p>No alerts detected</p>"
return
}

let html="<table class='data-table'>"

html+=`
<thead>
<tr>
<th>Campaign</th>
<th>Alert</th>
<th>Severity</th>
</tr>
</thead>
<tbody>
`

alerts.forEach(a=>{

html+=`
<tr>
<td>${a.Campaign}</td>
<td>${a.Alert}</td>
<td><span class="badge-high">${a.Severity}</span></td>
</tr>
`

})

html+="</tbody></table>"

container.innerHTML=html

}
