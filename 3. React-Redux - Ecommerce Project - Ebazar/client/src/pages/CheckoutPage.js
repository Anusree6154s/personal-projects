import Checkout from "../features/checkout/checkout";
import NavBar from "../features/navbar/navbar";

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