import Menu from "../components/Menu"
import Product from "../components/Product" 
import BuyTickets from "../components/BuyTickets"
import Questions from "../components/Questions"
import ValidateTicket from "../components/ValidateTicket"
import Footer from "../components/Footer"

function Landing (){
    return (
        <>
            <Menu/>
            <Product/>
            <BuyTickets/>
            <ValidateTicket/>
            <Questions/>
            <Footer/>
        </>
    )
}

export default Landing