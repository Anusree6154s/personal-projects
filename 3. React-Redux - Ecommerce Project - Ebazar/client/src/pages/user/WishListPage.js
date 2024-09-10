import Navbar from "../../components/common/Navbar";
import Wishlist from "../../components/user/Wishlist";

function WishListPage() {
    return (
        <div>
            <Navbar name="Wish List">
                <Wishlist></Wishlist>
            </Navbar>
        </div>
    );
}

export default WishListPage;