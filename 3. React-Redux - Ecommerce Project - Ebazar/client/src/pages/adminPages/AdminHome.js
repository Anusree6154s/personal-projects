import NavBar from "../../features/navbar/navbar";
import AdminProductList from "../../features/product/components/admin/adminProductList";

function AdminHome() {
    return (
        <div>
            <NavBar name='Products'>
                <AdminProductList></AdminProductList>
            </NavBar>
        </div>
    );
}

export default AdminHome;