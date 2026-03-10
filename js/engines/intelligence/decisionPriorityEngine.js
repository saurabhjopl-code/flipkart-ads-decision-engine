export function prioritizeDecisions(decisions){

return decisions.map(d=>{

let score = 0

/* priority weight */

if(d.priority === "High") score += 100
if(d.priority === "Medium") score += 50
if(d.priority === "Low") score += 10

/* recommendation importance */

if(d.recommendation.includes("Pause")) score += 40
if(d.recommendation.includes("Disable")) score += 35
if(d.recommendation.includes("Reduce")) score += 25
if(d.recommendation.includes("Increase")) score += 20
if(d.recommendation.includes("Improve")) score += 15
if(d.recommendation.includes("Scale")) score += 10

return {
...d,
score
}

})
.sort((a,b)=>b.score-a.score)

}
