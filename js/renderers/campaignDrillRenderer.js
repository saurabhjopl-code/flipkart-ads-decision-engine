export function renderCampaignDrill(data){

const container=document.getElementById("campaign-drill")

if(!container)return

let html=`<h2>${data.campaign}</h2>`

html+=`

<div class="kpi-grid">

<div class="kpi-card">
<span>Spend</span>
<strong>₹${data.spend}</strong>
</div>

<div class="kpi-card">
<span>Revenue</span>
<strong>₹${data.revenue}</strong>
</div>

<div class="kpi-card">
<span>ROI</span>
<strong>${data.roi}</strong>
</div>

<div class="kpi-card">
<span>CTR</span>
<strong>${data.ctr}%</strong>
</div>

<div class="kpi-card">
<span>CVR</span>
<strong>${data.cvr}%</strong>
</div>

</div>
`

html+=`<h3>Top Keywords</h3>`
html+=buildTable(data.topKeywords)

html+=`<h3>Top Products</h3>`
html+=buildTable(data.topProducts)

html+=`<h3>Placement Performance</h3>`
html+=buildTable(data.placements)

container.innerHTML=html

}

function buildTable(data){

if(!data||data.length===0)return "<p>No data</p>"

const headers=Object.keys(data[0])

let html="<table class='data-table'><thead><tr>"

headers.forEach(h=>{

html+=`<th>${h}</th>`

})

html+="</tr></thead><tbody>"

data.forEach(r=>{

html+="<tr>"

headers.forEach(h=>{

html+=`<td>${r[h]}</td>`

})

html+="</tr>"

})

html+="</tbody></table>"

return html

}
