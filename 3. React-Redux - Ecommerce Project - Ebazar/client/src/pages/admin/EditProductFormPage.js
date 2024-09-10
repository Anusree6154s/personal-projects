import NavBar from "../../components/common/Navbar";
import EditProductForm from "../../components/admin/forms/editProductForm";

function EditProductFormPage() {
    return (
        <div>
            <NavBar name='Edit Product Details'>
                <EditProductForm></EditProductForm>
            </NavBar>
        </div>
    );
}

export default EditProductFormPage;