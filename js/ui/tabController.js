function showTab(tabId){

document.querySelectorAll(".tab-panel").forEach(panel=>{

panel.classList.remove("active")

})

document.querySelectorAll(".tab").forEach(tab=>{

tab.classList.remove("active")

})

document.getElementById(tabId).classList.add("active")

event.target.classList.add("active")

}
