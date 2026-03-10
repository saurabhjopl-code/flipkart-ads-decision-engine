export function renderSummary(data){

const container = document.getElementById("summary-cards")

if(!container) return


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


const roi = spend ? (revenue/spend).toFixed(2) : "0"
const ctr = views ? ((clicks/views)*100).toFixed(2) : "0"
const cvr = clicks ? ((units/clicks)*100).toFixed(2) : "0"


container.innerHTML = `

<div class="kpi-grid">

<div class="kpi-card">
<span>Ad Spends</span>
<strong>₹${spend.toLocaleString()}</strong>
</div>

<div class="kpi-card">
<span>ROI</span>
<strong>${roi}</strong>
</div>

<div class="kpi-card">
<span>Views</span>
<strong>${views.toLocaleString()}</strong>
</div>

<div class="kpi-card">
<span>Clicks</span>
<strong>${clicks.toLocaleString()}</strong>
</div>

<div class="kpi-card">
<span>CTR</span>
<strong>${ctr}%</strong>
</div>

<div class="kpi-card">
<span>Total Units Sold</span>
<strong>${units}</strong>
</div>

<div class="kpi-card">
<span>CVR</span>
<strong>${cvr}%</strong>
</div>

<div class="kpi-card">
<span>GMV</span>
<strong>₹${revenue.toLocaleString()}</strong>
</div>

</div>

`

}
