import AdminOrders from "../../components/admin/AdminOrders";
import NavBar from "../../components/common/Navbar";

function AdminOrdersPage() {
    return (
        <div>
            <NavBar name='Orders'>
                <AdminOrders></AdminOrders>
            </NavBar>
        </div>
    );
}

export default AdminOrdersPage;