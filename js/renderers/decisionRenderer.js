export function renderDecisions(decisions){

const urgent = decisions.filter(d=>d.priority==="High").length
const growth = decisions.filter(d=>d.recommendation.includes("Increase")).length
const optimize = decisions.filter(d=>d.priority==="Medium").length

document.getElementById("urgent-count").innerText = urgent
document.getElementById("growth-count").innerText = growth
document.getElementById("optimize-count").innerText = optimize

}
