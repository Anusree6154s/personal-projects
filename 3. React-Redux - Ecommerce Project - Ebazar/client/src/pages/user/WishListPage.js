import NavBar from "../../components/common/Navbar";
import WishList from "../../components/wishList/wishList";

function WishListPage() {
    return (
        <div>
            <NavBar name="Wish List">
                <WishList></WishList>
            </NavBar>
        </div>
    );
}

export default WishListPage;