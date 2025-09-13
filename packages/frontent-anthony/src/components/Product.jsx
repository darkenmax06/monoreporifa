import useData from "../hooks/useData"
import "./product.css"

function Product (){
    const {ticketNumber} = useData()

    return (
        <section className="product" id="product" >
            <div className="container">
                <div className="product__imgbox">
                    <img src="https://yamahanic.com/wp-content/uploads/2024/07/YD110-Crux-Side-black.jpg" alt="" />
                </div>
                <div className="product__textbox">
                    <h1 className="product__title">
                        Yamaha Cruz 110cc 0km año 2025
                    </h1>

                    <h4 className="product__subtitle">
                        El evento se realizara cuando se complete la venta de todos los boletos. 
                    </h4>

                    <h6 className="product__subtitle">
                        Porcentaje de boletos comprados:
                    </h6>
                    <div className="product__loading">
                        <div className="product__bar" style={{"--porcent": ticketNumber && ticketNumber.porcent +"%"}} ></div>
                        <strong className="product__porcent">{ ticketNumber && ticketNumber.porcent}%</strong>
                    </div>

                    <p className="product__description">
                        Participa y se uno de los ganadores de los articulos presentados a continuacion: <br /><br />

                        Este sorteo posee lo siguiente:



                        <br />
                        <br />
                        - Una Yamaha YB 125 CC Totalmente nueva.
                        <br />
                        <br />
                        Para participar Adquiere 4 boletos por un valor de RD$100 (mas posibilidades de ganar) presionando el boton de Comprar Boletos.
                    </p>

                    <a className="product__action" href="#buy" role="button" >
                        ¡Comprar Boletos!
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Product