export function renderSummary(data){

let spend = 0
let views = 0
let clicks = 0
let units = 0
let revenue = 0

data.forEach(r=>{

spend += Number(r["Ad Spend"] || 0)
views += Number(r["Views"] || 0)
clicks += Number(r["Clicks"] || 0)
units += Number(r["Total converted units"] || 0)
revenue += Number(r["Total Revenue (Rs.)"] || 0)

})

const roi = spend ? (revenue/spend).toFixed(2) : 0
const ctr = views ? ((clicks/views)*100).toFixed(2) : 0
const cvr = clicks ? ((units/clicks)*100).toFixed(2) : 0

document.getElementById("summary-cards").innerHTML = `

<div class="kpi-card">
<h4>Ad Spends</h4>
<p>₹${spend.toLocaleString()}</p>
</div>

<div class="kpi-card">
<h4>ROI</h4>
<p>${roi}</p>
</div>

<div class="kpi-card">
<h4>Views</h4>
<p>${views.toLocaleString()}</p>
</div>

<div class="kpi-card">
<h4>Clicks</h4>
<p>${clicks.toLocaleString()}</p>
</div>

<div class="kpi-card">
<h4>CTR</h4>
<p>${ctr}%</p>
</div>

<div class="kpi-card">
<h4>Total Units</h4>
<p>${units}</p>
</div>

<div class="kpi-card">
<h4>CVR</h4>
<p>${cvr}%</p>
</div>

<div class="kpi-card">
<h4>GMV</h4>
<p>₹${revenue.toLocaleString()}</p>
</div>

`

}
