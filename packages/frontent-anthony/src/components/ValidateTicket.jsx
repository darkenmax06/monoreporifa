import { useState } from "react"
import Ticket from "./Ticket"
import useData from "../hooks/useData"
import "./validateTicket.css"

function ValidateTicket (){
    const [result,setResult] = useState(null)
    const [number,setNumber] = useState("")
    const {showTicket,error} = useData()


    const handleSubmit = e => {
        e.preventDefault()
        console.log("a")
        showTicket(number)
        .then(res => setResult(res))
        
    }

    console.log(result)
    

    return (
        <section className="validate" id="validate" >
            <div className="validate__container">
                <h5>Ingresa tu numero telefonico para validar tu ticket</h5>
                <form onSubmit={handleSubmit} className="validate__form">
                    <input 
                            type="number"
                            name="phone"
                            value={number}
                            placeholder="sin guiones ni parentesis"
                            onChange={e => setNumber(e.target.value)}
                            required />
                            <button className="validate__button">
                                Validar
                            </button>
                </form>
                {error && <p className="validate__error" >{error}</p>}

            </div>


                {result && (
                    <div className="validate__result-container">
                        {
                            result.map(res => <Ticket key={res.ticket} status={res.status} number={res.ticket} />)
                        }
                    </div>
                )}
        </section>
    )
}

export default ValidateTicket