export function renderSearchResults(results){

const container = document.getElementById("search-results")

if(!results.length){

container.innerHTML = ""
return

}

let html=""

results.forEach(r=>{

html+=`
<div class="search-item" onclick="jumpToEntity('${r.type}','${r.value}')">
${r.type}: ${r.value}
</div>
`

})

container.innerHTML=html

}
