import { useState } from "react"
import useUser from "../hooks/useUser"
import "./login.css"

function Login (){
    const {login,error} = useUser()
    const [user,setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const {name,value} = e.target
        setUser(prev => ({...prev,[name]:value}))
    }

    const handleSubmit = e => {
        e.preventDefault()
        login(user)
    }

    
    return (
        <section className="login">
            <form  className="login__form" onSubmit={handleSubmit} >
                <h2>Iniciar sesion</h2>
                <input 
                    className="login__input"
                    type="text"
                    placeholder="Correo electronico"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    />
                <input 
                    className="login__input"
                    type="text"
                    placeholder="Contraseña"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    />
                    {error && <p>{error}</p>}
                <button className="login__action">
                    Iniciar sesion
                </button>
            </form>
        </section>
    )
}

export default Login