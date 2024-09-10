import NavBar from "../../components/common/Navbar";
import AdminProductList from "../../components/admin/product/adminProductList";

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