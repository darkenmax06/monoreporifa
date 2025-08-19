import "./ticket.css"


function Ticket ({number,status}){
    return (
        <article className="ticket">
            <h4>{number}</h4>
            <h5>{status}</h5>
        </article>
    )
}

export default Ticket