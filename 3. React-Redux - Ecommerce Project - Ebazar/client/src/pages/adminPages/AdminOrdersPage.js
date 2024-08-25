import AdminOrders from "../../features/admin/components/adminOrders";
import NavBar from "../../features/navbar/navbar";

function AdminOrdersPage (){
    return (
        <div>
            <NavBar name='Orders'>
                <AdminOrders></AdminOrders>
            </NavBar>
        </div>
    );
}

export default AdminOrdersPage;