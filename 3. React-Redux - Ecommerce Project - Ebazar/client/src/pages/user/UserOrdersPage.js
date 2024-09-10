import NavBar from "../../components/common/Navbar";
import UserOrders from "../../components/user/UserOrders";

function UserOrdersPage() {
    return (
        <div>
            <NavBar name='My Orders'>
                <UserOrders></UserOrders>
            </NavBar>
        </div>
    );
}

export default UserOrdersPage;