export function keywordDecision(score){

if(score > 85) return "Scale Keyword"

if(score > 65) return "Increase Bid"

if(score > 40) return "Optimize"

if(score > 20) return "Monitor"

return "Pause Keyword"

}
