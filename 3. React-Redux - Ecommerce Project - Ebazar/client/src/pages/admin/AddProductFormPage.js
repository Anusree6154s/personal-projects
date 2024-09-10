import NavBar from "../../components/common/Navbar";
import AddProductForm from "../../components/admin/forms/addProductForm";

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