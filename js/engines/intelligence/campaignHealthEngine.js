export function calculateCampaignHealth(data){

const map = {}

data.forEach(r=>{

const campaign = r["Campaign Name"]

if(!map[campaign]){

map[campaign] = {
campaign,
spend:0,
revenue:0,
views:0,
clicks:0,
units:0
}

}

map[campaign].spend += Number(r["Ad Spend"]||0)
map[campaign].revenue += Number(r["Total Revenue (Rs.)"]||0)
map[campaign].views += Number(r["Views"]||0)
map[campaign].clicks += Number(r["Clicks"]||0)
map[campaign].units += Number(r["Total converted units"]||0)

})

return Object.values(map).map(c=>{

const roi = c.spend ? c.revenue/c.spend : 0
const ctr = c.views ? c.clicks/c.views : 0
const cvr = c.clicks ? c.units/c.clicks : 0

let score = 0

/* ROI weight */

if(roi > 5) score += 40
else if(roi > 3) score += 30
else if(roi > 2) score += 20
else if(roi > 1) score += 10

/* CTR weight */

if(ctr > 0.02) score += 20
else if(ctr > 0.01) score += 10

/* CVR weight */

if(cvr > 0.05) score += 20
else if(cvr > 0.02) score += 10

/* traffic */

if(c.views > 1000) score += 10

/* conversions */

if(c.units > 10) score += 10


let status = "Optimize"

if(score >= 80) status = "Scale"
else if(score < 50) status = "Fix"


return {

Campaign:c.campaign,
Score:score,
Status:status,
ROI:roi.toFixed(2),
CTR:(ctr*100).toFixed(2)+"%",
CVR:(cvr*100).toFixed(2)+"%",
Spend:c.spend.toFixed(0),
Revenue:c.revenue.toFixed(0)

}

})

}
