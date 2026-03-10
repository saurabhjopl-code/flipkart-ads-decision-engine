export function aggregateDecisions(...engines){

let all = []

engines.forEach(engine=>{

all = all.concat(engine)

})

return all

}
