export function renderSummaryChart(data){

const map = {}

data.forEach(r=>{

const d = r["Date"]

if(!map[d]){

map[d] = {
spend:0,
revenue:0
}

}

map[d].spend += Number(r["Ad Spend"] || 0)
map[d].revenue += Number(r["Total Revenue (Rs.)"] || 0)

})

const labels = Object.keys(map)

const spend = labels.map(d => map[d].spend)
const revenue = labels.map(d => map[d].revenue)

const ctx = document
.getElementById("summary-chart")
.getContext("2d")

new Chart(ctx,{
type:"line",
data:{
labels,
datasets:[
{
label:"Ad Spend",
data:spend
},
{
label:"Revenue",
data:revenue
}
]
}
})

}
