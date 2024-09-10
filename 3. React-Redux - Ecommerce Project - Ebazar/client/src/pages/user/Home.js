import Navbar from "../../components/common/Navbar";
import { ProductList } from "../../components/user";

function Home() {
    return (
        <div>
            <Navbar name='Products'>
                <ProductList></ProductList>
            </Navbar>
        </div>
    );
}

export default Home;