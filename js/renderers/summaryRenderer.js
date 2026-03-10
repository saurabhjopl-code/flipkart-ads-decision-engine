let summaryChart = null

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

const canvas = document.getElementById("summary-chart")

if(!canvas) return

const ctx = canvas.getContext("2d")

/* destroy previous chart */

if(summaryChart){
summaryChart.destroy()
}

summaryChart = new Chart(ctx,{
type:"line",
data:{
labels,
datasets:[
{
label:"Ad Spend",
data:spend,
borderColor:"#2ed573",
fill:false
},
{
label:"Revenue",
data:revenue,
borderColor:"#ff4757",
fill:false
}
]
},
options:{
responsive:true,
plugins:{
legend:{position:"top"}
}
}
})

}
