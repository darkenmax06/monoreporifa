import { useEffect, useState } from "react";
import { getByNumber,UpdateTickets } from "../services/bouchersServices";



export default function useTickets(number){
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        if (number){
            getByNumber({number})
            .then(res => {
                const bouchers = new Set(res.map(res => res.boucher))
                const info ={
                    tickets: res,
                    bouchers: Array.from(bouchers)
                }

                setData(info)
                setLoading(false)
            })
        }
    },[number])

    async function upTickets ({ticket,status}){
        setLoading(true)
        try {
            await UpdateTickets({status,ticket})
            let d = data.tickets.filter(res => res.ticket != ticket)
            setData(prev => ({...prev, tickets: d}))
        } catch(err){
            alert("error: " + err)
        }     finally {
            setLoading(false)
        }  
    }

    return {
        data,
        loading,
        upTickets
    }
}