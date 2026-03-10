import { dataStore } from "../../data/dataStore.js"

import { campaignRules } from "./campaignRules.js"
import { keywordRules } from "./keywordRules.js"
import { productRules } from "./productRules.js"
import { placementRules } from "./placementRules.js"



export function runDecisionEngine(){

let decisions = []

decisions = decisions.concat(
campaignRules(dataStore.CDR)
)

decisions = decisions.concat(
keywordRules(dataStore.CKR)
)

decisions = decisions.concat(
productRules(dataStore.CFR)
)

decisions = decisions.concat(
placementRules(dataStore.PPR)
)

return decisions

}
