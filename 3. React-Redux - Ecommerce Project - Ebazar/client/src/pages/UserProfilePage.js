import NavBar from "../features/navbar/navbar";
import UserProfile from "../features/user/components/userProfile";

function UserProfilePage (){
    return (
        <>
            <NavBar name='My Profile'>
                <UserProfile></UserProfile>
            </NavBar>
        </>
    );
}

export default UserProfilePage;