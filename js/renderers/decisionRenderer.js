export function renderDecisions(decisions){

const container = document.getElementById("decision-summary")

let urgent = decisions.filter(d => d.priority === "High").length

let medium = decisions.filter(d => d.priority === "Medium").length

container.innerHTML = `

<p>⚠ Urgent Actions: ${urgent}</p>
<p>🛠 Optimization Needed: ${medium}</p>

`

}
