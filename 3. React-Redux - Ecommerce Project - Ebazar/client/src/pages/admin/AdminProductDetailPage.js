import { AdminProductDetail, Navbar } from "../../components";

function AdminProductDetailPage() {
    return (
        <div>
            <Navbar name='Products' preview='true'>
                <AdminProductDetail></AdminProductDetail>
            </Navbar>
        </div>
    );
}

export default AdminProductDetailPage;