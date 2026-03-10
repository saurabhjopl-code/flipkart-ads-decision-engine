export function keywordScore(row){

const roiScore = Math.min(row.roi * 20,40)
const cvrScore = Math.min(row.cvr * 5,30)
const ctrScore = Math.min(row.ctr * 10,20)
const revenueScore = Math.min(row.revenue / 500,10)

return roiScore + cvrScore + ctrScore + revenueScore

}
