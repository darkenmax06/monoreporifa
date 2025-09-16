import "./buyTickets.css"
import { useState } from "react"
import More from "./icons/More"
import useData from "../hooks/useData"
import Alert from "./alets/Alert"

function BuyTickets (){
    const {error,loading,alert,handleHide,sendData} = useData()
    const values ={
        price: 25,
        quantity: 4,
    }
    const [ticket,setTicket] = useState({
        name: "",
        number: "",
        price: values.price,
        quantity: values.quantity,
        total: values.price * values.quantity
    })

    const [method,setMethod] = useState([
        {
            url: "/br.webp",
            bank: "BANRESERVAS",
            name: "Anthoni Gonzalez",
            number: "9604535444",
            focus: true
        },{
            url: "/bpd.webp",
            bank: "POPULAR",
            name: "Ramses Gonzalez",
            number: "844270504",
            focus: false
        }
    ])

    const [url,setUrl] = useState(null)

    const currentMethod = method.find(res => res.focus == true)


    const handleIncrease = (value) => {
        setTicket(prev =>  {
            const quantity = value ?? prev.quantity + 4
            return ({
                ...prev, 
                quantity,
                total: quantity * prev.price
            })
        })
    }

    const handleDecrease = () => {
        setTicket(prev =>  {
        const quantity = prev.quantity -4 <= 4 ? 4: prev.quantity - 4

            return ({
                ...prev, 
                quantity,
                total: quantity * prev.price
            })
        })
    }

    const handleMethod = (m) => {
        setTicket(prev => ({
            ...prev,
            method: m,
        }))

        
        const settedMethod = method.map(res => {
            if (res.bank == m) {
                res.focus = true
            }
            else res.focus = false
            return res
        })


        setMethod(settedMethod)
    }


    const handleChange = e => {
        const {name,value} = e.target
        setTicket(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = e =>{
        e.preventDefault()

        if (loading) return null
        const {image} = Object.fromEntries(new FormData(e.target))

        const dataToSend = {
            ...ticket,
            image
        }

        sendData({...dataToSend,payMethod:method.find(res => res.focus == true).bank})
        .then(() => {
            setTicket({
                name: "",
                number: "",
                price: values.price,
                quantity: values.quantity,
                total: values.price * values.quantity
            })

            setUrl(null)
        })
    }


    return (
        <section className="bt" id="buy" >
            <div className="container">
                <form className="bt__box" onSubmit={handleSubmit} >
                    <h2 className="bt__title" >¡Comprar Boletos!</h2>
                    <div className="bt__q">

                        <h4>Selecciona la cantidad de boletos para comprar</h4>
                        <div className="bt__manual">
                            <h6>seleccion manual</h6>
                            <div className="bt__smanual">
                                <div className="bt__less" onClick={handleDecrease}>
                                    -
                                </div>
                                <strong className="bt__quantity">{ticket.quantity}</strong>
                                <div className="bt__more" onClick={e => handleIncrease()} >
                                    <More/>
                                </div>
                            </div>
                        </div>

                        <div className="bt__select">
                            <h6>seleccionar cantidad</h6>

                            <div className="bt__btn" onClick={e => handleIncrease(40)} >40</div>
                            <div className="bt__btn" onClick={e => handleIncrease(80)} >80</div>
                            <div className="bt__btn" onClick={e => handleIncrease(120)} >120</div>
                            <div className="bt__btn" onClick={e => handleIncrease(200)} >200</div>
                            <div className="bt__btn" onClick={e => handleIncrease(400)} >400</div>
                            <div className="bt__btn" onClick={e => handleIncrease(600)} >600</div>

                        </div>

                        <h6>Total RD${ticket.total}.00</h6>
                    </div>

                    <div className="bt__form">
                        <h2 className="bt__title">
                            Datos personales
                        </h2>

                        <div className="bt__inputs">
                            <label htmlFor="name" className="bt__label">
                                Nombres y apellidos *
                                <input placeholder="ejemplo: John Doe" type="text" id="name" className="bt__input" name="name" value={ticket.name} onChange={handleChange} />
                            </label>

                            <label htmlFor="number" className="bt__label">
                                Numero telefonico *
                                <input 
                                    type="tel" 
                                    placeholder="ingrese el numero sin guiones"
                                    id="number" 
                                    className="bt__input" 
                                    name="number" 
                                    value={ticket.number} 
                                    onChange={handleChange}
                                    maxLength={10}  
                                    />
                            </label>
                        </div>
                    </div>

                    <div className="bt__payMethod">
                        <h2 className="bt__subtitle">Metodos de pago</h2>
                        <div className="payMethod__select" >
                            {
                                method.map((res,i) => <Method handleMethod={()=> handleMethod(res.bank)} key={i} {...res} />  )
                            }
                        </div>

                       
                        <div className="bt__data" >
                            <h6>{currentMethod.bank}</h6>
                            <h5 onClick={()=>{
                                navigator.clipboard.writeText(currentMethod.number)
                                alert("elemento copiado")
                            }} >{currentMethod.number}  </h5>
                            <h6>Titular: {currentMethod.name}</h6>
                            
                            {url && <img className="boucher__image" src={url} />}

                            <label htmlFor="image" className="image" >
                                Da click aca para subir el comprobante de pago
                                <input onChange={e => {
                                    const file = e.target.files[0]

                                    const fileReader = new FileReader()
                                    fileReader.readAsDataURL(file)
                                    fileReader.addEventListener("load", e=>{
                                        const url = URL.createObjectURL(file)
                                        setUrl(url)
                                    })
                                }} id="image" name="image" type="file" accept=".jpeg,.jpg,.png" />
                            </label>

                        </div>
                    </div>

                    {alert && <Alert handleHide={handleHide} />}

                    <h4>{currentMethod.bank}: RD${ticket.total}.00 (Boletos:{ticket.quantity})</h4>

                    {error && <p>{error}</p>}

                    <button className="bt__buy" >{loading ? "cargando...": "Comprar boletos"}</button>
                </form>
            </div>
        </section>
    )
}

function Method ({url,name,focus,handleMethod}){
    return (
        <div className={`payMethod ${focus ? "active": ""}`} onClick={handleMethod} >
            <img src={url} alt={name} />
        </div>
    )
}

export default BuyTickets