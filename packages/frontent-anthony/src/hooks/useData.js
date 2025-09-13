import { useEffect, useState } from "react";
import { buyTickets,getPendingTickets,getTicketQuantity, UpdateTickets, ValidateTicket,getByStatus } from "../services/bouchersServices";


function useData () {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [message,setMessage] = useState(false)
    const [ticketNumber,setTicketNumber] = useState(null)
    const [tickets,setTickets] = useState(null)
    const [results,setResults] = useState()

    useEffect(()=>{
        if (error){
            const timeout = setTimeout(()=>{
                setError(null)
                setLoading (false)

            },5000)

            return ()=> clearTimeout(timeout)
        }
    },[error])

    useEffect(()=>{
        getTicketQuantity()
        .then(result => {
            const {totalTickets,buyTickets,withoutValidateTickets,invalidTickets} = result
            const porcent = Math.round(((buyTickets - (withoutValidateTickets + invalidTickets)) / totalTickets) * 100)
            setTicketNumber({totalTickets,buyTickets,porcent,withoutValidateTickets,invalidTickets})

            setLoading(false)
        })
        
    },[])

    useEffect(()=>{
        getPendingTickets()
        .then(result => {
            const ta = {}

            result.forEach((element,i) => {
                const {number,name,ticket,status,boucher} = element
                if (!ta[number]){
                    ta[number] = {
                        name,
                        number,
                        status,
                        tickets: [],
                        bouchers: [],
                        id: i
                    }
                }

                if (!ta[number].bouchers.includes(boucher)){
                    ta[number].bouchers.push(boucher)
                }

                ta[number].tickets.push(ticket)
            });

            const data = Object.values(ta)

            setTickets(data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
        
    },[])

    function limpiarNumeroTelefono(inputNumeroTelefono) {
            const numeroLimpio = inputNumeroTelefono.replace(/[()\-\s]/g, '');
            return numeroLimpio;
    }

    async function sendData ({name,number,quantity,image,payMethod}) {
        setLoading(true)
        const parsedNumer =  limpiarNumeroTelefono(number)
        if (name.length < 3) return setError("El nombre debe ener un minimo de 3 caracteres")
        else if (name.length > 200)return setError("El nombre debe ener un maximo de 200 caracteres")
        else if (parsedNumer.length != 10)return setError("El numero telefonico debe poseer 10 digitos")
        else if (!quantity)return setError("Debes tener una cantidad de tickets para comprar")
        else if (!image)return setError("Debes adjuntar el comprobante de pago para poder realizar esta compra")

        const fd = new FormData()
        fd.append("image",image)
        fd.append("name",name)
        fd.append("number",parsedNumer)
        fd.append("quantity",quantity)
        fd.append("payMethod", payMethod)

        try {
            const result = await buyTickets(fd)
            alert("respuesta: " + result)
            return null
        } catch(err){
            console.log(err)
        }  finally {
            setLoading(false)
        }
    }

    async function upTickets ({ticket,status}){
        try {
            await UpdateTickets({status,ticket})
            console.log(tickets)
        } catch(err){
            alert("error: " + err)
        }       
    }

    async function showTicket(phone) {
        try {
            const result = await ValidateTicket({phone})
            return result
        } catch (error) {
            setError(error)
            return null    
        }
    }

    async function getAllTickets(status) {
        try {
            const result = await getByStatus({status})
            setResults(result)
            return result
        } catch (error) {
            setError(error)
            return null    
        }
    }

    return {
        loading,
        error,
        message,
        sendData,
        ticketNumber,
        tickets,
        upTickets,
        showTicket,
        getAllTickets,
        results
    }
}

export default useData