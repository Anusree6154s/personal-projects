import { Navbar, ProductDetail } from "../../components";

function ProductDetailPage() {
    return (
        <div>
            <Navbar name='Products'>
                <ProductDetail></ProductDetail>
            </Navbar>
        </div>
    );
}

export default ProductDetailPage;