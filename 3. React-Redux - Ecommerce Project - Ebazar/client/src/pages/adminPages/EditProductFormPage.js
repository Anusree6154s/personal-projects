import NavBar from "../../features/navbar/navbar";
import EditProductForm from "../../features/product/components/admin/editProductForm";

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