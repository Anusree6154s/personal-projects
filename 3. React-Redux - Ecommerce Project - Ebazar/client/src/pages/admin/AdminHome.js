import { AdminProductList, Navbar } from "../../components";

function AdminHome() {
    return (
        <div>
            <Navbar name='Products'>
                <AdminProductList></AdminProductList>
            </Navbar>
        </div>
    );
}

export default AdminHome;