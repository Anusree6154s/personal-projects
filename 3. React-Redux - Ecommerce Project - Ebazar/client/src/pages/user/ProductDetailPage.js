import NavBar from "../../components/common/Navbar";
import ProductDetail from "../../components/user/ProductDetail";

function ProductDetailPage() {
    return (
        <div>
            <NavBar name='Products'>
                <ProductDetail></ProductDetail>
            </NavBar>
        </div>
    );
}

export default ProductDetailPage;