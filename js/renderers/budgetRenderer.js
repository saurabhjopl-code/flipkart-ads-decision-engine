export function renderBudgetSuggestions(data){

const container = document.getElementById("budget-suggestions")

if(!container) return

if(data.length === 0){

container.innerHTML = "<p>No budget optimization suggestions.</p>"
return

}

let html = "<table class='data-table'>"

html += `
<thead>
<tr>
<th>ACC</th>
<th>Reduce From</th>
<th>Increase To</th>
<th>Suggested Shift (₹)</th>
<th>Reason</th>
</tr>
</thead>
<tbody>
`

data.forEach(r=>{

html += `
<tr>
<td>${r.ACC}</td>
<td>${r.FromCampaign}</td>
<td>${r.ToCampaign}</td>
<td>${r.Amount}</td>
<td>${r.Reason}</td>
</tr>
`

})

html += "</tbody></table>"

container.innerHTML = html

}
