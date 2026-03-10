import { analyzeKeywords } from "./engines/analysis/keywordAnalysisEngine.js"
import { recommendBids } from "./engines/optimization/bidRecommendationEngine.js"
import { allocateBudget } from "./engines/optimization/budgetAllocationEngine.js"
import { forecastGrowth } from "./engines/optimization/growthForecastEngine.js"

function runBrain(){

const keywordData = analyzeKeywords()

const bidSuggestions = recommendBids(keywordData)

const budgetSuggestions = allocateBudget(keywordData)

const forecasts = forecastGrowth(keywordData)

const allDecisions = [

...bidSuggestions,
...budgetSuggestions,
...forecasts

]

console.log(allDecisions)

}

runBrain()
