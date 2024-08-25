import NavBar from "../features/navbar/navbar";
import UserOrders from "../features/user/components/userOrders";

function UserOrdersPage (){
    return (
        <div>
            <NavBar name='My Orders'>
                <UserOrders></UserOrders>
            </NavBar>
        </div>
    );
}

export default UserOrdersPage;