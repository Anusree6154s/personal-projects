import NavBar from "../../features/navbar/navbar";
import AddProductForm from "../../features/product/components/admin/addProductForm";

function AddProductFormPage() {
    return (
        <div>
            <NavBar name='Add Product Details'>
                <AddProductForm></AddProductForm>
            </NavBar>
        </div>
    );
}

export default AddProductFormPage;