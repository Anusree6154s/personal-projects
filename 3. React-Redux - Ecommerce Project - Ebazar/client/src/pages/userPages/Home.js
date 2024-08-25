import NavBar from "../../features/navbar/navbar";
import ProductList from "../../features/product/components/user/productList";

function Home() {
    return (
        <div>
            <NavBar name='Products'>
                <ProductList></ProductList>
            </NavBar>
        </div>
    );
}

export default Home;