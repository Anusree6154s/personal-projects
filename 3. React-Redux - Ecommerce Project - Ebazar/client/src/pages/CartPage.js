import Cart from "../features/cart/cart";
import NavBar from "../features/navbar/navbar";

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