import "./menu.css"
import img from "../../public/logo.jpg"
import { useRef } from "react"

function Menu (){
    const btnRef = useRef()
    const navRef = useRef()

    const handleClic = e => {
        if (btnRef,navRef){
            navRef.current.classList.toggle("active")
            btnRef.current.classList.toggle("active")
        }
    }

    const handleHide = e => {
        const isLink = e.target.classList.contains("menu__link")

        if (isLink && navRef.current.classList.contains("active")){
            navRef.current.classList.remove("active")
            btnRef.current.classList.remove("active")
        }
    }

    return (
        <header className="menu">
            <div className="container">
                <div className="menu__logo">
                    <img className="menu__img" src={img} alt="" />
                </div>
                <nav className="menu__nav" ref={navRef} onClick={handleHide} >
                    <ul className="menu__ul">
                        <li className="menu__li">
                            <a className="menu__link" href="#product">
                                Sorteo
                            </a>
                        </li>



                        <li className="menu__li">
                            <a className="menu__link" href="#buy">
                                Comprar boletos
                            </a>
                            
                        </li>

                        <li className="menu__li">
                            <a className="menu__link" href="#validate">
                                Validar
                            </a>
                            
                        </li>

                        <li className="menu__li">
                            <a className="menu__link" href="#questions">
                                Preguntas frecuentes
                            </a>
                        </li>
                    </ul>
                </nav>

                <button className="menu__btn" ref={btnRef} onClick={handleClic} >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}

export default Menu