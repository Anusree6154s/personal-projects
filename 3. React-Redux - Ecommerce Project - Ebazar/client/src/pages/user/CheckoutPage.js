import NavBar from "../../components/common/Navbar";
import { Checkout } from "../../components/user";

function CheckoutPage() {
    return (
        <div>
            <NavBar name='Checkout'>
                <Checkout></Checkout>
            </NavBar>
        </div>
    );
}

export default CheckoutPage;