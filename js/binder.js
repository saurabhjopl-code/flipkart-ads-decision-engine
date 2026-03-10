import { analyzeKeywords } from "./engines/analysis/keywordAnalysisEngine.js"
import { detectWaste } from "./engines/intelligence/wasteDetectionEngine.js"
import { detectScaling } from "./engines/intelligence/scalingOpportunityEngine.js"

function runAssistant(){

const keywordData = analyzeKeywords()

const waste = detectWaste(keywordData)

const scaling = detectScaling(keywordData)

const decisions = [...waste,...scaling]

console.log(decisions)

}

runAssistant()
