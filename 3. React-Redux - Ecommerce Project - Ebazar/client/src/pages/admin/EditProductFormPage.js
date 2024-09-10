import { EditProductForm } from "../../components/admin";
import Navbar from "../../components/common/Navbar";

function EditProductFormPage() {
    return (
        <div>
            <Navbar name='Edit Product Details'>
                <EditProductForm></EditProductForm>
            </Navbar>
        </div>
    );
}

export default EditProductFormPage;