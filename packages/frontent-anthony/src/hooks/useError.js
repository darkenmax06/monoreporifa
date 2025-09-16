import { useState,useEffect } from "react"


export default function useError(time=5000){
    const [error,setError] = useState(null)

    const clearError = () => setError(null)
    const createError = (err) => setError(err)

    useEffect(()=>{
        if (error){
            const timeout = setTimeout(()=>{
                clearError
            },time)

            return ()=> clearTimeout(timeout)
        }
    },[error])



    return {
        error,
        clearError,
        createError
    }
}