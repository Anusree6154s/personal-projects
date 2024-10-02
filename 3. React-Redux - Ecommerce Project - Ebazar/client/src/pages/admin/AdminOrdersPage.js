import { AdminOrders, Navbar } from "../../components";

function AdminOrdersPage() {
    return (
        <div>
            <Navbar name='Orders'>
                <AdminOrders></AdminOrders>
            </Navbar>
        </div>
    );
}

export default AdminOrdersPage;