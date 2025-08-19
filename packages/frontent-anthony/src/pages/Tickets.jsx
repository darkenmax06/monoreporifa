import { useParams } from "react-router-dom";
import useData from "../hooks/useData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./tickets.css"


function Tickets(){
    const {number} = useParams()
    const {tickets} = useData()
    const [data,setData] = useState()
    const {upTickets} = useData()
    const navigate = useNavigate()

    const updateTickes = ({status,ticket})=> {
        upTickets({status,ticket})
        .then(res => {
            console.log(data)
            let d = data.tickets.filter(res => res != ticket)
            setData(prev => ({...prev, tickets: d}))
        })
    }

    useEffect(()=>{
        if (tickets && tickets.length){
            let data = tickets.find(res => res.number == number)
            setData(data)
        }
    },[tickets])

    console.log(data)

    if (data && data.tickets.length < 1){
        navigate("/dashboard")
    }


    return (
        <section className="tickets">
            <div className="tickets__container">
                <h2 className="tickets__title">
                    Tickets {number}
                </h2>

                <h4>bouchers</h4>

                <div className="tickets__bouchers">
                    {data && data.bouchers.map(res => <img key={res} src={`http://localhost:3000/api/bouchers/images/${res}`}  />)}
                </div>

                <h4>tickets</h4>

                <div className="tickets__tickets">
                    {data && data.tickets.map(res => <Ticket key={res} ticket={res} updateTickes={updateTickes} />)}
                </div>
            </div>
        </section>
    )
}

function Ticket ({ticket,updateTickes}){
    return (
        <article className="ticket">
            <h4 className="ticket__number">
                {ticket}
            </h4>

            <div className="ticket__actions">
                <button className="ticket__btn" onClick={()=> updateTickes({status: "ACTIVE",ticket})} >
                    Aprobar
                </button>

                <button className="ticket__btn" onClick={()=> updateTickes({status: "INVALID",ticket})} >
                    Denegar
                </button>
            </div>
        </article>
    )
}

export default Tickets