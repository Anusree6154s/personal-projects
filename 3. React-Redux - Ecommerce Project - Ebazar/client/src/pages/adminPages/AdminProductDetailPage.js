import NavBar from "../../features/navbar/navbar";
import AdminProductDetail from "../../features/product/components/admin/adminProductDetail";

function AdminProductDetailPage (){
    return (
        <div>
            <NavBar name='Products' preview='true'>
                <AdminProductDetail></AdminProductDetail>
            </NavBar>
        </div>
    );
}

export default AdminProductDetailPage;