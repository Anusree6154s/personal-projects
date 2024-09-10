import NavBar from "../../components/common/Navbar";
import { Cart } from "../../components/user";

function CartPage() {
    return (
        <div>
            <NavBar name='Shopping Cart'>
                <Cart></Cart>
            </NavBar>
        </div>
    );
}

export default CartPage;