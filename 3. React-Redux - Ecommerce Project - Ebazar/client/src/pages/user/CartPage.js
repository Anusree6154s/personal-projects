import Navbar from "../../components/common/Navbar";
import { Cart } from "../../components/user";

function CartPage() {
    return (
        <div>
            <Navbar name='Shopping Cart'>
                <Cart></Cart>
            </Navbar>
        </div>
    );
}

export default CartPage;