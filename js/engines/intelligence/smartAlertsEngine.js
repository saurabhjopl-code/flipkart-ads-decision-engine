export function detectAlerts(data){

const alerts = []

const map = {}

data.forEach(r=>{

const campaign = r["Campaign Name"]

if(!map[campaign]){
map[campaign]=[]
}

map[campaign].push(r)

})

Object.keys(map).forEach(campaign=>{

const rows = map[campaign]

if(rows.length < 2) return

const today = rows[rows.length-1]
const prev = rows[rows.length-2]

const spendToday = Number(today["Ad Spend"]||0)
const spendPrev = Number(prev["Ad Spend"]||0)

const revToday = Number(today["Total Revenue (Rs.)"]||0)
const revPrev = Number(prev["Total Revenue (Rs.)"]||0)

if(spendToday > spendPrev*2){

alerts.push({
Campaign:campaign,
Alert:"Spend spike detected",
Severity:"High"
})

}

if(revPrev > 0 && revToday < revPrev*0.5){

alerts.push({
Campaign:campaign,
Alert:"Revenue dropped sharply",
Severity:"High"
})

}

})

return alerts

}
