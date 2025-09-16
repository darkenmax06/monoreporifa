import { useState } from "react"
import { getTicketQuantity,getPendingTickets } from "../services/bouchersServices"
import { useEffect } from "react"
import { getByStatus } from "../services/bouchersServices"
import useError from "./useError"

export default function useDashboard (){
    const [data,useData] = useState(null)
    const [loading,setLoading] = useState(true)
    const {error,createError} = useError(null)
    const [pendings,setPendings] = useState(null)
    const [results,setResults] = useState(null)

    const getT = async ()=>{
        const result = await getTicketQuantity()
        const {totalTickets,buyTickets,withoutValidateTickets,invalidTickets,validTickets} = result
        const porcent = Math.round(
            ((buyTickets - (withoutValidateTickets + invalidTickets)) / totalTickets) * 100
        )
        useData({totalTickets,buyTickets,porcent,withoutValidateTickets,invalidTickets,validTickets})
        return true        
    }

    const getPT = async () =>{
        const result = await getPendingTickets()
        setPendings(result)
        return true
    }

    useEffect(()=>{
        Promise.all([
            getT(),
            getPT()
        ])
        .then(res => setLoading(false))
    },[])


    async function getTickets(status) {
        try {
            const result = await getByStatus({status})
            console.log(result)
            setResults(result)
            return result
        } catch (error) {
            createError(error)
            return null    
        }
    }

    return {
        data,
        loading,
        getTickets,
        error,
        pendings,
        results
    }
}