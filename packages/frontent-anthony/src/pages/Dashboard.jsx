import { Link } from "react-router-dom"
import useData from "../hooks/useData"
import './dashboard.css'


function Dashboard() {
  const { tickets, ticketNumber,getAllTickets,results } = useData()

  console.log(results)

  return (
    <section className="dashboard">
      <div className="dashboard__container">
        <h2>Dashboard</h2>

        {/* Métricas principales */}
        <div className="dashboard__data">
          <Card title="Boletos totales" value={ticketNumber?.totalTickets} />
          <Card title="Boletos comprados" value={ticketNumber?.buyTickets} />
          <Card title="Validados" handleClick={()=> getAllTickets("ACTIVE")} value={ticketNumber?.buyTickets - ticketNumber?.withoutValidateTickets} />
          <Card title="Sin validar" handleClick={()=> getAllTickets("IN PROCESS")} value={ticketNumber?.withoutValidateTickets} />
          <Card title="Rechazados" handleClick={()=> getAllTickets("INVALID")} value={ticketNumber?.invalidTickets} />
          <Card title="Total generado"  value={`RD$${(ticketNumber?.buyTickets - ticketNumber?.withoutValidateTickets) * 100}`} />
        </div>

        {/* Barra de progreso */}
        <div className="progress__card">
          <h4>Progreso de compra</h4>
          <div className="product__loading">
            <div
              className="product__bar"
              style={{ "--porcent": ticketNumber ? ticketNumber.porcent + "%" : "0%" }}
            ></div>
            <strong className="product__porcent">
              {ticketNumber?.porcent ?? 0}%
            </strong>
          </div>
        </div>

        {/* Pendientes */}
        <h5>Pendientes</h5>
        <div className="dashboard__tickets-ct">
          {tickets && tickets.map((res, i) => <TicketLink key={i} {...res} />)}
        </div>

        {
          results?.length && (
            <div className="dashboard__result" >
              <h2>TICKETS</h2>
              {results.map((res, i) => <Ticket key={i} {...res} />)}
            </div>
          )
        }
      </div>
    </section>
  )
}

function Card({ title, value,handleClick }) {
  return (
    <div className="card" onClick={handleClick} >
      <h6>{title}</h6>
      <strong>{value ?? "--"}</strong>
    </div>
  )
}

function TicketLink({ name, number, tickets }) {
  return (
    <Link to={`/dashboard/${number}`} className="ticket">
      <h6 className="ticket__name">{name}</h6>
      <span className="ticket__number">Número: {number}</span>
      <span className="ticket__quantity">Pendientes: {tickets.length}</span>
    </Link>
  )
}

function Ticket({ name, number, ticket }) {
  return (
    <div className="ticket">
      <h6 className="ticket__name">{name}</h6>
      <span className="ticket__number">Número: {number}</span>
      <span className="ticket__quantity">Ticket: {ticket}</span>
    </div>
  )
}

export default Dashboard
