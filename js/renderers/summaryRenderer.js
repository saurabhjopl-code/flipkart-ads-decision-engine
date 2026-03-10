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

const roi = revenue / (spend || 1)

const ctr = (clicks / views) * 100

const cvr = (units / clicks) * 100

document.getElementById("summary-cards").innerHTML = `

<div class="kpi">Ad Spends ₹${spend.toFixed(0)}</div>
<div class="kpi">ROI ${roi.toFixed(2)}</div>
<div class="kpi">Views ${views}</div>
<div class="kpi">Clicks ${clicks}</div>
<div class="kpi">CTR ${ctr.toFixed(2)}%</div>
<div class="kpi">Units ${units}</div>
<div class="kpi">CVR ${cvr.toFixed(2)}%</div>
<div class="kpi">GMV ₹${revenue.toFixed(0)}</div>

`

}
