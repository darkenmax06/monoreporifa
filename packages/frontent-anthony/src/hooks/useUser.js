import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";


function useUser (){
    const {user,loginUser} = useContext(UserContext)
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if (error){
            let timeout = setInterval(() => {
                setError(null)
            }, 5000);

            return ()=> clearInterval(timeout)
        }
    },[error])

    function login ({email,password}){
        if (!email) return setError ("Es necesario el email para iniciar sesion")
        else if (!password) return  setError ("Es necesario la contraseña para iniciar sesion")

        try {
            loginUser({email,password})
            navigate("/dashboard")
        } catch(err){
            setError(err)
        }
    }

    return {
        user,
        login,
        error
    }
}

export default useUser