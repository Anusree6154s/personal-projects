import NavBar from "../../components/common/Navbar";
import UserProfile from "../../components/user/UserProfile";

function UserProfilePage() {
    return (
        <>
            <NavBar name='My Profile'>
                <UserProfile></UserProfile>
            </NavBar>
        </>
    );
}

export default UserProfilePage;