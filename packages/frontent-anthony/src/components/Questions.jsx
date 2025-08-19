import "./question.css"
import Arrow from "./icons/arrow"
import { useRef, useState } from "react"

function Questions (){
    const [question,setQuestion] = useState([
        {
            question: "¿Como funciona el proceso?",
            answer: "Puedes comprar boletos mediante tu tarjeta de credito o transfiriendo el monto a una de nuestras cuentas indicadas arriba, luego te redirigira a una pagina donde optendras tus boletos y el numero que te toco, al momento de completar la venta de todos los boletos disponibles se estara publicando la fecha donde se estaran anunciando los resultados."
        },        {
            question: "¿Cuando se estara efectuando la rifa?",
            answer: "La rifa se estara efectuando cuando se realice la venta de todos los boletos"
        }
    ])

    return (
        <section className="questions" id="questions" >
            <div className="container">
                <h2 className="questions__subtitle">
                    Preguntas frecuentes
                </h2>

                <div className="questions__container">
                    {
                        question.map((res,i) => <Question key={i} {...res} />)
                    }
                </div>
            </div>
        </section>
    )
}

function Question ({question,answer}){
    const actionRef = useRef()
    const infoRef = useRef()
    return (
        <div className="questions__questions">
            <div className="questions__textbox" onClick={e => {
                    if (actionRef && infoRef){
                        actionRef.current.classList.toggle("active")
                        infoRef.current.classList.toggle("active")
                    }
                }} >
                <h6>
                    {question}
                </h6>
                <button className="question__action" ref={actionRef} >
                    <Arrow/>
                </button>
            </div>

            <p className="questions__info" ref={infoRef}>
                {answer}
            </p>
        </div>
    )
}

export default Questions