import { AdminProfile, Navbar } from "../../components";

function AdminProfilePage() {
    return (
        <div>
            <Navbar name="Profile">
                <AdminProfile></AdminProfile>
            </Navbar>
        </div>
    );
}

export default AdminProfilePage;