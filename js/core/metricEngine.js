export function calculateCTR(clicks, views){

if(!views) return 0

return (clicks / views) * 100

}

export function calculateCVR(units, clicks){

if(!clicks) return 0

return (units / clicks) * 100

}

export function calculateROI(revenue, spend){

if(!spend) return 0

return revenue / spend

}

export function calculateCPC(spend, clicks){

if(!clicks) return 0

return spend / clicks

}
