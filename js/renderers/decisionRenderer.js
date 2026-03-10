export function renderDecisions(decisions){

let urgent = 0
let growth = 0
let optimize = 0

decisions.forEach(d=>{

if(d.priority === "High") urgent++

else if(d.recommendation.includes("Increase")) growth++

else optimize++

})

document.getElementById("urgent-count").innerText = urgent
document.getElementById("growth-count").innerText = growth
document.getElementById("optimize-count").innerText = optimize

}
