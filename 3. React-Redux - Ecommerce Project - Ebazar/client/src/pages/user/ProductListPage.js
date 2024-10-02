import { Navbar, ProductList } from "../../components";

function ProductListPage() {
    return (
        <div>
            <Navbar name='Products'>
                <ProductList></ProductList>
            </Navbar>
        </div>
    );
}

export default ProductListPage;