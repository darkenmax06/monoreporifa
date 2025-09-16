
import {Info, Laugh, Receipt} from "lucide-react"
import "./alert.css"
import { useRef } from "react"

function Alert ({handleHide}){
    const alertRef = useRef()

    const handleClick = e =>{
        const element = alertRef.current

        if (element){
            console.log("a")
            element.classList.add("fade-out")

            element.addEventListener("transitionend", ()=>{
                console.log("b")
                
            },{once: true})

            handleHide()

        }
    }

    return (
        <section className="alert__container" >
            <article className="alert" ref={alertRef} >
                <div className="alert__title">
                    <Receipt color="#6fd38e" strokeWidth={2} size={30}  />
                    <h3 className="alert__title">
                        ¡Boletos comprados!
                    </h3>
                </div>

                <p className="alert__textbox">
                    Tus boletos se encuentran en proceso de validacion, esto puede tardar hasta un maximo de 24 horas. Luego de validar tu pago estos serán puestos como validos para la rifa.
                </p>

                <button className="alert__button" onClick={handleClick} >
                    Aceptar
                </button>

            </article>
        </section>
    )
}

export default Alert