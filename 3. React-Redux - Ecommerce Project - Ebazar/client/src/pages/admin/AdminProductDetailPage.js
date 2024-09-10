import NavBar from "../../components/common/Navbar";
import AdminProductDetail from "../../components/admin/product/adminProductDetail";

function AdminProductDetailPage() {
    return (
        <div>
            <NavBar name='Products' preview='true'>
                <AdminProductDetail></AdminProductDetail>
            </NavBar>
        </div>
    );
}

export default AdminProductDetailPage;