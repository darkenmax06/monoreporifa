const URI = "/api/bouchers"

async function buyTickets (data){
    const options ={
        "body": data,
        "method": "POST"
    }

    try {
        const res = await fetch(URI,options)
        const result = await res.json()
        if (!res.ok) throw result
        return result.message
    } catch (err){
        throw err.error
    }
}

async function getTicketQuantity (){
    try {
        const res = await fetch(`${URI}/quantity`)
        const result = await res.json()
        if (!res.ok) throw result
        return result
    } catch (err){
        throw err.error
    }
}

async function getPendingTickets (){
    try {
        const res = await fetch(`${URI}/?status=IN+PROCESS`)
        const result = await res.json()
        console.log(result)
        if (!res.ok) throw result
        return result
    } catch (err){
        throw err.error
    }  
}


async function UpdateTickets ({status,ticket}){
    console.log(status)
    const options ={
        "body": JSON.stringify({status}),
        "method": "PUT",
        "headers":{
            "content-type": "application/json"
        }
    }

    try {
        const res = await fetch(`${URI}/${ticket}`,options)
        const result = await res.json()
        if (!res.ok) throw result
        return result
    } catch (err){
        throw err.error
    }
}

async function ValidateTicket({phone}) {
    console.log("s")
    try {
        const res = await fetch(`${URI}/validate/?phone=${phone}`)
        const result = await res.json()
        console.log(result)
        if (!res.ok) throw result
        return result
    } catch (err){
        throw err.error
    }  
}

async function getByStatus({status}) {
    try {
        const res = await fetch(`${URI}/status/${status}`)
        const result = await res.json()
        if (!res.ok) throw result
        return result
    } catch (err){
        throw err.error
    }  
}


export {
    buyTickets,
    getTicketQuantity,
    getPendingTickets,
    UpdateTickets,
    ValidateTicket,
    getByStatus
}