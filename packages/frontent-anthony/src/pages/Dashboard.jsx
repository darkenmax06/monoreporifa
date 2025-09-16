import { Link } from "react-router-dom"
import './dashboard.css'
import useDashboard from "../hooks/useDashboard"


function Dashboard() {
  const {data,getTickets,pendings,results} = useDashboard()

  return (
    <section className="dashboard">
      <div className="dashboard__container">
        <h2>Dashboard</h2>

        <div className="dashboard__data">
          <Card title="Boletos totales" value={data?.totalTickets} />
          <Card title="Validados" handleClick={()=> getTickets("ACTIVE")} value={data?.validTickets} />
          <Card title="Sin validar" handleClick={()=> getTickets("IN PROCESS")} value={data?.withoutValidateTickets} />
          <Card title="Rechazados" handleClick={()=> getTickets("INVALID")} value={data?.invalidTickets} />
          <Card title="Total generado"  value={`RD$${data?.validTickets* 100}`} />
        </div>

        <div className="progress__card">
          <h4>Progreso de compra</h4>
          <div className="product__loading">
            <div
              className="product__bar"
              style={{ "--porcent": data ? data.porcent + "%" : "0%" }}
            ></div>
            <strong className="product__porcent">
              {data?.porcent ?? 0}%
            </strong>
          </div>
        </div>

        {/* Pendientes */}
        <h5>Pendientes</h5>
        <div className="dashboard__tickets-ct">
          {pendings && pendings.map((res, i) => <TicketLink key={i} {...res} />)}
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

function TicketLink({ name, number, quantity }) {
  return (
    <Link to={`/dashboard/${number}`} className="ticket">
      <h6 className="ticket__name">{name}</h6>
      <span className="ticket__number">Número: {number}</span>
      <span className="ticket__quantity">Pendientes: {quantity}</span>
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
