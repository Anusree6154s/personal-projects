import { Navbar, UserOrders } from "../../components";

function UserOrdersPage() {
    return (
        <div>
            <Navbar name='My Orders'>
                <UserOrders></UserOrders>
            </Navbar>
        </div>
    );
}

export default UserOrdersPage;