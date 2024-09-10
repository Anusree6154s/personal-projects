import NavBar from "../../components/common/Navbar";
import { ProductList } from "../../components/user";

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