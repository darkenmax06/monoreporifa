import { createContext, useState } from "react";

const UserContext = createContext()

function UserProvider ({children}){
    const [user,setUser] = useState(null)

    function loginUser ({email,password}){
        if (email == "argrrifas@gmail.com" && password == "anthoni06"){
            return setUser({email,password})
        }

        throw "Usuario o contraseña incorrecto"
    }

    return (
        <UserContext.Provider value={{user,loginUser}} >
            {children}
        </UserContext.Provider>
    )
}

export {
    UserProvider,
    UserContext
}
