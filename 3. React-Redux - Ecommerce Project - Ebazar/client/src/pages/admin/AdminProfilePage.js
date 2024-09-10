import AdminProfile from "../../components/admin/profile/AdminProfile";
import NavBar from "../../components/common/Navbar";

function AdminProfilePage() {
    return (
        <div>
            <NavBar name="Profile">
                <AdminProfile></AdminProfile>
            </NavBar>
        </div>
    );
}

export default AdminProfilePage;