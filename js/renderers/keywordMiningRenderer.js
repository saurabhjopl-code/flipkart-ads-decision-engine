export function renderKeywordMining(data){

const container = document.getElementById("keyword-mining")

if(!container) return

if(data.length === 0){

container.innerHTML = "<p>No keyword opportunities detected.</p>"
return

}

let html = "<table class='data-table'>"

html += `
<thead>
<tr>
<th>ACC</th>
<th>Keyword</th>
<th>Insight Type</th>
<th>Recommended Action</th>
<th>Reason</th>
</tr>
</thead>
<tbody>
`

data.forEach(r=>{

html += `
<tr>
<td>${r.ACC}</td>
<td>${r.Keyword}</td>
<td>${r.Type}</td>
<td><span class="badge-action">${r.Action}</span></td>
<td>${r.Reason}</td>
</tr>
`

})

html += "</tbody></table>"

container.innerHTML = html

}
