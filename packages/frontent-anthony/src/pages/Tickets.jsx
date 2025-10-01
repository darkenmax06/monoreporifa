import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./tickets.css"
import useTickets from "../hooks/useTickets";


function Tickets(){
    const {number} = useParams()
    const {upTickets,data} = useTickets(number)
    const navigate = useNavigate()

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
                    {data && data.bouchers.map(res => <img key={res} src={`/api/bouchers/images/${res}`}  />)}
                </div>

                <h4>tickets</h4>

                <div className="tickets__tickets">
                    {data && data.tickets.map(res => <Ticket key={res.ticket} ticket={res.ticket} updateTickes={upTickets} />)}
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