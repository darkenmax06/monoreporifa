import { useEffect, useState } from "react"
import "./allTickets.css"
import { Link } from "react-router-dom"
import useDashboard from "../hooks/useDashboard"
import {ChevronLeft, MoveLeft, MoveRight} from "lucide-react"

function AllTickets (){
    const [page,setPage] = useState(0)
    const quantity = 500
    const maxPages = 10000/quantity
    const {getTickets} = useDashboard()
    const [tickets,setTickets]=useState(0)
    const [activeTickets,setActiveTickets] = useState(null)

    useEffect(()=>{
        getTickets("ACTIVE")
        .then(res => {
            const activeTickets = res.map(res=> res.ticket)
            setActiveTickets(activeTickets)
        })
    },[])

    useEffect(()=>{
        if (activeTickets){
        setTickets((()=>{
            return new Array(quantity)
            .fill("")
            .map((_,i)=> {
                const value = ((i +1) + (page*quantity)).toString()
                if (activeTickets.includes(value)){
                    console.log("a")
                    return {value: value.padStart(4,0), active: true}
                }
                return {value: value.padStart(4,0),active:false}
            })
        }))
        }
    },[activeTickets,page])

    const goNext = () => setPage(prev => {
        console.log(prev)
        const nextPage = prev +1
        if (maxPages == nextPage){
            return prev
        }

        return nextPage
    })

    const goPrev = () => setPage(prev => {
        const prevPage = prev -1 
        if (prevPage < 0){
            return prev
        }

        return prevPage
    })

    return (
        <section className="at">
            <div className="at__container">
                <Link  to="/dashboard">
                    <ChevronLeft/>
                    Volver al dashboard
                </Link>
                <h2 className="at__title">
                   
                    Todos los boletos
                </h2>

                <div className="at__actions">
                    <button className="at__buttons"  onClick={goPrev} >
                        <MoveLeft/>
                        Anterior
                    </button>

                    <button className="at__buttons"  onClick={goNext} >
                        Siguiente
                        <MoveRight/>
                    </button>
                </div>

                <div className="at__tickets-container">
                    {tickets?.length && tickets.map(res => <li key={res.value} className={res.active ? "active": "noactive"} >{res.value}</li>)}
                </div>

                <div className="at__actions">
                    <button className="at__buttons"  onClick={goPrev} >
                        <MoveLeft/>
                        Anterior
                    </button>

                    <button className="at__buttons"  onClick={goNext} >
                        Siguiente
                        <MoveRight/>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default AllTickets