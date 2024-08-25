import AdminProfile from "../../features/admin/components/adminProfile";
import NavBar from "../../features/navbar/navbar";

function AdminProfilePage (){
    return (
        <div>
            <NavBar name="Profile">
                <AdminProfile></AdminProfile>
            </NavBar>
        </div>
    );
}

export default AdminProfilePage;