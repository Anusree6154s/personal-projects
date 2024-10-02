import { Navbar, UserProfile } from "../../components";

function UserProfilePage() {
    return (
        <>
            <Navbar name='My Profile'>
                <UserProfile></UserProfile>
            </Navbar>
        </>
    );
}

export default UserProfilePage;