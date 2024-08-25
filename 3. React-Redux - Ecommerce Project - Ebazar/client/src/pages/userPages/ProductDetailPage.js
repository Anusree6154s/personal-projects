import NavBar from "../../features/navbar/navbar";
import ProductDetail from "../../features/product/components/user/productDetail";

function ProductDetailPage (){
    return (
        <div>
            <NavBar name='Products'>
                <ProductDetail></ProductDetail>
            </NavBar>
        </div>
    );
}

export default ProductDetailPage;