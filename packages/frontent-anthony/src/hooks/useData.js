import { useEffect, useState } from "react";
import { buyTickets,getPendingTickets,getTicketQuantity, UpdateTickets, ValidateTicket,getByStatus } from "../services/bouchersServices";
import { clearPhone } from "../helpers/clearPhone";
import useError from "./useError.js";
import useTickets from "./useTickets.js";

function useData () {
    const [loading,setLoading] = useState(false)
    const {error,createError} = useError()
    const [alert,setAlert] = useState(false)
    const {data:dat} = useTickets()


    const handleHide = () => setAlert(false)

    async function sendData ({name,number,quantity,image,payMethod}) {
        setLoading(true)
        const parsedNumer =  clearPhone(number)
        if (name.length < 3) return createError("El nombre debe ener un minimo de 3 caracteres")
        else if (name.length > 200)return createError("El nombre debe ener un maximo de 200 caracteres")
        else if (parsedNumer.length != 10)return createError("El numero telefonico debe poseer 10 digitos")
        else if (!quantity)return createError("Debes tener una cantidad de tickets para comprar")
        else if (!image)return createError("Debes adjuntar el comprobante de pago para poder realizar esta compra")

        const fd = new FormData()
        fd.append("image",image)
        fd.append("name",name)
        fd.append("number",parsedNumer)
        fd.append("quantity",quantity)
        fd.append("payMethod", payMethod)

        try {
            const result = await buyTickets(fd)
            setAlert(true)
            return null
        } catch(err){
            console.log(err)
        }  finally {
            setLoading(false)
        }
    }

    async function showTicket(phone) {
        try {
            const result = await ValidateTicket({phone})
            return result
        } catch (error) {
            createError(error)
            return null    
        }
    }

    return {
        loading,
        error,
        alert,
        sendData,
        showTicket,
        handleHide    
    }
}

export default useData