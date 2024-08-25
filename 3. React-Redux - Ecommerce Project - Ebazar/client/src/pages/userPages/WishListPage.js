import NavBar from "../../features/navbar/navbar";
import WishList from "../../features/wishList/wishList";

function WishListPage (){
    return (
        <div>
            <NavBar name="Wish List">
                <WishList></WishList>
            </NavBar>
        </div>
    );
}

export default WishListPage;