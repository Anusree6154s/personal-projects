import Navbar from "../../components/common/Navbar";
import { Checkout } from "../../components/user";

function CheckoutPage() {
    return (
        <div>
            <Navbar name='Checkout'>
                <Checkout></Checkout>
            </Navbar>
        </div>
    );
}

export default CheckoutPage;